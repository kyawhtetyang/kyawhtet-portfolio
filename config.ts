const readFlag = (value: string | undefined) => value?.trim().toLowerCase() === 'true';

export const appConfig = {
  formspreeEndpoint: (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined)?.trim() ?? '',
  features: {
    blog: readFlag(import.meta.env.VITE_ENABLE_BLOG as string | undefined),
    photo: readFlag(import.meta.env.VITE_ENABLE_PHOTO as string | undefined),
    chat: readFlag(import.meta.env.VITE_ENABLE_CHAT as string | undefined),
  },
  beta: {
    blog: readFlag(import.meta.env.VITE_BLOG_BETA as string | undefined),
    photo: readFlag(import.meta.env.VITE_PHOTO_BETA as string | undefined),
    chat: readFlag(import.meta.env.VITE_CHAT_BETA as string | undefined),
  },
} as const;
