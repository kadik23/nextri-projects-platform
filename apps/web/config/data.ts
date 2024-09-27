import type { Option } from "@/types";

export const ROLS: Option[] = [
  {
    label: "Frontend Developer",
    value: "frontend_dev",
  },
  {
    label: "Backend Developer",
    value: "backend_dev",
  },

  {
    label: "UI/UX Designer",
    value: "ui_ux_designer",
  },
  {
    label: "DevOps Engineer",
    value: "devops_engineer",
  },
  {
    label: "Mobile Developer",
    value: "mobile_dev",
  },
];

export const SKILLS_LEVELS: Option[] = [
  {
    label: "🔰 Beginner",
    value: "beginner",
  },
  {
    label: "🚀 Intermediate",
    value: "intermediate",
  },
  {
    label: "💼 Advanced",
    value: "advanced",
  },
  {
    label: "🌟 Expert",
    value: "expert",
  },
  {
    label: "🏆 Master",
    value: "master",
  },
];

export const PROJECT_TYPES: Option[] = [
  {
    label: "💼 Freelance",
    value: "freelance",
  },
  {
    label: "🌍 Open Source",
    value: "open_source",
  },
  {
    label: "🏢 Company Projects",
    value: "company",
  },
];

export const PROJECT_FOCUS: Option[] = [
  {
    label: "API Platform",
    value: "api_platform",
  },
  {
    label: "Backend as a Service",
    value: "backend_as_a_service",
  },
  {
    label: "CRM",
    value: "crm",
  },
  {
    label: "Marketing",
    value: "marketing",
  },
  {
    label: "Form Building",
    value: "form_building",
  },
  {
    label: "Product Analytics",
    value: "product_analytics",
  },
  {
    label: "Scheduling",
    value: "scheduling",
  },
  {
    label: "Security",
    value: "security",
  },
  {
    label: "Workflow Automation",
    value: "workflow_automation",
  },
  {
    label: "Artificial Intelligence",
    value: "artificial_intelligence",
  },
  {
    label: "Commerce",
    value: "commerce",
  },
  {
    label: "Digital Signature",
    value: "digital_signature",
  },
  {
    label: "File Hosting",
    value: "file_hosting",
  },
  {
    label: "Internal Tools",
    value: "internal_tools",
  },
  {
    label: "Log Management",
    value: "log_management",
  },
  {
    label: "Messaging",
    value: "messaging",
  },
  {
    label: "Productivity",
    value: "productivity",
  },
  {
    label: "Website Builder",
    value: "website_builder",
  },
  {
    label: "Project Management",
    value: "project_management",
  },
  {
    label: "Observability",
    value: "observability",
  },
  {
    label: "Monitoring",
    value: "monitoring",
  },
  {
    label: "Financial Service",
    value: "financial_service",
  },
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Database Management",
    value: "database_management",
  },
  {
    label: "CMS",
    value: "cms",
  },
  {
    label: "Communication",
    value: "communication",
  },
  {
    label: "Auth & SSO",
    value: "auth_sso",
  },
  {
    label: "Developer Tools",
    value: "developer_tools",
  },
];

export const PROJECT_DURATIONS: Option[] = [
  {
    label: "Short-term: 1-2 weeks",
    value: "short_term",
  },
  {
    label: "Medium-term: 1-3 months",
    value: "medium_term",
  },
  {
    label: "Long-term: 3-6 months",
    value: "long_term",
  },
  {
    label: "Specific task",
    value: "specific_task",
  },
];

export const TECH_STACKS = [
  // Frontend Development
  {
    label: "React.js",
    value: "react_js",
    role: "frontend_dev",
  },
  {
    label: "Vue.js",
    value: "vue_js",
    role: "frontend_dev",
  },
  {
    label: "Angular",
    value: "angular",
    role: "frontend_dev",
  },
  {
    label: "Svelte",
    value: "svelte",
    role: "frontend_dev",
  },
  {
    label: "Next.js",
    value: "next_js",
    role: "frontend_dev",
  },
  {
    label: "Nuxt.js",
    value: "nuxt_js",
    role: "frontend_dev",
  },
  {
    label: "Tailwind CSS",
    value: "tailwind_css",
    role: "frontend_dev",
  },
  {
    label: "Bootstrap",
    value: "bootstrap",
    role: "frontend_dev",
  },
  {
    label: "Material UI",
    value: "material_ui",
    role: "frontend_dev",
  },
  {
    label: "Chakra UI",
    value: "chakra_ui",
    role: "frontend_dev",
  },
  {
    label: "Styled Components",
    value: "styled_components",
    role: "frontend_dev",
  },

  // Backend Development
  {
    label: "Node.js",
    value: "node_js",
    role: "backend_dev",
  },
  {
    label: "Express.js",
    value: "express_js",
    role: "backend_dev",
  },
  {
    label: "NestJS",
    value: "nestjs",
    role: "backend_dev",
  },
  {
    label: "Django",
    value: "django",
    role: "backend_dev",
  },
  {
    label: "Flask",
    value: "flask",
    role: "backend_dev",
  },
  {
    label: "Ruby on Rails",
    value: "ruby_on_rails",
    role: "backend_dev",
  },
  {
    label: "Laravel",
    value: "laravel",
    role: "backend_dev",
  },
  {
    label: "Spring Boot",
    value: "spring_boot",
    role: "backend_dev",
  },
  {
    label: "ASP.NET",
    value: "asp_net",
    role: "backend_dev",
  },

  // UI/UX Design
  {
    label: "Figma",
    value: "figma",
    role: "ui_ux_designer",
  },
  {
    label: "Sketch",
    value: "sketch",
    role: "ui_ux_designer",
  },
  {
    label: "Adobe XD",
    value: "adobe_xd",
    role: "ui_ux_designer",
  },
  {
    label: "InVision",
    value: "invision",
    role: "ui_ux_designer",
  },
  {
    label: "Zeplin",
    value: "zeplin",
    role: "ui_ux_designer",
  },

  // DevOps Engineering
  {
    label: "Docker",
    value: "docker",
    role: "devops_engineer",
  },
  {
    label: "Kubernetes",
    value: "kubernetes",
    role: "devops_engineer",
  },
  {
    label: "Terraform",
    value: "terraform",
    role: "devops_engineer",
  },
  {
    label: "Ansible",
    value: "ansible",
    role: "devops_engineer",
  },
  {
    label: "AWS",
    value: "aws",
    role: "devops_engineer",
  },
  {
    label: "Azure",
    value: "azure",
    role: "devops_engineer",
  },
  {
    label: "Google Cloud",
    value: "google_cloud",
    role: "devops_engineer",
  },
  {
    label: "Jenkins",
    value: "jenkins",
    role: "devops_engineer",
  },

  // Mobile Development
  {
    label: "React Native",
    value: "react_native",
    role: "mobile_dev",
  },
  {
    label: "Flutter",
    value: "flutter",
    role: "mobile_dev",
  },
  {
    label: "Swift",
    value: "swift",
    role: "mobile_dev",
  },
  {
    label: "Kotlin",
    value: "kotlin",
    role: "mobile_dev",
  },
  {
    label: "Objective-C",
    value: "objective_c",
    role: "mobile_dev",
  },
];

export const WORK_TYPES: Option[] = [
  {
    label: "Work on specific tasks 🔧",
    value: "solve_issues",
  },
  {
    label: "Contribute to the whole project 🌍",
    value: "rebuild_projects",
  },
];
