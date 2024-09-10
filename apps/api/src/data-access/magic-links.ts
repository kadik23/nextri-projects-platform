import { TOKEN_LENGTH, TOKEN_TTL } from "../../config/constants";
import { generateRandomToken, getRandomId } from "../lib/utils";
import { magicLinksTable, userTable, eq, db } from "@repo/db";

export async function upsertMagicLink(email: string) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL);

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
