import { accountTable, db, eq } from "@repo/db";
import { getRandomId } from "../lib/utils";

export async function createAccountViaGithub(userId: string, githubId: string) {
  await db
    .insert(accountTable)
    .values({
      userId: userId,
      accountType: "github",
      githubId,
      id: getRandomId(),
    })
    .onConflictDoNothing()
    .returning();
}

export async function createAccountViaGoogle(userId: string, googleId: string) {
  const user = await db
    .insert(accountTable)
    .values({
      userId: userId,
      accountType: "google",
      googleId,
      id: getRandomId(),
    })
    .onConflictDoNothing()
    .returning();

  return user;
}

export async function getAccountByUserId(userId: string) {
  const account = await db.query.accountTable.findFirst({
    where: eq(accountTable.userId, userId),
  });

  return account;
}

export async function getAccountByGoogleId(googleId: string) {
  return await db.query.accountTable.findFirst({
    where: eq(accountTable.googleId, googleId),
  });
}

export async function getAccountByGithubId(githubId: string) {
  return await db.query.accountTable.findFirst({
    where: eq(accountTable.githubId, githubId),
  });
}
