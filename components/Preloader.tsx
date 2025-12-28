"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const PreloaderContext = createContext<{ isLoading: boolean }>({ isLoading: true });

export const usePreloader = () => useContext(PreloaderContext);

export default function Preloader({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // show preloader only on first load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PreloaderContext.Provider value={{ isLoading }}>
      {/* Page content - always visible, not hidden by opacity */}
      <div className="relative">
        {children}
      </div>

      {/* Preloader overlay - only shows on top when loading */}
      {isMounted && (
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="preloader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
            >
              {/* Main logo container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: [0.8, 1, 0.8],
                  scale: [0.95, 1, 0.95],
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 1.05,
                }}
                transition={{ 
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center justify-center relative"
              >
                {/* Logo with gentle fade/pulse */}
                <motion.div
                  className="relative z-10"
                >
                  <Image
                    src="/images/Main_Logo-removebg-preview.png"
                    alt="Company Logo"
                    width={280}
                    height={280}
                    className="object-contain w-[280px] h-[280px] md:w-[360px] md:h-[360px] lg:w-[420px] lg:h-[420px] drop-shadow-2xl"
                    priority
                  />
                </motion.div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </PreloaderContext.Provider>
  );
}
