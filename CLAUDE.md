# CLAUDE.md

## Project Overview

Personal portfolio website for Parth Kheni — a Computer Engineering student at Boston University specializing in Machine Learning and Robotics. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. Deployed at https://parthkheni.com.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **3D Graphics**: Three.js + React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- **Fonts**: Geist Sans & Geist Mono (via `next/font/google`)
- **Analytics**: Google Analytics (G-KVZ0GYH9FB)
- **Linting**: ESLint with `eslint-config-next` (core-web-vitals + typescript)

## Project Structure

```
app/
  page.tsx              # Homepage — hero, about, skills, education, contact
  layout.tsx            # Root layout with metadata, GA script, CommandPalette, TerminalNotification
  globals.css           # Tailwind import, CSS variables, noise texture overlay
  sitemap.ts            # Dynamic sitemap generation for SEO
  data/
    site.ts             # Central data store — all content (projects, experiences, education, publications, awards, skills, links)
  components/
    NeuralNetworkViz.tsx    # Canvas-based neural network animation (hero)
    ParticleBackground.tsx  # Particle effect background for subpages
    Project3DModel.tsx      # React Three Fiber 3D models per project
    SimpleSkills.tsx        # Skills section
    SpacePhysicsResearch.tsx # Space physics research highlight
    ContactForm.tsx         # Contact form section
    CommandPalette.tsx      # Keyboard command palette
    TerminalNotification.tsx # Terminal-style notification
    Certifications.tsx      # Certifications display
    ImpactMetrics.tsx       # Impact metrics component
    TechRadar.tsx           # Tech radar visualization
    CodeShowcase.tsx        # Code showcase component
    MLDashboard.tsx         # ML dashboard visualization
    PortfolioMeta.tsx       # Portfolio metadata component
  projects/
    page.tsx            # Projects listing with 3D models
    [slug]/page.tsx     # Dynamic project detail pages
  experience/page.tsx   # Experience timeline
  certifications/page.tsx # Certifications page
  research/page.tsx     # Publications & awards
  game/
    page.tsx            # Neural Network Playground page
    GameClient.tsx      # Interactive ML demo (client component)
public/                 # Static assets (SVGs, PDFs, favicon)
```

## Architecture & Patterns

### Data-Driven Content
All portfolio content lives in `app/data/site.ts`. This single file defines typed objects for projects, experiences, education, publications, awards, skills, and links. Pages render from this data — update `site.ts` to add/modify content.

### Client vs Server Components
- Pages that need interactivity (homepage, projects, game) use `"use client"`
- Static pages (experience, research, certifications) are server components
- 3D/canvas components are always client-side with `mounted` state guards

### Styling Conventions
- Dark theme throughout: `bg-black`, `text-zinc-50`, zinc color scale
- Minimalist aesthetic: `font-light`, wide tracking, generous spacing (`py-32`, `mb-24`)
- Borders use `border-zinc-900`
- Hover states: `hover:text-zinc-50 transition-colors`
- Max content width: `max-w-6xl mx-auto px-6`

### Navigation
Nav is repeated per page (not extracted to a shared component). Each page has its own nav with links to other sections.

## Common Tasks

### Development
```bash
npm run dev       # Start dev server at localhost:3000
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

### Adding a New Project
1. Add a new `Project` object to `site.projects` in `app/data/site.ts`
2. The project will auto-appear on `/projects` and get a detail page at `/projects/[slug]`
3. Optionally add a 3D model case in `Project3DModel.tsx`

### Adding a New Page/Section
1. Create `app/<section>/page.tsx`
2. Include nav bar and footer (copy pattern from existing pages)
3. Add route to sitemap in `app/sitemap.ts`
4. Add nav link in homepage nav and other page navs

### Updating Content
Edit `app/data/site.ts` — experiences, education, publications, awards, and skills are all defined there with TypeScript types.

## Important Notes

- The `"use client"` directive is required for any component using hooks, canvas, or Three.js
- Three.js components should be guarded with a `mounted` state to avoid SSR issues
- Path alias `@/*` maps to project root (configured in `tsconfig.json`)
- PDFs and static files go in `public/`
