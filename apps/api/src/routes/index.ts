import { serve } from "@hono/node-server";
import { Hono } from "hono";
import authRoutes from "./auth";

import * as dotenv from "dotenv";
import path from "path";

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

const app = new Hono();

// app.use("/protected/*", async (c, next) => {
//   console.log(`[${c.req.method}] ${c.req.url}`);
//   // here validated the request
//   await next();
// });

app.route("/auth", authRoutes);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const PORT = 3001;
console.log(`Server is running on http://localhost:${PORT}`);

console.log(process.env.RESEND_API_KEY);

serve({
  fetch: app.fetch,
  port: PORT,
});
