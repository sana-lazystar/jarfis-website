import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  accentColor?: 'green' | 'violet' | 'amber';
}

export default function Card({
  children,
  className = '',
  hoverable = false,
  accentColor = 'green',
}: CardProps) {
  const accentClasses = {
    green: 'border-l-green-500',
    violet: 'border-l-violet-500',
    amber: 'border-l-amber-500',
  };

  return (
    <div
      className={`
        rounded-lg border border-zinc-800 border-l-2 ${accentClasses[accentColor]}
        bg-zinc-900 p-6
        ${hoverable ? 'hover:border-zinc-700 hover:bg-zinc-800 transition-all cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
