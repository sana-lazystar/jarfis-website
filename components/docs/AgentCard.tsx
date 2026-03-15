import type { ReactNode } from 'react';

export interface AgentData {
  name: string;
  abbr: string;
  description: string;
  phases?: string[];
  iconBg?: string;
  iconColor?: string;
}

interface AgentCardProps {
  agent: AgentData;
}

// SVG icons by agent abbreviation
function AgentIcon({ abbr, color }: { abbr: string; color: string }): ReactNode {
  const icons: Record<string, ReactNode> = {
    PO: (
      // clipboard-list
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    AR: (
      // layers
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    TL: (
      // git-branch
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v12M6 15a3 3 0 100 6 3 3 0 000-6zM6 9a3 3 0 100-6 3 3 0 000 6zm12 6a3 3 0 100 0 3 3 0 000 0zM18 15V9a6 6 0 00-6-6" />
      </svg>
    ),
    UX: (
      // layout
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18M9 21V9" />
      </svg>
    ),
    BE: (
      // server
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.01M6 18h.01" />
      </svg>
    ),
    FE: (
      // monitor
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4" />
      </svg>
    ),
    DO: (
      // settings/gear
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    QA: (
      // check-circle
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    SE: (
      // shield
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    ADV: (
      // thumbs-up
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
    CRT: (
      // search/magnify
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  };

  return icons[abbr] ?? (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 8v4m0 4h.01" />
    </svg>
  );
}

export default function AgentCard({ agent }: AgentCardProps): ReactNode {
  const iconBg = agent.iconBg ?? 'rgba(13, 148, 136, 0.15)';
  const iconColor = agent.iconColor ?? '#0D9488';

  return (
    <div
      role="listitem"
      className="docs-card"
      style={{
        background: 'linear-gradient(145deg, var(--color-surface), rgba(15,29,50,0.5))',
        border: '1px solid var(--color-border)',
        borderRadius: '20px',
        padding: '20px',
      }}
    >
      <div className="flex items-start gap-3">
        {/* Icon wrapper */}
        <div
          className="shrink-0 flex items-center justify-center"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: iconBg,
          }}
          aria-hidden="true"
        >
          <div style={{ width: '20px', height: '20px' }}>
            <AgentIcon abbr={agent.abbr} color={iconColor} />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              fontSize: '14px',
              color: 'var(--color-text-primary)',
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {agent.name}
          </h3>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: iconColor,
              opacity: 0.8,
            }}
          >
            {agent.abbr}
          </span>
        </div>
      </div>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          color: 'var(--color-text-muted)',
          lineHeight: 1.6,
          marginTop: '12px',
          marginBottom: 0,
        }}
      >
        {agent.description}
      </p>

      {/* Phase badges */}
      {agent.phases && agent.phases.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {agent.phases.map((phase) => (
            <span
              key={phase}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#5EEAD4',
                background: 'rgba(13, 148, 136, 0.12)',
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              P{phase}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
