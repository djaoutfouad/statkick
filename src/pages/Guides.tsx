import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { GUIDES_DATA } from '../data/guidesData';
import { useLanguage } from '../hooks/useLanguage';
import { SEOHead } from '../components/common/SEOHead';
import { Compass, Clock, ArrowRight, Layers, CheckCircle2, ChevronRight } from 'lucide-react';
import { AdSlot } from '../components/common/AdSlot';

export const Guides: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const filteredGuides = useMemo(() => {
    if (selectedDifficulty === 'All') return GUIDES_DATA;
    return GUIDES_DATA.filter((g) => g.difficulty === selectedDifficulty);
  }, [selectedDifficulty]);

  const seoData = {
    title: 'Football Analytics & Tactical Guides | StatKick',
    description: 'Step-by-step guides explaining how to analyze players, compare teams, measure pressing intensity (PPDA), and evaluate match statistics.',
    canonicalPath: '/guides',
  };

  return (
    <div className="space-y-10">
      <SEOHead {...seoData} />
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>{t.guides.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          {t.guides.title}
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          {t.guides.subtitle}
        </p>
      </div>

      {/* Difficulty Filter */}
      <div className="flex items-center justify-center gap-2">
        {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => {
          const isSelected = selectedDifficulty === diff;
          return (
            <button
              key={diff}
              type="button"
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-green-600 text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {diff === 'All' ? t.guides.allLevels : diff}
            </button>
          );
        })}
      </div>

      {/* In-Content Ad */}
      <AdSlot position="slot2-mid-content" slotNumber={2} variant="rectangle" />

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGuides.map((guide) => (
          <div
            key={guide.slug}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                    guide.difficulty === 'Beginner'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : guide.difficulty === 'Intermediate'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-purple-50 text-purple-700 border border-purple-200'
                  }`}
                >
                  {guide.difficulty}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {guide.readTime}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  <Link to={`/guides/${guide.slug}`}>{guide.title}</Link>
                </h3>
                <p className="text-xs text-green-700 font-medium mt-0.5">{guide.tagline}</p>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {guide.excerpt}
              </p>

              {/* Step Checklist Preview */}
              <div className="bg-gray-50 rounded-xl p-3.5 space-y-2 border border-gray-100">
                <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                  {t.guides.stepByStep} ({guide.steps.length} {t.common.step}s)
                </p>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  {guide.steps.map((step, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      <span className="truncate">{step.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">
                {guide.category}
              </span>
              <Link
                to={`/guides/${guide.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 group-hover:text-green-700 transition-colors"
              >
                <span>{t.common.readGuide}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Ad */}
      <AdSlot position="slot4-footer" slotNumber={4} variant="leaderboard" />
    </div>
  );
};
