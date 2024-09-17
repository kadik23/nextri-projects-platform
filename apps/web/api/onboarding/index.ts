import { TOnboardingSchema } from "@/components/modals/onboading-modal";
import { fetcher } from "@/lib/utils";

export const onbordUser = async (data: TOnboardingSchema) => {
  try {
    const reponse = await fetcher(`http://localhost:3001/onboarding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ data }),
    });
  } catch (err) {
    console.error("Error on onboarding the user :", err);
    throw new Error("Failed to send magic link. Please try again later.");
  }
};

export const isUserOnboarded = () => {};
