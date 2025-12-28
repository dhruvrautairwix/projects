"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Template component for route transitions.
 * 
 * Note: The overlay logic for the about page is handled
 * in app/about/layout.tsx instead, which is more appropriate
 * for route-specific layouts in Next.js App Router.
 */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Scroll to top whenever pathname changes
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };
    
    // Immediate scroll
    scrollToTop();
    
    // Multiple attempts to ensure it works
    requestAnimationFrame(() => {
      scrollToTop();
      setTimeout(scrollToTop, 0);
      setTimeout(scrollToTop, 10);
      setTimeout(scrollToTop, 50);
      setTimeout(scrollToTop, 100);
    });
  }, [pathname]);

  return <>{children}</>;
}

