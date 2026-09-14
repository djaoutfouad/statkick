import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { adsConfig, isValidPublisherId, isValidSlotId } from '../../config/ads';
import { canServeAds, subscribeConsentChange, canServePersonalizedAds } from '../../utils/consentManager';

export type AdSlotPosition =
  | 'rail-left'
  | 'rail-right'
  | 'slot1-header'
  | 'slot2-mid-content'
  | 'slot3-post-calculator'
  | 'slot4-footer';

interface AdSlotProps {
  position: AdSlotPosition;
  className?: string;
  slotNumber?: 1 | 2 | 3 | 4;
  variant?: 'skyscraper' | 'leaderboard' | 'rectangle';
}

const EXCLUDED_ROUTES = [
  '/privacy',
  '/cookies',
  '/terms',
  '/disclaimer',
  '/contact',
  '/404',
];

/**
 * AdSense AdSlot component with multi-layered compliance gating:
 * 1. Checks environment flag & valid ca-pub format
 * 2. Checks CMP user consent for advertising cookies
 * 3. Checks whether route is an excluded policy/legal page
 * 4. Resolves slot ID and validates against placeholder dummy values
 * 5. If any check fails, returns null immediately with ZERO empty layout shifts
 */
export const AdSlot: React.FC<AdSlotProps> = ({
  position,
  className = '',
  slotNumber,
  variant = 'rectangle',
}) => {
  const location = useLocation();
  const [consentGranted, setConsentGranted] = useState<boolean>(canServeAds());

  useEffect(() => {
    const unsubscribe = subscribeConsentChange(() => {
      setConsentGranted(canServeAds());
    });
    return unsubscribe;
  }, []);

  // Compute route exclusion
  const isExcluded = EXCLUDED_ROUTES.some(
    (route) => location.pathname === route || location.pathname.startsWith(`${route}/`)
  );

  // Resolve slot ID
  let slotId = '';
  if (slotNumber === 1 || position === 'slot1-header') {
    slotId = adsConfig.slots.slot1Header;
  } else if (slotNumber === 2 || position === 'slot2-mid-content') {
    slotId = adsConfig.slots.slot2MidContent;
  } else if (slotNumber === 3 || position === 'slot3-post-calculator') {
    slotId = adsConfig.slots.slot3PostCalculator;
  } else if (slotNumber === 4 || position === 'slot4-footer') {
    slotId = adsConfig.slots.slot4Footer;
  }

  const isPersonalized = canServePersonalizedAds();

  const isReady =
    adsConfig.enabled &&
    isValidPublisherId(adsConfig.client) &&
    consentGranted &&
    !isExcluded &&
    isValidSlotId(slotId);

  useEffect(() => {
    if (!isReady) return;

    // Ensure AdSense script is dynamically loaded strictly when consent is granted and publisher ID is valid
    const existingScript = document.querySelector('script[src*="pagead2.googlesyndication.com"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsConfig.client}`;
      document.head.appendChild(script);
    }

    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // Silently handle blocked scripts or preview iframe environments
    }
  }, [isReady, slotId, consentGranted]);

  // If not ready, return null AFTER all hooks have executed unconditionally
  if (!isReady) {
    return null;
  }

  const variantDimensions = {
    skyscraper: 'min-h-[600px] w-[160px]',
    leaderboard: 'min-h-[90px] w-full max-w-[728px]',
    rectangle: 'min-h-[250px] w-full max-w-[336px]',
  }[variant];

  return (
    <aside
      id={`ad-container-${position}`}
      aria-label="Advertisement"
      className={`relative my-8 flex flex-col items-center justify-center ${className}`}
    >
      <span className="text-[10px] font-semibold tracking-wider uppercase text-gray-400 mb-1.5 select-none">
        Advertisement
      </span>
      <div className={`overflow-hidden flex items-center justify-center ${variantDimensions}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adsConfig.client}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
          {...(!isPersonalized ? { 'data-ad-non-personalized': 'true' } : {})}
        />
      </div>
    </aside>
  );
};
