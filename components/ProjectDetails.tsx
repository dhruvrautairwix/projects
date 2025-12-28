"use client";

import Image from "next/image";
import styles from "./ProjectDetails.module.scss";
import type { Project } from "@/utils/data";

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  // Get all images including cover image
  const allImages = project.images && project.images.length > 0 
    ? [project.coverImage, ...project.images.filter(img => img !== project.coverImage)]
    : [project.coverImage];

  return (
    <div className={styles.projectDetails}>
      {/* Top Section - Split Layout: Text Left, Image Right */}
      <div className={styles.topSection}>
        {/* Left Panel - Text Content */}
        <div className={styles.textPanel}>
          <div className={styles.textContent}>
            {/* Project Title */}
            <h1 className={styles.projectTitle}>
              {project.title}
            </h1>

            {/* Description */}
            <p className={styles.projectDescription}>
              {project.description}
            </p>

            {/* Project Details Table */}
            <div className={styles.metaTable}>
              {project.category && (
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Type:</span>
                  <span className={styles.metaValue}>
                    <span className={styles.underline}>{project.category}</span>
                  </span>
                </div>
              )}
              {project.collaborators && (
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Client:</span>
                  <span className={styles.metaValue}>{project.collaborators}</span>
                </div>
              )}
              {project.location && (
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Location:</span>
                  <span className={styles.metaValue}>
                    <span className={styles.underline}>{project.location}</span>
                  </span>
                </div>
              )}
              {project.year && (
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Year:</span>
                  <span className={styles.metaValue}>{project.year}</span>
                </div>
              )}
              {project.scope && (
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Scope:</span>
                  <span className={styles.metaValue}>{project.scope}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Large Image */}
        <div className={styles.imagePanel}>
          {project.coverImage && (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className={styles.heroImage}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
        </div>
      </div>

      {/* Images - Full Width, Stacked Vertically */}
      {allImages.length > 1 && (
        <div className={styles.imagesSection}>
          {allImages.slice(1).map((imageSrc, index) => (
            <div key={`${imageSrc}-${index}`} className={styles.fullImageBlock}>
              <Image
                src={imageSrc}
                alt={`${project.title} - Image ${index + 2}`}
                width={1920}
                height={1080}
                className={styles.fullImage}
                sizes="100vw"
                loading={index < 3 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
