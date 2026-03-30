'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollLock } from '@/hooks/useScrollLock';

interface DocsDrawerProps {
  /** Sidebar 컨텐츠 (DocsSidebar) */
  children: React.ReactNode;
  /** 햄버거 아이콘 aria label */
  openLabel?: string;
  /** 닫기 버튼 aria label */
  closeLabel?: string;
}

/**
 * 모바일/태블릿 전용 Docs Sidebar Drawer (lg:hidden)
 * ADR-001: 좌측 슬라이드인, 80vw/max-320px, overlay, focus trap, Escape, body scroll lock
 */
export default function DocsDrawer({
  children,
  openLabel = 'Open sidebar navigation',
  closeLabel = 'Close sidebar navigation',
}: DocsDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);

  useScrollLock(isOpen);

  // Escape 키로 닫기
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Drawer가 열릴 때 첫 번째 포커스 가능 요소로 포커스 이동 (focus trap 진입)
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      focusable[0]?.focus();
    } else if (!isOpen && openBtnRef.current) {
      // 닫힌 후 토글 버튼으로 포커스 복원
      openBtnRef.current.focus();
    }
  }, [isOpen]);

  // Focus trap: 탭 키가 drawer 범위를 벗어나지 않도록
  const handleDrawerKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !drawerRef.current) return;

    const focusable = Array.from(
      drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {/* 토글 버튼: breadcrumb 좌측, lg에서는 숨김 */}
      <button
        ref={openBtnRef}
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex h-11 w-11 items-center justify-center rounded shrink-0 transition-colors"
        style={{
          border: '1px solid var(--color-border)',
          color: 'var(--color-text-secondary)',
        }}
        aria-label={openLabel}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={openLabel}
        onKeyDown={handleDrawerKeyDown}
        className="fixed left-0 top-0 bottom-0 z-50 lg:hidden overflow-y-auto"
        style={{
          width: '80vw',
          maxWidth: '320px',
          background: 'var(--color-neutral-darker)',
          borderRight: '1px solid var(--color-border)',
          paddingTop: '4rem',
          paddingBottom: '2rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform',
        }}
        // prefers-reduced-motion 대응: transition 비활성화는 CSS로 처리
        aria-hidden={!isOpen}
        tabIndex={isOpen ? undefined : -1}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={close}
          className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded transition-colors"
          style={{
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
          }}
          aria-label={closeLabel}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Sidebar 컨텐츠 (DocsSidebar) */}
        {children}
      </div>
    </>
  );
}
