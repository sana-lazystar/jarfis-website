import type { ReactNode } from 'react';

export interface ExampleCardData {
  label: string;
  commands: string[];
  description: string;
}

interface ExampleCardProps {
  example: ExampleCardData;
}

export default function ExampleCard({ example }: ExampleCardProps): ReactNode {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        padding: '1rem 1.25rem',
        margin: '1rem 0',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          fontWeight: 700,
          color: 'var(--color-accent-purple)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.5rem',
        }}
      >
        {example.label}
      </div>
      {example.commands.map((cmd, index) => (
        <div
          key={index}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            color: 'var(--color-text-primary)',
            marginBottom: index < example.commands.length - 1 ? '0.25rem' : '0.25rem',
          }}
        >
          {cmd}
        </div>
      ))}
      <div
        style={{
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          marginTop: '0.25rem',
        }}
      >
        {example.description}
      </div>
    </div>
  );
}
