import Link from 'next/link';

function JarfisSymbol({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="1" y="1" width="30" height="30" rx="6" fill="#09090B" />
      <path
        d="M12 8L21 8"
        stroke="#22C55E"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M16.5 8L16.5 21C16.5 23.5 14.5 25 12 25C10 25 9 24 9 24"
        stroke="#22C55E"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="24" cy="24" r="3" fill="#8B5CF6" />
    </svg>
  );
}

interface LogoProps {
  locale: string;
  className?: string;
}

export default function Logo({ locale, className = '' }: LogoProps) {
  return (
    <Link
      href={`/${locale}/`}
      className={`flex items-center gap-2 font-mono text-xl font-bold tracking-tight text-green-500 hover:text-green-400 transition-colors ${className}`}
      aria-label="JARFIS Home"
    >
      <JarfisSymbol className="w-7 h-7" />
      <span>jarfis</span>
    </Link>
  );
}
