import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { generateSeoMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

interface FeaturesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: FeaturesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return generateSeoMetadata({
    title: 'Features',
    description: t('features_description'),
    locale: locale as Locale,
    path: '/features/',
    ogImage: '/images/og/og-features.png',
  });
}

type AgentKey = 'po' | 'architect' | 'tech_lead' | 'ux' | 'backend' | 'frontend' | 'devops' | 'qa' | 'security';

const AGENT_KEYS: AgentKey[] = [
  'po', 'architect', 'tech_lead', 'ux', 'backend', 'frontend', 'devops', 'qa', 'security'
];

const COMPARE_ROWS = [
  { traditional: 'single_ai', jarfis: 'team' },
  { traditional: 'suggestion', jarfis: 'autonomous' },
  { traditional: 'vendor', jarfis: 'selfhost' },
  { traditional: 'completion', jarfis: 'workflow' },
  { traditional: 'blackbox', jarfis: 'transparent' },
] as const;

const FEATURE_ICON_COLORS = [
  'var(--color-primary-light)',
  'var(--color-accent-coral)',
  'var(--color-accent-yellow)',
  'var(--color-primary-light)',
];

function FeaturesContent({ locale }: { locale: string }) {
  const t = useTranslations('features');

  const featureSections = [
    {
      key: 'agent_team',
      titleKey: 'agent_team_title' as const,
      descKey: 'agent_team_desc' as const,
      bulletsKey: 'agent_team_bullets' as const,
      icon: '[>_]',
    },
    {
      key: 'claude_code',
      titleKey: 'claude_code_title' as const,
      descKey: 'claude_code_desc' as const,
      bulletsKey: 'claude_code_bullets' as const,
      icon: '{cc}',
    },
    {
      key: 'artifacts',
      titleKey: 'artifacts_title' as const,
      descKey: 'artifacts_desc' as const,
      bulletsKey: 'artifacts_bullets' as const,
      icon: '[!!]',
    },
    {
      key: 'learning',
      titleKey: 'learning_title' as const,
      descKey: 'learning_desc' as const,
      bulletsKey: 'learning_bullets' as const,
      icon: '[↻]',
    },
  ] as const;

  return (
    <>
      <style>{`
        .features-agent-card {
          border-radius: 12px;
          border: 1px solid var(--color-border);
          background: linear-gradient(145deg, var(--color-surface), rgba(15, 29, 50, 0.4));
          padding: 1.25rem;
          transition: border-color 0.2s ease;
        }
        .features-agent-card:hover {
          border-color: rgba(13, 148, 136, 0.35);
        }
        .features-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 10px;
          background: var(--color-primary);
          padding: 0.75rem 1.5rem;
          font-family: var(--font-mono);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-text-primary);
          text-decoration: none;
          transition: background 0.2s ease;
        }
        .features-cta-primary:hover { background: #0F9F92; }
        .features-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 10px;
          border: 1px solid var(--color-border);
          padding: 0.75rem 1.5rem;
          font-family: var(--font-mono);
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .features-cta-secondary:hover {
          border-color: rgba(13, 148, 136, 0.5);
          color: var(--color-primary-light);
        }
        .features-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        {/* Page header */}
        <div className="mb-12">
          <p
            className="mb-3 text-sm font-semibold uppercase"
            style={{ color: 'var(--color-primary-light)', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}
          >
            Features
          </p>
          <h1
            className="text-4xl font-bold tracking-tight"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}
          >
            {t('page_title')}
          </h1>
          <p className="mt-3 text-lg" style={{ color: 'var(--color-text-muted)' }}>
            {t('page_subtitle')}
          </p>
        </div>

        {/* Feature sections */}
        <div className="space-y-16 mb-20">
          {featureSections.map((section, index) => {
            const bullets = t.raw(section.bulletsKey) as string[];
            const iconColor = FEATURE_ICON_COLORS[index % FEATURE_ICON_COLORS.length];
            return (
              <div
                key={section.key}
                className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center"
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div
                    className="text-4xl mb-4"
                    style={{ fontFamily: 'var(--font-mono)', color: iconColor }}
                    aria-hidden="true"
                  >
                    {section.icon}
                  </div>
                  <h2
                    className="text-2xl font-bold tracking-tight mb-3"
                    style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}
                  >
                    {t(section.titleKey)}
                  </h2>
                  <p className="leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>
                    {t(section.descKey)}
                  </p>
                  <ul className="space-y-2" role="list">
                    {bullets.map((bullet, i) => (
                      <li key={i} className="features-bullet-item">
                        <span style={{ color: 'var(--color-primary-light)', fontFamily: 'var(--font-mono)', flexShrink: 0, marginTop: '0.125rem' }}>›</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div
                    style={{
                      borderRadius: '16px',
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-surface)',
                      padding: '2rem',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      className="text-8xl"
                      style={{ fontFamily: 'var(--font-mono)', color: iconColor, opacity: 0.2 }}
                      aria-hidden="true"
                    >
                      {section.icon}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="mb-20">
          <h2
            className="text-2xl font-bold tracking-tight mb-8 text-center"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}
          >
            {t('differentiator_title')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th
                    className="px-6 py-3 text-left text-sm"
                    style={{
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-surface)',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {t('traditional')}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-sm"
                    style={{
                      border: '1px solid var(--color-border)',
                      background: 'rgba(13, 148, 136, 0.08)',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-primary-light)',
                    }}
                  >
                    {t('jarfis')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.traditional}>
                    <td
                      className="px-6 py-4 text-sm"
                      style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
                    >
                      <span style={{ color: 'var(--color-accent-coral)', marginRight: '0.5rem' }}>✗</span>
                      {t(`compare.${row.traditional}`)}
                    </td>
                    <td
                      className="px-6 py-4 text-sm"
                      style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}
                    >
                      <span style={{ color: 'var(--color-primary-light)', marginRight: '0.5rem' }}>✓</span>
                      {t(`compare.${row.jarfis}`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p
            className="text-xs mt-3 text-center"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
          >
            {t('footnote')}
          </p>
        </div>

        {/* Agents Section */}
        <div className="mb-16">
          <div className="mb-10 text-center">
            <h2
              className="text-2xl font-bold tracking-tight"
              style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}
            >
              {t('agents_section_title')}
            </h2>
            <p className="mt-3 text-sm max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              {t('agents_section_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AGENT_KEYS.map((agentKey) => {
              const agent = t.raw(`agents.${agentKey}`) as {
                name: string;
                abbr: string;
                desc: string;
                tags: string[];
              };

              return (
                <div key={agentKey} className="features-agent-card">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-xs font-bold px-2 py-1 rounded"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        background: 'rgba(13, 148, 136, 0.12)',
                        color: 'var(--color-primary-light)',
                        border: '1px solid rgba(13, 148, 136, 0.2)',
                      }}
                    >
                      {agent.abbr}
                    </span>
                    <h3
                      className="text-sm font-semibold"
                      style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}
                    >
                      {agent.name}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--color-text-muted)' }}>
                    {agent.desc}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {agent.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-1.5 py-0.5 rounded"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          background: 'rgba(251, 113, 133, 0.08)',
                          color: 'var(--color-accent-coral)',
                          border: '1px solid rgba(251, 113, 133, 0.15)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div
          className="text-center p-12"
          style={{
            borderRadius: '20px',
            border: '1px solid var(--color-border)',
            background: 'linear-gradient(145deg, var(--color-surface), rgba(15, 29, 50, 0.4))',
          }}
        >
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}
          >
            {t('cta_heading')}
          </h2>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href={`/${locale}/docs/`} className="features-cta-primary">
              {t('learn_more')}
            </Link>
            <a
              href="https://github.com/sana-lazystar/jarfis"
              target="_blank"
              rel="noopener noreferrer"
              className="features-cta-secondary"
            >
              {t('view_github')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default async function FeaturesPage({ params }: FeaturesPageProps) {
  const { locale } = await params;
  return <FeaturesContent locale={locale} />;
}
