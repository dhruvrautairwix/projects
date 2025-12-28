"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/utils/data";
import { useEffect } from "react";
import { X } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleCloseModal = () => {
    onClose();
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [project]);

  // Dispatch scroll events for navbar detection and reset scroll position
  useEffect(() => {
    if (!project) {
      // Reset navbar when modal closes
      window.dispatchEvent(new Event('scroll'));
      return;
    }
    
    // Reset scroll to top when modal opens
    const modal = document.querySelector('[data-modal-container]') as HTMLElement;
    if (modal) {
      modal.scrollTop = 0;
      // Trigger scroll event to update navbar
      window.dispatchEvent(new Event('scroll'));
    }
  }, [project]);

  if (!project) return null;

  // Get all images including cover image
  const allImages = project.images && project.images.length > 0 
    ? [project.coverImage, ...project.images.filter(img => img !== project.coverImage)]
    : [project.coverImage];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black z-50 overflow-y-auto"
          onClick={handleCloseModal}
          data-modal-container
        >
          {/* Close Button - Fixed Top Right, Below Navbar */}
          <button
            onClick={handleCloseModal}
            className="fixed top-20 lg:top-24 right-6 z-[60] bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors backdrop-blur-sm"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="w-full pt-16 lg:pt-20">
            {/* Top Section - Split Layout: Text Left, Image Right */}
            <div className="w-full bg-black text-white min-h-screen flex flex-col lg:flex-row">
              {/* Left Panel - Text Content */}
              <div className="w-full lg:w-1/2 flex items-center py-16 lg:py-24 px-6 lg:px-12 xl:px-16">
                <div className="max-w-2xl mx-auto w-full space-y-8">
                  {/* Project Title */}
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold uppercase leading-tight">
                    {project.title}
                  </h1>

                  {/* Description */}
                  <p className="text-base lg:text-lg text-white/90 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Project Details Table */}
                  <div className="space-y-0 border-t border-white/20 pt-6">
                    {project.category && (
                      <div className="flex items-start py-3 border-b border-white/20 gap-4">
                        <span className="text-white/60 text-sm uppercase tracking-wider w-40 flex-shrink-0">Type:</span>
                        <span className="text-white text-sm flex-1">
                          <span className="underline">{project.category}</span>
                        </span>
                      </div>
                    )}
                    {project.location && (
                      <div className="flex items-start py-3 border-b border-white/20 gap-4">
                        <span className="text-white/60 text-sm uppercase tracking-wider w-40 flex-shrink-0">Location:</span>
                        <span className="text-white text-sm flex-1">
                          <span className="underline">{project.location}</span>
                        </span>
                      </div>
                    )}
                    {project.year && (
                      <div className="flex items-start py-3 border-b border-white/20 gap-4">
                        <span className="text-white/60 text-sm uppercase tracking-wider w-40 flex-shrink-0">Year:</span>
                        <span className="text-white text-sm flex-1">{project.year}</span>
                      </div>
                    )}
                    {project.collaborators && (
                      <div className="flex items-start py-3 border-b border-white/20 gap-4">
                        <span className="text-white/60 text-sm uppercase tracking-wider w-40 flex-shrink-0">Collaborators:</span>
                        <span className="text-white text-sm flex-1">{project.collaborators}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Panel - Large Image */}
              <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-[65vh] h-auto">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Images - Full Width, Stacked Vertically with Spacing */}
            <div className="mt-8 lg:mt-12">
            {allImages.slice(1).map((imageSrc, index) => (
              <motion.div
                key={`${imageSrc}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full relative mb-8 lg:mb-12 mx-4 lg:mx-8 xl:mx-12"
              >
                <div className="relative w-full min-h-[60vh] lg:min-h-[70vh]">
                  <Image
                    src={imageSrc}
                    alt={`${project.title} - Image ${index + 2}`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </div>
              </motion.div>
            ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
