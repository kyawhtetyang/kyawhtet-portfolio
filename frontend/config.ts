const readFlag = (value: string | undefined, defaultValue = false) => {
  if (value == null || value.trim() === '') return defaultValue;
  return value.trim().toLowerCase() === 'true';
};

export const appConfig = {
  formspreeEndpoint: (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined)?.trim() ?? '',
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() || 'http://127.0.0.1:8000',
  features: {
    blog: readFlag(import.meta.env.VITE_BLOG_ENABLE as string | undefined, true),
    library: readFlag(import.meta.env.VITE_LIBRARY_ENABLE as string | undefined, false),
    ask: readFlag(import.meta.env.VITE_ASK_ENABLE as string | undefined, true),
    settings: readFlag(import.meta.env.VITE_SETTINGS_ENABLE as string | undefined, false),
  },
  beta: {
    blog: readFlag(import.meta.env.VITE_BLOG_BETA as string | undefined),
    library: readFlag(import.meta.env.VITE_LIBRARY_BETA as string | undefined),
    ask: readFlag(import.meta.env.VITE_ASK_BETA as string | undefined),
    settings: readFlag(import.meta.env.VITE_SETTINGS_BETA as string | undefined),
  },
} as const;
