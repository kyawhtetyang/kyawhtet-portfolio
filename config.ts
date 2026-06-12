const readFlag = (value: string | undefined, defaultValue = false) => {
  if (value == null || value.trim() === '') return defaultValue;
  return value.trim().toLowerCase() === 'true';
};

export const appConfig = {
  formspreeEndpoint: (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined)?.trim() ?? '',
  researchFlowApiUrl: (import.meta.env.VITE_RESEARCHFLOW_API_URL as string | undefined)?.trim() || 'http://127.0.0.1:8000',
  features: {
    blog: readFlag(import.meta.env.VITE_ENABLE_BLOG as string | undefined, true),
    photo: readFlag(import.meta.env.VITE_ENABLE_PHOTO as string | undefined, true),
    chat: readFlag(import.meta.env.VITE_ENABLE_CHAT as string | undefined, true),
  },
  beta: {
    blog: readFlag(import.meta.env.VITE_BLOG_BETA as string | undefined),
    photo: readFlag(import.meta.env.VITE_PHOTO_BETA as string | undefined),
    chat: readFlag(import.meta.env.VITE_CHAT_BETA as string | undefined),
  },
} as const;
