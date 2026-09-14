import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import type { RouteRecord } from 'vite-react-ssg';
import { LanguageProvider } from './i18n';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ConsentBanner } from './components/common/ConsentBanner';
import { SiteLayout } from './components/layout/SiteLayout';

// Informational, Editorial & Legal Pages
import { HomePage } from './pages/Home';
import { Blog } from './pages/Blog';
import { BlogPostPage } from './pages/BlogPostPage';
import { Guides } from './pages/Guides';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { Methodology } from './pages/Methodology';
import { Disclaimer } from './pages/Disclaimer';
import { AboutPage } from './pages/About';
import { ContactPage } from './pages/Contact';
import { PrivacyPage } from './pages/Privacy';
import { TermsPage } from './pages/Terms';
import { CookiesPage } from './pages/Cookies';
import { NotFoundPage } from './pages/NotFound';

// 21 Tactical & Analytics Tool Pages
import { PlayerPerformanceRaterPage } from './pages/tools/PlayerPerformanceRaterPage';
import { TeamComparisonPage } from './pages/tools/TeamComparisonPage';
import { PassAccuracyCalculatorPage } from './pages/tools/PassAccuracyCalculatorPage';
import { ShotConversionRatePage } from './pages/tools/ShotConversionRatePage';
import { PossessionImpactAnalyzerPage } from './pages/tools/PossessionImpactAnalyzerPage';
import { PlayerFormIndexPage } from './pages/tools/PlayerFormIndexPage';
import { TransferValueEstimatorPage } from './pages/tools/TransferValueEstimatorPage';
import { WageCalculatorPage } from './pages/tools/WageCalculatorPage';
import { SquadValueCalculatorPage } from './pages/tools/SquadValueCalculatorPage';
import { ContractWorthAnalyzerPage } from './pages/tools/ContractWorthAnalyzerPage';
import { FantasyFootballPointsPage } from './pages/tools/FantasyFootballPointsPage';
import { BestXiSelectorPage } from './pages/tools/BestXiSelectorPage';
import { CaptainPickAnalyzerPage } from './pages/tools/CaptainPickAnalyzerPage';
import { TransferSuggestionPage } from './pages/tools/TransferSuggestionPage';
import { LeagueTableSimulatorPage } from './pages/tools/LeagueTableSimulatorPage';
import { PointsNeededCalculatorPage } from './pages/tools/PointsNeededCalculatorPage';
import { HeadToHeadStatsPage } from './pages/tools/HeadToHeadStatsPage';
import { SeasonGoalsTrackerPage } from './pages/tools/SeasonGoalsTrackerPage';
import { FormationAnalyzerPage } from './pages/tools/FormationAnalyzerPage';
import { PressingIntensityCalculatorPage } from './pages/tools/PressingIntensityCalculatorPage';
import { SetPieceSuccessRatePage } from './pages/tools/SetPieceSuccessRatePage';

// ScrollToTop on route transition
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export const RootLayout: React.FC = () => {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#f9fafb] text-[#111827]">
        <Navbar />
        <SiteLayout>
          <Outlet />
        </SiteLayout>
        <Footer />
        <ConsentBanner />
      </div>
    </LanguageProvider>
  );
};

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: 'guides', element: <Guides /> },
      { path: 'guides/:slug', element: <GuideDetailPage /> },
      { path: 'methodology', element: <Methodology /> },
      { path: 'disclaimer', element: <Disclaimer /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'cookies', element: <CookiesPage /> },

      // 1. Performance Tools
      { path: 'tools/player-performance-rater', element: <PlayerPerformanceRaterPage /> },
      { path: 'tools/team-comparison', element: <TeamComparisonPage /> },
      { path: 'tools/pass-accuracy-calculator', element: <PassAccuracyCalculatorPage /> },
      { path: 'tools/shot-conversion-rate', element: <ShotConversionRatePage /> },
      { path: 'tools/possession-impact-analyzer', element: <PossessionImpactAnalyzerPage /> },
      { path: 'tools/player-form-index', element: <PlayerFormIndexPage /> },

      // 2. Market Tools
      { path: 'tools/transfer-value-estimator', element: <TransferValueEstimatorPage /> },
      { path: 'tools/wage-calculator', element: <WageCalculatorPage /> },
      { path: 'tools/squad-value-calculator', element: <SquadValueCalculatorPage /> },
      { path: 'tools/contract-worth-analyzer', element: <ContractWorthAnalyzerPage /> },

      // 3. Fantasy Tools
      { path: 'tools/fantasy-football-points', element: <FantasyFootballPointsPage /> },
      { path: 'tools/best-xi-selector', element: <BestXiSelectorPage /> },
      { path: 'tools/captain-pick-analyzer', element: <CaptainPickAnalyzerPage /> },
      { path: 'tools/transfer-suggestion', element: <TransferSuggestionPage /> },

      // 4. Simulation Tools
      { path: 'tools/league-table-simulator', element: <LeagueTableSimulatorPage /> },
      { path: 'tools/points-needed-calculator', element: <PointsNeededCalculatorPage /> },
      { path: 'tools/head-to-head-stats', element: <HeadToHeadStatsPage /> },
      { path: 'tools/season-goals-tracker', element: <SeasonGoalsTrackerPage /> },

      // 5. Tactical Tools
      { path: 'tools/formation-analyzer', element: <FormationAnalyzerPage /> },
      { path: 'tools/pressing-intensity-calculator', element: <PressingIntensityCalculatorPage /> },
      { path: 'tools/set-piece-success-rate', element: <SetPieceSuccessRatePage /> },

      // 404 Route
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
