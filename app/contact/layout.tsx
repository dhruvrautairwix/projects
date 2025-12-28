"use client";

import { ReactNode } from "react";
import HomeBackground from "@/components/HomeBackground";

/**
 * Contact page layout that renders the home page as background
 * and the contact page content as an overlay on top.
 * 
 * This layout ensures:
 * - Home page stays rendered and visible underneath
 * - Contact page renders as fullscreen overlay
 * - No re-rendering of home page when overlay opens
 */
export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* 
        HOME PAGE BACKGROUND:
        - Fixed container keeps home page visible
        - Stays in place when overlay opens
        - Will be blurred/darkened by overlay backdrop
        - pointerEvents: "none" prevents interaction but allows animations
      */}
      <div 
        className="fixed inset-0"
        style={{ 
          pointerEvents: "none",
          zIndex: 1,
          overflow: "hidden", // Prevent scrolling of background
        }}
      >
        {/* 
          Home page container - ensures slideshow animations continue
          The slideshow uses useEffect with setInterval to rotate images every 5 seconds
        */}
        <div className="w-full h-full" style={{ willChange: "auto" }}>
          <HomeBackground />
        </div>
      </div>
      
      {/* 
        CONTACT PAGE OVERLAY:
        - Rendered on top with z-index 100
        - Navbar (z-150) stays visible above overlay
        - Fullscreen overlay with animations
        - Scrollable content
        - Background (home page) visible through reduced opacity
      */}
      <div style={{ position: "relative", zIndex: 100 }}>
        {children}
      </div>
    </>
  );
}

