import { z } from "zod";

export const WorkPaceEnum = z.enum([
  "short_term",
  "medium_term",
  "long_term",
  "specific_task",
]);

export const ProjectCategoryPreferenceEnum = z.enum([
  "freelance",
  "open_source",
  "company",
]);

export const OpenSourcePathEnum = z.enum(["rebuild_projects", "solve_issues"]);

export const onboardingSchema = z.object({
  role: z.string(),
  skills: z.string(),
  project_types: z.array(ProjectCategoryPreferenceEnum),
  project_foucus: z.string().array(),
  skill_level: z.string(),
  work_pace: WorkPaceEnum,
  work_types: z.array(OpenSourcePathEnum),
});

export const extendedOnboardingSchema = z.object({
  id: z.string(),
  userId: z.string(),
  role: z.string(),
  skills: z.string().array(),
  categoryPreference: z.array(ProjectCategoryPreferenceEnum),
  focus: z.string().array(),
  skillLevel: z.string(),
  workPace: WorkPaceEnum,
  work_types: z.array(OpenSourcePathEnum).nullable(),  
  updatedAt: z.string().nullable(),
});
export type TOnboardingSchema = z.infer<typeof onboardingSchema>;
