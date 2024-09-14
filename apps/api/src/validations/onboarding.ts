import { z } from 'zod';

const WorkPaceUnion = z.union([
    z.literal("Short-term"),
    z.literal("Medium-term"),
    z.literal("Long-term"),
    z.literal("Specific-task")
]);

const ProjectCategoryPreferenceUnion = z.union([
    z.literal("freelance"),
    z.literal("open source"),
    z.literal("company")
]);

const OpenSourcePathUnion = z.union([
    z.literal("rebuild projects"),
    z.literal("solve issues")
]);

export const onboardingSchema = z.object({
    role: z.string(),
    skillLevel: z.string(),
    workPace: WorkPaceUnion,
    categoryPreference: z.array(ProjectCategoryPreferenceUnion),
    focus: z.array(z.string()),
    openSourcePath: OpenSourcePathUnion.optional(),
    technologies: z.array(z.string()),
});

export const onboardingUpdateSchema = z.object({
    id: z.string(),
    skillLevel: z.string().optional(),
    role: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    workPace: WorkPaceUnion.optional(),
    categoryPreference: z.array(ProjectCategoryPreferenceUnion).optional(),
    focus: z.array(z.string()).optional(),
    openSourcePath: OpenSourcePathUnion.optional(),
});