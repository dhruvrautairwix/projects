"use client";

/**
 * Example Page: Astron Legal Card View
 * This demonstrates the card component with Astron Legal project data
 */

import AstronLegalCard from "@/components/AstronLegalCard";
import { projects } from "@/utils/data";

export default function AstronLegalCardPage() {
  // Find the Astron Legal project
  const astronLegalProject = projects.find(
    (p) => p.slug === "law-office-interior"
  );

  if (!astronLegalProject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Project not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Example: Astron Legal Project Card
        </h1>
        <p className="text-gray-600">
          This is an example card component displaying the Astron Legal project data
        </p>
      </div>
      <AstronLegalCard project={astronLegalProject} />
    </div>
  );
}
