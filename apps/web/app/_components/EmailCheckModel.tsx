"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EmailCheckModal() {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Dialog open={true} onOpenChange={() => router.back()}>
				<DialogContent className="sm:max-w-[425px] ">
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold text-center">
							Check Your Email
						</DialogTitle>
						<DialogDescription className="text-center">
							<div className="flex justify-center my-4">
								<Mail className="h-16 w-16 text-blue-500" />
							</div>
							We've sent you an email with further instructions. Please check
							your inbox and follow the link to complete the process.
						</DialogDescription>
					</DialogHeader>
					<div className="mt-6 text-center text-sm text-gray-500">
						Didn't receive an email? Check your spam folder or try again.
					</div>
					<DialogFooter className="sm:justify-center">
						<Button
							className="mt-4 w-full sm:w-auto"
							onClick={() => setIsOpen(false)}
						>
							Continue
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
