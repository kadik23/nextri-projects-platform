import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Box, Briefcase, Clock8 } from "lucide-react";
import React from "react";
import { SiDjango, SiPostgresql, SiPython, SiVuedotjs } from "react-icons/si";

interface Project {
	id: string;
	projectName: string;
	description: string;
	roles: string[];
	skill_level: string[];
	project_type: string;
	project_focus: string[];
	work_type: string[];
	work_pace: string[];
	tech_stack: string[];
}

function page() {
	const project: Project = {
		id: "Cal.com Clone",
		projectName: "Company Internal Tool",
		description:
			"The open source Calendly successor. You are in charge of your own data, workflow, and appearance.Calendly and other scheduling tools are awesome. It made our lives massively easier. We're using it for business meetings, seminars, yoga classes, and even calls with our families. However, most tools are very limited in terms of control and customization.That's where Cal.com comes in. Self-hosted or hosted by us. White-label by design. API-driven and ready to be deployed on your own domain. Full control of your events and data.",
		roles: ["Full-Stack Developer", "UI UX Designer"],
		skill_level: ["Intermidiate"],
		project_type: "company",
		project_focus: ["Marketing", "Security", "Artificial Intelligence"],
		work_type: ["rebuild_projects"],
		work_pace: ["Long Term"],
		tech_stack: ["Python", "Django", "Vue.js", "PostgreSQL"],
	};

	const techIcons: { [key: string]: JSX.Element } = {
		Python: <SiPython size={32} className="text-black" />,
		Django: <SiDjango size={32} className="text-black" />,
		"Vue.js": <SiVuedotjs size={32} className="text-black" />,
		PostgreSQL: <SiPostgresql size={32} className="text-black" />,
	};

	const rolesDefinitions: { [key: string]: string } = {
		"Full-Stack Developer":
			"Handles both front-end and back-end development tasks.",
		"Frontend Developer":
			"Responsible for implementing user interfaces and experiences.",
		"Backend Developer":
			"Manages server-side logic and integration with the front-end.",
		"UI UX Designer": "Focuses on the design and usability of user interfaces.",
	};

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col gap-4">
				<div className="flex justify-between items-center">
					<div className="flex items-center">
						<Box />
						<div className="font-semibold text-xl">{project.projectName}</div>
					</div>

					<Badge className="bg-green-400">Open</Badge>
				</div>
				<div className="font-semibold opacity-60 text-sm">
					{project.description}
				</div>
				<div className="flex gap-2 text-sm">
					<div className="opacity-60 font-semibold">Properties</div>
					<div className="font-semibold flex gap-4 items-center">
						<div className="bg-black/10 rounded-lg py-0.5 px-2 flex items-center">
							<Box className="mr-2 w-4 h-4" />
							78% match
						</div>
						<div className="bg-black/10 rounded-lg py-0.5 px-2 flex items-center">
							<Clock8 className="mr-2 w-4 h-4" />
							{project.work_pace}
						</div>
						<div className="bg-black/10 rounded-lg py-0.5 px-2 flex items-center">
							<Briefcase className="mr-2 w-4 h-4" />
							<div>{project.work_type}</div>
						</div>
						<div className="bg-black/10 rounded-lg py-0.5 px-2 flex items-center">
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={16}
								height={16}
								className="mr-2"
								viewBox="0 0 32 32"
							>
								{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
								<path
									fill="currentColor"
									d="M30 30h-8V4h8zm-6-2h4V6h-4zm-4 2h-8V12h8zm-10 0H2V18h8z"
								></path>
							</svg>
							{project.skill_level}
						</div>
					</div>
				</div>
				<div className="bg-black/20 rounded-lg py-0.5 px-2 text-sm font-semibold w-fit">
					{project.project_type}
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<div className="font-semibold text-xl">Project focus</div>
					<hr />
				</div>
				<div className="flex gap-2 items-center w-fit">
					{project.project_focus.map((focus) => (
						<Alert key={focus} className="py-1 px-2">
							<AlertTitle className="text-nowrap">{focus}</AlertTitle>
						</Alert>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<div className="flex w-full items-center justify-between">
						<div className="font-semibold text-xl ">Roles</div>
						<div>3/5 roles available</div>
					</div>
					<hr />
				</div>
				<div className="flex flex-col gap-4">
					{project.roles.map((role) => (
						<Accordion key={role} type="single" collapsible className="w-fit">
							<AccordionItem value={role}>
								<AccordionTrigger>
									{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
									{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
									<svg
										className="mr-2"
										xmlns="http://www.w3.org/2000/svg"
										width={16}
										height={16}
										viewBox="0 0 16 16"
									>
										{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
										<path
											fill="currentColor"
											d="M0 5v6h16V5zm15 5H1V6h14z"
										></path>
										{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
										<path fill="currentColor" d="M2 7h7v2H2z"></path>
									</svg>
									<div className="font-semibold">{role}</div>
								</AccordionTrigger>
								<AccordionContent className="text-black/50 text-sm font-semibold">
									{rolesDefinitions[role] ||
										"Small Definition based on role..."}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<div className="font-semibold text-xl">Tech Stack</div>
						<hr />
					</div>
					<div className="flex gap-2 items-start w-fit">
						{project.tech_stack.map((tech) => (
							<Alert key={tech} className="px-16 py-8 shadow-sm bg-transparent">
								<AlertTitle className="text-nowrap flex flex-col gap-1 items-center">
									{techIcons[tech] || <div>Icon</div>}
									<div className="font-semibold text-lg">{tech}</div>
								</AlertTitle>
							</Alert>
						))}
					</div>
				</div>
			</div>
			<div className="flex justify-end">
				<Button>Apply</Button>
			</div>
		</div>
	);
}

export default page;
