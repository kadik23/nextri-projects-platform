import { serve } from "@hono/node-server";
import { Hono } from "hono";
import authRoutes from "./auth";
import marketplaceRoutes from "./marketplace";
<<<<<<< HEAD
<<<<<<< HEAD
import onboardingRoutes from "./onboarding";
=======
import { swaggerUI } from "@hono/swagger-ui";
import { z } from "zod"
>>>>>>> 193798b (removed honoOpenapi)
=======
import { swaggerUI } from "@hono/swagger-ui";
import { z } from "zod"
>>>>>>> 193798b8480ba9944e6d8f5ef41b9aa103849f20
import * as dotenv from "dotenv";
import path from "path";
import { cors } from "hono/cors";
import { setCookie } from "hono/cookie";

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

const app = new Hono();
<<<<<<< HEAD

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
=======
>>>>>>> 193798b (removed honoOpenapi)


// The openapi.json will be available at /doc




// The openapi.json will be available at /doc



// app.use("/protected/*", async (c, next) => {
//   console.log(`[${c.req.method}] ${c.req.url}`);
//   // here validated the request
//   await next();
// });

app.route("/auth", authRoutes);
app.route("/onboarding", onboardingRoutes);

app.route("/",marketplaceRoutes);

<<<<<<< HEAD
app.get("/", async (c) => {
  setCookie(c, "abdellah cookie", "hada hia value", {
    path: "/",
    secure: process.env.NODE_ENV === "production", // Only secure in production
    maxAge: 60 * 10,
  });
  return c.redirect("http://localhost:3000");
=======
app.get("/", (c) => {
  return c.text("Hello Hono!");
>>>>>>> 193798b8480ba9944e6d8f5ef41b9aa103849f20
});

const PORT = 3001;
console.log(`Server is running on http://localhost:${PORT}`);

serve({
  fetch: app.fetch,
  port: PORT,
});
