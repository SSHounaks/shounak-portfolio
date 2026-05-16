'use client';

import { ReactNode, useEffect, useRef } from 'react';

export function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const doFadeIn = () => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(6px)';
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.35s ease-out, transform 0.35s ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  };

  useEffect(() => {
    doFadeIn();
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) doFadeIn();
    };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);

  return <div ref={ref}>{children}</div>;
}
