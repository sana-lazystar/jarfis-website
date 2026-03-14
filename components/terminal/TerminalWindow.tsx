import type { ReactNode } from 'react';

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export default function TerminalWindow({
  children,
  title = 'jarfis — zsh — 80x24',
  className = '',
}: TerminalWindowProps) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        borderRadius: '16px',
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      }}
      role="region"
      aria-label="Terminal window"
    >
      {/* Title Bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          background: 'rgba(26, 44, 71, 0.6)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        {/* Traffic light buttons */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FB7185', display: 'inline-block' }}/>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FBBF24', display: 'inline-block' }}/>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#5EEAD4', display: 'inline-block' }}/>
        </div>
        <span
          className="flex-1 text-center text-xs"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
        >
          {title}
        </span>
      </div>

      {/* Terminal Body */}
      <div
        className="p-4 text-sm leading-relaxed"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {children}
      </div>
    </div>
  );
}
