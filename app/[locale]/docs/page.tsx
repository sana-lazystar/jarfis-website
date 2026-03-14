import type { Locale } from '@/i18n/config';

interface DocsIndexPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DocsIndexPage({ params }: DocsIndexPageProps) {
  const { locale } = await params;

  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0; url=/jarfis-website/${locale}/docs/getting-started/`} />
        <link rel="canonical" href={`/jarfis-website/${locale}/docs/getting-started/`} />
      </head>
      <body>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="font-mono text-zinc-500 text-sm">
            <span className="text-green-500">$ </span>
            cd docs/getting-started...
          </p>
        </div>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  const locales: Locale[] = ['en', 'ko', 'ja', 'zh'];
  return locales.map((locale) => ({ locale }));
}
