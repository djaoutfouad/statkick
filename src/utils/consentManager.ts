import { adsConfig, isValidPublisherId } from '../config/ads';

export interface ConsentPreferences {
  /** Strictly necessary preferences and local browser calculators */
  essential: boolean;
  /** Anonymous analytics and performance */
  analytics: boolean;
  /** Third-party advertising cookies and display ads */
  advertising: boolean;
  /** Personalized targeting cookies */
  personalizedAds: boolean;
}

export type ConsentDecisionStatus = 'undecided' | 'accepted_all' | 'essential_only' | 'custom';

export interface ConsentState {
  hasConsented: boolean;
  status: ConsentDecisionStatus;
  timestamp: string | null;
  version: number;
  preferences: ConsentPreferences;
}

const STORAGE_KEY = 'statkick_consent_state_v2';
const LEGACY_STORAGE_KEY = 'statkick_cookie_consent';
const CONSENT_VERSION = 2;

const DEFAULT_PREFERENCES: ConsentPreferences = {
  essential: true,
  analytics: false,
  advertising: false,
  personalizedAds: false,
};

const LISTENERS = new Set<(state: ConsentState) => void>();

/**
 * Reads the current consent state from browser storage with fallback to legacy keys.
 */
export function getConsentState(): ConsentState {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return {
      hasConsented: false,
      status: 'undecided',
      timestamp: null,
      version: CONSENT_VERSION,
      preferences: { ...DEFAULT_PREFERENCES },
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return {
          hasConsented: Boolean(parsed.hasConsented),
          status: parsed.status || 'custom',
          timestamp: parsed.timestamp || new Date().toISOString(),
          version: parsed.version || CONSENT_VERSION,
          preferences: {
            essential: true, // Always true
            analytics: Boolean(parsed.preferences?.analytics),
            advertising: Boolean(parsed.preferences?.advertising),
            personalizedAds: Boolean(parsed.preferences?.personalizedAds),
          },
        };
      }
    }

    // Check legacy key for backward compatibility - never enable personalized ads from legacy keys
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy === 'accepted') {
      return {
        hasConsented: true,
        status: 'custom',
        timestamp: new Date().toISOString(),
        version: CONSENT_VERSION,
        preferences: {
          essential: true,
          analytics: true,
          advertising: true,
          personalizedAds: false, // Strictly false: personalized ads require explicit opt-in
        },
      };
    } else if (legacy === 'rejected') {
      return {
        hasConsented: true,
        status: 'essential_only',
        timestamp: new Date().toISOString(),
        version: CONSENT_VERSION,
        preferences: { ...DEFAULT_PREFERENCES },
      };
    }
  } catch {
    // Storage read failure fallback
  }

  return {
    hasConsented: false,
    status: 'undecided',
    timestamp: null,
    version: CONSENT_VERSION,
    preferences: { ...DEFAULT_PREFERENCES },
  };
}

/**
 * Persists the user's consent choice and dispatches update notifications.
 */
export function saveConsent(
  status: ConsentDecisionStatus,
  customPrefs?: Partial<ConsentPreferences>
): ConsentState {
  const now = new Date().toISOString();

  let preferences: ConsentPreferences;
  if (status === 'accepted_all') {
    preferences = {
      essential: true,
      analytics: true,
      advertising: true,
      personalizedAds: true,
    };
  } else if (status === 'essential_only') {
    preferences = {
      essential: true,
      analytics: false,
      advertising: false,
      personalizedAds: false,
    };
  } else {
    preferences = {
      essential: true,
      analytics: Boolean(customPrefs?.analytics),
      advertising: Boolean(customPrefs?.advertising),
      personalizedAds: Boolean(customPrefs?.personalizedAds && customPrefs?.advertising),
    };
  }

  const newState: ConsentState = {
    hasConsented: true,
    status,
    timestamp: now,
    version: CONSENT_VERSION,
    preferences,
  };

  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      localStorage.setItem(LEGACY_STORAGE_KEY, status === 'essential_only' ? 'rejected' : 'accepted');
    }
  } catch {
    // Ignore storage write errors
  }

  // Update Google Consent Mode if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    try {
      (window as any).gtag('consent', 'update', {
        analytics_storage: newState.preferences.analytics ? 'granted' : 'denied',
        ad_storage: newState.preferences.advertising ? 'granted' : 'denied',
        ad_user_data: newState.preferences.personalizedAds ? 'granted' : 'denied',
        ad_personalization: newState.preferences.personalizedAds ? 'granted' : 'denied',
      });
    } catch {
      // ignore
    }
  }

  // Notify active listeners
  LISTENERS.forEach((listener) => {
    try {
      listener(newState);
    } catch {
      // ignore listener errors
    }
  });

  return newState;
}

/**
 * Completely resets and revokes stored consent.
 */
export function revokeConsent(): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  } catch {
    // ignore
  }

  const resetState: ConsentState = {
    hasConsented: false,
    status: 'undecided',
    timestamp: null,
    version: CONSENT_VERSION,
    preferences: { ...DEFAULT_PREFERENCES },
  };

  LISTENERS.forEach((listener) => listener(resetState));
}

/**
 * Determines whether ads are permitted to display.
 * Requires:
 * 1. AdSense globally enabled in environment.
 * 2. Valid 16-digit publisher ID.
 * 3. Explicit user consent granting advertising cookies.
 */
export function canServeAds(): boolean {
  if (!adsConfig.enabled || !isValidPublisherId(adsConfig.client)) {
    return false;
  }
  const consent = getConsentState();
  return consent.hasConsented && consent.preferences.advertising;
}

/**
 * Determines whether personalized targeting is permitted.
 */
export function canServePersonalizedAds(): boolean {
  if (!canServeAds()) return false;
  const consent = getConsentState();
  return consent.preferences.personalizedAds;
}

/**
 * Dispatches an event to trigger the detailed Consent Preferences modal from anywhere (e.g. footer link).
 */
export function openConsentPreferencesModal(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('statkick_open_consent_modal'));
  }
}

/**
 * Subscribes to changes in user consent.
 */
export function subscribeConsentChange(callback: (state: ConsentState) => void): () => void {
  LISTENERS.add(callback);
  return () => {
    LISTENERS.delete(callback);
  };
}
