export enum Category {
  Discover = 'Discover',
  Projects = 'Projects',
  Blog = 'Blog',
  Photo = 'Books',
  Chat = 'Chat',
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
