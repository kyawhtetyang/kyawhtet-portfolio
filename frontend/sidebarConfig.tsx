import React from 'react';
import { Category } from './types';

export type NavItemConfig = {
  badge?: string;
  category: Category;
  renderIcon: (className: string) => React.ReactNode;
};

export type NavSectionConfig = {
  items: NavItemConfig[];
  title: string;
};

type SidebarConfigOptions = {
  blogBadge?: string;
  blogVisible: boolean;
  chatBadge?: string;
  chatVisible: boolean;
  libraryBadge?: string;
  libraryVisible: boolean;
  settingsBadge?: string;
  settingsVisible: boolean;
};

export const SettingsNavIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const HOME_ICON = (className: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const PROJECTS_ICON = (className: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h8v13H3V7zm10-3h8v16h-8V4z" />
  </svg>
);

const BLOG_ICON = (className: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zm2 4h6m-6 4h6m-6 4h4" />
  </svg>
);

const PHOTO_ICON = (className: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h3l2-2h4l2 2h3a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm9 2a4 4 0 100 8 4 4 0 000-8z" />
  </svg>
);

const CHAT_ICON = (className: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h5m8-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const buildSidebarSections = ({
  blogBadge,
  blogVisible,
  chatBadge,
  chatVisible,
  libraryBadge,
  libraryVisible,
  settingsBadge,
  settingsVisible,
}: SidebarConfigOptions): NavSectionConfig[] => [
  {
    title: 'Explore',
    items: [
      { category: Category.Home, renderIcon: HOME_ICON },
    ],
  },
  {
    title: 'Work',
    items: [
      { category: Category.Projects, renderIcon: PROJECTS_ICON },
      ...(blogVisible ? [{ category: Category.Blog, badge: blogBadge, renderIcon: BLOG_ICON }] : []),
      ...(libraryVisible ? [{ category: Category.Library, badge: libraryBadge, renderIcon: PHOTO_ICON }] : []),
      ...(chatVisible ? [{ category: Category.Ask, badge: chatBadge, renderIcon: CHAT_ICON }] : []),
      ...(settingsVisible ? [{ category: Category.Settings, badge: settingsBadge, renderIcon: (className: string) => <SettingsNavIcon className={className} /> }] : []),
    ],
  },
];

export const buildMobileNavItems = (options: SidebarConfigOptions): NavItemConfig[] =>
  buildSidebarSections(options).flatMap((section) => section.items);
