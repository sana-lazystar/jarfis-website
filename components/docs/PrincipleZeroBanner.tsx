import type { ReactNode } from 'react';

interface PrincipleZeroBannerProps {
  label?: string;
  title: string;
  descriptionKo: string;
  descriptionEn: string;
}

export default function PrincipleZeroBanner({
  label = 'Principle Zero',
  title,
  descriptionKo,
  descriptionEn,
}: PrincipleZeroBannerProps): ReactNode {
  return (
    <section
      aria-label={label}
      style={{
        background: 'linear-gradient(135deg, rgba(13,148,136,0.15), rgba(94,234,212,0.05))',
        border: '1px solid rgba(13,148,136,0.3)',
        borderRadius: '12px',
        padding: '1.5rem',
        margin: '1.5rem 0',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          fontWeight: 700,
          color: 'var(--color-primary-light)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1.125rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          lineHeight: 1.5,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)',
          marginTop: '0.5rem',
          lineHeight: 1.6,
        }}
      >
        {descriptionKo}
        <br />
        <span style={{ fontStyle: 'italic' }}>{descriptionEn}</span>
      </div>
    </section>
  );
}
