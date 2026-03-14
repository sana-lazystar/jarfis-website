import type { Locale } from '../i18n/config';
import { localePath } from '../i18n/utils';

export interface SEOMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  locale: Locale;
  pagePath: string;
}

const SITE_URL = 'https://sana-lazystar.github.io';
const SITE_NAME = 'JARFIS';
const DEFAULT_DESCRIPTION =
  'The Fantastic Way to Ship Software with AI. 100% Open Source AI agent framework.';

/**
 * Generate SEO metadata for a page.
 */
export function generateSEO(options: {
  locale: Locale;
  pagePath: string;
  title?: string;
  description?: string;
  ogImage?: string;
}): SEOMetadata {
  const { locale, pagePath, title = SITE_NAME, description = DEFAULT_DESCRIPTION, ogImage } = options;

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const canonicalUrl = `${SITE_URL}${localePath(locale, pagePath)}`;
  const resolvedOgImage = ogImage
    ? `${SITE_URL}${base}${ogImage}`
    : `${SITE_URL}${base}/images/og/og-default.png`;

  return {
    title,
    description,
    canonicalUrl,
    ogImage: resolvedOgImage,
    locale,
    pagePath,
  };
}

/**
 * Format a page title with the site name.
 */
export function formatPageTitle(pageTitle: string): string {
  if (!pageTitle || pageTitle === SITE_NAME) return SITE_NAME;
  return `${pageTitle} | ${SITE_NAME}`;
}
