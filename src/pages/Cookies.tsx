import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { Cookie, Settings, ShieldCheck, ToggleRight, CheckSquare, Sliders } from 'lucide-react';
import { openConsentPreferencesModal } from '../utils/consentManager';

export const CookiesPage: React.FC = () => {
  const seoData = {
    title: 'Cookie & Consent Policy | StatKick',
    description: 'Detailed information regarding cookie usage, local browser storage, and advertising consent controls on StatKick.',
    canonicalPath: '/cookies',
  };

  return (
    <div className="w-full pb-8">
      <SEOHead {...seoData} />
      <Breadcrumbs items={[{ label: 'Cookie & Consent Policy' }]} />

      <header className="my-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 mb-3">
          <Cookie className="w-3.5 h-3.5" />
          Consent Disclosures
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          Cookie & Consent Policy
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-gray-500">
          Last Updated: February 2026 • StatKick Independent Football Analytics
        </p>
      </header>

      {/* Editorial Cookie Policy Content */}
      <article className="prose max-w-none text-xs sm:text-sm text-gray-700 space-y-6 leading-relaxed">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 space-y-4 shadow-2xs">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-green-600" />
            1. What Are Cookies and Local Storage?
          </h2>
          <p>
            Cookies are small text files placed on your device by websites you visit. Similar technologies like HTML5 Local Storage allow web applications to store preference keys directly in your client browser. StatKick employs these technologies minimally to ensure site functionality and support advertising operations.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 space-y-4 shadow-2xs">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <ToggleRight className="w-4 h-4 text-green-600" />
            2. Categories of Storage Used on StatKick
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                A. Essential & Preference Storage (Local Only)
              </h3>
              <p className="text-xs text-gray-600">
                These keys store your chosen language code selector value and cookie consent status. They never contain identifiable personal information and do not track you across other websites.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                B. Advertising & Measurement Cookies (Third-Party)
              </h3>
              <p className="text-xs text-gray-600">
                When Google AdSense is active, third-party advertising cookies may be placed to serve non-fraudulent, relevant advertisements and prevent ad fatigue. These are governed by Google’s published advertising policies.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 space-y-4 shadow-2xs">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Settings className="w-4 h-4 text-green-600" />
            3. How to Manage and Disable Cookies
          </h2>
          <p>
            You have the right to decide whether to accept or reject advertising cookies. You can exercise your preferences through our on-site consent prompt or configure your web browser settings directly.
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
            <li><strong>Chrome:</strong> Settings → Privacy & Security → Third-party cookies</li>
            <li><strong>Firefox:</strong> Options → Privacy & Security → Enhanced Tracking Protection</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Block all cookies</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-2xs space-y-4">
          <ShieldCheck className="w-8 h-8 text-green-600 mx-auto" />
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              Transparent Consent Controls
            </h3>
            <p className="text-xs text-gray-600 max-w-md mx-auto">
              Our local consent framework gives users immediate control over analytics and advertising preference storage. You can review or revoke your choices at any moment.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={openConsentPreferencesModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors shadow-xs"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Open Cookie & Consent Preferences</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};
