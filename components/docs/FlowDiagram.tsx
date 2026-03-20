import type { ReactNode } from 'react';

export type FlowNodeVariant = 'default' | 'meeting' | 'work';

export interface FlowDiagramNode {
  label: string;
  variant?: FlowNodeVariant;
}

interface FlowDiagramProps {
  nodes: FlowDiagramNode[];
}

const variantStyles: Record<FlowNodeVariant, { bg: string; color: string; border: string }> = {
  default: {
    bg: 'rgba(13,148,136,0.15)',
    color: 'var(--color-primary-light)',
    border: 'rgba(13,148,136,0.3)',
  },
  meeting: {
    bg: 'rgba(167,139,250,0.15)',
    color: 'var(--color-accent-purple)',
    border: 'rgba(167,139,250,0.3)',
  },
  work: {
    bg: 'rgba(251,113,133,0.15)',
    color: 'var(--color-accent-coral)',
    border: 'rgba(251,113,133,0.3)',
  },
};

export default function FlowDiagram({ nodes }: FlowDiagramProps): ReactNode {
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}
      >
        {nodes.map((node, index) => {
          const styles = variantStyles[node.variant ?? 'default'];
          return (
            <span key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.375rem 0.75rem',
                  borderRadius: '6px',
                  background: styles.bg,
                  color: styles.color,
                  border: `1px solid ${styles.border}`,
                }}
              >
                {node.label}
              </span>
              {index < nodes.length - 1 && (
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>→</span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
