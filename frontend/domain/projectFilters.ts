import { AppInfo, ProjectDomain } from './app';

export type ProjectFilter = 'Featured' | 'All' | ProjectDomain;

export const PROJECT_FILTERS: ProjectFilter[] = ['Featured', 'All', 'AI/ML', 'Web', 'Desktop', 'Backend'];

export const getProjectFilterType = (app: AppInfo): ProjectDomain => app.domain;

const FEATURED_PROJECT_ORDER = [
  'CloudLanguage (MVP)',
  'ResearchFlow AI',
  'RAG Knowledge Assistant',
] as const;

export const compareFeaturedProjects = (a: AppInfo, b: AppInfo): number => {
  const rank = (app: AppInfo) =>
    FEATURED_PROJECT_ORDER.indexOf(app.name as (typeof FEATURED_PROJECT_ORDER)[number]);

  return rank(a) - rank(b);
};
