import Link from 'next/link';

interface LogoProps {
  locale: string;
  className?: string;
}

export default function Logo({ locale, className = '' }: LogoProps) {
  return (
    <Link
      href={`/${locale}/`}
      className={`flex items-center gap-2.5 no-underline ${className}`}
      aria-label="JARFIS Home"
    >
      {/* Teal gradient circle with "/" mark — breathe animation */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        width="30"
        height="30"
        aria-hidden="true"
        style={{ animation: 'breathe 4s ease-in-out infinite', willChange: 'transform', transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <defs>
          <radialGradient id="logoGradient" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#0D9488" />
          </radialGradient>
        </defs>
        <circle cx="15" cy="15" r="14" fill="url(#logoGradient)" />
        <text
          x="15"
          y="20"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="700"
          fontSize="13"
          fill="white"
          opacity="0.95"
        >
          /
        </text>
      </svg>

      {/* JARFIS text */}
      <span
        style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.05em', color: 'var(--color-text-primary)' }}
      >
        JARFIS
      </span>
    </Link>
  );
}
