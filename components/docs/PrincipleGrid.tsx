import type { ReactNode } from 'react';

export type PrincipleAccent = 'teal' | 'coral' | 'yellow' | 'purple';

export interface PrincipleCardData {
  num: string;
  title: string;
  descriptionKo: string;
  descriptionEn: string;
  accent: PrincipleAccent;
  category: string;
}

interface PrincipleGridProps {
  principles: PrincipleCardData[];
}

const accentStyles: Record<
  PrincipleAccent,
  { border: string; numColor: string; tagBg: string; tagColor: string }
> = {
  teal: {
    border: 'var(--color-primary)',
    numColor: 'var(--color-primary-light)',
    tagBg: 'rgba(13,148,136,0.15)',
    tagColor: 'var(--color-primary-light)',
  },
  coral: {
    border: 'var(--color-accent-coral)',
    numColor: 'var(--color-accent-coral)',
    tagBg: 'rgba(251,113,133,0.15)',
    tagColor: 'var(--color-accent-coral)',
  },
  yellow: {
    border: 'var(--color-accent-yellow)',
    numColor: 'var(--color-accent-yellow)',
    tagBg: 'rgba(251,191,36,0.15)',
    tagColor: 'var(--color-accent-yellow)',
  },
  purple: {
    border: 'var(--color-accent-purple)',
    numColor: 'var(--color-accent-purple)',
    tagBg: 'rgba(167,139,250,0.15)',
    tagColor: 'var(--color-accent-purple)',
  },
};

export default function PrincipleGrid({ principles }: PrincipleGridProps): ReactNode {
  return (
    <div
      role="list"
      aria-label="Design principles"
      className="grid grid-cols-1 md:grid-cols-3 gap-2"
      style={{ margin: '1.5rem 0' }}
    >
      {principles.map((p, index) => {
        const styles = accentStyles[p.accent];
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
                color: styles.numColor,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '0.25rem',
              }}
            >
              {p.num}
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
              {p.title}
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.5,
                marginBottom: '0.375rem',
              }}
            >
              {p.descriptionKo}
              <br />
              <span style={{ fontSize: '0.8em', fontStyle: 'italic' }}>{p.descriptionEn}</span>
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  background: styles.tagBg,
                  color: styles.tagColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {p.category}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
