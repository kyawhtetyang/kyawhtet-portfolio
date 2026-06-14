export enum Category {
  Home = 'Home',
  Projects = 'Projects',
  Blog = 'Blog',
  Library = 'Library',
  Ask = 'Ask',
  Settings = 'Settings'
}

export type ProjectDomain = 'AI/ML' | 'Web' | 'Desktop' | 'Backend';

export interface AppInfo {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  domain: ProjectDomain;
  icon: string;
  banner: string;
  overview: string;
  stack: string;
  outcome: string;
  developer: string;
  featured?: boolean;
  website?: string;
  repo?: string;
  downloadUrl?: string;
  demo?: string;
}
