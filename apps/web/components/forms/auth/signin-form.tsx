"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInByGithub, signInByGoogle, signInByMagicLink } from "@/api/auth";
import { useRouter } from "next13-progressbar";
import { useMutation } from "@tanstack/react-query";
import { Icons } from "@/components/icons";

const formSchema = z.object({
  email: z.string().email(),
});

export function SignInForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const signInByEmailMutation = useMutation({
    mutationFn: (email: string) =>
      signInByMagicLink({
        email: email,
      }),
  });
  const signInByGoogleMutation = useMutation({
    mutationFn: signInByGoogle,
  });
  const signInByGithubMutation = useMutation({
    mutationFn: signInByGithub,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signInByEmailMutation.mutateAsync(values.email);
      router.push("/auth/verify-email");
    } catch (err) {
      console.error(err);
      // handle taosts here  log this error to somewhere
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={signInByEmailMutation.isPending}
            className="w-full h-12"
            type="submit"
          >
            {signInByEmailMutation.isPending ? "loading" : "log in"}
          </Button>
        </form>
      </Form>

      <div className="w-full h-1 border-b border-neutral-200" />
      <span className="mx-auto text-neutral-700 text-sm">Or you can use</span>
      <div className="w-full h-[50px] grid grid-cols-2 gap-x-4">
        <Button
          className="w-full h-12 border bg-white"
          variant={"secondary"}
          type="submit"
          disabled={signInByGoogleMutation.isPending}
          onClick={() => signInByGoogleMutation.mutate()}
        >
          <Icons.google className="w-4 h-4 mr-2" />
          {signInByGoogleMutation.isPending ? "loading" : "Google"}
        </Button>
        <Button
          className="w-full h-12 border bg-white"
          variant={"secondary"}
          type="submit"
          disabled={signInByGithubMutation.isPending}
          onClick={() => signInByGithubMutation.mutate()}
        >
          <Icons.gitHub className="w-4 h-4 mr-2" />
          {signInByGithubMutation.isPending ? "loading" : "Github"}
        </Button>
      </div>
    </>
  );
}
