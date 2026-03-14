interface ShowcaseEmptyStateProps {
  title: string;
  description: string;
  submitLabel: string;
}

export default function ShowcaseEmptyState({
  title,
  description,
  submitLabel,
}: ShowcaseEmptyStateProps) {
  return (
    <div
      className="p-12 text-center"
      style={{
        borderRadius: '16px',
        border: '1px solid var(--color-border)',
        background: 'linear-gradient(145deg, var(--color-surface), rgba(15, 29, 50, 0.4))',
      }}
    >
      <div
        className="text-4xl mb-4"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-border)' }}
        aria-hidden="true"
      >
        [showcase]
      </div>
      <h2
        className="text-lg font-semibold mb-2"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}
      >
        {title}
      </h2>
      <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
        {description}
      </p>
      <a
        href="https://github.com/sana-lazystar/jarfis-website/issues/new"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm px-4 py-2 rounded"
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-primary-light)',
          border: '1px solid rgba(13, 148, 136, 0.3)',
          textDecoration: 'none',
        }}
      >
        {submitLabel}
      </a>
    </div>
  );
}
