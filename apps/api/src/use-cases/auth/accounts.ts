import {
  createAccountViaGoogle,
  getAccountByGithubId,
  getAccountByGoogleId,
} from "../../data-access/accounts";
import { getUserByEmail, insterUser } from "../../data-access/users";
import { GoogleUser } from "../../validations/types";

export async function getAccountByGoogleIdUseCase(googleId: string) {
  return await getAccountByGoogleId(googleId);
}

export async function getAccountByGithubIdUseCase(githubId: string) {
  return await getAccountByGithubId(githubId);
}

export async function createGoogleUserUseCase(googleUser: GoogleUser) {
  let existingUser = await getUserByEmail(googleUser.email);

  if (!existingUser) {
    existingUser = await insterUser({ email: googleUser.email });
  }

  await createAccountViaGoogle(existingUser?.id!, googleUser.sub);

  return existingUser?.id!;
}
