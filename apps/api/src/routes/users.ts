import { Hono } from "hono";

const users = new Hono();

users.get("/", (c) => c.text("List users")); // GET /user

users.post("/register", async (c) => {});

users.get("/:id", (c) => {
  // GET /user
  const id = c.req.param("id");
  return c.text("Get user: " + id);
});

users.post("/", (c) => c.text("Create user")); // POST /user

export default users;
