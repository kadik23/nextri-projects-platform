"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	Award,
	BookOpen,
	Bookmark,
	Briefcase,
	Home,
	Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC, useState } from "react";
import UserNav from "../user-nav";

const sidebarLinks = [
	{ label: "Dashboard (Home)", icon: Home, href: "/" },
	{ label: "Project Marketplace", icon: Briefcase, href: "/marketplace" },
	{ label: "My Projects", icon: Briefcase, href: "/my-projects" },
	{ label: "Bookmarks", icon: Bookmark, href: "/bookmarks" },
	{ label: "Achievements & Badges", icon: Award, href: "/achievements" },
	{ label: "Learning Resources", icon: BookOpen, href: "/learning-resources" },
	{ label: "Settings", icon: Settings, href: "/settings" },
];

const Sidebar: FC = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const currentRoute = usePathname();
	const toggleCollapse = () => setIsCollapsed(!isCollapsed);

	return (
		<aside
			className={cn(
				"fixed inset-y-0 left-0 z-10 flex flex-col border-r bg-background transition-all duration-300",
				isCollapsed ? "w-14" : "md:w-56 w-20",
			)}
		>
			<div className="w-full h-fit min-h-[100px] flex flex-col gap-y-2 p-4">
				<UserNav isCollapsed={isCollapsed} />
			</div>

			<div className="flex flex-col md:flex-row items-center justify-between p-4">
				{!isCollapsed && (
					<span className="text-sm md:text-xl font-bold">NEXTRI PROJECTS</span>
				)}
				<Button variant="ghost" size="sm" onClick={toggleCollapse}>
					{isCollapsed ? "→" : "←"}
				</Button>
			</div>

			<nav className="flex flex-col space-y-2 mt-4 px-1">
				{sidebarLinks.map((link, index) => {
					const Icon = link.icon;
					const isActive = currentRoute === link.href;

					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<Link href={link.href} className="w-full" key={index}>
							<Button
								variant="ghost"
								className={cn(
									"w-full justify-start px-4 py-2 hover:bg-gray-200 hover:text-opacity-75 transition-all",
									isCollapsed ? "justify-center" : "justify-start",
									"relative group",
									isActive ? "bg-gray-300 text-opacity-100" : "",
								)}
							>
								<Icon className="h-5 w-5" />
								{!isCollapsed && (
									<span className="ml-3 hidden md:block">{link.label}</span>
								)}
								<span className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
							</Button>
						</Link>
					);
				})}
			</nav>
		</aside>
	);
};

export default Sidebar;
