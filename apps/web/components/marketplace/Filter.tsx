import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import type React from "react";
import { useState } from "react";

const Filter: React.FC = () => {
	const [categories, setCategories] = useState<string[]>([]);
	const [alternatives, setAlternatives] = useState<string[]>([]);
	const [languages, setLanguages] = useState<string[]>([]);
	const [topics, setTopics] = useState<string[]>([]);
	const [stars, setStars] = useState<[number, number]>([0, 73236]);
	const [forks, setForks] = useState<[number, number]>([0, 24486]);

	// Data for each filter section
	const categoryOptions: string[] = [
		"Software Development",
		"No-Code",
		"Internal Tools",
		"CMS",
		"Monitoring",
		"Security",
	];

	const alternativeOptions: string[] = [
		"Notion",
		"WordPress",
		"Retool",
		"Airplane",
		"Make",
	];

	const languageOptions: string[] = [
		"TypeScript",
		"JavaScript",
		"Python",
		"Go",
		"PHP",
	];

	const topicOptions: string[] = [
		"typescript",
		"hacktoberfest",
		"react",
		"open-source",
		"nextjs",
	];

	// Handle change for checkboxes
	const handleCheckboxChange = (
		setter: React.Dispatch<React.SetStateAction<string[]>>,
		selectedOptions: string[],
		value: string,
	) => {
		setter(
			selectedOptions.includes(value)
				? selectedOptions.filter((item) => item !== value)
				: [...selectedOptions, value],
		);
	};

	return (
		<div className="border px-[20px] py-[20px] bg-white text-black rounded-[6px]">
			<div className="grid grid-cols-4 gap-4">
				{/* Categories */}
				<div className="flex flex-col gap-3">
					<h4>Categories</h4>
					<ul className="flex flex-col gap-2">
						{categoryOptions.map((category, index) => (
							<li key={index}>
								<label className="flex items-center gap-2 text-[14px]">
									<Checkbox
										checked={categories.includes(category)}
										onCheckedChange={() =>
											handleCheckboxChange(setCategories, categories, category)
										}
									/>
									{category}
								</label>
							</li>
						))}
					</ul>
				</div>
				{/* Alternatives */}
				<div className="flex flex-col gap-3">
					<h4>Alternatives</h4>
					<ul className="flex flex-col gap-2">
						{alternativeOptions.map((alt, index) => (
							<li key={index}>
								<label className="flex items-center gap-2 text-[14px]">
									<Checkbox
										checked={alternatives.includes(alt)}
										onCheckedChange={() =>
											handleCheckboxChange(setAlternatives, alternatives, alt)
										}
									/>
									{alt}
								</label>
							</li>
						))}
					</ul>
				</div>
				{/* Languages */}
				<div className="flex flex-col gap-3">
					<h4>Languages</h4>
					<ul className="flex flex-col gap-2">
						{languageOptions.map((lang, index) => (
							<li key={index}>
								<label className="flex items-center gap-2 text-[14px]">
									<Checkbox
										checked={languages.includes(lang)}
										onCheckedChange={() =>
											handleCheckboxChange(setLanguages, languages, lang)
										}
									/>
									{lang}
								</label>
							</li>
						))}
					</ul>
				</div>
				{/* Topics */}
				<div className="flex flex-col gap-3">
					<h4>Topics</h4>
					<ul className="flex flex-col gap-2">
						{topicOptions.map((topic, index) => (
							<li key={index}>
								<label className="flex items-center gap-2 text-[14px]">
									<Checkbox
										checked={topics.includes(topic)}
										onCheckedChange={() =>
											handleCheckboxChange(setTopics, topics, topic)
										}
									/>
									{topic}
								</label>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="flex items-center gap-16 mt-4">
				{/* Star slider */}
				<div className="mt-4">
					<div className="flex items-center justify-between mb-2">
						<h4>Stars</h4>
						<span>{stars[0]}</span>
					</div>
					<Slider
						defaultValue={[stars[0]]}
						max={73236}
						onValueChange={(value) => {
							const newStarValue = value[0] ?? stars[0]; // Use nullish coalescing operator
							setStars([newStarValue, stars[1]]);
						}}
						className="w-[200px]"
					/>
				</div>
				{/* Forks slider */}
				<div className="mt-4">
					<div className="flex items-center justify-between mb-2">
						<h4>Forks</h4>
						<span>{forks[0]}</span>
					</div>
					<Slider
						defaultValue={[forks[0]]}
						max={24486}
						onValueChange={(value) => {
							const newForkValue = value[0] ?? forks[0]; // Use nullish coalescing operator
							setForks([newForkValue, forks[1]]);
						}}
						className="w-[200px]"
					/>
				</div>
			</div>
		</div>
	);
};

export default Filter;
