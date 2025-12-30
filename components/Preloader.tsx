"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./Preloader.css";

/**
 * Preloader Component with Company Logo
 * 
 * A full-screen preloader featuring the company logo as the main animated element.
 * Uses pure CSS animations (no external libraries) for optimal performance.
 * 
 * Features:
 * - Dark gradient background (minimal and modern)
 * - Company logo centered on screen
 * - Logo fade-in animation on mount
 * - Subtle scale/pulse animation while loading
 * - Smooth fade-out animation when page finishes loading
 * - Automatically unmounts after fade-out completes
 * 
 * Logo Path:
 * - Update the 'src' prop in the Image component to use your logo file path
 * - Default: /images/Main_Logo-removebg-preview.png
 */
export default function Preloader() {
  // State to control visibility and animation phase
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [shouldUnmount, setShouldUnmount] = useState(false);

  useEffect(() => {
    // Minimum display time for better UX (ensures animation is visible)
    const minDisplayTime = 2500; // 2.5 seconds - allows logo animation to be seen
    const startTime = Date.now();

    /**
     * Function to hide preloader
     * Calculates remaining time to meet minimum display requirement
     * This ensures the logo animation is visible even on fast connections
     */
    const hidePreloader = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

      setTimeout(() => {
        // Start fade-out animation
        setIsFadingOut(true);
        
        // Unmount component after fade-out animation completes (800ms)
        // This ensures the fade-out animation finishes before removing from DOM
        setTimeout(() => {
          setIsLoading(false);
          setShouldUnmount(true);
        }, 800);
      }, remainingTime);
    };

    // Check if page is already loaded (handles refresh scenarios)
    if (document.readyState === "complete") {
      hidePreloader();
    } else {
      // Wait for page to fully load (all assets, images, scripts)
      window.addEventListener("load", hidePreloader);
      
      // Fallback: hide after maximum wait time (5 seconds) 
      // Prevents preloader from showing indefinitely if load event doesn't fire
      const maxWaitTime = setTimeout(hidePreloader, 5000);

      // Cleanup function - removes event listeners on component unmount
      return () => {
        window.removeEventListener("load", hidePreloader);
        clearTimeout(maxWaitTime);
      };
    }
  }, []);

  // Don't render if component should be unmounted
  // This completely removes the component from the DOM after animations
  if (shouldUnmount || !isLoading) {
    return null;
  }

  // Determine CSS class based on animation phase
  // fadeIn: Initial entrance animation
  // fadeOut: Exit animation before unmount
  const preloaderClass = isFadingOut 
    ? "preloader fadeOut" 
    : "preloader fadeIn";

  return (
    <div className={preloaderClass}>
      {/* Logo Container - Centers the logo */}
      <div className="logoContainer">
        <Image
          src="/images/Main_Logo-removebg-preview.png"
          alt="Blueprint 3D Studios Logo"
          width={500}
          height={500}
          priority
          className="logoImage"
        />
      </div>
    </div>
  );
}
