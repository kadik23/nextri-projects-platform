import { db, } from "@repo/db/src";
import { eq, } from "@repo/db/src/drizzle-functions";
import { projectCategoryPreferenceTable, technologyTable, userOnboardingTable } from "@repo/db";

export const insertUserOnboarding = async ({
    userId,
    role,
    projectCategoriesPreference,
    skillLevel,
    workPace,
    technologies,
}: {
    userId: string;
    role: string;
    projectCategoriesPreference: string[];
    skillLevel: string;
    workPace: string;
    technologies: string[];
}) => {
    // Insert into userOnboardingTable
    const [newUserOnboarding] = await db.insert(userOnboardingTable).values({
        userId,
        role,
        skillLevel,
        workPace,
    }).returning({ id: userOnboardingTable.id });

    if (newUserOnboarding) {
        const userOnboardingId = newUserOnboarding.id;

        // Insert into projectCategoryPreferenceTable
        if (projectCategoriesPreference.length > 0) {
            await db.insert(projectCategoryPreferenceTable).values(
                projectCategoriesPreference.map(category => ({
                    userOnboardingId,
                    name: category,
                }))
            );
        }

        // Insert into technologyTable
        if (technologies.length > 0) {
            await db.insert(technologyTable).values(
                technologies.map(tech => ({
                    userOnboardingId,
                    name: tech,
                }))
            );
        }
    } else {
        console.log("Something went wrong")
    }

    return newUserOnboarding;
};

export const getUserOnboarding = async (userId: string) => {

    const userOnboarding = await db.query.userOnboardingTable.findFirst({
        where: eq(userOnboardingTable.userId, userId),
    });

    if (!userOnboarding) {
        throw new Error('User onboarding not found');
    }

    // Fetch related project category preferences
    const projectCategoriesPreference = await db.query.projectCategoryPreferenceTable.findFirst({
        where: eq(projectCategoryPreferenceTable.userOnboardingId, userOnboarding.id),
    });

    // Fetch related technologies
    const technologies = await db.query.technologyTable.findFirst({
        where: eq(technologyTable.userOnboardingId, userOnboarding.id),
    });
    
    return {
        ...userOnboarding,
        projectCategoriesPreference,
        technologies,
    };
}