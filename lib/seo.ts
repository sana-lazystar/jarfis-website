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
  // layout.tsx의 template '%s | JARFIS'가 <title> 태그에 자동 적용됨
  // 홈 페이지(title === SITE_NAME)에서는 template 적용을 방지하기 위해 absolute title 사용
  const pageTitle =
    title === SITE_NAME
      ? { absolute: 'JARFIS — The Fantastic Way to Ship Software with AI' }
      : title;
  // OG/Twitter에는 template이 적용 안 되므로 사이트명 포함한 풀 타이틀 별도 구성
  const ogTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
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
      title: ogTitle,
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
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [ogImageUrl],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export { BASE_URL, SITE_NAME };
