'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { SUPPORTED_LOCALES, LOCALE_NATIVE_LABELS, LOCALE_LABELS, type Locale } from '@/i18n/config';

interface LanguageSelectorProps {
  currentLocale: string;
}

export default function LanguageSelector({ currentLocale }: LanguageSelectorProps) {
  const t = useTranslations('a11y');
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function getPathWithoutLocale(path: string): string {
    const segments = path.split('/');
    const localeIndex = segments.findIndex((s) =>
      SUPPORTED_LOCALES.includes(s as Locale)
    );
    if (localeIndex !== -1) {
      segments.splice(localeIndex, 1);
    }
    return segments.join('/') || '/';
  }

  function switchLocale(newLocale: Locale) {
    const pathWithoutLocale = getPathWithoutLocale(pathname);
    const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '/' : pathWithoutLocale}`;
    router.push(newPath);
    setIsOpen(false);
    setFocusedIndex(-1);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const currentIndex = SUPPORTED_LOCALES.indexOf(currentLocale as Locale);
      const initialIndex = currentIndex !== -1 ? currentIndex : 0;
      setFocusedIndex(initialIndex);
    }
  }, [isOpen, currentLocale]);

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.focus();
    }
  }, [isOpen, focusedIndex]);

  const handleTriggerKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsOpen(true);
      } else if (event.key === 'Escape') {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    },
    []
  );

  const handleOptionKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, locale: Locale) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 1, SUPPORTED_LOCALES.length - 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        switchLocale(locale);
      } else if (event.key === 'Escape' || event.key === 'Tab') {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
        className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors"
        style={{
          border: '1px solid var(--color-border)',
          color: 'var(--color-text-secondary)',
          background: 'transparent',
        }}
        aria-label={t('switch_language')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{LOCALE_NATIVE_LABELS[currentLocale as Locale] || currentLocale.toUpperCase()}</span>
        <span className="text-xs">{isOpen ? '▴' : '▾'}</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1 w-36 rounded-lg shadow-lg z-50"
          style={{
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
          }}
          role="listbox"
          aria-label="Language options"
        >
          {SUPPORTED_LOCALES.map((locale, index) => (
            <button
              key={locale}
              ref={(el) => { optionRefs.current[index] = el; }}
              onClick={() => switchLocale(locale)}
              onKeyDown={(e) => handleOptionKeyDown(e, locale)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors text-left rounded-sm ${
                locale === currentLocale ? '' : ''
              }`}
              style={{
                color: locale === currentLocale ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
                background: 'transparent',
              }}
              role="option"
              aria-selected={locale === currentLocale}
            >
              <span>{LOCALE_LABELS[locale]}</span>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{LOCALE_NATIVE_LABELS[locale]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
