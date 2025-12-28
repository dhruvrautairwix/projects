"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Image from "next/image";

const card1Content = {
  title: "CLARITY THROUGH VISUALIZATION",
  paragraphs: [
    "Blueprint 3D Studios is an architectural visualization and design studio working with clients across Canada and the United States.",
    "The studio helps turn architectural ideas into clear, realistic visuals that support design decisions and client communication. Projects range from residential interiors to commercial and mixed-use developments, with a consistent focus on spatial clarity, material honesty, and thoughtful lighting.",
    "Founded and led by Priyansh Mahant, an architectural designer with a background in architectural technology, the studio is shaped by both design thinking and technical understanding. Each project is approached as more than an image; it is treated as a space that needs to function, feel right, and make sense in the real world.",
    "Blueprint 3D Studios works closely with architects, designers, and private clients to create visuals that are calm, precise, and intentional, prioritizing clarity over excess and realism over exaggeration."
  ]
};

const card2Content = {
  title: "DESIGN-DRIVEN EXCELLENCE",
  paragraphs: [
    "At Blueprint 3D Studios, we believe that exceptional visualization begins with a deep understanding of design principles and architectural intent.",
    "Our team combines technical expertise with creative vision to produce visuals that not only showcase spaces but tell their stories. We work closely with our clients to ensure every render, walkthrough, and visualization accurately represents their vision while maintaining the highest standards of quality and realism.",
    "From initial concept to final delivery, we prioritize clear communication, attention to detail, and a commitment to excellence that sets our work apart in the industry."
  ]
};

const windowBlueprint = [
  {
    id: "card-1",
    title: "ABOUT",
    width: 500,
    height: 450,
    position: { top: 80, left: 320 },
    content: card1Content,
    showLogo: true
  },
  {
    id: "card-2",
    title: "ABOUT",
    width: 500,
    height: 450,
    position: { top: 180, left: 700 },
    content: card2Content,
    showLogo: false
  }
];

export default function AboutPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [closedWindows, setClosedWindows] = useState<Set<string>>(new Set());

  // Calculate drag constraints for full screen movement
  const getDragConstraints = () => {
    if (typeof window === "undefined" || isMobile) return false;
    const margin = 100; // Margin from screen edges to keep cards partially visible
    return {
      left: -window.innerWidth + margin,
      right: window.innerWidth - margin,
      top: -window.innerHeight + margin,
      bottom: window.innerHeight - margin,
    };
  };

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Prevent body scroll when overlay is open
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleCardFocus = (cardId: string) => {
    setActiveCard(cardId);
    setZIndexCounter(prev => prev + 1);
  };

  const handleCloseWindow = (windowId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dragging when clicking close
    setClosedWindows(prev => new Set(prev).add(windowId));
    if (activeCard === windowId) {
      setActiveCard(null);
    }
  };

  // Handle overlay close - navigates back to home
  const handleCloseOverlay = () => {
    router.back();
  };

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
        {/* 
          REMOVED BACKGROUND IMAGE:
          - The about page background image was covering the home page slideshow
          - Now the home page slideshow is visible through the transparent overlay
        */}
        <div className="relative min-h-screen w-full overflow-visible">
          {/* Background removed - home page slideshow shows through */}

          <div className="relative flex min-h-screen flex-col overflow-visible">
            <div
              ref={canvasRef}
              className="relative flex-1 w-full h-full overflow-visible"
            >
              <div className="absolute inset-0" />
              <div className="relative w-full h-full">
                {windowBlueprint.map((win) => {
                  const isActive = activeCard === win.id;
                  const cardZIndex = isActive ? zIndexCounter : 10;
                  const isClosed = closedWindows.has(win.id);
                  // Only apply mobile styles after mount to prevent hydration mismatch
                  const shouldUseMobileStyles = isMounted && isMobile;
                  
                  // Don't render closed windows
                  if (isClosed) return null;
                  
                  return (
                  <motion.div
                    key={win.id}
                    drag={isMounted && !isMobile}
                    dragConstraints={getDragConstraints()}
                    dragElastic={0.1}
                    dragMomentum={false}
                    onDragStart={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.closest('button') || target.tagName === 'BUTTON') {
                        return false;
                      }
                      handleCardFocus(win.id);
                    }}
                    onPointerDown={(e) => {
                      // Only focus if not clicking on close button or scrollable content
                      const target = e.target as HTMLElement;
                      if (!target.closest('button') && !target.closest('[data-scrollable]')) {
                        handleCardFocus(win.id);
                      }
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0.94,
                      y: -40
                    }}
                    animate={{
                      opacity: 1,
                      scale: isActive ? 1.05 : 1,
                      y: 0
                    }}
                    transition={{
                      scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                    }}
                    whileHover={isMounted && !isMobile ? { scale: isActive ? 1.05 : 1.02 } : {}}
                    className={`mb-6 flex flex-col border-2 border-white bg-black text-white transition-shadow select-none ${
                      shouldUseMobileStyles ? "relative w-full" : "absolute"
                    } ${isActive ? "shadow-[0_20px_60px_rgba(0,0,0,0.8)] ring-2 ring-white/60" : ""} ${
                      !shouldUseMobileStyles ? "cursor-move" : ""
                    }`}
                    style={{
                      width: shouldUseMobileStyles ? "100%" : win.width,
                      height: shouldUseMobileStyles ? "auto" : win.height,
                      ...(shouldUseMobileStyles ? {} : { top: win.position.top, left: win.position.left }),
                      zIndex: cardZIndex
                    }}
                  >
                    {/* Header with close button */}
                    <div className="flex items-center justify-between border-b border-white px-6 py-4 flex-shrink-0">
                      <span className="text-[0.65rem] uppercase tracking-[0.35em] text-white">{win.title}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          handleCloseWindow(win.id, e);
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                        }}
                        onPointerDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                        }}
                        onTouchStart={(e) => {
                          e.stopPropagation();
                        }}
                        className="h-6 w-6 flex items-center justify-center text-white hover:text-white/70 transition-colors text-xl leading-none font-bold cursor-pointer z-50 relative"
                        aria-label="Close window"
                        type="button"
                        style={{ pointerEvents: 'auto' }}
                      >
                        ×
                      </button>
                    </div>
                    
                    {/* Content - Scrollable */}
                    <div className="flex-1 flex flex-col bg-black overflow-hidden">
                      <div 
                        data-scrollable
                        className="flex-1 overflow-y-auto px-8 py-8"
                        onPointerDown={(e) => e.stopPropagation()}
                      >
                        {/* Logo - Only show in first card */}
                        {win.showLogo && (
                          <div className="flex justify-center mb-8">
                            <Image
                              src="/images/Main_Logo.png"
                              alt="Blueprint 3D Studios Logo"
                              width={200}
                              height={200}
                              className="object-contain w-[180px] h-[180px] md:w-[200px] md:h-[200px]"
                              priority
                            />
                          </div>
                        )}
                        
                        {/* Heading - only for the second card (no logo) */}
                        {!win.showLogo && (
                          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase text-white leading-tight mb-8 break-words">
                            {win.content.title}
                          </h2>
                        )}

                        {/* Paragraphs */}
                        <div className="flex flex-col gap-6">
                          {win.content.paragraphs.map((paragraph, idx) => (
                            <p key={idx} className="text-base md:text-lg text-white leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

