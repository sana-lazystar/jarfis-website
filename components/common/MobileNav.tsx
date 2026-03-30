'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SUPPORTED_LOCALES, LOCALE_LABELS, LOCALE_NATIVE_LABELS, type Locale } from '@/i18n/config';
import { useScrollLock } from '@/hooks/useScrollLock';
import { getPathWithoutLocale } from '@/lib/paths';

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
  const pathname = usePathname();
  const router = useRouter();

  // iOS Safari 대응 body scroll lock (T-3.1)
  useScrollLock(isOpen);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  function switchLocale(newLocale: Locale) {
    const pathWithoutLocale = getPathWithoutLocale(pathname);
    const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '/' : pathWithoutLocale}`;
    router.push(newPath);
    setIsOpen(false);
  }

  return (
    <div className="sm:hidden">
      {/* 햄버거 버튼: h-11 w-11 (44px) — WCAG 2.5.8 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-11 w-11 items-center justify-center rounded transition-colors"
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
            {/* 네비게이션 링크 — py-3 (48px 이상 터치 타겟) */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-3 text-sm rounded transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {link.label}
              </Link>
            ))}

            {/* 구분선 */}
            <div
              className="mt-3 pt-3"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              {/* 인라인 언어 선택 — ADR-002: MobileNav 내에서 드롭다운 대신 인라인 리스트 */}
              <div className="flex flex-col gap-1">
                {SUPPORTED_LOCALES.map((loc) => {
                  const isActive = loc === locale;
                  return (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className="flex w-full items-center justify-between rounded px-3 py-3 text-sm transition-colors text-left"
                      style={{
                        color: isActive ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
                        background: isActive ? 'rgba(13, 148, 136, 0.08)' : 'transparent',
                      }}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      <span>{LOCALE_LABELS[loc]}</span>
                      <span
                        className="text-xs"
                        style={{ color: isActive ? 'var(--color-primary-light)' : 'var(--color-text-muted)' }}
                      >
                        {LOCALE_NATIVE_LABELS[loc]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* GitHub 링크 */}
              <a
                href="https://github.com/sana-lazystar/jarfis"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center px-3 py-3 text-sm transition-colors rounded"
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
