import { getTranslations } from 'next-intl/server';

export default async function GrowthSection() {
  const t = await getTranslations('growth');
  const stats = t.raw('stats') as Array<{ value: string; label: string }>;

  return (
    <section style={{ background: 'var(--color-neutral-darker)', paddingTop: '5rem', paddingBottom: '5rem' }}>
      <style>{`
        .growth-stat-card {
          background: linear-gradient(145deg, var(--color-surface), rgba(15, 29, 50, 0.4));
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: 1.75rem 1.5rem;
          text-align: center;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .growth-stat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(13, 148, 136, 0.35);
        }
        .draw-curve {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: draw-curve 2.4s ease-out forwards;
        }
        .now-pulse {
          animation: now-pulse-r 2s ease-in-out infinite;
        }
        .now-fade {
          animation: now-pulse-opacity 2s ease-in-out infinite;
        }
        @keyframes now-pulse-r {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.33); }
        }
        @keyframes now-pulse-opacity {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .draw-curve { animation: none; stroke-dashoffset: 0; }
          .now-pulse { animation: none; }
          .now-fade { animation: none; }
          .growth-stat-card:hover { transform: none; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p
            className="mb-3 text-sm font-semibold uppercase"
            style={{ color: 'var(--color-accent-yellow)', letterSpacing: '0.08em' }}
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

        {/* 2-col grid: left stats, right curve */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: 3 stat cards stacked */}
          <div className="flex flex-col gap-4">
            {stats.map((stat, i) => {
              const colors = ['var(--color-primary-light)', 'var(--color-accent-coral)', 'var(--color-accent-yellow)'];
              return (
                <div key={i} className="growth-stat-card">
                  <p
                    className="text-4xl font-bold mb-1"
                    style={{ color: colors[i % colors.length], fontFamily: 'var(--font-mono)' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Growth curve SVG */}
          <div aria-hidden="true">
            <svg
              viewBox="0 0 480 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', height: 'auto' }}
            >
              <defs>
                <linearGradient id="gc-curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0D9488" stopOpacity="0.3"/>
                  <stop offset="60%" stopColor="#5EEAD4" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#5EEAD4" stopOpacity="1"/>
                </linearGradient>
                <linearGradient id="gc-areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0D9488" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="#0D9488" stopOpacity="0"/>
                </linearGradient>
                {/* Grid lines */}
              </defs>

              {/* Background grid */}
              <g stroke="rgba(26,44,71,0.8)" strokeWidth="1">
                <line x1="0" y1="56" x2="480" y2="56"/>
                <line x1="0" y1="112" x2="480" y2="112"/>
                <line x1="0" y1="168" x2="480" y2="168"/>
                <line x1="0" y1="224" x2="480" y2="224"/>
                <line x1="80" y1="0" x2="80" y2="280"/>
                <line x1="160" y1="0" x2="160" y2="280"/>
                <line x1="240" y1="0" x2="240" y2="280"/>
                <line x1="320" y1="0" x2="320" y2="280"/>
                <line x1="400" y1="0" x2="400" y2="280"/>
              </g>

              {/* Area fill under the curve */}
              <path
                d="M20 240 C60 238 100 230 140 215 C180 200 210 185 250 158 C285 134 320 100 360 72 C390 52 420 38 460 28 L460 240 Z"
                fill="url(#gc-areaGrad)"
              />

              {/* Main growth curve */}
              <path
                className="draw-curve"
                d="M20 240 C60 238 100 230 140 215 C180 200 210 185 250 158 C285 134 320 100 360 72 C390 52 420 38 460 28"
                stroke="url(#gc-curveGrad)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Milestone dots */}
              <circle cx="140" cy="215" r="5" fill="#0D9488" opacity="0.9"/>
              <circle cx="250" cy="158" r="5" fill="#5EEAD4" opacity="0.9"/>
              <circle cx="360" cy="72" r="5" fill="#5EEAD4"/>
              <circle
                cx="460" cy="28" r="6" fill="#5EEAD4"
                className="now-pulse now-fade"
                style={{ transformOrigin: '460px 28px' }}
              />

              {/* X-axis labels */}
              <text x="20" y="268" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="rgba(100,116,139,0.8)">v0.1</text>
              <text x="136" y="268" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="rgba(100,116,139,0.8)">v0.4</text>
              <text x="246" y="268" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="rgba(100,116,139,0.8)">v0.7</text>
              <text x="352" y="268" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="rgba(100,116,139,0.8)">v1.0</text>
              <text x="440" y="268" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="rgba(94,234,212,0.9)">now</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
