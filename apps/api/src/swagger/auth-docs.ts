import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { emailSchema } from "../../src/validations/auth";

const AuthSwaggerDocs = new OpenAPIHono();
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
        "AuthSwaggerDocslication/json": {
          schema: z.object({
            url: z.string().url(),
          }),
        },
      },
      description: "Authorization URL created successfully",
    },
    400: {
      content: {
        "AuthSwaggerDocslication/json": {
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
        "AuthSwaggerDocslication/json": {
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
        "AuthSwaggerDocslication/json": {
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
        "AuthSwaggerDocslication/json": {
          schema: magicLinkRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "AuthSwaggerDocslication/json": {
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
        "AuthSwaggerDocslication/json": {
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
        "AuthSwaggerDocslication/json": {
          schema: logoutResponseSchema,
        },
      },
      description: "Logout successful",
    },
  },
  tags: ["Authentication"],
});

AuthSwaggerDocs.openapi(authorizeRoute, (c) =>
  c.json(
    { url: "http://localhost:3000/url", success: false, error: "400" },
    200
  )
);
AuthSwaggerDocs.openapi(callbackRoute, (c) =>
  c.redirect("http://localhost:3000")
);
AuthSwaggerDocs.openapi(getMagicLinkRoute, (c) =>
  c.json({ success: true }, 200)
);
AuthSwaggerDocs.openapi(magicLinkLoginRoute, (c) =>
  c.redirect("http://localhost:3000")
);
AuthSwaggerDocs.openapi(logoutRoute, (c) => c.json({ success: true }));

AuthSwaggerDocs.doc("/auth/swagger.json", {
  openapi: "3.0.0",
  info: {
    title: "Authentication API",
    version: "1.0.0",
    description:
      "API for user authentication using OAuth providers and magic links",
  },
  servers: [
    {
      url: "https://api.example.com",
      description: "Production server",
    },
    {
      url: "http://localhost:8000",
      description: "Development server",
    },
  ],
});

export { AuthSwaggerDocs };
