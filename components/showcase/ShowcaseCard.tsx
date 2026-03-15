import type { ShowcaseItem } from '@/lib/showcase';
import { withBasePath } from '@/lib/paths';

interface ShowcaseCardProps {
  item: ShowcaseItem;
  viewProjectLabel: string;
  viewSourceLabel: string;
}

export default function ShowcaseCard({
  item,
  viewProjectLabel,
  viewSourceLabel,
}: ShowcaseCardProps) {
  return (
    <article
      style={{
        borderRadius: '16px',
        border: '1px solid var(--color-border)',
        background: 'linear-gradient(145deg, var(--color-surface), rgba(15, 29, 50, 0.4))',
        overflow: 'hidden',
        transition: 'border-color 0.2s ease',
      }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden" style={{ background: 'var(--color-neutral-darker)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBasePath(item.thumbnail)}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
          style={{ transition: 'transform 0.3s ease' }}
        />
        {item.featured && (
          <span
            className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'rgba(13, 148, 136, 0.9)',
              color: 'var(--color-text-primary)',
            }}
          >
            featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="text-base font-semibold mb-1"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}
        >
          {item.name}
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'rgba(26, 44, 71, 0.6)',
                color: 'var(--color-text-muted)',
                border: '1px solid var(--color-border)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary-light)', textDecoration: 'none' }}
            aria-label={`${viewProjectLabel}: ${item.name}`}
          >
            {viewProjectLabel} →
          </a>
          {item.repoUrl && (
            <a
              href={item.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm"
              style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}
              aria-label={`${viewSourceLabel}: ${item.name}`}
            >
              {viewSourceLabel}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
