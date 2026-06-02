'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NAVIGATION_PROGRESS_START } from '@/shared/lib/navigation-progress';

export function NavigationProgress() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showProgress = () => {
      setIsVisible(true);
    };

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest('a[href]');

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      if (
        anchor.target ||
        anchor.hasAttribute('download') ||
        anchor.origin !== window.location.origin ||
        anchor.pathname === window.location.pathname
      ) {
        return;
      }

      showProgress();
    };

    window.addEventListener(NAVIGATION_PROGRESS_START, showProgress);
    document.addEventListener('click', handleClick, true);

    return () => {
      window.removeEventListener(NAVIGATION_PROGRESS_START, showProgress);
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  useEffect(() => {
    if (pathname === previousPathname.current) {
      return;
    }

    previousPathname.current = pathname;

    const timeout = window.setTimeout(() => {
      setIsVisible(false);
    }, 250);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className={`navigation-progress ${isVisible ? 'is-visible' : ''}`}
    />
  );
}
