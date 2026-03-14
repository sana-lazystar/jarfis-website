'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { DocEntry, DocCategory } from '@/lib/docs';

interface DocsSidebarProps {
  docs: DocEntry[];
  currentSlug: string;
  locale: string;
}

const CATEGORY_KEY_MAP: Record<DocCategory, string> = {
  'getting-started': 'getting_started',
  concepts: 'concepts',
  guides: 'guides',
  'api-reference': 'api_reference',
};

export default function DocsSidebar({ docs, currentSlug, locale }: DocsSidebarProps) {
  const t = useTranslations('docs');

  // 카테고리별 그룹핑
  const grouped = docs.reduce(
    (acc, doc) => {
      if (!acc[doc.category]) acc[doc.category] = [];
      acc[doc.category].push(doc);
      return acc;
    },
    {} as Record<DocCategory, DocEntry[]>
  );

  const categoryOrder: DocCategory[] = [
    'getting-started',
    'concepts',
    'guides',
    'api-reference',
  ];

  return (
    <nav aria-label="Documentation navigation" className="sticky top-20 space-y-6">
      <div
        className="text-sm font-semibold"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}
      >
        {t('sidebar_title')}
      </div>

      {categoryOrder.map((category) => {
        const categoryDocs = grouped[category];
        if (!categoryDocs || categoryDocs.length === 0) return null;

        return (
          <div key={category}>
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              {t(`categories.${CATEGORY_KEY_MAP[category]}`)}
            </h3>
            <ul className="space-y-1" role="list">
              {categoryDocs.map((doc) => {
                const isActive = doc.slug === currentSlug;
                return (
                  <li key={doc.slug}>
                    <Link
                      href={`/${locale}/docs/${doc.slug}/`}
                      className="block px-3 py-1.5 rounded text-sm transition-colors"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: isActive ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
                        background: isActive ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
                        borderLeft: isActive ? '2px solid var(--color-primary-light)' : '2px solid transparent',
                        textDecoration: 'none',
                      }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {doc.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
