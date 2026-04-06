import React from 'react';
import { AppInfo } from '../types';

interface AppListItemProps {
  app: AppInfo;
  onOpen: (app: AppInfo) => void;
}

export const AppListItem: React.FC<AppListItemProps> = ({ app, onOpen }) => {
  return (
    <article className="px-1 py-3 min-h-[84px] border-b border-black/10 last:border-b-0">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <img
            src={app.icon}
            alt={app.name}
            className="w-14 h-14 rounded-[22%] object-cover border border-[#D7DEE8] bg-[#F2F4F7] shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm sm:text-[15px] font-semibold text-[#1d1d1f] truncate leading-tight">{app.name}</h4>
            <p className="text-xs sm:text-sm text-[#6e6e73] truncate leading-tight mt-1">{app.subtitle}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onOpen(app)}
          className="shrink-0 w-16 h-8 rounded-full bg-[#f2f4f7] hover:bg-[#e8edf3] text-[#1d1d1f] text-xs font-bold transition-colors"
        >
          OPEN
        </button>
      </div>
    </article>
  );
};
