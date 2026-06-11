import { appConfig } from './config';
import { Category } from './types';

export type ThemeMode = 'light' | 'dark';

export type UserSettings = {
  theme: ThemeMode;
  compactGrid: boolean;
  rememberLastTab: boolean;
  preferCompactSidebar: boolean;
  showBetaFeatures: boolean;
};

export const USER_SETTINGS_KEY = 'aiml-portfolio:user-settings';
export const LAST_CATEGORY_KEY = 'aiml-portfolio:last-category';

export const DEFAULT_USER_SETTINGS: UserSettings = {
  theme: 'dark',
  compactGrid: false,
  rememberLastTab: true,
  preferCompactSidebar: false,
  showBetaFeatures: true,
};

export const readUserSettings = (): UserSettings => {
  if (typeof window === 'undefined') return DEFAULT_USER_SETTINGS;

  try {
    const parsed = JSON.parse(window.localStorage.getItem(USER_SETTINGS_KEY) ?? '{}') as Partial<UserSettings>;
    const legacyTheme = window.localStorage.getItem('theme');
    const theme = parsed.theme === 'light' || parsed.theme === 'dark'
      ? parsed.theme
      : legacyTheme === 'light' || legacyTheme === 'dark'
        ? legacyTheme
        : DEFAULT_USER_SETTINGS.theme;

    return {
      theme,
      compactGrid: typeof parsed.compactGrid === 'boolean' ? parsed.compactGrid : DEFAULT_USER_SETTINGS.compactGrid,
      rememberLastTab: typeof parsed.rememberLastTab === 'boolean' ? parsed.rememberLastTab : DEFAULT_USER_SETTINGS.rememberLastTab,
      preferCompactSidebar: typeof parsed.preferCompactSidebar === 'boolean' ? parsed.preferCompactSidebar : DEFAULT_USER_SETTINGS.preferCompactSidebar,
      showBetaFeatures: typeof parsed.showBetaFeatures === 'boolean' ? parsed.showBetaFeatures : DEFAULT_USER_SETTINGS.showBetaFeatures,
    };
  } catch {
    return DEFAULT_USER_SETTINGS;
  }
};

const isCategory = (value: string): value is Category => Object.values(Category).includes(value as Category);

export const getVisibleCategories = (settings: UserSettings): Category[] => {
  const categories: Category[] = [Category.Discover, Category.Projects];

  if (appConfig.features.blog && (!appConfig.beta.blog || settings.showBetaFeatures)) {
    categories.push(Category.Blog);
  }

  if (appConfig.features.photo && (!appConfig.beta.photo || settings.showBetaFeatures)) {
    categories.push(Category.Photo);
  }

  if (appConfig.features.chat && (!appConfig.beta.chat || settings.showBetaFeatures)) {
    categories.push(Category.Chat);
  }

  return categories;
};

const readStoredCategory = (): Category | null => {
  if (typeof window === 'undefined') return null;

  try {
    const storedCategory = window.localStorage.getItem(LAST_CATEGORY_KEY);
    return storedCategory && isCategory(storedCategory) ? storedCategory : null;
  } catch {
    return null;
  }
};

export const getInitialCategory = (): Category => {
  const settings = readUserSettings();
  const visibleCategories = getVisibleCategories(settings);
  const storedCategory = settings.rememberLastTab ? readStoredCategory() : null;

  return storedCategory && visibleCategories.includes(storedCategory) ? storedCategory : Category.Discover;
};
