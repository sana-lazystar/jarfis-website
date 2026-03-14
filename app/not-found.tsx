import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{ background: 'var(--color-neutral-darker)', minHeight: '100vh' }}
      className="flex items-center justify-center px-4"
    >
      <div className="w-full max-w-lg">
        {/* Terminal-style card */}
        <div
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
          role="region"
          aria-label="Error: Page not found"
        >
          {/* Title bar */}
          <div
            style={{
              background: 'rgba(26, 44, 71, 0.6)',
              borderBottom: '1px solid var(--color-border)',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FB7185', display: 'inline-block' }} aria-hidden="true"/>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FBBF24', display: 'inline-block' }} aria-hidden="true"/>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#5EEAD4', display: 'inline-block' }} aria-hidden="true"/>
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              jarfis — zsh — error
            </span>
          </div>

          {/* Body */}
          <div style={{ padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', lineHeight: 1.7 }}>
            <p>
              <span style={{ color: 'var(--color-text-muted)' }}>$ </span>
              <span style={{ color: 'var(--color-text-secondary)' }}>cat page.txt</span>
            </p>
            <p style={{ color: 'var(--color-accent-coral)', marginTop: '0.25rem' }}>
              cat: page.txt: No such file or directory
            </p>
            <p style={{ marginTop: '1rem', color: 'var(--color-primary-light)', fontSize: '1.5rem', fontWeight: 700 }}>
              404
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>Page Not Found</p>
            <p style={{ marginTop: '0.75rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>$ </span>
              <Link
                href="/en/"
                style={{ color: 'var(--color-primary-light)', textDecoration: 'underline' }}
              >
                cd ~
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/en/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '0.625rem 1.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
            }}
          >
            <span>←</span>
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
