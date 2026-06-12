import { appConfig } from '../config';

export type ResearchFlowStep = {
  step_order: number;
  agent_name: string;
  output: string;
};

export type ResearchFlowSource = {
  title: string;
  url: string;
  snippet?: string;
  quality_score?: number;
};

export type ResearchFlowDetail = {
  job: {
    id: number;
    query: string;
    status: string;
  };
  steps: ResearchFlowStep[];
  sources: ResearchFlowSource[];
  report?: {
    markdown: string;
  } | null;
};

export type ResearchFlowSummary = {
  job_id: number;
  status: string;
  step_count: number;
  source_count: number;
  average_source_quality: number;
  has_report: boolean;
  readiness_score: number;
};

const apiBase = appConfig.researchFlowApiUrl.replace(/\/$/, '');

const requestJson = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${apiBase}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`ResearchFlow API ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const runResearchFlow = async (query: string): Promise<{ detail: ResearchFlowDetail; summary: ResearchFlowSummary }> => {
  const created = await requestJson<{ id: number }>('/api/research/', {
    method: 'POST',
    body: JSON.stringify({ query, run_now: true }),
  });

  const [detail, summary] = await Promise.all([
    requestJson<ResearchFlowDetail>(`/api/research/${created.id}`),
    requestJson<ResearchFlowSummary>(`/api/research/${created.id}/summary`),
  ]);

  return { detail, summary };
};
