import { ZodError } from "zod";
import { getUserId } from "../data-access/sessions";
import {
	getMyOnboardingData,
	registerOnboarding,
} from "../use-cases/onboarding";
import { onboardingSchema } from "../validations/onboarding";
import { routesSchema } from "./onboarding.schema";
import { OpenAPIHono } from "@hono/zod-openapi";
import type { Context } from "hono";

const onboarding = new OpenAPIHono();

onboarding.openapi(routesSchema.getOnboardingRoute,  async (c: Context) => {
	const user = await getUserId(c);

	if (!user) {
		return c.json({ error: "Credentials are not valid" }, 401);
	}
	try {
		const result = await getMyOnboardingData(user);
		console.log("this is the user if onboarded or not ");
		console.log(result);

		return c.json({ message: "User Onboarding Successful", result, isOnboarded: result.length !== 0 }, 200);
	} catch (err) {
		console.error(err);
		return c.json(
			{ error: "Failed to complete onboarding", details: err },
			500,
		);		  
	}
});

onboarding.openapi(routesSchema.postOnboardingRoute, async (c: Context) => {
	try {
		const body = await c.req.json();
		const data = onboardingSchema.parse(body);

		const user_id = await getUserId(c);

		if (!user_id) {
			return c.json({ error: "Credentials are not valid" }, 401);
		}
		const result = await registerOnboarding({
			userId: user_id,
			project_foucus: data.project_foucus,
			project_types: data.project_types,
			role: data.role,
			skill_level: data.skill_level,
			skills: data.skills,
			work_pace: data.work_pace,
			work_types: data.work_types,
		});

		return c.json({ message: "User Onboarding Successful", result }, 200);
	} catch (err: unknown) {
		if (err instanceof ZodError) {
			return c.json({ error: "Validation failed", details: err.errors }, 400);
		}

		console.error(err);
		return c.json(
			{
				error: "Failed to complete onboarding",
				details: (err as Error).message,
			},
			500,
		);
	}
});

// onboarding.put("/:id", async (c) => {
//   try {
//     const { id } = c.req.param();
//     const body = await c.req.json();
//     const user = await getUserId(c);
//     if (!user) {
//       return c.json("Credentials are not valid");
//     } else {
//       const data = onboardingUpdateSchema.parse({
//         id,
//         ...body,
//       });

//       const result = await updateOnboardingData(data);

//       return c.json({ message: "User Onboarding Successful", result });
//     }
//   } catch (err: any) {
//     return c.json(
//       { error: "Failed to complete onboarding", details: err.message },
//       500
//     );
//   }
// });
export default onboarding;
