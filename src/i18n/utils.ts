import type { Locale } from './config';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './config';

import en from './en.json';
import ko from './ko.json';
import ja from './ja.json';
import zh from './zh.json';

type TranslationValue = string | Record<string, unknown>;
const translations: Record<Locale, typeof en> = { en, ko, ja, zh };

/**
 * Get a nested translation value by dot-notation key.
 * Falls back to English if the key is missing in the target locale.
 */
export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: TranslationValue = translations[locale];

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = (value as Record<string, TranslationValue>)[k];
    } else {
      value = undefined as unknown as TranslationValue;
      break;
    }
  }

  // Fallback to English
  if (value === undefined || typeof value !== 'string') {
    let fallback: TranslationValue = translations[DEFAULT_LOCALE];
    for (const k of keys) {
      if (fallback && typeof fallback === 'object') {
        fallback = (fallback as Record<string, TranslationValue>)[k];
      } else {
        fallback = undefined as unknown as TranslationValue;
        break;
      }
    }
    if (typeof fallback === 'string') {
      return fallback;
    }
    return key; // Return key itself as last resort
  }

  return value;
}

/**
 * Get a nested translation value as an array of strings.
 * Falls back to English if the key is missing in the target locale.
 */
export function tArray(locale: Locale, key: string): string[] {
  const keys = key.split('.');
  let value: TranslationValue = translations[locale];

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = (value as Record<string, TranslationValue>)[k];
    } else {
      value = undefined as unknown as TranslationValue;
      break;
    }
  }

  if (Array.isArray(value)) {
    return value as unknown as string[];
  }

  // Fallback to English
  let fallback: TranslationValue = translations[DEFAULT_LOCALE];
  for (const k of keys) {
    if (fallback && typeof fallback === 'object') {
      fallback = (fallback as Record<string, TranslationValue>)[k];
    } else {
      fallback = undefined as unknown as TranslationValue;
      break;
    }
  }
  if (Array.isArray(fallback)) {
    return fallback as unknown as string[];
  }

  return [];
}

/**
 * Extract locale from URL pathname.
 * pathname: '/jarfis-website/ko/features'
 * segment[0] = 'jarfis-website' (base path)
 * segment[1] = 'ko' (locale)
 */
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  // With base path '/jarfis-website', the locale is at segments[1]
  // Without base path, the locale is at segments[0]
  for (const segment of segments) {
    if (SUPPORTED_LOCALES.includes(segment as Locale)) {
      return segment as Locale;
    }
  }
  return DEFAULT_LOCALE;
}

/**
 * Build a localized path, preserving the base path.
 * localePath('ko', 'features') -> '/jarfis-website/ko/features'
 * localePath('ko', '') -> '/jarfis-website/ko/'
 */
export function localePath(locale: Locale, path: string = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // '/jarfis-website'
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  if (cleanPath) {
    return `${base}/${locale}/${cleanPath}`;
  }
  return `${base}/${locale}/`;
}

/**
 * Get alternate locale paths for the current page (for LanguageSelector).
 * currentPath: full pathname like '/jarfis-website/ko/features'
 * Returns paths for all locales pointing to the same page.
 */
export function getAlternateLocalePaths(currentPath: string): Record<Locale, string> {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const segments = currentPath.split('/').filter(Boolean);

  // Find locale segment and extract page path after it
  let pageSegments: string[] = [];
  let foundLocale = false;
  for (const segment of segments) {
    if (foundLocale) {
      pageSegments.push(segment);
    } else if (SUPPORTED_LOCALES.includes(segment as Locale)) {
      foundLocale = true;
    }
  }

  const pagePath = pageSegments.join('/');

  const result = {} as Record<Locale, string>;
  for (const locale of SUPPORTED_LOCALES) {
    result[locale] = pagePath ? `${base}/${locale}/${pagePath}` : `${base}/${locale}/`;
  }
  return result;
}
