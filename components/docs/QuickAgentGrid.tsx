import type { ReactNode } from 'react';

export type AgentCategory = 'planning' | 'impl' | 'review' | 'dialectic' | 'conditional';

export interface QuickAgentItem {
  abbr: string;
  name: string;
  role: string;
  category: AgentCategory;
}

interface QuickAgentGridProps {
  agents: QuickAgentItem[];
}

const categoryColors: Record<AgentCategory, { border: string; abbr: string }> = {
  planning: {
    border: 'var(--color-primary)',
    abbr: 'var(--color-primary-light)',
  },
  impl: {
    border: 'var(--color-accent-coral)',
    abbr: 'var(--color-accent-coral)',
  },
  review: {
    border: 'var(--color-accent-yellow)',
    abbr: 'var(--color-accent-yellow)',
  },
  dialectic: {
    border: 'var(--color-accent-purple)',
    abbr: 'var(--color-accent-purple)',
  },
  conditional: {
    border: 'var(--color-text-muted)',
    abbr: 'var(--color-text-muted)',
  },
};

export default function QuickAgentGrid({ agents }: QuickAgentGridProps): ReactNode {
  return (
    <div
      role="list"
      aria-label="Agent roles"
      className="grid grid-cols-1 sm:grid-cols-2 gap-2"
      style={{ margin: '1rem 0 1.5rem' }}
    >
      {agents.map((agent, index) => {
        const colors = categoryColors[agent.category];
        return (
          <div
            key={index}
            role="listitem"
            style={{
              padding: '12px',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              borderTop: `2px solid ${colors.border}`,
            }}
          >
            <div
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: colors.abbr,
                marginBottom: '2px',
              }}
            >
              {agent.abbr}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '3px',
              }}
            >
              {agent.name}
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.4,
              }}
            >
              {agent.role}
            </div>
          </div>
        );
      })}
    </div>
  );
}
