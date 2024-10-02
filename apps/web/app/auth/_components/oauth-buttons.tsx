"use client";

import { getGithubRedirectUrl, getGoogleRedirectUrl } from "@/app/_api/authFns";
import { displayErrorToast } from "@/app/_lib/Toasts";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OAuthButtons() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState({ google: false, github: false });

	const handleOAuthLogin = async (provider: "google" | "github") => {
		setIsLoading((prev) => ({ ...prev, [provider]: true }));
		try {
			const getRedirectUrl =
				provider === "google" ? getGoogleRedirectUrl : getGithubRedirectUrl;
			const data = await getRedirectUrl();
			if (data?.url) {
				router.push(data.url);
			} else {
				throw new Error(`Failed to get ${provider} redirect URL`);
			}
		} catch (err) {
			displayErrorToast(
				err instanceof Error
					? err.message
					: `An error occurred with ${provider} login`,
			);
		} finally {
			setIsLoading((prev) => ({ ...prev, [provider]: false }));
		}
	};

	return (
		<div className="space-y-3">
			<Button
				variant="outline"
				className="w-full"
				disabled={isLoading.github}
				onClick={() => handleOAuthLogin("github")}
			>
				{isLoading.github ? (
					<Icons.spinner />
				) : (
					<div className="flex items-center gap-2">
						<Icons.gitHub className="h-4 w-4" />
						<span>Sign in with GitHub</span>
					</div>
				)}
			</Button>
			<Button
				variant="outline"
				className="w-full"
				disabled={isLoading.google}
				onClick={() => handleOAuthLogin("google")}
			>
				{isLoading.google ? (
					<Icons.spinner />
				) : (
					<div className="flex items-center gap-2">
						<Icons.google className="h-4 w-4" />
						<span>Sign in with Google</span>
					</div>
				)}
			</Button>
		</div>
	);
}
