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
            StatKick provides interactive calculators, statistical tools, tactical guides, and analytical articles for educational, analytical, and entertainment purposes only. We distinguish between widely recognized industry-standard metrics (such as PPDA pressing rates, pass accuracy percentages, shot conversion ratios, and points-per-game trajectories) and StatKick proprietary heuristic estimations (such as Player Performance Index scores, Transfer Value estimates, Wage structuring models, and Tactical Matchup evaluations). All proprietary index scores represent quantitative mathematical approximations rather than definitive ratings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900">2. No Gambling, Financial, or Legal Advice</h2>
          <p>
            StatKick does NOT provide sports betting advice, gambling recommendations, or financial investment guidance. In particular, our Transfer Value Estimator, Wage Calculator, Squad Value Calculator, and Contract Worth Analyzer are theoretical educational models and do NOT constitute professional accounting, financial, employment, or legal counsel. Users engage with all calculators at their own discretion.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900">3. Independent Operation & Non-Affiliation Statement</h2>
          <p>
            StatKick is an independent digital publication and sports analytics software project created by open football data contributors. StatKick is NOT affiliated with, sponsored by, authorized by, or officially endorsed by UEFA, FIFA, the Premier League, La Liga, Serie A, or any professional football club. Furthermore, our Fantasy Football Points Calculator, Best XI Selector, and Captain Pick Analyzer are independent analytical utilities and have no affiliation with Fantasy Premier League (FPL) or its parent organizations. All registered trademarks, club names, and tournament brands belong exclusively to their respective copyright and trademark holders.
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
