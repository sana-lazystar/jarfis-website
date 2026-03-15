/**
 * GitHub Pages 배포 시 사용되는 basePath.
 * next.config.mjs의 basePath 값과 반드시 일치해야 한다.
 * 불일치 시 validate-links.mjs가 빌드 타임에 감지한다.
 */
export const BASE_PATH = '/jarfis-website';

/**
 * 사이트의 전체 URL (프로토콜 + 도메인 + basePath).
 * canonical URL, OG URL, sitemap, robots.txt, JSON-LD 등에서 사용.
 */
export const BASE_URL = `https://sana-lazystar.github.io${BASE_PATH}`;

/**
 * 경로에 basePath를 prepend한다.
 *
 * **사용 경계 (Critical)**:
 * - 사용해야 하는 곳: 순수 HTML 태그 (<a>, <link>, <meta>, <img> 등)
 * - 사용하면 안 되는 곳: Next.js <Link> 컴포넌트 (basePath 자동 적용됨)
 *
 * Next.js <Link> 내에서 사용하면 basePath가 이중 적용되어
 * '/jarfis-website/jarfis-website/...' 형태의 잘못된 경로가 생성된다.
 *
 * @param path - '/'로 시작하는 경로 (예: '/en/', '/favicon.ico')
 * @returns basePath가 prepend된 경로 (예: '/jarfis-website/en/')
 *
 * @example
 * // 순수 HTML 태그에서 사용
 * <link rel="icon" href={withBasePath('/favicon.ico')} />
 * <img src={withBasePath('/images/photo.png')} />
 * <meta httpEquiv="refresh" content={`0; url=${withBasePath('/en/')}`} />
 *
 * // Next.js Link에서는 사용 금지
 * <Link href="/en/">Home</Link>  // 올바름 (basePath 자동 적용)
 * <Link href={withBasePath('/en/')}>Home</Link>  // 잘못됨 (이중 적용!)
 */
export function withBasePath(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${normalizedPath}`;
}

/**
 * 경로를 전체 사이트 URL로 변환한다.
 * sitemap, robots.txt, canonical, OG URL, JSON-LD 등에서 사용.
 *
 * @param path - '/'로 시작하는 경로 (예: '/en/', '/sitemap.xml')
 * @returns 전체 URL (예: 'https://sana-lazystar.github.io/jarfis-website/en/')
 */
export function siteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${normalizedPath}`;
}
