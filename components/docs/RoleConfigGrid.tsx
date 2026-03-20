import type { ReactNode } from 'react';

export interface RoleField {
  key: string;
  value: string;
}

export interface RoleConfigCardData {
  name: string;
  description: string;
  fields: RoleField[];
  variant?: 'default' | 'custom';
}

interface RoleConfigGridProps {
  cards: RoleConfigCardData[];
}

export default function RoleConfigGrid({ cards }: RoleConfigGridProps): ReactNode {
  return (
    <div
      role="list"
      aria-label="Role configurations"
      className="grid grid-cols-1 sm:grid-cols-3 gap-2"
      style={{ margin: '1rem 0 1.5rem' }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          role="listitem"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            padding: '1rem',
            borderTop: `2px solid ${card.variant === 'custom' ? 'var(--color-accent-coral)' : 'var(--color-primary)'}`,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '0.25rem',
            }}
          >
            {card.name}
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.4,
              marginBottom: '0.5rem',
            }}
          >
            {card.description}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {card.fields.map((field, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.6875rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-primary-light)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {field.key}
                </span>
                <span style={{ color: 'var(--color-text-muted)' }}>{field.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
