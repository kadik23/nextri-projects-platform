import { getUserOnboarding, insertUserOnboarding, updateUserOnboarding } from "../../data-access/onboarding"; 

export async function registerOnboarding(
    data:
        {
            userId: string;
            role: string;
            projectCategoriesPreference: string[];
            skillLevel: string;
            workPace: string;
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
        role?: string;
        projectCategoriesPreference?: string[];
        skillLevel?: string;
        workPace?: string;
        technologies?: string[];
    }) {
    return await updateUserOnboarding(data);
}