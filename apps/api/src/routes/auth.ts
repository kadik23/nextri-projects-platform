import { Hono } from "hono";
import { emailSchema } from "../validations/auth";
import {
  loginWithMagicLinkUseCase,
  sendMagicLinkUseCase,
} from "../use-cases/auth/magic-link";
import { setCookie } from "hono/cookie";
import { createSession } from "../lib/session";

const auth = new Hono();

auth.post("/get-magic-link", async (c) => {
  try {
    const body = await c.req.parseBody();

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

  setCookie(
    c,
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
});

export default auth;
