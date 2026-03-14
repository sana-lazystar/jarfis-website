import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from '@/i18n/config';

export type DocCategory = 'getting-started' | 'concepts' | 'guides' | 'api-reference';

export interface DocsFrontmatter {
  title: string;
  description: string;
  category: DocCategory;
  order: number;
  locale: Locale;
  translationOf?: string;
  lastUpdated?: string;
  draft: boolean;
}

export interface DocEntry extends DocsFrontmatter {
  slug: string;
  locale: Locale;
}

const CATEGORY_ORDER: DocCategory[] = [
  'getting-started',
  'concepts',
  'guides',
  'api-reference',
];

const docsDir = path.join(process.cwd(), 'content', 'docs');

function parseFrontmatter(filePath: string): DocsFrontmatter | null {
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(content);

  if (!data.title || !data.description || !data.category || data.order === undefined) {
    return null;
  }

  return {
    title: data.title as string,
    description: data.description as string,
    category: data.category as DocCategory,
    order: Number(data.order),
    locale: (data.locale as Locale) || DEFAULT_LOCALE,
    translationOf: data.translationOf as string | undefined,
    lastUpdated: data.lastUpdated ? String(data.lastUpdated) : undefined,
    draft: Boolean(data.draft),
  };
}

export function getDocsByLocale(locale: Locale): DocEntry[] {
  const localeDir = path.join(docsDir, locale);
  const defaultDir = path.join(docsDir, DEFAULT_LOCALE);

  // locale 디렉토리의 파일 가져오기
  const localeFiles = fs.existsSync(localeDir)
    ? fs.readdirSync(localeDir).filter((f) => f.endsWith('.mdx'))
    : [];

  // 기본 locale 파일 가져오기 (fallback용)
  const defaultFiles = fs.existsSync(defaultDir)
    ? fs.readdirSync(defaultDir).filter((f) => f.endsWith('.mdx'))
    : [];

  const allSlugs = new Set([
    ...localeFiles.map((f) => f.replace('.mdx', '')),
    ...defaultFiles.map((f) => f.replace('.mdx', '')),
  ]);

  const entries: DocEntry[] = [];

  for (const slug of allSlugs) {
    const localeFilePath = path.join(localeDir, `${slug}.mdx`);
    const defaultFilePath = path.join(defaultDir, `${slug}.mdx`);

    // locale 파일 우선, 없으면 영어 fallback
    const filePath = fs.existsSync(localeFilePath) ? localeFilePath : defaultFilePath;
    const frontmatter = parseFrontmatter(filePath);

    if (!frontmatter || frontmatter.draft) continue;

    entries.push({
      ...frontmatter,
      slug,
      locale,
    });
  }

  // category 순서, 그 다음 order 순서로 정렬
  return entries.sort((a, b) => {
    const catDiff = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
    if (catDiff !== 0) return catDiff;
    return a.order - b.order;
  });
}

export function getDocByLocaleAndSlug(
  locale: Locale,
  slug: string
): { frontmatter: DocsFrontmatter; filePath: string } | null {
  const localeFilePath = path.join(docsDir, locale, `${slug}.mdx`);
  const defaultFilePath = path.join(docsDir, DEFAULT_LOCALE, `${slug}.mdx`);

  let filePath: string;
  if (fs.existsSync(localeFilePath)) {
    filePath = localeFilePath;
  } else if (fs.existsSync(defaultFilePath)) {
    filePath = defaultFilePath;
  } else {
    return null;
  }

  const frontmatter = parseFrontmatter(filePath);
  if (!frontmatter) return null;

  return { frontmatter, filePath };
}

export function getAllDocStaticParams(): { locale: string; slug: string }[] {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of SUPPORTED_LOCALES) {
    const docs = getDocsByLocale(locale);
    for (const doc of docs) {
      params.push({ locale, slug: doc.slug });
    }
  }

  return params;
}

/**
 * sitemap 전용: 각 locale에 실제 MDX 파일이 존재하는 경우만 반환.
 * en fallback으로 렌더링되는 ja/zh 문서는 SEO상 포함하지 않는다.
 */
export function getNativeDocStaticParams(): { locale: string; slug: string }[] {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of SUPPORTED_LOCALES) {
    const localeDir = path.join(docsDir, locale);
    if (!fs.existsSync(localeDir)) continue;

    const files = fs.readdirSync(localeDir).filter((f) => f.endsWith('.mdx'));
    for (const file of files) {
      const slug = file.replace('.mdx', '');
      const frontmatter = parseFrontmatter(path.join(localeDir, file));
      if (!frontmatter || frontmatter.draft) continue;
      params.push({ locale, slug });
    }
  }

  return params;
}
