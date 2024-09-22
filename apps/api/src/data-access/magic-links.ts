import {
  AUTH_TOKEN_LENGTH,
  SHORT_LIVED_AUTH_TOKEN_DURATION,
} from "../../config/constants";
import { generateRandomToken, getRandomId } from "../lib/utils";
import { magicLinksTable, eq, db } from "@repo/db";

export async function upsertMagicLink(email: string) {
  const token = await generateRandomToken(AUTH_TOKEN_LENGTH);
  const tokenExpiresAt = new Date(Date.now() + SHORT_LIVED_AUTH_TOKEN_DURATION);

  await db
    .insert(magicLinksTable)
    .values({
      id: getRandomId(),
      email,
      token,
      tokenExpiresAt,
    })
    .onConflictDoUpdate({
      target: magicLinksTable.email,
      set: {
        token,
        tokenExpiresAt,
      },
    });

  return token;
}

export async function getMagicLinkByToken(token: string) {
  const existingToken = await db.query.magicLinksTable.findFirst({
    where: eq(magicLinksTable.token, token),
  });

  return existingToken;
}

export async function deleteMagicToken(token: string) {
  await db.delete(magicLinksTable).where(eq(magicLinksTable.token, token));
}
