export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  category: string;
  level: number;
}

export interface SkillCategory {
  name: string;
  description: string;
  technologies: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  current?: boolean;
}

export interface ArchitectureNode {
  name: string;
  label: string;
  description: string;
  tone: "blue" | "violet" | "slate" | "teal";
}

export interface Project {
  name: string;
  eyebrow?: string;
  description: string;
  problem?: string;
  solution?: string;
  architecture?: string[];
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
}

export interface PortfolioConfig {
  personal: {
    fullName: string;
    title: string;
    tagline?: string;
    statement?: string;
    about: string;
    location: string;
    email: string;
  };
  socialLinks: SocialLink[];
  skills: Skill[] | SkillCategory[];
  experience?: Experience[];
  projects: Project[];
  architecture?: ArchitectureNode[];
  contact: {
    formEndpoint: string;
    successMessage: string;
  };
}
