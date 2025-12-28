"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // During SSR and initial mount, render consistently to prevent hydration mismatch
  // Always include bg-black to match client-side rendering
  if (!isMounted) {
    return <div className="w-full h-full min-h-screen bg-black">{children}</div>;
  }

  // If reduced motion is preferred, render without animation but with consistent className
  if (reduce) {
    return <div className="w-full h-full min-h-screen bg-black">{children}</div>;
  }

  return (
    <div className="relative w-full h-full min-h-screen bg-black">
      <AnimatePresence initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
