import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getShowcaseItems } from '@/lib/showcase';
import { generateSeoMetadata } from '@/lib/seo';
import ShowcaseCard from '@/components/showcase/ShowcaseCard';
import ShowcaseEmptyState from '@/components/showcase/EmptyState';
import type { Locale } from '@/i18n/config';

interface ShowcasePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ShowcasePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return generateSeoMetadata({
    title: 'Showcase',
    description: t('showcase_description'),
    locale: locale as Locale,
    path: '/showcase/',
    ogImage: '/images/og/og-showcase.png',
  });
}

export default async function ShowcasePage({ params }: ShowcasePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'showcase' });

  const items = getShowcaseItems();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p
          className="mb-3 text-sm font-semibold uppercase"
          style={{ color: 'var(--color-accent-yellow)', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}
        >
          Showcase
        </p>
        <h1
          className="text-4xl font-bold tracking-tight"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}
        >
          {t('page_title')}
        </h1>
        <p className="mt-3" style={{ color: 'var(--color-text-muted)' }}>{t('page_subtitle')}</p>
      </div>

      {items.length === 0 ? (
        <ShowcaseEmptyState
          title={t('empty_title')}
          description={t('empty_desc')}
          submitLabel={t('submit')}
        />
      ) : (
        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label={t('page_title')}
        >
          {items.map((item) => (
            <div key={item.id} role="listitem">
              <ShowcaseCard
                item={item}
                viewProjectLabel={t('view_project')}
                viewSourceLabel={t('view_source')}
              />
            </div>
          ))}
        </div>
      )}

      {/* Submit CTA */}
      <div
        className="mt-16 text-center p-10"
        style={{
          borderRadius: '16px',
          border: '1px dashed var(--color-border)',
        }}
      >
        <p className="mb-4 text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
          jarfis submit --project your-project
        </p>
        <a
          href="https://github.com/sana-lazystar/jarfis-website/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm transition-colors"
          style={{
            fontFamily: 'var(--font-mono)',
            border: '1px solid rgba(13, 148, 136, 0.3)',
            color: 'var(--color-primary-light)',
            textDecoration: 'none',
          }}
        >
          {t('submit')}
        </a>
      </div>
    </div>
  );
}
