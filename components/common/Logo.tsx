import Link from 'next/link';

interface LogoProps {
  locale: string;
  className?: string;
}

export default function Logo({ locale, className = '' }: LogoProps) {
  return (
    <Link
      href={`/${locale}/`}
      className={`font-mono text-xl font-bold tracking-tight text-green-500 hover:text-green-400 transition-colors ${className}`}
      aria-label="JARFIS Home"
    >
      <span className="text-zinc-500">$ </span>
      <span>jarfis</span>
    </Link>
  );
}
