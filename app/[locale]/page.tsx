import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSolarSystem from '@/components/home/HeroSolarSystem';
import FeatureCards from '@/components/home/FeatureCards';
import PhilosophyGrid from '@/components/home/PhilosophyGrid';
import GrowthSection from '@/components/home/GrowthSection';
import QuickstartSection from '@/components/home/QuickstartSection';
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

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'hero' });
  const tA11y = await getTranslations({ locale, namespace: 'a11y' });

  return (
    <>
      <JsonLd data={ORGANIZATION_LD} />
      <JsonLd data={WEBSITE_LD} />

      {/* ===== HERO SECTION ===== */}
      <section
        style={{
          background: 'var(--color-neutral-dark)',
          paddingTop: '7rem',
          paddingBottom: '5rem',
        }}
      >
        <style>{`
          .hero-badge-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--color-accent-coral);
            animation: coral-pulse 2s ease-in-out infinite;
          }
          .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.375rem 1rem;
            border-radius: 9999px;
            border: 1px solid rgba(251, 113, 133, 0.25);
            background: rgba(251, 113, 133, 0.08);
            margin-bottom: 1.5rem;
          }
          .hero-title-gradient {
            background: linear-gradient(135deg, var(--color-accent-coral), #F472B6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .hero-cta-primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.75rem 1.75rem;
            border-radius: 10px;
            background: var(--color-primary);
            color: #F0FDF4;
            font-weight: 600;
            font-size: 0.9375rem;
            transition: background 0.2s ease, transform 0.15s ease;
            text-decoration: none;
          }
          .hero-cta-primary:hover {
            background: #0F9F92;
            transform: translateY(-1px);
          }
          .hero-cta-secondary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.75rem 1.75rem;
            border-radius: 10px;
            border: 1px solid var(--color-border);
            color: var(--color-text-secondary);
            font-weight: 500;
            font-size: 0.9375rem;
            transition: border-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
            text-decoration: none;
            background: transparent;
          }
          .hero-cta-secondary:hover {
            border-color: rgba(13, 148, 136, 0.5);
            color: var(--color-primary-light);
            transform: translateY(-1px);
          }
          @media (prefers-reduced-motion: reduce) {
            .hero-badge-dot { animation: none; }
            .hero-cta-primary:hover, .hero-cta-secondary:hover { transform: none; }
          }
        `}</style>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

            {/* Left: Text */}
            <div>
              {/* Badge */}
              <div className="hero-badge" aria-label={t('badge')}>
                <span className="hero-badge-dot" aria-hidden="true"/>
                <span
                  className="text-sm font-semibold"
                  style={{ color: 'var(--color-accent-coral)', fontFamily: 'var(--font-mono)' }}
                >
                  {t('badge')}
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl"
                style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}
              >
                {t('title_prefix')}{' '}
                <span className="hero-title-gradient">{t('title_evolve')}</span>
                {' '}{t('title_middle')}{' '}
                <span style={{ color: 'var(--color-primary-light)' }}>{t('title_team')}</span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-lg leading-relaxed"
                style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', maxWidth: '480px' }}
              >
                {t('subtitle')}
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={`/${locale}/docs/getting-started/`} className="hero-cta-primary">
                  {t('cta_start')}
                </Link>
                <a
                  href="https://github.com/sana-lazystar/jarfis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta-secondary"
                >
                  <GitHubIcon />
                  {t('cta_github')}
                </a>
              </div>
            </div>

            {/* Right: Solar System SVG — 모바일에서 텍스트보다 위로 reorder */}
            <div className="order-first lg:order-none">
              <HeroSolarSystem ariaLabel={tA11y('solar_system')} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURE CARDS ===== */}
      <FeatureCards />

      {/* ===== PHILOSOPHY GRID ===== */}
      <PhilosophyGrid />

      {/* ===== GROWTH SECTION ===== */}
      <GrowthSection />

      {/* ===== QUICKSTART SECTION ===== */}
      <QuickstartSection />
    </>
  );
}
