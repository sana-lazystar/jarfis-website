import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getBlogPostsByLocale } from '@/lib/blog';
import { generateSeoMetadata } from '@/lib/seo';
import BlogCard from '@/components/blog/BlogCard';
import EmptyState from '@/components/blog/EmptyState';
import type { Locale } from '@/i18n/config';

interface BlogListPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BlogListPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return generateSeoMetadata({
    title: 'Blog',
    description: t('blog_description'),
    locale: locale as Locale,
    path: '/blog/',
    ogImage: '/images/og/og-blog.png',
  });
}

export default async function BlogListPage({ params }: BlogListPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  const posts = getBlogPostsByLocale(locale as Locale);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="font-mono text-green-500 text-sm mb-3">$ ls blog/</p>
        <h1 className="font-mono text-4xl font-bold text-zinc-50 tracking-tight">
          {t('page_title')}
        </h1>
        <p className="mt-3 text-zinc-500">{t('page_subtitle')}</p>
      </div>

      {posts.length === 0 ? (
        <EmptyState
          title={t('empty_title')}
          description={t('empty_desc')}
          followLabel={t('follow_github')}
          watchLabel={t('watch_repo')}
        />
      ) : (
        <div className="space-y-6" role="feed" aria-label={t('page_title')}>
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              locale={locale}
              readMoreLabel={t('read_more')}
            />
          ))}
        </div>
      )}
    </div>
  );
}
