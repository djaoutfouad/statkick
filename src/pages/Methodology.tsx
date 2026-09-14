import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS_LIST } from '../data/toolsList';
import { useLanguage } from '../hooks/useLanguage';
import { SEOHead } from '../components/common/SEOHead';
import { FileText, Cpu, CheckCircle2, ShieldCheck, AlertCircle, ArrowRight, Wrench } from 'lucide-react';

export const Methodology: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();

  const seoData = {
    title: 'Analytics Methodology & Formulas | StatKick',
    description: 'Explore the mathematical frameworks, statistical normalization, positional weights, and metrics powering StatKick football calculators.',
    canonicalPath: '/methodology',
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <SEOHead {...seoData} />
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>{t.methodology.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          {t.methodology.title}
        </h1>
        <p className="text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
          {t.methodology.subtitle}
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-green-50 text-green-700 flex items-center justify-center font-bold">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">
            {t.common.clientSide}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            All 21 calculators execute directly in your web browser. Zero server transmission ensures speed and user privacy.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-green-50 text-green-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">
            {t.common.transparentFormulas}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Every scoring index, multiplier, and probability calculation is fully disclosed with mathematical formulas.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-green-50 text-green-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">
            Positional Calibration
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Weights are normalized for goalkeepers, defenders, midfielders, and forwards on standardized 100-point scales.
          </p>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
        <h2 className="text-xl font-bold text-gray-900">
          {t.methodology.philosophyTitle}
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {t.methodology.philosophyBody}
        </p>

        <h3 className="text-lg font-bold text-gray-900 pt-3">
          {t.methodology.normalizationTitle}
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {t.methodology.normalizationBody}
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 mt-4">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
              {t.methodology.limitationsTitle}
            </h4>
            <p className="text-xs text-amber-900 leading-relaxed">
              {t.methodology.limitationsBody}
            </p>
          </div>
        </div>
      </div>

      {/* All 21 Tools Formulas Breakdown */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {t.methodology.modelsHeading} (21)
          </h2>
          <span className="text-xs text-gray-500 font-medium">
            Open Analytical Specifications
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {TOOLS_LIST.map((tool, idx) => {
            const tr = getToolTranslation(tool.slug);
            return (
              <div
                key={tool.slug}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs hover:border-green-300 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">
                      {idx + 1}. {tool.category}
                    </span>
                    <h3 className="text-base font-bold text-gray-900">
                      {tr.name || tool.name}
                    </h3>
                  </div>
                  <Link
                    to={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-green-600 hover:text-green-700 shrink-0"
                  >
                    <span>Launch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {tr.description || tool.description}
                </p>

                <div className="bg-gray-50 rounded-lg p-3 text-xs font-mono text-gray-800 border border-gray-200/80">
                  <strong className="text-gray-500 font-sans uppercase text-[10px] block mb-1">
                    Mathematical Formulation:
                  </strong>
                  {tool.formulaSummary}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
