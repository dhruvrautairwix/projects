"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { KeyboardEvent, PointerEvent } from "react";
import { AwardCase } from "@/utils/data";

interface AwardCardProps {
  award: AwardCase;
  activeSlug: string | null;
  onSelect: (slug: string | null) => void;
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

export default function AwardCard({ award, activeSlug, onSelect }: AwardCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDimmed = Boolean(activeSlug && activeSlug !== award.slug);
  const cardLayoutId = prefersReducedMotion ? undefined : `award-card-${award.slug}`;
  const mediaLayoutId = prefersReducedMotion ? undefined : `award-media-${award.slug}`;
  const overlayLayoutId = prefersReducedMotion ? undefined : `award-overlay-${award.slug}`;
  const titleLayoutId = prefersReducedMotion ? undefined : `award-title-${award.slug}`;
  const categoryLayoutId = prefersReducedMotion ? undefined : `award-category-${award.slug}`;

  const hoverMotion = prefersReducedMotion
    ? undefined
    : {
        scale: 1.03,
        y: -3,
        transition: { duration: 0.18, ease: "easeOut" },
      };

  const imageHoverMotion = prefersReducedMotion
    ? undefined
    : {
        scale: 1.05,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      };

  const handleSelect = () => onSelect(award.slug);

  const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.button !== 0) return;
    handleSelect();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      onSelect(award.slug);
    }
    if (event.key === "Enter") {
      onSelect(award.slug);
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
      className="group"
    >
      <Link href={`/awards/${award.slug}`} prefetch legacyBehavior>
        <motion.a
          layoutId={cardLayoutId}
          className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          whileHover={hoverMotion}
          whileFocus={hoverMotion}
          onPointerDown={handlePointerDown}
          onKeyDown={handleKeyDown}
        >
          <div className="relative overflow-hidden aspect-[4/3] bg-gray-200 rounded-lg will-change-transform">
            <motion.div
              layoutId={mediaLayoutId}
              className="relative w-full h-full"
              whileHover={imageHoverMotion}
            >
              <Image
                src={award.coverImage}
                alt={award.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300 ease-out">
              <motion.h3
                layoutId={titleLayoutId}
                className="text-white text-xl font-bold mb-1"
              >
                {award.title}
              </motion.h3>
              <motion.p
                layoutId={categoryLayoutId}
                className="text-white/80 text-sm"
              >
                {award.category}
              </motion.p>
            </div>
          </div>
          <div className="mt-4 md:hidden">
            <h3 className="text-xl font-bold mb-1">{award.title}</h3>
            <p className="text-gray-600 text-sm">{award.category}</p>
          </div>
        </motion.a>
      </Link>
    </motion.article>
  );
}
