import type { ShowcaseItem } from '@/lib/showcase';

const BASE_PATH = '/jarfis-website';

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
    <article className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-zinc-700 transition-all group">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-zinc-800 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE_PATH}${item.thumbnail}`}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {item.featured && (
          <span className="absolute top-2 right-2 font-mono text-xs bg-green-500/90 text-black px-2 py-0.5 rounded">
            featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-mono text-base font-semibold text-zinc-100 mb-1">{item.name}</h3>
        <p className="text-sm text-zinc-500 leading-relaxed mb-4">{item.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-0.5 bg-zinc-800 text-zinc-500 border border-zinc-700 rounded"
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
            className="font-mono text-sm text-green-500 hover:text-green-400 transition-colors"
            aria-label={`${viewProjectLabel}: ${item.name}`}
          >
            {viewProjectLabel} →
          </a>
          {item.repoUrl && (
            <a
              href={item.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
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
