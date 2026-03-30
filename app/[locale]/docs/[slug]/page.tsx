import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getMdxContent } from '@/lib/mdx';
import { getDocsByLocale, getDocByLocaleAndSlug, getAllDocStaticParams } from '@/lib/docs';
import { generateSeoMetadata } from '@/lib/seo';
import DocsSidebar from '@/components/docs/DocsSidebar';
import DocsDrawer from '@/components/docs/DocsDrawer';
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
  setRequestLocale(locale);
  const t = await getTranslations('docs');
  const tA11y = await getTranslations('a11y');

  const result = getDocByLocaleAndSlug(locale as Locale, slug);
  if (!result) notFound();

  const { frontmatter, filePath } = result;

  // filePath에서 content/ 이후 경로 추출
  const relativePath = filePath.split('content/')[1];
  const mdxContent = await getMdxContent(relativePath);
  if (!mdxContent) notFound();

  const docs = getDocsByLocale(locale as Locale);

  const isFallback = !filePath.includes(`/${locale}/`);

  // prev / next 계산
  const currentIndex = docs.findIndex((d) => d.slug === slug);
  const prevDoc = currentIndex > 0 ? docs[currentIndex - 1] : null;
  const nextDoc = currentIndex < docs.length - 1 ? docs[currentIndex + 1] : null;

  // breadcrumb: category label (getting-started → getting_started, api-reference → api_reference)
  const categoryKey = frontmatter.category.replace(/-/g, '_');
  const categoryLabel = t(`categories.${categoryKey}`);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-8">
      <div className="flex gap-8 lg:gap-12">
        {/* Desktop Sidebar (lg 이상에서만 표시) */}
        <aside className="hidden lg:block w-56 shrink-0">
          <DocsSidebar docs={docs} currentSlug={slug} locale={locale} />
        </aside>

        {/* Main Content */}
        <div className="min-w-0 flex-1">
          {/* Breadcrumb + Drawer 토글 버튼 (모바일/태블릿) */}
          <div className="flex items-center gap-3 mb-8">
            {/* Drawer 토글 버튼 — lg:hidden은 DocsDrawer 내부에서 처리 */}
            <DocsDrawer
              openLabel={tA11y('open_nav')}
              closeLabel={tA11y('close_nav')}
            >
              <DocsSidebar docs={docs} currentSlug={slug} locale={locale} isDrawer />
            </DocsDrawer>

            {/* Breadcrumb — overflow: 중간 생략 (Home > ... > Current) */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 min-w-0 flex-1"
              style={{
                fontSize: '0.8125rem',
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {/* Home(Docs) 링크: 항상 표시 */}
              <Link
                href={`/${locale}/docs/`}
                style={{ color: 'var(--color-text-muted)', textDecoration: 'none', whiteSpace: 'nowrap' }}
                className="breadcrumb-link shrink-0"
              >
                {t('sidebar_title')}
              </Link>
              <span style={{ color: 'var(--color-border)' }} className="shrink-0">/</span>

              {/* 카테고리: 모바일에서는 생략 (...) */}
              <span
                className="hidden sm:inline shrink-0"
                style={{ color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}
              >
                {categoryLabel}
              </span>
              <span
                className="hidden sm:inline shrink-0"
                style={{ color: 'var(--color-border)' }}
              >
                /
              </span>
              {/* 모바일 전용 생략 표시 */}
              <span
                className="sm:hidden shrink-0"
                style={{ color: 'var(--color-text-muted)' }}
                aria-hidden="true"
              >
                ...
              </span>
              <span
                className="sm:hidden shrink-0"
                style={{ color: 'var(--color-border)' }}
              >
                /
              </span>

              {/* 현재 페이지: 항상 표시, overflow 시 truncate */}
              <span
                className="truncate"
                style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}
              >
                {frontmatter.title}
              </span>
            </nav>
          </div>

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
                <p
                  className="text-xs mt-2"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                >
                  {t('last_updated')}: {frontmatter.lastUpdated}
                </p>
              )}
            </div>
            {mdxContent.content}
          </article>

          {/* Prev / Next Navigation — 모바일: 1열 스택, md 이상: 2열 grid */}
          {(prevDoc || nextDoc) && (
            <nav
              aria-label="Document navigation"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 pt-8"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              {prevDoc ? (
                <Link
                  href={`/${locale}/docs/${prevDoc.slug}/`}
                  style={{
                    display: 'block',
                    padding: '1rem 1.25rem',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  className="doc-nav-link"
                >
                  <div
                    style={{
                      fontSize: '0.6875rem',
                      color: 'var(--color-text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '0.25rem',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {t('prev_page')}
                  </div>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--color-primary-light)',
                    }}
                  >
                    {prevDoc.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextDoc ? (
                <Link
                  href={`/${locale}/docs/${nextDoc.slug}/`}
                  style={{
                    display: 'block',
                    padding: '1rem 1.25rem',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    textAlign: 'right',
                    transition: 'all 0.3s ease',
                  }}
                  className="doc-nav-link"
                >
                  <div
                    style={{
                      fontSize: '0.6875rem',
                      color: 'var(--color-text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '0.25rem',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {t('next_page')}
                  </div>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--color-primary-light)',
                    }}
                  >
                    {nextDoc.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          )}
        </div>

        {/* Table of Contents */}
        <aside className="hidden xl:block w-48 shrink-0">
          <TableOfContents className="sticky top-24" />
        </aside>
      </div>

      <style>{`
        .breadcrumb-link:hover {
          color: var(--color-primary-light) !important;
        }
        .doc-nav-link:hover {
          border-color: rgba(13, 148, 136, 0.3) !important;
          background: rgba(13, 148, 136, 0.05) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          /* DocsDrawer 내 transition 비활성화 */
          [role="dialog"] { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
