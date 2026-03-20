import type { ReactNode } from 'react';

export interface StateDiagramNode {
  label: string;
  isGate?: boolean;
}

interface StateDiagramProps {
  nodes: StateDiagramNode[];
}

export default function StateDiagram({ nodes }: StateDiagramProps): ReactNode {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        padding: '1.25rem',
        margin: '1rem 0 1.5rem',
        textAlign: 'center',
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
        {nodes.map((node, index) => (
          <span key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.375rem 0.75rem',
                borderRadius: '6px',
                background: node.isGate
                  ? 'rgba(251,191,36,0.15)'
                  : 'rgba(13,148,136,0.15)',
                color: node.isGate
                  ? 'var(--color-accent-yellow)'
                  : 'var(--color-primary-light)',
                border: `1px solid ${node.isGate ? 'rgba(251,191,36,0.3)' : 'rgba(13,148,136,0.3)'}`,
              }}
            >
              {node.label}
            </span>
            {index < nodes.length - 1 && (
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>→</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
