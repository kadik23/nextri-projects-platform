import { z } from 'zod';

export const onboardingSchema = z.object({
    userId: z.string(),
    role: z.string(),
    skillLevel: z.string(),
    workPace: z.string(),
    projectCategoriesPreference: z.array(z.string()),
    technologies: z.array(z.string()),
});

export const onboardingUpdateSchema = z.object({
    userId: z.string().uuid(),
    role: z.string().optional(),
    skillLevel: z.string().optional(),
    workPace: z.string().optional(),
    projectCategoriesPreference: z.array(z.string()).optional(),
    technologies: z.array(z.string()).optional(),
});