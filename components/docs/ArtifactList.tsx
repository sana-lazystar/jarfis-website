import type { ReactNode } from 'react';

export interface ArtifactItem {
  name: string;
  author: string;
}

export interface ArtifactGroup {
  phase: string;
  artifacts: ArtifactItem[];
}

interface ArtifactListProps {
  groups: ArtifactGroup[];
}

function DocumentIcon(): ReactNode {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="#5EEAD4"
      strokeWidth="1.5"
      aria-hidden="true"
      style={{ width: '16px', height: '16px', flexShrink: 0 }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.5 1H3a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V5.5L9.5 1z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 1v5h5" />
    </svg>
  );
}

export default function ArtifactList({ groups }: ArtifactListProps): ReactNode {
  return (
    <section aria-label="Workflow artifacts" className="my-8">
      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.phase}>
            {/* Phase group header */}
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                fontSize: '14px',
                color: 'var(--color-text-primary)',
                borderBottom: '1px solid var(--color-border)',
                paddingBottom: '8px',
                marginBottom: '12px',
                marginTop: 0,
              }}
            >
              {group.phase}
            </h4>

            {/* Artifacts container */}
            <div
              role="list"
              aria-label={`${group.phase} artifacts`}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              {group.artifacts.map((artifact, index) => (
                <div
                  key={artifact.name}
                  role="listitem"
                  style={{
                    padding: '10px 16px',
                    borderBottom:
                      index < group.artifacts.length - 1
                        ? '1px solid rgba(26,44,71,0.5)'
                        : 'none',
                  }}
                >
                  {/* Desktop: inline flex, Mobile: column stack via CSS */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <DocumentIcon />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 500,
                          fontSize: '14px',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {artifact.name}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '12px',
                        color: 'var(--color-text-secondary)',
                        paddingLeft: '24px',
                      }}
                      className="sm:pl-0"
                    >
                      {artifact.author}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
