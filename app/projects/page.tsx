"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { projects } from "@/utils/data";

export default function ProjectsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Reset selected project when pathname changes (navigation)
  useEffect(() => {
    setSelectedProject(null);
  }, [pathname]);


  // Scroll detection for projects header background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop || window.pageYOffset;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Ensure we always have at least 7 cards for layout structure
  const filled = [...projects];
  while (filled.length < 7 && projects.length > 0) {
    filled.push({
      ...projects[0],
      id: "placeholder-" + filled.length, 
      title: "Coming Soon",
      slug: "coming-soon-" + filled.length,
    });
  }

  // Note: Body scroll is handled by the fixed container with overflow-y-auto
  // No need to prevent body scroll as the container handles it

  const handleSelect = (slug: string | null) => {
    setSelectedProject(slug);
  };

  const handleNavigate = (slug: string) => {
    // Close any overlay and ensure scrolling is enabled before navigation
    setSelectedProject(null);
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
    router.push(`/projects/${slug}`);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const selectedProjectData = selectedProject
    ? projects.find((p) => p.slug === selectedProject) || null
    : null;

  const handleClose = () => {
    router.back();
  };

  // Safety check: if no projects, show message
  if (filled.length === 0) {
    return (
      <div className="pt-20 bg-[#111] text-white min-h-screen flex items-center justify-center">
        <p className="text-xl">No projects found.</p>
      </div>
    );
  }

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
        className="relative z-[100] min-h-screen text-white"
        data-projects-scroll-container
        style={{ 
          // Backdrop blur effect - minimal blur so slideshow is clearly visible
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        {/* Dark overlay - very light so background slideshow is clearly visible */}
        <div className="fixed inset-0 bg-black/20 pointer-events-none" />
        


        {/* Scrollable content container */}
        <div className="relative min-h-screen w-full">
          <div className="pt-20 bg-transparent text-white min-h-screen relative z-10">
      <ProjectModal project={selectedProjectData} onClose={handleCloseModal} />
      
      {/* Projects Header Bar - Sticky positioning */}
      <div 
        className={`sticky top-[64px] z-[145] border-y border-white hidden lg:block bg-black transition-all duration-300 ${
          selectedProject ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-8 xl:px-16">
          <div className="flex items-center justify-between py-2">
            <h2 className="text-white text-base font-semibold uppercase tracking-wider">
              PROJECTS
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                className="h-6 w-6 flex items-center justify-center text-white hover:text-white/70 transition-colors text-xl leading-none font-bold"
                aria-label="Close and go to home"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* GRID LAYOUT - Matching Reference Image */}
      <section className="py-10 pt-4 lg:pt-4">
        <div className="w-full px-2">

          {/* ROW 1 - Three columns with vertical offset - Matching Reference */}
          {filled[0] && filled[1] && filled[2] && (
            <div className="flex flex-col md:flex-row gap-4 mb-12 md:mb-24">
              <div className="md:w-[40%] h-[400px] md:h-[520px] relative md:-mt-6">
                <ProjectCard project={filled[0]} activeSlug={selectedProject} onSelect={handleSelect} onNavigate={handleNavigate} noAspect />
              </div>
              <div className="md:w-[35%] h-[350px] md:h-[420px] relative md:mt-32">
                <ProjectCard project={filled[1]} activeSlug={selectedProject} onSelect={handleSelect} onNavigate={handleNavigate} noAspect />
              </div>
              <div className="md:w-[25%] h-[280px] md:h-[340px] relative md:mt-10">
                <ProjectCard project={filled[2]} activeSlug={selectedProject} onSelect={handleSelect} onNavigate={handleNavigate} noAspect />
              </div>
            </div>
          )}

          {/* ROW 2 - Two columns staggered */}
          {filled[3] && filled[4] && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12 md:mb-24 ">
              {/* Left card - MS WELLINGTON */}
              <div className="md:col-span-4 h-[380px] md:h-[480px] relative md:-mt-12">
                <ProjectCard project={filled[3]} activeSlug={selectedProject} onSelect={handleSelect} onNavigate={handleNavigate} noAspect />
              </div>
              <div className="md:col-span-8 h-[420px] md:h-[540px] relative md:mt-8">
                <ProjectCard project={filled[4]} activeSlug={selectedProject} onSelect={handleSelect} onNavigate={handleNavigate} noAspect />
              </div>
            </div>
          )}

          {/* ROW 3 - Two columns reverse staggered */}
          {filled[5] && filled[6] && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12 md:mb-24">
              <div className="md:col-span-7 h-[400px] md:h-[520px] relative md:mt-4">
                <ProjectCard project={filled[5]} activeSlug={selectedProject} onSelect={handleSelect} onNavigate={handleNavigate} noAspect />
              </div>
              <div className="md:col-span-5 h-[350px] md:h-[460px] relative md:-mt-8">
                <ProjectCard project={filled[6]} activeSlug={selectedProject} onSelect={handleSelect} onNavigate={handleNavigate} noAspect />
              </div>
            </div>
          )}

          {/* ROW 4 - Three columns with vertical offset (same as Row 1) */}
          {filled[7] && filled[8] && filled[9] && (
            <div className="flex flex-col md:flex-row gap-4 mb-12 md:mb-24">
              <div className="md:w-[40%] h-[400px] md:h-[520px] relative md:-mt-6">
                <ProjectCard project={filled[7]} activeSlug={selectedProject} onSelect={handleSelect} onNavigate={handleNavigate} noAspect />
              </div>
              <div className="md:w-[35%] h-[350px] md:h-[420px] relative md:mt-32">
                <ProjectCard project={filled[8]} activeSlug={selectedProject} onSelect={handleSelect} onNavigate={handleNavigate} noAspect />
              </div>
              <div className="md:w-[25%] h-[280px] md:h-[340px] relative md:mt-10">
                <ProjectCard project={filled[9]} activeSlug={selectedProject} onSelect={handleSelect} onNavigate={handleNavigate} noAspect />
              </div>
            </div>
          )}

          {/* ROW 5 - Two columns staggered (same as Row 2) */}
          {filled[10] && filled[11] && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12 md:mb-24">
              <div className="md:col-span-4 h-[380px] md:h-[480px] relative md:-mt-12">
                <ProjectCard project={filled[10]} activeSlug={selectedProject} onSelect={handleSelect} onNavigate={handleNavigate} noAspect />
              </div>
              <div className="md:col-span-8 h-[420px] md:h-[540px] relative md:mt-8">
                <ProjectCard project={filled[11]} activeSlug={selectedProject} onSelect={handleSelect} onNavigate={handleNavigate} noAspect />
              </div>
            </div>
          )}

          {/* ROW 6 - Two columns reverse staggered (same as Row 3) */}
          {filled[12] && filled[13] && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12 md:mb-24">
              <div className="md:col-span-7 h-[400px] md:h-[520px] relative md:mt-4">
                <ProjectCard project={filled[12]} activeSlug={selectedProject} onSelect={handleSelect} onNavigate={handleNavigate} noAspect />
              </div>
              <div className="md:col-span-5 h-[350px] md:h-[460px] relative md:-mt-8">
                <ProjectCard project={filled[13]} activeSlug={selectedProject} onSelect={handleSelect} onNavigate={handleNavigate} noAspect />
              </div>
            </div>
          )}

            </div>
          </section>
    </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}