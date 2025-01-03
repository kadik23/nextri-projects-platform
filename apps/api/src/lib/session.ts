import type { UserId } from "lucia";
import { lucia } from "./auth";

export async function createSessionCookie(userId: UserId) {
	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	return sessionCookie;
}
