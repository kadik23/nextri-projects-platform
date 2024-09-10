import { Hono } from "hono";
import { emailSchema } from "../validations/auth";
import {
  loginWithMagicLinkUseCase,
  sendMagicLinkUseCase,
} from "../use-cases/auth/magic-link";
import { getCookie, setCookie } from "hono/cookie";
import { createSession } from "../lib/session";
import { googleAuth } from "../lib/auth";
import {
  generateCodeVerifier,
  generateState,
  OAuth2RequestError,
} from "arctic";
import { GoogleUser } from "../validations/types";
import {
  createGoogleUserUseCase,
  getAccountByGoogleIdUseCase,
} from "../use-cases/auth/accounts";

const auth = new Hono();

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

  const user = await loginWithMagicLinkUseCase(token);
  if (!user) {
    return c.text("faild to create  magic user");
  }

  const sessionCookie = await createSession(user?.id);

  setCookie(c, sessionCookie.name, sessionCookie.value, {
    ...sessionCookie.attributes,
    maxAge: 60 * 60 * 24 * 30,
  });

  c.text("check you cookies to see if you are authanticated");

  // redirec the user to the dashboard
});

auth.get("/google-redirect-url", async (c) => {
  console.log("this is from the redirect url ");
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await googleAuth.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });

  setCookie(c, "google_oauth_state", state, {
    secure: true,
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10,
  });

  setCookie(c, "google_code_verifier", codeVerifier, {
    secure: true,
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10,
  });

  return c.json({
    url,
  });
});

auth.get("/google-callback", async (c) => {
  const url = new URL(c.req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = getCookie(c, "google_oauth_state") ?? null;
  const codeVerifier = getCookie(c, "google_code_verifier") ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !codeVerifier
  ) {
    return c.status(400);
  }

  try {
    const tokens = await googleAuth.validateAuthorizationCode(
      code,
      codeVerifier
    );
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const googleUser: GoogleUser = await response.json();

    const existingAccount = await getAccountByGoogleIdUseCase(googleUser.sub);

    if (existingAccount) {
      const sessionCookie = await createSession(existingAccount.userId);

      setCookie(c, sessionCookie.name, sessionCookie.value, {
        ...sessionCookie.attributes,
        maxAge: 60 * 60 * 24 * 30,
      });
      return c.json({ success: true });
    }

    const userId = await createGoogleUserUseCase(googleUser);

    const sessionCookie = await createSession(userId);

    setCookie(c, sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes,
      maxAge: 60 * 60 * 24 * 30,
    });
    return c.json({ success: true });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
});

// http://localhost:3001/auth/google-callback
// auth.get("/google-callback", async (c) => {});
// auth.get("/github-callback", async (c) => {});

export default auth;
