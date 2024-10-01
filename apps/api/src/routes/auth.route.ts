import {
  OAuth2RequestError,
  generateCodeVerifier,
  generateState,
} from "arctic";
import { type Context, Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { deleteSessionForUser, getUserId } from "../data-access/sessions";
import { github, googleAuth, lucia } from "../lib/auth";
import { createSessionCookie } from "../lib/session";
import {
  createProviderUserUseCase,
  getAccountByProviderIdUseCase,
} from "../use-cases/auth/accounts";
import {
  loginWithMagicLinkUseCase,
  sendMagicLinkUseCase,
} from "../use-cases/auth/magic-link";
import { emailSchema } from "../validations/auth";
import type { Email, GitHubUser, GoogleUser } from "../validations/types";
import { doc } from "./auth.schema";
import { OpenAPIHono } from "@hono/zod-openapi";

export const authDocs = new OpenAPIHono();

const auth = new Hono();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

type OAuthProvider = {
  name: "google" | "github";
  authInstance: typeof googleAuth | typeof github;
  userInfoUrl: string;
  scopes: string[];
};

const OAUTH_PROVIDERS: Record<string, OAuthProvider> = {
  google: {
    name: "google",
    authInstance: googleAuth,
    userInfoUrl: "https://openidconnect.googleapis.com/v1/userinfo",
    scopes: ["profile", "email"],
  },
  github: {
    name: "github",
    authInstance: github,
    userInfoUrl: "https://api.github.com/user",
    scopes: ["user:email"],
  },
};

const setSecureCookie = (
  c: Context,
  name: string,
  value: string,
  maxAge: number
) => {
  setCookie(c, name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
};

const getPrimaryEmail = (emails: Email[]): string => {
  const primaryEmail = emails.find((email) => email.primary);

  if (!primaryEmail) {
    throw new Error("No primary email found");
  }

  return primaryEmail.email;
};

const handleOAuthError = (c: Context, error: unknown) => {
  if (error instanceof OAuth2RequestError) {
    return c.json(
      { success: false, error: "OAuth request failed", details: error.message },
      400
    );
  }

  if (error instanceof TypeError && error.message === "fetch failed") {
    const cause = (error as any).cause;
    if (cause?.code === "UND_ERR_CONNECT_TIMEOUT") {
      return c.json(
        {
          success: false,
          error: "Connection timeout",
          details:
            "Unable to reach the authentication server. Please try again later.",
        },
        503
      );
    }
  }

  console.error("Unexpected error during OAuth:", error);

  return c.json(
    {
      success: false,
      error: "An unexpected error occurred during authentication",
      details:
        "Please try again later or contact support if the problem persists.",
    },
    500
  );
};

auth.get("/:provider/authorize", async (c) => {
  const providerName = c.req.param("provider");
  const provider = OAUTH_PROVIDERS[providerName];
  if (!provider) {
    return c.json({ success: false, error: "Invalid OAuth provider" }, 400);
  }

  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = await provider.authInstance.createAuthorizationURL(
    state,
    codeVerifier,
    {
      scopes: provider.scopes,
    }
  );

  setSecureCookie(c, `${provider.name}_oauth_state`, state, 600);
  setSecureCookie(c, `${provider.name}_code_verifier`, codeVerifier, 600);

  return c.json({ url: url.href });
});

auth.get("/:provider/callback", async (c) => {
  const providerName = c.req.param("provider");
  const provider = OAUTH_PROVIDERS[providerName];
  if (!provider) {
    return c.json({ success: false, error: "Invalid OAuth provider" }, 400);
  }

  const url = new URL(c.req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = getCookie(c, `${provider.name}_oauth_state`) ?? null;
  const codeVerifier = getCookie(c, `${provider.name}_code_verifier`) ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !codeVerifier
  ) {
    return c.json(
      { success: false, error: "Invalid OAuth callback parameters" },
      400
    );
  }

  try {
    const tokens = await provider.authInstance.validateAuthorizationCode(
      code,
      codeVerifier
    );
    const response = await fetch(provider.userInfoUrl, {
      headers: { Authorization: `Bearer ${tokens.accessToken}` },
    });
    const providerUser: GoogleUser | GitHubUser = await response.json();
    if (provider.name === "github" && !providerUser.email) {
      const emailsResponse = await fetch("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      const emails = await emailsResponse.json();
      providerUser.email = getPrimaryEmail(emails);
    }

    if (provider.name === "github") {
      providerUser.provider = "github";
    } else if (provider.name === "google") {
      providerUser.provider = "google";
    }

    const existingAccount = await getAccountByProviderIdUseCase(providerUser);
    const userId = existingAccount
      ? existingAccount.userId
      : await createProviderUserUseCase(providerUser);
    const sessionCookie = await createSessionCookie(userId);

    setSecureCookie(
      c,
      sessionCookie.name,
      sessionCookie.value,
      60 * 60 * 24 * 30
    );

    return c.redirect(FRONTEND_URL, 302);
  } catch (error) {
    return handleOAuthError(c, error);
  }
});

auth.post("/get-magic-link", async (c) => {
  console.log("the generating magic link is working  is running");
  try {
    const body = await c.req.json();
    const data = emailSchema.parse(body);

    await sendMagicLinkUseCase(data.email);

    return c.json({ success: true });
  } catch (err) {
    console.error(err);
    return c.json({ success: false });
  }
});

auth.get("/magic/:token", async (c) => {
  const { token } = c.req.param();

  try {
    const user = await loginWithMagicLinkUseCase(token);
    if (!user) {
      return c.json({ success: false, error: "there is no user", status: 400 });
    }

    const sessionCookie = await createSessionCookie(user?.id);

    setCookie(c, sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    // redirec the user to the dashboard
    return c.redirect("http://localhost:3000");
  } catch (err) {
    console.error(err);
    return c.redirect("http://localhost:3000");
  }
});

auth.get("/logout", async (c) => {
  const userId = await getUserId(c);
  const sessionId = getCookie(c, "auth_session");

  if (!userId) {
    return c.json({ success: false });
  }

  // how can i logout the user
  await deleteSessionForUser(userId);

  const sessionCookie = lucia.createBlankSessionCookie();

  setCookie(c, sessionCookie.name, sessionCookie.value, {
    ...sessionCookie.attributes,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return c.json({ success: true });
});

authDocs.openapi(doc.authorizeRoute, (c) =>
  c.json(
    { url: "http://localhost:3000/url", success: false, error: "400" },
    200
  )
);
authDocs.openapi(doc.callbackRoute, (c) => c.redirect("http://localhost:3000"));
authDocs.openapi(doc.getMagicLinkRoute, (c) => c.json({ success: true }, 200));
authDocs.openapi(doc.magicLinkLoginRoute, (c) =>
  c.redirect("http://localhost:3000")
);
authDocs.openapi(doc.logoutRoute, (c) => c.json({ success: true }));

export default auth;
