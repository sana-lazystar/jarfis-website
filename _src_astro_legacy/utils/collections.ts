import { getCollection } from 'astro:content';
import type { Locale } from '../i18n/config';

type CollectionEntry<T extends 'blog' | 'docs'> = Awaited<ReturnType<typeof getCollection<T>>>[number];

/**
 * Get docs for a given locale, falling back to English for missing translations.
 * Docs are sorted by category order, then by order field.
 */
export async function getDocsForLocale(locale: Locale): Promise<CollectionEntry<'docs'>[]> {
  const allDocs = await getCollection('docs', (entry) => !entry.data.draft);

  // Filter by locale, fallback to English
  const localeDocs = allDocs.filter((doc) => doc.data.locale === locale);
  const enDocs = allDocs.filter((doc) => doc.data.locale === 'en');

  // Merge: locale docs take precedence, fill gaps with English
  const mergedMap = new Map<string, CollectionEntry<'docs'>>();
  for (const doc of enDocs) {
    const slug = doc.id.replace(/^en\//, '');
    mergedMap.set(slug, doc);
  }
  for (const doc of localeDocs) {
    const slug = doc.id.replace(new RegExp(`^${locale}/`), '');
    mergedMap.set(slug, doc);
  }

  return Array.from(mergedMap.values()).sort((a, b) => {
    // Sort by category first (getting-started < concepts < guides < api-reference)
    const categoryOrder: Record<string, number> = {
      'getting-started': 0,
      concepts: 1,
      guides: 2,
      'api-reference': 3,
    };
    const catA = categoryOrder[a.data.category] ?? 99;
    const catB = categoryOrder[b.data.category] ?? 99;
    if (catA !== catB) return catA - catB;
    return a.data.order - b.data.order;
  });
}

/**
 * Get blog posts for a given locale, falling back to English for missing translations.
 * Posts are sorted by pubDate descending (newest first).
 */
export async function getBlogPostsForLocale(locale: Locale): Promise<CollectionEntry<'blog'>[]> {
  const allPosts = await getCollection('blog', (entry) => !entry.data.draft);

  // Filter by locale, fallback to English
  const localePosts = allPosts.filter((post) => post.data.locale === locale);
  const enPosts = allPosts.filter((post) => post.data.locale === 'en');

  // Merge: locale posts take precedence, fill gaps with English
  const mergedMap = new Map<string, CollectionEntry<'blog'>>();
  for (const post of enPosts) {
    const slug = post.id.replace(/^en\//, '');
    mergedMap.set(slug, post);
  }
  for (const post of localePosts) {
    const slug = post.id.replace(new RegExp(`^${locale}/`), '');
    mergedMap.set(slug, post);
  }

  return Array.from(mergedMap.values()).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

/**
 * Group docs by category for sidebar navigation.
 */
export function groupDocsByCategory(docs: CollectionEntry<'docs'>[]) {
  const groups: Record<string, CollectionEntry<'docs'>[]> = {
    'getting-started': [],
    concepts: [],
    guides: [],
    'api-reference': [],
  };

  for (const doc of docs) {
    if (groups[doc.data.category]) {
      groups[doc.data.category].push(doc);
    }
  }

  return groups;
}

/**
 * Get a doc slug usable in URLs (strips locale prefix).
 */
export function getDocSlug(entry: CollectionEntry<'docs'>): string {
  return entry.id.replace(/^[a-z]{2}\//, '');
}

/**
 * Get a blog post slug usable in URLs (strips locale prefix).
 */
export function getBlogSlug(entry: CollectionEntry<'blog'>): string {
  return entry.id.replace(/^[a-z]{2}\//, '');
}
