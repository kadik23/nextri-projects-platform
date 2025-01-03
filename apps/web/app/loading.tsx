import { Icons } from "@/components/icons";
import React from "react";

export default function loading() {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<Icons.spinner />
		</div>
	);
}
