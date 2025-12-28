"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import ContactWindow from "@/components/ContactWindow";

interface WindowData {
  id: string;
  title: string;
  content: string | string[];
  initialPosition: { x: number; y: number };
}

export default function ContactPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const [windows, setWindows] = useState<WindowData[]>([
    {
      id: "phone",
      title: "PHONE",
      content: "+1 (647) 894-7187",
      initialPosition: { x: 150, y: 100 },
    },
    {
      id: "email",
      title: "EMAIL",
      content: "HELLO@blueprint3dstudios.com",
      initialPosition: { x: 530, y: 200 },
    },
    {
      id: "address",
      title: "CONTACT FORM",
      content: [""],
      initialPosition: { x: 850, y: 300 },
    },
  ]);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [zIndexOrder, setZIndexOrder] = useState<string[]>([
    "phone",
    "email",
    "address",
  ]);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const handleFocus = (id: string) => {
    setFocusedId(id);
    setZIndexOrder((prev) => {
      const newOrder = prev.filter((item) => item !== id);
      return [...newOrder, id];
    });
  };

  const handleCloseWindow = (id: string) => {
    setWindows((prev) => prev.filter((window) => window.id !== id));
    setZIndexOrder((prev) => prev.filter((item) => item !== id));
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

  const getZIndex = (id: string) => {
    return zIndexOrder.indexOf(id) + 10;
  };

  // Order cards: phone (1st), email (2nd), form (3rd) for mobile
  const orderedWindows = isMobile 
    ? [...windows].sort((a, b) => {
        const order = ["phone", "email", "address"];
        return order.indexOf(a.id) - order.indexOf(b.id);
      })
    : windows;

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
        <div className="relative w-full min-h-screen overflow-hidden" style={{ backgroundColor: 'transparent' }}>
          {/* Bordered Section for Cards */}
          <div className={`relative z-[2] w-full ${isMobile ? 'min-h-screen overflow-y-auto' : 'h-screen overflow-visible'}`}>
            {/* Drag Container */}
            <div
              ref={containerRef}
              className={`relative w-full ${isMobile ? 'flex flex-col gap-3 p-4 pb-8 pt-24' : 'h-full overflow-visible'}`}
            >
              {isMounted && orderedWindows.map((window) => (
                <ContactWindow
                  key={window.id}
                  id={window.id}
                  title={window.title}
                  content={window.content}
                  initialPosition={window.initialPosition}
                  onClose={handleCloseWindow}
                  onFocus={handleFocus}
                  zIndex={getZIndex(window.id)}
                  dragScope={containerRef}
                  isFocused={focusedId === window.id}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

