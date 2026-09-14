import React from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  valueDisplay?: string;
  color?: string; // tailwind bg color
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  valueDisplay,
  color = 'bg-green-600',
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {(label || valueDisplay) && (
        <div className="flex justify-between items-center text-xs font-semibold mb-1">
          {label && <span className="text-gray-700">{label}</span>}
          <span className="text-gray-600 font-mono">
            {valueDisplay !== undefined ? valueDisplay : `${Math.round(percentage)}%`}
          </span>
        </div>
      )}
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
