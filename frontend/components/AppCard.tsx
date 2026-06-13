import React from 'react';
import { AppInfo } from '../types';
import { getProjectFilterType } from '../projectType';

interface AppCardProps {
  app: AppInfo;
  onClick: (app: AppInfo) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ app, onClick }) => {
  return (
    <div
      onClick={() => onClick(app)}
      className="w-full min-w-0 sm:max-w-[150px] sm:mx-auto flex flex-col gap-1.5 group cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="relative aspect-square overflow-hidden rounded-[20%] border border-[#D7DEE8] bg-[#F2F4F7] shadow-sm group-hover:shadow-md group-hover:bg-[#E8EDF3] transition-all">
        <img
          src={app.icon}
          alt={app.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h4 className="text-[13px] font-medium text-gray-900 truncate leading-tight">{app.name}</h4>
        <p className="text-[11px] text-gray-500 truncate">{getProjectFilterType(app)}</p>
      </div>
    </div>
  );
};
