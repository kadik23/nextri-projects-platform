import {
  createAccountViaGithub,
  createAccountViaGoogle,
  getAccountByGithubId,
  getAccountByGoogleId,
} from "../../data-access/accounts";
import { deleteSessionForUser } from "../../data-access/sessions";
import { getUserByEmail, insterUser } from "../../data-access/users";
import { GitHubUser, GoogleUser } from "../../validations/types";

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

export async function createGithubUserUseCase(githubUser: GitHubUser) {
  let existingUser = await getUserByEmail(githubUser.email);

  if (!existingUser) {
    existingUser = await insterUser({ email: githubUser.email });
  }

  await createAccountViaGithub(existingUser?.id!, githubUser.id);

  return existingUser?.id!;
}

export async function invalidateSessionsUseCase(id: string) {
  await deleteSessionForUser(id);
}
