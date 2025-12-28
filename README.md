# Architecture & Design Studio Website

A modern, full-stack website for a creative architecture and design studio. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🏠 **Home Page** - Hero section with full-screen background, animated text, parallax effects, featured projects carousel, and philosophy section
- 🧱 **Projects Page** - Grid layout with category filters, shared-element transitions, and individual project pages with galleries
- 🏆 **Awards Page** - Responsive grid of recognitions with shared-element transitions and detailed case studies
- 🧭 **About Page** - Studio introduction, founders section, philosophy block, and awards/press section
- ✉️ **Contact Page** - Contact form with EmailJS integration, Google Maps embed, and contact information
- 📰 **News/Journal Page** - Blog-style layout with article listings and individual article pages
- 💥 **Dynamite Page** - Floating window collage with drag-and-drop functionality
- ⚡ **Animations** - Smooth scrolling, parallax effects, fade/slide animations, image zoom on hover, and page transitions
- 📱 **Responsive Design** - Fully responsive across desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Minimal black/white theme with elegant transitions and strong contrast

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** - For animations
- **Lenis** - For smooth scrolling
- **EmailJS** - For contact form submissions
- **Next/Image** - For optimized image loading
- **Lucide React** - For icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DhruvR0/Frontend_Blueprint.git
cd Frontend_Blueprint
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables (optional, for EmailJS):
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## EmailJS Setup

To enable the contact form:

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Update the ContactForm component (`components/ContactForm.tsx`) with your credentials:
   - Replace `YOUR_SERVICE_ID` with your service ID
   - Replace `YOUR_TEMPLATE_ID` with your template ID
   - Replace `YOUR_PUBLIC_KEY` with your public key

Alternatively, you can use environment variables and update the component to read from them.

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with Navbar, Footer, SmoothScroll
│   ├── page.tsx                # Home page
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── projects/
│   │   ├── page.tsx            # Projects listing page
│   │   └── [slug]/
│   │       └── page.tsx        # Individual project page
│   ├── awards/
│   │   ├── page.tsx            # Awards listing page
│   │   └── [slug]/
│   │       └── page.tsx        # Individual award page
│   ├── contact/
│   │   └── page.tsx            # Contact page
│   ├── news/
│   │   ├── page.tsx            # News listing page
│   │   └── [id]/
│   │       └── page.tsx        # Individual article page
│   ├── dynamite/
│   │   └── page.tsx            # Floating window collage page
│   ├── globals.css             # Global styles
│   └── not-found.tsx           # 404 page
├── components/
│   ├── Navbar.tsx              # Navigation bar with scroll effects
│   ├── Footer.tsx              # Footer with links and social icons
│   ├── HeroSection.tsx         # Reusable hero section component
│   ├── ProjectCard.tsx         # Project card component
│   ├── ContactForm.tsx        # Contact form with EmailJS
│   ├── AnimatedText.tsx        # Text animation wrapper
│   ├── SmoothScroll.tsx        # Smooth scrolling wrapper
│   ├── Preloader.tsx           # Preloader animation
│   ├── PageTransition.tsx      # Page transition wrapper
│   ├── FloatingWindow.tsx     # Floating window component for Dynamite page
│   └── AppFooter.tsx           # Conditional footer component
├── utils/
│   └── data.ts                 # Sample data (projects, news, founders, dynamite items)
└── public/                     # Static assets
```

## Customization

### Adding Projects

Edit `utils/data.ts` to add or modify projects:

```typescript
export const projects: Project[] = [
  {
    id: "unique-id",
    title: "Project Title",
    category: "Architecture", // or "Interiors", "Urban", "Object"
    location: "City, Country",
    year: "2024",
    description: "Project description...",
    coverImage: "image-url",
    images: ["image1-url", "image2-url"],
    slug: "project-slug",
  },
  // ... more projects
];
```

### Adding News Articles

Edit `utils/data.ts` to add or modify news articles:

```typescript
export const newsArticles: NewsArticle[] = [
  {
    id: "unique-id",
    title: "Article Title",
    date: "Month Day, Year",
    excerpt: "Short excerpt...",
    image: "image-url",
    content: "Full article content...",
    slug: "article-slug",
  },
  // ... more articles
];
```

### Styling

The project uses Tailwind CSS. Customize colors, fonts, and spacing in:
- `tailwind.config.ts` - Theme configuration
- `app/globals.css` - Global styles and custom CSS

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy
4. Add environment variables in Vercel dashboard if using EmailJS

### Build for Production

```bash
npm run build
npm start
```

## Features in Detail

### Animations
- Smooth scroll transitions using Lenis
- Shared-element card to detail transitions with Framer Motion layoutId
- Parallax background sections
- Fade and slide animations on scroll (Framer Motion)
- Image zoom-in on hover
- Page transitions with fade-in/fade-out
- Lazy-load images for performance
- Floating window collage with drag-and-drop functionality

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Grid layouts that adapt to screen size
- Typography scales smoothly with viewport

### Performance
- Next.js Image optimization
- Lazy loading for images
- Code splitting with Next.js App Router
- Optimized fonts with next/font

## License

This project is open source and available under the MIT License.

## Credits

- Modern design with smooth animations and transitions
- Images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
