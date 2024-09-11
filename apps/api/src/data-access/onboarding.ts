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

export const updateUserOnboarding = async (
    updates: {
        userId: string, role?: string; skillLevel?: string; workPace?: string; technologies?: string[], projectCategoriesPreference?: string[];
    }
) => {
    return await db.transaction(async (trx) => {
        try {

            const existingOnboarding = await trx
                .select()
                .from(userOnboardingTable)
                .where(eq(userOnboardingTable.userId, updates.userId))
                .limit(1);

            if (!existingOnboarding || existingOnboarding.length === 0) {
                throw new Error(`No onboarding record found for user ID ${updates.userId}`);
            }

            const userOnboardingId = existingOnboarding[0]?.id;

            const updatedOnboarding = await trx
                .update(userOnboardingTable)
                .set({
                    ...(updates.role && { role: updates.role }),
                    ...(updates.skillLevel && { skillLevel: updates.skillLevel }),
                    ...(updates.workPace && { workPace: updates.workPace }),
                })
                .where(eq(userOnboardingTable.userId, updates.userId))
                .returning();


            if (updates.technologies) {
                await trx
                    .delete(technologyTable)
                    .where(eq(technologyTable.userOnboardingId, userOnboardingId as string)); 

                for (const tech of updates.technologies) {
                    await trx.insert(technologyTable).values({
                        userOnboardingId: userOnboardingId as string,
                        name: tech,
                    });
                }
            }

            if (updates.projectCategoriesPreference) {
                await trx
                    .delete(projectCategoryPreferenceTable)
                    .where(eq(projectCategoryPreferenceTable.userOnboardingId, userOnboardingId as string));

                for (const category of updates.projectCategoriesPreference) {
                    await trx.insert(projectCategoryPreferenceTable).values({
                        userOnboardingId: userOnboardingId as string,
                        name: category,
                    });
                }
            }

            return updatedOnboarding;

        } catch (error: any) {
            throw new Error(`Failed to update onboarding data: ${error.message}`);
        }
    });
};