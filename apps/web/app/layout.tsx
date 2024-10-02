import Providers from "@/components/Providers";
import "./_styles/globals.css";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
	title: "Nextri projects",
	description: "something we are trying to build it ",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang="en" className={GeistSans.variable}>
			<body>
				<Providers>{children}</Providers>
				<Toaster position="bottom-center" reverseOrder={false} />
			</body>
		</html>
	);
}
