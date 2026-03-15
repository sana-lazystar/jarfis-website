import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 전체 정적 페이지 HTTP 200 검증
 *
 * sitemap.xml에서 URL을 파싱하여 각 페이지가 HTTP 200을 반환하는지 확인.
 * sitemap URL은 절대 경로 (https://sana-lazystar.github.io/jarfis-website/...)이므로
 * serve out 기준 경로로 변환: BASE_URL prefix를 제거하고 basePath를 strip.
 */

const BASE_URL_PREFIX = 'https://sana-lazystar.github.io/jarfis-website';
const OUT_DIR = path.join(process.cwd(), 'out');

function getSitemapUrls(): string[] {
  const sitemapPath = path.join(OUT_DIR, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    return [];
  }
  const content = fs.readFileSync(sitemapPath, 'utf-8');
  const matches = content.matchAll(/<loc>([^<]+)<\/loc>/g);
  return Array.from(matches, (m) => m[1]);
}

/**
 * sitemap URL을 serve out 기준 경로로 변환.
 * https://sana-lazystar.github.io/jarfis-website/en/ → /en/
 */
function toServePath(sitemapUrl: string): string {
  return sitemapUrl.replace(BASE_URL_PREFIX, '');
}

const sitemapUrls = getSitemapUrls();

test.describe('정적 페이지 HTTP 200 검증', () => {
  for (const sitemapUrl of sitemapUrls) {
    const servePath = toServePath(sitemapUrl);

    test(`${servePath} → HTTP 200`, async ({ page }) => {
      const response = await page.goto(servePath);
      expect(response?.status()).toBe(200);
    });
  }

  test('sitemap.xml 파싱 확인 (최소 1건 이상)', () => {
    expect(sitemapUrls.length).toBeGreaterThan(0);
  });
});
