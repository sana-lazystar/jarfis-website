import type { ReactNode } from 'react';

export interface RecoveryStep {
  text: ReactNode;
}

interface RecoveryFlowProps {
  steps: RecoveryStep[];
}

export default function RecoveryFlow({ steps }: RecoveryFlowProps): ReactNode {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        padding: '1.25rem',
        margin: '1rem 0 1.5rem',
      }}
    >
      <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {steps.map((step, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              marginBottom: index < steps.length - 1 ? '0.75rem' : 0,
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                background: 'rgba(13,148,136,0.15)',
                color: 'var(--color-primary-light)',
                border: '1px solid rgba(13,148,136,0.3)',
              }}
            >
              {index + 1}
            </div>
            <div
              style={{
                fontSize: '0.8125rem',
                color: 'var(--color-text-secondary)',
                paddingTop: '2px',
                lineHeight: 1.5,
              }}
            >
              {step.text}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
