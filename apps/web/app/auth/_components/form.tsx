"use client";

import { requestMagicLink } from "@/app/_api/authFns";
import { displayErrorToast } from "@/app/_lib/Toasts";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OAuthButtons from "./oauth-buttons";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function UserAuthForm() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!EMAIL_REGEX.test(email)) {
			setErrorMessage("Invalid Email Address");
			return;
		}
		setIsLoading(true);
		setErrorMessage("");
		try {
			const data = await requestMagicLink(email);
			if (data?.success) {
				router.push("/auth/check-email");
			} else {
				throw new Error("Failed to send magic link");
			}
		} catch (err) {
			displayErrorToast(
				err instanceof Error ? err.message : "An error occurred",
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<form className="space-y-4 w-full max-w-md" onSubmit={handleSubmit}>
				<div className="space-y-2">
					<Input
						id="email"
						type="email"
						placeholder="Enter your email"
						autoComplete="off"
						className={`mt-0 py-1 rounded-md h-9 ${errorMessage ? "border-red-600" : ""}`}
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							setErrorMessage("");
						}}
						aria-invalid={!!errorMessage}
						aria-describedby={errorMessage ? "email-error" : undefined}
					/>
					{errorMessage && (
						<p id="email-error" className="text-red-500 text-sm">
							{errorMessage}
						</p>
					)}
				</div>
				<Button
					type="submit"
					className="w-full disabled:opacity-50 flex justify-center items-center gap-2"
					disabled={isLoading}
				>
					{isLoading ? <Icons.spinner /> : "Send Magic Link"}
				</Button>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<OAuthButtons />
		</>
	);
}
