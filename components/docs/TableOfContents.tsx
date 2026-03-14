'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export default function TableOfContents({ className = '' }: TableOfContentsProps) {
  const t = useTranslations('docs');
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const articleHeadings = document.querySelectorAll<HTMLHeadingElement>(
      'article h2, article h3'
    );

    const headingList: Heading[] = Array.from(articleHeadings).map((heading) => {
      if (!heading.id) {
        heading.id = heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
      }
      return {
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName[1]),
      };
    });

    setHeadings(headingList);

    // Intersection Observer for scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );

    articleHeadings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className={`${className}`} aria-label="Table of contents">
      <p
        className="text-xs font-semibold uppercase tracking-wider mb-3"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
      >
        {t('on_this_page')}
      </p>
      <ul className="space-y-1" role="list">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}>
            <a
              href={`#${heading.id}`}
              className="block text-xs py-0.5 transition-colors"
              style={{
                fontFamily: 'var(--font-mono)',
                color: activeId === heading.id ? 'var(--color-primary-light)' : 'var(--color-text-muted)',
                textDecoration: 'none',
              }}
              aria-current={activeId === heading.id ? 'location' : undefined}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
