import { Hono } from "hono";
import { getUserId } from "../data-access/sessions";
import {
  getMyOnboardingData,
  registerOnboarding,
} from "../use-cases/onboarding";
import { onboardingSchema } from "../validations/onboarding";

const onboarding = new Hono();

onboarding.post("/", async (c) => {
  const body = await c.req.json();

  const data = onboardingSchema.parse(body);

  const user_id = await getUserId(c);

  if (!user_id) {
    return c.json({ error: "Credentials are not valid" });
  }
  try {
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

    return c.json({ message: "User Onboarding Successful", result });
  } catch (err) {
    console.log(err);
    return c.json(
      { error: "Failed to complete onboarding", details: err },
      500
    );
  }
});

onboarding.get("/", async (c) => {
  const user = await getUserId(c);

  if (!user) {
    return c.json({ error: "Credentials are not valid" });
  }
  try {
    const result = await getMyOnboardingData(user);
    console.log("this is the user if onboarded or not ");
    console.log(result);

    return c.json({ result, isOnboarded: result.length !== 0 });
  } catch (err) {
    console.error(err);
    return c.json(
      { error: "Failed to complete onboarding", details: err },
      500
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
