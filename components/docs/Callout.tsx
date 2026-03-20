import type { ReactNode } from 'react';

interface CalloutProps {
  variant?: 'info' | 'warning';
  children: ReactNode;
}

export default function Callout({ variant = 'info', children }: CalloutProps): ReactNode {
  const isWarning = variant === 'warning';

  return (
    <div
      role="note"
      style={{
        background: isWarning ? 'rgba(251,191,36,0.08)' : 'rgba(13,148,136,0.08)',
        border: `1px solid ${isWarning ? 'rgba(251,191,36,0.2)' : 'rgba(13,148,136,0.2)'}`,
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        marginBottom: '1rem',
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {children}
    </div>
  );
}
