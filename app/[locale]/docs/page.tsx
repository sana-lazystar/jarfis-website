import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/config';

interface DocsIndexPageProps {
  params: Promise<{ locale: string }>;
}

const CATEGORIES = [
  {
    key: 'getting_started',
    slug: 'getting-started',
    accentBg: 'rgba(13, 148, 136, 0.15)',
    topBar: 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#5EEAD4"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    key: 'concepts',
    slug: 'concepts-overview',
    accentBg: 'rgba(139, 92, 246, 0.12)',
    topBar: 'linear-gradient(90deg, #8B5CF6, #A78BFA)',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#A78BFA"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
  },
  {
    key: 'api',
    slug: 'api-reference',
    accentBg: 'rgba(251, 191, 36, 0.12)',
    topBar: 'linear-gradient(90deg, var(--color-accent-yellow), #F59E0B)',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FBBF24"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    key: 'guides',
    slug: 'guides-customization',
    accentBg: 'rgba(251, 113, 133, 0.12)',
    topBar: 'linear-gradient(90deg, var(--color-accent), #F472B6)',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FB7185"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
] as const;

const POPULAR_PAGES = [
  {
    slug: 'getting-started',
    labelKey: 'popular_jarfis_work',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
  {
    slug: 'concepts-overview',
    labelKey: 'popular_phase_pipeline',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83" />
      </svg>
    ),
  },
  {
    slug: 'concepts-overview',
    labelKey: 'popular_agent_roles',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
  },
  {
    slug: 'concepts-overview',
    labelKey: 'popular_artifacts',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    slug: 'concepts-overview',
    labelKey: 'popular_human_gates',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    slug: 'api-reference',
    labelKey: 'popular_configuration',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

export default async function DocsIndexPage({ params }: DocsIndexPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('docs');

  return (
    <section
      style={{
        paddingTop: '8rem',
        paddingBottom: '5rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        {/* Hero */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            color: 'var(--color-text-primary)',
          }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-primary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            JARFIS
          </span>{' '}
          {t('landing_title')}
        </h1>
        <p
          style={{
            fontSize: '1.0625rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '520px',
            margin: '0 auto 3.5rem',
            lineHeight: 1.75,
          }}
        >
          {t('landing_subtitle')}
        </p>

        {/* Category Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {CATEGORIES.map((cat) => {
            const categoryData = t.raw(`landing_categories.${cat.key}`) as {
              title: string;
              desc: string;
              link: string;
            };

            return (
              <Link
                key={cat.key}
                href={`/${locale}/docs/${cat.slug}/`}
                style={{
                  background:
                    'linear-gradient(180deg, var(--color-surface), rgba(15, 29, 50, 0.5))',
                  border: '1px solid var(--color-border)',
                  borderRadius: '20px',
                  padding: '2rem 1.75rem',
                  textAlign: 'left',
                  textDecoration: 'none',
                  display: 'block',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                className="docs-category-card-link"
              >
                {/* Top accent bar */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: cat.topBar,
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                  }}
                  className="docs-card-top-bar"
                />

                {/* Icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                    background: cat.accentBg,
                  }}
                >
                  {cat.icon}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {categoryData.title}
                </h3>

                {/* Desc */}
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.65,
                    marginBottom: '1rem',
                  }}
                >
                  {categoryData.desc}
                </p>

                {/* Link label */}
                <span
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--color-primary-light)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                  }}
                >
                  {categoryData.link}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>

        {/* Popular Pages */}
        <div style={{ textAlign: 'left' }}>
          <h3
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
            }}
          >
            {t('popular_title')}
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
            }}
          >
            {POPULAR_PAGES.map((page, idx) => (
              <Link
                key={idx}
                href={`/${locale}/docs/${page.slug}/`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.75rem 1rem',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                className="docs-quick-link"
              >
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(13, 148, 136, 0.1)',
                    color: 'var(--color-primary-light)',
                    flexShrink: 0,
                  }}
                >
                  {page.icon}
                </span>
                <span
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 500,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {t(page.labelKey)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .docs-category-card-link:hover {
          border-color: rgba(13, 148, 136, 0.35) !important;
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }
        .docs-category-card-link:hover .docs-card-top-bar {
          opacity: 1 !important;
        }
        .docs-quick-link:hover {
          border-color: rgba(13, 148, 136, 0.3) !important;
          background: rgba(13, 148, 136, 0.05) !important;
        }
        @media (max-width: 640px) {
          .docs-category-card-link {
            grid-column: span 2;
          }
        }
      `}</style>
    </section>
  );
}

export function generateStaticParams() {
  const locales: Locale[] = ['en', 'ko', 'ja', 'zh'];
  return locales.map((locale) => ({ locale }));
}
