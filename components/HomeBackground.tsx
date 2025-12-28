"use client";

import HeroSection from "@/components/HeroSection";
import { projects } from "@/utils/data";

/**
 * Home page background component - shows only the slideshow without text
 * Used in overlay layouts to show background without content
 */
export default function HomeBackground() {
  // Use all project cover images for rotation
  const backgroundImages = projects
    .map((project) => project.coverImage)
    .filter(Boolean);

  return (
    <HeroSection
      title="Blueprint 3D Studio"
      subtitle="Making the improbable possible"
      backgroundImages={backgroundImages}
      hideContent={true}
    />
  );
}

