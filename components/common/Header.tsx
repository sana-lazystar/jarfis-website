import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';
import MobileNav from './MobileNav';

interface HeaderProps {
  locale: string;
}

export default async function Header({ locale }: HeaderProps) {
  const t = await getTranslations('nav');
  const tA11y = await getTranslations('a11y');
  const tCommon = await getTranslations('common');

  const navLinks = [
    { href: `/${locale}/features/`, label: t('features') },
    { href: `/${locale}/docs/`, label: t('docs') },
    { href: `/${locale}/blog/`, label: t('blog') },
    { href: `/${locale}/showcase/`, label: t('showcase') },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Logo locale={locale} />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex" role="list">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              role="listitem"
              className="px-3 py-1.5 font-mono text-sm text-zinc-400 hover:text-zinc-100 transition-colors rounded hover:bg-zinc-800"
            >
              {i > 0 && <span className="mr-2 text-zinc-700">|</span>}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: Language + GitHub */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSelector currentLocale={locale} />
          <a
            href="https://github.com/sana-lazystar/jarfis"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 font-mono text-sm text-zinc-400 border border-zinc-700 rounded hover:border-green-500 hover:text-green-500 transition-colors"
            aria-label={tA11y('view_github')}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="hidden lg:inline">{tCommon('github')}</span>
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <MobileNav locale={locale} navLinks={navLinks} />
      </nav>
    </header>
  );
}
