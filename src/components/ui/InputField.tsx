import React, { useState, useEffect } from 'react';
import { normalizeDecimalInput, normalizeNumerals } from '../../utils/formatters';

export interface InputFieldProps {
  id: string;
  label: string;
  type?: 'number' | 'text';
  value: number | string;
  onChange: (value: any) => void;
  min?: number;
  max?: number;
  step?: number | string;
  suffix?: string;
  prefix?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  allowNegative?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = 'number',
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  prefix,
  helperText,
  error,
  required = false,
  placeholder,
  disabled = false,
  inputMode,
  allowNegative = false,
  onBlur,
}) => {
  // Determine whether this field is numeric
  const isNumeric = type === 'number' || (type !== 'text' && (min !== undefined || max !== undefined || step !== undefined || typeof value === 'number'));

  // Determine if decimals are allowed based on step or inputMode
  const isDecimal = Boolean(
    inputMode === 'decimal' ||
    step === 'any' ||
    (typeof step === 'number' && step < 1) ||
    (typeof step === 'string' && (step.includes('.') || step === 'any')) ||
    (typeof value === 'number' && !Number.isInteger(value))
  );

  const supportsNegative = Boolean(allowNegative || (min !== undefined && min < 0));

  // Resolved inputMode for mobile virtual keyboards
  const calculatedInputMode = inputMode || (isNumeric ? (isDecimal ? 'decimal' : 'numeric') : 'text');

  // Convert incoming value to ASCII string
  const formatIncomingValue = (val: number | string | null | undefined): string => {
    if (val === null || val === undefined || val === '') return '';
    if (!isNumeric) return String(val);
    return normalizeDecimalInput(String(val), isDecimal, supportsNegative);
  };

  const [displayValue, setDisplayValue] = useState<string>(() => formatIncomingValue(value));

  // Synchronize incoming value when changed externally (presets, reset buttons, URL params)
  useEffect(() => {
    if (!isNumeric) {
      if (value !== displayValue) {
        setDisplayValue(value === null || value === undefined ? '' : String(value));
      }
      return;
    }

    if (value === '' || value === null || value === undefined) {
      if (displayValue !== '') {
        setDisplayValue('');
      }
      return;
    }

    // Check if numeric values match (e.g. '12.' vs 12, or '' vs 0 while editing)
    const incomingNum = Number(value);
    const currentNum = displayValue === '' ? 0 : Number(displayValue);

    // If numerical value differs (e.g. preset clicked), update display
    if (isNaN(incomingNum) || incomingNum !== currentNum) {
      setDisplayValue(formatIncomingValue(value));
    }
  }, [value, isNumeric, isDecimal, supportsNegative]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (!isNumeric) {
      setDisplayValue(raw);
      onChange(raw);
      return;
    }

    // Normalize Eastern Arabic and Persian numerals, commas, and dots in real time
    let cleaned = normalizeDecimalInput(raw, isDecimal, supportsNegative);

    // Empty input: allow temporarily so user can backspace/edit freely without 0 snapping
    if (cleaned === '') {
      setDisplayValue('');
      onChange('');
      return;
    }

    // Single minus sign while user starts entering a negative number
    if (cleaned === '-' && supportsNegative) {
      setDisplayValue('-');
      onChange('-');
      return;
    }

    // Trailing decimal point while user is typing a fraction (e.g., '12.')
    if (isDecimal && cleaned.endsWith('.')) {
      setDisplayValue(cleaned);
      onChange(cleaned);
      return;
    }

    // Validate max constraint on the fly if positive
    const numericVal = parseFloat(cleaned);
    if (!isNaN(numericVal) && max !== undefined && numericVal > max) {
      cleaned = String(max);
    }

    setDisplayValue(cleaned);

    const parsed = parseFloat(cleaned);
    if (isNaN(parsed)) {
      onChange('');
    } else {
      onChange(parsed);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isNumeric && displayValue !== '') {
      let num = parseFloat(displayValue);
      if (!isNaN(num)) {
        if (min !== undefined && num < min) {
          num = min;
          const clampedStr = String(num);
          setDisplayValue(clampedStr);
          onChange(num);
        } else if (max !== undefined && num > max) {
          num = max;
          const clampedStr = String(num);
          setDisplayValue(clampedStr);
          onChange(num);
        } else if (displayValue.endsWith('.')) {
          setDisplayValue(String(num));
          onChange(num);
        }
      }
    }

    if (onBlur) {
      onBlur(e);
    }
  };

  const describedBy = [
    error ? `${id}-error` : null,
    helperText ? `${id}-helper` : null,
  ].filter(Boolean).join(' ') || undefined;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={id} className="block text-xs font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {helperText && (
          <span id={`${id}-helper`} className="text-[11px] text-gray-600">
            {helperText}
          </span>
        )}
      </div>

      <div className="relative rounded-lg shadow-2xs">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-xs text-gray-600 font-medium">{prefix}</span>
          </div>
        )}

        <input
          id={id}
          type="text"
          inputMode={calculatedInputMode}
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          required={required}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className={`block w-full rounded-lg border py-2 text-sm text-gray-900 bg-white transition-colors focus:outline-none focus:ring-2 ${
            prefix ? 'pl-8' : 'pl-3.5'
          } ${suffix ? 'pr-10' : 'pr-3.5'} ${
            error
              ? 'border-red-500 bg-red-50/10 focus:border-red-500 focus:ring-red-500/20'
              : 'border-gray-300 focus:border-green-600 focus:ring-green-500/20'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={label}
          aria-invalid={!!error}
          aria-describedby={describedBy}
        />

        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-xs text-gray-600 font-medium">{suffix}</span>
          </div>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600 mt-1 font-medium">
          {error}
        </p>
      )}
    </div>
  );
};
