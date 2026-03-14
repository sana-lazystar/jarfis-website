import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import type { Locale } from '@/i18n/config';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // output: 'export' 정적 빌드를 위해 필수
  setRequestLocale(locale);

  // messages를 직접 import하여 headers() 호출 없이 처리
  const messages = (await import(`@/i18n/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale as Locale} messages={messages}>
      <div className="flex min-h-screen flex-col" style={{ backgroundColor: '#09090b' }}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-green-500 focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to main content
        </a>
        <Header locale={locale} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
