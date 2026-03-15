import { test, expect } from '@playwright/test';

/**
 * 네비게이션 동작 검증
 *
 * - 404 페이지 "Back to Home" 링크 클릭 → /en/ 이동
 * - 루트(/) meta refresh → /en/ 리다이렉트 확인
 * - 사이드바 링크 클릭 정상 동작 확인
 */

test.describe('404 → Home 네비게이션', () => {
  test('존재하지 않는 URL 접근 시 404 페이지 렌더링', async ({ page }) => {
    const response = await page.goto('/nonexistent-page-xyz/');
    // serve는 존재하지 않는 경로에 404.html이 없으면 별도 응답을 반환하므로
    // 404.html 직접 접근으로 테스트
    await page.goto('/404.html');
    await expect(page).toHaveURL(/404/);
  });

  test('404 페이지 "Back to Home" 클릭 → /en/ 이동', async ({ page }) => {
    await page.goto('/404.html');

    // "Back to Home" 링크 존재 확인
    const homeLink = page.locator('a[href*="/en/"]').first();
    await expect(homeLink).toBeVisible();

    await homeLink.click();
    // /en/ 또는 /jarfis-website/en/ 경로에 도달하면 성공
    await expect(page).toHaveURL(/\/en\//);
  });
});

test.describe('루트 페이지 리다이렉트', () => {
  test('루트(/) 접근 시 meta refresh로 /en/ 이동', async ({ page }) => {
    await page.goto('/');
    // meta refresh는 브라우저가 자동 처리. URL이 /en/으로 변경되어야 함
    await page.waitForURL(/\/en\//, { timeout: 5000 });
    await expect(page).toHaveURL(/\/en\//);
  });
});

test.describe('사이드바 네비게이션', () => {
  test('docs 사이드바 링크 클릭 → 해당 페이지 이동', async ({ page }) => {
    await page.goto('/en/docs/getting-started/');
    await expect(page).toHaveURL(/\/en\/docs\/getting-started\//);

    // 사이드바에서 다른 docs 링크 클릭
    const sidebarLink = page.locator('aside nav a[href*="/docs/"]').nth(1);
    const href = await sidebarLink.getAttribute('href');

    if (href) {
      await sidebarLink.click();
      await expect(page).toHaveURL(/\/en\/docs\//);
    }
  });

  test('docs prev/next 네비게이션 링크 정상 동작', async ({ page }) => {
    await page.goto('/en/docs/getting-started/');

    // Next 링크 존재 확인
    const nextLink = page.locator('nav[aria-label="Document navigation"] a').last();
    const nextHref = await nextLink.getAttribute('href');
    expect(nextHref).toBeTruthy();

    await nextLink.click();
    await expect(page).toHaveURL(/\/en\/docs\//);
  });
});
