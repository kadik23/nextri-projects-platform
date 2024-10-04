"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import LogoutButton from "./logout-button";
import { Button } from "./ui/button";

interface UserNavProps {
	isCollapsed: boolean;
}

export default function UserNav({ isCollapsed }: UserNavProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"ghost"} className="w-full cursor-pointer space-x-2">
					<Avatar className="w-6 h-6">
						<AvatarImage src="https://github.com/shadcn.png" alt="@abdellah" />
						<AvatarFallback>AC</AvatarFallback>
					</Avatar>
					{!isCollapsed && (
						<span className="text-lg hidden md:block">abdellah chehri</span>
					)}
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<User className="mr-2 h-4 w-4" />
						<span>Profile</span>
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />
				<LogoutButton />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
