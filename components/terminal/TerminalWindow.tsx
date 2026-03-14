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
      className={`rounded-xl border border-zinc-700 bg-zinc-900 overflow-hidden shadow-2xl ${className}`}
      role="region"
      aria-label="Terminal window"
    >
      {/* Title Bar */}
      <div className="flex items-center gap-2 bg-zinc-800 px-4 py-3 border-b border-zinc-700">
        {/* Traffic light buttons */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <span className="flex-1 text-center font-mono text-xs text-zinc-500">{title}</span>
      </div>

      {/* Terminal Body */}
      <div className="p-4 font-mono text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
