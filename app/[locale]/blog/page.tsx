import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { getBlogPostsByLocale } from '@/lib/blog';
import { generateSeoMetadata } from '@/lib/seo';
import EmptyState from '@/components/blog/EmptyState';
import type { Locale } from '@/i18n/config';

interface BlogListPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BlogListPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return generateSeoMetadata({
    title: 'Blog',
    description: t('blog_description'),
    locale: locale as Locale,
    path: '/blog/',
    ogImage: '/images/og/og-blog.png',
  });
}

// Thumb gradient variants — cycled per post
const thumbVariants = [
  'radial-gradient(circle at 30% 50%, rgba(13, 148, 136, 0.15) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(94, 234, 212, 0.08) 0%, transparent 50%)',
  'radial-gradient(circle at 50% 40%, rgba(251, 113, 133, 0.12) 0%, transparent 60%), radial-gradient(circle at 30% 70%, rgba(251, 191, 36, 0.08) 0%, transparent 50%)',
  'radial-gradient(circle at 60% 30%, rgba(94, 234, 212, 0.12) 0%, transparent 50%), radial-gradient(circle at 40% 70%, rgba(13, 148, 136, 0.1) 0%, transparent 60%)',
  'radial-gradient(circle at 40% 60%, rgba(251, 191, 36, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(251, 113, 133, 0.08) 0%, transparent 50%)',
];

// Icon color variants
type IconVariant = 'teal' | 'coral' | 'yellow';
const iconVariants: IconVariant[] = ['teal', 'coral', 'teal', 'yellow'];

const iconColors: Record<IconVariant, { bg: string; color: string }> = {
  teal: { bg: 'rgba(13, 148, 136, 0.2)', color: 'var(--color-primary-light)' },
  coral: { bg: 'rgba(251, 113, 133, 0.15)', color: 'var(--color-accent-coral)' },
  yellow: { bg: 'rgba(251, 191, 36, 0.15)', color: 'var(--color-accent-yellow)' },
};

// Thumb icons per index
function ThumbIcon({ index }: { index: number }) {
  const icons = [
    // Sun / rays (teal)
    <svg key="sun" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>,
    // Users (coral)
    <svg key="users" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>,
    // Code (teal)
    <svg key="code" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>,
    // Shield (yellow)
    <svg key="shield" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>,
  ];
  return icons[index % icons.length];
}

export default async function BlogListPage({ params }: BlogListPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });

  const posts = getBlogPostsByLocale(locale as Locale);

  return (
    <>
      <style>{`
        .blog-card {
          background: linear-gradient(180deg, var(--color-surface), rgba(15, 29, 50, 0.5));
          border: 1px solid var(--color-border);
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      border-color 0.4s ease,
                      box-shadow 0.4s ease;
          text-decoration: none;
          display: block;
          color: inherit;
        }
        .blog-card:hover {
          border-color: rgba(13, 148, 136, 0.4);
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3), 0 0 30px rgba(13, 148, 136, 0.08);
        }
        @media (max-width: 768px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Hero */}
      <section
        style={{
          padding: '10rem 0 4rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background gradients */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 40% 30%, rgba(251, 113, 133, 0.06) 0%, transparent 50%), radial-gradient(circle at 60% 70%, rgba(13, 148, 136, 0.08) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
          {/* Eyebrow */}
          <p
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--color-accent-coral)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.75rem',
            }}
          >
            {t('eyebrow')}
          </p>

          {/* Title */}
          <h1
            style={{
              fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: '1rem',
            }}
          >
            {t('page_title')}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '1.125rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.75,
              maxWidth: 480,
              margin: '0 auto',
            }}
          >
            {t('page_subtitle')}
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section style={{ padding: '0 0 6rem', background: 'var(--color-neutral-dark)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
          {posts.length === 0 ? (
            <EmptyState
              title={t('empty_title')}
              description={t('empty_desc')}
              followLabel={t('follow_github')}
              watchLabel={t('watch_repo')}
            />
          ) : (
            <div
              className="blog-grid"
              role="feed"
              aria-label={t('page_title')}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem',
              }}
            >
              {posts.map((post, idx) => {
                const variant = iconVariants[idx % iconVariants.length];
                const iconStyle = iconColors[variant];
                const formattedDate = new Date(post.pubDate).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                });

                return (
                  <Link
                    key={post.slug}
                    href={`/${locale}/blog/${post.slug}/`}
                    className="blog-card"
                    aria-label={post.title}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        width: '100%',
                        height: 200,
                        background: 'var(--color-neutral-darker)',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: thumbVariants[idx % thumbVariants.length],
                        }}
                      />
                      {/* Icon */}
                      <div
                        aria-hidden="true"
                        style={{
                          position: 'relative',
                          zIndex: 1,
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: iconStyle.bg,
                          color: iconStyle.color,
                        }}
                      >
                        <ThumbIcon index={idx} />
                      </div>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '1.5rem' }}>
                      {/* Meta: date + category */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          marginBottom: '0.75rem',
                        }}
                      >
                        <time
                          dateTime={post.pubDate}
                          style={{
                            fontSize: '0.75rem',
                            color: 'var(--color-text-muted)',
                            fontWeight: 500,
                          }}
                        >
                          {formattedDate}
                        </time>
                        {post.tags[0] && (
                          <span
                            style={{
                              fontSize: '0.6875rem',
                              fontWeight: 600,
                              color: 'var(--color-primary-light)',
                              background: 'rgba(13, 148, 136, 0.1)',
                              padding: '0.125rem 0.5rem',
                              borderRadius: 4,
                              textTransform: 'uppercase',
                              letterSpacing: '0.04em',
                            }}
                          >
                            {post.tags[0]}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2
                        style={{
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          color: 'var(--color-text-primary)',
                          marginBottom: '0.5rem',
                          lineHeight: 1.4,
                        }}
                      >
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--color-text-muted)',
                          lineHeight: 1.65,
                          marginBottom: '1rem',
                        }}
                      >
                        {post.description}
                      </p>

                      {/* Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
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
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
