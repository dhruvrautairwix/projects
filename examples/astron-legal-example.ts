/**
 * Example Project Data for Astron Legal
 * This demonstrates the data structure used by the ProjectDetails component
 */

import type { Project } from "@/utils/data";

export const astronLegalExample: Project = {
  id: "2",
  title: "Law Office Interior",
  category: "Interiors",
  location: "Mississauga, ON",
  year: "2024",
  collaborators: "Astron Legal Group",
  description: "A contemporary law office that balances clarity with warmth. The brief asked for a space that communicates confidence to clients, focuses staff, and photographs well without feeling cold.",
  coverImage: "/images/astron-legal-boardroom.jpg",
  images: [
    "/images/astron-legal-boardroom.jpg",
    "/images/astron-legal-boardroom-2.jpg",
    "/images/astron-legal-reception-1.jpg",
    "/images/astron-legal-reception-2.jpg",
    "/images/astron-legal-executive-cabin-1.jpg",
    "/images/astron-legal-executive-cabin-2.jpg",
    "/images/astron-legal-cabin.jpg",
  ],
  slug: "law-office-interior",
};

/**
 * Usage Example:
 * 
 * import ProjectDetails from "@/components/ProjectDetails";
 * import { astronLegalExample } from "@/examples/astron-legal-example";
 * 
 * export default function ExamplePage() {
 *   return <ProjectDetails project={astronLegalExample} />;
 * }
 */
