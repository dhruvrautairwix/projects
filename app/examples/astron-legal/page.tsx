"use client";

/**
 * Example Page: Astron Legal Project Details
 * This demonstrates how to use the ProjectDetails component
 * with the Astron Legal project data
 */

import ProjectDetails from "@/components/ProjectDetails";
import { projects } from "@/utils/data";

export default function AstronLegalExamplePage() {
  // Find the Astron Legal project from the data
  const astronLegalProject = projects.find(
    (p) => p.slug === "law-office-interior"
  );

  if (!astronLegalProject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Project not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black">
      <ProjectDetails project={astronLegalProject} />
    </div>
  );
}
