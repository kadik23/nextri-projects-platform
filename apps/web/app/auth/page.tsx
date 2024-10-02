import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
import UserAuthForm from "./_components/form";

export const metadata: Metadata = {
	title: "Sign In - NEXTRI PROJECTS",
	description: "Sign in or create an account to start building projects",
};

export default function AuthenticationPage() {
	return (
		<div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
				<div className="absolute inset-0 bg-zinc-900" />
				<div className="relative z-20 text-lg font-medium">NEXTRI Hub</div>
				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg">
							&ldquo;Try out real tech projects in different work settings -
							freelance, open-source, and companies. Work on tasks just like in
							a real job, practice & refine your skills, and build a portfolio
							that showcases your expertise.&rdquo;
						</p>
						<footer className="text-sm">NEXTRI TEAM</footer>
					</blockquote>
				</div>
			</div>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Welcome to NEXTRI PROJECTS
						</h1>
						<p className="text-sm text-muted-foreground">
							Create an account & start building projects!
						</p>
					</div>
					<UserAuthForm />
				</div>
			</div>
		</div>
	);
}
