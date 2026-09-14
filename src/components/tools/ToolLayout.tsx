import React from 'react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { AdSlot } from '../common/AdSlot';
import { RelatedTools } from './RelatedTools';
import { ToolFAQ } from './ToolFAQ';
import { ToolMeta, FAQItem, BreadcrumbItem } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';
import { SEOHead } from '../common/SEOHead';
import { Sparkles, BookOpen, Calculator, LineChart, Info } from 'lucide-react';

interface ToolLayoutProps {
  tool: ToolMeta;
  introContent?: React.ReactNode;
  metricExplanation?: React.ReactNode;
  calculatorNode: React.ReactNode;
  resultsNode: React.ReactNode;
  interpretationContent?: React.ReactNode;
  methodologyContent?: React.ReactNode;
  footballContextContent?: React.ReactNode;
  faqs?: FAQItem[];
  relatedSlugs?: string[];
  breadcrumbs?: BreadcrumbItem[];
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({
  tool,
  introContent,
  metricExplanation,
  calculatorNode,
  resultsNode,
  interpretationContent,
  methodologyContent,
  footballContextContent,
  faqs,
  relatedSlugs,
  breadcrumbs,
}) => {
  const { t, getToolTranslation } = useLanguage();
  const tr = getToolTranslation(tool.slug);

  const displayName = tr.name || tool.name;
  const displayTagline = tr.tagline || tool.tagline;
  const displayDesc = tr.description || tool.description;
  const activeFaqs = (faqs && faqs.length > 0) ? faqs : (tr.faqs || []);

  const defaultBreadcrumbs: BreadcrumbItem[] = breadcrumbs || [
    { label: t.nav.allTools, path: '/' },
    { label: tool.category, path: `/#${tool.category.toLowerCase()}` },
    { label: displayName },
  ];

  const seoStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: displayName,
        applicationCategory: 'SportsApplication',
        operatingSystem: 'All',
        description: displayDesc,
        url: `https://statkick.com/tools/${tool.slug}`,
        author: {
          '@type': 'Organization',
          name: 'StatKick',
          url: 'https://statkick.com/about',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: activeFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="w-full pb-8">
      <SEOHead
        title={`${displayName} | StatKick Football Analytics`}
        description={displayDesc}
        canonicalPath={`/tools/${tool.slug}`}
        structuredData={seoStructuredData}
      />
      {/* 1. Breadcrumbs */}
      <Breadcrumbs items={defaultBreadcrumbs} />

      {/* 2. Single H1 & Category Header */}
      <header className="my-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 text-xs font-semibold text-green-700 bg-green-50 rounded-full border border-green-200">
            {tool.category} Analytics
          </span>
          <span className="text-xs text-gray-500">
            {t.common.clientSide}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
          {displayName}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl">
          {displayTagline}
        </p>
      </header>

      {/* 3. Introduction & Metric Overview */}
      <section className="mb-8 max-w-none text-xs sm:text-sm text-gray-700 space-y-4">
        <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-5">
          <div className="flex items-center gap-2 mb-2 font-bold text-gray-900 text-sm">
            <BookOpen className="w-4 h-4 text-green-600" />
            <span>{t.common.overviewPurpose}</span>
          </div>
          {introContent || <p className="leading-relaxed">{tr.intro}</p>}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center gap-2 mb-2 font-bold text-gray-900 text-sm">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span>{t.common.whyMetricMatters}</span>
          </div>
          {metricExplanation || <p className="leading-relaxed">{tr.metricExplanation}</p>}
        </div>
      </section>

      {/* 4. Interactive Calculator & Results Engine */}
      <section
        id="calculator-engine"
        className="my-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs"
        aria-label={`${displayName} interactive interface`}
      >
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              {displayName} — {t.common.inputConsole}
            </h2>
            <p className="text-xs text-gray-500">
              {t.common.inputConsoleDesc}
            </p>
          </div>
        </div>

        {/* Dynamic Calculator Inputs Grid */}
        <div className="mb-8">{calculatorNode}</div>

        {/* Results Display Area */}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <LineChart className="w-4 h-4 text-green-600" />
            {t.common.calculatedOutput}
          </h3>
          {resultsNode}

          {/* Analytical & Educational Model Disclaimer */}
          <div className="mt-6 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Model Estimate & Educational Notice:</strong> Calculated values are statistical estimates based on your numerical inputs and established football analytics formulas. StatKick operates as an independent research suite and is not affiliated with FIFA, UEFA, the Premier League, or sports betting services. All calculations execute locally inside your browser.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Post-Calculator Ad Slot */}
      <AdSlot position="slot3-post-calculator" slotNumber={3} variant="rectangle" className="my-8" />

      {/* 6. Interpretation & Qualitative Analysis */}
      <section className="my-8 rounded-2xl border border-gray-200 bg-white p-6 text-xs sm:text-sm text-gray-700 space-y-4 shadow-2xs">
        <h2 className="text-base font-bold text-gray-900">
          {t.common.howToInterpret}
        </h2>
        {interpretationContent || <p className="leading-relaxed">{tr.interpretation}</p>}
      </section>

      {/* 7. Calculation Methodology & Formula */}
      <section className="my-8 rounded-2xl border border-gray-200 bg-white p-6 text-xs sm:text-sm text-gray-700 space-y-4 shadow-2xs">
        <h2 className="text-base font-bold text-gray-900">
          {t.common.mathMethodology}
        </h2>
        {methodologyContent || (
          <div className="space-y-2 font-mono text-xs bg-gray-50 p-4 rounded-xl border border-gray-200">
            <p className="font-sans font-bold text-sm text-gray-900">{t.common.mathMethodology}:</p>
            <p className="leading-relaxed font-sans">{tr.methodology || tr.formulaSummary}</p>
          </div>
        )}
      </section>

      {/* 8. Practical Football Context & Tactical Benchmarks */}
      <section className="my-8 rounded-2xl border border-gray-200 bg-white p-6 text-xs sm:text-sm text-gray-700 space-y-4 shadow-2xs">
        <h2 className="text-base font-bold text-gray-900">
          {t.common.tacticalContext}
        </h2>
        {footballContextContent || <p className="leading-relaxed">{tr.footballContext}</p>}
      </section>

      {/* 9. Tool FAQ */}
      <ToolFAQ faqs={activeFaqs} title={`${displayName} — ${t.common.faqTitle}`} />

      {/* 10. Related Tools */}
      <RelatedTools currentToolSlug={tool.slug} suggestedSlugs={relatedSlugs} />

      {/* 11. Pre-Footer Ad Slot */}
      <AdSlot position="slot4-footer" slotNumber={4} variant="leaderboard" className="my-8" />
    </div>
  );
};
