import { getTranslations } from 'next-intl/server';

// 9 philosophy icons — in order
const ICONS = [
  // 1. Orchestration for All — users
  <svg key="users" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>,
  // 2. Token Austerity — cost/diamond
  <svg key="cost" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22" aria-hidden="true">
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
    <line x1="12" y1="22" x2="12" y2="15.5"/>
    <polyline points="22 8.5 12 15.5 2 8.5"/>
  </svg>,
  // 3. Self-Evolution — sun
  <svg key="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22" aria-hidden="true">
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>,
  // 4. Dialectic Quality — speech bubble
  <svg key="chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>,
  // 5. AI-Native Artifacts — code
  <svg key="code" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22" aria-hidden="true">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>,
  // 6. Abstraction over Memorization — book
  <svg key="book" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>,
  // 7. Deterministic Foundation — grid
  <svg key="grid" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
  </svg>,
  // 8. Human Gate AI Execute — shield + check
  <svg key="shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>,
  // 9. Resilient Continuity — refresh
  <svg key="refresh" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22" aria-hidden="true">
    <polyline points="23 4 23 10 17 10"/>
    <polyline points="1 20 1 14 7 14"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </svg>,
];

// Colors for 9 cards: teal, coral, yellow, mint, teal, coral, yellow, mint, teal
const CARD_COLORS = [
  { iconBg: 'rgba(13, 148, 136, 0.15)', iconColor: '#0D9488' },
  { iconBg: 'rgba(251, 113, 133, 0.12)', iconColor: '#FB7185' },
  { iconBg: 'rgba(251, 191, 36, 0.12)', iconColor: '#FBBF24' },
  { iconBg: 'rgba(94, 234, 212, 0.10)', iconColor: '#5EEAD4' },
  { iconBg: 'rgba(13, 148, 136, 0.15)', iconColor: '#0D9488' },
  { iconBg: 'rgba(251, 113, 133, 0.12)', iconColor: '#FB7185' },
  { iconBg: 'rgba(251, 191, 36, 0.12)', iconColor: '#FBBF24' },
  { iconBg: 'rgba(94, 234, 212, 0.10)', iconColor: '#5EEAD4' },
  { iconBg: 'rgba(13, 148, 136, 0.15)', iconColor: '#0D9488' },
];

export default async function PhilosophyGrid() {
  const t = await getTranslations('philosophy');
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  return (
    <section style={{ background: 'var(--color-neutral-dark)', paddingTop: '5rem', paddingBottom: '5rem' }}>
      <style>{`
        .phil-card {
          background: linear-gradient(145deg, var(--color-surface), rgba(15, 29, 50, 0.5));
          border: 1px solid var(--color-border);
          border-radius: 20px;
          padding: 1.5rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .phil-card:hover {
          transform: translateY(-4px);
          border-color: rgba(13, 148, 136, 0.3);
          box-shadow: 0 12px 40px rgba(13, 148, 136, 0.08);
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p
            className="mb-3 text-sm font-semibold uppercase"
            style={{ color: 'var(--color-primary-light)', letterSpacing: '0.08em' }}
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

        {/* 3×3 grid */}
        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label={t('title')}
        >
          {items.map((item, i) => {
            const color = CARD_COLORS[i] || CARD_COLORS[0];
            return (
              <article key={i} className="phil-card" role="listitem">
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full shrink-0"
                    style={{ background: color.iconBg, color: color.iconColor }}
                  >
                    {ICONS[i]}
                  </div>
                  <h3
                    className="text-sm font-semibold leading-snug"
                    style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
