import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { ShieldCheck, Lock, Eye, Server, RefreshCw, Sliders } from 'lucide-react';
import { openConsentPreferencesModal } from '../utils/consentManager';
import { siteConfig } from '../config/site';

export const PrivacyPage: React.FC = () => {
  const seoData = {
    title: 'Privacy Policy | StatKick',
    description: 'Privacy disclosures for StatKick: local client-side computations, cookie usage, Google AdSense compliance, and transparency policies.',
    canonicalPath: '/privacy',
  };

  return (
    <div className="w-full pb-8">
      <SEOHead {...seoData} />
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <header className="my-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          Legal & Compliance
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-gray-500">
          Last Updated & Reviewed: March 2026 • Governing StatKick Independent Analytics
        </p>
      </header>

      {/* Editorial Privacy Documentation */}
      <article className="prose max-w-none text-xs sm:text-sm text-gray-700 space-y-6 leading-relaxed">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 space-y-4 shadow-2xs">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-green-600" />
            1. Introduction & Core Privacy Principles
          </h2>
          <p>
            At StatKick (accessible via <code>{siteConfig.url}</code>), we believe in fundamental data privacy, algorithmic transparency, and minimal data collection. This Privacy Policy details the types of information handled when you visit our website and use our 21 football statistical calculators.
          </p>
          <p>
            Our core architecture is built around <strong>local client-side computation</strong>. When you input match statistics, player ratings, contract variables, or fantasy metrics into our calculators, all processing happens entirely within your web browser. StatKick does not transmit, store, or profile your calculator inputs on remote backend databases or servers.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 space-y-4 shadow-2xs">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Server className="w-4 h-4 text-green-600" />
            2. Information We Do and Do Not Collect
          </h2>
          <h3 className="text-sm font-bold text-gray-900 mt-2">
            A. Information We Do NOT Collect:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
            <li>We do not require user account registration, passwords, or personal profiles.</li>
            <li>We do not collect or store credit card or payment information.</li>
            <li>We do not log, persist, or associate your football match statistics, simulated formations, or valuations with personal identities or IP addresses. All 21 calculators run 100% locally in your browser.</li>
          </ul>

          <h3 className="text-sm font-bold text-gray-900 mt-3">
            B. Client-Side Local Storage:
          </h3>
          <p>
            To provide a seamless browsing experience, we store benign preferences directly in your browser’s <code>localStorage</code>:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
            <li><code>statkick-language</code>: Your selected regional display language code.</li>
            <li><code>statkick_cookie_consent</code>: Your local privacy consent preference.</li>
          </ul>

          <h3 className="text-sm font-bold text-gray-900 mt-3">
            C. Contact Inquiries & Third-Party Relay (EmailJS):
          </h3>
          <p>
            When you submit a message through our Contact form, the provided details (your name, email address, topic category, and message content) are transmitted securely via our external email service provider (<strong>EmailJS</strong>, emailjs.com) to our official inbox at <code>contact.statkick@gmail.com</code> solely to respond to your inquiry. We do not sell, rent, or share contact details with advertisers or data brokers.
          </p>

          <h3 className="text-sm font-bold text-gray-900 mt-3">
            D. Direct Contact & Data Deletion Requests:
          </h3>
          <p>
            The site owner and editorial team can be reached directly via <code>contact.statkick@gmail.com</code>. If you have previously submitted an inquiry through our contact form and would like your email correspondence and records purged, simply email us at <code>contact.statkick@gmail.com</code> with the subject <em>"Data Deletion Request"</em>, and all associated messages will be permanently deleted from our support inbox within 30 days.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 space-y-4 shadow-2xs">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Eye className="w-4 h-4 text-green-600" />
            3. Third-Party Advertising & Google AdSense Disclosures
          </h2>
          <p>
            StatKick uses or prepares to use Google AdSense and third-party advertising vendors to display non-intrusive advertisements across designated placements. These third parties may use cookies and web beacons to serve advertisements based on prior visits to this website or other websites on the Internet.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 pl-2">
            <li>
              <strong>Google DoubleClick Cookie:</strong> Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to StatKick and/or other sites on the Internet.
            </li>
            <li>
              <strong>Personalized Advertising Opt-Out:</strong> Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">Google Ads Settings</a> or through the <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">AboutAds.info Choices page</a>.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 space-y-4 shadow-2xs">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-green-600" />
            4. Consent Management & Regulatory Disclosures
          </h2>
          <p>
            In alignment with privacy principles and regulations, users are provided with a local consent control interface regarding non-essential preferences and cookies. You can manage or revoke your consent preferences at any time.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={openConsentPreferencesModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-colors shadow-xs"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Review or Update Cookie Consent</span>
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            For further privacy questions, reach out via our <a href="/contact" className="text-green-600 underline">Contact page</a>.
          </p>
        </div>
      </article>
    </div>
  );
};
