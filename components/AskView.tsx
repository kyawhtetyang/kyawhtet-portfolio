import React, { useState } from 'react';
import { ASK_EXAMPLES } from '../content/askExamples';
import { ResearchFlowDetail, ResearchFlowSummary, runResearchFlow } from '../services/researchFlowClient';

const renderReport = (markdown: string) =>
  markdown
    .split('\n')
    .filter((line) => line.trim())
    .map((line, index) => {
      if (line.startsWith('# ')) {
        return <h2 key={index} className="text-xl font-bold text-[#1d1d1f]">{line.slice(2)}</h2>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={index} className="pt-4 text-base font-bold text-[#1d1d1f]">{line.slice(3)}</h3>;
      }
      if (line.startsWith('- ')) {
        return <p key={index} className="pl-4 text-sm leading-relaxed text-gray-700">• {line.slice(2)}</p>;
      }
      return <p key={index} className="text-sm leading-relaxed text-gray-700">{line}</p>;
    });

export const AskView: React.FC = () => {
  const [query, setQuery] = useState(ASK_EXAMPLES[0]);
  const [detail, setDetail] = useState<ResearchFlowDetail | null>(null);
  const [summary, setSummary] = useState<ResearchFlowSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const run = async () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setError('');
    try {
      const result = await runResearchFlow(trimmed);
      setDetail(result.detail);
      setSummary(result.summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ResearchFlow API unavailable');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-16 md:pt-20 pb-24 space-y-6">
      <section className="rounded-2xl border border-black/10 bg-white p-5 md:p-6">
        <h2 className="text-2xl font-bold text-[#1d1d1f]">Ask ResearchFlow AI</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
          Ask about Kyaw Htet’s AI projects, backend skills, or AI Engineer fit. This tab calls the standalone ResearchFlow API and returns a source-backed report.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {ASK_EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setQuery(example)}
              className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-[#1d1d1f] hover:bg-gray-50"
            >
              {example}
            </button>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-end">
          <textarea
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            rows={3}
            className="min-h-[96px] flex-1 resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm leading-relaxed outline-none"
          />
          <button
            type="button"
            onClick={run}
            disabled={isLoading}
            className="shrink-0 rounded-xl bg-[#fa233b] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d91e33] disabled:cursor-wait disabled:opacity-60"
          >
            {isLoading ? 'Researching...' : 'Run Research'}
          </button>
        </div>
        {error && (
          <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}. Start ResearchFlow locally at http://127.0.0.1:8000.
          </p>
        )}
      </section>

      {summary && (
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ['Status', summary.status],
            ['Steps', summary.step_count],
            ['Sources', summary.source_count],
            ['Readiness', summary.readiness_score.toFixed(2)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-black/10 bg-white p-4">
              <strong className="block text-xl text-[#1d1d1f]">{value}</strong>
              <span className="mt-1 block text-[11px] font-bold uppercase tracking-wider text-gray-500">{label}</span>
            </div>
          ))}
        </section>
      )}

      {detail && (
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <article className="rounded-2xl border border-black/10 bg-white p-5">
              <h3 className="text-base font-bold text-[#1d1d1f]">Workflow</h3>
              <div className="mt-4 space-y-3">
                {detail.steps.map((step) => (
                  <div key={`${step.step_order}-${step.agent_name}`} className="border-l-2 border-[#fa233b] pl-3">
                    <p className="text-sm font-bold text-[#1d1d1f]">{step.step_order}. {step.agent_name.replace('_', ' ')}</p>
                    <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-gray-600">{step.output}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-black/10 bg-white p-5">
              <h3 className="text-base font-bold text-[#1d1d1f]">Sources</h3>
              <div className="mt-4 space-y-3">
                {detail.sources.map((source) => (
                  <div key={source.url} className="rounded-xl bg-gray-50 p-3">
                    <p className="text-sm font-bold text-[#1d1d1f]">{source.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-600">{source.snippet}</p>
                    <p className="mt-2 text-[11px] font-semibold text-gray-500">{source.url} · quality {(source.quality_score ?? 0).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <article className="rounded-2xl border border-black/10 bg-white p-5">
            <h3 className="text-base font-bold text-[#1d1d1f]">Report</h3>
            <div className="mt-4 space-y-2">
              {renderReport(detail.report?.markdown ?? 'No report generated.')}
            </div>
          </article>
        </section>
      )}
    </div>
  );
};
