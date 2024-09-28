import type { TOnboardingSchema } from "@/components/modals/onboading-modal";
import { fetcher } from "@/lib/utils";

const API_BASE_URL = "http://localhost:3001";

interface OnboardingResponse {
	isOnboarded: boolean;
}

export const onboardUser = async (data: TOnboardingSchema): Promise<void> => {
	try {
		await fetcher(`${API_BASE_URL}/onboarding`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(data),
		});
	} catch (err) {
		console.error("Error onboarding the user:", err);
		throw new Error("Failed to onboard user");
	}
};

export const isUserOnboarded = async (
	authSession: string | null,
): Promise<boolean | undefined> => {
	if (!authSession) {
		return undefined;
	}

	try {
		const response = await fetcher<OnboardingResponse>(
			`${API_BASE_URL}/onboarding`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Cookie: `auth_session=${authSession};`,
				},
				credentials: "include",
			},
		);

		return response.isOnboarded;
	} catch (err) {
		console.error("Error checking user onboarding status:", err);
		throw new Error("Failed to check user onboarding status");
	}
};
