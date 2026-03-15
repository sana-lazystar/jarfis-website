import type { ReactNode } from 'react';

export interface CommandParam {
  name: string;
  required: boolean;
  description: string;
}

export interface CommandData {
  name: string;
  syntax: string[];
  description: string;
  params?: CommandParam[];
  examples?: string[];
}

interface CommandCardProps {
  command: CommandData;
}

function SectionLabel({ children }: { children: ReactNode }): ReactNode {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        fontSize: '12px',
        color: 'var(--color-text-muted)',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.08em',
        display: 'block',
        marginBottom: '8px',
      }}
    >
      {children}
    </span>
  );
}

function CodeBlock({ children }: { children: ReactNode }): ReactNode {
  return (
    <div
      style={{
        background: 'var(--color-neutral-dark)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        padding: '12px 16px',
        overflowX: 'auto' as const,
      }}
    >
      {children}
    </div>
  );
}

export default function CommandCard({ command }: CommandCardProps): ReactNode {
  const commandText = command.name.startsWith('/') ? command.name : `/${command.name}`;
  const slashPart = '/';
  const namePart = commandText.slice(1);

  return (
    <article
      aria-labelledby={`cmd-${command.name.replace(/[^a-z0-9]/gi, '-')}`}
      className="docs-card mb-6"
      style={{
        background: 'linear-gradient(145deg, var(--color-surface), rgba(15,29,50,0.5))',
        border: '1px solid var(--color-border)',
        borderRadius: '16px',
        padding: '24px',
      }}
    >
      {/* Command name */}
      <h3
        id={`cmd-${command.name.replace(/[^a-z0-9]/gi, '-')}`}
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          fontSize: '20px',
          margin: '0 0 8px 0',
          lineHeight: 1.2,
        }}
      >
        <span style={{ color: '#0D9488' }}>{slashPart}</span>
        <span style={{ color: '#5EEAD4' }}>{namePart}</span>
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          margin: '0 0 20px 0',
          lineHeight: 1.6,
        }}
      >
        {command.description}
      </p>

      {/* Syntax */}
      <div className="mb-5">
        <SectionLabel>Syntax</SectionLabel>
        <CodeBlock>
          {command.syntax.map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
              }}
            >
              {line}
            </div>
          ))}
        </CodeBlock>
      </div>

      {/* Parameters */}
      {command.params && command.params.length > 0 && (
        <div className="mb-5">
          <SectionLabel>Parameters</SectionLabel>
          <CodeBlock>
            <div className="space-y-2">
              {command.params.map((param) => (
                <div key={param.name} className="flex flex-wrap items-start gap-2">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 500,
                      fontSize: '13px',
                      color: '#5EEAD4',
                      minWidth: '120px',
                    }}
                  >
                    {param.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      padding: '1px 6px',
                      borderRadius: '6px',
                      ...(param.required
                        ? {
                            color: '#FBBF24',
                            background: 'rgba(251, 191, 36, 0.12)',
                          }
                        : {
                            color: '#64748B',
                            background: 'rgba(100, 116, 139, 0.12)',
                          }),
                    }}
                  >
                    {param.required ? 'required' : 'optional'}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      color: 'var(--color-text-secondary)',
                      flex: 1,
                    }}
                  >
                    {param.description}
                  </span>
                </div>
              ))}
            </div>
          </CodeBlock>
        </div>
      )}

      {/* Examples */}
      {command.examples && command.examples.length > 0 && (
        <div>
          <SectionLabel>Examples</SectionLabel>
          <CodeBlock>
            {command.examples.map((example, i) => (
              <div
                key={i}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: i < command.examples!.length - 1 ? '4px' : 0,
                }}
              >
                {example}
              </div>
            ))}
          </CodeBlock>
        </div>
      )}
    </article>
  );
}
