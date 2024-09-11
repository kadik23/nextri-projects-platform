import { Hono } from "hono";
import { onboardingSchema } from "../validations/onboarding";
import {registerOnboarding} from "../use-cases/onboarding";

const onboarding = new Hono();

onboarding.post("/",async (c) => {
  try{
    const body = await c.req.json();

    const data = onboardingSchema.parse(body); 

    const result = await registerOnboarding(data)
    
    return c.json({ message: 'User Onboarding Successful', result });
  }catch(err: any){
    return c.json({ error: 'Failed to complete onboarding', details: err.message }, 500);
  }
})

export default onboarding;
