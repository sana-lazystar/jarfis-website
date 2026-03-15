import type { ReactNode } from 'react';

export interface StateField {
  field: string;
  type: string;
  description: string;
}

interface StateFieldTableProps {
  fields: StateField[];
  caption?: string;
}

export default function StateFieldTable({ fields, caption }: StateFieldTableProps): ReactNode {
  return (
    <div
      className="my-6"
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.875rem',
          }}
        >
          {caption && (
            <caption
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--color-text-muted)',
                textAlign: 'left',
                padding: '8px 16px',
                background: 'var(--color-surface)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              {caption}
            </caption>
          )}
          <thead>
            <tr>
              {['Field', 'Type', 'Description'].map((header) => (
                <th
                  key={header}
                  scope="col"
                  style={{
                    background: 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    fontSize: '13px',
                    padding: '12px 16px',
                    textAlign: 'left',
                    borderBottom: '1px solid var(--color-border)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr
                key={field.field}
                style={{
                  background:
                    index % 2 === 1 ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                }}
              >
                <td
                  style={{
                    padding: '10px 16px',
                    borderBottom: '1px solid rgba(26,44,71,0.5)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 500,
                    fontSize: '13px',
                    color: '#5EEAD4',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {field.field}
                </td>
                <td
                  style={{
                    padding: '10px 16px',
                    borderBottom: '1px solid rgba(26,44,71,0.5)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 400,
                    fontSize: '13px',
                    color: '#FBBF24',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {field.type}
                </td>
                <td
                  style={{
                    padding: '10px 16px',
                    borderBottom: '1px solid rgba(26,44,71,0.5)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {field.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
