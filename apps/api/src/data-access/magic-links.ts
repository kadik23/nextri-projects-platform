import { TOKEN_LENGTH, TOKEN_TTL } from "../../config/constants";
import { generateRandomToken, getRandomId } from "../lib/utils";
import { db } from "@repo/db";
import { schema } from "@repo/db";
import { eq } from "@repo/db/src/drizzle-functions";

export async function upsertMagicLink(email: string) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL);

  await db
    .insert(schema.magicLinksTable)
    .values({
      id: getRandomId(),
      email,
      token,
      tokenExpiresAt,
    })
    .onConflictDoUpdate({
      target: schema.magicLinksTable.email,
      set: {
        token,
        tokenExpiresAt,
      },
    });

  return token;
}

export async function getMagicLinkByToken(token: string) {
  const existingToken = await db.query.magicLinksTable.findFirst({
    where: eq(schema.magicLinksTable.token, token),
  });

  return existingToken;
}

export async function deleteMagicToken(token: string) {
  await db
    .delete(schema.magicLinksTable)
    .where(eq(schema.magicLinksTable.token, token));
}

export async function setEmailVerified(userId: string) {
  await db
    .update(schema.userTable)
    .set({
      emailVerified: new Date(),
    })
    .where(eq(schema.userTable.id, userId));
}
