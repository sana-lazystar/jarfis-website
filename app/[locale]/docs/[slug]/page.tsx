import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getMdxContent } from '@/lib/mdx';
import { getDocsByLocale, getDocByLocaleAndSlug, getAllDocStaticParams } from '@/lib/docs';
import { generateSeoMetadata } from '@/lib/seo';
import DocsSidebar from '@/components/docs/DocsSidebar';
import TableOfContents from '@/components/docs/TableOfContents';
import type { Locale } from '@/i18n/config';

interface DocPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllDocStaticParams();
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = getDocByLocaleAndSlug(locale as Locale, slug);

  if (!result) return {};

  return generateSeoMetadata({
    title: result.frontmatter.title,
    description: result.frontmatter.description,
    locale: locale as Locale,
    path: `/docs/${slug}/`,
    ogImage: '/images/og/og-docs.png',
  });
}

export default async function DocPage({ params }: DocPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations('docs');

  const result = getDocByLocaleAndSlug(locale as Locale, slug);
  if (!result) notFound();

  const { frontmatter, filePath } = result;

  // filePath에서 content/ 이후 경로 추출
  const relativePath = filePath.split('content/')[1];
  const mdxContent = await getMdxContent(relativePath);
  if (!mdxContent) notFound();

  const docs = getDocsByLocale(locale as Locale);

  const isFallback = !filePath.includes(`/${locale}/`);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <div className="flex gap-8 lg:gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <DocsSidebar docs={docs} currentSlug={slug} locale={locale} />
        </aside>

        {/* Main Content */}
        <div className="min-w-0 flex-1">
          {isFallback && (
            <div
              className="mb-6 rounded px-4 py-3 text-xs"
              style={{
                border: '1px solid rgba(251, 191, 36, 0.3)',
                background: 'rgba(251, 191, 36, 0.05)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-accent-yellow)',
              }}
            >
              {t('not_translated')}
            </div>
          )}

          <article className="prose prose-invert max-w-none">
            <div className="mb-8">
              <h1
                className="text-3xl font-bold tracking-tight mt-0"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}
              >
                {frontmatter.title}
              </h1>
              <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {frontmatter.description}
              </p>
              {frontmatter.lastUpdated && (
                <p className="text-xs mt-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                  {t('last_updated')}: {frontmatter.lastUpdated}
                </p>
              )}
            </div>
            {mdxContent.content}
          </article>
        </div>

        {/* Table of Contents */}
        <aside className="hidden xl:block w-48 shrink-0">
          <TableOfContents className="sticky top-24" />
        </aside>
      </div>
    </div>
  );
}
