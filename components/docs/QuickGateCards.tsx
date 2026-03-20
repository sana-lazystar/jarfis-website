import type { ReactNode } from 'react';

interface GateCardItem {
  title: string;
  description: string;
  actions: string[];
}

interface QuickGateCardsProps {
  gates: GateCardItem[];
}

export default function QuickGateCards({ gates }: QuickGateCardsProps): ReactNode {
  return (
    <div
      role="list"
      aria-label="Gate cards"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        margin: '1rem 0 1.5rem',
      }}
    >
      {gates.map((gate, index) => (
        <div
          key={index}
          role="listitem"
          style={{
            padding: '14px 16px',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            borderLeft: '3px solid var(--color-accent-yellow)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-accent-yellow)',
              marginBottom: '4px',
            }}
          >
            {gate.title}
          </div>
          <div
            style={{
              fontSize: '0.8125rem',
              color: 'var(--color-text-muted)',
              marginBottom: '6px',
            }}
          >
            {gate.description}
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {gate.actions.map((action, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'rgba(251,191,36,0.1)',
                  color: 'var(--color-accent-yellow)',
                  border: '1px solid rgba(251,191,36,0.2)',
                }}
              >
                {action}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
