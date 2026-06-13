import React from 'react';
import { AppInfo } from '../types';
import { getProjectFilterType } from '../projectType';

interface AppDetailModalProps {
  app: AppInfo | null;
  onClose: () => void;
}

export const AppDetailModal: React.FC<AppDetailModalProps> = ({ app, onClose }) => {
  if (!app) return null;

  const projectType = getProjectFilterType(app);
  const projectUrl = app.website;
  const githubUrl = app.repo;
  const downloadUrl = app.downloadUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 py-4 sm:px-6 md:px-10 md:py-6 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
          <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
            <img src={app.icon} alt={app.name} className="w-16 h-16 rounded-[20%] border border-black/5 shadow-sm object-cover" />
            <div className="text-left min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 break-words">{app.name}</h2>
              <p className="text-sm text-gray-500 break-words">{projectType}</p>
            </div>
          </div>
          <div className="w-full sm:w-auto flex flex-wrap items-center justify-start sm:justify-end gap-2 sm:gap-3">
            {downloadUrl && (
              <a
                href={downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 sm:px-5 py-1.5 bg-[#fa233b] text-white font-bold rounded-full text-sm hover:bg-[#d91e33] transition-colors"
              >
                Download
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 sm:px-5 py-1.5 bg-gray-100 text-[#1d1d1f] font-bold rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                GitHub
              </a>
            )}
            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 sm:px-5 py-1.5 bg-gray-100 text-blue-600 font-bold rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                Open
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 text-left">
          <div className="space-y-8">
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#fa233b] mb-2">Overview</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{app.overview}</p>
            </section>

            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#fa233b] mb-2">Tech Stack</h3>
              <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">{app.stack}</p>
            </section>

            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#fa233b] mb-2">Outcome</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{app.outcome}</p>
            </section>
            {app.demo && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#fa233b] mb-2">Demo Access</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{app.demo}</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
