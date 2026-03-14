import Link from 'next/link';
import type { BlogEntry } from '@/lib/blog';

interface BlogCardProps {
  post: BlogEntry;
  locale: string;
  readMoreLabel: string;
}

export default function BlogCard({ post, locale, readMoreLabel }: BlogCardProps) {
  const formattedDate = new Date(post.pubDate).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article
      style={{
        borderRadius: '16px',
        border: '1px solid var(--color-border)',
        borderLeft: '2px solid rgba(13, 148, 136, 0.4)',
        background: 'linear-gradient(145deg, var(--color-surface), rgba(15, 29, 50, 0.4))',
        padding: '1.5rem',
        transition: 'border-color 0.2s ease',
      }}
    >
      <time
        dateTime={post.pubDate}
        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}
      >
        {formattedDate}
      </time>

      <h2
        className="text-xl font-semibold mt-2 mb-3"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}
      >
        <Link
          href={`/${locale}/blog/${post.slug}/`}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          {post.title}
        </Link>
      </h2>

      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>
        {post.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5" role="list" aria-label="Tags">
          {post.tags.map((tag) => (
            <span
              key={tag}
              role="listitem"
              className="text-xs px-2 py-0.5 rounded"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'rgba(251, 113, 133, 0.08)',
                color: 'var(--color-accent-coral)',
                border: '1px solid rgba(251, 113, 133, 0.15)',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        <Link
          href={`/${locale}/blog/${post.slug}/`}
          className="text-sm"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary-light)', textDecoration: 'none' }}
          aria-label={`Read more: ${post.title}`}
        >
          {readMoreLabel} →
        </Link>
      </div>
    </article>
  );
}
