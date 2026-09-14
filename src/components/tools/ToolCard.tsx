import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ToolMeta } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';

interface ToolCardProps {
  tool: ToolMeta;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { t, getToolTranslation } = useLanguage();
  const tr = getToolTranslation(tool.slug);

  // Dynamically resolve icon from lucide-react with fallback
  const IconComponent = (Icons as any)[tool.icon] || Icons.Activity;

  const categoryColors: Record<ToolMeta['category'], string> = {
    Performance: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    Market: 'text-amber-700 bg-amber-50 border-amber-200',
    Fantasy: 'text-purple-700 bg-purple-50 border-purple-200',
    Simulation: 'text-blue-700 bg-blue-50 border-blue-200',
    Tactical: 'text-rose-700 bg-rose-50 border-rose-200',
  };

  const displayName = tr.name || tool.name;
  const displayDesc = tr.description || tool.description;

  return (
    <div
      id={`tool-card-${tool.slug}`}
      className="group relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white hover:shadow-lg hover:border-green-500/40 transition-all duration-200 overflow-hidden"
    >
      {/* Persona Image Header */}
      {tool.personaImageUrl && (
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900 rounded-t-2xl">
          <img
            src={tool.personaImageUrl}
            alt={tool.personaRole || displayName}
            width={600}
            height={300}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />
          {tool.personaRole && (
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-900/90 text-slate-200 border border-slate-700/70 backdrop-blur-xs shadow-xs max-w-full truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="truncate">{tool.personaRole}</span>
              </span>
            </div>
          )}
        </div>
      )}

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-green-600 group-hover:scale-105 group-hover:bg-green-50 transition-all">
              <IconComponent className="w-4.5 h-4.5" />
            </div>
            <span
              className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${
                categoryColors[tool.category]
              }`}
            >
              {tool.category}
            </span>
          </div>

          <h3 className="text-base font-bold text-gray-900 group-hover:text-green-600 transition-colors">
            {displayName}
          </h3>
          <p className="mt-2 text-xs text-gray-600 line-clamp-3 leading-relaxed">
            {displayDesc}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-green-600">
          <span>{t.common.calculate}</span>
          <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      <Link
        to={`/tools/${tool.slug}`}
        className="absolute inset-0 z-20"
        aria-label={`Open ${displayName} calculator`}
      />
    </div>
  );
};
