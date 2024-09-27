import Providers from "@/components/Providers";
import "./_styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

const roboto = Poppins({
	subsets: ["latin"],
	weight: ["100", "300", "500", "700", "900"],
});

export const metadata: Metadata = {
	title: "Nextri projects",
	description: "something we are trying to build it ",
};

// add selection and providers and modals

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<Providers>{children}</Providers>
				<Toaster position="bottom-center" reverseOrder={false} />
			</body>
		</html>
	);
}
