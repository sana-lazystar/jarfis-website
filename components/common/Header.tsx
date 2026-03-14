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

  const navLinks = [
    { href: `/${locale}/features/`, label: t('features') },
    { href: `/${locale}/docs/`, label: t('docs') },
    { href: `/${locale}/blog/`, label: t('blog') },
    { href: `/${locale}/showcase/`, label: t('showcase') },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 h-16"
      style={{
        background: 'rgba(10, 22, 40, 0.8)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        borderBottom: '1px solid rgba(26, 44, 71, 0.6)',
      }}
    >
      <style>{`
        .nav-link {
          color: var(--color-text-secondary);
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: var(--color-primary-light);
        }
        .header-cta {
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
          color: #0A1628;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .header-cta:hover {
          box-shadow: 0 4px 15px rgba(13, 148, 136, 0.3);
          transform: translateY(-1px);
        }
      `}</style>
      <nav
        className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Logo locale={locale} />

        {/* Desktop Navigation — hidden on mobile */}
        <div className="hidden items-center gap-1 sm:flex" role="list">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="listitem"
              className="nav-link px-3 py-1.5 text-sm rounded"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: Language + Get Started CTA */}
        <div className="hidden items-center gap-3 sm:flex">
          <LanguageSelector currentLocale={locale} />
          <Link
            href={`/${locale}/docs/getting-started/`}
            className="header-cta inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold"
          >
            {t('get_started')}
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <MobileNav locale={locale} navLinks={navLinks} />
      </nav>
    </header>
  );
}
