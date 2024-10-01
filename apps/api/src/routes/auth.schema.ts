import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { emailSchema } from "../../src/validations/auth";

const providerSchema = z.enum(["google", "github"]);
const magicLinkRequestSchema = emailSchema;
const magicLinkResponseSchema = z.object({
	success: z.boolean(),
});
const logoutResponseSchema = z.object({
	success: z.boolean(),
});

const authorizeRoute = createRoute({
	method: "get",
	path: "/{provider}/authorize",
	request: {
		params: z.object({
			provider: providerSchema,
		}),
	},
	responses: {
		200: {
			content: {
				"authDocslication/json": {
					schema: z.object({
						url: z.string().url(),
					}),
				},
			},
			description: "Authorization URL created successfully",
		},
		400: {
			content: {
				"authDocslication/json": {
					schema: z.object({
						success: z.literal(false),
						error: z.string(),
					}),
				},
			},
			description: "Invalid OAuth provider",
		},
	},
	tags: ["Authentication"],
});

const callbackRoute = createRoute({
	method: "get",
	path: "/{provider}/callback",
	request: {
		params: z.object({
			provider: providerSchema,
		}),
		query: z.object({
			code: z.string(),
			state: z.string(),
		}),
	},
	responses: {
		302: {
			description: "Successful authentication, redirects to frontend",
		},
		400: {
			content: {
				"authDocslication/json": {
					schema: z.object({
						success: z.literal(false),
						error: z.string(),
					}),
				},
			},
			description: "Invalid OAuth callback parameters",
		},
		500: {
			content: {
				"authDocslication/json": {
					schema: z.object({
						success: z.literal(false),
						error: z.string(),
						details: z.string(),
					}),
				},
			},
			description: "Unexpected error during authentication",
		},
	},
	tags: ["Authentication"],
});

const getMagicLinkRoute = createRoute({
	method: "post",
	path: "/get-magic-link",
	request: {
		body: {
			content: {
				"authDocslication/json": {
					schema: magicLinkRequestSchema,
				},
			},
		},
	},
	responses: {
		200: {
			content: {
				"authDocslication/json": {
					schema: magicLinkResponseSchema,
				},
			},
			description: "Magic link sent successfully",
		},
	},
	tags: ["Authentication"],
});

const magicLinkLoginRoute = createRoute({
	method: "get",
	path: "/magic/{token}",
	request: {
		params: z.object({
			token: z.string(),
		}),
	},
	responses: {
		302: {
			description: "Successful login, redirects to dashboard",
		},
		400: {
			content: {
				"authDocslication/json": {
					schema: z.object({
						success: z.literal(false),
						error: z.string(),
						status: z.number(),
					}),
				},
			},
			description: "Invalid or expired token",
		},
	},
	tags: ["Authentication"],
});

const logoutRoute = createRoute({
	method: "get",
	path: "/logout",
	responses: {
		200: {
			content: {
				"authDocslication/json": {
					schema: logoutResponseSchema,
				},
			},
			description: "Logout successful",
		},
	},
	tags: ["Authentication"],
});

export const routesSchema = {
	authorizeRoute,
	callbackRoute,
	getMagicLinkRoute,
	magicLinkLoginRoute,
	logoutRoute,
};
