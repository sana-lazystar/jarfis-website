import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en" className="dark">
      <body>
      <style href="not-found-styles" precedence="default">{`
        @keyframes drift-away {
          0%   { transform: translate(0, 0) rotate(0deg); }
          25%  { transform: translate(12px, -8px) rotate(3deg); }
          50%  { transform: translate(-5px, 6px) rotate(-2deg); }
          75%  { transform: translate(8px, 10px) rotate(4deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .lost-planet-group {
          animation: drift-away 12s ease-in-out infinite;
        }
        .btn-primary-404 {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #0D9488, #0F766E);
          color: white;
          font-size: 0.9375rem;
          font-weight: 600;
          padding: 0.8125rem 1.75rem;
          border-radius: 100px;
          text-decoration: none;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          box-shadow: 0 4px 15px rgba(13, 148, 136, 0.25);
        }
        .btn-primary-404:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(13, 148, 136, 0.4);
        }
        @media (max-width: 640px) {
          .error-actions-404 { flex-direction: column; align-items: center; }
        }
      `}</style>

      <div
        style={{
          background: '#0A1628',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
        role="main"
      >
        {/* Background radial glows */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 50%, rgba(13, 148, 136, 0.06) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(251, 113, 133, 0.04) 0%, transparent 40%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 560,
            padding: '0 2rem',
          }}
        >
          {/* Lost Planet SVG */}
          <div
            style={{ width: 280, height: 280, margin: '0 auto 2.5rem' }}
            aria-label="Lost planet drifting in orbit"
            role="img"
          >
            <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="lp-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0D9488" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#0D9488" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="lp-planet" cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#5EEAD4" />
                  <stop offset="50%" stopColor="#0D9488" />
                  <stop offset="100%" stopColor="#065F56" />
                </radialGradient>
                <radialGradient id="lp-shadow" cx="70%" cy="70%" r="50%">
                  <stop offset="0%" stopColor="#000" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background glow */}
              <circle cx="140" cy="140" r="130" fill="url(#lp-glow)" />

              {/* Broken orbit trail */}
              <ellipse
                cx="140"
                cy="140"
                rx="110"
                ry="90"
                stroke="#1A2C47"
                strokeWidth="1"
                strokeDasharray="8 12"
                fill="none"
                opacity="0.5"
                transform="rotate(-15, 140, 140)"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="60"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </ellipse>

              {/* Ghost orbit ring */}
              <circle
                cx="140"
                cy="140"
                r="70"
                stroke="#1A2C47"
                strokeWidth="0.5"
                strokeDasharray="4 8"
                fill="none"
                opacity="0.3"
              />

              {/* Faint sun remnant */}
              <circle cx="140" cy="140" r="8" fill="#0D9488" opacity="0.1" />
              <circle cx="140" cy="140" r="4" fill="#0D9488" opacity="0.2" />

              {/* Twinkle particles */}
              <g opacity="0.4">
                <circle cx="55" cy="60" r="1.2" fill="#5EEAD4">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="230" cy="75" r="0.8" fill="#94A3B8">
                  <animate attributeName="opacity" values="0.4;0.9;0.4" dur="4s" repeatCount="indefinite" begin="0.5s" />
                </circle>
                <circle cx="210" cy="210" r="1" fill="#5EEAD4">
                  <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.5s" repeatCount="indefinite" begin="1s" />
                </circle>
                <circle cx="45" cy="200" r="0.7" fill="#94A3B8">
                  <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite" begin="1.5s" />
                </circle>
                <circle cx="170" cy="40" r="0.6" fill="#5EEAD4">
                  <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4.5s" repeatCount="indefinite" begin="0.8s" />
                </circle>
                <circle cx="80" cy="240" r="0.9" fill="#94A3B8">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin="2s" />
                </circle>
                <circle cx="250" cy="150" r="0.5" fill="#5EEAD4">
                  <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3.2s" repeatCount="indefinite" begin="0.3s" />
                </circle>
                <circle cx="30" cy="130" r="0.8" fill="#94A3B8">
                  <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" begin="1.2s" />
                </circle>
              </g>

              {/* Lost planet — drifting */}
              <g className="lost-planet-group">
                {/* Planet trail */}
                <path
                  d="M195,95 Q210,85 220,80"
                  stroke="#0D9488"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                  opacity="0.25"
                  strokeLinecap="round"
                />
                {/* Planet body */}
                <circle cx="200" cy="90" r="20" fill="url(#lp-planet)" />
                <circle cx="200" cy="90" r="20" fill="url(#lp-shadow)" />
                {/* Planet ring */}
                <ellipse
                  cx="200"
                  cy="90"
                  rx="28"
                  ry="7"
                  stroke="#5EEAD4"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.3"
                  transform="rotate(-20, 200, 90)"
                />
                {/* Highlight */}
                <ellipse cx="194" cy="83" rx="7" ry="5" fill="white" opacity="0.15" />
                {/* Question mark */}
                <text
                  x="200"
                  y="95"
                  textAnchor="middle"
                  fontFamily="'DM Sans', system-ui, sans-serif"
                  fontWeight="700"
                  fontSize="14"
                  fill="#F0FDF4"
                  opacity="0.8"
                >
                  ?
                </text>
              </g>
            </svg>
          </div>

          {/* 404 number */}
          <div
            style={{
              fontSize: 'clamp(5rem, 12vw, 8rem)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, rgba(94, 234, 212, 0.2), rgba(13, 148, 136, 0.15))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            aria-hidden="true"
          >
            404
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#F0FDF4',
              marginBottom: '0.75rem',
            }}
          >
            Lost in Orbit
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: '1rem',
              color: '#94A3B8',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: 400,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            This page has drifted out of our ecosystem.
            Let&apos;s navigate you back to familiar territory.
          </p>

          {/* Actions */}
          <div
            className="error-actions-404"
            style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}
          >
            <Link href="/en/" className="btn-primary-404">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      </body>
    </html>
  );
}
