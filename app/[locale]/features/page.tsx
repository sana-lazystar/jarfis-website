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

function FeaturesContent({ locale }: { locale: string }) {
  const t = useTranslations('features');

  const featureSections = [
    {
      key: 'agent_team',
      titleKey: 'agent_team_title' as const,
      descKey: 'agent_team_desc' as const,
      bulletsKey: 'agent_team_bullets' as const,
      icon: '[>_]',
      accent: 'text-green-500',
    },
    {
      key: 'claude_code',
      titleKey: 'claude_code_title' as const,
      descKey: 'claude_code_desc' as const,
      bulletsKey: 'claude_code_bullets' as const,
      icon: '{cc}',
      accent: 'text-violet-400',
    },
    {
      key: 'artifacts',
      titleKey: 'artifacts_title' as const,
      descKey: 'artifacts_desc' as const,
      bulletsKey: 'artifacts_bullets' as const,
      icon: '[!!]',
      accent: 'text-amber-400',
    },
    {
      key: 'learning',
      titleKey: 'learning_title' as const,
      descKey: 'learning_desc' as const,
      bulletsKey: 'learning_bullets' as const,
      icon: '[↻]',
      accent: 'text-green-500',
    },
  ] as const;

  return (
    <>
      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="mb-12">
          <p className="font-mono text-green-500 text-sm mb-3">$ jarfis features --list</p>
          <h1 className="font-mono text-4xl font-bold text-zinc-50 tracking-tight">
            {t('page_title')}
          </h1>
          <p className="mt-3 text-zinc-500 text-lg">{t('page_subtitle')}</p>
        </div>

        {/* Feature sections */}
        <div className="space-y-16 mb-20">
          {featureSections.map((section, index) => {
            const bullets = t.raw(section.bulletsKey) as string[];
            return (
              <div
                key={section.key}
                className={`grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`font-mono text-4xl ${section.accent} mb-4`} aria-hidden="true">
                    {section.icon}
                  </div>
                  <h2 className="font-mono text-2xl font-bold text-zinc-50 tracking-tight mb-3">
                    {t(section.titleKey)}
                  </h2>
                  <p className="text-zinc-500 leading-relaxed mb-4">{t(section.descKey)}</p>
                  <ul className="space-y-2" role="list">
                    {bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                        <span className="text-green-500 font-mono shrink-0 mt-0.5">›</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8">
                    <div className={`font-mono text-8xl ${section.accent} text-center opacity-20`} aria-hidden="true">
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
          <h2 className="font-mono text-2xl font-bold text-zinc-50 tracking-tight mb-8 text-center">
            {t('differentiator_title')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-zinc-700 bg-zinc-800 px-6 py-3 font-mono text-sm text-zinc-400 text-left">
                    {t('traditional')}
                  </th>
                  <th className="border border-zinc-700 bg-green-500/10 px-6 py-3 font-mono text-sm text-green-500 text-left">
                    {t('jarfis')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.traditional}>
                    <td className="border border-zinc-800 px-6 py-4 text-sm text-zinc-500">
                      <span className="text-red-400 mr-2">✗</span>
                      {t(`compare.${row.traditional}`)}
                    </td>
                    <td className="border border-zinc-800 px-6 py-4 text-sm text-zinc-300">
                      <span className="text-green-500 mr-2">✓</span>
                      {t(`compare.${row.jarfis}`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-mono text-xs text-zinc-600 mt-3 text-center">{t('footnote')}</p>
        </div>

        {/* Agents Section */}
        <div className="mb-16">
          <div className="mb-10 text-center">
            <h2 className="font-mono text-2xl font-bold text-zinc-50 tracking-tight">
              {t('agents_section_title')}
            </h2>
            <p className="mt-3 text-zinc-500 text-sm max-w-2xl mx-auto">
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
                <div
                  key={agentKey}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs font-bold bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-1 rounded">
                      {agent.abbr}
                    </span>
                    <h3 className="font-mono text-sm font-semibold text-zinc-200">{agent.name}</h3>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-3">{agent.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {agent.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-1.5 py-0.5 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded"
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
        <div className="text-center rounded-lg border border-zinc-800 bg-zinc-900 p-12">
          <h2 className="font-mono text-2xl font-bold text-zinc-50 mb-4">{t('cta_heading')}</h2>
          <div className="flex items-center justify-center gap-4">
            <Link
              href={`/${locale}/docs/`}
              className="inline-flex items-center gap-2 rounded bg-green-500 px-6 py-3 font-mono text-sm font-bold text-black hover:bg-green-400 transition-colors"
            >
              {t('learn_more')}
            </Link>
            <a
              href="https://github.com/sana-lazystar/jarfis"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-zinc-600 px-6 py-3 font-mono text-sm text-zinc-300 hover:border-green-500 hover:text-green-500 transition-colors"
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
