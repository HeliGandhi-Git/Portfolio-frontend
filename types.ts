export interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  linkType: 'github' | 'live' | 'none';
  url: string;
}

export interface Skill {
  _id: string;
  name: string;
  level: number;
  icon: string;
  category: string;
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: number;
    icon: string;
  }[];
}

export interface Experience {
  _id: string;
  duration: string;
  jobTitle: string;
  companyName: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}