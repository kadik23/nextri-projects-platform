import { eq } from "@repo/db/src/drizzle-functions";
import { db } from "@repo/db/src/index";
import { sessionTable as sessions } from "@repo/db/src/schema";
import type { Context } from "hono";
import { getCookie } from "hono/cookie";
import { lucia } from "../lib/auth";

export async function deleteSessionForUser(userId: string, trx = db) {
	await trx.delete(sessions).where(eq(sessions.userId, userId));
}

export const getUserId = async (c: Context<any>) => {
	const sessionId = getCookie(c, "auth_session") ?? null;

	console.log(sessionId);
	try {
		if (!sessionId) {
			return null;
		}

		const result = await lucia.validateSession(sessionId);

		return result?.user?.id ?? null;
	} catch (err) {
		console.log(err);
	}
};
