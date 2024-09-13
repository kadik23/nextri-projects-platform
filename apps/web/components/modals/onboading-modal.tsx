"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

m;
const formSchema = z.object({
  username: z.string().min(2).max(50),
  role: z.string(),
});

export function OnboardingDialog() {
  const [formStep, setFormStep] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // Handle form submission (e.g., API call)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[500px] h-[550px]  flex flex-col justify-between  pt-4 ">
        <div className="w-full h-[60px] flex flex-col gap-y-1 items-start justify-center px-4 ">
          <p className="text-gray-500 text-lg">Quastion 1 of 4</p>
          <h1 className="text-2xl font-bold">
            Role and Technology Stack Selection
          </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative space-y-3 overflow-x-hidden  "
          >
            {/* Step 1 */}
            {formStep === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <div className="w-full min-h-[300px] h-fit px-4">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select your role </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@example.com">
                              m@example.com
                            </SelectItem>
                            <SelectItem value="m@google.com">
                              m@google.com
                            </SelectItem>
                            <SelectItem value="m@support.com">
                              m@support.com
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2 */}
            {formStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <div className="w-full h-[300px] "></div>
              </motion.div>
            )}

            {/* Step 3 */}
            {formStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <div className="w-full h-[300px] "></div>
              </motion.div>
            )}

            {/* Dialog Footer: Navigation Buttons */}
            <DialogFooter className="flex justify-end items-center gap-x-4  h-[100px] bg-zinc-200 px-4">
              {/* Go Back Button */}
              {formStep > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setFormStep(formStep - 1)}
                >
                  Go Back
                </Button>
              )}

              {/* Next Step Button */}
              {formStep < 2 && (
                <Button
                  type="button"
                  variant="default"
                  onClick={() => setFormStep(formStep + 1)}
                >
                  Next Step
                </Button>
              )}

              {/* Submit Button (only shows on final step) */}
              {formStep === 2 && (
                <Button type="submit" className="btn-primary">
                  Submit
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
