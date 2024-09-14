import { db } from "@repo/db/src/index";
import { sessionTable as sessions } from "@repo/db/src/schema";
import { eq } from "@repo/db/src/drizzle-functions";
import { Context } from "hono";
import { lucia } from "../lib/auth";
import { getCookie } from "hono/cookie";

export async function deleteSessionForUser(userId: string, trx = db) {
  await trx.delete(sessions).where(eq(sessions.userId, userId));
}

export const getUserId = async (c: Context<any>) => {
  const sessionId = getCookie(c, "auth_session") ?? null;
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