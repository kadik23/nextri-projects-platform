import path from "node:path";
import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import * as dotenv from "dotenv";
import { cors } from "hono/cors";
import authRoutes from "./auth";
import marketplaceRoutes from "./marketplace";
import onboardingRoutes from "./onboarding";

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

const app = new OpenAPIHono();

app.use(
	"*",
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	}),
);

app.route("/auth", authRoutes);
app.route("/onboarding", onboardingRoutes);

app.route("/", marketplaceRoutes);

app.get("/", async (c) => {
	return c.redirect("http://localhost:3000");
});

app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "NEXTRI PROJECTS API",
		description: "This is the API documentation for NEXTRI PROJECTS Platform.",
	},
});

app.get("/ui", swaggerUI({ url: "/doc" }));

const PORT = 3001;
console.log(`Server is running on http://localhost:${PORT}`);

serve({
	fetch: app.fetch,
	port: PORT,
});
