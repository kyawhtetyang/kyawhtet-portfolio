import { appConfig } from '../config';

export type AskSource = {
  title: string;
  category: string;
  excerpt: string;
  path: string;
};

export type AskResponse = {
  answer: string;
  provider: string;
  used_sources: AskSource[];
};

export const sendAskMessage = async (message: string): Promise<AskResponse> => {
  const response = await fetch(`${appConfig.apiBaseUrl}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error(`Ask request failed with status ${response.status}`);
  }

  return response.json() as Promise<AskResponse>;
};
