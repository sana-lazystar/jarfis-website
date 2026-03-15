import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { generateSeoMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

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

type AgentKey = 'po' | 'architect' | 'tech_lead' | 'ux' | 'backend' | 'frontend' | 'devops' | 'qa' | 'security' | 'advocate' | 'critic';

const AGENT_KEYS: AgentKey[] = [
  'po', 'architect', 'tech_lead', 'ux', 'backend', 'frontend', 'devops', 'qa', 'security', 'advocate', 'critic'
];

const AGENT_AVATAR_STYLES: Record<AgentKey, { bg: string; abbr: string }> = {
  po:         { bg: 'linear-gradient(135deg, #FB7185, #E11D48)', abbr: 'PO' },
  architect:  { bg: 'linear-gradient(135deg, #0D9488, #0F766E)', abbr: 'AR' },
  tech_lead:  { bg: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', abbr: 'TL' },
  ux:         { bg: 'linear-gradient(135deg, #F472B6, #DB2777)', abbr: 'UX' },
  backend:    { bg: 'linear-gradient(135deg, #3B82F6, #1D4ED8)', abbr: 'BE' },
  frontend:   { bg: 'linear-gradient(135deg, #2DD4BF, #0D9488)', abbr: 'FE' },
  devops:     { bg: 'linear-gradient(135deg, #FBBF24, #D97706)', abbr: 'DO' },
  qa:         { bg: 'linear-gradient(135deg, #10B981, #047857)', abbr: 'QA' },
  security:   { bg: 'linear-gradient(135deg, #EF4444, #B91C1C)', abbr: 'SE' },
  advocate:   { bg: 'linear-gradient(135deg, #F59E0B, #D97706)', abbr: 'ADV' },
  critic:     { bg: 'linear-gradient(135deg, #6366F1, #4F46E5)', abbr: 'CRT' },
};

type PhaseKey = 'T' | '0' | '1' | '2' | '3' | '4' | '4_5' | '5' | '6';

const PHASE_STYLES: Record<PhaseKey, { numBg: string; numColor: string; borderHover: string; barGradient: string; label: string }> = {
  T:   { numBg: 'rgba(99,102,241,0.15)', numColor: '#818CF8', borderHover: 'rgba(99,102,241,0.4)', barGradient: 'linear-gradient(90deg,#6366F1,#818CF8)', label: 'Phase T' },
  '0': { numBg: 'rgba(13,148,136,0.15)', numColor: '#5EEAD4', borderHover: 'rgba(13,148,136,0.4)', barGradient: 'linear-gradient(90deg,#0D9488,#5EEAD4)', label: 'Phase 0' },
  '1': { numBg: 'rgba(13,148,136,0.15)', numColor: '#2DD4BF', borderHover: 'rgba(13,148,136,0.4)', barGradient: 'linear-gradient(90deg,#0D9488,#2DD4BF)', label: 'Phase 1' },
  '2': { numBg: 'rgba(251,191,36,0.15)', numColor: '#FBBF24', borderHover: 'rgba(251,191,36,0.4)', barGradient: 'linear-gradient(90deg,#F59E0B,#FBBF24)', label: 'Phase 2' },
  '3': { numBg: 'rgba(251,113,133,0.12)', numColor: '#FB7185', borderHover: 'rgba(251,113,133,0.4)', barGradient: 'linear-gradient(90deg,#FB7185,#F472B6)', label: 'Phase 3' },
  '4': { numBg: 'rgba(59,130,246,0.15)', numColor: '#60A5FA', borderHover: 'rgba(59,130,246,0.4)', barGradient: 'linear-gradient(90deg,#3B82F6,#60A5FA)', label: 'Phase 4' },
  '4_5': { numBg: 'rgba(139,92,246,0.15)', numColor: '#A78BFA', borderHover: 'rgba(139,92,246,0.4)', barGradient: 'linear-gradient(90deg,#8B5CF6,#A78BFA)', label: 'Phase 4.5' },
  '5': { numBg: 'rgba(236,72,153,0.12)', numColor: '#F472B6', borderHover: 'rgba(236,72,153,0.4)', barGradient: 'linear-gradient(90deg,#EC4899,#F472B6)', label: 'Phase 5' },
  '6': { numBg: 'rgba(16,185,129,0.15)', numColor: '#34D399', borderHover: 'rgba(16,185,129,0.4)', barGradient: 'linear-gradient(90deg,#10B981,#34D399)', label: 'Phase 6' },
};

type CompareRowKey = 'team' | 'workflow' | 'artifacts' | 'quality' | 'learning' | 'dependency' | 'continuity';

const COMPARE_ROWS: Array<{ category: string; traditional: string; jarfis: string }> = [
  { category: 'category_team',        traditional: 'single_ai',    jarfis: 'team' },
  { category: 'category_workflow',    traditional: 'suggestion',   jarfis: 'autonomous' },
  { category: 'category_artifacts',   traditional: 'completion',   jarfis: 'workflow' },
  { category: 'category_quality',     traditional: 'blackbox',     jarfis: 'transparent' },
  { category: 'category_learning',    traditional: 'vendor',       jarfis: 'selfhost' },
  { category: 'category_dependency',  traditional: 'single_dep',   jarfis: 'zero_dep' },
  { category: 'category_continuity',  traditional: 'no_continuity',jarfis: 'resilient' },
];

function FeaturesContent({ locale }: { locale: string }) {
  const t = useTranslations('features');

  const discoveryPhases: PhaseKey[] = ['T', '0', '1'];
  const designPhases: PhaseKey[] = ['2', '3'];
  const implementationPhases: PhaseKey[] = ['4', '4_5'];
  const deliveryPhases: PhaseKey[] = ['5', '6'];

  return (
    <>
      <style>{`
        /* ---- Shared animations ---- */
        @keyframes badge-dot-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }

        /* ---- Hero ---- */
        .fp-hero {
          padding-top: 8rem;
          padding-bottom: 5rem;
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .fp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 30% 40%, rgba(13,148,136,0.08) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(251,113,133,0.05) 0%, transparent 50%);
          pointer-events: none;
        }
        .fp-hero-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }
        .fp-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 1rem;
          background: rgba(13,148,136,0.12);
          border: 1px solid rgba(13,148,136,0.25);
          border-radius: 100px;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--color-primary-light);
          margin-bottom: 1.75rem;
        }
        .fp-badge-dot {
          width: 7px;
          height: 7px;
          background: var(--color-accent-coral);
          border-radius: 50%;
          animation: badge-dot-pulse 2s ease-in-out infinite;
        }
        .fp-hero h1 {
          font-family: var(--font-sans);
          font-size: clamp(2.25rem, 4vw, 3.25rem);
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: -0.02em;
          margin-bottom: 1.25rem;
          color: var(--color-text-primary);
        }
        .fp-teal-gradient {
          background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .fp-coral-accent {
          background: linear-gradient(135deg, var(--color-accent-coral), #F472B6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .fp-hero-subtitle {
          font-size: 1.125rem;
          color: var(--color-text-secondary);
          line-height: 1.75;
          max-width: 600px;
          margin: 0 auto;
        }

        /* ---- Section eyebrow / title / desc shared ---- */
        .fp-eyebrow {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--color-accent-coral);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.75rem;
        }
        .fp-section-title {
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--color-text-primary);
          margin-bottom: 1rem;
        }
        .fp-section-desc {
          font-size: 1.0625rem;
          color: var(--color-text-secondary);
          max-width: 560px;
          margin: 0 auto 3.5rem;
          line-height: 1.7;
        }

        /* ---- Section divider ---- */
        .fp-section-divider {
          position: relative;
        }
        .fp-section-divider::before {
          content: '';
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--color-border), transparent);
        }

        /* ---- Core Capabilities ---- */
        .fp-capabilities {
          padding: 6rem 0;
          background: var(--color-neutral-darker);
        }
        .fp-capabilities-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }
        .fp-cap-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .fp-cap-card {
          background: linear-gradient(180deg, var(--color-surface), rgba(15,29,50,0.5));
          border: 1px solid var(--color-border);
          border-radius: 20px;
          padding: 2.25rem 1.5rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .fp-cap-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 20px 20px 0 0;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .fp-cap-card:hover::before { opacity: 1; }
        .fp-cap-card:nth-child(1)::before { background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light)); }
        .fp-cap-card:nth-child(2)::before { background: linear-gradient(90deg, var(--color-accent-coral), #F472B6); }
        .fp-cap-card:nth-child(3)::before { background: linear-gradient(90deg, var(--color-accent-yellow), #F59E0B); }
        .fp-cap-card:nth-child(4)::before { background: linear-gradient(90deg, var(--color-primary-light), var(--color-primary)); }
        .fp-cap-card:hover {
          border-color: rgba(13,148,136,0.35);
          transform: translateY(-8px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(13,148,136,0.1);
        }
        .fp-cap-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }
        .fp-cap-icon.teal  { background: rgba(13,148,136,0.15); }
        .fp-cap-icon.coral { background: rgba(251,113,133,0.12); }
        .fp-cap-icon.yellow{ background: rgba(251,191,36,0.12); }
        .fp-cap-icon.mint  { background: rgba(94,234,212,0.10); }
        .fp-cap-card h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--color-text-primary);
          margin-bottom: 0.75rem;
        }
        .fp-cap-card p {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          line-height: 1.65;
        }
        .fp-cap-stat {
          display: inline-block;
          margin-top: 1.25rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
        }
        .fp-cap-stat.teal {
          background: rgba(13,148,136,0.1);
          color: var(--color-primary-light);
          border: 1px solid rgba(13,148,136,0.2);
        }
        .fp-cap-stat.coral {
          background: rgba(251,113,133,0.1);
          color: var(--color-accent-coral);
          border: 1px solid rgba(251,113,133,0.2);
        }
        .fp-cap-stat.yellow {
          background: rgba(251,191,36,0.1);
          color: var(--color-accent-yellow);
          border: 1px solid rgba(251,191,36,0.2);
        }
        .fp-cap-stat.mint {
          background: rgba(94,234,212,0.1);
          color: var(--color-primary-light);
          border: 1px solid rgba(94,234,212,0.2);
        }

        /* ---- Phase Pipeline ---- */
        .fp-pipeline {
          padding: 7rem 0;
          background: var(--color-neutral-dark);
          position: relative;
          overflow: hidden;
        }
        .fp-pipeline::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 20% 30%, rgba(13,148,136,0.05), transparent 60%),
            radial-gradient(ellipse at 80% 70%, rgba(251,113,133,0.03), transparent 60%);
          pointer-events: none;
        }
        .fp-pipeline-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .fp-pipeline-track {
          position: relative;
          margin-top: 1rem;
        }
        .fp-phase-group {
          margin-bottom: 2rem;
        }
        .fp-phase-group-label {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-muted);
          margin-bottom: 1.25rem;
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
          background: rgba(15,29,50,0.6);
          border: 1px solid var(--color-border);
        }
        .fp-phase-row {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .fp-phase-card {
          flex: 0 0 auto;
          width: 200px;
          background: linear-gradient(180deg, var(--color-surface), rgba(15,29,50,0.6));
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: 1.25rem 1rem;
          text-align: left;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .fp-phase-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
        }
        .fp-phase-card--dynamic::after {
          background: var(--fp-phase-bar);
        }
        .fp-phase-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.35);
        }
        .fp-phase-card--dynamic:hover {
          border-color: var(--fp-phase-hover);
        }
        .fp-phase-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.625rem;
        }
        .fp-phase-number {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          padding: 0.125rem 0.5rem;
          border-radius: 6px;
          white-space: nowrap;
        }
        .fp-phase-name {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--color-text-primary);
        }
        .fp-phase-role {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-bottom: 0.5rem;
        }
        .fp-phase-artifacts {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
        }
        .fp-phase-artifact-tag {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
          background: rgba(13,148,136,0.08);
          color: var(--color-text-muted);
          border: 1px solid rgba(26,44,71,0.5);
        }
        /* Human Gate */
        .fp-human-gate {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin: 1.5rem 0;
        }
        .fp-human-gate::before,
        .fp-human-gate::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(251,113,133,0.4), transparent);
        }
        .fp-gate-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 1rem;
          background: rgba(251,113,133,0.08);
          border: 1px solid rgba(251,113,133,0.25);
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-accent-coral);
          white-space: nowrap;
        }

        /* ---- Agents ---- */
        .fp-agents {
          padding: 7rem 0;
          background: var(--color-neutral-darker);
        }
        .fp-agents-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }
        .fp-agents-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .fp-agent-card {
          background: linear-gradient(180deg, var(--color-surface), rgba(15,29,50,0.5));
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: 1.5rem;
          text-align: left;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          transition: all 0.35s ease;
        }
        .fp-agent-card:hover {
          border-color: rgba(13,148,136,0.3);
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.3);
        }
        .fp-agent-avatar {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.8125rem;
          flex-shrink: 0;
          color: white;
        }
        .fp-agent-info { flex: 1; }
        .fp-agent-name {
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--color-text-primary);
          margin-bottom: 0.25rem;
        }
        .fp-agent-role {
          font-size: 0.8125rem;
          color: var(--color-text-muted);
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }
        .fp-agent-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
        }
        .fp-agent-tag {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
          background: rgba(13,148,136,0.08);
          color: var(--color-text-muted);
          border: 1px solid rgba(26,44,71,0.5);
        }

        /* ---- Comparison Table ---- */
        .fp-comparison {
          padding: 7rem 0;
          background: var(--color-neutral-dark);
        }
        .fp-comparison-inner {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }
        .fp-compare-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          margin-top: 0.5rem;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--color-border);
        }
        .fp-compare-table thead th {
          background: var(--color-surface);
          padding: 1.25rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--color-text-primary);
          text-align: left;
          border-bottom: 1px solid var(--color-border);
        }
        .fp-compare-table thead th:first-child { width: 22%; }
        .fp-compare-table thead th:nth-child(2) { color: var(--color-text-muted); }
        .fp-compare-table thead th:nth-child(3) { color: var(--color-primary-light); }
        .fp-compare-table tbody td {
          padding: 1rem 1.5rem;
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          border-bottom: 1px solid rgba(26,44,71,0.4);
          background: rgba(15,29,50,0.3);
        }
        .fp-compare-table tbody tr:last-child td { border-bottom: none; }
        .fp-compare-table tbody td:first-child {
          font-weight: 600;
          color: var(--color-text-primary);
        }
        .fp-compare-table tbody td:nth-child(3) {
          color: var(--color-primary-light);
          font-weight: 500;
        }
        .fp-compare-check {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(13,148,136,0.15);
          color: var(--color-primary-light);
          font-size: 0.75rem;
          margin-right: 0.375rem;
        }
        .fp-compare-x {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(100,116,139,0.1);
          color: var(--color-text-muted);
          font-size: 0.75rem;
          margin-right: 0.375rem;
        }

        /* ---- CTA ---- */
        .fp-cta {
          padding: 6rem 0;
          background: var(--color-neutral-darker);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .fp-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(13,148,136,0.08) 0%, transparent 50%);
          pointer-events: none;
        }
        .fp-cta-inner {
          max-width: 600px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }
        .fp-cta-inner h2 {
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--color-text-primary);
        }
        .fp-cta-inner p {
          font-size: 1rem;
          color: var(--color-text-secondary);
          margin-bottom: 2rem;
          line-height: 1.7;
        }
        .fp-cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        .fp-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, var(--color-primary), #0F766E);
          color: white;
          font-size: 0.9375rem;
          font-weight: 600;
          padding: 0.8125rem 1.75rem;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.35s ease;
          box-shadow: 0 4px 15px rgba(13,148,136,0.25);
        }
        .fp-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(13,148,136,0.4);
        }
        .fp-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          color: var(--color-text-secondary);
          font-size: 0.9375rem;
          font-weight: 500;
          padding: 0.8125rem 1.5rem;
          border-radius: 100px;
          text-decoration: none;
          border: 1px solid var(--color-border);
          transition: all 0.3s ease;
        }
        .fp-btn-ghost:hover {
          color: var(--color-primary-light);
          border-color: var(--color-primary);
          background: rgba(13,148,136,0.05);
        }

        /* ---- Responsive ---- */
        @media (max-width: 1024px) {
          .fp-cap-grid { grid-template-columns: repeat(2, 1fr); }
          .fp-agents-grid { grid-template-columns: repeat(2, 1fr); }
          .fp-phase-card { width: 180px; }
          .fp-compare-table thead th,
          .fp-compare-table tbody td { padding: 0.875rem 1rem; }
        }
        @media (max-width: 640px) {
          .fp-cap-grid { grid-template-columns: 1fr; }
          .fp-agents-grid { grid-template-columns: 1fr; }
          .fp-phase-row { flex-direction: column; align-items: center; }
          .fp-phase-card { width: 100%; max-width: 320px; }
          .fp-cta-actions { flex-direction: column; align-items: center; }
          .fp-compare-table thead th,
          .fp-compare-table tbody td { padding: 0.75rem; font-size: 0.75rem; }
        }
      `}</style>

      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="fp-hero fp-section-divider">
        <div className="fp-hero-inner">
          <div className="fp-hero-badge">
            <span className="fp-badge-dot" aria-hidden="true" />
            {t('hero_badge')}
          </div>
          <h1>
            <span className="fp-teal-gradient">{t('hero_title_teal')}</span>
            {' '}
            {t('hero_title_mid')}
            {' '}
            <span className="fp-coral-accent">{t('hero_title_coral')}</span>
          </h1>
          <p className="fp-hero-subtitle">{t('hero_subtitle')}</p>
        </div>
      </section>

      {/* ================================================================
          CORE CAPABILITIES
          ================================================================ */}
      <section className="fp-capabilities fp-section-divider">
        <div className="fp-capabilities-inner">
          <p className="fp-eyebrow">{t('capabilities_eyebrow')}</p>
          <h2 className="fp-section-title">{t('capabilities_title')}</h2>
          <p className="fp-section-desc">{t('capabilities_subtitle')}</p>

          <div className="fp-cap-grid">
            {/* 1. 9 Expert Agents */}
            <div className="fp-cap-card">
              <div className="fp-cap-icon teal" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5EEAD4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5" r="3"/>
                  <circle cx="4" cy="19" r="3"/>
                  <circle cx="20" cy="19" r="3"/>
                  <path d="M12 8v2M7.5 17L10 12M16.5 17L14 12"/>
                </svg>
              </div>
              <h3>{t('capability_agents_title')}</h3>
              <p>{t('capability_agents_desc')}</p>
              <span className="fp-cap-stat teal">{t('capability_agents_stat')}</span>
            </div>

            {/* 2. Claude Code Native */}
            <div className="fp-cap-card">
              <div className="fp-cap-icon coral" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FB7185" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 17 10 11 4 5"/>
                  <line x1="12" y1="19" x2="20" y2="19"/>
                </svg>
              </div>
              <h3>{t('capability_claude_title')}</h3>
              <p>{t('capability_claude_desc')}</p>
              <span className="fp-cap-stat coral">{t('capability_claude_stat')}</span>
            </div>

            {/* 3. AI-Native Artifacts */}
            <div className="fp-cap-card">
              <div className="fp-cap-icon yellow" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <h3>{t('capability_artifacts_title')}</h3>
              <p>{t('capability_artifacts_desc')}</p>
              <span className="fp-cap-stat yellow">{t('capability_artifacts_stat')}</span>
            </div>

            {/* 4. Self-Evolution */}
            <div className="fp-cap-card">
              <div className="fp-cap-icon mint" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5EEAD4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3>{t('capability_evolution_title')}</h3>
              <p>{t('capability_evolution_desc')}</p>
              <span className="fp-cap-stat mint">{t('capability_evolution_stat')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PHASE PIPELINE
          ================================================================ */}
      <section className="fp-pipeline fp-section-divider">
        <div className="fp-pipeline-inner">
          <p className="fp-eyebrow">{t('pipeline_eyebrow')}</p>
          <h2 className="fp-section-title">{t('pipeline_title')}</h2>
          <p className="fp-section-desc">{t('pipeline_subtitle')}</p>

          <div className="fp-pipeline-track">

            {/* Group 1: Discovery */}
            <PhaseGroup
              labelKey={t('pipeline_group_discovery')}
              phases={discoveryPhases}
              t={t}
              groupIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>}
            />

            <HumanGate label={t('pipeline_gate_1')} />

            {/* Group 2: Design & Planning */}
            <PhaseGroup
              labelKey={t('pipeline_group_design')}
              phases={designPhases}
              t={t}
              groupIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>}
            />

            <HumanGate label={t('pipeline_gate_2')} />

            {/* Group 3: Implementation */}
            <PhaseGroup
              labelKey={t('pipeline_group_implementation')}
              phases={implementationPhases}
              t={t}
              groupIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>}
            />

            <HumanGate label={t('pipeline_gate_3')} />

            {/* Group 4: Delivery */}
            <PhaseGroup
              labelKey={t('pipeline_group_delivery')}
              phases={deliveryPhases}
              t={t}
              groupIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
            />

          </div>
        </div>
      </section>

      {/* ================================================================
          9 AGENTS
          ================================================================ */}
      <section className="fp-agents fp-section-divider">
        <div className="fp-agents-inner">
          <p className="fp-eyebrow">{t('agents_eyebrow')}</p>
          <h2 className="fp-section-title">{t('agents_title')}</h2>
          <p className="fp-section-desc">{t('agents_subtitle')}</p>

          <div className="fp-agents-grid">
            {AGENT_KEYS.map((agentKey) => {
              const agent = t.raw(`agents.${agentKey}`) as {
                name: string;
                abbr: string;
                desc: string;
                tags: string[];
              };
              const avatarStyle = AGENT_AVATAR_STYLES[agentKey];

              return (
                <div key={agentKey} className="fp-agent-card">
                  <div
                    className="fp-agent-avatar"
                    style={{ background: avatarStyle.bg }}
                    aria-hidden="true"
                  >
                    {avatarStyle.abbr}
                  </div>
                  <div className="fp-agent-info">
                    <div className="fp-agent-name">{agent.name}</div>
                    <div className="fp-agent-role">{agent.desc}</div>
                    <div className="fp-agent-tags">
                      {agent.tags.map((tag) => (
                        <span key={tag} className="fp-agent-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          COMPARISON TABLE
          ================================================================ */}
      <section className="fp-comparison fp-section-divider">
        <div className="fp-comparison-inner">
          <p className="fp-eyebrow">{t('why_eyebrow')}</p>
          <h2 className="fp-section-title">{t('differentiator_title')}</h2>
          <p className="fp-section-desc">{t('differentiator_subtitle')}</p>

          <table className="fp-compare-table">
            <thead>
              <tr>
                <th>{t('compare_category')}</th>
                <th>{t('traditional')}</th>
                <th>{t('jarfis')}</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row.category}>
                  <td>{t(`compare.${row.category}`)}</td>
                  <td>
                    <span className="fp-compare-x" aria-hidden="true">&mdash;</span>
                    {t(`compare.${row.traditional}`)}
                  </td>
                  <td>
                    <span className="fp-compare-check" aria-hidden="true">&#10003;</span>
                    {t(`compare.${row.jarfis}`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p
            className="text-xs mt-3 text-center"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
          >
            {t('footnote')}
          </p>
        </div>
      </section>

      {/* ================================================================
          CTA
          ================================================================ */}
      <section className="fp-cta fp-section-divider">
        <div className="fp-cta-inner">
          <h2>
            {t('cta_heading').split('JARFIS').map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <span className="fp-teal-gradient">JARFIS</span>
                </span>
              ) : part
            )}
          </h2>
          <p>{t('cta_subtitle')}</p>
          <div className="fp-cta-actions">
            <Link href={`/${locale}/docs/`} className="fp-btn-primary">
              {t('cta_docs')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <a
              href="https://github.com/sana-lazystar/jarfis"
              target="_blank"
              rel="noopener noreferrer"
              className="fp-btn-ghost"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ----------------------------------------------------------------
   Sub-components (Server-side, no 'use client')
   ---------------------------------------------------------------- */

type TranslationFn = ReturnType<typeof useTranslations<'features'>>;

function PhaseCard({ phaseKey, t }: { phaseKey: PhaseKey; t: TranslationFn }) {
  const style = PHASE_STYLES[phaseKey];
  const phaseData = t.raw(`phases.${phaseKey}`) as {
    name: string;
    role: string;
    artifacts: string[];
  };

  // CSS custom property approach: set bar gradient and hover border per card
  const cssVars = {
    ['--fp-phase-bar' as string]: style.barGradient,
    ['--fp-phase-hover' as string]: style.borderHover,
  } as React.CSSProperties;

  return (
    <div className="fp-phase-card fp-phase-card--dynamic" style={cssVars}>
      <div className="fp-phase-header">
        <span
          className="fp-phase-number"
          style={{ background: style.numBg, color: style.numColor }}
        >
          {style.label}
        </span>
        <span className="fp-phase-name">{phaseData.name}</span>
      </div>
      <p className="fp-phase-role">{phaseData.role}</p>
      <div className="fp-phase-artifacts">
        {phaseData.artifacts.map((artifact) => (
          <span key={artifact} className="fp-phase-artifact-tag">{artifact}</span>
        ))}
      </div>
    </div>
  );
}

function HumanGate({ label }: { label: string }) {
  return (
    <div className="fp-human-gate" role="separator">
      <div className="fp-gate-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
        {label}
      </div>
    </div>
  );
}

function PhaseGroup({
  labelKey,
  phases,
  t,
  groupIcon,
}: {
  labelKey: string;
  phases: PhaseKey[];
  t: TranslationFn;
  groupIcon: React.ReactNode;
}) {
  return (
    <div className="fp-phase-group">
      <div>
        <span className="fp-phase-group-label">
          {groupIcon}
          {labelKey}
        </span>
      </div>
      <div className="fp-phase-row">
        {phases.map((phaseKey) => (
          <PhaseCard key={phaseKey} phaseKey={phaseKey} t={t} />
        ))}
      </div>
    </div>
  );
}

export default async function FeaturesPage({ params }: FeaturesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FeaturesContent locale={locale} />;
}
