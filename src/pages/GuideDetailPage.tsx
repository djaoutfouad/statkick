import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { GUIDES_DATA } from '../data/guidesData';
import { TOOLS_LIST } from '../data/toolsList';
import { useLanguage } from '../hooks/useLanguage';
import { SEOHead } from '../components/common/SEOHead';
import {
  Compass,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  Wrench,
  ChevronRight,
  ShieldAlert,
  Calendar,
} from 'lucide-react';
import { AdSlot } from '../components/common/AdSlot';

export const GuideDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, getToolTranslation } = useLanguage();

  const guide = GUIDES_DATA.find((g) => g.slug === slug);

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  const relatedTools = TOOLS_LIST.filter((tool) =>
    guide.relatedToolSlugs.includes(tool.slug)
  );

  const guideStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: guide.title,
    description: guide.excerpt,
    proficiencyLevel: guide.difficulty,
    publisher: {
      '@type': 'Organization',
      name: 'StatKick',
      url: 'https://statkick.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://statkick.com/guides/${guide.slug}`,
    },
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title={`${guide.title} | StatKick Guides`}
        description={guide.excerpt}
        canonicalPath={`/guides/${guide.slug}`}
        structuredData={guideStructuredData}
      />
      {/* Back button */}
      <div>
        <Link
          to="/guides"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-green-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.common.backToGuides}</span>
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4 border-b border-gray-200 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 font-bold border border-green-200">
            {guide.category}
          </span>
          <span className="text-gray-400">•</span>
          <span className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700 font-semibold">
            {guide.difficulty}
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {guide.readTime}
          </span>
          {guide.lastReviewed && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium text-[11px] flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Reviewed: {guide.lastReviewed}
              </span>
            </>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          {guide.title}
        </h1>

        <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
          {guide.tagline}
        </p>
      </header>

      {/* In-Content Ad */}
      <AdSlot position="slot2-mid-content" slotNumber={2} variant="rectangle" />

      {/* Step by Step Breakdown */}
      <div className="space-y-8">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-bold text-gray-900">
            {t.guides.diagnosticFramework}
          </h2>
        </div>

        <div className="space-y-6">
          {guide.steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-green-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-green-700">
                    {step.summary}
                  </p>
                </div>
              </div>

              <div className="pl-10 space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
                {step.details.map((d, dIdx) => (
                  <p key={dIdx}>{d}</p>
                ))}
              </div>

              {step.proTip && (
                <div className="mt-3 ml-10 bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-amber-950">{t.common.proTip}:</strong> {step.proTip}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Summary Takeaway Box */}
      <div className="bg-gradient-to-r from-green-900 to-green-950 text-white rounded-2xl p-6 space-y-2 shadow-lg">
        <h3 className="text-base font-bold text-green-300">
          {t.guides.keySummary}
        </h3>
        <p className="text-xs sm:text-sm text-green-50 leading-relaxed">
          {guide.summaryTakeaway}
        </p>
      </div>

      {/* Methodology References */}
      {guide.references && guide.references.length > 0 && (
        <div className="border-t border-gray-200 pt-6 space-y-3">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Methodological Sources & Practical Benchmarks
          </h3>
          <ul className="space-y-1.5 text-xs text-gray-600">
            {guide.references.map((ref, rIdx) => (
              <li key={rIdx} className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <div>
                  <span className="font-semibold text-gray-800">{ref.title}</span>
                  <span className="text-gray-500"> — {ref.source}</span>
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-green-600 underline hover:text-green-700"
                    >
                      [Reference]
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Guide Analytical Notice */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
        <p className="font-bold text-slate-800">Tactical Research & Educational Standard</p>
        <p className="leading-relaxed">
          StatKick scouting guides establish a standardized diagnostic framework for evaluating tactical patterns and player profiles. All models operate independently for analytical study.
        </p>
      </div>

      {/* Directly Related Tools */}
      {relatedTools.length > 0 && (
        <div className="border-t border-gray-200 pt-8 space-y-4">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-green-600" />
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              {t.common.relatedTools}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedTools.map((tool) => {
              const tr = getToolTranslation(tool.slug);
              return (
                <Link
                  key={tool.slug}
                  to={`/tools/${tool.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:border-green-400 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">
                      {tool.category}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-green-600 transition-colors mt-0.5">
                      {tr.name || tool.name}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                      {tr.tagline || tool.tagline}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-green-600">
                    <span>{t.common.calculate}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Ad */}
      <AdSlot position="slot4-footer" slotNumber={4} variant="leaderboard" />
    </div>
  );
};
