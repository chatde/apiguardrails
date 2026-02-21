export default function Bumper({ size = 120, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Bumper mascot"
    >
      {/* Body - round guardrail shape */}
      <circle cx="60" cy="65" r="38" fill="#3b82f6" />
      <circle cx="60" cy="65" r="34" fill="#60a5fa" />
      <circle cx="60" cy="65" r="30" fill="#3b82f6" />

      {/* Hard hat */}
      <ellipse cx="60" cy="34" rx="22" ry="10" fill="#f59e0b" />
      <rect x="40" y="28" width="40" height="8" rx="4" fill="#f59e0b" />
      <rect x="48" y="22" width="24" height="10" rx="5" fill="#fbbf24" />
      <rect x="55" y="18" width="10" height="6" rx="3" fill="#f59e0b" />

      {/* Eyes */}
      <ellipse cx="48" cy="60" rx="7" ry="8" fill="white" />
      <ellipse cx="72" cy="60" rx="7" ry="8" fill="white" />
      <circle cx="50" cy="59" r="3.5" fill="#1e293b" />
      <circle cx="74" cy="59" r="3.5" fill="#1e293b" />
      {/* Eye highlights */}
      <circle cx="51.5" cy="57.5" r="1.5" fill="white" />
      <circle cx="75.5" cy="57.5" r="1.5" fill="white" />

      {/* Friendly smile */}
      <path
        d="M 48 74 Q 60 82 72 74"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Clipboard (right side) */}
      <rect x="88" y="50" width="16" height="22" rx="2" fill="#94a3b8" />
      <rect x="90" y="48" width="12" height="5" rx="1.5" fill="#64748b" />
      {/* Clipboard checkmarks */}
      <path d="M92 57 L94 59 L98 55" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M92 62 L94 64 L98 60" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M92 67 L94 69 L98 65" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Left arm holding clipboard */}
      <path
        d="M 90 65 Q 86 62 82 60"
        stroke="#2563eb"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Guardrail stripes on body */}
      <rect x="38" y="80" width="44" height="3" rx="1.5" fill="#fbbf24" opacity="0.6" />
      <rect x="42" y="86" width="36" height="3" rx="1.5" fill="#fbbf24" opacity="0.4" />

      {/* Cheek blush */}
      <ellipse cx="40" cy="70" rx="5" ry="3" fill="#93c5fd" opacity="0.5" />
      <ellipse cx="80" cy="70" rx="5" ry="3" fill="#93c5fd" opacity="0.5" />
    </svg>
  );
}
