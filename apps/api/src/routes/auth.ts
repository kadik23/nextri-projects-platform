import { Hono } from "hono";

const auth = new Hono().basePath("/auth");

auth.post("/get-magic-link", (c) => c.text("List users")); // GET /user

auth.get("/magic", async (c) => {});

export default auth;
