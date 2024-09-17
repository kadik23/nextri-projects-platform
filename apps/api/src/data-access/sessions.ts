import { db } from "@repo/db/src/index";
import { sessionTable as sessions } from "@repo/db/src/schema";

import { getCookie } from "hono/cookie";
import { eq } from "@repo/db/src/drizzle-functions";
import { lucia } from "../lib/auth";
import type { Context } from "hono";
import { getUserById } from "./users";

export async function deleteSessionForUser(userId: string, trx = db) {
  await trx.delete(sessions).where(eq(sessions.userId, userId));
}

export const getCurrentUser = async (c: Context<any>) => {
  const sessionId = getCookie(c, "auth_session") ?? null;
  try {
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);

    const user = await getUserById(result?.user?.id ?? "");
    return user;
  } catch (err) {
    console.log(err);
  }
};

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
