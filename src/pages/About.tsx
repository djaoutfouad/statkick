import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { Trophy, Cpu, ShieldCheck, Target, BarChart2, BookOpen } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const seoData = {
    title: 'About StatKick — Football Stats Tools for Serious Fans',
    description: 'Learn about StatKick: our mission, mathematical methodologies, client-side privacy architecture, and dedicated football analytics tools.',
    canonicalPath: '/about',
  };

  return (
    <div className="w-full pb-8">
      <SEOHead {...seoData} />
      <Breadcrumbs items={[{ label: 'About StatKick' }]} />

      <header className="my-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 mb-3">
          <Trophy className="w-3.5 h-3.5" />
          Mission & Vision
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          About StatKick
        </h1>
        <p className="mt-2 text-base text-gray-600 max-w-2xl">
          Empowering serious football fans, tactical analysts, fantasy managers, and scouts with transparent, instant statistical calculators.
        </p>
      </header>

      {/* Meaningful Content Section 1 */}
      <section className="prose max-w-none text-sm text-gray-700 space-y-6 leading-relaxed">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-green-600" />
            Our Mission & The StatKick Philosophy
          </h2>
          <p>
            Football statistics have evolved far beyond basic goals and clean sheets. Modern football discourse is driven by pressing rates (PPDA), shot conversion lethality, expected goal contributions, tactical positional matchups, and financial wage structures. Yet, access to transparent mathematical tools that demystify these metrics has remained fragmented or locked behind expensive enterprise software.
          </p>
          <p className="mt-3">
            StatKick was created to bridge this gap. We provide 21 dedicated, rigorously crafted football analytics calculators designed specifically for fans who take the tactical, financial, and competitive nuances of the beautiful game seriously. Every formula in our toolkit is made explicit, allowing you to test scenarios, evaluate transfer valuations, rank tactical setups, and simulate league finishes instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              100% Client-Side Engine
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every single calculation across all 21 tools executes directly inside your browser engine. We do not transmit your simulated squads, transfer budgets, or player ratings to external servers or remote databases. This ensures fast response times, zero calculation latency, and local data privacy for your inputs.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-3">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Transparent Methodology
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We reject black-box statistical algorithms. Every tool page on StatKick provides a comprehensive mathematical breakdown of weights, normalized factors, and positional curves. When you see a player rating or pressing index, you understand exactly which statistical variables drove the outcome.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-green-600" />
            What StatKick Is — and What It Is Not
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-gray-600">
            <p>
              <strong>What StatKick Is:</strong> A comprehensive computational workbench for football supporters, fantasy managers, writers, scouts, and grass-roots coaches to calculate, simulate, and benchmark tactical and statistical metrics on demand.
            </p>
            <p>
              <strong>What StatKick Is Not:</strong> We do not claim to provide live sports betting odds, real-time match streaming feeds, or official club proprietary scouting data. All values generated are analytical estimates based on mathematical frameworks and user-supplied data points.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-2xs">
          <ShieldCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="text-base font-bold text-gray-900 mb-1">
            Commitment to Ethical Publisher Standards
          </h3>
          <p className="text-xs text-gray-600 max-w-xl mx-auto leading-relaxed">
            StatKick is built around editorial integrity, transparent analytics, accessible web standards, and respectful advertising placements designed for a clean user experience.
          </p>
        </div>
      </section>
    </div>
  );
};
