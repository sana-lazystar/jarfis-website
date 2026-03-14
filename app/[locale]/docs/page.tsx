import type { Locale } from '@/i18n/config';

interface DocsIndexPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DocsIndexPage({ params }: DocsIndexPageProps) {
  const { locale } = await params;

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=/jarfis-website/${locale}/docs/getting-started/`} />
      <link rel="canonical" href={`/jarfis-website/${locale}/docs/getting-started/`} />
      <div className="flex items-center justify-center min-h-[50vh]">
        <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--color-primary-light)' }}>$ </span>
          cd docs/getting-started...
        </p>
      </div>
    </>
  );
}

export function generateStaticParams() {
  const locales: Locale[] = ['en', 'ko', 'ja', 'zh'];
  return locales.map((locale) => ({ locale }));
}
