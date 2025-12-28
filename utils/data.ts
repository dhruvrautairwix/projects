export interface Project {
  id: string;
  title: string;
  category: "Architecture" | "Interiors" | "Urban" | "Object";
  location: string;
  year: string;
  collaborators?: string;
  scope?: string;
  description: string;
  coverImage: string;
  images: string[];
  slug: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
  slug: string;
}

export interface Founder {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface AwardCase {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  coverImage: string;
  images: string[];
  slug: string;
}

export interface DynamiteItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  mediaType: "image" | "video";
  src: string;
  thumbnail?: string;
  dimensions?: {
    width: number;
    height: number;
  };
  position?: {
    x: number;
    y: number;
    rotation?: number;
  };
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Berta Biker Bash Event Grounds",
    category: "Urban",
    location: "Alberta, Canada",
    year: "2025",
    collaborators: "Mr. Josh",
    scope: "Site layout planning, environmental visualization, lighting strategy, experiential sequencing",
    description: "A large-scale outdoor event environment designed to support multi-day biker gatherings, camping, vendor activity, and entertainment zones within a clear and legible site layout. The project focused on organizing temporary structures, circulation paths, and activity areas in a way that feels intuitive, safe, and immersive without over-designing the landscape. The site is structured around a central gathering spine that connects camping zones, fire pits, vendor stalls, activity areas, and landmark elements such as the main entrance, bar silo, and water-based attractions. Lighting was used selectively to guide movement after dark and define social zones, while maintaining the raw, open character of the site. The result is an event ground that feels energetic, organized, and scalable, supporting both daytime activity and night-time atmosphere.",
    coverImage: "/images/berta-biker-bash-aerial-masterplan-day.jpg",
    images: [
      "/images/berta-biker-bash-aerial-masterplan-day.jpg",
      "/images/berta-biker-bash-aerial-masterplan-night.jpg",
      "/images/berta-biker-bash-activity-ground-night.jpg",
      "/images/berta-biker-bash-camping-access-path.jpg",
      "/images/berta-biker-bash-camping-zone-evening.jpg",
      "/images/berta-biker-bash-camping-zone-wide.jpg",
      "/images/berta-biker-bash-campsite-overview.jpg",
      "/images/berta-biker-bash-center-entry-path.jpg",
      "/images/berta-biker-bash-central-arrival-view.jpg",
      "/images/berta-biker-bash-fire-pit-gathering-area.jpg",
      "/images/berta-biker-bash-food-row.jpg",
      "/images/berta-biker-bash-harley-davidson-zone-1.jpg",
      "/images/berta-biker-bash-harley-davidson-zone.jpg",
      "/images/berta-biker-bash-illuminated-walkway-night-1.jpg",
      "/images/berta-biker-bash-illuminated-walkway-night.jpg",
      "/images/berta-biker-bash-inflatable-water-feature.jpg",
      "/images/berta-biker-bash-main-approach-path.jpg",
      "/images/berta-biker-bash-medical-tent.jpg",
      "/images/berta-biker-bash-open-lawn-event-space.jpg",
      "/images/berta-biker-bash-primary-circulation-path.jpg",
      "/images/berta-biker-bash-secondary-entry-path.jpg",
      "/images/berta-biker-bash-stage-field-view.jpg",
      "/images/berta-biker-bash-string-light-pathway.jpg",
      "/images/berta-biker-bash-utility-tower-bar.jpg",
      "/images/berta-biker-bash-vendor-row-overview.jpg",
      "/images/berta-biker-bash-water-activity-zone.jpg",
      "/images/berta-biker-bash-wayfinding-signage-node.jpg",
    ],
    slug: "berta-biker-bash-event-grounds",
  },
  {
    id: "2",
    title: "Centre for Oneness - Calgary",
    category: "Architecture",
    location: "Calgary, AB, Canada",
    year: "2025",
    collaborators: "Mr. Narinder",
    scope: "Exterior visualization, facade articulation, site context integration, parking and access visualization",
    description: "A two-storey community facility designed with clarity, balance, and everyday functionality in mind. The focus was on presenting a calm, approachable institutional building that reads clearly at site scale while remaining welcoming to visitors. The massing is organized as a simple horizontal composition, with a defined base and upper level articulated through material contrast. Openings are placed with consistency to support daylighting and internal use, while maintaining a composed and orderly street presence. Landscape and parking elements are integrated to show realistic movement and daily activity around the building. Exterior lighting and daytime conditions were carefully tuned to communicate material texture, scale, and accessibility, ensuring the project reads accurately in real-world use rather than as a stylized concept.",
    coverImage: "/images/centre-for-oneness-front-overview.jpg",
    images: [
      "/images/centre-for-oneness-front-overview.jpg",
      "/images/centre-for-oneness-front-elevation-day.jpg",
      "/images/centre-for-oneness-corner-elevation-day.jpg",
      "/images/centre-for-oneness-side-elevation.jpg",
      "/images/centre-for-oneness-rear-elevation.jpg",
      "/images/centre-for-oneness-site-approach-view.jpg",
      "/images/centre-for-oneness-street-perspective.jpg",
    ],
    slug: "centre-for-oneness-calgary",
  },
  {
    id: "3",
    title: "Idlewood Kitchener Residence",
    category: "Interiors",
    location: "Kitchener, ON",
    year: "2024",
    collaborators: "Mr. Paul",
    scope: "Interior visualization, lighting study, layout optimization",
    description: "A compact two-bedroom residence designed around calm, light, and spatial clarity. Open planning and careful layout optimization create a sense of ease, allowing natural light to move freely through the living spaces without compromising warmth or comfort. Material tone and lighting work together to shape atmosphere. Soft finishes, controlled reflections, and muted daylight establish a clean yet welcoming interior, balancing Scandinavian restraint with practical North American living.",
    coverImage: "/images/idlewood-residence-living-day.jpg",
    images: [
      "/images/idlewood-residence-living-day.jpg",
      "/images/idlewood-residence-living-day-1.jpg",
      "/images/idlewood-residence-dining.jpg",
      "/images/idlewood-residence-bedroom.jpg",
      "/images/idlewood-residence-bedroom-1.jpg",
      "/images/idlewood-residence-bathroom.jpg",
      "/images/idlewood-residence-bathroom-1.jpg",
      "/images/idlewood-residence-aesthetic-focus.jpg",
    ],
    slug: "idlewood-kitchener-residence",
  },
  {
    id: "4",
    title: "Detached Residential Exterior Project - Barrie",
    category: "Architecture",
    location: "Barrie, ON",
    year: "2024",
    collaborators: "Mr. Halim",
    scope: "Exterior visualization, material definition, elevation development",
    description: "A two-storey residential exterior developed to present a clear, realistic vision of a private home within its neighborhood context. The design focuses on balanced proportions, durable materials, and a straightforward architectural expression that translates cleanly from visualization to construction. A stone masonry base anchors the building visually, while vertical cladding on the upper level introduces warmth and scale control. Window placement and facade articulation are driven by interior use, privacy, and elevation balance rather than decorative symmetry. The result is a composed, build-ready residential exterior that feels grounded and appropriate for its setting.",
    coverImage: "/images/barrie-residence-front-elevation-day.jpg",
    images: [
      "/images/barrie-residence-front-elevation-day.jpg",
      "/images/barrie-residence-front-elevation-alt.jpg",
      "/images/barrie-residence-front-left-angle.jpg",
      "/images/barrie-residence-front-left-angle-alt.jpg",
      "/images/barrie-residence-side-elevation-stone-base.jpg",
      "/images/barrie-residence-side-elevation-stone-base-alt.jpg",
      "/images/barrie-residence-rear-elevation.jpg",
      "/images/barrie-residence-rear-elevation-alt.jpg",
    ],
    slug: "detached-residential-exterior-project-barrie",
  },
  {
    id: "5",
    title: "Private Residence - Long Crescent",
    category: "Architecture",
    location: "20 Long Cres, Toronto, ON",
    year: "2024",
    collaborators: "Mr. Justin",
    scope: "Exterior visualization, lighting study, material articulation, facade composition",
    description: "A contemporary private residence designed with a strong vertical presence and a restrained material language. The focus was on creating a confident street-facing elevation while maintaining warmth and privacy within, using proportion, light, and contrast rather than ornamentation. The composition is organized around tall glazed openings framed by masonry volumes, allowing daylight to penetrate deep into the interior while preserving a sense of enclosure. Evening lighting reveals depth and material texture, softening the mass and clearly communicating how the house reads from the street over time.",
    coverImage: "/images/long-crescent-residence-front-elevation-evening.jpg",
    images: [
      "/images/long-crescent-residence-front-elevation-evening.jpg",
    ],
    slug: "private-residence-long-crescent",
  },
  {
    id: "6",
    title: "Private Residence - Oakville",
    category: "Interiors",
    location: "Oakville, ON",
    year: "2024",
    collaborators: "Mr. Daniel",
    scope: "Interior visualization, lighting study, material coordination, spatial composition",
    description: "A calm, tailored bedroom interior designed around light, proportion, and material restraint. The focus was to create a space that feels composed during the day and quietly atmospheric at night, without relying on excess decoration or visual noise. Layered wall treatments, controlled reflections, and a soft neutral palette shape the room's character. Natural light is treated as a material, filtered through glazing and textiles, while warm artificial lighting reinforces depth and texture after sunset. The result is a space that feels intentional, grounded, and comfortably refined.",
    coverImage: "/images/oakville-residence-bedroom-wide-daylight.jpeg",
    images: [
      "/images/oakville-residence-bedroom-wide-daylight.jpeg",
      "/images/oakville-residence-bedroom-evening-ambience.jpeg",
      "/images/oakville-residence-bedroom-styling-detail.jpeg",
    ],
    slug: "private-residence-oakville",
  },
  {
    id: "7",
    title: "Private Residence - Kitchener",
    category: "Interiors",
    location: "Kitchener, ON",
    year: "2024",
    collaborators: "Mr. Lucas Bennett",
    scope: "Interior visualization, lighting study, material coordination, spatial composition",
    description: "A warm, contemporary living and dining interior designed around material depth, balanced lighting, and spatial continuity. The intent was to create a space that feels grounded and intimate while remaining visually open and cohesive across functions. Dark wood surfaces, soft upholstery, and stone finishes establish a rich but controlled palette. Vertical elements and built-in storage help organize the space, while curated accents introduce contrast without overpowering the composition. Lighting is layered to support both daily use and evening ambiance, with focused highlights reinforcing texture and form. The result is an interior that feels deliberate and cohesive, where comfort and visual clarity coexist without excess.",
    coverImage: "/images/kitchener-residence-dining-kitchen-overview.jpg",
    images: [
      "/images/kitchener-residence-dining-kitchen-overview.jpg",
      "/images/kitchener-residence-living-room-evening.jpg",
      "/images/kitchener-residence-living-room-media-wall.jpg",
      "/images/kitchener-residence-material-detail-focus.jpg",
    ],
    slug: "private-residence-kitchener",
  },
  {
    id: "8",
    title: "Eastview Courtyard Loft",
    category: "Interiors",
    location: "Toronto, ON",
    year: "2024",
    collaborators: "Dream Home renovators",
    scope: "Visualization, layout framing, material study",
    description: "A compact residential loft organized around a courtyard edge, prioritizing daylight, openness, and a strong indoor–outdoor relationship. The main living space is oriented toward the courtyard, allowing light and views to anchor the plan while maintaining clear sightlines and flexible use. Material selections add depth without visual clutter. Warm cladding is paired with crisp trims and selective glazing, while reflectivity is used sparingly to lift the space without glare. The result is a home that feels airy, composed, and quietly refined.",
    coverImage: "/images/eastview-loft-living-1.jpg",
    images: [
      "/images/eastview-loft-living-1.jpg",
      "/images/eastview-loft-living-2.jpg",
      "/images/eastview-loft-exterior-daylight-1.jpg",
      "/images/eastview-loft-exterior-daylight-2.jpg",
      "/images/eastview-loft-exterior-daylight-3.jpg",
      "/images/eastview-loft-exterior-evening.jpg",
      "/images/eastview-loft-kitchen.jpg",
      "/images/eastview-loft-bedroom.jpg",
      "/images/eastview-loft-bedroom-seating.jpg",
      "/images/eastview-loft-bathroom.jpg",
      "/images/eastview-loft-patio.jpg",
      "/images/eastview-loft-living-aesthetic-focus-1.jpg",
      "/images/eastview-loft-living-aesthetic-focus-2.jpg",
      "/images/eastview-loft-living-aesthetic-focus-3.jpg",
    ],
    slug: "eastview-courtyard-loft",
  },
  {
    id: "9",
    title: "Sheriff Mall Project",
    category: "Architecture",
    location: "Vaughan, ON",
    year: "2023",
    collaborators: "Mr. Arun",
    scope: "Architectural visualization, massing strategy, facade articulation",
    description: "A contemporary shopping mall project currently in development, integrating retail, public space, and urban movement within a metropolitan context. The design focuses on massing clarity, transparency, and landscaped public edges to soften scale while maintaining a strong commercial identity. Retail spaces are distributed across multiple levels to activate both the street and elevated terraces. Facade articulation and material contrast create a bold yet legible presence, while outdoor spaces introduce moments of pause within an active retail environment.",
    coverImage: "/images/sheriff-mall-front-elevation-day.png",
    images: [
      "/images/sheriff-mall-front-elevation-day.png",
      "/images/sheriff-mall-corner-perspective.png",
      "/images/sheriff-mall-street-approach-angle.png",
      "/images/sheriff-mall-site-plan-overview.png",
      "/images/sheriff-mall-public-terrace-view.jpg",
      "/images/sheriff-mall-retail-terrace-experience.jpg",
      "/images/sheriff-mall-parking-landscape-interface.jpg",
    ],
    slug: "sheriff-mall-project",
  },
  {
    id: "10",
    title: "Kitchen Interior Project",
    category: "Interiors",
    location: "Oakville, ON",
    year: "2023",
    collaborators: "Mrs. Dima Ahmed",
    scope: "Interior visualization, layout planning, lighting study",
    description: "A contemporary residential kitchen designed to balance clarity, warmth, and everyday functionality. The layout centers on a generous island that anchors the space and supports cooking, casual seating, and visual connection to adjacent living areas. Soft-toned cabinetry, quartz surfaces, and warm metal accents establish a refined yet inviting palette. Layered lighting enhances depth and material richness, resulting in a kitchen that feels modern, practical, and comfortable for daily use.",
    coverImage: "/images/oakville-kitchen-island-front-view.png",
    images: [
      "/images/oakville-kitchen-island-front-view.png",
      "/images/oakville-kitchen-island-perspective.png",
      "/images/oakville-kitchen-island-ceiling-focus.png",
      "/images/oakville-kitchen-dining-area-view.png",
      "/images/oakville-kitchen-dining-detail.png",
      "/images/oakville-kitchen-living-overview-day.png",
      "/images/oakville-kitchen-countertop-detail.png",
      "/images/oakville-kitchen-floor-plan-render.png",
    ],
    slug: "kitchen-interior-project",
  },
  {
    id: "11",
    title: "Private Residence Landscape Project - Burlington",
    category: "Urban",
    location: "Burlington, ON, Canada",
    year: "2023",
    collaborators: "Mr. Robbie",
    scope: "Landscape design visualization, hardscape layout, planting composition, outdoor lighting and seating integration",
    description: "A residential landscape project focused on organizing outdoor space into clear, usable zones while keeping the overall experience calm and understated. The intent was to create a backyard environment that feels structured without feeling rigid, using simple geometry, controlled planting, and material consistency. Hardscape elements were laid out in a grid-based pattern to define circulation and seating areas, with grass joints softening the composition and allowing the space to breathe. Planting was kept restrained and purposeful, framing paths, edges, and focal points rather than filling the site. Lighting and furniture placement were used sparingly to support everyday use and evening comfort, resulting in an outdoor space that feels balanced, practical, and visually composed.",
    coverImage: "/images/burlington-residence-landscape-overview-evening.jpg",
    images: [
      "/images/burlington-residence-landscape-overview-evening.jpg",
      "/images/burlington-residence-courtyard-grid-layout.jpg",
      "/images/burlington-residence-hardscape-axis-overview.jpg",
      "/images/burlington-residence-hardscape-detail-close.jpg",
      "/images/burlington-residence-seating-courtyard-view.jpg",
      "/images/burlington-residence-backyard-evening-seating.jpg",
      "/images/burlington-residence-lounge-area-layout.jpg",
      "/images/burlington-residence-planting-edge-composition.jpg",
    ],
    slug: "private-residence-landscape-project-burlington",
  },
  {
    id: "12",
    title: "Urban Bistro Interior",
    category: "Interiors",
    location: "Mississauga, ON",
    year: "2023",
    collaborators: "Mr. Vignesh",
    scope: "Interior visualization, seating layout, lighting study",
    description: "A compact food and beverage interior designed to feel warm, calm, and immediately legible. The layout balances clear circulation with flexible seating, allowing the space to adapt comfortably from daytime use to evening service. The planning emphasizes intuitive movement and visual clarity without sacrificing atmosphere. Lighting and material choices shape the experience. A restrained ceiling geometry organizes fixtures and reduces visual noise, while layered lighting combines ambient glow, focused table illumination, and subtle accent washes. Warm finishes are balanced with crisp detailing so the space feels relaxed in use and reads clearly in visuals.",
    coverImage: "/images/urban-bistro-mississauga-dining-1.png",
    images: [
      "/images/urban-bistro-mississauga-dining-1.png",
      "/images/urban-bistro-mississauga-dining-2.png",
      "/images/urban-bistro-mississauga-dining-3.png",
      "/images/urban-bistro-mississauga-dining-4.png",
      "/images/urban-bistro-mississauga-bar.png",
      "/images/urban-bistro-mississauga-reception.png",
      "/images/urban-bistro-mississauga-patio-1.png",
      "/images/urban-bistro-mississauga-patio-2.png",
      "/images/urban-bistro-mississauga-plan view.png",
    ],
    slug: "urban-bistro-interior",
  },
  {
    id: "13",
    title: "Law Office Interior",
    category: "Interiors",
    location: "Toronto, ON",
    year: "2024",
    collaborators: "Astron Legal Group",
    scope: "Interior visualization, layout planning, lighting study, material palette",
    description: "A contemporary workplace interior designed to project clarity, confidence, and calm. The layout establishes a clear front-of-house sequence from reception to meeting and executive spaces, allowing visitors to navigate intuitively while maintaining privacy and focus for staff. Material and lighting strategies define the tone. Fluted wall treatments introduce texture and acoustic softness, while glass partitions preserve openness without visual disruption. Recessed lighting and subtle halo accents highlight key moments, creating an environment that feels professional, composed, and human.",
    coverImage: "/images/astron-legal-reception-1.jpg",
    images: [
      "/images/astron-legal-reception-1.jpg",
      "/images/astron-legal-reception-2.jpg",
      "/images/astron-legal-boardroom.jpg",
      "/images/astron-legal-executive-cabin-1.jpg",
      "/images/astron-legal-executive-cabin-2.jpg",
      "/images/astron-legal-cabin.jpg",
    ],
    slug: "law-office-interior",
  },
  {
    id: "14",
    title: "Urban Fire Station",
    category: "Architecture",
    location: "Mississauga, ON",
    year: "2023",
    collaborators: "Sheridan College",
    scope: "Space planning, construction documentation, visualization",
    description: "A two-storey fire station designed to meet strict functional and operational requirements while maintaining a clear civic presence. The project organizes complex program elements, including apparatus bays, dormitories, administration, and vertical circulation, into a legible and efficient layout that supports daily operations and emergency response. The architectural language is restrained and purposeful. Precast concrete, flat roof forms, and curtain wall glazing establish clarity and openness, supported by a fully coordinated drawing set developed alongside the design.",
    coverImage: "/images/urban-fire-station-front-elevation-day.jpg",
    images: [
      "/images/urban-fire-station-front-elevation-day.jpg",
      "/images/urban-fire-station-exterior-day-angle.jpg",
      "/images/urban-fire-station-main-entrance-perspective.jpg",
      "/images/urban-fire-station-apparatus-bay-exterior.jpg",
      "/images/urban-fire-station-street-approach.jpg",
      "/images/urban-fire-station-aerial-site-overview.jpg",
      "/images/urban-fire-station-rear-site-context.jpg",
      "/images/urban-fire-station-roof-plan-solar.jpg",
    ],
    slug: "urban-fire-station",
  },
];

export const founders: Founder[] = [
  {
    name: "Alexandra Chen",
    role: "Principal Architect",
    bio: "With over 15 years of experience in architectural design, Alexandra leads our team in creating innovative and sustainable spaces. She holds a Master's in Architecture from MIT.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80&ixlib=rb-4.0.3",
  },
  {
    name: "Marcus Rodriguez",
    role: "Creative Director",
    bio: "Marcus brings a unique vision to our projects, combining artistic sensibility with technical expertise. His work has been featured in numerous international design publications.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80&ixlib=rb-4.0.3",
  },
];

// Preserve the original Dynamite layout positions, but populate with project data.
// Slight left shift applied to keep all cards within view.
const dynamitePositions = [
  { dimensions: { width: 360, height: 240 }, position: { x: -440, y: -130 } },
  { dimensions: { width: 300, height: 360 }, position: { x: -300, y: -170 } },
  { dimensions: { width: 320, height: 260 }, position: { x: -120, y: -150 } },
  { dimensions: { width: 340, height: 260 }, position: { x: 60, y: -140 } },
  { dimensions: { width: 360, height: 240 }, position: { x: -460, y: -20 } },
  { dimensions: { width: 460, height: 300 }, position: { x: -240, y: -30 } },
  { dimensions: { width: 420, height: 280 }, position: { x: 0, y: -10 } },
  { dimensions: { width: 360, height: 260 }, position: { x: -420, y: 90 } },
  { dimensions: { width: 340, height: 240 }, position: { x: -180, y: 120 } },
  { dimensions: { width: 340, height: 240 }, position: { x: 40, y: 130 } },
  { dimensions: { width: 320, height: 280 }, position: { x: -260, y: 40 } },
  { dimensions: { width: 340, height: 230 }, position: { x: -80, y: 20 } },
];

export const dynamiteItems: DynamiteItem[] = projects.slice(0, dynamitePositions.length).map((project, index) => {
  const layout = dynamitePositions[index];
  return {
    id: `dyn-${project.id}`,
    title: `PROJECT_${project.id} ${project.title}`,
    subtitle: project.location,
    description: project.scope ?? project.description,
    mediaType: "image",
    src: project.coverImage,
    thumbnail: project.coverImage,
    dimensions: layout.dimensions,
    position: layout.position,
  };
});

