"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Box, Wrench, Boxes as Cube, Eye } from "lucide-react";
import ServiceWindow from "@/components/ServiceWindow";

interface ServiceData {
  id: string;
  title: string;
  description: string;
  iconComponent: React.ComponentType<{ className?: string }>;
  initialPosition: { x: number; y: number };
}

export default function ServicesPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const [services, setServices] = useState<ServiceData[]>([
    {
      id: "3d-animation",
      title: "3D Animation",
      description: "Our 3D Animation Services offer dynamic, immersive walkthroughs of your projects, allowing you to present your designs in motion and showcase every detail from all angles.",
      iconComponent: Box,
      initialPosition: { x: 250, y: 80 }, // pulled slightly left/up to fit
    },
    {
      id: "renovation",
      title: "Renovation Rendering Services",
      description: "Transform your renovation ideas into vivid visualizations with our 3D Rendering Services, making it easier to visualize changes and make informed decisions.",
      iconComponent: Wrench,
      initialPosition: { x: 650, y: 180 }, // reduce overflow
    },
    {
      id: "3d-rendering",
      title: "3D Rendering",
      description: "Experience your projects in stunning clarity with our 3D Rendering Services, turning concepts into vivid, realistic images.",
      iconComponent: Cube,
      initialPosition: { x: 980, y: 300 }, // move in from right edge
    },
    {
      id: "vr-services",
      title: "VR Services",
      description: "Our VR Services deliver fully immersive virtual experiences, allowing you to explore and interact with your architectural designs in a realistic 3D environment.",
      iconComponent: Eye,
      initialPosition: { x: 300, y: 380 }, // tighten to screen
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
    "3d-animation",
    "renovation",
    "3d-rendering",
    "vr-services",
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
    setServices((prev) => prev.filter((service) => service.id !== id));
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

  // Order cards for mobile
  const orderedServices = isMobile 
    ? [...services].sort((a, b) => {
        const order = ["3d-animation", "renovation", "3d-rendering", "vr-services"];
        return order.indexOf(a.id) - order.indexOf(b.id);
      })
    : services;

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
          <div className={`relative z-[2] w-full ${isMobile ? 'min-h-screen overflow-y-auto' : 'min-h-screen overflow-y-auto'}`}>
            {/* Container for Cards - Absolute positioning for random layout */}
            <div
              ref={containerRef}
              className={`relative w-full ${isMobile ? 'flex flex-col gap-3 p-4 pb-8 pt-24' : 'min-h-screen pb-8 overflow-visible'}`}
            >
              {isMounted && orderedServices.map((service, index) => {
                const IconComponent = service.iconComponent;
                return (
                  <ServiceWindow
                    key={service.id}
                    id={service.id}
                    title={service.title}
                    description={service.description}
                    icon={<IconComponent className="w-16 h-16 text-amber-600" />}
                    initialPosition={service.initialPosition}
                    onClose={handleCloseWindow}
                    onFocus={handleFocus}
                    zIndex={getZIndex(service.id)}
                    dragScope={containerRef}
                    isFocused={focusedId === service.id}
                    isMobile={isMobile}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

