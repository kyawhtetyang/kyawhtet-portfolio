
import React, { useEffect, useMemo, useState } from 'react';
import { Category, AppInfo } from './types';
import { PROJECT_FILTERS, ProjectFilter, getProjectFilterType } from './projectType';
import { APPS } from './constants';
import { appConfig } from './config';
import { AppCard } from './components/AppCard';
import { AppListItem } from './components/AppListItem';
import { AppDetailModal } from './components/AppDetailModal';
import { SettingsView } from './components/SettingsView';
import profilePhoto from './docs/01_AIML_Portfolio.png';
import { BLOG_DRAFTS, BlogDraft } from './blogDrafts';
import { PHOTO_METADATA } from './booksMetadata';
import { PHOTO_LINKS } from './bookLinks';
import { buildMobileNavItems, buildSidebarSections } from './sidebarConfig';
import {
  getInitialCategory,
  getVisibleCategories,
  LAST_CATEGORY_KEY,
  readUserSettings,
  USER_SETTINGS_KEY,
  UserSettings,
} from './userSettings';

type BlogCategory = 'All';
type PhotoCategory = 'all' | string;

const PHOTO_MODULES = import.meta.glob('./docs/photo/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;

const SidebarItem: React.FC<{ 
  category: Category; 
  active: boolean; 
  onClick: (cat: Category) => void;
  icon: React.ReactNode;
  badge?: string;
  compact?: boolean;
}> = ({ category, active, onClick, icon, badge, compact = false }) => (
  <button 
    onClick={() => onClick(category)}
    aria-label={category}
    title={category}
    className={`w-full flex items-center md:justify-center ${compact ? 'lg:justify-center' : 'lg:justify-between'} gap-3 md:px-3 ${compact ? 'lg:px-3' : 'lg:px-4'} py-2.5 rounded-lg transition-all duration-200 group ${
      active 
        ? 'bg-black/5' 
        : 'text-gray-500 hover:bg-black/5'
    }`}
  >
    <span className={`flex items-center md:justify-center ${compact ? 'lg:justify-center' : 'lg:justify-start'} gap-3 min-w-0`}>
      <span className={`${active ? 'text-[#fa233b]' : 'text-gray-400'}`}>
        {icon}
      </span>
      <span className={`${compact ? 'hidden' : 'hidden lg:inline'} text-sm font-semibold ${active ? 'text-[#fa233b]' : 'text-inherit'}`}>{category}</span>
    </span>
    {badge && (
      <span className={`${compact ? 'hidden' : 'hidden lg:inline-flex'} text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
        active
          ? 'bg-[#1d1d1f] text-white'
          : 'bg-black/10 text-[#1d1d1f]'
      }`}>
        {badge}
      </span>
    )}
  </button>
);

const App: React.FC = () => {
  const [userSettings, setUserSettings] = useState<UserSettings>(readUserSettings);
  const [selectedCategory, setSelectedCategory] = useState<Category>(getInitialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<ProjectFilter>('Featured');
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<BlogCategory>('All');
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState<PhotoCategory>('all');
  const [selectedApp, setSelectedApp] = useState<AppInfo | null>(null);
  const [selectedBlogDraft, setSelectedBlogDraft] = useState<BlogDraft | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactProjectType, setContactProjectType] = useState('AI/ML');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSubmitState, setContactSubmitState] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });
  const theme = userSettings.theme;
  const visibleCategories = getVisibleCategories(userSettings);
  const blogVisible = visibleCategories.includes(Category.Blog);
  const photoVisible = visibleCategories.includes(Category.Photo);
  const chatVisible = visibleCategories.includes(Category.Chat);
  const blogBadge = appConfig.beta.blog ? 'Beta' : undefined;
  const photoBadge = appConfig.beta.photo ? 'Beta' : undefined;
  const chatBadge = appConfig.beta.chat ? 'Beta' : undefined;
  const settingsBadge = 'Beta';
  const sidebarSections = useMemo(
    () =>
      buildSidebarSections({
        blogBadge,
        blogVisible,
        chatBadge,
        chatVisible,
        photoBadge,
        photoVisible,
        settingsBadge,
      }),
    [blogBadge, blogVisible, chatBadge, chatVisible, photoBadge, photoVisible, settingsBadge]
  );
  const mobileNavItems = useMemo(
    () =>
      buildMobileNavItems({
        blogBadge,
        blogVisible,
        chatBadge,
        chatVisible,
        photoBadge,
        photoVisible,
        settingsBadge,
      }),
    [blogBadge, blogVisible, chatBadge, chatVisible, photoBadge, photoVisible, settingsBadge]
  );
  const compactSidebar = userSettings.preferCompactSidebar;
  const photoGridClass = userSettings.compactGrid
    ? 'grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-x-3 sm:gap-x-4 gap-y-5'
    : 'grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-x-4 sm:gap-x-5 gap-y-6';
  const appCardGridClass = userSettings.compactGrid
    ? 'grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-x-3 sm:gap-x-4 gap-y-5'
    : 'grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-x-4 sm:gap-x-5 gap-y-6';
  const isDark = theme === 'dark';
  const isDiscoverPage = selectedCategory === Category.Discover;
  const isPhotoPage = photoVisible && selectedCategory === Category.Photo;
  const isChatPage = chatVisible && selectedCategory === Category.Chat;
  const isProjectsPage = selectedCategory === Category.Projects;
  const isBlogPage = selectedCategory === Category.Blog;
  const isSettingsPage = selectedCategory === Category.Settings;
  const profile = {
    email: 'kyaw.htet.yang@gmail.com',
    linkedin: 'https://linkedin.com/in/kyawhtetyang',
    github: 'https://github.com/kyawhtetyang',
    resume: 'https://u.pcloud.link/publink/show?code=kZze2M5ZWWU8Wv1GxPfEbPPJLkhDuB6yEt7k',
    phone: '+95 388337',
    location: 'Yangon, Myanmar'
  };

  const formspreeEndpoint = appConfig.formspreeEndpoint;

  const chatSeedMessages = [
    {
      role: 'assistant',
      text: 'Hi, I am Kyaw Htet’s assistant. Ask me about AI/ML projects, web apps, or collaboration.'
    },
    {
      role: 'user',
      text: 'I want to build an AI-powered dashboard for my startup.'
    },
    {
      role: 'assistant',
      text: 'Great. Share your data sources, target users, and launch timeline. I can suggest a build plan and tech stack.'
    }
  ];

  const portfolioSkills = [
    'AI/ML Engineering',
    'LLM Applications',
    'Python + FastAPI',
    'React + TypeScript',
    'MVP Build',
    'MLOps + Deploy'
  ];

  const formatPhotoTitle = (slug: string) =>
    slug
      .split('_')
      .filter(Boolean)
      .map((word) => word[0]?.toUpperCase() + word.slice(1))
      .join(' ');

  const formatPhotoCategory = (key: string) => {
    if (key === 'cs') return 'CS';
    if (key === 'me') return 'Me';
    if (key === 'other') return 'Other';
    return key
      .split('_')
      .filter(Boolean)
      .map((word) => word[0]?.toUpperCase() + word.slice(1))
      .join(' ');
  };

  const photoItems = useMemo(() => {
    return Object.entries(PHOTO_MODULES)
      .map(([path, src]) => {
        const file = path.split('/').pop() ?? '';
        const base = file.replace(/\.jpg$/i, '');
        const [categorySlug, titleSlugRaw] = base.includes('__')
          ? base.split('__', 2)
          : (() => {
              const [prefix, ...restParts] = base.split('_');
              return [prefix, restParts.join('_') || base];
            })();
        const category = categorySlug || 'other';
        const titleSlug = titleSlugRaw || base;
        const metadata = PHOTO_METADATA[base];
        return {
          id: path,
          base,
          src,
          category,
          title: formatPhotoTitle(titleSlug),
          order: metadata?.order ?? Number.MAX_SAFE_INTEGER,
          href: PHOTO_LINKS[base] ?? src,
          linkLabel: PHOTO_LINKS[base] ? 'Open study link' : 'Click to view full size'
        };
      })
      .sort((a, b) => {
        const categoryOrder = a.category.localeCompare(b.category);
        if (categoryOrder !== 0) return categoryOrder;

        const metadataOrder = a.order - b.order;
        if (metadataOrder !== 0) return metadataOrder;

        return a.title.localeCompare(b.title);
      });
  }, []);

  const photoCategories = useMemo(() => {
    const keys = new Set(photoItems.map((item) => item.category));
    const sorted = Array.from(keys).sort((a, b) => a.localeCompare(b));
    return [
      { key: 'all', label: 'All' },
      ...sorted.map((key) => ({ key, label: formatPhotoCategory(key) }))
    ];
  }, [photoItems]);

  const filteredPhotoItems =
    selectedPhotoCategory === 'all'
      ? photoItems
      : photoItems.filter((photo) => photo.category === selectedPhotoCategory);

  const featuredWork = [
    {
      title: 'CloudLanguage (MVP)',
      summary: 'Mobile-first language learning MVP for Burmese learners with lesson loop, progress tracking, and review flow in build.',
      stack: 'React · TypeScript · FastAPI · Lesson JSON'
    },
    {
      title: 'Fake News Detector (BiLSTM)',
      summary: 'End-to-end fake news detection pipeline with preprocessing, BiLSTM training, Flask prediction interface, and Docker deployment support.',
      stack: 'Python · TensorFlow · BiLSTM · Flask'
    },
    {
      title: 'Music App (UI)',
      summary: 'Apple-inspired music interface with refined navigation, interactions, and visual hierarchy for a premium listening experience.',
      stack: 'React · TypeScript · UI Engineering'
    }
  ];

  const blogDrafts = useMemo(() => {
    if (selectedBlogCategory === 'All') {
      return [...BLOG_DRAFTS].sort((a, b) => {
        const dateOrder = b.updated.localeCompare(a.updated);
        return dateOrder !== 0 ? dateOrder : a.title.localeCompare(b.title);
      });
    }

    return BLOG_DRAFTS;
  }, [selectedBlogCategory]);

  const filteredApps = useMemo(() => {
    let list = APPS;

    if (isProjectsPage && selectedProjectFilter !== 'All') {
      if (selectedProjectFilter === 'Featured') {
        list = list.filter(app => app.featured);
      } else {
        list = list.filter(app => getProjectFilterType(app) === selectedProjectFilter);
      }
    }

    if (searchQuery) {
      list = list.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return list;
  }, [isProjectsPage, searchQuery, selectedProjectFilter]);

  const handleAppClick = (app: AppInfo) => {
    setSelectedApp(app);
  };

  useEffect(() => {
    if (!visibleCategories.includes(selectedCategory)) {
      setSelectedCategory(Category.Discover);
    }
  }, [selectedCategory, visibleCategories]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    try {
      window.localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(userSettings));
      window.localStorage.setItem('theme', theme);
    } catch {
      // Ignore storage errors (private mode or blocked storage).
    }
  }, [theme, userSettings]);

  useEffect(() => {
    try {
      if (userSettings.rememberLastTab && visibleCategories.includes(selectedCategory) && selectedCategory !== Category.Settings) {
        window.localStorage.setItem(LAST_CATEGORY_KEY, selectedCategory);
      } else {
        window.localStorage.removeItem(LAST_CATEGORY_KEY);
      }
    } catch {
      // Ignore storage errors (private mode or blocked storage).
    }
  }, [selectedCategory, userSettings.rememberLastTab, visibleCategories]);

  const toggleTheme = () => {
    setUserSettings((current) => ({
      ...current,
      theme: current.theme === 'dark' ? 'light' : 'dark',
    }));
  };

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setUserSettings((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formspreeEndpoint || formspreeEndpoint.includes('your_form_id')) {
      setContactSubmitState({
        type: 'error',
        message: 'Form is not configured yet. Set VITE_FORMSPREE_ENDPOINT in .env.local.'
      });
      return;
    }

    try {
      setIsSubmittingContact(true);
      setContactSubmitState({ type: 'idle', message: '' });

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          projectType: contactProjectType,
          message: contactMessage,
          source: 'portfolio-contact-form'
        })
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setContactSubmitState({
        type: 'success',
        message: 'Message sent successfully. I will reply soon.'
      });
      setContactName('');
      setContactEmail('');
      setContactProjectType('AI/ML');
      setContactMessage('');
    } catch {
      setContactSubmitState({
        type: 'error',
        message: 'Unable to send right now. Please try again or use the Email button.'
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f5f5f7]">
      {/* Sidebar - Desktop Only */}
      <aside className={`hidden md:flex flex-col md:w-20 ${compactSidebar ? 'lg:w-20' : 'lg:w-64'} glass border-r border-black/5 md:px-3 md:py-6 ${compactSidebar ? 'lg:px-3 lg:py-6' : 'lg:p-6'} fixed inset-y-0 z-20`}>
        <div className="mb-10 md:px-0">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className={`w-full flex items-center justify-center ${compactSidebar ? 'lg:justify-center lg:px-0' : 'lg:justify-start lg:px-4'} gap-2 rounded-xl hover:bg-black/5 transition-colors md:px-0 md:py-2 lg:py-2.5`}
            aria-label="Reload page"
            title="Kyaw Htet"
          >
            <img
              src={profilePhoto}
              alt="Kyaw Htet"
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
            />
            <span className={`${compactSidebar ? 'hidden' : 'hidden lg:inline'} text-2xl font-bold tracking-tight`}>Kyaw Htet</span>
          </button>
        </div>

        <nav className="space-y-6">
          {sidebarSections.map((section, index) => (
            <div key={section.title}>
              {index > 0 ? (
                <div
                  className={`mx-auto mb-4 mt-1 h-px w-10 bg-black/10 ${compactSidebar ? '' : 'lg:hidden'}`}
                  aria-hidden="true"
                />
              ) : null}
              <h2 className={`mb-2 text-[11px] font-bold uppercase tracking-widest text-[#86868b] ${compactSidebar ? 'hidden' : 'hidden lg:block px-3'}`}>
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <SidebarItem
                    key={item.category}
                    category={item.category}
                    active={selectedCategory === item.category}
                    onClick={setSelectedCategory}
                    badge={item.badge}
                    compact={compactSidebar}
                    icon={item.renderIcon('w-5 h-5')}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 md:ml-20 ${compactSidebar ? 'lg:ml-20' : 'lg:ml-64'} pt-0 px-4 pb-4 md:px-6 md:pb-6 lg:px-6 lg:pb-8`}>
        <header className={`fixed top-0 left-0 right-0 md:left-20 ${compactSidebar ? 'lg:left-20' : 'lg:left-64'} z-40 px-4 md:px-6 lg:px-6 h-12 md:h-14 bg-white border-b border-black/10 flex items-center justify-between gap-3`}>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg md:text-xl font-semibold text-[#1d1d1f] tracking-tight">{selectedCategory}</h2>
            {isChatPage && chatBadge && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#fa233b]/10 text-[#fa233b]">
                {chatBadge}
              </span>
            )}
            {isPhotoPage && photoBadge && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#fa233b]/10 text-[#fa233b]">
                {photoBadge}
              </span>
            )}
            {isSettingsPage && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#fa233b]/10 text-[#fa233b]">
                {settingsBadge}
              </span>
            )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {!isDiscoverPage && !isChatPage && !isBlogPage && !isPhotoPage && !isSettingsPage && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-64 lg:w-80 bg-black/5 border-none rounded-xl py-2 px-10 transition-all outline-none text-sm"
                />
                <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            )}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
            >
              {isDark ? (
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.95-6.95-1.41 1.41M7.46 16.54l-1.41 1.41m0-11.31 1.41 1.41m10.08 10.08 1.41 1.41M12 7a5 5 0 100 10 5 5 0 000-10z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {isDiscoverPage ? (
          <div className="pt-16 md:pt-20 space-y-8 pb-20">
            <section>
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div className="xl:col-span-8 bg-white border border-black/10 rounded-2xl p-6 md:p-7">
                <h3 className="text-base font-bold text-gray-900 leading-tight">
                  Kyaw Htet | AI/ML Engineer & Product Builder
                </h3>
                <p className="mt-4 text-sm text-gray-600 max-w-3xl">
                  I combine MBA-level business understanding with hands-on engineering experience in Python, automation, NLP, and machine learning.
                  This portfolio highlights practical projects, technical strengths, and ways to collaborate.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-xl bg-white border border-black/10 text-[#1d1d1f] text-sm font-semibold px-4 py-2 hover:bg-gray-50 transition-colors">
                    LinkedIn
                  </a>
                  <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-xl bg-white border border-black/10 text-[#1d1d1f] text-sm font-semibold px-4 py-2 hover:bg-gray-50 transition-colors">
                    GitHub
                  </a>
                  <a href={profile.resume} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-xl bg-[#fa233b] text-white text-sm font-semibold px-4 py-2 hover:bg-[#d91e33] transition-colors">
                    Resume
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(true)}
                    className="inline-flex items-center rounded-xl bg-white border border-black/10 text-[#1d1d1f] text-sm font-semibold px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    Contact
                  </button>
                </div>
              </div>

              <div className="xl:col-span-4 bg-white border border-black/10 rounded-2xl p-6 md:p-7">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-4 border-b border-black/10 pb-2">
                    <span className="w-16 shrink-0 pt-0.5 text-[#6e6e73]">Role</span>
                    <span className="min-w-0 flex-1 text-right font-semibold leading-snug text-[#1d1d1f] break-words">
                      Full-Stack Python Developer (FastAPI/React) + Applied ML
                    </span>
                  </li>
                  <li className="flex items-start gap-4 border-b border-black/10 pb-2">
                    <span className="w-16 shrink-0 pt-0.5 text-[#6e6e73]">Address</span>
                    <span className="min-w-0 flex-1 text-right font-semibold leading-snug text-[#1d1d1f] break-words">{profile.location}</span>
                  </li>
                  <li className="flex items-start gap-4 border-b border-black/10 pb-2">
                    <span className="w-16 shrink-0 pt-0.5 text-[#6e6e73]">Phone</span>
                    <span className="min-w-0 flex-1 text-right font-semibold leading-snug text-[#1d1d1f] break-words">{profile.phone}</span>
                  </li>
                  <li className="flex items-start gap-4 border-b border-black/10 pb-2">
                    <span className="w-16 shrink-0 pt-0.5 text-[#6e6e73]">Status</span>
                    <span className="min-w-0 flex-1 text-right font-semibold leading-snug text-[#1d1d1f] break-words">Open to Collaboration</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-16 shrink-0 pt-0.5 text-[#6e6e73]">Email</span>
                    <span className="min-w-0 flex-1 text-right font-semibold leading-snug text-[#1d1d1f] break-all">{profile.email}</span>
                  </li>
                </ul>
              </div>
              </div>
            </section>

            <div className="border-t border-black/10"></div>

            <section>
              <p className="text-xs font-bold uppercase tracking-wider text-[#fa233b] mb-3">Featured Work</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredWork.map((project) => (
                  <article key={project.title} className="bg-white border border-black/10 rounded-2xl p-5">
                    <h4 className="text-base font-bold text-gray-900">{project.title}</h4>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{project.summary}</p>
                    <p className="mt-4 text-xs font-semibold tracking-wide text-gray-500">{project.stack}</p>
                  </article>
                ))}
              </div>
            </section>

            <div className="border-t border-black/10"></div>

            <section>
              <p className="text-xs font-bold uppercase tracking-wider text-[#fa233b] mb-3">Skills</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {portfolioSkills.map((skill) => (
                  <div key={skill} className="bg-white border border-black/10 rounded-xl px-3 py-2 text-sm font-semibold text-[#1d1d1f] text-center">
                    {skill}
                  </div>
                ))}
              </div>
            </section>

            <div className="border-t border-black/10"></div>

            <section>
              <p className="text-xs font-bold uppercase tracking-wider text-[#fa233b] mb-3">Contact</p>
              <h3 className="text-base font-bold text-gray-900">Want to work together?</h3>
              <p className="mt-3 text-sm text-gray-600">
                Send your project brief directly from here.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="inline-flex items-center rounded-xl bg-[#fa233b] text-white text-sm font-semibold px-4 py-2 hover:bg-[#d91e33] transition-colors"
                >
                  Contact Now
                </button>
              </div>
            </section>
          </div>
        ) : isSettingsPage ? (
          <SettingsView
            compactSidebar={compactSidebar}
            formspreeEndpoint={formspreeEndpoint}
            onUpdateSetting={updateSetting}
            theme={theme}
            userSettings={userSettings}
            visibleCategories={visibleCategories}
          />
        ) : isPhotoPage ? (
          <div className="pt-16 md:pt-20 space-y-8 pb-20">
            <section>
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {photoCategories.map((category) => (
                    <button
                      key={category.key}
                      type="button"
                      onClick={() => setSelectedPhotoCategory(category.key)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        selectedPhotoCategory === category.key
                          ? 'bg-[#fa233b] text-white'
                          : 'bg-white border border-black/10 text-[#1d1d1f] hover:bg-gray-50'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className={photoGridClass}>
                {filteredPhotoItems.map((photo) => (
                  <a
                    key={photo.id}
                    href={photo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group w-full max-w-[170px] sm:max-w-[180px] mx-auto"
                  >
                    <div className="aspect-square overflow-hidden rounded-2xl border border-[#D7DEE8] bg-[#F2F4F7] shadow-sm transition-all group-hover:shadow-md group-hover:bg-[#E8EDF3]">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <h4 className="text-[13px] font-medium text-gray-900 truncate leading-tight">{photo.title}</h4>
                      <p className="text-[11px] text-gray-500 truncate">{photo.linkLabel}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </div>
        ) : isChatPage ? (
          <div className="pt-16 md:pt-20 pb-36 lg:pb-28">
            <section className="h-[68vh] min-h-[520px] flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-0 pb-28 space-y-4">
                {chatSeedMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.role === 'user'
                          ? 'bg-[#fa233b] text-white'
                          : 'bg-white border border-black/10 text-[#1d1d1f]'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className={`fixed left-0 right-0 bottom-16 md:bottom-0 md:left-20 ${compactSidebar ? 'lg:left-20' : 'lg:left-64'} z-40 px-4 md:px-8 lg:px-12 pb-3 md:pb-4`}>
              <div className="border-t border-black/10 pt-3 md:pt-4">
                <div className="flex items-end gap-3">
                  <textarea
                    rows={1}
                    placeholder="Type your message..."
                    className="flex-1 bg-white border border-black/10 rounded-2xl px-4 py-3 text-sm outline-none resize-none"
                  />
                  <button
                    type="button"
                    className="shrink-0 rounded-xl bg-[#fa233b] text-white text-sm font-semibold px-4 py-2.5 hover:bg-[#d91e33] transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : isBlogPage ? (
          <div className="pt-16 md:pt-20 space-y-8 pb-20">
            <section>
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedBlogCategory('All')}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      selectedBlogCategory === 'All'
                        ? 'bg-[#fa233b] text-white'
                        : 'bg-white border border-black/10 text-[#1d1d1f] hover:bg-gray-50'
                    }`}
                  >
                    All
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogDrafts.map((note) => (
                  <article
                    key={note.title}
                    className="cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
                    onClick={() => setSelectedBlogDraft(note)}
                  >
                    {note.thumbnail && (
                      <div className="aspect-[16/9] rounded-2xl border border-[#D7DEE8] bg-[#F2F4F7] overflow-hidden shadow-sm transition-all hover:shadow-md">
                        <img
                          src={note.thumbnail}
                          alt={note.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className={note.thumbnail ? 'pt-3 px-1' : 'rounded-2xl border border-black/10 bg-white p-5 hover:bg-gray-50 transition-colors'}>
                    <h4 className="text-base font-bold leading-snug text-gray-900">{note.title}</h4>
                    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium text-gray-500">
                      <span className="uppercase tracking-wider text-[#fa233b]">{note.status}</span>
                      <span className="text-gray-300">•</span>
                      <span>{note.updated}</span>
                    </div>
                    {!note.thumbnail && (
                      <p className="mt-2.5 text-sm text-gray-600 leading-relaxed">{note.summary}</p>
                    )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <>
            <section className="pt-16 md:pt-20 mb-10">
              {searchQuery && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-[#6e6e73] mb-0">
                    {`${filteredApps.length} result${filteredApps.length === 1 ? '' : 's'} for "${searchQuery}"`}
                  </p>
                </div>
              )}

              {isProjectsPage && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                  {PROJECT_FILTERS.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setSelectedProjectFilter(filter)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        selectedProjectFilter === filter
                          ? 'bg-[#fa233b] text-white'
                          : 'bg-white border border-black/10 text-[#1d1d1f] hover:bg-gray-50'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                  </div>
                </div>
              )}

              {isProjectsPage ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8">
                  {filteredApps.map(app => (
                    <AppListItem key={app.id} app={app} onOpen={handleAppClick} />
                  ))}
                  {filteredApps.length === 0 && (
                    <div className="py-20 text-center lg:col-span-2">
                      <p className="text-gray-400 font-medium">
                        No projects found matching your criteria.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className={appCardGridClass}>
                  {filteredApps.map(app => (
                    <AppCard key={app.id} app={app} onClick={handleAppClick} />
                  ))}
                  {filteredApps.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                      <p className="text-gray-400 font-medium">No apps found matching your criteria.</p>
                    </div>
                  )}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* Mobile Navigation - Only visible on small screens */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 h-16 glass border-t border-black/5 z-50 flex items-center justify-between px-3">
        {mobileNavItems.map((item) => (
          <button
            key={item.category}
            onClick={() => setSelectedCategory(item.category)}
            className={`p-2 rounded-full ${selectedCategory === item.category ? 'text-[#fa233b]' : 'text-gray-400'}`}
          >
            {item.renderIcon('w-6 h-6')}
          </button>
        ))}
      </nav>

      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsContactModalOpen(false)}
          />
          <div className={`relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300 ${
            isDark
              ? 'bg-[#111315] border border-white/10'
              : 'bg-white'
          }`}>
            <div className={`flex items-center justify-between px-6 py-4 md:px-10 md:py-6 backdrop-blur-md sticky top-0 z-10 border-b ${
              isDark
                ? 'bg-[#111315]/90 border-white/10'
                : 'bg-white/80 border-gray-100'
            }`}>
              <div className="text-left">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact</h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Share your project brief.</p>
              </div>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className={`p-2 rounded-full transition-colors ${
                  isDark
                    ? 'bg-white/8 hover:bg-white/12'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <svg className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 md:p-10 text-left">
              <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-100' : 'text-[#1d1d1f]'}`}>Name</span>
                  <input type="text" value={contactName} onChange={(e) => { setContactName(e.target.value); if (contactSubmitState.type !== 'idle') setContactSubmitState({ type: 'idle', message: '' }); }} placeholder="Your name" className={`rounded-lg px-4 py-2.5 text-sm outline-none ${
                    isDark
                      ? 'bg-white/5 border border-white/10 text-white placeholder:text-gray-500'
                      : 'bg-white/95 border border-black/10 text-[#1d1d1f]'
                  }`} />
                </label>
                <label className="flex flex-col gap-2">
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-100' : 'text-[#1d1d1f]'}`}>Email</span>
                  <input type="email" required value={contactEmail} onChange={(e) => { setContactEmail(e.target.value); if (contactSubmitState.type !== 'idle') setContactSubmitState({ type: 'idle', message: '' }); }} placeholder="you@example.com" className={`rounded-lg px-4 py-2.5 text-sm outline-none ${
                    isDark
                      ? 'bg-white/5 border border-white/10 text-white placeholder:text-gray-500'
                      : 'bg-white/95 border border-black/10 text-[#1d1d1f]'
                  }`} />
                </label>
                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-100' : 'text-[#1d1d1f]'}`}>Project Type</span>
                  <select value={contactProjectType} onChange={(e) => { setContactProjectType(e.target.value); if (contactSubmitState.type !== 'idle') setContactSubmitState({ type: 'idle', message: '' }); }} className={`rounded-lg px-4 py-2.5 text-sm outline-none ${
                    isDark
                      ? 'bg-white/5 border border-white/10 text-white'
                      : 'bg-white/95 border border-black/10 text-[#1d1d1f]'
                  }`}>
                    <option>AI/ML</option>
                    <option>Python</option>
                    <option>Web App</option>
                    <option>Desktop App</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-100' : 'text-[#1d1d1f]'}`}>Message</span>
                  <textarea rows={6} required value={contactMessage} onChange={(e) => { setContactMessage(e.target.value); if (contactSubmitState.type !== 'idle') setContactSubmitState({ type: 'idle', message: '' }); }} placeholder="Tell me about your goals, expected output, and timeline." className={`rounded-lg px-4 py-3 text-sm outline-none resize-y ${
                    isDark
                      ? 'bg-white/5 border border-white/10 text-white placeholder:text-gray-500'
                      : 'bg-white/95 border border-black/10 text-[#1d1d1f]'
                  }`} />
                </label>
                <div className="md:col-span-2 flex items-center justify-between gap-4 flex-wrap">
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#6e6e73]'}`}>For urgent requests, email me directly.</p>
                  <button type="submit" disabled={isSubmittingContact} className="inline-flex items-center rounded-lg bg-[#fa233b] text-white text-sm font-semibold px-5 py-2.5 hover:bg-[#d91e33] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">{isSubmittingContact ? 'Sending...' : 'Send Message'}</button>
                </div>
                {contactSubmitState.type !== 'idle' && (
                  <p className={`md:col-span-2 text-sm ${contactSubmitState.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {contactSubmitState.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {selectedBlogDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedBlogDraft(null)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-300">
            <div className="flex items-start justify-between px-6 py-5 md:px-8 md:py-6 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{selectedBlogDraft.updated}</p>
                <h2 className="text-xl font-bold text-gray-900">{selectedBlogDraft.title}</h2>
                <p className="text-sm text-gray-500">Blog</p>
              </div>
              <button
                onClick={() => setSelectedBlogDraft(null)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 md:p-8 text-left">
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {selectedBlogDraft.content || selectedBlogDraft.summary}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* App Detail Modal */}
      <AppDetailModal 
        app={selectedApp} 
        onClose={() => setSelectedApp(null)} 
      />
    </div>
  );
};

export default App;
