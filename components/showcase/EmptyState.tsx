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
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-12 text-center">
      <div className="font-mono text-4xl text-zinc-700 mb-4" aria-hidden="true">
        [showcase]
      </div>
      <h2 className="font-mono text-lg font-semibold text-zinc-300 mb-2">{title}</h2>
      <p className="text-sm text-zinc-500 mb-6 max-w-md mx-auto">{description}</p>
      <a
        href="https://github.com/sana-lazystar/jarfis-website/issues/new"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-sm text-green-500 hover:text-green-400 border border-green-500/30 px-4 py-2 rounded hover:border-green-500 transition-colors"
      >
        <span className="text-zinc-600">$ </span>{submitLabel}
      </a>
    </div>
  );
}
