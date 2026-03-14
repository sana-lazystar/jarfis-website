'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { SUPPORTED_LOCALES, LOCALE_NATIVE_LABELS, LOCALE_LABELS, type Locale } from '@/i18n/config';

interface LanguageSelectorProps {
  currentLocale: string;
}

export default function LanguageSelector({ currentLocale }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

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
  }

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-1.5 font-mono text-sm text-zinc-400 border border-zinc-700 rounded hover:border-zinc-500 hover:text-zinc-200 transition-colors"
        aria-label="Switch language"
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
          {SUPPORTED_LOCALES.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
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
