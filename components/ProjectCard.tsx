"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { KeyboardEvent, PointerEvent } from "react";
import { Project } from "@/utils/data";

interface ProjectCardProps {
  project: Project;
  activeSlug: string | null;
  onSelect: (slug: string | null) => void;
  noAspect?: boolean;
  onNavigate?: (slug: string) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.995 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ProjectCard({ project, activeSlug, onSelect, noAspect, onNavigate }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDimmed = Boolean(activeSlug && activeSlug !== project.slug);
  const cardLayoutId = prefersReducedMotion ? undefined : `project-card-${project.slug}`;
  const mediaLayoutId = prefersReducedMotion ? undefined : `project-media-${project.slug}`;
  const overlayLayoutId = prefersReducedMotion ? undefined : `project-overlay-${project.slug}`;
  const titleLayoutId = prefersReducedMotion ? undefined : `project-title-${project.slug}`;


  const handleSelect = () => onSelect(project.slug);
  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate(project.slug);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.button !== 0) return;
    if (!onNavigate) {
      handleSelect();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      if (onNavigate) {
        handleNavigate();
      } else {
        onSelect(project.slug);
      }
    }
    if (event.key === "Enter") {
      if (onNavigate) {
        event.preventDefault();
        handleNavigate();
      } else {
        onSelect(project.slug);
      }
    }
  };

  return (
    <motion.article
      variants={cardVariants}
      animate={{
        opacity: isDimmed ? 0.3 : 1,
        scale: isDimmed ? 0.98 : 1,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className={`group ${noAspect ? 'h-full flex flex-col' : ''} max-w-full`}
    >
      <div className={noAspect ? 'h-full flex flex-col' : ''}>
        <Link 
          href={`/projects/${project.slug}`} 
          prefetch 
          legacyBehavior
          onClick={(event) => {
            if (onNavigate) {
              event.preventDefault();
              event.stopPropagation();
              handleNavigate();
              return;
            }
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
          }}
        >
          <motion.a
          layoutId={cardLayoutId}
            className={`block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black ${noAspect ? 'h-full flex flex-col' : ''} bg-black max-w-full border border-white/20`}
            onPointerDown={handlePointerDown}
          onKeyDown={handleKeyDown}
        >
            {/* Image Section */}
            <div className={`relative overflow-hidden aspect-[4/3] bg-gray-200 will-change-transform`} style={{ width: '100%' }}>
            <motion.div
              layoutId={mediaLayoutId}
              className="relative w-full h-full"
              style={{ 
                width: '100%', 
                height: '100%',
                position: 'relative'
              }}
            >
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </motion.div>
            <motion.div
              layoutId={overlayLayoutId}
              className="absolute inset-0 bg-black/0"
              animate={{
                backgroundColor: isDimmed ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0)",
                transition: { duration: 0.25, ease: "easeOut" },
              }}
            />
              {/* Title Overlay - Top Left Corner */}
              <div className="absolute top-0 left-0 p-2">
              <motion.h3
                layoutId={titleLayoutId}
                  className="text-white text-4xl lg:text-5xl xl:text-6xl 2xl:text-5xl font-black uppercase leading-tight tracking-tight"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
              >
                {project.title}
              </motion.h3>
            </div>
          </div>
            
            {/* Bottom Section - Black Background with Category and Location */}
            <div className="bg-black px-6 lg:px-8 py-4 lg:py-5 flex-shrink-0">
              <div className="flex flex-col gap-1">
                <span className="text-white text-xs lg:text-sm font-semibold uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-white text-xs lg:text-sm font-normal">
                  {project.location}
                </span>
              </div>
          </div>
          </motion.a>
        </Link>
      </div>
    </motion.article>
  );
}

