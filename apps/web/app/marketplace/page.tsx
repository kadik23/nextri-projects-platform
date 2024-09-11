"use client"

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const filteredPaths = careerPaths.filter(
    (path) =>
      path.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === undefined || path.category === filter)
  );

  return (
    <div className="flex flex-col gap-4 py-10 w-4/5 mx-auto">
      <h1 className="text-center text-3xl font-bold">
        Explore Diverse Career Pathways <br /> in Software Engineering
      </h1>
      <p className="text-center w-1/2 mx-auto">
        Explore platforms that simulate freelancing, open-source work, and
        company roles to build real-world software engineering skills.
      </p>
      <div className="flex gap-4 my-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search career paths..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Web Development">Web Development</SelectItem>
            <SelectItem value="Mobile Development">
              Mobile Development
            </SelectItem>
            <SelectItem value="Data Science">Data Science</SelectItem>
            <SelectItem value="Infrastructure">Infrastructure</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPaths.map((path) => (
          <Card key={path.id}>
            <CardHeader>
              <CardTitle>{path.title}</CardTitle>
              <CardDescription>{path.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{path.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;