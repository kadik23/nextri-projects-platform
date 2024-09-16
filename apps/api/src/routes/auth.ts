import { Hono } from "hono";
import { emailSchema } from "../validations/auth";
import {
  loginWithMagicLinkUseCase,
  sendMagicLinkUseCase,
} from "../use-cases/auth/magic-link";
import { getCookie, setCookie } from "hono/cookie";
import { createSession } from "../lib/session";
import { github, googleAuth, lucia } from "../lib/auth";
import {
  generateCodeVerifier,
  generateState,
  OAuth2RequestError,
} from "arctic";
import { Email, GitHubUser, GoogleUser } from "../validations/types";
import {
  createGithubUserUseCase,
  createGoogleUserUseCase,
  getAccountByGithubIdUseCase,
  getAccountByGoogleIdUseCase,
  invalidateSessionsUseCase,
} from "../use-cases/auth/accounts";
import {
  deleteSessionForUser,
  getCurrentUser,
  getUserId,
} from "../data-access/sessions";

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

  try {
    const user = await loginWithMagicLinkUseCase(token);
    if (!user) {
      return c.json({ success: false, error: "there is no user", status: 400 });
    }

    const sessionCookie = await createSession(user?.id);

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

// const sessionId = getCookie(c, "auth_session") ?? null;

auth.get("/google-redirect-url", async (c) => {
  console.log("this is from the redirect url ");
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = await googleAuth.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });

  setCookie(c, "google_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production", // Only secure in production
    maxAge: 60 * 10,
  });

  setCookie(c, "google_code_verifier", codeVerifier, {
    path: "/",
    secure: process.env.NODE_ENV === "production", // Only secure in production
    maxAge: 60 * 10,
  });

  console.log(url?.href);

  return c.json({
    url: url?.href,
  });
});

auth.get("/google-callback", async (c) => {
  const url = new URL(c.req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = getCookie(c, "google_oauth_state") ?? null;
  const codeVerifier = getCookie(c, "google_code_verifier") ?? null;

  console.log("this is the code verifier");
  console.log(code);
  console.log(codeVerifier); // ->this cookie is null why ?

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !codeVerifier
  ) {
    return c.json({
      success: false,
      error: "the state and code are not match",
      status: 400,
    });
  }
  console.log("here i am insisde the function");
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

    console.log(existingAccount);

    if (existingAccount) {
      const sessionCookie = await createSession(existingAccount.userId);

      setCookie(c, sessionCookie.name, sessionCookie.value, {
        ...sessionCookie.attributes,
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      return c.redirect("http://localhost:3000");
    }

    const userId = await createGoogleUserUseCase(googleUser);

    const sessionCookie = await createSession(userId);

    setCookie(c, sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return c.redirect("http://localhost:3000");
  } catch (e) {
    console.error("Google OAuth error:", e);
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      return c.json({ success: false, error: e, status: 400 });
    }

    return c.json({ success: false, error: e, status: 500 });
  }
});

// http://localhost:3001/auth/google-callback
auth.get("/github-redirect-url", async (c) => {
  const state = generateState();
  const url = await github.createAuthorizationURL(state, {
    scopes: ["user:email"],
  });

  setCookie(c, "github_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return c.json({
    url,
  });
});
auth.get("/github-callback", async (c) => {
  const url = new URL(c.req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = getCookie(c, "github_oauth_state") ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return c.json({
      success: false,
      error: "the state or the code are no match",
      status: 500,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);

    console.log("user ");
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    console.log("this is the github user");
    console.log(githubUser);

    const existingAccount = await getAccountByGithubIdUseCase(githubUser.id);

    if (existingAccount) {
      const sessionCookie = await createSession(existingAccount.userId);

      setCookie(c, sessionCookie.name, sessionCookie.value, {
        ...sessionCookie.attributes,
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      return c.redirect("http://localhost:3000");
    }

    if (!githubUser.email) {
      const githubUserEmailResponse = await fetch(
        "https://api.github.com/user/emails",
        {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        }
      );
      const githubUserEmails = await githubUserEmailResponse.json();

      githubUser.email = getPrimaryEmail(githubUserEmails);
    }

    const userId = await createGithubUserUseCase(githubUser);
    const sessionCookie = await createSession(userId);

    setCookie(c, sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return c.redirect("http://localhost:3000");
  } catch (e) {
    console.error("Github OAuth error:", e);
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      return c.json({ success: false, error: e, status: 400 });
    }

    return c.json({ success: false, error: e, status: 500 });
  }
});

function getPrimaryEmail(emails: Email[]): string {
  const primaryEmail = emails.find((email) => email.primary);
  return primaryEmail!.email;
}

export default auth;
