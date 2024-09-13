import { OpenSourcePath, workPace } from "@repo/db/src/types";
import { getUserOnboarding, insertUserOnboarding, updateUserOnboarding } from "../../data-access/onboarding"; 
import { ProjectCategoryPreference } from "../../validations/types";

export async function registerOnboarding(
    data:
        {
            userId: string;
            role: string;
            projectCategoryPreference: {
                categoryPreference: ProjectCategoryPreference[];
                focus: string[];
                openSourcePath?: OpenSourcePath
            };
            skillLevel: string;
            workPace: workPace;
            technologies: string[];
        }
) {
    return await insertUserOnboarding(data);
}

export async function getMyOnboardingData(userId:string) {
    return await getUserOnboarding(userId);
}

export async function updateOnboardingData(
    data:
    {
        userId: string,
        projectCategoryPreference?: {
            categoryPreference: ProjectCategoryPreference[];
            focus: string[];
            openSourcePath?: OpenSourcePath
        };
        skills?: {
            role: string;
            skillLevel: string;
            technologies: string[];
        }[],
        workPace?: workPace;
    }) {
    return await updateUserOnboarding(data);
}