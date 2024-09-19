import type { TOnboardingSchema } from "@/components/modals/onboading-modal";
import { fetcher } from "@/lib/utils";

export const onbordUser = async (data: TOnboardingSchema) => {
	try {
		const reponse = await fetcher("http://localhost:3001/onboarding", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ data }),
		});
	} catch (err) {
		console.error("Error on onboarding the user :", err);
	}
};

export const isUserOnboarded = async ({
	authSession,
}: {
	authSession: string | null;
}) => {
	if (!authSession) {
		return undefined;
	}
	try {
		const reponse = await fetcher("http://localhost:3001/onboarding", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",

				Cookie: `auth_session=${authSession};`, // psq ma7abch yab3athha wa7d m next js server
			},
			credentials: "include",
		});

		//@ts-ignore
		return reponse?.isOnborded;
	} catch (err) {
		console.error("Error on onboarding the user :", err);
	}
};
