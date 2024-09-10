import { serve } from "@hono/node-server";
import { Hono } from "hono";
import auth from "./auth";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/", auth); // Handle /auth

const port = 3001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
