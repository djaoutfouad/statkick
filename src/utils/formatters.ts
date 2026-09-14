/**
 * Standardized numerical formatters and input normalizers for StatKick.
 * All formatting strictly adheres to standard ASCII English numbers (0-9) via Intl.NumberFormat('en-US').
 * Eastern Arabic (٠-٩) and Persian (۰-۹) digits are always converted to ASCII 0-9.
 */

const EN_US_INTEGER_FORMATTER = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
  useGrouping: true,
});

const ARABIC_INDIC_DIGITS = /[\u0660-\u0669]/g;
const EASTERN_ARABIC_INDIC_DIGITS = /[\u06F0-\u06F9]/g;

/**
 * Normalizes any Eastern Arabic (٠-٩) or Persian/Urdu (۰-۹) digits into standard ASCII digits (0-9).
 */
export function normalizeNumerals(input: string | number | null | undefined): string {
  if (input === null || input === undefined) return '';
  const str = typeof input === 'string' ? input : String(input);
  return str
    .replace(ARABIC_INDIC_DIGITS, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(EASTERN_ARABIC_INDIC_DIGITS, (d) => String(d.charCodeAt(0) - 0x06F0));
}

/**
 * Normalizes user typed string into a clean numeric string with standard ASCII digits and standard dot separator.
 * Converts Eastern Arabic (٠-٩) and Persian (۰-۹) numerals, Arabic comma (،), Persian decimal (٫), and standard comma (,) to dot.
 * Ensures only digits, at most one decimal point, and optional leading minus are preserved.
 */
export function normalizeDecimalInput(
  input: string | number | null | undefined,
  allowDecimal: boolean = true,
  allowNegative: boolean = false
): string {
  if (input === null || input === undefined) return '';
  let normalized = normalizeNumerals(input).trim();

  // Replace Arabic comma (،), Persian decimal (٫), or comma with standard dot
  normalized = normalized.replace(/[\u060C\u066B,]/g, allowDecimal ? '.' : '');

  let result = '';
  let hasDot = false;
  let hasMinus = false;

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];
    if (char === '-' && allowNegative && result.length === 0 && !hasMinus) {
      result += '-';
      hasMinus = true;
    } else if (char === '.' && allowDecimal && !hasDot) {
      result += '.';
      hasDot = true;
    } else if (char >= '0' && char <= '9') {
      result += char;
    }
  }

  return result;
}

/**
 * Formats an integer value with comma thousands separators in standard ASCII digits.
 */
export function formatInteger(value: number): string {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) return '0';
  return EN_US_INTEGER_FORMATTER.format(Math.round(value));
}

/**
 * Formats a generic decimal number using standard ASCII digits.
 */
export function formatDecimal(value: number, decimals: number = 1): string {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) return '0';
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: true,
  });
  return formatter.format(value);
}

/**
 * Formats a percentage with specified decimal places using standard ASCII digits.
 */
export function formatPercent(value: number, decimals: number = 1): string {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) return '0.0%';
  return `${formatDecimal(value, decimals)}%`;
}

/**
 * Standard number formatter for backward compatibility with customizable decimal precision.
 */
export function formatNumber(value: number, decimals: number = 1): string {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) return '0';
  if (decimals === 0) {
    return formatInteger(value);
  }
  return formatDecimal(value, decimals);
}

/**
 * Formats currency values in millions (€M / $M / £M).
 */
export function formatCurrencyM(valueInMillions: number, symbol: string = '€'): string {
  if (typeof valueInMillions !== 'number' || isNaN(valueInMillions) || !isFinite(valueInMillions)) {
    return `${symbol}0.0M`;
  }
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });
  if (valueInMillions >= 1000) {
    return `${symbol}${formatter.format(valueInMillions / 1000)}B`;
  }
  return `${symbol}${formatter.format(valueInMillions)}M`;
}

/**
 * Formats currency values in thousands (€K).
 */
export function formatCurrencyK(valueInThousands: number, symbol: string = '€'): string {
  if (typeof valueInThousands !== 'number' || isNaN(valueInThousands) || !isFinite(valueInThousands)) {
    return `${symbol}0`;
  }
  return `${symbol}${formatInteger(valueInThousands)}`;
}

/**
 * Formats exact currency values with thousands separators.
 */
export function formatCurrencyExact(value: number, symbol: string = '€'): string {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) return `${symbol}0`;
  return `${symbol}${formatInteger(value)}`;
}

/**
 * Clamps a number between a lower and upper bound.
 */
export function clamp(value: number, min: number, max: number): number {
  if (isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

/**
 * Safely divides two numbers, preventing division by zero, NaN, and Infinity.
 */
export function safeDivide(numerator: number, denominator: number, fallback: number = 0): number {
  if (!denominator || denominator === 0 || isNaN(denominator) || isNaN(numerator)) {
    return fallback;
  }
  const res = numerator / denominator;
  return isFinite(res) ? res : fallback;
}

/**
 * Sanitizes arbitrary numeric input from form fields, handling string normalization and clamping.
 */
export function sanitizeNumericInput(
  rawInput: unknown,
  defaultValue: number = 0,
  min: number = 0,
  max: number = Number.MAX_SAFE_INTEGER
): number {
  if (rawInput === null || rawInput === undefined || rawInput === '') {
    return defaultValue;
  }
  if (typeof rawInput === 'number') {
    if (isNaN(rawInput) || !isFinite(rawInput)) return defaultValue;
    return clamp(rawInput, min, max);
  }
  if (typeof rawInput === 'string') {
    const cleaned = normalizeDecimalInput(rawInput, true, true);
    if (cleaned === '' || cleaned === '-') return defaultValue;
    const parsed = parseFloat(cleaned);
    if (isNaN(parsed) || !isFinite(parsed)) return defaultValue;
    return clamp(parsed, min, max);
  }
  return defaultValue;
}

