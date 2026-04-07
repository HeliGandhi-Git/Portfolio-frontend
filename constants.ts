import { Project, SkillCategory, Experience, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: 'Languages & Frameworks',
    skills: [
      { name: 'React & React Native', level: 95, icon: '⚛️' },
      { name: 'TypeScript', level: 90, icon: '📘' },
      { name: 'Tailwind CSS', level: 95, icon: '🎨' },
      { name: 'Next.js', level: 85, icon: '▲' },
    ],
  },
  {
    title: 'Tools & Technologies',
    skills: [
      { name: 'Figma / UI Design', level: 80, icon: '🖌️' },
      { name: 'Git & GitHub', level: 90, icon: '🐙' },
      { name: 'Performance Opt.', level: 75, icon: '⚡' },
      { name: 'Jest / Testing', level: 70, icon: '🧪' },
    ],
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    _id: '1',
    title: 'Neon Commerce',
    category: 'E-Commerce',
    description: 'A full-stack e-commerce platform with real-time inventory and AI-powered recommendations.',
    image: 'https://picsum.photos/seed/project1/800/600',
    tags: ['React', 'Node.js', 'Tailwind', 'Stripe'],
    link: '#',
    github: '#',
  },
  {
    _id: '2',
    title: 'Social Analytics Dash',
    category: 'Dashboard',
    description: 'Interactive social media analytics dashboard visualization for enterprise clients.',
    image: 'https://picsum.photos/seed/project2/800/600',
    tags: ['Next.js', 'D3.js', 'TypeScript'],
    link: '#',
    github: '#',
  },
  {
    _id: '3',
    title: 'Health Tracker AI',
    category: 'Mobile App',
    description: 'Mobile-first application tracking fitness metrics using on-device machine learning models.',
    image: 'https://picsum.photos/seed/project3/800/600',
    tags: ['React Native', 'TensorFlow.js', 'Firebase'],
    link: '#',
    github: '#',
  },
];
export const EXPERIENCE_DATA: Experience[] = [
  {
    _id: '1',
    duration: '2023 - Present',
    jobTitle: 'Full Stack Developer Intern',
    companyName: 'Tech Innovators',
    description: 'Developing scalable web applications using MERN stack and improving system performance.',
  },
  {
    _id: '2',
    duration: '2022 - 2023',
    jobTitle: 'Frontend Developer',
    companyName: 'Creative Solutions',
    description: 'Designed and implemented responsive user interfaces using React and Tailwind CSS.',
  },
];