import type { ReactNode } from 'react';

export interface TensionItem {
  left: string;
  right: string;
  description: string;
}

interface TensionListProps {
  tensions: TensionItem[];
}

export default function TensionList({ tensions }: TensionListProps): ReactNode {
  return (
    <div
      role="list"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        margin: '1rem 0 1.5rem',
      }}
    >
      {tensions.map((tension, index) => (
        <div
          key={index}
          role="listitem"
          className="flex flex-col sm:flex-row items-start sm:items-center gap-2"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--color-primary-light)',
              whiteSpace: 'nowrap',
            }}
          >
            {tension.left}
          </div>
          <div
            aria-hidden="true"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              color: 'var(--color-accent-coral)',
              flexShrink: 0,
            }}
          >
            ↔
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--color-primary-light)',
              whiteSpace: 'nowrap',
            }}
          >
            {tension.right}
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.4,
              flex: 1,
            }}
          >
            {tension.description}
          </div>
        </div>
      ))}
    </div>
  );
}
