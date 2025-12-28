"use client";

/**
 * Example Card Component for Astron Legal Project
 * This demonstrates a card view of the project data
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/utils/data";

interface AstronLegalCardProps {
  project: Project;
}

export default function AstronLegalCard({ project }: AstronLegalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-gray-200"
    >
      {/* Cover Image */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          unoptimized
        />
      </div>

      {/* Card Content */}
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-black text-white rounded">
              {project.category}
            </span>
            <span className="text-sm text-gray-500">{project.year}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {project.title}
          </h2>
          <p className="text-gray-600 leading-relaxed">{project.description}</p>
        </div>

        {/* Project Meta Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-200">
          {project.location && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Location
              </p>
              <p className="text-sm font-medium text-gray-900">{project.location}</p>
            </div>
          )}
          {project.collaborators && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Client
              </p>
              <p className="text-sm font-medium text-gray-900">{project.collaborators}</p>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
              Status
            </p>
            <p className="text-sm font-medium text-gray-900">Completed</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
              Images
            </p>
            <p className="text-sm font-medium text-gray-900">
              {project.images?.length || 0} photos
            </p>
          </div>
        </div>

        {/* Image Preview Grid */}
        {project.images && project.images.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
              Project Gallery ({project.images.length} images)
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-md"
                >
                  <Image
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 25vw"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button - Removed since we're already on the project page */}
      </div>
    </motion.div>
  );
}
