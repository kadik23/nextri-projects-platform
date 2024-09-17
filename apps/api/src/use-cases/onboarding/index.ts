import {
  getUserOnboarding,
  insertUserOnboarding,
} from "../../data-access/onboarding";
import { TOnboardingSchema } from "../../validations/onboarding";

export async function registerOnboarding(
  data: TOnboardingSchema & { userId: string }
) {
  return await insertUserOnboarding(data);
}

export async function getMyOnboardingData(user_id: string) {
  return await getUserOnboarding(user_id);
}

// export async function updateOnboardingData(data: {
//   id: string;
//   categoryPreference?: ProjectCategoryPreference[];
//   focus?: string[];
//   openSourcePath?: OpenSourcePath;
//   role?: string;
//   skillLevel?: string;
//   technologies?: string[];
//   workPace?: workPace;
// }) {
//   return await updateUserOnboarding(data);
// }
