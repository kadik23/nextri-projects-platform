import { db, } from "@repo/db/src";
import { eq, } from "@repo/db/src/drizzle-functions";
import { skillTable, userProfileTable, projectCategoryPreferenceTable } from "@repo/db";
import { ProjectCategoryPreference, workPace } from "../validations/types";
import { OpenSourcePath } from "@repo/db/src/types";

export const insertUserOnboarding = async ({
    userId,
    role,
    skillLevel,
    workPace,
    projectCategoryPreference,
    technologies,
}: {
    userId: string;
    role: string;
    projectCategoryPreference: {
        categoryPreference: ProjectCategoryPreference[];
        focus: string[];
        openSourcePath?: OpenSourcePath;
    };
    skillLevel: string;
    workPace: workPace;
    technologies: string[];
}) => {

    // Insert into userProfileTable
    const [newUserProfile] = await db.insert(userProfileTable).values({
        userId,
        workPace,
    }).returning({ id: userProfileTable.id });

    if (newUserProfile) {
        const profileId = newUserProfile.id;

        // Insert into skillTable
        const [newSkillTable] = await db.insert(skillTable).values({
            profileId,
            role,
            technologies,
            skillLevel
        }).returning({ id: skillTable.id });
        // Insert into projectCategoryPreferenceTable
        if (newSkillTable) {
            await db.insert(projectCategoryPreferenceTable).values({
                profileId,
                categoryPreference: projectCategoryPreference.categoryPreference,
                focus: projectCategoryPreference.focus,
                openSourcePath: (
                    projectCategoryPreference.categoryPreference.includes('open source') &&
                        projectCategoryPreference.openSourcePath
                        ? projectCategoryPreference.openSourcePath
                        : null
                )
            });
        }

    } else {
        console.log("Something went wrong")
    }

    return newUserProfile;
};

export const getUserOnboarding = async (userId: string) => {

    const userOnboarding = await db.query.userProfileTable.findFirst({
        where: eq(userProfileTable.userId, userId),
    });
    let project_category_preference, skills
    if (!userOnboarding) {
        throw new Error('User onboarding not found');
    } else {
        skills = await db.query.skillTable.findMany({
            where: eq(skillTable.profileId, userOnboarding.id),
        });

        project_category_preference = await db.query.projectCategoryPreferenceTable.findMany({
            where: eq(projectCategoryPreferenceTable.profileId, userOnboarding.id),
        });
    }

    return {
        ...userOnboarding, skills, project_category_preference
    };
}

export const updateUserOnboarding = async (
    updates: {
        userId: string,
        workPace?: workPace;
        skills?: {
            technologies: string[],
            role: string;
            skillLevel: string;
        }[];
        projectCategoryPreference?: {
            categoryPreference: ProjectCategoryPreference[];
            focus: string[];
            openSourcePath?: OpenSourcePath
        };
    }
) => {
    return await db.transaction(async (trx) => {
        let updatedSkill: any[] = [], updatedProjectCategoryPreference;
        try {
            const existingOnboarding = await trx
                .select()
                .from(userProfileTable)
                .where(eq(userProfileTable.userId, updates.userId))
                .limit(1);

            if (!existingOnboarding || existingOnboarding.length === 0) {
                throw new Error(`No onboarding record found for user ID ${updates.userId}`);
            }

            const profileId = existingOnboarding[0]?.id;

            const updatedProfile = await trx
                .update(userProfileTable)
                .set({
                    ...(updates.workPace && { workPace: updates.workPace }),
                    ...{ updatedAt: new Date() }
                })
                .where(eq(userProfileTable.userId, updates.userId))
                .returning();


            if (updates.skills && updates.skills.length > 0) {
                await trx
                    .delete(skillTable)
                    .where(eq(skillTable.profileId, profileId as string));

                for (const skill of updates.skills) {
                    const insertedSkill = await trx.insert(skillTable).values({
                        profileId: profileId as string,
                        role: skill.role,
                        technologies: (skill.technologies),
                        skillLevel: skill.skillLevel
                    }).returning();
                    updatedSkill.push(insertedSkill);
                }

            }

            if (updates.projectCategoryPreference && updatedSkill) {
                await trx
                    .delete(projectCategoryPreferenceTable)
                    .where(eq(projectCategoryPreferenceTable.profileId, profileId as string));

                updatedProjectCategoryPreference = await trx.insert(projectCategoryPreferenceTable).values({
                    profileId: profileId as string,
                    categoryPreference: updates.projectCategoryPreference.categoryPreference,
                    focus: updates.projectCategoryPreference.focus,
                    openSourcePath: (
                        updates.projectCategoryPreference.categoryPreference.includes('open source') &&
                            updates.projectCategoryPreference.openSourcePath
                            ? updates.projectCategoryPreference.openSourcePath
                            : null
                    )
                }).returning()
            }
            return { ...updatedProfile, updatedProjectCategoryPreference, updatedSkill };

        } catch (error: any) {
            throw new Error(`Failed to update onboarding data: ${error.message}`);
        }
    });
};