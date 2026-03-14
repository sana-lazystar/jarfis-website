import type { MetadataRoute } from 'next';
import { SUPPORTED_LOCALES } from '@/i18n/config';
import { getNativeDocStaticParams } from '@/lib/docs';
import { getAllBlogStaticParams } from '@/lib/blog';

export const dynamic = 'force-static';

const BASE_URL = 'https://sana-lazystar.github.io/jarfis-website';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // 정적 페이지들
  const staticPages = ['/', '/features/', '/blog/', '/showcase/', '/docs/'];

  for (const locale of SUPPORTED_LOCALES) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: page === '/' ? 1.0 : 0.8,
      });
    }
  }

  // Docs 페이지 — 실제 locale별 MDX 파일이 존재하는 항목만 포함 (fallback URL 제외)
  const docParams = getNativeDocStaticParams();
  for (const { locale, slug } of docParams) {
    entries.push({
      url: `${BASE_URL}/${locale}/docs/${slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // Blog 포스트
  const blogParams = getAllBlogStaticParams();
  for (const { locale, slug } of blogParams) {
    entries.push({
      url: `${BASE_URL}/${locale}/blog/${slug}/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    });
  }

  return entries;
}
