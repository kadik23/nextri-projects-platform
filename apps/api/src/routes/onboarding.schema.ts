import { createRoute, z } from "@hono/zod-openapi";
import { extendedOnboardingSchema as onboardingInputSchema } from "../validations/onboarding";
import { onboardingSchema } from "../validations/onboarding";

const onboardingOutputSchema = z.object({
	result: z.array(onboardingInputSchema),
	isOnboarded: z.boolean(),
});

const getOnboardingRoute = createRoute({
	method: "get",
	request: {
		headers: z.object({
			cookie: z.string(),
		}),
	},
	path: "/",
	responses: {
		200: {
			content: {
				"application/json": {
					schema: onboardingOutputSchema,
				},
			},
			description: "Successfull onboarding response",
		},
		401: {
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
					}),
				},
			},
			description: "Credentials are not valid",
		},
		500: {
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
						details: z.any(),
					}),
				},
			},
			description: "Failed to get onboarding",
		},
	},
	tags: ["Onboarding"],
});

const postOnboardingRoute = createRoute({
	method: "post",
	request: {
		headers: z.object({
			cookie: z.string(),
		}),
		body: {
			content: {
				"application/json": {
					schema: onboardingSchema,
				},
			},
		},
	},
	path: "/",
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.object({
						message: z.string(),
						result: z.object({
							id: z.string(),
						}).optional(),
					}),
				},
			},
			description: "Successfull creating onboarding response",
		},
		401: {
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
					}),
				},
			},
			description: "Credentials are not valid",
		},
		400: {
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
						details: z.any(),
					}),
				},
			},
			description: "Validation error",
		},
		500: {
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
						details: z.any(),
					}),
				},
			},
			description: "Failed to complete onboarding",
		},
	},
	tags: ["Onboarding"],
});

export const routesSchema = {
    getOnboardingRoute,
    postOnboardingRoute
}