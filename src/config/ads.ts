export interface AdSenseConfig {
  enabled: boolean;
  client: string;
  slots: {
    slot1Header: string;
    slot2MidContent: string;
    slot3PostCalculator: string;
    slot4Footer: string;
  };
}

/**
 * Validates whether a given Google AdSense publisher ID adheres strictly to the official format:
 * "ca-pub-XXXXXXXXXXXXXXXX" (where X is a 16-digit integer).
 * Automatically rejects empty strings, placeholder masks, and dummy zeros.
 */
export function isValidPublisherId(client: string | undefined | null): boolean {
  if (!client || typeof client !== 'string') return false;
  const trimmed = client.trim();
  if (!/^ca-pub-\d{16}$/.test(trimmed)) return false;
  // Reject all-zero dummy ID
  if (trimmed === 'ca-pub-0000000000000000') return false;
  return true;
}

/**
 * Validates whether a given AdSense ad unit slot ID is a genuine 8 to 12 digit numeric ID.
 */
export function isValidSlotId(slot: string | undefined | null): boolean {
  if (!slot || typeof slot !== 'string') return false;
  const trimmed = slot.trim();
  if (!/^\d{8,12}$/.test(trimmed)) return false;
  if (/^0+$/.test(trimmed)) return false;
  return true;
}

const envEnabled =
  import.meta.env.VITE_ADSENSE_ENABLED === 'true' ||
  import.meta.env.VITE_ENABLE_ADS === 'true';

const envClient = (
  import.meta.env.VITE_ADSENSE_CLIENT ||
  import.meta.env.VITE_ADSENSE_CLIENT_ID ||
  ''
).trim();

export const adsConfig: AdSenseConfig = {
  // Disabled by default. Enabled ONLY if explicitly flagged in environment AND publisher ID is valid.
  enabled: envEnabled && isValidPublisherId(envClient),
  client: envClient,
  slots: {
    slot1Header: (import.meta.env.VITE_ADSENSE_SLOT_HEADER || '').trim(),
    slot2MidContent: (import.meta.env.VITE_ADSENSE_SLOT_CONTENT || '').trim(),
    slot3PostCalculator: (import.meta.env.VITE_ADSENSE_SLOT_CALCULATOR || '').trim(),
    slot4Footer: (import.meta.env.VITE_ADSENSE_SLOT_FOOTER || '').trim(),
  },
};

/**
 * Comprehensive check whether AdSense is globally active and authorized to render.
 */
export function isAdSenseGloballyActive(): boolean {
  return adsConfig.enabled && isValidPublisherId(adsConfig.client);
}

