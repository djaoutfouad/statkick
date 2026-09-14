import React from 'react';

interface ResultCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: {
    text: string;
    color?: string; // Tailwind class
  };
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'neutral';
  children?: React.ReactNode;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  title,
  value,
  subtitle,
  badge,
  icon,
  variant = 'neutral',
  children,
}) => {
  const variantStyles = {
    primary: 'border-green-200  bg-green-50/40 ',
    secondary: 'border-blue-200  bg-blue-50/40 ',
    neutral: 'border-gray-200  bg-gray-50/50 ',
  };

  return (
    <div
      className={`rounded-2xl border p-5 transition-all shadow-2xs ${variantStyles[variant]}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-gray-500">{icon}</span>}
          <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            {title}
          </h4>
        </div>
        {badge && (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              badge.color || 'bg-green-100  text-green-800 '
            }`}
          >
            {badge.text}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          {value}
        </span>
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-gray-600 leading-normal">
          {subtitle}
        </p>
      )}

      {children && <div className="mt-4 pt-4 border-t border-gray-200/60">{children}</div>}
    </div>
  );
};
