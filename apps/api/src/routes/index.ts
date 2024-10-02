import path from "node:path";
import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import * as dotenv from "dotenv";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import authRoutes from "./auth.route";
import onboardingRoutes from "./onboarding.route";
import marketplaceRoutes from "./marketplace";

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

const PORT = Number.parseInt(process.env.PORT || "3001", 10);
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const NODE_ENV = process.env.NODE_ENV || "development";

const app = new OpenAPIHono();

app.use("*", logger());
app.use("*", prettyJSON());
app.use(
	"*",
	cors({
		origin: FRONTEND_URL,
		credentials: true,
	}),
);

app.route("/auth", authRoutes);
app.route("/onboarding", onboardingRoutes);
app.route("/", marketplaceRoutes);

app.get("/", (c) => c.redirect(FRONTEND_URL));

app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "NEXTRI PROJECTS API",
		description: "This is the API documentation for NEXTRI PROJECTS Platform.",
	},
});

app.get("/ui", swaggerUI({ url: "/doc" }));

app.onError((err, c) => {
	console.error(`[${new Date().toISOString()}] Error:`, err);
	return c.json(
		{
			error: NODE_ENV === "production" ? "Internal Server Error" : err.message,
			stack: NODE_ENV === "production" ? undefined : err.stack,
		},
		500,
	);
});

const startServer = async () => {
	serve({
		fetch: app.fetch,
		port: PORT,
	});
	console.log(`Server is running on http://localhost:${PORT}`);
	console.log(`Swagger UI available at http://localhost:${PORT}/ui`);
};

startServer();
