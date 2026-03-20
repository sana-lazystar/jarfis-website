import type { CSSProperties, ReactNode } from 'react';

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
  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    margin: '1rem 0 1.5rem',
  };

  return (
    <div style={gridStyle} className="role-config-grid-component">
      <style>{`
        @media (max-width: 768px) {
          .role-config-grid-component {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      {cards.map((card, index) => (
        <div
          key={index}
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
