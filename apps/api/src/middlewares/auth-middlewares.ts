import { Context } from "hono";
import { BlankEnv, Next } from "hono/types";

export const authMiddlewares = async (
  c: Context<BlankEnv, "/protected/*", {}>,
  next: Next
) => {
  await next();
};
