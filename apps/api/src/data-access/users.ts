import { db, eq, userTable, TUser } from "@repo/db";
import { getRandomId } from "../lib/utils";

export const insterUser = async ({ email }: { email: string }) => {
  const newUser = await db.insert(userTable).values({
    email,
    id: getRandomId(),
  });

  return newUser;
};

export async function deleteUser(userId: string) {
  await db.delete(userTable).where(eq(userTable.id, userId));
}

export async function getUser(userId: string) {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.id, userId),
  });

  return user;
}

export async function updateUser(userId: string, updatedUser: Partial<TUser>) {
  await db.update(userTable).set(updatedUser).where(eq(userTable.id, userId));
}

export async function getUserByEmail(email: string) {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.email, email),
  });

  return user;
}

export async function getMagicUserAccountByEmail(email: string) {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.email, email),
  });

  return user;
}

export async function createMagicUser(email: string) {
  const [user] = await db
    .insert(userTable)
    .values({
      email,
      emailVerified: new Date(),
      id: getRandomId(),
    })
    .returning();

  return user;
}
