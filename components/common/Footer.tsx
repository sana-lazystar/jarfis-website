import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

interface FooterProps {
  locale: string;
}

export default async function Footer({ locale }: FooterProps) {
  const t = await getTranslations('footer');

  const externalLinks = [
    { href: `/${locale}/docs/`, label: t('documentation') },
    { href: 'https://github.com/sana-lazystar/jarfis', label: t('github_link'), external: true },
    { href: `/${locale}/blog/`, label: t('blog') },
    { href: 'https://github.com/sana-lazystar/jarfis/discussions', label: t('community'), external: true },
  ];

  return (
    <footer
      role="contentinfo"
      style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-neutral-darker)' }}
    >
      <style>{`
        .footer-link {
          color: var(--color-text-muted);
          transition: color 0.2s;
          text-decoration: none;
          font-size: 0.875rem;
        }
        .footer-link:hover {
          color: var(--color-primary-light);
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-start">
          {/* Left: Logo + copyright */}
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <span
              style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)', letterSpacing: '0.05em' }}
            >
              JARFIS
            </span>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
              &copy; {t('copyright')}
            </p>
          </div>

          {/* Right: Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end" role="list">
              {externalLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
