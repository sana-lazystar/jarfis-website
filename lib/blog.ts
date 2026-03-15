import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from '@/i18n/config';

export interface BlogFrontmatter {
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  author: string;
  tags: string[];
  locale: Locale;
  translationOf?: string;
  ogImage?: string;
  draft: boolean;
}

export interface BlogEntry extends BlogFrontmatter {
  slug: string;
}

const blogDir = path.join(process.cwd(), 'content', 'blog');

function parseFrontmatter(filePath: string): BlogFrontmatter | null {
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(content);

  if (!data.title || !data.description || !data.pubDate) {
    return null;
  }

  return {
    title: data.title as string,
    description: data.description as string,
    pubDate: String(data.pubDate),
    updatedDate: data.updatedDate ? String(data.updatedDate) : undefined,
    author: (data.author as string) || 'JARFIS Team',
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    locale: (data.locale as Locale) || DEFAULT_LOCALE,
    translationOf: data.translationOf as string | undefined,
    ogImage: data.ogImage as string | undefined,
    draft: Boolean(data.draft),
  };
}

export function getBlogPostsByLocale(locale: Locale): BlogEntry[] {
  const localeDir = path.join(blogDir, locale);
  const defaultDir = path.join(blogDir, DEFAULT_LOCALE);

  const localeFiles = fs.existsSync(localeDir)
    ? fs.readdirSync(localeDir).filter((f) => f.endsWith('.mdx'))
    : [];

  // locale이 기본 locale이 아닌 경우에만 fallback 적용
  const defaultFiles =
    locale !== DEFAULT_LOCALE && fs.existsSync(defaultDir)
      ? fs.readdirSync(defaultDir).filter((f) => f.endsWith('.mdx'))
      : [];

  const allSlugs = new Set([
    ...localeFiles.map((f) => f.replace('.mdx', '')),
    ...defaultFiles.map((f) => f.replace('.mdx', '')),
  ]);

  const entries: BlogEntry[] = [];

  for (const slug of allSlugs) {
    const localeFilePath = path.join(localeDir, `${slug}.mdx`);
    const defaultFilePath = path.join(defaultDir, `${slug}.mdx`);

    const filePath = fs.existsSync(localeFilePath) ? localeFilePath : defaultFilePath;
    const frontmatter = parseFrontmatter(filePath);

    if (!frontmatter || frontmatter.draft) continue;

    entries.push({ ...frontmatter, slug });
  }

  // pubDate 역순 정렬
  return entries.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
}

export function getBlogPostByLocaleAndSlug(
  locale: Locale,
  slug: string
): { frontmatter: BlogFrontmatter; filePath: string } | null {
  const localeFilePath = path.join(blogDir, locale, `${slug}.mdx`);
  const defaultFilePath = path.join(blogDir, DEFAULT_LOCALE, `${slug}.mdx`);

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

export function getAllBlogStaticParams(): { locale: string; slug: string }[] {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of SUPPORTED_LOCALES) {
    // getBlogPostsByLocale()은 이미 DEFAULT_LOCALE fallback을 내장하고 있다.
    // locale별 MDX 파일이 없는 경우 en 콘텐츠를 fallback으로 사용하므로,
    // 4개 locale 모두에 대해 static params를 생성하여 HTML이 빌드 시 생성된다.
    const posts = getBlogPostsByLocale(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}
