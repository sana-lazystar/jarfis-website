import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateSeoMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';
import { FeaturesContent } from '@/components/features/FeaturesContent';

interface FeaturesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: FeaturesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return generateSeoMetadata({
    title: 'Features',
    description: t('features_description'),
    locale: locale as Locale,
    path: '/features/',
    ogImage: '/images/og/og-features.png',
  });
}

export default async function FeaturesPage({ params }: FeaturesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FeaturesContent locale={locale} />;
}
