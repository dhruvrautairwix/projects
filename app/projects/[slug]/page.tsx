"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/utils/data";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import ProjectDetails from "@/components/ProjectDetails";

interface ProjectPageProps {
  params: { slug: string };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const router = useRouter();

  // Ensure page can scroll normally and reset scroll on project change
  useEffect(() => {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
    window.scrollTo({ top: 0, behavior: "auto" });

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [project, slug]);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Main Content - starts from below navbar */}
      <main className="pt-14 lg:pt-16 relative z-10">
        {/* Close Button - Top Right Corner */}
        <button
          onClick={() => router.push("/projects")}
          className="fixed top-20 right-6 lg:top-24 lg:right-8 bg-black/80 hover:bg-black text-white rounded-full p-2 transition-colors duration-300 z-[100] flex items-center justify-center border border-white/30"
          aria-label="Close and go back to projects"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Project Details Component */}
        <ProjectDetails project={project} />

        {/* Footer Navigation */}
        <footer className="w-full bg-black border-t border-white/10 px-6 lg:px-12 py-10 lg:py-12">
          <div className="max-w-[1800px] mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
              <Link
                href="/projects"
                className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 font-medium"
              >
                Projects
              </Link>
              <Link
                href="/contact"
                className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}