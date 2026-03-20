import type { ReactNode } from 'react';

export interface QuickPhaseItem {
  type: 'phase';
  id: string;
  name: string;
  description: string;
}

export interface QuickGateItem {
  type: 'gate';
  label: string;
  options: string;
}

export type QuickPhaseListItem = QuickPhaseItem | QuickGateItem;

interface QuickPhaseListProps {
  items: QuickPhaseListItem[];
}

export default function QuickPhaseList({ items }: QuickPhaseListProps): ReactNode {
  return (
    <div
      role="list"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        margin: '1rem 0 1.5rem',
      }}
    >
      {items.map((item, index) => {
        if (item.type === 'gate') {
          return (
            <div
              key={index}
              role="listitem"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 0',
                margin: '2px 0',
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background: 'var(--color-accent-yellow)',
                  opacity: 0.3,
                }}
              />
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  color: 'var(--color-accent-yellow)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: '0.625rem',
                  color: 'var(--color-text-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.options}
              </div>
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background: 'var(--color-accent-yellow)',
                  opacity: 0.3,
                }}
              />
            </div>
          );
        }

        return (
          <div
            key={index}
            role="listitem"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              padding: '12px 14px',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8125rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                background: 'rgba(13,148,136,0.15)',
                color: 'var(--color-primary-light)',
                border: '1px solid rgba(13,148,136,0.25)',
              }}
            >
              {item.id}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '2px',
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.5,
                }}
              >
                {item.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
