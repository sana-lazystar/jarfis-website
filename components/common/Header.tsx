import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';
import MobileNav from './MobileNav';
import GitHubIcon from '@/components/icons/GitHubIcon';

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
            <GitHubIcon />
            <span className="hidden lg:inline">{tCommon('github')}</span>
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <MobileNav locale={locale} navLinks={navLinks} />
      </nav>
    </header>
  );
}
