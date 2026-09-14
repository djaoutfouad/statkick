import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AdSlot } from '../common/AdSlot';
import { adsConfig, isValidPublisherId } from '../../config/ads';
import { canServeAds, subscribeConsentChange } from '../../utils/consentManager';

interface SiteLayoutProps {
  children: React.ReactNode;
}

const AD_EXCLUDED_ROUTES = new Set([
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
  '/about',
  '/disclaimer',
  '/methodology',
  '/404',
]);

export const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const [canDisplayAds, setCanDisplayAds] = useState<boolean>(canServeAds());

  useEffect(() => {
    const unsubscribe = subscribeConsentChange(() => {
      setCanDisplayAds(canServeAds());
    });
    return unsubscribe;
  }, []);

  const isExcludedRoute = AD_EXCLUDED_ROUTES.has(pathname);
  const showRails = adsConfig.enabled && isValidPublisherId(adsConfig.client) && canDisplayAds && !isExcludedRoute;


  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-start justify-center">
        {/* 1. Left Advertisement Rail (Visible on XL Desktop screens 1280px+ when ads enabled) */}
        {showRails && (
          <aside
            className="hidden xl:flex flex-col items-center w-[180px] 2xl:w-[200px] shrink-0 pt-2 sticky top-20"
            aria-label="Left advertisement rail"
          >
            <AdSlot position="rail-left" slotNumber={1} variant="skyscraper" />
          </aside>
        )}

        {/* 2. Center Content Area */}
        <main className="w-full min-w-0 flex-1 max-w-5xl">
          {children}
        </main>

        {/* 3. Right Advertisement Rail (Visible on XL Desktop screens 1280px+ when ads enabled) */}
        {showRails && (
          <aside
            className="hidden xl:flex flex-col items-center w-[180px] 2xl:w-[200px] shrink-0 pt-2 sticky top-20"
            aria-label="Right advertisement rail"
          >
            <AdSlot position="rail-right" slotNumber={2} variant="skyscraper" />
          </aside>
        )}
      </div>
    </div>
  );
};
