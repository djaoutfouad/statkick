import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdSlot } from '../components/common/AdSlot';
import { ToolCard } from '../components/tools/ToolCard';
import { SEOHead } from '../components/common/SEOHead';
import { TOOLS_LIST, CATEGORIES } from '../data/toolsList';
import { BLOG_POSTS } from '../data/blogData';
import { GUIDES_DATA } from '../data/guidesData';
import { ToolCategory, FAQItem } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import {
  Trophy,
  ArrowRight,
  Info,
  Cpu,
  ShieldCheck,
  Zap,
  Sparkles,
  BarChart3,
  BookOpen,
  Compass,
  CheckCircle2,
  Clock,
  Calendar,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const HomePage: React.FC = () => {
  const { t, getToolTranslation } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'All'>('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const homeFaqs: FAQItem[] = [
    {
      question: 'How do StatKick football calculators work?',
      answer:
        'All 21 StatKick tools utilize established football analytics models, statistical weights, and tactical logic executed 100% locally in your browser. You input verified match metrics, scout parameters, or team statistics, and our formulas instantly compute ratings, valuations, dominance indexes, and tactical projections without any server lag.',
    },
    {
      question: 'Are my entered squad values, player ratings, or tactics saved to external servers?',
      answer:
        'No. StatKick is engineered with strict client-side privacy. None of your entered stats, squad compositions, or transfer budget simulations are transmitted to backend servers or stored in remote databases.',
    },
    {
      question: 'How are Player Performance and Form ratings calculated?',
      answer:
        'Our Player Performance Rater uses position-specific weighted formulas tuned for Goalkeepers, Defenders, Midfielders, and Forwards. It evaluates goal contributions, pass completion, key chances, dribbles, and defensive tackles, normalized to a 100-point scale. The Player Form Index evaluates 5-game rolling momentum, disciplinary penalties, and minutes-played durability bonuses.',
    },
    {
      question: 'Can I use StatKick for Fantasy Football (FPL) planning?',
      answer:
        'Yes. StatKick provides a dedicated Fantasy section featuring an FPL-style Fantasy Points Calculator, a heuristic Best XI & Formation Selector across 6 formations, an algorithm-driven Captain Pick Analyzer, and a Transfer Strategy Engine.',
    },
    {
      question: 'What is PPDA and how is pressing intensity calculated?',
      answer:
        'PPDA stands for Passes Allowed Per Defensive Action. It is a quantitative metric used in modern football analytics to measure pressing aggression. Our Pressing Intensity Calculator analyzes opponent passes in defensive zones against tackles, interceptions, and challenges to evaluate pressing systems.',
    },
  ];

  const homeStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'StatKick',
        url: 'https://statkick.com/',
        description: 'Football Stats Tools for Serious Fans',
      },
      {
        '@type': 'FAQPage',
        mainEntity: homeFaqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      },
    ],
  };

  const filteredTools =
    selectedCategory === 'All'
      ? TOOLS_LIST
      : TOOLS_LIST.filter((t) => t.category === selectedCategory);

  const featuredGuide = GUIDES_DATA.find((g) => g.slug === 'how-to-analyze-a-player') || GUIDES_DATA[0];
  const recentArticles = BLOG_POSTS.slice(0, 3);

  const getCategoryLabel = (cat: 'All' | ToolCategory) => {
    switch (cat) {
      case 'All':
        return t.categories.all;
      case 'Performance':
        return t.categories.performance;
      case 'Market':
        return t.categories.market;
      case 'Fantasy':
        return t.categories.fantasy;
      case 'Simulation':
        return t.categories.simulation;
      case 'Tactical':
        return t.categories.tactical;
      default:
        return cat;
    }
  };

  return (
    <div className="w-full space-y-12">
      <SEOHead
        title="StatKick — Football Stats Tools for Serious Fans"
        description="Comprehensive suite of 21 interactive football analytics and statistical calculators for fans, analysts, fantasy managers, and coaches. Measure player ratings, team dominance, squad values, and tactics."
        canonicalPath="/"
        structuredData={homeStructuredData}
      />
      {/* Hero Section with Cinematic Night Stadium Background */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 my-2">
        {/* Stadium Background under Floodlights (Pure Athletic Pitch & Architecture) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=2000&q=80')",
          }}
          role="img"
          aria-label="Football stadium under floodlights at night"
        />
        {/* Dark Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/90 to-slate-950" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 py-12 sm:py-16 lg:py-20 max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-xs shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.home.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {t.home.heroTitlePrefix}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-green-400">
              {t.home.heroTitleHighlight}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.home.heroSubtitle}
          </p>

          {/* Value Prop Badges */}
          <div className="flex flex-wrap justify-center items-center gap-3 pt-2 text-xs font-medium text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/70 text-slate-200 backdrop-blur-xs">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              {t.common.zeroLatency}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/70 text-slate-200 backdrop-blur-xs">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              {t.common.clientSide}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/70 text-slate-200 backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              {t.common.transparentFormulas}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Guide Banner */}
      {featuredGuide && (
        <section className="bg-gradient-to-br from-green-900 via-green-950 to-gray-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-300 text-xs font-semibold border border-green-400/30">
                <Compass className="w-3.5 h-3.5" />
                <span>{t.home.featuredGuideBadge}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {t.home.featuredGuideHeading}
              </h2>
              <p className="text-xs sm:text-sm text-green-100/80 leading-relaxed">
                {t.home.featuredGuideSub}
              </p>
            </div>
            <Link
              to={`/guides/${featuredGuide.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 active:bg-green-600 text-gray-950 font-bold text-xs transition-all shrink-0 shadow-md"
            >
              <span>{t.common.readGuide}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Toolkit Categories Filter & Tools Grid */}
      <section id="tools-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {t.home.toolkitHeading}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {t.home.toolkitSubheading}
            </p>
          </div>
          <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200 self-start sm:self-auto">
            {filteredTools.length} {t.nav.tools} Available
          </span>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {(['All', ...CATEGORIES.map((c) => c.id)] as ('All' | ToolCategory)[]).map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-green-600 text-white font-bold shadow-xs'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/70'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            );
          })}
        </div>

        {/* Tools Grid (21 tools) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Mid-Content In-Feed Ad Slot */}
      <AdSlot position="slot2-mid-content" slotNumber={2} variant="rectangle" />

      {/* How StatKick Works Section */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {t.home.howItWorksHeading}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            {t.home.howItWorksSubheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2 p-4 rounded-xl bg-gray-50/80 border border-gray-100">
            <div className="w-7 h-7 rounded-lg bg-green-600 text-white font-bold flex items-center justify-center text-xs">
              1
            </div>
            <h3 className="text-sm font-bold text-gray-900">{t.home.step1Title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{t.home.step1Desc}</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-gray-50/80 border border-gray-100">
            <div className="w-7 h-7 rounded-lg bg-green-600 text-white font-bold flex items-center justify-center text-xs">
              2
            </div>
            <h3 className="text-sm font-bold text-gray-900">{t.home.step2Title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{t.home.step2Desc}</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-gray-50/80 border border-gray-100">
            <div className="w-7 h-7 rounded-lg bg-green-600 text-white font-bold flex items-center justify-center text-xs">
              3
            </div>
            <h3 className="text-sm font-bold text-gray-900">{t.home.step3Title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{t.home.step3Desc}</p>
          </div>
        </div>
      </section>

      {/* Latest Blog Articles Preview */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {t.home.latestBlogHeading}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              {t.home.latestBlogSub}
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-xs font-bold text-green-600 hover:text-green-700"
          >
            <span>{t.common.viewAll}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentArticles.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-green-50 text-green-700 font-semibold text-[11px]">
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">{post.date}</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-xs font-bold text-green-600 group-hover:text-green-700 inline-flex items-center gap-1"
                >
                  <span>{t.common.readArticle}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why We Built StatKick Section */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-200">
          <Trophy className="w-3.5 h-3.5 text-green-600" />
          <span>{t.home.whyBuiltBadge}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {t.home.whyBuiltTitle}
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <p>{t.home.whyBuiltP1}</p>
          <p>{t.home.whyBuiltP2}</p>
        </div>
        <div className="pt-2">
          <Link
            to="/methodology"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 hover:text-green-800"
          >
            <span>{t.home.methodologyCta}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight text-center">
          {t.home.faqHeading}
        </h2>

        <div className="space-y-3 max-w-3xl mx-auto">
          {homeFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-green-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Ad Slot */}
      <AdSlot position="slot4-footer" slotNumber={4} variant="leaderboard" />
    </div>
  );
};
