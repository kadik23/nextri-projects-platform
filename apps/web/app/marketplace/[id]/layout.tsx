import Sidebar from "@/components/layout/side-bar";
import type React from "react";
import type { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<Sidebar />
			<div className="w-[100%-[14rem]  ml-[14rem] min-h-screen h-fit bg-zinc-100]">
				<div className=" bg-neutral-50 p-8">{children}</div>
			</div>
		</div>
	);
};

export default Layout;
