"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion, useMotionValue } from "framer-motion";

interface ServiceWindowProps {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  initialPosition: { x: number; y: number };
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  zIndex: number;
  dragScope: React.RefObject<HTMLDivElement>;
  isFocused?: boolean;
  isMobile?: boolean;
}

export default function ServiceWindow({
  id,
  title,
  description,
  icon,
  initialPosition,
  onClose,
  onFocus,
  zIndex,
  dragScope,
  isFocused = false,
  isMobile = false,
}: ServiceWindowProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const [dragConstraints, setDragConstraints] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });
  const windowRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Calculate drag constraints based on container
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Set initial position after mount
  useEffect(() => {
    if (isMounted) {
      requestAnimationFrame(() => {
        x.set(0);
        y.set(0);
      });
    }
  }, [isMounted, x, y]);

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") {
      return;
    }

    const calculateConstraints = () => {
      if (typeof window === "undefined") return { left: 0, right: 0, top: 0, bottom: 0 };

      const windowWidth = 420;
      let windowHeight = 360;
      
      if (windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();
        windowHeight = rect.height;
      }

      const margin = 20;
      const bottomMargin = 10;

      const minX = -initialPosition.x + margin;
      const maxX = window.innerWidth - windowWidth - initialPosition.x - margin;
      const minY = -initialPosition.y + margin;
      const maxY = window.innerHeight - windowHeight - initialPosition.y - bottomMargin;

      return {
        left: minX,
        right: maxX,
        top: minY,
        bottom: maxY,
      };
    };

    const updateConstraints = () => {
      setDragConstraints(calculateConstraints());
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          updateConstraints();
        });
      });
    }, 100);

    const handleResize = () => {
      requestAnimationFrame(() => {
        setDragConstraints(calculateConstraints());
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMounted, initialPosition, id, isFocused]);

  // Recalculate constraints when card becomes focused
  useEffect(() => {
    if (isFocused && isMounted && windowRef.current) {
      requestAnimationFrame(() => {
        const calculateConstraints = () => {
          if (typeof window === "undefined") return { left: 0, right: 0, top: 0, bottom: 0 };

          const windowWidth = 420;
          let windowHeight = 360;
          
          if (windowRef.current) {
            const rect = windowRef.current.getBoundingClientRect();
            windowHeight = rect.height;
          }

          const margin = 20;
          const bottomMargin = 10;
          const minX = -initialPosition.x + margin;
          const maxX = window.innerWidth - windowWidth - initialPosition.x - margin;
          const minY = -initialPosition.y + margin;
          const maxY = window.innerHeight - windowHeight - initialPosition.y - bottomMargin;

          return { left: minX, right: maxX, top: minY, bottom: maxY };
        };
        
        setDragConstraints(calculateConstraints());
      });
    }
  }, [isFocused, isMounted, initialPosition, id]);

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      drag={isMounted && !prefersReducedMotion && isFocused && !isMobile}
      dragConstraints={dragConstraints}
      dragElastic={0.02}
      dragMomentum={false}
      whileDrag={{ cursor: "grabbing" }}
      onPointerDown={() => {
        if (!isMobile) {
          onFocus(id);
        }
      }}
      style={{
        ...(isMobile ? {
          position: "relative",
        } : {
          left: initialPosition.x,
          top: initialPosition.y,
          x,
          y,
          position: "absolute",
        }),
        zIndex,
      }}
      className={`bg-black border-2 border-white overflow-hidden select-none ${
        isMobile 
          ? "w-full cursor-default" 
          : "cursor-move w-[420px] max-w-[90vw]"
      } ${isFocused && !isMobile ? "ring-2 ring-white/60" : ""}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/20">
        <span className="text-[11px] uppercase tracking-[0.15em] text-white">
          SERVICES
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(id);
          }}
          className="h-5 w-5 flex items-center justify-center text-white hover:text-white/70 transition-colors text-xl leading-none font-bold"
          aria-label={`Close ${title}`}
          onPointerDown={(e) => e.stopPropagation()}
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div className="px-8 py-6 bg-black">
        {/* Icon */}
        {icon && (
          <div className="mb-5 flex justify-center">
            {icon}
          </div>
        )}
        
        {/* Title */}
        <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold uppercase text-white leading-tight mb-4 break-words">
          {title}
        </h2>
        
        {/* Description */}
        <p className="text-[14px] md:text-[16px] text-white/85 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

