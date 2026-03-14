import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { SUPPORTED_LOCALES } from '@/i18n/config';

const BASE_URL = 'https://sana-lazystar.github.io/jarfis-website';
const SITE_NAME = 'JARFIS';
const DEFAULT_OG_IMAGE = '/images/og/og-default.png';

export interface SeoProps {
  title: string;
  description: string;
  locale: Locale;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function generateSeoMetadata({
  title,
  description,
  locale,
  path,
  ogImage,
  noIndex,
}: SeoProps): Metadata {
  const pageTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${BASE_URL}/${locale}${path}`;
  const ogImageUrl = `${BASE_URL}${ogImage || DEFAULT_OG_IMAGE}`;

  // hreflang 태그 생성
  const alternates: Record<string, string> = {};
  for (const loc of SUPPORTED_LOCALES) {
    alternates[loc] = `${BASE_URL}/${loc}${path}`;
  }

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: alternates as Record<string, string>,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale,
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [ogImageUrl],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export { BASE_URL, SITE_NAME };
