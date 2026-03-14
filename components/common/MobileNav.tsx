'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSelector from './LanguageSelector';
import GitHubIcon from '@/components/icons/GitHubIcon';

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
  const tCommon = useTranslations('common');
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
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 transition-colors"
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
          className="absolute left-0 right-0 top-full border-b border-zinc-800 bg-zinc-950 px-4 py-4 shadow-xl"
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2.5 font-mono text-sm text-zinc-400 hover:text-zinc-100 rounded hover:bg-zinc-800 transition-colors"
              >
                <span className="text-green-500 mr-2">$</span>
                {link.label}
              </Link>
            ))}

            <div className="mt-3 flex items-center justify-between border-t border-zinc-800 pt-3">
              <LanguageSelector currentLocale={locale} />
              <a
                href="https://github.com/sana-lazystar/jarfis"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-sm text-zinc-400 hover:text-green-500 transition-colors"
                aria-label={tA11y('view_github')}
              >
                <GitHubIcon />
                {tCommon('github')}
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
