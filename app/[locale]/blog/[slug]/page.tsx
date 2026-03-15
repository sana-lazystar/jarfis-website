import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getMdxContent } from '@/lib/mdx';
import { getBlogPostByLocaleAndSlug, getAllBlogStaticParams } from '@/lib/blog';
import { generateSeoMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogStaticParams();
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = getBlogPostByLocaleAndSlug(locale as Locale, slug);

  if (!result) return {};

  return generateSeoMetadata({
    title: result.frontmatter.title,
    description: result.frontmatter.description,
    locale: locale as Locale,
    path: `/blog/${slug}/`,
    ogImage: result.frontmatter.ogImage || '/images/og/og-blog.png',
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });

  const result = getBlogPostByLocaleAndSlug(locale as Locale, slug);
  if (!result) notFound();

  const { frontmatter, filePath } = result;

  const relativePath = filePath.split('content/')[1];
  const mdxContent = await getMdxContent(relativePath);
  if (!mdxContent) notFound();

  const formattedDate = new Date(frontmatter.pubDate).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <style>{`
        .blog-detail-back {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          color: var(--color-text-muted);
          text-decoration: none;
          font-size: 0.8125rem;
          font-weight: 500;
          margin-bottom: 2rem;
          transition: color 0.3s ease;
        }
        .blog-detail-back:hover { color: var(--color-primary-light); }
      `}</style>

      <section
        style={{
          padding: '10rem 0 6rem',
          background: 'var(--color-neutral-dark)',
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            padding: '0 2rem',
          }}
        >
          {/* Back link */}
          <Link href={`/${locale}/blog/`} className="blog-detail-back">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t('back_to_blog')}
          </Link>

          {/* Meta: date + category */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            <time
              dateTime={frontmatter.pubDate}
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                fontWeight: 500,
              }}
            >
              {formattedDate}
            </time>
            {frontmatter.tags[0] && (
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: 'var(--color-primary-light)',
                  background: 'rgba(13, 148, 136, 0.1)',
                  padding: '0.125rem 0.5rem',
                  borderRadius: 4,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.04em',
                }}
              >
                {frontmatter.tags[0]}
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 800,
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: '1.5rem',
            }}
          >
            {frontmatter.title}
          </h1>

          {/* Tags row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '2.5rem',
              paddingBottom: '2.5rem',
              borderBottom: '1px solid var(--color-border)',
            }}
            role="list"
            aria-label="Tags"
          >
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                role="listitem"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  background: 'rgba(100, 116, 139, 0.1)',
                  border: '1px solid rgba(100, 116, 139, 0.15)',
                  padding: '0.125rem 0.4375rem',
                  borderRadius: 4,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* MDX content */}
          <article className="prose prose-invert max-w-none">
            {mdxContent.content}
          </article>
        </div>
      </section>
    </>
  );
}
