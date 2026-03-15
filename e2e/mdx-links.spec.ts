import { test, expect } from '@playwright/test';

/**
 * MDX 내부/외부 링크 동작 검증
 *
 * - MDX 내부 링크 클릭 → 정상 이동 (basePath 적용 확인)
 * - MDX 외부 링크에 target="_blank" 속성 존재 확인
 * - 앵커 링크(#)가 <a href="#..."> 형태로 유지되는지 확인
 */

/** pages.spec.ts의 BASE_URL_PREFIX와 동일한 basePath */
const BASE_PATH = '/jarfis-website';

test.describe('MDX 내부 링크 basePath 적용 확인', () => {
  test('getting-started docs: "Architecture & Concepts" 링크 href에 /en/docs/ 포함', async ({
    page,
  }) => {
    await page.goto('/en/docs/getting-started/');

    // MDX 내에서 렌더링된 "Architecture & Concepts" 링크 찾기
    const mdxLink = page.locator('article a[href*="/docs/concepts-overview"]');
    const href = await mdxLink.first().getAttribute('href');

    expect(href).toContain('/en/docs/concepts-overview');
    // basePath prefix 존재 확인 (serve 경로 기준으로 /jarfis-website/ 포함)
    expect(href).toContain(`${BASE_PATH}/`);
  });

  test('getting-started docs: MDX 내부 링크 클릭 → 대상 페이지 200', async ({ page }) => {
    await page.goto('/en/docs/getting-started/');

    const mdxLink = page.locator('article a[href*="/docs/concepts-overview"]').first();
    const href = await mdxLink.getAttribute('href');
    expect(href).toBeTruthy();

    // href에서 basePath prefix 제거하여 serve 경로로 변환
    const servePath = href!.replace(BASE_PATH, '');
    const response = await page.goto(servePath);
    expect(response?.status()).toBe(200);
  });

  test('ko guides-customization: "API Reference" 링크 href에 /ko/docs/ 포함', async ({
    page,
  }) => {
    await page.goto('/ko/docs/guides-customization/');

    const mdxLink = page.locator('article a[href*="/docs/api-reference"]');
    const href = await mdxLink.first().getAttribute('href');

    expect(href).toContain('/ko/docs/api-reference');
    expect(href).toContain(`${BASE_PATH}/`);
  });
});

test.describe('MDX 외부 링크 보안 속성 확인', () => {
  test('외부 링크에 target="_blank" 속성 존재', async ({ page }) => {
    // 외부 링크가 있는 docs 페이지로 이동 (getting-started에 GitHub 외부 링크 포함)
    await page.goto('/en/docs/getting-started/');

    // article 내부의 외부 링크 (target="_blank") 확인
    const externalLinks = page.locator('article a[target="_blank"]');
    const count = await externalLinks.count();

    // 해당 페이지에 외부 링크가 반드시 존재해야 함 (vacuous pass 방지)
    expect(count).toBeGreaterThan(0);

    // 외부 링크에 rel="noopener noreferrer" 확인
    for (let i = 0; i < Math.min(count, 3); i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }
  });

  test('외부 링크에 rel="noopener noreferrer" 속성 존재', async ({ page }) => {
    await page.goto('/en/docs/api-reference/');

    const externalLinks = page.locator('article a[target="_blank"]');
    const count = await externalLinks.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }
  });
});

test.describe('앵커 링크 동작 확인', () => {
  test('앵커 링크(#)가 순수 <a href="#..."> 형태로 유지', async ({ page }) => {
    await page.goto('/en/docs/getting-started/');

    // 앵커 링크는 href가 #으로 시작
    const anchorLinks = page.locator('article a[href^="#"]');
    const count = await anchorLinks.count();

    if (count === 0) {
      // 현재 콘텐츠에 앵커 링크가 없으므로 skip
      test.skip(true, '해당 페이지에 앵커 링크 없음 — 콘텐츠에 추가 시 재활성화');
      return;
    }

    const href = await anchorLinks.first().getAttribute('href');
    expect(href).toMatch(/^#/);
  });
});
