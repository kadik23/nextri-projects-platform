import { serve } from "@hono/node-server";
import { Hono } from "hono";
import authRoutes from "./auth";
import marketplaceRoutes from "./marketplace";
import onboardingRoutes from "./onboarding";
import * as dotenv from "dotenv";
import path from "node:path";
import { cors } from "hono/cors";
import { setCookie } from "hono/cookie";

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


// The openapi.json will be available at /doc



// app.use("/protected/*", async (c, next) => {
//   console.log(`[${c.req.method}] ${c.req.url}`);
//   // here validated the request
//   await next();
// });

app.route("/auth", authRoutes);
app.route("/onboarding", onboardingRoutes);

app.route("/",marketplaceRoutes);

app.get("/", async (c) => {
  setCookie(c, "abdellah cookie", "hada hia value", {
    path: "/",
    secure: process.env.NODE_ENV === "production", // Only secure in production
    maxAge: 60 * 10,
  });
  return c.redirect("http://localhost:3000");
});

const PORT = 3001;
console.log(`Server is running on http://localhost:${PORT}`);

serve({
  fetch: app.fetch,
  port: PORT,
});
