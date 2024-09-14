import { Hono } from "hono";
import { onboardingSchema, onboardingUpdateSchema } from "../validations/onboarding";
import {registerOnboarding, getMyOnboardingData, updateOnboardingData} from "../use-cases/onboarding";
import { getUserId } from "../data-access/sessions";

const onboarding = new Hono();

onboarding.post("/",async (c) => {
  try{
    const body = await c.req.json();

    const user = await getUserId(c);
    if(!user){
      return c.json({error:'Credentials are not valid'});
    }else{
      const data = onboardingSchema.parse(body); 

      const result = await registerOnboarding({userId: user,...data})
      
      return c.json({ message: 'User Onboarding Successful', result });
    }
  }catch(err: any){
    return c.json({ error: 'Failed to complete onboarding', details: err.message }, 500);
  }
})

onboarding.get("/", async (c) => {
  try{
    const user = await getUserId(c);
    if(!user){
      return c.json({error:'Credentials are not valid'});
    }else{
      const result = await getMyOnboardingData(user)

      return c.json({ message: 'User Onboarding Successful', result });
    }
  }catch(err: any){
    return c.json({ error: 'Failed to complete onboarding', details: err.message }, 500);
  }
})

onboarding.put("/:id", async (c) => {
  try{
    const {id} = c.req.param();
    const body = await c.req.json();
    const user = await getUserId(c);
    if(!user){
      return c.json('Credentials are not valid');
    }else{
      const data = onboardingUpdateSchema.parse({
        id, 
        ...body,
      })
  
      const result = await updateOnboardingData(data)
  
      return c.json({ message: 'User Onboarding Successful', result });
    }
  }catch(err: any){
    return c.json({ error: 'Failed to complete onboarding', details: err.message }, 500);
  }
})
export default onboarding;
