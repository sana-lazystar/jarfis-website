import { useTranslations } from 'next-intl';
import { JARFIS_STATS } from '@/data/stats';

export default function GrowthSection() {
  const t = useTranslations('growth');
  const tSocial = useTranslations('social_proof');

  const stats = [
    { label: tSocial('version_label'), value: JARFIS_STATS.version, accent: 'text-green-500' },
    { label: tSocial('agents_label'), value: String(JARFIS_STATS.agents), accent: 'text-violet-400' },
    { label: tSocial('artifacts_label'), value: String(JARFIS_STATS.artifacts), accent: 'text-amber-400' },
    { label: tSocial('commands_label'), value: String(JARFIS_STATS.commands), accent: 'text-green-500' },
  ];

  const milestones = t.raw('milestones') as Array<{
    version: string;
    title: string;
    description: string;
  }>;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20 border-t border-zinc-800/50">
      <div className="mb-12 text-center">
        <p className="font-mono text-green-500 text-sm mb-3">$ git log --oneline</p>
        <h2 className="font-mono text-3xl font-bold text-zinc-50 tracking-tight">
          {t('title')}
        </h2>
        <p className="mt-3 text-zinc-500 text-sm">{t('subtitle')}</p>
      </div>

      {/* Stats grid */}
      <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 text-center"
          >
            <p className={`font-mono text-2xl font-bold ${stat.accent}`}>{stat.value}</p>
            <p className="mt-1 font-mono text-xs text-zinc-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div
          className="absolute left-6 top-0 bottom-0 w-px bg-zinc-800"
          aria-hidden="true"
        />
        <div className="space-y-8" role="list" aria-label={t('title')}>
          {milestones.map((milestone, index) => (
            <div key={milestone.version} role="listitem" className="flex gap-6 pl-12 relative">
              <div
                className="absolute left-4 top-1.5 h-4 w-4 rounded-full border-2 border-green-500 bg-zinc-900"
                aria-hidden="true"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-sm font-bold text-green-500">
                    {milestone.version}
                  </span>
                  <span className="font-mono text-sm font-semibold text-zinc-200">
                    {milestone.title}
                  </span>
                </div>
                <p className="text-sm text-zinc-500">{milestone.description}</p>
              </div>
              {index === milestones.length - 1 && (
                <span className="font-mono text-xs text-zinc-600 self-center">{t('latest')}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
