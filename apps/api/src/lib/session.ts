import { lucia } from "./auth";
import { UserId } from "lucia";

export async function createSession(userId: UserId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  return sessionCookie;
}
