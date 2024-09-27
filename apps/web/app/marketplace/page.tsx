"use client";

import Filter from "@/components/marketplace/Filter";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface CareerPath {
	id: number;
	title: string;
	category: string;
	description: string;
}

const careerPaths: CareerPath[] = [
	{
		id: 1,
		title: "Frontend Developer",
		category: "Web Development",
		description: "Specialize in creating user interfaces for web applications.",
	},
	{
		id: 2,
		title: "Backend Developer",
		category: "Web Development",
		description: "Focus on server-side logic and database management.",
	},
	{
		id: 3,
		title: "Mobile App Developer",
		category: "Mobile Development",
		description: "Create applications for iOS and Android devices.",
	},
	{
		id: 4,
		title: "Data Scientist",
		category: "Data Science",
		description:
			"Analyze and interpret complex data to help guide decision-making.",
	},
	{
		id: 5,
		title: "DevOps Engineer",
		category: "Infrastructure",
		description: "Bridge the gap between development and IT operations.",
	},
];

const Page: React.FC = () => {
	const [openFilter, setOpenFilter] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [filter, setFilter] = useState<string | undefined>(undefined);
	const [sortOption, setSortOption] = useState<string | undefined>("title");

	const sortCareerPaths = (paths: CareerPath[]) => {
		if (sortOption === "title") {
			return paths.sort((a, b) => a.title.localeCompare(b.title));
		}
		if (sortOption === "category") {
			return paths.sort((a, b) => a.category.localeCompare(b.category));
		}
		return paths;
	};

	const filteredPaths = sortCareerPaths(
		careerPaths.filter(
			(path) =>
				path.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
				(filter === undefined || filter === "all" || path.category === filter),
		),
	);

	return (
		<div className="flex flex-col gap-8 py-12 w-4/5 mx-auto">
			<h1 className="text-center text-4xl font-bold">
				Explore Diverse Career Pathways <br /> in Software Engineering
			</h1>
			<p className="text-center text-lg w-3/4 mx-auto">
				Explore platforms that simulate freelancing, open-source work, and
				company roles to build real-world software engineering skills.
			</p>
			<div className="flex justify-center justify-between">
				<div className="relative flex basis-[70%]">
					<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
					<Input
						type="text"
						placeholder="Search career paths..."
						className="pl-12 py-3 rounded-md"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<Select value={sortOption} onValueChange={setSortOption}>
					<SelectTrigger className="w-52 py-3 rounded-md basis-[13%]">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="title">Sort by Title</SelectItem>
						<SelectItem value="category">Sort by Category</SelectItem>
					</SelectContent>
				</Select>
				<button
					onClick={() => setOpenFilter(!openFilter)}
					className="w-52  rounded-md basis-[13%] border"
				>
					Sort By Filter
				</button>
			</div>
			{openFilter && <Filter />}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredPaths.map((path) => (
					<Card key={path.id} className="shadow-md rounded-md">
						<CardHeader className="bg-gray-100 px-6 py-4 rounded-t-md">
							<CardTitle className="text-lg font-bold">{path.title}</CardTitle>
							<CardDescription className="text-gray-500">
								{path.category}
							</CardDescription>
						</CardHeader>
						<CardContent className="px-6 py-4">
							<p>{path.description}</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Page;
