"use client";

import React from "react";

interface ProjectWindowProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export default function ProjectWindow({ title, className = "", children }: ProjectWindowProps) {
  return (
    <div
      className={`bg-black/85 text-white shadow-2xl rounded-sm border border-white/20 backdrop-blur-sm overflow-hidden select-none ${className}`}
    >
      <header className="flex items-center justify-between px-4 py-2 text-[0.65rem] uppercase tracking-[0.15em] bg-black/70 border-b border-white/10">
        <span className="truncate pr-3">{title}</span>
        <button
          className="h-6 w-6 flex items-center justify-center text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label={`Close ${title}`}
        >
          ×
        </button>
      </header>
      <div className="px-4 py-3 bg-black/80">{children}</div>
    </div>
  );
}
