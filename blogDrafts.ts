import soraUpdate1 from './content/blog/sora-update-1.md?raw';
import sora2 from './content/blog/sora-2.md?raw';
import abundantIntelligence from './content/blog/abundant-intelligence.md?raw';
import jakubAndSzymon from './content/blog/jakub-and-szymon.md?raw';
import gentleSingularity from './content/blog/gentle-singularity.md?raw';

export type BlogDraft = {
  title: string;
  status: string;
  summary: string;
  updated: string;
  content: string;
};

export const BLOG_DRAFTS: BlogDraft[] = [
  {
    title: 'Sora update #1',
    status: 'Draft',
    summary: 'Notes on upcoming policy changes, rightsholder controls, and monetization direction.',
    updated: '2026-03-16',
    content: soraUpdate1
  },
  {
    title: 'Sora 2',
    status: 'Draft',
    summary: 'Launch framing for a new model + product, creation-first UX, and safety concerns.',
    updated: '2026-03-16',
    content: sora2
  },
  {
    title: 'Abundant Intelligence',
    status: 'Idea',
    summary: 'Why compute is the bottleneck, and what massive infrastructure buildout implies.',
    updated: '2026-03-16',
    content: abundantIntelligence
  },
  {
    title: 'Jakub and Szymon',
    status: 'Idea',
    summary: 'Short recognition note on research + engineering leadership behind major breakthroughs.',
    updated: '2026-03-16',
    content: jakubAndSzymon
  },
  {
    title: 'The Gentle Singularity',
    status: 'Polishing',
    summary: 'A long-form reflection on rapid AI progress, risks, and societal adaptation.',
    updated: '2026-03-16',
    content: gentleSingularity
  }
];
