/**
 * validate-links.mjs
 *
 * 빌드 타임 내부 링크 검증 스크립트.
 * pnpm build 후 out/ 디렉토리의 모든 HTML에서 내부 링크를 추출하고,
 * 해당 경로가 실제 파일로 해소되는지 검증한다.
 * 이중 basePath 패턴(/jarfis-website/jarfis-website/)도 감지한다.
 *
 * 사용법: node scripts/validate-links.mjs
 * 종료 코드: 0 (성공), 1 (실패)
 */

import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'out');

// ─── basePath 동적 감지 ─────────────────────────────────────────────────────

/**
 * out/ 하위 최상위 디렉토리 중 HTML 파일이 포함된 첫 번째를 basePath로 감지한다.
 * 예: out/jarfis-website/en/index.html -> basePath = '/jarfis-website'
 * 단, 이 프로젝트의 next.config.mjs basePath='/jarfis-website' 설정에서
 * SSG out 디렉토리는 basePath 없이 locale 디렉토리가 바로 생성된다.
 * (out/en/, out/ko/ 등)
 * basePath는 HTML 내부 링크에서 감지한다.
 */
function detectBasePathFromHtml() {
  // out/ 내 최초 발견 HTML에서 href 패턴으로 basePath 추론
  const htmlFiles = getAllHtmlFiles(OUT_DIR);
  if (htmlFiles.length === 0) return '';

  // 첫 번째 HTML에서 절대 경로 href를 찾아 공통 prefix(basePath) 추론
  const firstHtml = fs.readFileSync(htmlFiles[0], 'utf-8');
  const hrefMatches = [...firstHtml.matchAll(/href="(\/[^"#?]+)"/g)];

  // '/jarfis-website' 같은 패턴의 prefix를 추출
  // 여러 href에서 공통 첫 번째 path segment를 찾는다
  const prefixCandidates = new Map();

  for (const match of hrefMatches) {
    const href = match[1];
    // /_next/ 등 Next.js 내부 경로 제외
    if (href.startsWith('/_next/')) continue;
    // 두 번째 슬래시까지의 첫 번째 segment를 추출
    const secondSlash = href.indexOf('/', 1);
    if (secondSlash === -1) continue;
    const segment = href.substring(0, secondSlash);
    prefixCandidates.set(segment, (prefixCandidates.get(segment) || 0) + 1);
  }

  if (prefixCandidates.size === 0) return '';

  // 가장 많이 등장하는 segment를 basePath로 간주
  let maxCount = 0;
  let basePath = '';
  for (const [segment, count] of prefixCandidates) {
    if (count > maxCount) {
      maxCount = count;
      basePath = segment;
    }
  }

  return basePath;
}

// ─── HTML 파일 탐색 ─────────────────────────────────────────────────────────

function getAllHtmlFiles(dir) {
  const files = [];

  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // _next 디렉토리 내부는 Next.js 자산이므로 건너뜀
      if (entry.name === '_next') continue;
      files.push(...getAllHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

// ─── 내부 링크 추출 ─────────────────────────────────────────────────────────

const LINK_PATTERNS = [
  // href="..." 또는 src="..."
  /(?:href|src)=["']([^"']+)["']/gi,
  // <meta http-equiv="refresh" content="0; url=...">
  /content=["'][^"']*url=([^"'\s;]+)/gi,
];

function extractLinks(html) {
  const links = new Set();

  for (const pattern of LINK_PATTERNS) {
    pattern.lastIndex = 0; // 정규식 상태 초기화
    let match;
    while ((match = pattern.exec(html)) !== null) {
      links.add(match[1]);
    }
  }

  return [...links];
}

function isInternalLink(href, basePath) {
  // 외부 링크 제외
  if (href.startsWith('http://') || href.startsWith('https://')) return false;
  // 프로토콜 스킴 제외
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return false;
  // 앵커만 있는 링크 제외
  if (href.startsWith('#')) return false;
  // data URI 제외
  if (href.startsWith('data:')) return false;
  // /_next/ Next.js 내부 자산 제외
  if (href.startsWith('/_next/')) return false;

  // basePath로 시작하는 절대 경로만 대상
  if (basePath) {
    return href.startsWith(basePath);
  }

  // basePath가 없는 경우 '/'로 시작하는 절대 경로를 대상으로
  return href.startsWith('/');
}

// ─── 경로 해소 ───────────────────────────────────────────────────────────────

function resolveToFilePath(link) {
  // 앵커, 쿼리스트링 제거
  const pathOnly = link.split('#')[0].split('?')[0];

  // basePath를 out/ 경로로 변환
  // 예: /jarfis-website/en/ -> out/en/index.html
  //     /en/ -> out/en/index.html
  // next.config.mjs basePath='/jarfis-website' + SSG output='export' 조합에서
  // out 디렉토리에는 basePath가 prefix로 붙지 않는다.
  // 따라서 /jarfis-website/en/ -> out/en/ 로 변환해야 한다.
  // detectBasePathFromHtml()로 감지된 basePath를 제거한 후 경로를 구성한다.
  return path.join(OUT_DIR, pathOnly);
}

function checkFileExists(fsPath) {
  if (fs.existsSync(fsPath)) {
    const stat = fs.statSync(fsPath);
    if (stat.isDirectory()) {
      // 디렉토리면 index.html 확인
      return fs.existsSync(path.join(fsPath, 'index.html'));
    }
    return true;
  }

  // trailing slash 없는 경우: 디렉토리/index.html 시도
  const withIndex = path.join(fsPath, 'index.html');
  if (fs.existsSync(withIndex)) return true;

  return false;
}

// ─── 메인 검증 로직 ─────────────────────────────────────────────────────────

function validateLinks() {
  const startTime = Date.now();

  console.log('validate-links: out/ 디렉토리 내부 링크 검증 시작...\n');

  if (!fs.existsSync(OUT_DIR)) {
    console.error('ERROR: out/ 디렉토리가 존재하지 않습니다. pnpm build를 먼저 실행하세요.');
    process.exit(1);
  }

  // basePath 감지
  const basePath = detectBasePathFromHtml();
  console.log(`감지된 basePath: "${basePath || '(없음)'}"`);

  const htmlFiles = getAllHtmlFiles(OUT_DIR);
  console.log(`검증 대상 HTML 파일: ${htmlFiles.length}건\n`);

  const brokenLinks = [];
  const doubleBasePaths = [];
  let checkedCount = 0;
  let skippedCount = 0;

  for (const htmlFile of htmlFiles) {
    const html = fs.readFileSync(htmlFile, 'utf-8');
    const relativeFile = path.relative(process.cwd(), htmlFile);
    const links = extractLinks(html);

    for (const link of links) {
      // Step 1: 이중 basePath 검사
      if (basePath && link.includes(`${basePath}${basePath}`)) {
        doubleBasePaths.push({ file: relativeFile, link });
        continue;
      }

      // Step 2: 내부 링크만 대상으로
      if (!isInternalLink(link, basePath)) {
        skippedCount++;
        continue;
      }

      checkedCount++;

      // Step 3: basePath 제거 후 out/ 내 파일 경로로 변환
      // /jarfis-website/en/ -> out/en/index.html
      let linkWithoutBasePath = link;
      if (basePath && link.startsWith(basePath)) {
        linkWithoutBasePath = link.slice(basePath.length) || '/';
      }

      const fsPath = path.join(OUT_DIR, linkWithoutBasePath);

      // Step 4: trailing slash 처리
      const pathOnly = linkWithoutBasePath.split('#')[0].split('?')[0];
      let resolvedPath;

      if (pathOnly.endsWith('/')) {
        resolvedPath = path.join(OUT_DIR, pathOnly, 'index.html');
      } else if (path.extname(pathOnly)) {
        // 확장자가 있는 경우 직접 경로
        resolvedPath = path.join(OUT_DIR, pathOnly);
      } else {
        // 확장자 없고 trailing slash 없는 경우
        resolvedPath = path.join(OUT_DIR, pathOnly, 'index.html');
      }

      if (!fs.existsSync(resolvedPath)) {
        // 대안 경로도 확인 (확장자 없는 경우 파일 자체도 확인)
        const altPath = path.join(OUT_DIR, pathOnly);
        if (!fs.existsSync(altPath)) {
          brokenLinks.push({
            file: relativeFile,
            link,
            expected: path.relative(process.cwd(), resolvedPath),
          });
        }
      }
    }
  }

  // ─── 결과 리포트 ───────────────────────────────────────────────────────────

  const elapsed = Date.now() - startTime;

  console.log('─'.repeat(60));
  console.log(`검증 완료 (${elapsed}ms)`);
  console.log(`  검증한 내부 링크: ${checkedCount}건`);
  console.log(`  건너뛴 링크 (외부/앵커/Next.js 자산): ${skippedCount}건`);

  if (doubleBasePaths.length > 0) {
    console.log(`\n이중 basePath 패턴 감지: ${doubleBasePaths.length}건`);
    for (const { file, link } of doubleBasePaths) {
      console.log(`  [이중 basePath] ${file}`);
      console.log(`    링크: ${link}`);
    }
  }

  if (brokenLinks.length > 0) {
    console.log(`\n깨진 링크: ${brokenLinks.length}건`);
    for (const { file, link, expected } of brokenLinks) {
      console.log(`  [깨진 링크] ${file}`);
      console.log(`    링크: ${link}`);
      console.log(`    예상 파일: ${expected}`);
    }
  }

  console.log('─'.repeat(60));

  if (brokenLinks.length > 0 || doubleBasePaths.length > 0) {
    const total = brokenLinks.length + doubleBasePaths.length;
    console.log(`\nFAIL: ${total}건의 링크 문제가 발견되었습니다.`);
    process.exit(1);
  } else {
    console.log(`\nPASS: 모든 내부 링크가 유효합니다.`);
    process.exit(0);
  }
}

validateLinks();
