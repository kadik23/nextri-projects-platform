import { db } from "@repo/db/src";
import { eq } from "@repo/db/src/drizzle-functions";
import { userProfileTable } from "@repo/db";
import { getRandomId } from "../lib/utils";
import { TOnboardingSchema } from "../validations/onboarding";

export const insertUserOnboarding = async ({
  userId,
  role,
  project_foucus,
  project_types,
  skill_level,
  skills,
  work_pace,
  work_types,
}: TOnboardingSchema & { userId: string }) => {
  const [newUserProfile] = await db
    .insert(userProfileTable)
    .values({
      id: getRandomId(),
      userId,
      workPace: work_pace,
      skillLevel: skill_level,
      skills,
      role,
      categoryPreference: project_types,
      focus: project_foucus,
      work_types,
    })
    .returning({ id: userProfileTable.id });

  return newUserProfile;
};
export const getUserOnboarding = async (user_id: string) => {
  const userOnboarding = await db.query.userProfileTable.findMany({
    where: eq(userProfileTable.userId, user_id),
  });

  return {
    ...userOnboarding,
  };
};

// export const updateUserOnboarding = async (updates: {
//   id: string;
//   workPace?: workPace;
//   technologies?: string[];
//   role?: string;
//   skillLevel?: string;
//   categoryPreference?: ProjectCategoryPreference[];
//   focus?: string[];
//   openSourcePath?: OpenSourcePath;
// }) => {
//   return await db.transaction(async (trx) => {
//     try {
//       const existingOnboarding = await trx
//         .select()
//         .from(userProfileTable)
//         .where(eq(userProfileTable.id, updates.id))
//         .limit(1);

//       if (!existingOnboarding || existingOnboarding.length === 0) {
//         throw new Error(`No onboarding record found for ID ${updates.id}`);
//       }

//       const updatedProfile = await trx
//         .update(userProfileTable)
//         .set({
//           ...(updates.workPace && { workPace: updates.workPace }),
//           ...(updates.role && { role: updates.role }),
//           ...(updates.technologies && { technologies: updates.technologies }),
//           ...(updates.skillLevel && { skillLevel: updates.skillLevel }),
//           ...(updates.categoryPreference && {
//             categoryPreference: updates.categoryPreference,
//           }),
//           ...(updates.focus && { focus: updates.focus }),
//           ...(updates.openSourcePath && {
//             openSourcePath: updates.openSourcePath,
//           }),
//           ...{ updatedAt: new Date() },
//         })
//         .where(eq(userProfileTable.id, updates.id))
//         .returning();

//       return { ...updatedProfile };
//     } catch (error: any) {
//       throw new Error(`Failed to update onboarding data: ${error.message}`);
//     }
//   });
// };
