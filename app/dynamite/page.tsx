"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import FloatingWindow from "@/components/FloatingWindow";
import { dynamiteItems } from "@/utils/data";
import Image from "next/image";

export default function DynamitePage() {
  const router = useRouter();
  const scopeRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const [openIds, setOpenIds] = useState<string[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  // Memoize clamp function to avoid dependency issues
  const clamp = useCallback((x: number, y: number, width: number, height: number) => {
    if (typeof window === "undefined" || isMobile) return { x: 0, y: 0 };

    const margin = 0; // No margin to allow full movement to edges

    // Use viewport dimensions for full screen movement
    // Since window is centered at 50%, calculate offsets from viewport center
    // Allow full movement from left edge (0) to right edge (window.innerWidth)
    const maxOffsetX = window.innerWidth / 2 - width / 2 - margin;
    const maxOffsetY = window.innerHeight / 2 - height / 2 - margin;

    return {
      x: Math.max(-maxOffsetX, Math.min(maxOffsetX, x)),
      y: Math.max(-maxOffsetY, Math.min(maxOffsetY, y)),
    };
  }, [isMobile]);

  // Screen sizing - only after mount to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
    const update = () =>
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Compute initial positions - only after mount
  useEffect(() => {
    if (!isMounted) return;

    const attempt = () => {
      if (!scopeRef.current) return false;
      const rect = scopeRef.current.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    };

    let tries = 0;
    const max = 20;

    const wait = () => {
      if (!attempt()) {
        tries++;
        if (tries < max) requestAnimationFrame(wait);
        return;
      }

      const newPositions = dynamiteItems.reduce((acc, item) => {
        const base = item.position ?? { x: 0, y: 0 };
        const width = item.dimensions?.width ?? 420;
        const height = item.dimensions?.height ?? 320;

        acc[item.id] = clamp(base.x, base.y - 80, width, height);
        return acc;
      }, {} as Record<string, { x: number; y: number }>);

      setPositions(newPositions);
    };

    wait();
  }, [isMobile, isMounted, clamp]);

  // Reveal windows one-by-one
  useEffect(() => {
    if (!positions || Object.keys(positions).length === 0) return;

    setOpenIds([]);
    let t: number[] = [];

    dynamiteItems.forEach((item, index) => {
      const timeout = window.setTimeout(() => {
        setOpenIds((prev) => [...prev, item.id]);
        setFocusedId(item.id);
      }, index * 520);

      t.push(timeout);
    });

    return () => t.forEach((x) => clearTimeout(x));
  }, [positions]);

  const handleFocus = (id: string) => {
    setFocusedId(id);
    setOpenIds((prev) => [...prev.filter((x) => x !== id), id]);
  };

  const handleCloseWindow = (id: string) => {
    setOpenIds((prev) => prev.filter((x) => x !== id));
  };

  // Handle overlay close - navigates back to home
  const handleCloseOverlay = () => {
    router.back();
  };

  // Prevent body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {/* 
        OVERLAY CONTAINER:
        - Fixed positioning covers entire viewport
        - High z-index ensures it's above home page
        - Backdrop blur and darkening for visual separation
        - Slide up animation from bottom with fade
      */}
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ 
          duration: 0.5, 
          ease: [0.22, 1, 0.36, 1] // Custom easing for smooth slide
        }}
        className="fixed inset-0 z-[100] overflow-y-auto text-white"
        style={{ 
          // Backdrop blur effect - minimal blur so slideshow is clearly visible
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        {/* Dark overlay - very light so background slideshow is clearly visible */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Close button - fixed position top right */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onClick={handleCloseOverlay}
          className="fixed top-6 right-6 z-[101] w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
          aria-label="Close overlay"
        >
          <X className="w-6 h-6 text-white" strokeWidth={2} />
        </motion.button>

        {/* Scrollable content container */}
        {/* Background removed - home page slideshow shows through */}
        <div className="relative min-h-screen h-screen text-white" style={{ backgroundColor: 'transparent' }}>
          {/* CONTENT */}
          <div className="absolute inset-0 z-[2] overflow-visible">
            <div
              ref={scopeRef}
              className="relative w-full h-full overflow-visible"
              suppressHydrationWarning
            >
              {isMounted && (
                <AnimatePresence>
                  {openIds.map((id) => {
                    const item = dynamiteItems.find((x) => x.id === id);
                    if (!item || !positions[item.id]) return null;

                    return (
                      <FloatingWindow
                        key={item.id}
                        item={item}
                        zIndex={openIds.indexOf(item.id) + 20}
                        isFocused={focusedId === item.id}
                        onFocus={handleFocus}
                        onClose={handleCloseWindow}
                        dragScope={scopeRef}
                        initialPosition={positions[item.id]}
                        isMobile={isMobile}
                      />
                    );
                  })}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
