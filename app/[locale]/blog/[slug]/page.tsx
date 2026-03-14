import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getMdxContent } from '@/lib/mdx';
import { getBlogPostByLocaleAndSlug, getAllBlogStaticParams } from '@/lib/blog';
import { generateSeoMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogStaticParams();
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = getBlogPostByLocaleAndSlug(locale as Locale, slug);

  if (!result) return {};

  return generateSeoMetadata({
    title: result.frontmatter.title,
    description: result.frontmatter.description,
    locale: locale as Locale,
    path: `/blog/${slug}/`,
    ogImage: result.frontmatter.ogImage || '/images/og/og-blog.png',
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  const result = getBlogPostByLocaleAndSlug(locale as Locale, slug);
  if (!result) notFound();

  const { frontmatter, filePath } = result;

  const relativePath = filePath.split('content/')[1];
  const mdxContent = await getMdxContent(relativePath);
  if (!mdxContent) notFound();

  const formattedDate = new Date(frontmatter.pubDate).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
      {/* Back link */}
      <Link
        href={`/${locale}/blog/`}
        className="inline-flex items-center gap-2 font-mono text-sm text-zinc-500 hover:text-green-500 transition-colors mb-8"
      >
        ← {t('prev_post')}
      </Link>

      {/* Post header */}
      <header className="mb-10">
        <time dateTime={frontmatter.pubDate} className="font-mono text-xs text-zinc-600">
          {formattedDate}
        </time>
        <h1 className="font-mono text-3xl font-bold text-zinc-50 tracking-tight mt-2 mb-4 leading-tight lg:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="text-zinc-500 text-base leading-relaxed mb-4">{frontmatter.description}</p>

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-zinc-600">
            by {frontmatter.author}
          </span>
          {frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5" role="list" aria-label="Tags">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  role="listitem"
                  className="font-mono text-xs px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <hr className="border-zinc-800 mb-10" />

      {/* Post content */}
      <article className="prose prose-invert max-w-none">
        {mdxContent.content}
      </article>
    </div>
  );
}
