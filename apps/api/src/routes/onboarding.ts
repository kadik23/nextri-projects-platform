import { Hono } from "hono";
import {
  onboardingSchema,
  onboardingUpdateSchema,
} from "../validations/onboarding";
import {
  registerOnboarding,
  getMyOnboardingData,
  updateOnboardingData,
} from "../use-cases/onboarding";

const onboarding = new Hono();

onboarding.post("/", async (c) => {
  try {
    const body = await c.req.json();

    const data = onboardingSchema.parse(body);

    const result = await registerOnboarding(data);

    return c.json({ message: "User Onboarding Successful", result });
  } catch (err: any) {
    return c.json(
      { error: "Failed to complete onboarding", details: err.message },
      500
    );
  }
});

onboarding.get("/:user_id", async (c) => {
  try {
    const { user_id } = c.req.param();

    const result = await getMyOnboardingData(user_id);

    return c.json({ message: "User Onboarding Successful", result });
  } catch (err: any) {
    return c.json(
      { error: "Failed to complete onboarding", details: err.message },
      500
    );
  }
});

onboarding.put("/:user_id", async (c) => {
  try {
    const { user_id } = c.req.param();
    const body = await c.req.json();

    const data = onboardingUpdateSchema.parse({
      userId: user_id,
      ...body,
    });

    const result = await updateOnboardingData(data);

    return c.json({ message: "User Onboarding Successful", result });
  } catch (err: any) {
    return c.json(
      { error: "Failed to complete onboarding", details: err.message },
      500
    );
  }
});
export default onboarding;
