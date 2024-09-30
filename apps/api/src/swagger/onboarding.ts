import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import type { Context } from "hono";
import { onboardingSchema } from "../validations/onboarding";
export const app = new OpenAPIHono();

export const extendedOnboardingSchema = onboardingSchema.extend({
	id: z.string(),
	updatedAt: z.string().nullable(),
});

const responseSchema = z.object({
	result: z.array(extendedOnboardingSchema),
	isOnboarded: z.boolean(),
});

const onboardingRoute = createRoute({
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
					schema: responseSchema,
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
						}),
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

app.openapi(onboardingRoute, (c: Context) => {
	return c.json({ onboarding: "onboarding" }, 200);
});

app.openapi(postOnboardingRoute, (c: Context) => {
	return c.json({ onboarding: "onboarding" }, 200);
});
