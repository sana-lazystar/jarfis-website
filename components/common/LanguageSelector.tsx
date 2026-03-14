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

  // pathname에서 locale 제거하고 나머지 경로 추출
  function getPathWithoutLocale(path: string): string {
    const segments = path.split('/');
    // /jarfis-website/en/docs/... 형태에서 locale 제거
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

  // 드롭다운 외부 클릭 시 닫기
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

  // 드롭다운 열릴 때 현재 locale 항목에 포커스
  useEffect(() => {
    if (isOpen) {
      const currentIndex = SUPPORTED_LOCALES.indexOf(currentLocale as Locale);
      const initialIndex = currentIndex !== -1 ? currentIndex : 0;
      setFocusedIndex(initialIndex);
    }
  }, [isOpen, currentLocale]);

  // focusedIndex 변경 시 해당 버튼에 포커스
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
        className="flex items-center gap-1 px-3 py-1.5 font-mono text-sm text-zinc-400 border border-zinc-700 rounded hover:border-zinc-500 hover:text-zinc-200 transition-colors"
        aria-label={t('switch_language')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{LOCALE_NATIVE_LABELS[currentLocale as Locale] || currentLocale.toUpperCase()}</span>
        <span className="text-xs">{isOpen ? '▴' : '▾'}</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1 w-36 rounded border border-zinc-700 bg-zinc-900 shadow-lg z-50"
          role="listbox"
          aria-label="Language options"
        >
          {SUPPORTED_LOCALES.map((locale, index) => (
            <button
              key={locale}
              ref={(el) => { optionRefs.current[index] = el; }}
              onClick={() => switchLocale(locale)}
              onKeyDown={(e) => handleOptionKeyDown(e, locale)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm font-mono hover:bg-zinc-800 transition-colors text-left ${
                locale === currentLocale ? 'text-green-500' : 'text-zinc-400'
              }`}
              role="option"
              aria-selected={locale === currentLocale}
            >
              <span>{LOCALE_LABELS[locale]}</span>
              <span className="text-xs text-zinc-600">{LOCALE_NATIVE_LABELS[locale]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
