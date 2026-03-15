
import React, { useEffect, useMemo, useState } from 'react';
import { Category, AppInfo } from './types';
import { PROJECT_FILTERS, ProjectFilter, getProjectFilterType } from './projectType';
import { APPS } from './constants';
import { AppStoreListItem } from './components/AppStoreListItem';
import { AppDetailModal } from './components/AppDetailModal';
import profilePhoto from './docs/01_AIML_Portfolio.png';


const SidebarItem: React.FC<{ 
  category: Category; 
  active: boolean; 
  onClick: (cat: Category) => void;
  icon: React.ReactNode;
}> = ({ category, active, onClick, icon }) => (
  <button 
    onClick={() => onClick(category)}
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
      active 
        ? 'bg-black/5 text-[#1d1d1f]' 
        : 'text-gray-500 hover:bg-black/5 hover:text-[#1d1d1f]'
    }`}
  >
    <span className={`${active ? 'text-[#1d1d1f]' : 'text-gray-400 group-hover:text-[#1d1d1f]'}`}>
      {icon}
    
    </span>
    <span className="text-sm font-semibold">{category}</span>
  </button>
);

const App: React.FC = () => {
  const privateStoreApps = useMemo(() => {
    const privateStoreLocalModules = import.meta.glob<{ PRIVATE_STORE_APPS?: AppInfo[] }>('./privateStore.local.ts', { eager: true });
    const localPrivateStoreApps = Object.values(privateStoreLocalModules).flatMap((mod) => mod.PRIVATE_STORE_APPS ?? []);
    return localPrivateStoreApps.length > 0 ? localPrivateStoreApps : [];
  }, []);
  const privateStoreEnabled = (import.meta.env.VITE_ENABLE_PRIVATE_STORE as string | undefined)?.trim().toLowerCase() === 'true';
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return 'dark';
  });
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.Discover);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<ProjectFilter>('Featured');
  const [selectedApp, setSelectedApp] = useState<AppInfo | null>(null);
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
  const isDark = theme === 'dark';
  const isDiscoverPage = selectedCategory === Category.Discover;
  const isChatPage = selectedCategory === Category.Chat;
  const isProjectsPage = selectedCategory === Category.Projects;
  const isAppStorePage = selectedCategory === Category.AppStore;
  const profile = {
    email: 'kyaw.htet.yang@gmail.com',
    linkedin: 'https://linkedin.com/in/kyawhtetyang',
    github: 'https://github.com/kyawhtetyang',
    resume: 'https://u.pcloud.link/publink/show?code=kZze2M5ZWWU8Wv1GxPfEbPPJLkhDuB6yEt7k',
    phone: '+95 388337',
    location: 'Yangon, Myanmar'
  };

  const formspreeEndpoint = (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined)?.trim();

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
    'Prompt Engineering',
    'Model Deployment'
  ];

  const featuredWork = [
    {
      title: 'Fake News Detector (BiLSTM)',
      summary: 'End-to-end fake news detection pipeline with preprocessing, BiLSTM training, Flask prediction interface, and Docker deployment support.',
      stack: 'Python, TensorFlow, BiLSTM, Flask, Docker'
    },
    {
      title: 'Movie Recommender (Hybrid)',
      summary: 'Hybrid recommendation MVP combining user/item/content/latent methods with Flask web pages, dynamic recommendations, and SQLite-backed ratings.',
      stack: 'Python, Flask, SQLite, Hybrid Recommender'
    },
    {
      title: 'File Organizer Pro',
      summary: 'Automated local file-processing pipeline with step previews, deduplication modes, presets, undo history, and desktop-ready workflow integration.',
      stack: 'FastAPI, React, Vite, SQLite/Postgres, Tauri'
    }
  ];

  const filteredApps = useMemo(() => {
    const sourceApps = isAppStorePage ? privateStoreApps : APPS;
    let list = sourceApps;

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
  }, [isAppStorePage, isProjectsPage, privateStoreApps, searchQuery, selectedProjectFilter]);

  const handleAppClick = (app: AppInfo) => {
    setSelectedApp(app);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('theme', theme);
    } catch {
      // Ignore storage errors (private mode or blocked storage).
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
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
      <aside className="hidden lg:flex flex-col w-64 glass border-r border-black/5 p-6 fixed inset-y-0 z-20">
        <div className="mb-10 pl-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-2xl font-bold tracking-tight flex items-center gap-2 hover:opacity-85 transition-opacity"
            aria-label="Reload page"
          >
            <img
              src={profilePhoto}
              alt="Kyaw Htet"
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
            />
            Kyaw Htet
          </button>
        </div>

        <nav className="space-y-1">
          <SidebarItem 
            category={Category.Discover} 
            active={selectedCategory === Category.Discover} 
            onClick={setSelectedCategory}
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
          />
          <SidebarItem 
            category={Category.Projects} 
            active={selectedCategory === Category.Projects} 
            onClick={setSelectedCategory}
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h8v13H3V7zm10-3h8v16h-8V4z" /></svg>}
          />
          {privateStoreEnabled && (
            <SidebarItem
              category={Category.AppStore}
              active={selectedCategory === Category.AppStore}
              onClick={setSelectedCategory}
              icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 12h14M5 16h14" /></svg>}
            />
          )}
          <button
            onClick={() => setSelectedCategory(Category.Chat)}
            className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
              selectedCategory === Category.Chat
                ? 'bg-black/5 text-[#1d1d1f]'
                : 'text-gray-500 hover:bg-black/5 hover:text-[#1d1d1f]'
            }`}
          >
            <span className="flex items-center gap-3 min-w-0">
              <span className={`${selectedCategory === Category.Chat ? 'text-[#1d1d1f]' : 'text-gray-400 group-hover:text-[#1d1d1f]'}`}><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h5m8-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span className="text-sm font-semibold truncate">{Category.Chat}</span>
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              selectedCategory === Category.Chat
                ? 'bg-[#1d1d1f] text-white'
                : 'bg-black/10 text-[#1d1d1f]'
            }`}>
              Beta
            </span>
          </button>
        </nav>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 pt-0 px-4 pb-4 md:px-6 md:pb-6 lg:px-6 lg:pb-8">
        <header className="fixed top-0 left-0 right-0 lg:left-64 z-40 px-4 md:px-6 lg:px-6 h-12 md:h-14 bg-white border-b border-black/10 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg md:text-xl font-semibold text-[#1d1d1f] tracking-tight">{selectedCategory}</h2>
              {isChatPage && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#fa233b]/10 text-[#fa233b]">
                  Beta
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {!isDiscoverPage && !isChatPage && (
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
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-white border border-black/10 rounded-2xl p-6 md:p-7">
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

              <div className="lg:col-span-4 bg-white border border-black/10 rounded-2xl p-6 md:p-7">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="text-[#6e6e73]">Role</span>
                    <span className="font-semibold text-[#1d1d1f]">AI/ML Junior Developer</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="text-[#6e6e73]">Address</span>
                    <span className="font-semibold text-[#1d1d1f]">{profile.location}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="text-[#6e6e73]">Phone</span>
                    <span className="font-semibold text-[#1d1d1f]">{profile.phone}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="text-[#6e6e73]">Status</span>
                    <span className="font-semibold text-[#1d1d1f]">Open to Collaboration</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-[#6e6e73]">Email</span>
                    <span className="font-semibold text-[#1d1d1f] truncate ml-4">{profile.email}</span>
                  </li>
                </ul>
              </div>
              </div>
            </section>

            <div className="border-t border-black/10"></div>

            <section>
              <p className="text-xs font-bold uppercase tracking-wider text-[#fa233b] mb-3">Featured Work</p>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {featuredWork.map((project) => (
                  <article key={project.title} className="bg-white border border-black/10 rounded-2xl p-5">
                    <h4 className="text-base font-bold text-gray-900">{project.title}</h4>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{project.summary}</p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500">{project.stack}</p>
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

            <div className="fixed left-0 right-0 bottom-16 lg:bottom-0 lg:left-64 z-40 px-4 md:px-8 lg:px-12 pb-3 lg:pb-4">
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
                <p className="text-[11px] text-[#6e6e73] mt-2">
                  Beta preview. For guaranteed response, use Contact on Discover.
                </p>
              </div>
            </div>
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
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#6e6e73] mb-2">Category</p>
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

              {isProjectsPage || isAppStorePage ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8">
                  {filteredApps.map(app => (
                    <AppStoreListItem key={app.id} app={app} onOpen={handleAppClick} />
                  ))}
                  {filteredApps.length === 0 && (
                    <div className="py-20 text-center lg:col-span-2">
                      <p className="text-gray-400 font-medium">
                        {isProjectsPage ? 'No projects found matching your criteria.' : 'No apps found matching your criteria.'}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-x-4 sm:gap-x-5 gap-y-6">
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
      <nav className="lg:hidden fixed bottom-0 inset-x-0 h-16 glass border-t border-black/5 z-50 flex items-center justify-around px-4">
        <button onClick={() => setSelectedCategory(Category.Discover)} className={`p-2 rounded-full ${selectedCategory === Category.Discover ? 'text-[#fa233b]' : 'text-gray-400'}`}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </button>
        <button onClick={() => setSelectedCategory(Category.Projects)} className={`p-2 rounded-full ${selectedCategory === Category.Projects ? 'text-[#fa233b]' : 'text-gray-400'}`}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h8v13H3V7zm10-3h8v16h-8V4z" /></svg>
        </button>
        {privateStoreEnabled && (
          <button onClick={() => setSelectedCategory(Category.AppStore)} className={`p-2 rounded-full ${selectedCategory === Category.AppStore ? 'text-[#fa233b]' : 'text-gray-400'}`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 12h14M5 16h14" /></svg>
          </button>
        )}
        <button onClick={() => setSelectedCategory(Category.Chat)} className={`p-2 rounded-full ${selectedCategory === Category.Chat ? 'text-[#fa233b]' : 'text-gray-400'}`}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h5m8-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>
      </nav>

      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsContactModalOpen(false)}
          />
          <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between px-6 py-4 md:px-10 md:py-6 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-900">Contact</h2>
                <p className="text-sm text-gray-500">Share your project brief.</p>
              </div>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 md:p-10 text-left">
              <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#1d1d1f]">Name</span>
                  <input type="text" value={contactName} onChange={(e) => { setContactName(e.target.value); if (contactSubmitState.type !== 'idle') setContactSubmitState({ type: 'idle', message: '' }); }} placeholder="Your name" className="bg-white/95 border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#1d1d1f]">Email</span>
                  <input type="email" required value={contactEmail} onChange={(e) => { setContactEmail(e.target.value); if (contactSubmitState.type !== 'idle') setContactSubmitState({ type: 'idle', message: '' }); }} placeholder="you@example.com" className="bg-white/95 border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none" />
                </label>
                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-sm font-medium text-[#1d1d1f]">Project Type</span>
                  <select value={contactProjectType} onChange={(e) => { setContactProjectType(e.target.value); if (contactSubmitState.type !== 'idle') setContactSubmitState({ type: 'idle', message: '' }); }} className="bg-white/95 border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none">
                    <option>AI/ML</option>
                    <option>Python</option>
                    <option>Web App</option>
                    <option>Desktop App</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-sm font-medium text-[#1d1d1f]">Message</span>
                  <textarea rows={6} required value={contactMessage} onChange={(e) => { setContactMessage(e.target.value); if (contactSubmitState.type !== 'idle') setContactSubmitState({ type: 'idle', message: '' }); }} placeholder="Tell me about your goals, expected output, and timeline." className="bg-white/95 border border-black/10 rounded-lg px-4 py-3 text-sm outline-none resize-y" />
                </label>
                <div className="md:col-span-2 flex items-center justify-between gap-4 flex-wrap">
                  <p className="text-xs text-[#6e6e73]">For urgent requests, email me directly.</p>
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

      {/* App Detail Modal */}
      <AppDetailModal 
        app={selectedApp} 
        onClose={() => setSelectedApp(null)} 
      />
    </div>
  );
};

export default App;
