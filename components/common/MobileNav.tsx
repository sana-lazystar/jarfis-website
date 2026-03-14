'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSelector from './LanguageSelector';

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  locale: string;
  navLinks: NavLink[];
}

export default function MobileNav({ locale, navLinks }: MobileNavProps) {
  const tA11y = useTranslations('a11y');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded transition-colors"
        style={{
          border: '1px solid var(--color-border)',
          color: 'var(--color-text-secondary)',
        }}
        aria-label={isOpen ? tA11y('close_nav') : tA11y('open_nav')}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          id="mobile-nav-menu"
          className="absolute left-0 right-0 top-16 px-4 py-4 shadow-xl"
          style={{
            background: 'rgba(7, 15, 30, 0.95)',
            borderBottom: '1px solid var(--color-border)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2.5 text-sm rounded transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {link.label}
              </Link>
            ))}

            <div
              className="mt-3 flex items-center justify-between pt-3"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              <LanguageSelector currentLocale={locale} />
              <a
                href="https://github.com/sana-lazystar/jarfis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors"
                style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
              >
                GitHub
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
