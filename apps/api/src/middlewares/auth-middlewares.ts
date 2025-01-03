import type { Context } from "hono";
import type { BlankEnv, Next } from "hono/types";

//TODO : handle creating a proteced routes
export const authMiddlewares = async (
	c: Context<BlankEnv, "*", {}>,
	next: Next,
) => {
	// think this middleware should run for every requst then if the reuest route is proteced then we check about the session if it's valide

	await next();
};
