import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getShowcaseItems } from '@/lib/showcase';
import { generateSeoMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';
import { withBasePath } from '@/lib/paths';

interface ShowcasePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ShowcasePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return generateSeoMetadata({
    title: 'Showcase',
    description: t('showcase_description'),
    locale: locale as Locale,
    path: '/showcase/',
    ogImage: '/images/og/og-showcase.png',
  });
}

// GitHub SVG icon
function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ExternalLinkIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function StarIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// Placeholder thumbnail icons for cards without real screenshots
const thumbIcons = [
  // Monitor / website
  <svg key="monitor" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8" /><path d="M12 17v4" />
  </svg>,
  // Code
  <svg key="code" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>,
  // Book
  <svg key="book" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>,
  // Chat
  <svg key="chat" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>,
  // Shield
  <svg key="shield" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>,
];

export default async function ShowcasePage({ params }: ShowcasePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'showcase' });

  const items = getShowcaseItems();
  // Sort: featured first
  const sortedItems = [...items].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <>
      <style>{`
        @keyframes badge-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }
        .showcase-card {
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
        .showcase-card:hover {
          border-color: rgba(13, 148, 136, 0.4);
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3), 0 0 30px rgba(13, 148, 136, 0.08);
        }
        .project-link-btn {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          transition: color 0.3s ease;
        }
        .project-link-btn:hover { color: var(--color-primary-light); }
        .btn-primary-showcase {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, var(--color-primary), #0F766E);
          color: white;
          font-size: 0.9375rem;
          font-weight: 600;
          padding: 0.8125rem 1.75rem;
          border-radius: 100px;
          text-decoration: none;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          box-shadow: 0 4px 15px rgba(13, 148, 136, 0.25);
        }
        .btn-primary-showcase:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(13, 148, 136, 0.4);
        }
        .btn-ghost-showcase {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          color: var(--color-text-secondary);
          font-size: 0.9375rem;
          font-weight: 500;
          padding: 0.8125rem 1.5rem;
          border-radius: 100px;
          text-decoration: none;
          border: 1px solid var(--color-border);
          transition: color 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }
        .btn-ghost-showcase:hover {
          color: var(--color-primary-light);
          border-color: var(--color-primary);
          background: rgba(13, 148, 136, 0.05);
        }
        @media (max-width: 1024px) {
          .showcase-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .showcase-card-featured { grid-column: span 2 !important; }
        }
        @media (max-width: 768px) {
          .showcase-grid { grid-template-columns: 1fr !important; }
          .showcase-card-featured { grid-column: span 1 !important; }
          .showcase-card-featured .showcase-thumb { height: 180px !important; }
          .showcase-cta-actions { flex-direction: column; align-items: center; }
        }
        @media (max-width: 640px) {
          .showcase-cta-card { padding: 2.5rem 1.5rem !important; }
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
        {/* Background radial gradients */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 30% 40%, rgba(13, 148, 136, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(251, 113, 133, 0.05) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
          {/* Badge / Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.375rem 1rem',
              background: 'rgba(13, 148, 136, 0.12)',
              border: '1px solid rgba(13, 148, 136, 0.25)',
              borderRadius: 100,
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: 'var(--color-primary-light)',
              marginBottom: '1.75rem',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 7,
                height: 7,
                background: 'var(--color-primary-light)',
                borderRadius: '50%',
                animation: 'badge-pulse 2s ease-in-out infinite',
                display: 'inline-block',
              }}
            />
            {t('eyebrow')}
          </div>

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
            {t('page_title').split('JARFIS').map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-primary))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    JARFIS
                  </span>
                </span>
              ) : part
            )}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '1.125rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.75,
              maxWidth: 520,
              margin: '0 auto',
            }}
          >
            {t('page_subtitle')}
          </p>
        </div>
      </section>

      {/* Project Grid */}
      <section style={{ padding: '0 0 5rem', background: 'var(--color-neutral-dark)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
          {sortedItems.length === 0 ? (
            /* Empty state */
            <div
              style={{
                textAlign: 'center',
                padding: '5rem 2rem',
                border: '1px dashed var(--color-border)',
                borderRadius: 20,
              }}
            >
              <p
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: '0.75rem',
                }}
              >
                {t('empty_title')}
              </p>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', maxWidth: 480, margin: '0 auto' }}>
                {t('empty_desc')}
              </p>
            </div>
          ) : (
            <div
              className="showcase-grid"
              role="list"
              aria-label={t('page_title')}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
              }}
            >
              {sortedItems.map((item, idx) => (
                <div
                  key={item.id}
                  role="listitem"
                  className={item.featured ? 'showcase-card-featured' : ''}
                  style={item.featured ? { gridColumn: 'span 2' } : {}}
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="showcase-card"
                    aria-label={item.name}
                  >
                    {/* Thumbnail */}
                    <div
                      className="showcase-thumb"
                      style={{
                        width: '100%',
                        height: item.featured ? 240 : 180,
                        background: 'var(--color-neutral-darker)',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.thumbnail ? (
                        <img
                          src={withBasePath(item.thumbnail)}
                          alt={item.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <>
                          <div
                            aria-hidden="true"
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background:
                                'radial-gradient(circle at 30% 40%, rgba(13, 148, 136, 0.12) 0%, transparent 60%), radial-gradient(circle at 70% 60%, rgba(251, 113, 133, 0.06) 0%, transparent 60%)',
                            }}
                          />
                          <div
                            style={{
                              position: 'relative',
                              zIndex: 1,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: '0.5rem',
                              color: 'var(--color-text-muted)',
                              fontSize: '0.75rem',
                              opacity: 0.4,
                            }}
                            aria-hidden="true"
                          >
                            {thumbIcons[idx % thumbIcons.length]}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Body */}
                    <div style={{ padding: '1.5rem' }}>
                      {/* Featured badge */}
                      {item.featured && (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            padding: '0.25rem 0.625rem',
                            background: 'rgba(251, 113, 133, 0.12)',
                            border: '1px solid rgba(251, 113, 133, 0.25)',
                            borderRadius: 100,
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            color: 'var(--color-accent-coral)',
                            marginBottom: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          <StarIcon size={10} />
                          {t('featured_badge')}
                        </div>
                      )}

                      {/* Name */}
                      <h2
                        style={{
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          color: 'var(--color-text-primary)',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {item.name}
                      </h2>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--color-text-muted)',
                          lineHeight: 1.65,
                          marginBottom: '1rem',
                        }}
                      >
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.375rem',
                          marginBottom: '1rem',
                        }}
                      >
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.6875rem',
                              fontWeight: 500,
                              color: 'var(--color-primary-light)',
                              background: 'rgba(13, 148, 136, 0.1)',
                              border: '1px solid rgba(13, 148, 136, 0.2)',
                              padding: '0.1875rem 0.5rem',
                              borderRadius: 6,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <span className="project-link-btn">
                          <ExternalLinkIcon size={14} />
                          {t('view_project')}
                        </span>
                        {item.repoUrl && (
                          <>
                            <span
                              aria-hidden="true"
                              style={{
                                width: 1,
                                height: 14,
                                background: 'var(--color-border)',
                                display: 'inline-block',
                              }}
                            />
                            <span className="project-link-btn">
                              <GitHubIcon size={14} />
                              {t('view_source')}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Submit CTA */}
      <section style={{ padding: '0 0 6rem', background: 'var(--color-neutral-dark)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
          <div
            className="showcase-cta-card"
            style={{
              background: 'linear-gradient(180deg, var(--color-surface), rgba(15, 29, 50, 0.5))',
              border: '1px solid var(--color-border)',
              borderRadius: 24,
              padding: '3.5rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top glow */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 0%, rgba(13, 148, 136, 0.08) 0%, transparent 50%)',
                pointerEvents: 'none',
              }}
            />

            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '0.75rem',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {t('cta_title')}
            </h2>
            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--color-text-secondary)',
                maxWidth: 420,
                margin: '0 auto 2rem',
                lineHeight: 1.7,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {t('cta_desc')}
            </p>

            <div
              className="showcase-cta-actions"
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <a
                href="https://github.com/sana-lazystar/jarfis/issues/new?template=showcase-submission.md"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-showcase"
              >
                <GitHubIcon size={16} />
                {t('cta_submit')}
              </a>
              <a
                href="https://github.com/sana-lazystar/jarfis/blob/main/docs/showcase-guide.md"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-showcase"
              >
                {t('cta_guide')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
