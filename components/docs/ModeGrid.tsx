import type { ReactNode } from 'react';

export interface ModeCardData {
  name: string;
  description: string;
  flag: string;
  active?: boolean;
}

interface ModeGridProps {
  modes: ModeCardData[];
  columns?: 2 | 3;
}

export default function ModeGrid({ modes, columns = 2 }: ModeGridProps): ReactNode {
  const colClass = columns === 3 ? 'grid grid-cols-1 sm:grid-cols-3 gap-2' : 'grid grid-cols-1 sm:grid-cols-2 gap-2';

  return (
    <div
      role="list"
      aria-label="Modes"
      className={colClass}
      style={{ margin: '1rem 0 1.5rem' }}
    >
      {modes.map((mode, index) => (
        <div
          key={index}
          role="listitem"
          style={{
            background: mode.active ? 'rgba(13,148,136,0.05)' : 'var(--color-surface)',
            border: `1px solid ${mode.active ? 'var(--color-primary)' : 'var(--color-border)'}`,
            borderRadius: '10px',
            padding: '1rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '0.25rem',
            }}
          >
            {mode.name}
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.4,
            }}
          >
            {mode.description}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: 'var(--color-primary-light)',
              marginTop: '0.5rem',
            }}
          >
            {mode.flag}
          </div>
        </div>
      ))}
    </div>
  );
}
