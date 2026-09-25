import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, Sliders } from 'lucide-react';
import { StatKickLogo } from './StatKickLogo';
import { siteConfig } from '../../config/site';
import { useLanguage } from '../../hooks/useLanguage';
import { openConsentPreferencesModal } from '../../utils/consentManager';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 text-gray-600 text-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="inline-block hover:opacity-95 transition-opacity" aria-label="StatKick Homepage">
              <StatKickLogo variant="full" size="sm" />
            </Link>
            <p className="text-xs text-gray-600 max-w-md leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 pt-1">
              <span className="inline-flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-green-600" />
                {t.footer.clientSideNotice}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                {t.footer.privacyNotice}
              </span>
            </div>
          </div>

          {/* Core Navigation & Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
              {t.footer.resources}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-green-600 transition-colors">
                  {t.nav.allTools}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-green-600 transition-colors">
                  {t.nav.blog}
                </Link>
              </li>
              <li>
                <Link to="/guides" className="hover:text-green-600 transition-colors">
                  {t.nav.guides}
                </Link>
              </li>
              <li>
                <Link to="/methodology" className="hover:text-green-600 transition-colors">
                  {t.nav.methodology}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-green-600 transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-green-600 transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Disclosures */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
              {t.footer.legal}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/privacy" className="hover:text-green-600 transition-colors">
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-green-600 transition-colors">
                  {t.footer.termsOfUse}
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-green-600 transition-colors">
                  {t.footer.cookiePolicy}
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-green-600 transition-colors">
                  {t.footer.disclaimer}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openConsentPreferencesModal}
                  className="hover:text-green-600 transition-colors text-left flex items-center gap-1 text-gray-500 hover:underline cursor-pointer"
                >
                  <Sliders className="w-3 h-3 text-green-600 shrink-0" />
                  <span>Manage Cookie Consent</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {siteConfig.year} StatKick. {t.footer.allRightsReserved}</p>
          <p className="text-center sm:text-right">
            Independent analytics suite designed for serious football fans, researchers, and managers.
          </p>
        </div>
      </div>
    </footer>
  );
};
