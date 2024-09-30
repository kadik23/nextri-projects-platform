"use client";

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
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { onboardUser } from "@/api/onboarding";
import { Icons } from "@/components/icons";
import { MultiSelect } from "@/components/multi-select";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PROJECT_DURATIONS,
  PROJECT_FOCUS,
  PROJECT_TYPES,
  ROLES,
  SKILLS_LEVELS,
  TECH_STACKS,
  WORK_TYPES,
} from "@/constants/data";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

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
  skills: z.string(),
  project_types: z.array(ProjectCategoryPreferenceEnum),
  project_foucus: z.string().array(),
  skill_level: z.string(),
  work_pace: WorkPaceEnum,
  work_types: z.array(OpenSourcePathEnum),
});

interface OptionWithRole {
  label: string;
  value: string;
  role: string;
}

export type TOnboardingSchema = z.infer<typeof formSchema>;

export function OnboardingDialog({ initialValue }: { initialValue: boolean }) {
  const [formStep, setFormStep] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(initialValue);
  const [isNextButtonDisabled, setIsNextButtonDisabled] =
    useState<boolean>(true);
  const [skills, setSkills] = useState<OptionWithRole[]>(TECH_STACKS);

  const mutation = useMutation({
    mutationFn: (data: TOnboardingSchema) => onboardUser(data),
  });

  const form = useForm<TOnboardingSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && formStep < 3 && !isNextButtonDisabled) {
        setFormStep((prevStep) => prevStep + 1);
      } else if (event.key === "ArrowLeft" && formStep > 0) {
        setFormStep((prevStep) => prevStep - 1);
      } else if (
        event.key === "Enter" &&
        formStep === 3 &&
        !isNextButtonDisabled
      ) {
        form.handleSubmit(onSubmit)();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [formStep, setIsNextButtonDisabled, form.handleSubmit]);

  useEffect(() => {
    const SELECTED_ROLE = form.watch("role");
    if (SELECTED_ROLE) {
      const FILTERED_TECH_STACK = TECH_STACKS.filter(
        (item) => item.role === SELECTED_ROLE
      );

      setSkills(FILTERED_TECH_STACK);
    }
  }, [form.watch("role")]);

  useEffect(() => {
    const isNextButtonDisabled = (): boolean => {
      if (formStep === 0) {
        return !form.watch("role") || !form.watch("skills");
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

    setIsNextButtonDisabled(isNextButtonDisabled());
  }, [formStep, form.watch, form.formState]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await mutation.mutateAsync(values);

      setOpen(false);

      toast("you have been successfully onboarded!", {
        icon: "👏",
        style: {
          borderRadius: "3px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent className="w-[500px] min-h-[550px] h-fit pt-4   rounded-t-2xl sm:rounded-md ">
        <DialogHeader className="p-4">
          <DialogTitle>We've got some onboarding questions</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative w-full overflow-x-hidden flex flex-col justify-between "
            id="onboarding-form"
          >
            {/* Step 1 */}
            {formStep === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-fit flex flex-col gap-y-4 px-8 sm:px-0"
              >
                <div className="w-full h-[60px] flex flex-col gap-y-1 items-start justify-center  px-4 ">
                  <p className="text-blue-500 text-sm">Quastion 1 of 4</p>
                  <h1 className="text-xl font-bold">
                    Role and Technology Stack Selection
                  </h1>
                </div>
                <ScrollArea className="h-[300px] ">
                  <div className="w-full min-h-[300px] h-fit px-4 flex flex-col gap-y-4">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="role">
                            What's your role 👨‍💻?
                          </FormLabel>
                          <Select
                            onValueChange={(item) => {
                              setIsNextButtonDisabled(true);
                              field.onChange(item);

                              form.resetField("skills", {
                                keepDirty: false,
                                keepError: false,
                                keepTouched: false,
                              });
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose your role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ROLES.map((item) => {
                                return (
                                  <SelectItem
                                    disabled={item?.disable}
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}

                                    {item?.disable && (
                                      <Badge
                                        variant={"secondary"}
                                        className="ml-4"
                                      >
                                        coming soon
                                      </Badge>
                                    )}
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
                          <FormLabel htmlFor="skills">
                            What type of developer are you?
                          </FormLabel>

                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={!form.formState.dirtyFields.role}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose relevant technologies" />
                                </SelectTrigger>
                              </FormControl>

                              <SelectContent>
                                {skills.map((item) => {
                                  return (
                                    <SelectItem
                                      key={item.value}
                                      value={item.value}
                                    >
                                      {item.label}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </ScrollArea>
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
                <ScrollArea className="h-[300px] ">
                  <div className="w-full min-h-[300px] h-fit px-4 flex flex-col gap-y-4">
                    <FormField
                      control={form.control}
                      name="skill_level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel> How skilled are you?</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose your expertise level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {SKILLS_LEVELS.map((item) => {
                                return (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
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
                          <FormLabel>How long will the project last?</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose the project duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {PROJECT_DURATIONS.map((item) => {
                                return (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
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
                </ScrollArea>
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
                <ScrollArea className="h-[300px] ">
                  <div className="w-full min-h-[300px] h-fit px-4 flex flex-col gap-y-4">
                    <FormField
                      control={form.control}
                      name="project_types"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="project_types">
                            What type of project are you working on?
                          </FormLabel>

                          <FormControl>
                            <MultiSelect
                              onValueChange={(item) => {
                                field.onChange(item.map((item) => item));
                              }}
                              placeholder="Choose the type of project "
                              defaultValue={field.value}
                              options={PROJECT_TYPES}
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
                          <FormLabel htmlFor="project_foucus">
                            What's the project focused on?
                          </FormLabel>

                          <FormControl>
                            <MultiSelect
                              onValueChange={(item) => {
                                field.onChange(item.map((item) => item));
                              }}
                              placeholder="Choose a focus area"
                              defaultValue={field.value}
                              options={PROJECT_FOCUS}
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
                          <FormLabel htmlFor="work_types">
                            How would you like to contribute?
                          </FormLabel>

                          <FormControl>
                            <MultiSelect
                              onValueChange={(item) => {
                                field.onChange(item.map((item) => item));
                              }}
                              defaultValue={field.value}
                              options={WORK_TYPES}
                              placeholder="Choose your work style"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </ScrollArea>
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
                <ScrollArea className="h-[300px] p-4">
                  <div className="space-y-4 ">
                    <ReviewSection
                      label="Selected Role"
                      value={form.watch("role")}
                      options={ROLES}
                    />
                    <ReviewSection
                      label="Selected Skills"
                      value={form.watch("skills")}
                      options={TECH_STACKS}
                    />
                    <ReviewSection
                      label="Skill Level"
                      value={form.watch("skill_level")}
                      options={SKILLS_LEVELS}
                    />
                    <ReviewSection
                      label="Work Pace"
                      value={form.watch("work_pace")}
                      options={PROJECT_DURATIONS}
                    />
                    <ReviewSection
                      label="Project Types"
                      value={form.watch("project_types")}
                      options={PROJECT_TYPES}
                    />
                    <ReviewSection
                      label="Project Focus"
                      value={form.watch("project_foucus")}
                      options={PROJECT_FOCUS}
                    />
                    <ReviewSection
                      label="Work Types"
                      value={form.watch("work_types")}
                      options={WORK_TYPES}
                    />
                  </div>
                </ScrollArea>
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
                  disabled={isNextButtonDisabled}
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
                  {mutation.isPending && <Icons.spinner />}
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

interface ReviewSectionProps {
  label: string;
  value: string | string[];
  options: Array<{ value: string; label: string }>;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  label,
  value,
  options,
}) => (
  <div className="space-y-2">
    <p className="font-medium">{label}</p>
    <div className="flex flex-wrap gap-2">
      {Array.isArray(value) ? (
        value.map((item) => {
          const option = options.find((o) => o.value === item);
          return (
            <Badge key={item} variant="outline" className="p-2">
              {option?.label || item}
            </Badge>
          );
        })
      ) : (
        <Badge variant="outline" className="p-2">
          {options.find((o) => o.value === value)?.label || value}
        </Badge>
      )}
    </div>
  </div>
);
