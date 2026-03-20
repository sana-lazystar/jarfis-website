import type { ReactNode } from 'react';

export type LearningVariant = 'global' | 'project' | 'workflow';

export interface LearningCardData {
  variant: LearningVariant;
  label: string;
  title: string;
  description: ReactNode;
}

interface LearningGridProps {
  cards: LearningCardData[];
  columns?: 2 | 3;
}

const variantStyles: Record<LearningVariant, { border: string; labelColor: string }> = {
  global: {
    border: 'var(--color-primary)',
    labelColor: 'var(--color-primary-light)',
  },
  project: {
    border: 'var(--color-accent-coral)',
    labelColor: 'var(--color-accent-coral)',
  },
  workflow: {
    border: 'var(--color-accent-yellow)',
    labelColor: 'var(--color-accent-yellow)',
  },
};

export default function LearningGrid({ cards, columns = 2 }: LearningGridProps): ReactNode {
  const colClass = columns === 3 ? 'grid grid-cols-1 sm:grid-cols-3 gap-2' : 'grid grid-cols-1 sm:grid-cols-2 gap-2';

  return (
    <div
      role="list"
      aria-label="Learning scope"
      className={colClass}
      style={{ margin: '1rem 0 1.5rem' }}
    >
      {cards.map((card, index) => {
        const styles = variantStyles[card.variant];
        return (
          <div
            key={index}
            role="listitem"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '1rem',
              borderTop: `2px solid ${styles.border}`,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                fontWeight: 700,
                color: styles.labelColor,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.25rem',
              }}
            >
              {card.label}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '0.25rem',
              }}
            >
              {card.title}
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.4,
              }}
            >
              {card.description}
            </div>
          </div>
        );
      })}
    </div>
  );
}
