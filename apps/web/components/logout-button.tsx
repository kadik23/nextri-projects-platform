"use client";

import { signOut } from "@/app/_api/authFns";
import { type FC, useState } from "react";
import { Button } from "./ui/button";

const LogoutButton: FC = () => {
	const [loading, setIsLoading] = useState<boolean>(false);

	return (
		<Button
			onClick={async () => {
				setIsLoading(true);
				try {
					await signOut();
					window.location.reload();
				} catch (err) {
					console.log(err);
				} finally {
					setIsLoading(false);
				}
			}}
			disabled={loading}
			variant={"outline"}
		>
			logout
		</Button>
	);
};

export default LogoutButton;
