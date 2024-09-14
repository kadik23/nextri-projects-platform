import { OpenSourcePath, workPace } from "@repo/db/src/types";
import { getUserOnboarding, insertUserOnboarding, updateUserOnboarding } from "../../data-access/onboarding"; 
import { ProjectCategoryPreference } from "../../validations/types";

export async function registerOnboarding(
    data:
        {
            userId: string;
            role: string;
            categoryPreference: ProjectCategoryPreference[];
            focus: string[];
            openSourcePath?: OpenSourcePath
            skillLevel: string;
            workPace: workPace;
            technologies: string[];
        }
) {
    return await insertUserOnboarding(data);
}

export async function getMyOnboardingData(user_id:string) {
    return await getUserOnboarding(user_id);
}

export async function updateOnboardingData(
    data:
    {
        id: string,
        categoryPreference?: ProjectCategoryPreference[];
        focus?: string[];
        openSourcePath?: OpenSourcePath
        role?: string;
        skillLevel?: string;
        technologies?: string[];
        workPace?: workPace;
    }) {
    return await updateUserOnboarding(data);
}