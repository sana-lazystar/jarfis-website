import { getTranslations } from 'next-intl/server';

export default async function QuickstartSection() {
  const t = await getTranslations('quickstart');
  const steps = t.raw('steps') as Array<{ label: string }>;

  return (
    <section style={{ background: 'var(--color-neutral-dark)', paddingTop: '5rem', paddingBottom: '5rem' }}>
      <style>{`
        .qs-step {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          border: 1px solid var(--color-border);
          background: linear-gradient(135deg, var(--color-surface), rgba(15, 29, 50, 0.4));
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .qs-step:hover {
          border-color: rgba(13, 148, 136, 0.4);
          transform: translateX(4px);
        }
        .qs-terminal {
          background: #070F1E;
          border: 1px solid var(--color-border);
          border-radius: 16px;
          overflow: hidden;
          font-family: var(--font-mono);
        }
        .qs-terminal-bar {
          padding: 0.75rem 1rem;
          background: rgba(26, 44, 71, 0.6);
          border-bottom: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .qs-terminal-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .qs-terminal-body {
          padding: 1.5rem;
          font-size: 0.8125rem;
          line-height: 1.7;
        }
        .qs-cursor {
          display: inline-block;
          width: 8px;
          height: 1em;
          background: var(--color-primary-light);
          vertical-align: text-bottom;
          animation: cursor-blink 1s step-end infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .qs-step:hover { transform: none; }
          .qs-cursor { animation: none; opacity: 1; }
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

        {/* 2-col: steps left, terminal right */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          {/* Left: numbered step list */}
          <div className="flex flex-col gap-3" role="list">
            {steps.map((step, i) => (
              <div key={i} className="qs-step" role="listitem">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    background: 'rgba(13, 148, 136, 0.15)',
                    color: 'var(--color-primary-light)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Right: CSS terminal mockup */}
          <div className="qs-terminal" role="img" aria-label="JARFIS terminal example">
            {/* Title bar */}
            <div className="qs-terminal-bar">
              <span className="qs-terminal-dot" style={{ background: '#FB7185' }} aria-hidden="true"/>
              <span className="qs-terminal-dot" style={{ background: '#FBBF24' }} aria-hidden="true"/>
              <span className="qs-terminal-dot" style={{ background: '#5EEAD4' }} aria-hidden="true"/>
              <span
                className="ml-auto text-xs"
                style={{ color: 'var(--color-text-muted)' }}
              >
                jarfis -- zsh -- 80x24
              </span>
            </div>

            {/* Terminal body */}
            <div className="qs-terminal-body">
              {/* Prompt line */}
              <p>
                <span style={{ color: 'var(--color-primary-light)' }}>❯ </span>
                <span style={{ color: 'var(--color-text-primary)' }}>{t('terminal_prompt').replace(/^\$ /, '')}</span>
              </p>

              {/* Output lines */}
              <p style={{ color: 'var(--color-accent-yellow)', marginTop: '0.5rem' }}>
                {t('terminal_output_1')}
              </p>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                {t('terminal_output_2')}
              </p>

              {/* Animated output lines */}
              <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                {t('terminal_output_3')}
              </p>
              <p style={{ color: 'var(--color-primary-light)', marginTop: '0.25rem' }}>
                {t('terminal_output_4')}
              </p>
              <p style={{ color: 'var(--color-accent-coral)', marginTop: '0.25rem' }}>
                {t('terminal_output_5')}
              </p>

              {/* Cursor line */}
              <p style={{ marginTop: '0.5rem' }}>
                <span style={{ color: 'var(--color-primary-light)' }}>❯ </span>
                <span className="qs-cursor" aria-hidden="true"/>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
