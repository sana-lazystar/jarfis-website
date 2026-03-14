import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import HeroTerminal from '@/components/home/HeroTerminal';
import FeatureCards from '@/components/home/FeatureCards';
import PhilosophyGrid from '@/components/home/PhilosophyGrid';
import GrowthSection from '@/components/home/GrowthSection';
import JsonLd, { ORGANIZATION_LD, WEBSITE_LD } from '@/components/seo/JsonLd';
import { generateSeoMetadata } from '@/lib/seo';
import GitHubIcon from '@/components/icons/GitHubIcon';
import type { Locale } from '@/i18n/config';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return generateSeoMetadata({
    title: 'JARFIS',
    description: t('home_description'),
    locale: locale as Locale,
    path: '/',
    ogImage: '/images/og/og-default.png',
  });
}

function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations('hero');
  const tFinalCta = useTranslations('final_cta');

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left: Text */}
        <div>
          <p className="font-mono text-green-500 text-sm mb-4">{t('terminal_prompt')}</p>
          <h1 className="font-mono text-4xl font-bold text-zinc-50 tracking-tight leading-tight mb-4 lg:text-5xl">
            {t('badge')}
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-3">{t('subtitle')}</p>
          <p className="text-zinc-500 text-base leading-relaxed mb-8">{t('description')}</p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/docs/getting-started/`}
              className="inline-flex items-center justify-center gap-2 rounded bg-green-500 px-6 py-3 font-mono text-sm font-bold text-black hover:bg-green-400 transition-colors"
            >
              <span>$</span>
              <span>{t('cta_start')}</span>
            </Link>
            <a
              href="https://github.com/sana-lazystar/jarfis"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded border border-zinc-600 px-6 py-3 font-mono text-sm text-zinc-300 hover:border-green-500 hover:text-green-500 transition-colors"
            >
              <GitHubIcon />
              {t('cta_github')}
            </a>
          </div>
        </div>

        {/* Right: Terminal */}
        <div>
          <HeroTerminal locale={locale} />
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const t = useTranslations('how_it_works');
  const tDocs = useTranslations('nav');

  const phases = [
    { key: 'phase1', title: t('phase1_title'), desc: t('phase1_desc') },
    { key: 'phase2', title: t('phase2_title'), desc: t('phase2_desc') },
    { key: 'phase3', title: t('phase3_title'), desc: t('phase3_desc') },
    { key: 'phase4', title: t('phase4_title'), desc: t('phase4_desc') },
    { key: 'phase5', title: t('phase5_title'), desc: t('phase5_desc') },
    { key: 'phase6', title: t('phase6_title'), desc: t('phase6_desc') },
    { key: 'phase7', title: t('phase7_title'), desc: t('phase7_desc') },
    { key: 'phase8', title: t('phase8_title'), desc: t('phase8_desc') },
    { key: 'phase9', title: t('phase9_title'), desc: t('phase9_desc') },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20 border-t border-zinc-800/50">
      <div className="mb-12 text-center">
        <p className="font-mono text-green-500 text-sm mb-3">$ jarfis:work --help</p>
        <h2 className="font-mono text-3xl font-bold text-zinc-50 tracking-tight">{t('title')}</h2>
        <p className="mt-3 text-zinc-500 text-sm">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {phases.map((phase, index) => (
          <div
            key={phase.key}
            className="flex items-start gap-4 rounded-lg border border-zinc-800 bg-zinc-900 p-5 hover:border-zinc-700 transition-colors"
          >
            <span className="font-mono text-xs text-zinc-600 pt-0.5 w-8 shrink-0">
              [{String(index + 1).padStart(2, '0')}]
            </span>
            <div>
              <h3 className="font-mono text-sm font-semibold text-zinc-200 mb-1">{phase.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{phase.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  return (
    <>
      <JsonLd data={ORGANIZATION_LD} />
      <JsonLd data={WEBSITE_LD} />
      <HeroSection locale={locale} />
      <FeatureCards />
      <HowItWorksSection />
      <PhilosophyGrid />
      <GrowthSection />
    </>
  );
}
