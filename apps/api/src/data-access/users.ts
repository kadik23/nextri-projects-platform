import { db, } from "@repo/db/src";
import { projectCategoryPreferenceTable, technologyTable, userTable, userOnboardingTable } from "@repo/db/src/schema";
import { createId } from "@paralleldrive/cuid2";
import { ProjectCategoryPreference, Technology } from "../validations/types";

export const insterUser = async ({ email }: { email: string }) => {
  const newUser = await db.insert(userTable).values({
    email,
    id: createId(),
  });

  return newUser;
};

export const deleteUser = () => {};

export const updateUser = () => {};

export const getUserById = () => {};

export const getUserByEmail = () => {};

export const getAllUsers = () => {};

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
  projectCategoriesPreference: ProjectCategoryPreference[];
  skillLevel: string;
  workPace: string;
  technologies: Technology[];
}) => {
  // Insert into userOnboardingTable
  const [newUserOnboarding] = await db.insert(userOnboardingTable).values({
    userId,
    role,
    skillLevel,
    workPace,
  }).returning({ id: userOnboardingTable.id });

  if(newUserOnboarding){
      const userOnboardingId = newUserOnboarding.id;

    // Insert into projectCategoryPreferenceTable
    if (projectCategoriesPreference.length > 0) {
      await db.insert(projectCategoryPreferenceTable).values(
        projectCategoriesPreference.map(category => ({
          userOnboardingId, 
          name: category.name, 
        }))
      );
    }

    // Insert into technologyTable
    if (technologies.length > 0) {
      await db.insert(technologyTable).values(
        technologies.map(tech => ({
          userOnboardingId,
          name: tech.name,
        }))
      );
    }
  }else{
    console.log("Something went wrong")
  }

  return newUserOnboarding; 
};

