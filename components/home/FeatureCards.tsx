import { getTranslations } from 'next-intl/server';

const CARD_CONFIGS = [
  {
    iconColor: 'rgba(13, 148, 136, 0.15)',
    iconStroke: '#0D9488',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24" aria-hidden="true">
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
      </svg>
    ),
  },
  {
    iconColor: 'rgba(251, 113, 133, 0.12)',
    iconStroke: '#FB7185',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    iconColor: 'rgba(251, 191, 36, 0.12)',
    iconStroke: '#FBBF24',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    iconColor: 'rgba(94, 234, 212, 0.10)',
    iconStroke: '#5EEAD4',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24" aria-hidden="true">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
];

export default async function FeatureCards() {
  const t = await getTranslations('features_home');
  const cards = t.raw('cards') as Array<{ title: string; description: string }>;

  return (
    <section style={{ background: 'var(--color-neutral-darker)', paddingTop: '5rem', paddingBottom: '5rem' }}>
      <style>{`
        .feature-card {
          background: linear-gradient(145deg, var(--color-surface), rgba(15, 29, 50, 0.5));
          border: 1px solid var(--color-border);
          border-radius: 20px;
          padding: 2rem 1.5rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          border-color: rgba(13, 148, 136, 0.35);
          box-shadow: 0 20px 50px rgba(13, 148, 136, 0.1);
        }
      `}</style>

      {/* Top gradient divider */}
      <div
        aria-hidden="true"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-border), transparent)',
          marginBottom: '5rem',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p
            className="mb-3 text-sm font-semibold uppercase"
            style={{ color: 'var(--color-accent-coral)', letterSpacing: '0.08em' }}
          >
            {t('eyebrow')}
          </p>
          <h2
            className="text-3xl font-bold"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.02em' }}
          >
            {t('title')}
          </h2>
        </div>

        {/* 4-column card grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => {
            const config = CARD_CONFIGS[i];
            return (
              <article key={i} className="feature-card">
                {/* Icon */}
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: config.iconColor, color: config.iconStroke }}
                >
                  {config.icon}
                </div>

                <h3
                  className="mb-2 text-base font-semibold"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
