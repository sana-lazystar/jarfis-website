import { useTranslations } from 'next-intl';

const FEATURES = [
  {
    icon: '[>_]',
    titleKey: 'agent_team_title' as const,
    descKey: 'agent_team_desc' as const,
    accent: 'text-green-500',
  },
  {
    icon: '{ai}',
    titleKey: 'claude_code_title' as const,
    descKey: 'claude_code_desc' as const,
    accent: 'text-violet-400',
  },
  {
    icon: '[!!]',
    titleKey: 'artifacts_title' as const,
    descKey: 'artifacts_desc' as const,
    accent: 'text-amber-400',
  },
  {
    icon: '[↻]',
    titleKey: 'learning_title' as const,
    descKey: 'learning_desc' as const,
    accent: 'text-green-500',
  },
];

export default function FeatureCards() {
  const t = useTranslations('value');

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <div className="mb-12 text-center">
        <p className="font-mono text-green-500 text-sm mb-3">$ cat WHY.md</p>
        <h2 className="font-mono text-3xl font-bold text-zinc-50 tracking-tight">
          {t('title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <div
            key={feature.titleKey}
            className="group rounded-lg border border-zinc-800 border-l-2 border-l-green-500/50 bg-zinc-900 p-6 hover:border-zinc-700 hover:border-l-green-500 transition-all"
          >
            <div className={`font-mono text-2xl ${feature.accent} mb-4`} aria-hidden="true">
              {feature.icon}
            </div>
            <h3 className="font-mono text-base font-semibold text-zinc-100 mb-2">
              {t(feature.titleKey)}
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              {t(feature.descKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
