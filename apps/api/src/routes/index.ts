import { serve } from "@hono/node-server";
import { Hono } from "hono";
import authRoutes from "./auth";

const app = new Hono();

app.use("/protected/*", async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`);
  // here validated the request
  await next();
});

app.route("/auth", authRoutes);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const PORT = 3001;
console.log(`Server is running on http://localhost:${PORT}`);

serve({
  fetch: app.fetch,
  port: PORT,
});
