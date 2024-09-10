import { db } from "@repo/db/src/index";
import { sessionTable as sessions } from "@repo/db/src/schema";

import { eq } from "@repo/db/src/drizzle-functions";

export async function deleteSessionForUser(userId: string, trx = db) {
  await trx.delete(sessions).where(eq(sessions.userId, userId));
}
