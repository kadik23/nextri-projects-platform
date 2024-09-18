"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MultiSelect } from "../multi-select";
import {
  PROJECT_DURATIONS,
  PROJECT_FOCUS,
  PROJECT_TYPES,
  ROLS,
  SKILLS_LEVELS,
  TECH_STACKS,
  WORK_TYPES,
} from "@/config/data";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { onbordUser } from "@/api/onboarding";
import { useMutation } from "@tanstack/react-query";

export const WorkPaceEnum = z.enum([
  "short_term",
  "medium_term",
  "long_term",
  "specific_task",
]);

export const ProjectCategoryPreferenceEnum = z.enum([
  "freelance",
  "open_source",
  "company",
]);

export const OpenSourcePathEnum = z.enum(["rebuild_projects", "solve_issues"]);

export const formSchema = z.object({
  role: z.string(),
  skills: z.string().array(),
  project_types: z.array(ProjectCategoryPreferenceEnum),
  project_foucus: z.string().array(),
  skill_level: z.string(),
  work_pace: WorkPaceEnum,
  work_types: z.array(OpenSourcePathEnum),
});

export type TOnboardingSchema = z.infer<typeof formSchema>;

export function OnboardingDialog({ initialValue }: { initialValue: boolean }) {
  const [formStep, setFormStep] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(initialValue);

  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  const mutation = useMutation({
    mutationFn: (data: TOnboardingSchema) => onbordUser(data),
  });

  const form = useForm<TOnboardingSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && formStep < 3 && !isEnabled) {
        setFormStep((prevStep) => prevStep + 1);
      } else if (event.key === "ArrowLeft" && formStep > 0) {
        setFormStep((prevStep) => prevStep - 1);
      } else if (event.key === "Enter" && formStep === 3 && !isEnabled) {
        form.handleSubmit(onSubmit)();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [formStep, isEnabled]);

  useEffect(() => {
    const isNextButtonDisabled = (): boolean => {
      if (formStep === 0) {
        return !form.watch("role") || form.watch("skills")?.length === 0;
      }
      if (formStep === 1) {
        return !form.watch("skill_level") || !form.watch("work_pace");
      }
      if (formStep === 2) {
        return !(
          form.watch("project_types")?.length &&
          form.watch("project_foucus")?.length &&
          form.watch("work_types")?.length
        );
      }
      return false;
    };

    setIsEnabled(isNextButtonDisabled());
  }, [formStep, form.formState]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await mutation.mutateAsync(values);

      setOpen(false);

      // display toasts here
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[500px] min-h-[550px] h-fit  pt-4  ">
        <DialogHeader className="p-4">
          <DialogTitle>We've got some onboarding questions</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative  w-full overflow-x-hidden flex flex-col justify-between "
            id="onboarding-form"
          >
            {/* Step 1 */}
            {formStep === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-fit flex flex-col gap-y-4"
              >
                <div className="w-full h-[60px] flex flex-col gap-y-1 items-start justify-center px-4 ">
                  <p className="text-blue-500 text-sm">Quastion 1 of 4</p>
                  <h1 className="text-xl font-bold">
                    Role and Technology Stack Selection
                  </h1>
                </div>
                <div className="w-full min-h-[300px] h-fit px-4 flex flex-col gap-y-4">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>what is your role 👨‍💻 ? </FormLabel>
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
                            {ROLS.map((item) => {
                              return (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          tell us more about your tech stack{" "}
                        </FormLabel>

                        <FormControl>
                          <MultiSelect
                            options={TECH_STACKS}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder="Select a techstack"
                            animation={0}
                            maxCount={4}
                          />
                        </FormControl>

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
                className="space-y-8"
              >
                <div className="w-full h-[60px] flex flex-col gap-y-1 items-start justify-center px-4 ">
                  <p className="text-blue-500 text-sm">Quastion 2 of 4</p>
                  <h1 className="text-2xl font-bold">
                    Skill Level and Work Pace Selection
                  </h1>
                </div>
                <div className="w-full min-h-[300px] h-fit px-4 flex flex-col gap-y-4">
                  <FormField
                    control={form.control}
                    name="skill_level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>select your level </FormLabel>
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
                            {SKILLS_LEVELS.map((item) => {
                              return (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="work_pace"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          how much time will you dedicate to us{" "}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a valid option to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PROJECT_DURATIONS.map((item) => {
                              return (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3 */}
            {formStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="w-full h-[60px] flex flex-col gap-y-1 items-start justify-center px-4 ">
                  <p className="text-blue-500 text-sm">Quastion 3 of 4</p>
                  <h1 className="text-2xl font-bold">
                    Project Category Preferences
                  </h1>
                </div>
                <div className="w-full min-h-[300px] h-fit px-4 flex flex-col gap-y-4">
                  <FormField
                    control={form.control}
                    name="project_types"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>what type of project you want ? </FormLabel>

                        <FormControl>
                          <MultiSelect
                            options={PROJECT_TYPES}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder="Select frameworks"
                            animation={0}
                            maxCount={4}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="project_foucus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          what kind of project you want to focus on ?{" "}
                        </FormLabel>

                        <FormControl>
                          <MultiSelect
                            options={PROJECT_FOCUS}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder="Select your type"
                            animation={0}
                            maxCount={4}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="work_types"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>what kind of work you want ?</FormLabel>

                        <FormControl>
                          <MultiSelect
                            options={WORK_TYPES}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder="select what type of work you want"
                            animation={0}
                            maxCount={4}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </motion.div>
            )}
            {/* Step 4 */}
            {formStep === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="w-full h-[60px] flex flex-col gap-y-1 items-start justify-center px-4 ">
                  <p className="text-blue-500 text-sm">Quastion 4 of 4</p>
                  <h1 className="text-2xl font-bold">Review and Submission</h1>
                </div>
                <div className="w-full min-h-[400px] h-fit px-4 flex flex-col gap-y-4">
                  <div className="w-full h-[60px] flex flex-col gap-y-2">
                    <label>your selected role </label>
                    <Badge
                      className={cn(
                        "bg-transparent w-fit text-black border-black hover:bg-transparent p-1"
                      )}
                    >
                      {form.watch("role") ?? ""}
                    </Badge>
                  </div>
                  <div className="w-full h-[60px] flex flex-col gap-y-2">
                    <label>your selected skill stack </label>
                    <div className="flex flex-wrap gap-x-4 ">
                      {form.watch("skills")?.map((item) => {
                        const option = TECH_STACKS.find(
                          (o) => o.value === item
                        );

                        return (
                          <Badge
                            key={item}
                            className={cn(
                              "bg-transparent w-fit text-black border-black hover:bg-transparent p-1"
                            )}
                          >
                            {option?.label}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  <div className="w-full h-[60px] flex flex-col gap-y-2">
                    <label>your selected level </label>
                    <Badge
                      className={cn(
                        "bg-transparent w-fit text-black border-black hover:bg-transparent p-1"
                      )}
                    >
                      {form.watch("skill_level") ?? ""}
                    </Badge>
                  </div>

                  <div className="w-full h-[60px] flex flex-col gap-y-2">
                    <label>your selected role </label>
                    <Badge
                      className={cn(
                        "bg-transparent w-fit text-black border-black hover:bg-transparent p-1"
                      )}
                    >
                      {form.watch("work_pace") ?? ""}
                    </Badge>
                  </div>

                  <div className="w-full h-[60px] flex flex-col gap-y-2">
                    <label>your selected project type </label>
                    <div className="flex flex-wrap gap-x-4 ">
                      {form.watch("project_types")?.map((item) => {
                        const option = PROJECT_TYPES.find(
                          (o) => o.value === item
                        );

                        return (
                          <Badge
                            key={item}
                            className={cn(
                              "bg-transparent w-fit text-black border-black hover:bg-transparent p-1"
                            )}
                          >
                            {option?.label}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                  <div className="w-full h-[60px] flex flex-col gap-y-2">
                    <label>your selected Focus Selection </label>
                    <div className="flex flex-wrap gap-x-4 ">
                      {form.watch("project_foucus")?.map((item) => {
                        const option = PROJECT_FOCUS.find(
                          (o) => o.value === item
                        );

                        return (
                          <Badge
                            key={item}
                            className={cn(
                              "bg-transparent w-fit text-black border-black hover:bg-transparent p-1"
                            )}
                          >
                            {option?.label}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Dialog Footer: Navigation Buttons */}
            <DialogFooter className="flex justify-end items-center gap-x-4   w-full h-[100px] bg-zinc-100 px-4">
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
              {formStep < 3 && (
                <Button
                  type="button"
                  variant="default"
                  disabled={isEnabled}
                  onClick={() => setFormStep(formStep + 1)}
                >
                  Next Step
                </Button>
              )}

              {/* Submit Button (only shows on final step) */}
              {formStep === 3 && (
                <Button
                  disabled={mutation.isPending}
                  type="submit"
                  form="onboarding-form"
                  className="btn-primary"
                >
                  {mutation.isPending && (
                    <svg
                      className={"mr-2 h-5 w-5 animate-spin text-inverted"}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  )}
                  submit
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
