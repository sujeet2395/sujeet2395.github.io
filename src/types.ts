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

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
}

export interface PortfolioConfig {
  personal: {
    fullName: string;
    title: string;
    tagline: string;
    about: string;
    location: string;
    email: string;
  };
  socialLinks: SocialLink[];
  skills: Skill[];
  projects: Project[];
  contact: {
    formEndpoint: string;
    successMessage: string;
  };
}
