import {
  createAccountViaGithub,
  createAccountViaGoogle,
  getAccountByGithubId,
  getAccountByGoogleId,
} from "../../data-access/accounts";
import { deleteSessionForUser } from "../../data-access/sessions";
import { getUserByEmail, insertUser } from "../../data-access/users";
import type { GitHubUser, GoogleUser } from "../../validations/types";

type ProviderUser = (GoogleUser | GitHubUser);

function isGoogleUser(user: ProviderUser): user is GoogleUser {
  return user.provider === 'google';
}

function isGitHubUser(user: ProviderUser): user is GitHubUser {
  return user.provider === 'github';
}

export async function getAccountByProviderIdUseCase(user: ProviderUser) {
  if (isGoogleUser(user)) {
    return await getAccountByGoogleId(user.sub);
  }
  if (isGitHubUser(user)) {
    return await getAccountByGithubId(user.id);
  }
  throw new Error("Unsupported provider");
}

async function createProviderLinkedAccount(providerUser: ProviderUser) {
  let existingUser = await getUserByEmail(providerUser.email);

  if (!existingUser) {
    existingUser = await insertUser({ email: providerUser.email });
  }

  if (!existingUser || !existingUser.id) {
    throw new Error("Failed to create or retrieve user");
  }

  if (isGoogleUser(providerUser)) {
    await createAccountViaGoogle(existingUser.id, providerUser.sub);
  } else if (isGitHubUser(providerUser)) {
    await createAccountViaGithub(existingUser.id, providerUser.id);
  } else {
    throw new Error("Unsupported provider");
  }

  return existingUser.id;
}

export async function createProviderUserUseCase(providerUser: ProviderUser) {
  return createProviderLinkedAccount(providerUser);
}

export async function invalidateSessionsUseCase(id: string) {
  await deleteSessionForUser(id);
}
