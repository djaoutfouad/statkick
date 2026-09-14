import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (value: any) => void;
  options: SelectOption[];
  helperText?: string;
  disabled?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  helperText,
  disabled = false,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={id} className="block text-xs font-semibold text-gray-700">
          {label}
        </label>
        {helperText && (
          <span className="text-[11px] text-gray-600">
            {helperText}
          </span>
        )}
      </div>
      <div className="relative rounded-lg shadow-2xs">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm text-gray-900 transition-colors focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
