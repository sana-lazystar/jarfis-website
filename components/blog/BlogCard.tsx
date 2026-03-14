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
    <article className="rounded-lg border border-zinc-800 border-l-2 border-l-green-500/50 bg-zinc-900 p-6 hover:border-zinc-700 hover:border-l-green-500 transition-all">
      <time
        dateTime={post.pubDate}
        className="font-mono text-xs text-zinc-600"
      >
        {formattedDate}
      </time>

      <h2 className="font-mono text-xl font-semibold text-zinc-100 mt-2 mb-3">
        <Link
          href={`/${locale}/blog/${post.slug}/`}
          className="hover:text-green-400 transition-colors"
        >
          {post.title}
        </Link>
      </h2>

      <p className="text-sm text-zinc-500 leading-relaxed mb-4">{post.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5" role="list" aria-label="Tags">
          {post.tags.map((tag) => (
            <span
              key={tag}
              role="listitem"
              className="font-mono text-xs px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Link
          href={`/${locale}/blog/${post.slug}/`}
          className="font-mono text-sm text-green-500 hover:text-green-400 transition-colors"
          aria-label={`Read more: ${post.title}`}
        >
          {readMoreLabel} →
        </Link>
      </div>
    </article>
  );
}
