import { accountTable, db, eq } from "@repo/db";
import { getRandomId } from "../lib/utils";

type Provider = "github" | "google";
type ProviderIdType = "githubId" | "googleId" | "userId";

async function createAccountViaProvider(
	userId: string,
	provider: Provider,
	providerId: string,
) {
	const account = await db
		.insert(accountTable)
		.values({
			userId,
			accountType: provider,
			[`${provider}Id`]: providerId,
			id: getRandomId(),
		})
		.onConflictDoNothing()
		.returning();

	if (!account) {
		throw new Error(`Failed to create account for ${provider}`);
	}

	return account;
}

export async function createAccountViaGithub(userId: string, githubId: string) {
	return createAccountViaProvider(userId, "github", githubId);
}

export async function createAccountViaGoogle(userId: string, googleId: string) {
	return createAccountViaProvider(userId, "google", googleId);
}

async function getAccountByIdentifier(idType: ProviderIdType, id: string) {
	return await db.query.accountTable.findFirst({
		where: eq(accountTable[idType], id),
	});
}

export async function getAccountByUserId(userId: string) {
	return getAccountByIdentifier("userId", userId);
}

export async function getAccountByGoogleId(googleId: string) {
	return getAccountByIdentifier("googleId", googleId);
}

export async function getAccountByGithubId(githubId: string) {
	return getAccountByIdentifier("githubId", githubId);
}
