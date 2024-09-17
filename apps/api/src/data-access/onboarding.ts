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
