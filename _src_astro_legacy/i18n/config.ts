export const SUPPORTED_LOCALES = ['en', 'ko', 'ja', 'zh'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
  ja: '日本語',
  zh: '中文',
};

export const LOCALE_NATIVE_LABELS: Record<Locale, string> = {
  en: 'EN',
  ko: 'KO',
  ja: 'JA',
  zh: 'ZH',
};
