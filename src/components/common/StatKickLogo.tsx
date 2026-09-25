import React, { useId } from 'react';

export interface StatKickLogoProps {
  /**
   * 'full': emblem + "StatKick" typography
   * 'icon': standalone soccer ball + dynamic 3D green swoosh emblem
   */
  variant?: 'full' | 'icon';
  /**
   * Predefined size:
   * 'sm': h-7 (footer / compact)
   * 'md': h-9 (standard navbar)
   * 'lg': h-12 (hero / prominent)
   * 'xl': h-16 (splash / 404)
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Optional custom class applied to the root container
   */
  className?: string;
  /**
   * Optional subtitle under "StatKick"
   */
  subtitle?: string;
  /**
   * Custom color override for the "Stat" text (defaults to 'text-gray-900')
   */
  statTextColor?: string;
}

export const StatKickLogo: React.FC<StatKickLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  subtitle,
  statTextColor = 'text-gray-900',
}) => {
  const uid = useId().replace(/:/g, '');

  const swooshGradId = `sk-swoosh-grad-${uid}`;
  const ballShadeId = `sk-ball-shade-${uid}`;
  const patchDarkId = `sk-patch-dark-${uid}`;
  const ballClipId = `sk-ball-clip-${uid}`;
  const swooshShadowId = `sk-swoosh-shadow-${uid}`;

  // Dimensions based on size
  const iconSizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }[size];

  const fullHeightClasses = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-11',
    xl: 'h-14',
  }[size];

  const textClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }[size];

  const emblemSvg = (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${iconSizeClasses} shrink-0 drop-shadow-xs`}
      aria-hidden="true"
    >
      <defs>
        {/* Dynamic 3D Green Swoosh Gradient */}
        <linearGradient id={swooshGradId} x1="10%" y1="85%" x2="90%" y2="15%">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="30%" stopColor="#16a34a" />
          <stop offset="70%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>

        {/* 3D Spherical Shading for Ball */}
        <radialGradient id={ballShadeId} cx="38%" cy="34%" r="62%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="65%" stopColor="#f8fafc" />
          <stop offset="85%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </radialGradient>

        {/* Dark Pentagon Facets Gradient */}
        <linearGradient id={patchDarkId} x1="25%" y1="20%" x2="75%" y2="80%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#090d16" />
        </linearGradient>

        {/* Inner Spherical Ball Clip */}
        <clipPath id={ballClipId}>
          <circle cx="50" cy="48" r="28" />
        </clipPath>

        {/* Drop Shadow for Swoosh */}
        <filter id={swooshShadowId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#15803d" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Ambient Ground Shadow */}
      <ellipse cx="50" cy="85" rx="24" ry="5" fill="#0f172a" fillOpacity="0.12" />

      {/* Ball Base Sphere */}
      <circle cx="50" cy="48" r="28" fill={`url(#${ballShadeId})`} stroke="#cbd5e1" strokeWidth="0.75" />

      {/* Clipped Football Panels & Seams */}
      <g clipPath={`url(#${ballClipId})`}>
        {/* Central Tilted Pentagon */}
        <polygon points="50,36 59,43 55,54 44,54 40,43" fill={`url(#${patchDarkId})`} />

        {/* Radiating Seam Stitch Lines */}
        <path
          d="M50,36 L50,23 M59,43 L72,36 M55,54 L66,66 M44,54 L33,66 M40,43 L27,36"
          stroke="#475569"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Surrounding Perimeter Patches */}
        <polygon points="43,21 57,21 61,10 39,10" fill={`url(#${patchDarkId})`} />
        <polygon points="72,36 79,47 89,43 84,28 73,25" fill={`url(#${patchDarkId})`} />
        <polygon points="66,66 60,77 72,84 80,73 75,61" fill={`url(#${patchDarkId})`} />
        <polygon points="33,66 39,77 27,84 19,73 24,61" fill={`url(#${patchDarkId})`} />
        <polygon points="27,36 20,47 10,43 15,28 26,25" fill={`url(#${patchDarkId})`} />

        {/* Interconnecting Hexagon Seams */}
        <path
          d="M43,21 L26,25 M57,21 L73,25 M79,47 L75,61 M60,77 L39,77 M20,47 L24,61"
          stroke="#64748b"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0.5,1"
        />

        {/* Spherical Ambient Highlight */}
        <ellipse
          cx="42"
          cy="35"
          rx="14"
          ry="9"
          transform="rotate(-25 42 35)"
          fill="#ffffff"
          fillOpacity="0.32"
        />
      </g>

      {/* Dynamic 3D Green Swoosh ribbon wrapping around ball */}
      <path
        d="M 22,46 C 17,60 22,76 36,83 C 50,91 68,89 79,79 C 87,71 89,59 87,47 C 86,43 82,39 79,42 C 77,44 78,49 78,54 C 77,65 69,75 59,79 C 47,83 34,79 29,69 C 25,61 26,51 30,43 C 31,40 27,39 25,41 Z"
        fill={`url(#${swooshGradId})`}
        filter={`url(#${swooshShadowId})`}
      />

      {/* Swoosh Highlight Ridge (Gloss reflection) */}
      <path
        d="M 24,48 C 20,60 24,74 37,81 C 49,88 66,87 77,77 C 84,69 86,59 85,49"
        stroke="#86efac"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Outer dynamic speed accent */}
      <path
        d="M 78,39 C 86,47 89,59 87,71 C 86,77 81,83 75,87"
        stroke={`url(#${swooshGradId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />
    </svg>
  );

  if (variant === 'icon') {
    return (
      <div
        className={`inline-flex items-center justify-center ${className}`}
        role="img"
        aria-label="StatKick Logo"
      >
        {emblemSvg}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2.5 ${fullHeightClasses} ${className}`}
      role="img"
      aria-label="StatKick Logo"
    >
      {emblemSvg}
      <div className="flex flex-col justify-center leading-none select-none">
        <span className={`font-extrabold tracking-tight ${textClasses} ${statTextColor} flex items-center`}>
          Stat<span className="text-green-600">Kick</span>
        </span>
        {subtitle && (
          <span className="text-[10px] font-medium text-gray-500 mt-0.5 hidden sm:inline tracking-normal">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
