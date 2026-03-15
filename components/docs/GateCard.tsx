import type { ReactNode } from 'react';

export interface GateOption {
  label: string;
  description: string;
}

export interface GateData {
  number: number;
  position: string;
  options: GateOption[];
}

interface GateCardProps {
  gate: GateData;
}

const GATE_OPTION_ICONS = ['✓', '↻', '✕', '↩'];

export default function GateCard({ gate }: GateCardProps): ReactNode {
  const isGate3 = gate.number === 3;
  const gridClass = isGate3
    ? 'grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'
    : 'grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <article
      aria-label={`Gate ${gate.number}`}
      className="my-6"
      style={{
        background: 'rgba(251, 113, 133, 0.05)',
        border: '1px solid rgba(251, 113, 133, 0.25)',
        borderRadius: '16px',
        padding: '24px',
      }}
    >
      {/* Gate header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            aria-hidden="true"
            style={{ color: '#FB7185', fontSize: '12px' }}
          >
            ■
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '16px',
              color: '#FB7185',
              letterSpacing: '0.03em',
            }}
          >
            GATE {gate.number}
          </span>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            margin: 0,
          }}
        >
          {gate.position}
        </p>
      </div>

      {/* Options grid */}
      <div className={gridClass} role="list" aria-label={`Gate ${gate.number} options`}>
        {gate.options.map((option, index) => (
          <div
            key={option.label}
            role="listitem"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                aria-hidden="true"
                style={{
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FB7185',
                  fontSize: '14px',
                  flexShrink: 0,
                }}
              >
                {GATE_OPTION_ICONS[index] ?? '•'}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: 'var(--color-text-primary)',
                }}
              >
                {option.label}
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                color: 'var(--color-text-muted)',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {option.description}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
