import { z } from 'zod';

export const onboardingSchema = z.object({
    userId: z.string().uuid(),
    role: z.string(),
    skillLevel: z.string(),
    workPace: z.string(),
    projectCategoriesPreference: z.array(z.string()),
    technologies: z.array(z.string()),
});
