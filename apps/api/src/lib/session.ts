import { lucia } from "./auth";
import type { UserId } from "lucia";

export async function createSessionCookie(userId: UserId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  return sessionCookie;
}
