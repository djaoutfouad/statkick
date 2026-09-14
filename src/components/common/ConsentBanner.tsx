import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X, Check, Settings2, ShieldCheck, Info } from 'lucide-react';
import {
  getConsentState,
  saveConsent,
  subscribeConsentChange,
  ConsentPreferences,
  ConsentDecisionStatus,
} from '../../utils/consentManager';

export const ConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customPrefs, setCustomPrefs] = useState<ConsentPreferences>({
    essential: true,
    analytics: false,
    advertising: false,
    personalizedAds: false,
  });

  useEffect(() => {
    const consent = getConsentState();
    if (!consent.hasConsented) {
      // Delay slightly for smooth entering animation
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setCustomPrefs(consent.preferences);
    }
  }, []);

  // Listen for custom trigger to reopen consent modal (e.g. from footer)
  useEffect(() => {
    const handleOpenModal = () => {
      const current = getConsentState();
      setCustomPrefs(current.preferences);
      setIsModalOpen(true);
    };

    window.addEventListener('statkick_open_consent_modal', handleOpenModal);
    const unsubscribe = subscribeConsentChange((state) => {
      setCustomPrefs(state.preferences);
    });

    return () => {
      window.removeEventListener('statkick_open_consent_modal', handleOpenModal);
      unsubscribe();
    };
  }, []);

  const handleAcceptAll = useCallback(() => {
    saveConsent('accepted_all');
    setIsVisible(false);
    setIsModalOpen(false);
  }, []);

  const handleEssentialOnly = useCallback(() => {
    saveConsent('essential_only');
    setIsVisible(false);
    setIsModalOpen(false);
  }, []);

  const handleSaveCustom = useCallback(() => {
    const status: ConsentDecisionStatus =
      customPrefs.analytics && customPrefs.advertising && customPrefs.personalizedAds
        ? 'accepted_all'
        : !customPrefs.analytics && !customPrefs.advertising
        ? 'essential_only'
        : 'custom';

    saveConsent(status, customPrefs);
    setIsVisible(false);
    setIsModalOpen(false);
  }, [customPrefs]);

  return (
    <>
      {/* Bottom Floating Consent Notice */}
      {isVisible && !isModalOpen && (
        <aside
          id="statkick-consent-banner"
          aria-label="Consent and Privacy Management"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 shadow-2xl animate-in slide-in-from-bottom-5 duration-300"
          role="region"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-green-50 text-green-600 shrink-0 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Privacy & Cookie Preferences
                </h3>
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className="text-gray-400 hover:text-gray-600 p-1"
                  aria-label="Decline non-essential cookies"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                StatKick processes all 21 football calculators locally inside your browser. We use essential storage for your chosen language and consent settings. Non-essential cookies for analytics and advertising are only loaded with your explicit permission. Review our{' '}
                <Link to="/privacy" className="text-green-600 underline font-medium hover:text-green-700">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link to="/cookies" className="text-green-600 underline font-medium hover:text-green-700">
                  Cookie Policy
                </Link>
                .
              </p>

              <div className="pt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Essential Only
                </button>
              </div>

              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 hover:text-green-600 transition-colors"
                >
                  <Settings2 className="w-3 h-3" />
                  Customize Settings
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Detailed Granular Consent Settings Modal */}
      {isModalOpen && (
        <div
          id="statkick-consent-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="consent-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-green-50 text-green-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 id="consent-modal-title" className="text-base sm:text-lg font-bold text-gray-900">
                    Consent Preferences Manager
                  </h2>
                  <p className="text-xs text-gray-500">
                    Granular privacy controls conforming to GDPR & Google Publisher Standards
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
                aria-label="Close preferences modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Granular Categories */}
            <div className="py-4 space-y-4 text-xs sm:text-sm text-gray-700">
              {/* Category 1: Essential */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">Essential Preferences & Tools</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-200 text-gray-700">
                      Always Active
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Required for regional language selection, security, and local client-side calculators. No personal scouting inputs or match statistics leave your device.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  aria-label="Essential storage (always active)"
                  className="mt-1 w-4 h-4 text-green-600 rounded border-gray-300 cursor-not-allowed opacity-75"
                />
              </div>

              {/* Category 2: Analytics */}
              <div className="p-4 rounded-xl bg-white border border-gray-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-bold text-gray-900">Anonymous Usage Analytics</span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Allows us to aggregate page view statistics and technical performance to optimize calculator responsiveness without identifying individual visitors.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="consent-analytics"
                  checked={customPrefs.analytics}
                  onChange={(e) =>
                    setCustomPrefs((prev) => ({ ...prev, analytics: e.target.checked }))
                  }
                  className="mt-1 w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer"
                />
              </div>

              {/* Category 3: Contextual & Display Ads */}
              <div className="p-4 rounded-xl bg-white border border-gray-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-bold text-gray-900">Display Advertising (AdSense)</span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Allows non-intrusive banner advertising to support independent research and keep all 21 football analytics tools 100% free and open.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="consent-advertising"
                  checked={customPrefs.advertising}
                  onChange={(e) =>
                    setCustomPrefs((prev) => ({
                      ...prev,
                      advertising: e.target.checked,
                      personalizedAds: e.target.checked ? prev.personalizedAds : false,
                    }))
                  }
                  className="mt-1 w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer"
                />
              </div>

              {/* Category 4: Personalized Targeting */}
              <div className="p-4 rounded-xl bg-white border border-gray-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-bold text-gray-900">Personalized Ad Personalization</span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Allows Google AdSense partners to personalize advertising based on cross-site interest profiles. If unchecked, only non-personalized contextual ads are served.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="consent-personalized"
                  disabled={!customPrefs.advertising}
                  checked={customPrefs.personalizedAds && customPrefs.advertising}
                  onChange={(e) =>
                    setCustomPrefs((prev) => ({ ...prev, personalizedAds: e.target.checked }))
                  }
                  className="mt-1 w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer disabled:opacity-40"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center gap-2 text-xs text-blue-800 mb-5">
              <Info className="w-4 h-4 shrink-0 text-blue-600" />
              <span>
                You can change or revoke these choices at any time via the "Manage Consent" link in the footer.
              </span>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button
                type="button"
                onClick={handleEssentialOnly}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-4 py-2 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-colors shadow-xs"
              >
                Save My Preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-2 text-xs font-semibold text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
