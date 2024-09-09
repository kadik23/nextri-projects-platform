import { db } from "@repo/db/src";
import { userTable } from "@repo/db/src/schema";
import { createId } from "@paralleldrive/cuid2";

export const insterUser = async ({ email }: { email: string }) => {
  const newUser = await db.insert(userTable).values({
    email,
    id: createId(),
  });

  return newUser;
};

export const deleteUser = () => {};

export const updateUser = () => {};

export const getUserById = () => {};

export const getUserByEmail = () => {};

export const getAllUsers = () => {};
