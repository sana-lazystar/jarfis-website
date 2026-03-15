import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E 설정
 *
 * baseURL 결정 근거:
 * - `pnpm build` 산출물은 `out/en/`, `out/ko/` 구조 (basePath 디렉토리 없음)
 * - `npx serve out -l 3000`은 `out/`을 웹 루트로 서빙
 * - 따라서 실제 파일 접근은 `http://localhost:3000/en/` 형태
 * - HTML 내 링크는 `/jarfis-website/en/` 형태이나, E2E 테스트는 serve 기준 경로를 사용
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npx serve out -l 3000',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
