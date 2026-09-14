import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { SEOHead } from '../components/common/SEOHead';

export const Disclaimer: React.FC = () => {
  const { t } = useLanguage();

  const seoData = {
    title: 'Disclaimer & Editorial Policy | StatKick',
    description: 'Informational and mathematical notice: StatKick calculations are quantitative models for educational and recreational purposes.',
    canonicalPath: '/disclaimer',
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <SEOHead {...seoData} />
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-green-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.common.backToHome}</span>
        </Link>
      </div>

      <header className="space-y-3 border-b border-gray-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>Informational & Mathematical Notice</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Disclaimer & Editorial Policy
        </h1>
        <p className="text-sm text-gray-600">
          Last updated: February 2026
        </p>
      </header>

      <div className="space-y-6 text-sm text-gray-700 leading-relaxed bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900">1. Educational & Research Purpose</h2>
          <p>
            StatKick provides interactive calculators, statistical tools, tactical guides, and analytical articles for educational, analytical, and entertainment purposes only. The mathematical formulas and index scores generated represent quantitative models and estimations based on sports analytics principles.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900">2. No Gambling or Financial Advice</h2>
          <p>
            StatKick does NOT provide sports betting advice, gambling recommendations, or financial investment guidance. None of the statistical projections, match ratings, or simulated point tallies should be used as financial or betting counsel. Users engage with the tools at their own discretion.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900">3. Independent Operation & Trademarks</h2>
          <p>
            StatKick is an independent publication and software project. References to leagues, clubs, tournaments (e.g., Premier League, UEFA, FIFA, La Liga, Serie A), or fantasy platforms are made solely for descriptive, informational, and educational purposes. All registered trademarks and club names belong to their respective copyright holders.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900">4. Client-Side Processing & Privacy</h2>
          <p>
            All statistical calculations, player scouting evaluations, and team comparisons are performed locally inside your web browser. No personal match data or scouting inputs are transmitted or retained on remote servers.
          </p>
        </section>
      </div>
    </div>
  );
};
