"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useReducedMotion, useMotionValue } from "framer-motion";
import Image from "next/image";
import type { DynamiteItem } from "@/utils/data";

interface FloatingWindowProps {
  item: DynamiteItem;
  zIndex: number;
  isFocused: boolean;
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  dragScope: React.RefObject<HTMLDivElement>;
  initialPosition?: { x: number; y: number };
  isMobile?: boolean;
}

export default function FloatingWindow({
  item,
  zIndex,
  isFocused,
  onFocus,
  onClose,
  dragScope,
  initialPosition,
  isMobile = false,
}: FloatingWindowProps) {
  const prefersReducedMotion = useReducedMotion();
  const windowRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const windowWidth = item.dimensions?.width ?? 420;
  const windowHeight = item.dimensions?.height ?? 320;
  const mediaHeight = Math.max(180, windowHeight - 80);

  const x = useMotionValue(initialPosition?.x ?? 0);
  const y = useMotionValue(initialPosition?.y ?? 0);

  // Initialize with large constraints to allow movement until actual constraints are calculated
  const [dragConstraints, setDragConstraints] = useState({
    left: -10000,
    right: 10000,
    top: -10000,
    bottom: 10000,
  });

  // Constraint calculation - memoized to avoid dependency issues
  const calculateConstraints = useCallback(() => {
    if (typeof window === "undefined" || !windowRef.current)
      return { left: -10000, right: 10000, top: -10000, bottom: 10000 };

    const margin = 0; // No margin to allow full movement to edges

    // Get actual element dimensions
    const elementRect = windowRef.current.getBoundingClientRect();
    const actualWidth = elementRect.width > 0 ? elementRect.width : windowWidth;
    const actualHeight = elementRect.height > 0 ? elementRect.height : windowHeight;

    // Use viewport dimensions for full screen movement
    // Since the window is centered (50% left, 50% top with translate), 
    // calculate constraints to allow full movement to all screen edges
    // Window center starts at viewport center (window.innerWidth/2, window.innerHeight/2)
    // To move left edge to 0: center at (actualWidth/2), translate by -(window.innerWidth/2 - actualWidth/2)
    // To move right edge to window.innerWidth: center at (window.innerWidth - actualWidth/2), translate by (window.innerWidth/2 - actualWidth/2)
    const maxOffsetX = (window.innerWidth / 2) - (actualWidth / 2) - margin;
    const maxOffsetY = (window.innerHeight / 2) - (actualHeight / 2) - margin;

    // Ensure constraints are valid (not NaN or Infinity) and allow full movement
    const constraints = { 
      left: isFinite(-maxOffsetX) && !isNaN(-maxOffsetX) ? -maxOffsetX : -10000, 
      right: isFinite(maxOffsetX) && !isNaN(maxOffsetX) ? maxOffsetX : 10000, 
      top: isFinite(-maxOffsetY) && !isNaN(-maxOffsetY) ? -maxOffsetY : -10000, 
      bottom: isFinite(maxOffsetY) && !isNaN(maxOffsetY) ? maxOffsetY : 10000 
    };

    return constraints;
  }, [windowWidth, windowHeight]);

  const clamp = useCallback((cx: number, cy: number) => {
    const c = calculateConstraints();

    return {
      x: Math.max(c.left, Math.min(c.right, cx)),
      y: Math.max(c.top, Math.min(c.bottom, cy)),
    };
  }, [calculateConstraints]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize position AFTER layout is ready
  useEffect(() => {
    if (!initialPosition || !isMounted) return;

    const update = (attempts = 0) => {
      if (!windowRef.current && attempts < 10) {
        requestAnimationFrame(() => update(attempts + 1));
        return;
      }

      if (!windowRef.current) return;

      // Use multiple requestAnimationFrame to ensure element is measured
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const c = calculateConstraints();
          // Always set constraints
          setDragConstraints(c);

          const baseX = initialPosition.x ?? 0;
          const baseY = initialPosition.y ?? 0;
          const fixed = clamp(baseX, baseY);

          x.set(fixed.x);
          y.set(fixed.y);
        });
      });
    };

    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth, windowHeight, initialPosition, isFocused, isMounted, calculateConstraints, clamp]);

  // Re-clamp on viewport resize and when card becomes focused
  useEffect(() => {
    const updateConstraints = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const c = calculateConstraints();
          setDragConstraints(c);
        });
      });
    };

    const onResize = () => {
      updateConstraints();
      const fixed = clamp(x.get(), y.get());
      x.set(fixed.x);
      y.set(fixed.y);
    };

    // Recalculate constraints on mount and when card becomes focused
    if (isMounted && windowRef.current) {
      updateConstraints();
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, isMounted, calculateConstraints, clamp]);

  const containerClass = isMobile
    ? "relative w-full bg-black/85 text-white rounded-sm border border-white/20 overflow-hidden select-none cursor-move mb-6"
    : "absolute bg-black/85 text-white rounded-sm border border-white/20 backdrop-blur-sm overflow-hidden select-none cursor-move -translate-x-1/2 -translate-y-1/2";

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.28 }}
      drag={isMounted && !prefersReducedMotion && !isMobile}
      dragConstraints={isMounted ? dragConstraints : false}
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={{ cursor: "grabbing" }}
      onDragStart={() => {
        onFocus(item.id);
      }}
      onDrag={(event, info) => {
        // Ensure drag is working - this will be called during drag
      }}
      onPointerDown={() => {
        onFocus(item.id);
      }}
      className={`${containerClass} ${isFocused ? "ring-2 ring-white/60" : ""
        }`}
      style={{
        ...(isMobile ? {} : { top: "50%", left: "50%" }),
        x,
        y,
        width: isMobile ? "100%" : windowWidth,
        height: isMobile ? "auto" : windowHeight,
        zIndex,
      }}
    >
      {/* Title Bar */}
      <header 
        className="flex items-center justify-between px-4 py-3 text-[0.7rem] uppercase tracking-[0.15em] bg-black/75 border-b border-white/10"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <span className="truncate">{item.title}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(item.id);
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="h-7 w-7 flex items-center justify-center hover:bg-white/10 rounded"
        >
          ×
        </button>
      </header>

      {/* Content */}
      <div className="relative bg-black">
        {item.mediaType === "video" ? (
          <video
            src={item.src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full object-cover"
            style={{ height: mediaHeight }}
          />
        ) : (
          <div className="relative" style={{ height: mediaHeight }}>
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes={isMobile ? "100vw" : `${Math.min(windowWidth, 800)}px`}
              className="object-cover"
              priority={false}
            />

          </div>
        )}

        {(item.subtitle || item.description) && (
          <div className="px-4 py-3 text-[0.75rem] bg-black/85">
            {item.subtitle && (
              <p className="uppercase tracking-[0.2em] text-white/60 mb-1">
                {item.subtitle}
              </p>
            )}
            {item.description && (
              <p className="text-white/80">{item.description}</p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
