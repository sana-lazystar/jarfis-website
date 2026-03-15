import type { ReactNode } from 'react';

export interface PhaseData {
  id: string;
  name: string;
  description: string;
  agents?: string[];
  gate?: {
    label: string;
    options: string[];
  };
  isGate?: boolean;
}

interface PhaseCardProps {
  phase: PhaseData;
  isLast?: boolean;
}

const PHASE_ACCENTS: Record<string, { bg: string; color: string }> = {
  T:   { bg: 'rgba(251, 191, 36, 0.15)',  color: '#FBBF24' },
  '0': { bg: 'rgba(100, 116, 139, 0.15)', color: '#94A3B8' },
  '1': { bg: 'rgba(13, 148, 136, 0.15)',  color: '#0D9488' },
  '2': { bg: 'rgba(13, 148, 136, 0.15)',  color: '#0D9488' },
  '3': { bg: 'rgba(251, 113, 133, 0.12)', color: '#FB7185' },
  '4': { bg: 'rgba(94, 234, 212, 0.10)',  color: '#5EEAD4' },
  '4.5': { bg: 'rgba(251, 191, 36, 0.12)', color: '#FBBF24' },
  '5': { bg: 'rgba(251, 113, 133, 0.12)', color: '#FB7185' },
  '6': { bg: 'rgba(13, 148, 136, 0.15)',  color: '#0D9488' },
};

function GateIndicator({ gate }: { gate: NonNullable<PhaseData['gate']> }) {
  return (
    <li
      role="separator"
      aria-label={`${gate.label}: User approval checkpoint`}
      className="my-3"
    >
      <div
        style={{
          background: 'rgba(251, 113, 133, 0.05)',
          border: '1px dashed rgba(251, 113, 133, 0.5)',
          borderRadius: '12px',
          padding: '12px 16px',
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            aria-hidden="true"
            style={{ color: '#FB7185', fontSize: '10px' }}
          >
            ■
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              fontSize: '13px',
              color: '#FB7185',
              letterSpacing: '0.03em',
            }}
          >
            {gate.label}
          </span>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            color: '#94A3B8',
            margin: 0,
          }}
        >
          {gate.options.join(' / ')}
        </p>
      </div>
    </li>
  );
}

export default function PhaseCard({ phase, isLast }: PhaseCardProps): ReactNode {
  const accent = PHASE_ACCENTS[phase.id] ?? { bg: 'rgba(13,148,136,0.15)', color: '#0D9488' };

  if (phase.isGate && phase.gate) {
    return <GateIndicator gate={phase.gate} />;
  }

  return (
    <li
      aria-label={`Phase ${phase.id}: ${phase.name}`}
    >
      <div className="flex gap-4 items-start">
        {/* Timeline column */}
        <div className="flex flex-col items-center shrink-0" style={{ width: '24px' }}>
          {/* Node dot */}
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#0D9488',
              marginTop: '15px',
              flexShrink: 0,
            }}
          />
          {/* Vertical line */}
          {!isLast && (
            <div
              style={{
                width: '2px',
                flex: 1,
                minHeight: '24px',
                background: 'var(--color-border)',
                marginTop: '4px',
              }}
            />
          )}
        </div>

        {/* Card */}
        <article
          aria-labelledby={`phase-${phase.id}-title`}
          className="flex-1 mb-3"
          style={{
            background: 'linear-gradient(145deg, var(--color-surface), rgba(15,29,50,0.5))',
            border: '1px solid var(--color-border)',
            borderRadius: '16px',
            padding: '16px 20px',
          }}
        >
          <div className="flex items-start gap-4">
            {/* Phase badge */}
            <div
              aria-hidden="true"
              className="shrink-0 flex items-center justify-center"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: accent.bg,
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '14px',
                color: accent.color,
              }}
            >
              {phase.id}
            </div>

            <div className="flex-1 min-w-0">
              <h3
                id={`phase-${phase.id}-title`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  fontSize: '1.125rem',
                  color: 'var(--color-text-primary)',
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {phase.name}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  marginTop: '8px',
                  marginBottom: 0,
                }}
              >
                {phase.description}
              </p>

              {/* Agent badges */}
              {phase.agents && phase.agents.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {phase.agents.map((agent) => (
                    <span
                      key={agent}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 500,
                        fontSize: '12px',
                        color: '#5EEAD4',
                        background: 'rgba(13, 148, 136, 0.15)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      {agent}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </li>
  );
}
