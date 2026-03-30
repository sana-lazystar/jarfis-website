'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { DocEntry, DocCategory } from '@/lib/docs';

interface DocsSidebarProps {
  docs: DocEntry[];
  currentSlug: string;
  locale: string;
  /** Drawer 내부에서 렌더링될 때 true — 링크 터치 타겟 py-3(44px+) 적용 */
  isDrawer?: boolean;
}

const CATEGORY_KEY_MAP: Record<DocCategory, string> = {
  'getting-started': 'getting_started',
  concepts: 'concepts',
  guides: 'guides',
  'api-reference': 'api_reference',
};

export default function DocsSidebar({ docs, currentSlug, locale, isDrawer = false }: DocsSidebarProps) {
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

  // Drawer 내 링크 클릭 시 drawer를 닫을 방법이 필요하므로
  // 링크 클릭 후 라우터로 이동 (부모 DocsDrawer는 pathname 변경으로 닫힘을 감지할 수 없으므로
  // 여기서는 단순히 router.push를 사용 — drawer 닫기는 Link의 onClick으로 처리)
  // 실제 닫기는 DrawerContext나 prop 콜백 없이도 동작: drawer는 isOpen=false로만 닫히며,
  // DocsDrawer에서 링크 클릭 시 자동 닫힘은 onLinkClick prop으로 위임
  // → 이 컴포넌트는 순수 표현 컴포넌트로 유지, 링크 타겟은 표준 Next.js Link 사용

  // 데스크톱: py-1.5, 모바일 drawer 내: py-3
  const linkPaddingY = isDrawer ? 'py-3' : 'py-1.5';

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
                      className={`block px-3 ${linkPaddingY} rounded text-sm transition-colors`}
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
