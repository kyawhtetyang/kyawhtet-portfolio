import React from 'react';
import { appConfig } from '../config';
import { Category } from '../types';
import { UserSettings } from '../userSettings';

type SettingsViewProps = {
  compactSidebar: boolean;
  formspreeEndpoint: string;
  onUpdateSetting: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
  theme: UserSettings['theme'];
  userSettings: UserSettings;
  visibleCategories: Category[];
};

const SettingsToggle: React.FC<{
  checked: boolean;
  description: string;
  label: string;
  onChange: (checked: boolean) => void;
}> = ({ checked, description, label, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    aria-pressed={checked}
    className="flex w-full items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white px-5 py-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-colors hover:bg-gray-50"
  >
    <div className="min-w-0">
      <p className="text-sm font-semibold text-[#1d1d1f]">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-[#6e6e73]">{description}</p>
    </div>
    <span
      className={`inline-flex min-w-16 items-center justify-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
        checked ? 'bg-[#fa233b] text-white' : 'bg-black/5 text-[#86868b]'
      }`}
    >
      {checked ? 'On' : 'Off'}
    </span>
  </button>
);

const ThemeChoiceButton: React.FC<{
  active: boolean;
  label: string;
  onClick: () => void;
}> = ({ active, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
      active
        ? 'border-[#fa233b] bg-[#fa233b] text-white'
        : 'border-black/10 bg-white text-[#1d1d1f] hover:bg-gray-50'
    }`}
  >
    {label}
  </button>
);

export const SettingsView: React.FC<SettingsViewProps> = ({
  compactSidebar,
  formspreeEndpoint,
  onUpdateSetting,
  theme,
  userSettings,
  visibleCategories,
}) => {
  const isContactFormConfigured = Boolean(formspreeEndpoint && !formspreeEndpoint.includes('your_form_id'));

  return (
  <div className="pt-16 md:pt-20 space-y-8 pb-20">
    <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      <div className="xl:col-span-7 space-y-4">
        <div className="rounded-2xl border border-black/10 bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#fa233b]">Appearance</p>
          <h3 className="mt-3 text-lg font-bold text-[#1d1d1f]">Personalize this browser</h3>
          <p className="mt-2 text-sm text-[#6e6e73]">
            These preferences stay local to your current browser. Deploy flags in `.env.local` still decide what can exist at all.
          </p>
          <p className="mt-3 inline-flex rounded-full bg-[#fa233b]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#fa233b]">
            Settings Beta
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <ThemeChoiceButton active={theme === 'dark'} label="Dark" onClick={() => onUpdateSetting('theme', 'dark')} />
            <ThemeChoiceButton active={theme === 'light'} label="Light" onClick={() => onUpdateSetting('theme', 'light')} />
          </div>
        </div>

        <SettingsToggle
          checked={userSettings.preferCompactSidebar}
          label="Compact sidebar"
          description="Keep the desktop sidebar icon-first, even on larger widths."
          onChange={(checked) => onUpdateSetting('preferCompactSidebar', checked)}
        />
        <SettingsToggle
          checked={userSettings.compactGrid}
          label="Compact grid"
          description="Pack more cards into photo and app shelves for denser browsing."
          onChange={(checked) => onUpdateSetting('compactGrid', checked)}
        />
        <SettingsToggle
          checked={userSettings.rememberLastTab}
          label="Remember last tab"
          description="Return to your previous section on reload instead of always starting on Discover."
          onChange={(checked) => onUpdateSetting('rememberLastTab', checked)}
        />
        <SettingsToggle
          checked={userSettings.showBetaFeatures}
          label="Show beta features"
          description="Display sections that are enabled in env config but still marked beta."
          onChange={(checked) => onUpdateSetting('showBetaFeatures', checked)}
        />
      </div>

      <div className="xl:col-span-5 space-y-4">
        <div className="rounded-2xl border border-black/10 bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#fa233b]">Live Config</p>
          <h3 className="mt-3 text-lg font-bold text-[#1d1d1f]">Deployment gates</h3>
          <p className="mt-2 text-sm text-[#6e6e73]">
            These come from env config and stay read-only here.
          </p>
          <ul className="mt-5 space-y-3 text-sm text-[#1d1d1f]">
            <li className="flex items-center justify-between gap-4 border-b border-black/10 pb-3">
              <span>Blog</span>
              <span className="font-semibold">{appConfig.features.blog ? (appConfig.beta.blog ? 'Enabled (Beta)' : 'Enabled') : 'Disabled'}</span>
            </li>
            <li className="flex items-center justify-between gap-4 border-b border-black/10 pb-3">
              <span>Library</span>
              <span className="font-semibold">{appConfig.features.library ? (appConfig.beta.library ? 'Enabled (Beta)' : 'Enabled') : 'Disabled'}</span>
            </li>
            <li className="flex items-center justify-between gap-4 border-b border-black/10 pb-3">
              <span>Ask</span>
              <span className="font-semibold">{appConfig.features.ask ? (appConfig.beta.ask ? 'Enabled (Beta)' : 'Enabled') : 'Disabled'}</span>
            </li>
            <li className="flex items-center justify-between gap-4 border-b border-black/10 pb-3">
              <span>Settings</span>
              <span className="font-semibold">{appConfig.features.settings ? (appConfig.beta.settings ? 'Enabled (Beta)' : 'Enabled') : 'Disabled'}</span>
            </li>
            <li className="flex items-center justify-between gap-4">
              <span>Contact Form</span>
              <span className="font-semibold">{isContactFormConfigured ? 'Configured' : 'Missing'}</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#fa233b]">Current Result</p>
          <div className="mt-4 space-y-2 text-sm text-[#6e6e73]">
            <p>Theme: <span className="font-semibold text-[#1d1d1f]">{theme}</span></p>
            <p>Sidebar: <span className="font-semibold text-[#1d1d1f]">{compactSidebar ? 'Compact' : 'Expanded on large screens'}</span></p>
            <p>Grid density: <span className="font-semibold text-[#1d1d1f]">{userSettings.compactGrid ? 'Compact' : 'Standard'}</span></p>
            <p>Visible tabs: <span className="font-semibold text-[#1d1d1f]">{visibleCategories.join(', ')}</span></p>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};
