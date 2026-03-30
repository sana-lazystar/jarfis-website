'use client';

import { useEffect } from 'react';

/**
 * iOS Safari 대응 body scroll lock hook.
 * position: fixed + top: -scrollY 패턴 사용 (overflow: hidden 단독으로는 iOS Safari 미지원).
 *
 * @param isLocked - true이면 body scroll 비활성화, false이면 복원
 */
export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
}
