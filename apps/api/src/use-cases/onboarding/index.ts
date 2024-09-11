import { insertUserOnboarding } from "../../data-access/onboarding"; 

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
    await insertUserOnboarding(data);
}