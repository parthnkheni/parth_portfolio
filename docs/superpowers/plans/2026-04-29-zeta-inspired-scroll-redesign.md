# Zeta-Inspired Hero + BIDMC Scroll Cinematic — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the parth-portfolio homepage with a Zeta-inspired hero and a 5-scene scroll-pinned cinematic showcasing the GC-ACT autonomous suturing project. Add the Summer 2026 UROP award.

**Architecture:** Framer Motion (`motion/react` v12) drives scroll-pinned scene timing via `useScroll` + `useTransform`. Lenis provides buttery smooth-scroll. Five scene components are pure functions of `progress` (0→1), each one self-contained. Hybrid light/dark theme stays intact; the scroll section uses a scoped `.cinematic-dark` class that overrides CSS variables locally without disturbing the user's theme preference.

**Tech Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion (motion v12) · Lenis · Instrument Serif (display) · Geist Sans/Mono (body)

**Spec:** [`docs/superpowers/specs/2026-04-29-zeta-inspired-scroll-redesign-design.md`](../specs/2026-04-29-zeta-inspired-scroll-redesign-design.md)

**Note on testing:** This codebase has no unit-test framework (no `test` script in `package.json`). Verification is via `npm run build` (catches TypeScript errors and Next.js compile failures) + manual browser checks. Do not add a test runner — that is out of scope.

---

## Phase 1: Foundation (data + design tokens)

### Task 1: Install scroll dependencies

**Files:**
- Modify: `package.json` (auto-modified by npm)
- Modify: `package-lock.json` (auto-modified by npm)

- [ ] **Step 1.1: Install `motion` and `lenis`**

Run from `/Users/parthkheni/Desktop/parth-portfolio`:
```bash
npm install motion lenis
```
Expected: both packages added to `dependencies`. `motion` should be `^12.x`. `lenis` should be `^1.x`.

- [ ] **Step 1.2: Verify install + build still works**

Run:
```bash
npm run build
```
Expected: build succeeds. No type errors. No runtime errors.

- [ ] **Step 1.3: Commit**

```bash
git add package.json package-lock.json
git commit -m "Add motion and lenis dependencies for scroll cinematic"
```

---

### Task 2: Update CSS palette tokens

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 2.1: Replace the entire `app/globals.css` file**

Open `app/globals.css` and replace its full contents with:

```css
@import "tailwindcss";

:root {
  --background: #fafafa;
  --foreground: #171717;
  --muted: #737373;
  --secondary: #404040;
  --border: #e5e5e5;
  --border-light: #f0f0f0;
  --hover-bg: #f5f5f5;
  --accent: #0d9488;
  --accent-hover: #0f766e;
}

:root.dark {
  --background: #0a1520;
  --foreground: #e5e7eb;
  --muted: #94a3b8;
  --secondary: #cbd5e1;
  --border: #1e2937;
  --border-light: #172033;
  --hover-bg: #142033;
  --accent: #14b8a6;
  --accent-hover: #5eead4;
}

/* Scoped dark mode for scroll cinematic — overrides user theme locally */
.cinematic-dark {
  --background: #0a1520;
  --foreground: #f1f5f9;
  --muted: #94a3b8;
  --secondary: #cbd5e1;
  --accent: #5eead4;
  --accent-hover: #99f6e4;
  --border: #1e2937;
  background: var(--background);
  color: var(--foreground);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-serif: var(--font-serif);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans), system-ui, sans-serif;
  transition: background 0.2s ease, color 0.2s ease;
}

a:focus-visible, button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

a, button {
  transition: color 0.15s ease;
}

::selection {
  background: var(--accent);
  color: white;
}
```

- [ ] **Step 2.2: Verify build succeeds with new tokens**

Run:
```bash
npm run build
```
Expected: build succeeds. The new `--accent` (teal) replaces the old blue everywhere, but no compile errors.

- [ ] **Step 2.3: Commit**

```bash
git add app/globals.css
git commit -m "Switch accent to teal, deepen dark mode to navy, add cinematic-dark scope"
```

---

### Task 3: Add Instrument Serif font

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 3.1: Read current layout.tsx**

Run:
```bash
cat app/layout.tsx
```
Note the current font imports and `<html>` className composition for the next step.

- [ ] **Step 3.2: Add `Instrument_Serif` import and variable**

Modify `app/layout.tsx`. At the top, alongside the existing `next/font/google` imports for Geist Sans and Geist Mono, add:

```ts
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});
```

Then update the `<html>` element's `className` to include `${instrumentSerif.variable}` alongside the existing `geistSans.variable` and `geistMono.variable`.

Example (your exact existing names may vary — preserve them):
```tsx
<html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
```

- [ ] **Step 3.3: Verify build succeeds and font loads**

Run:
```bash
npm run build
```
Expected: build succeeds. `next/font` will fetch and self-host Instrument Serif.

- [ ] **Step 3.4: Commit**

```bash
git add app/layout.tsx
git commit -m "Load Instrument Serif display font via next/font/google"
```

---

### Task 4: Add UROP award and flagshipBidmc scene data

**Files:**
- Modify: `app/data/site.ts`

- [ ] **Step 4.1: Add the `Scene` and `FlagshipBidmc` types**

In `app/data/site.ts`, locate the existing type exports (`Project`, `Experience`, `Education`, `Activity`, `Publication`, `Award`). After the `Award` type definition, add:

```ts
export type Scene = {
  id: string;
  eyebrow: string;
  headline: string;
  body: string;
};

export type FlagshipBidmc = {
  eyebrow: string;
  scenes: Scene[];
};
```

- [ ] **Step 4.2: Add `flagshipBidmc` to the `site` object's type annotation**

In the same file, find the `export const site: { ... }` type annotation block. Inside the type literal (alongside `experiences`, `education`, etc.), add:

```ts
flagshipBidmc: FlagshipBidmc;
```

- [ ] **Step 4.3: Add UROP entry at the top of `awards[]`**

Find the `awards: [` array. Insert this object as the **first** element (above the existing NSF ACCESS entry):

```ts
{
  title: "BU Undergraduate Research Opportunities Program (UROP) Award",
  detail: "Funded summer research with Dr. Luisa Capannolo at the BU Center for Space Physics — advancing neural-network forecasting of energetic electron precipitation in the radiation belts.",
  date: "Summer 2026",
},
```

- [ ] **Step 4.4: Add `flagshipBidmc` data**

Inside the `site` object value, after the closing `]` of `awards` and before `projects:`, add:

```ts
flagshipBidmc: {
  eyebrow: "Senior Design · Team 23 · BIDMC × BU BME",
  scenes: [
    {
      id: "gap",
      eyebrow: "01 · The Gap",
      headline: "Surgical robots are still teleoperated.",
      body: "Suturing is the bottleneck — slow, fatiguing, every motion driven by a surgeon at a console. Surgical-site infections account for ~20% of all hospital infections. No surgical platform autonomously sutures today.",
    },
    {
      id: "data",
      eyebrow: "02 · The Data",
      headline: "1,890 expert demonstrations. 853 hand-labeled trajectories.",
      body: "Built on the SutureBot dataset from Johns Hopkins — 10 silicone tissue phantoms, multi-camera plus kinematics at 30 Hz. Our team labeled 853 trajectories with 16 surgical gesture phases drawn from JIGSAWS.",
    },
    {
      id: "model",
      eyebrow: "03 · The Model",
      headline: "Action Chunking Transformer. 106 million parameters.",
      body: "Three cameras and arm state in. The next 60 actions out — a smooth two-second motion plan, predicted at 30 Hz. EfficientNet-B3 visual encoder, transformer decoder, CVAE for style variation.",
    },
    {
      id: "monitor",
      eyebrow: "04 · The Monitor",
      headline: "A second model watches what's happening — 93.3% accuracy on unseen tissue.",
      body: "A ResNet-18 gesture classifier reads each camera frame and labels which sub-task phase is active. A real-time scoreboard for the surgeon, and a foundation for safety supervision.",
    },
    {
      id: "result",
      eyebrow: "05 · The Result",
      headline: "0.707 mm. 0.803 mm. Under a millimeter.",
      body: "Mean path error on knot tying and needle throw — about half the prior published baseline (SutureBot, 1.50 mm). Both clear the 1 mm deployment threshold, and stay under 1 mm even on tissue the model never saw. Pathway to autonomous wound closure on a real dVRK at JHU.",
    },
  ],
},
```

- [ ] **Step 4.5: Verify build catches no type errors**

Run:
```bash
npm run build
```
Expected: build succeeds. TypeScript validates the new types and the data conforms.

- [ ] **Step 4.6: Manually verify UROP appears on /research**

Run:
```bash
npm run dev
```
Open http://localhost:3000/research and confirm the UROP entry is listed first under Awards & Honors. Then stop the dev server (Ctrl+C).

- [ ] **Step 4.7: Commit**

```bash
git add app/data/site.ts
git commit -m "Add Summer 2026 UROP award and flagshipBidmc scene data"
```

---

## Phase 2: Scroll machinery

### Task 5: Create SmoothScrollProvider

**Files:**
- Create: `app/components/scroll/SmoothScrollProvider.tsx`

- [ ] **Step 5.1: Create the directory**

Run:
```bash
mkdir -p app/components/scroll/scenes
```

- [ ] **Step 5.2: Create `SmoothScrollProvider.tsx`**

Create file `app/components/scroll/SmoothScrollProvider.tsx` with this exact content:

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 5.3: Verify build**

Run:
```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 5.4: Commit**

```bash
git add app/components/scroll/SmoothScrollProvider.tsx
git commit -m "Add SmoothScrollProvider with Lenis and reduced-motion guard"
```

---

### Task 6: Mount SmoothScrollProvider in layout.tsx

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 6.1: Import SmoothScrollProvider**

In `app/layout.tsx`, add to the import block at the top:

```ts
import SmoothScrollProvider from "./components/scroll/SmoothScrollProvider";
```

- [ ] **Step 6.2: Wrap the body's children**

Find the `<body>` element in the JSX. Wrap whatever is inside it with `<SmoothScrollProvider>...</SmoothScrollProvider>`. Keep all existing components (CommandPalette, TerminalNotification, etc.) inside the provider.

Example:
```tsx
<body className="...">
  <SmoothScrollProvider>
    {/* existing children: children, CommandPalette, TerminalNotification, etc. */}
  </SmoothScrollProvider>
</body>
```

- [ ] **Step 6.3: Verify build**

Run:
```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 6.4: Manually verify smooth scroll on existing pages**

Run:
```bash
npm run dev
```
Visit http://localhost:3000. Scroll the homepage with mouse wheel. The scroll motion should feel smoother / slightly inertial compared to before. Stop the dev server.

- [ ] **Step 6.5: Commit**

```bash
git add app/layout.tsx
git commit -m "Mount SmoothScrollProvider in root layout"
```

---

### Task 7: Create Scene primitive component

**Files:**
- Create: `app/components/scroll/Scene.tsx`

- [ ] **Step 7.1: Create `Scene.tsx`**

Create file `app/components/scroll/Scene.tsx` with this exact content:

```tsx
"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import type { ReactNode } from "react";

type SceneProps = {
  progress: MotionValue<number>;
  eyebrow: string;
  headline: string;
  body: string;
  visual: ReactNode;
};

export default function Scene({ progress, eyebrow, headline, body, visual }: SceneProps) {
  // Text fades in from progress 0.05 → 0.25, holds, fades out 0.75 → 0.95
  const opacity = useTransform(progress, [0, 0.05, 0.25, 0.75, 0.95, 1], [0, 0, 1, 1, 0, 0]);
  const y = useTransform(progress, [0, 0.25, 0.75, 1], [40, 0, 0, -20]);

  return (
    <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 md:px-12">
      <div aria-hidden="true" className="hidden md:block">
        {visual}
      </div>
      <motion.div style={{ opacity, y }} className="max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
          {eyebrow}
        </p>
        <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl leading-[1.1] mb-6">
          {headline}
        </h2>
        <p className="text-[15px] md:text-base leading-relaxed text-[var(--secondary)]">
          {body}
        </p>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 7.2: Verify build**

Run:
```bash
npm run build
```
Expected: build succeeds. Note: this file isn't used yet — that's fine, just verifying it compiles.

- [ ] **Step 7.3: Commit**

```bash
git add app/components/scroll/Scene.tsx
git commit -m "Add Scene primitive for scroll cinematic"
```

---

## Phase 3: Visual assets

### Task 8: Copy slide PNGs to public/bidmc/

**Files:**
- Create: `public/bidmc/fig-classifier.png`
- Create: `public/bidmc/fig-accuracy.png`

- [ ] **Step 8.1: Create directory and copy files**

Run:
```bash
mkdir -p public/bidmc
cp "/Users/parthkheni/Downloads/knowledge_export/slides presentation--revamp/fig_slide11_v5_classifier.png" public/bidmc/fig-classifier.png
cp "/Users/parthkheni/Downloads/knowledge_export/slides presentation--revamp/fig_slide10_v5_accuracy.png" public/bidmc/fig-accuracy.png
```

- [ ] **Step 8.2: Verify files exist**

Run:
```bash
ls -la public/bidmc/
```
Expected: two PNG files, ~155KB and ~168KB.

- [ ] **Step 8.3: Commit**

```bash
git add public/bidmc/
git commit -m "Add classifier and accuracy figure assets for BIDMC scenes"
```

---

## Phase 4: Hero + ScrollSection shell

### Task 9: Create HomeHero component

**Files:**
- Create: `app/components/HomeHero.tsx`

- [ ] **Step 9.1: Create `HomeHero.tsx`**

Create file `app/components/HomeHero.tsx` with this exact content:

```tsx
"use client";

import Link from "next/link";
import { site } from "../data/site";
import ThemeToggle from "./ThemeToggle";

export default function HomeHero() {
  return (
    <header className="border-b border-[var(--border)]">
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-16">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-2">
              {site.tagline.split(" · ").slice(1).join(" · ")}
            </p>
          </div>
          <nav className="flex gap-4 text-sm text-[var(--muted)] font-mono">
            <a href={`mailto:${site.email}`} className="hover:text-[var(--foreground)]">email</a>
            <a href={site.links.github} target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)]">github</a>
            <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)]">linkedin</a>
            <a href={site.links.resume} className="hover:text-[var(--foreground)]">resume</a>
            <ThemeToggle />
          </nav>
        </div>

        <h1 className="font-[family-name:var(--font-serif)] text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-8 text-[var(--foreground)]">
          {site.name}
        </h1>

        <div className="space-y-4 text-[16px] leading-relaxed text-[var(--secondary)] max-w-xl">
          <p>
            I&apos;m a Computer Engineering student at Boston University with a concentration
            in Machine Learning. I take projects from data all the way to deployment — training,
            evaluation, integration.
          </p>
          <p>
            My work spans surgical robotics simulation, space weather prediction, and embedded
            systems. I care about systems that are easy to reproduce, measure, and improve over time.
          </p>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 9.2: Verify build**

Run:
```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 9.3: Commit**

```bash
git add app/components/HomeHero.tsx
git commit -m "Add HomeHero with display-serif headline"
```

---

### Task 10: Create ScrollSection container

**Files:**
- Create: `app/components/scroll/ScrollSection.tsx`

- [ ] **Step 10.1: Create `ScrollSection.tsx`**

Create file `app/components/scroll/ScrollSection.tsx` with this exact content:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { site } from "../../data/site";
import Scene from "./Scene";
import SceneGap from "./scenes/SceneGap";
import SceneData from "./scenes/SceneData";
import SceneModel from "./scenes/SceneModel";
import SceneMonitor from "./scenes/SceneMonitor";
import SceneResult from "./scenes/SceneResult";

const visuals = {
  gap: SceneGap,
  data: SceneData,
  model: SceneModel,
  monitor: SceneMonitor,
  result: SceneResult,
} as const;

export default function ScrollSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scenes = site.flagshipBidmc.scenes;
  const sceneCount = scenes.length;

  return (
    <section
      ref={containerRef}
      className="cinematic-dark relative"
      style={{ height: `${sceneCount * 100}vh` }}
      aria-labelledby="flagship-bidmc-heading"
    >
      <h2 id="flagship-bidmc-heading" className="sr-only">
        {site.flagshipBidmc.eyebrow}
      </h2>

      {/* Sticky stage that holds all scenes; pinned for the full section */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section eyebrow */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
            {site.flagshipBidmc.eyebrow}
          </p>
        </div>

        {/* Each scene gets a sliced range of the section's scrollYProgress */}
        {scenes.map((scene, i) => {
          const start = i / sceneCount;
          const end = (i + 1) / sceneCount;
          // local progress = 0 at scene's start, 1 at scene's end
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const localProgress = useTransform(scrollYProgress, [start, end], [0, 1], {
            clamp: true,
          });
          const Visual = visuals[scene.id as keyof typeof visuals];

          return (
            <Scene
              key={scene.id}
              progress={localProgress}
              eyebrow={scene.eyebrow}
              headline={scene.headline}
              body={scene.body}
              visual={<Visual progress={localProgress} />}
            />
          );
        })}

        {/* Bottom progress bar — visual marker of where you are in the section */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-[var(--accent)] origin-left"
          style={{ scaleX: scrollYProgress, width: "100%" }}
        />
      </div>

      {/* Mobile fallback: stack scenes normally, no pinning */}
      <noscript>
        <style>{`section[aria-labelledby="flagship-bidmc-heading"] > div { position: static !important; height: auto !important; }`}</style>
      </noscript>
    </section>
  );
}
```

- [ ] **Step 10.2: Note about the eslint-disable**

The `useTransform` call inside `.map()` would normally violate the rules-of-hooks lint. It's safe here because `scenes` is static data (read once at build time from `site.ts`) — the hook order is deterministic across renders. The `eslint-disable` line is intentional.

- [ ] **Step 10.3: Don't build yet**

This file imports five scene visuals that don't exist yet. We'll build those in Phase 5, then verify the build.

- [ ] **Step 10.4: Commit**

```bash
git add app/components/scroll/ScrollSection.tsx
git commit -m "Add ScrollSection container with per-scene progress slicing"
```

---

## Phase 5: Five scene visuals

Each scene is a function of `progress: MotionValue<number>` (0→1). Visuals use `useTransform` to derive animated values from the local progress.

### Task 11: SceneGap visual

**Files:**
- Create: `app/components/scroll/scenes/SceneGap.tsx`

- [ ] **Step 11.1: Create `SceneGap.tsx`**

Create file `app/components/scroll/scenes/SceneGap.tsx`:

```tsx
"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

export default function SceneGap({ progress }: { progress: MotionValue<number> }) {
  // Suture path draws in from progress 0.1 → 0.6
  const pathLength = useTransform(progress, [0.1, 0.6], [0, 1]);
  // Statistic counter ticks 0 → 20 from progress 0.3 → 0.8
  const counter = useTransform(progress, [0.3, 0.8], [0, 20]);
  const counterText = useTransform(counter, (v) => `${Math.round(v)}%`);

  return (
    <div className="relative w-full max-w-md aspect-square mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
        {/* Tissue line */}
        <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(241,245,249,0.15)" strokeWidth="2" />
        {/* Suture stitches drawing in */}
        <motion.path
          d="M 60 200 Q 90 160, 120 200 T 180 200 T 240 200 T 300 200 T 360 200"
          stroke="var(--accent)"
          strokeWidth="2.5"
          fill="none"
          style={{ pathLength }}
        />
        {/* Needle dot at the end */}
        <motion.circle cx="360" cy="200" r="4" fill="var(--accent)" style={{ opacity: pathLength }} />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 text-center">
        <motion.p className="font-mono text-7xl text-[var(--foreground)]">
          {counterText}
        </motion.p>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mt-2">
          of hospital infections
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 11.2: Commit**

```bash
git add app/components/scroll/scenes/SceneGap.tsx
git commit -m "Add SceneGap visual: suture path + 20% counter"
```

---

### Task 12: SceneData visual

**Files:**
- Create: `app/components/scroll/scenes/SceneData.tsx`

- [ ] **Step 12.1: Create `SceneData.tsx`**

```tsx
"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

export default function SceneData({ progress }: { progress: MotionValue<number> }) {
  // Episode counter ticks 0 → 1890 from progress 0.1 → 0.7
  const episodes = useTransform(progress, [0.1, 0.7], [0, 1890]);
  const episodesText = useTransform(episodes, (v) => Math.round(v).toLocaleString());

  // Trajectories counter 0 → 853 from progress 0.4 → 0.9
  const trajs = useTransform(progress, [0.4, 0.9], [0, 853]);
  const trajsText = useTransform(trajs, (v) => Math.round(v).toLocaleString());

  // Phase tags fade in staggered
  const tagOpacity = (start: number) => useTransform(progress, [start, start + 0.1], [0, 1]);
  const phaseTags = ["G2", "G3", "G6", "G7", "G10", "G11", "G13", "G14", "G15", "G16"];

  return (
    <div className="relative w-full max-w-md mx-auto space-y-8">
      <div>
        <motion.p className="font-mono text-6xl text-[var(--foreground)]">
          {episodesText}
        </motion.p>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mt-1">
          expert demonstrations · SutureBot
        </p>
      </div>

      <div>
        <motion.p className="font-mono text-6xl text-[var(--accent)]">
          {trajsText}
        </motion.p>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mt-1">
          trajectories hand-labeled by our team
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {phaseTags.map((tag, i) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = tagOpacity(0.5 + i * 0.03);
          return (
            <motion.span
              key={tag}
              style={{ opacity }}
              className="font-mono text-xs px-2 py-1 border border-[var(--border)] text-[var(--secondary)]"
            >
              {tag}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 12.2: Commit**

```bash
git add app/components/scroll/scenes/SceneData.tsx
git commit -m "Add SceneData visual: episode + trajectory counters with JIGSAWS phase tags"
```

---

### Task 13: SceneModel visual

**Files:**
- Create: `app/components/scroll/scenes/SceneModel.tsx`

- [ ] **Step 13.1: Create `SceneModel.tsx`**

```tsx
"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

export default function SceneModel({ progress }: { progress: MotionValue<number> }) {
  // Architecture nodes appear in sequence
  const nodeOpacity = (start: number) => useTransform(progress, [start, start + 0.05], [0, 1]);
  const lineLength = (start: number) => useTransform(progress, [start, start + 0.1], [0, 1]);

  // Parameter counter ticks 0 → 106 from 0.5 → 0.95
  const params = useTransform(progress, [0.5, 0.95], [0, 106]);
  const paramsText = useTransform(params, (v) => Math.round(v).toString());

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 400 320" className="w-full h-auto" fill="none">
        {/* Three camera inputs on the left */}
        {[0, 1, 2].map((i) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const op = nodeOpacity(0.05 + i * 0.04);
          return (
            <motion.g key={`cam-${i}`} style={{ opacity: op }}>
              <rect x="20" y={60 + i * 70} width="60" height="40" rx="4" stroke="var(--accent)" strokeWidth="1.5" />
              <text x="50" y={84 + i * 70} textAnchor="middle" fontSize="10" fill="var(--muted)" fontFamily="monospace">cam {i + 1}</text>
            </motion.g>
          );
        })}

        {/* Connecting lines to encoder */}
        {[0, 1, 2].map((i) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const ll = lineLength(0.2 + i * 0.03);
          return (
            <motion.line
              key={`line-${i}`}
              x1="80" y1={80 + i * 70}
              x2="160" y2="160"
              stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2"
              style={{ pathLength: ll }}
            />
          );
        })}

        {/* Encoder block */}
        <motion.g style={{ opacity: nodeOpacity(0.3) }}>
          <rect x="160" y="135" width="90" height="50" rx="4" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="205" y="160" textAnchor="middle" fontSize="11" fill="var(--foreground)" fontFamily="monospace">EfficientNet</text>
          <text x="205" y="175" textAnchor="middle" fontSize="10" fill="var(--muted)" fontFamily="monospace">B3</text>
        </motion.g>

        {/* Connecting line to transformer */}
        <motion.line
          x1="250" y1="160"
          x2="310" y2="160"
          stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2"
          style={{ pathLength: lineLength(0.4) }}
        />

        {/* Transformer + CVAE block */}
        <motion.g style={{ opacity: nodeOpacity(0.45) }}>
          <rect x="310" y="125" width="80" height="70" rx="4" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="350" y="155" textAnchor="middle" fontSize="11" fill="var(--foreground)" fontFamily="monospace">Transformer</text>
          <text x="350" y="172" textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="monospace">+ CVAE</text>
        </motion.g>

        {/* Output: 60-step chunk */}
        <motion.g style={{ opacity: nodeOpacity(0.55) }}>
          <text x="350" y="225" textAnchor="middle" fontSize="10" fill="var(--muted)" fontFamily="monospace">60 × 20</text>
          <text x="350" y="240" textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="monospace">action chunk</text>
        </motion.g>
      </svg>

      <div className="text-center mt-6">
        <motion.p className="font-mono text-5xl text-[var(--foreground)]">
          <span>{paramsText}</span>
          <span className="text-2xl text-[var(--muted)] ml-1">M</span>
        </motion.p>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mt-1">
          parameters
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 13.2: Commit**

```bash
git add app/components/scroll/scenes/SceneModel.tsx
git commit -m "Add SceneModel visual: architecture diagram with parameter counter"
```

---

### Task 14: SceneMonitor visual

**Files:**
- Create: `app/components/scroll/scenes/SceneMonitor.tsx`

- [ ] **Step 14.1: Create `SceneMonitor.tsx`**

```tsx
"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";

export default function SceneMonitor({ progress }: { progress: MotionValue<number> }) {
  // Image fades in 0.05 → 0.3
  const imgOpacity = useTransform(progress, [0.05, 0.3], [0, 1]);
  // Accuracy meter ticks 10 → 93.3 from 0.4 → 0.9
  const accuracy = useTransform(progress, [0.4, 0.9], [10, 93.3]);
  const accuracyText = useTransform(accuracy, (v) => v.toFixed(1));
  const meterScale = useTransform(progress, [0.4, 0.9], [0.1, 0.933]);

  return (
    <div className="relative w-full max-w-md mx-auto space-y-6">
      <motion.div style={{ opacity: imgOpacity }} className="bg-white rounded p-3">
        <Image
          src="/bidmc/fig-classifier.png"
          alt=""
          width={1200}
          height={440}
          className="w-full h-auto"
          priority={false}
        />
      </motion.div>

      <div>
        <div className="flex items-baseline justify-between mb-2">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
            tissue 7 (held out)
          </p>
          <motion.p className="font-mono text-3xl text-[var(--accent)]">
            <span>{accuracyText}</span>
            <span className="text-base text-[var(--muted)] ml-1">%</span>
          </motion.p>
        </div>
        <div className="h-1 bg-[var(--border)] rounded overflow-hidden">
          <motion.div
            className="h-full bg-[var(--accent)] origin-left"
            style={{ scaleX: meterScale }}
          />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 14.2: Commit**

```bash
git add app/components/scroll/scenes/SceneMonitor.tsx
git commit -m "Add SceneMonitor visual: classifier figure + 93.3% accuracy meter"
```

---

### Task 15: SceneResult visual

**Files:**
- Create: `app/components/scroll/scenes/SceneResult.tsx`

- [ ] **Step 15.1: Create `SceneResult.tsx`**

```tsx
"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";

export default function SceneResult({ progress }: { progress: MotionValue<number> }) {
  const imgOpacity = useTransform(progress, [0.05, 0.3], [0, 1]);
  // Two big numbers settle in
  const kt = useTransform(progress, [0.3, 0.75], [0, 0.707]);
  const ktText = useTransform(kt, (v) => v.toFixed(3));
  const nt = useTransform(progress, [0.4, 0.85], [0, 0.803]);
  const ntText = useTransform(nt, (v) => v.toFixed(3));

  return (
    <div className="relative w-full max-w-md mx-auto space-y-6">
      <motion.div style={{ opacity: imgOpacity }} className="bg-white rounded p-3">
        <Image
          src="/bidmc/fig-accuracy.png"
          alt=""
          width={900}
          height={490}
          className="w-full h-auto"
          priority={false}
        />
      </motion.div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <motion.p className="font-mono text-4xl text-[var(--accent)]">
            <span>{ktText}</span>
            <span className="text-lg text-[var(--muted)] ml-1">mm</span>
          </motion.p>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mt-1">
            knot tying
          </p>
        </div>
        <div>
          <motion.p className="font-mono text-4xl text-[var(--accent)]">
            <span>{ntText}</span>
            <span className="text-lg text-[var(--muted)] ml-1">mm</span>
          </motion.p>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mt-1">
            needle throw
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 15.2: Verify everything builds together now**

Run:
```bash
npm run build
```
Expected: build succeeds. ScrollSection now has all 5 scene visuals to import. No TS errors. No missing imports.

- [ ] **Step 15.3: Commit**

```bash
git add app/components/scroll/scenes/SceneResult.tsx
git commit -m "Add SceneResult visual: bar chart + sub-mm result numbers"
```

---

## Phase 6: Wire-up

### Task 16: Replace inline header in page.tsx with HomeHero + ScrollSection

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 16.1: Update imports and the JSX**

Open `app/page.tsx`. Replace its full contents with:

```tsx
import Link from "next/link";
import { site } from "./data/site";
import HomeHero from "./components/HomeHero";
import ScrollSection from "./components/scroll/ScrollSection";

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <HomeHero />

      {/* Sticky nav under hero */}
      <nav className="border-b border-[var(--border)] sticky top-0 bg-[var(--background)]/95 backdrop-blur-sm z-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex gap-6 text-sm font-mono overflow-x-auto">
            <a href="#flagship" className="py-3 text-[var(--muted)] hover:text-[var(--foreground)] border-b-2 border-transparent hover:border-[var(--foreground)] whitespace-nowrap">
              flagship
            </a>
            <a href="#work" className="py-3 text-[var(--muted)] hover:text-[var(--foreground)] border-b-2 border-transparent hover:border-[var(--foreground)] whitespace-nowrap">
              current work
            </a>
            <Link href="/projects" className="py-3 text-[var(--muted)] hover:text-[var(--foreground)] border-b-2 border-transparent hover:border-[var(--foreground)] whitespace-nowrap">
              projects
            </Link>
            <Link href="/experience" className="py-3 text-[var(--muted)] hover:text-[var(--foreground)] border-b-2 border-transparent hover:border-[var(--foreground)] whitespace-nowrap">
              experience
            </Link>
            <Link href="/research" className="py-3 text-[var(--muted)] hover:text-[var(--foreground)] border-b-2 border-transparent hover:border-[var(--foreground)] whitespace-nowrap">
              research
            </Link>
            <Link href="/certifications" className="py-3 text-[var(--muted)] hover:text-[var(--foreground)] border-b-2 border-transparent hover:border-[var(--foreground)] whitespace-nowrap">
              certifications
            </Link>
          </div>
        </div>
      </nav>

      {/* Flagship scroll cinematic */}
      <div id="flagship">
        <ScrollSection />
      </div>

      <div className="max-w-3xl mx-auto px-6">
        {/* Current Work */}
        <section id="work" className="py-12 border-b border-[var(--border)]">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-6">Current Work</h2>

          <div className="space-y-8">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <h3 className="font-semibold">Beth Israel Deaconess Medical Center</h3>
                <span className="font-mono text-xs text-[var(--muted)]">Sept 2025 – Present</span>
              </div>
              <p className="text-sm text-[var(--muted)] mb-2">Machine Learning Intern · Boston, MA</p>
              <p className="text-[15px] text-[var(--secondary)] leading-relaxed">
                Leading a multi-institutional collaboration between BIDMC and Johns Hopkins to develop
                a learning-based autonomous wound closure algorithm within the da Vinci research platform.
              </p>
              <p className="text-sm text-[var(--muted)] mt-2 font-mono">
                NSF ACCESS / Jetstream2 — $31,444 allocation · 146,000 GPU SUs
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-1 mt-3">
                {["Python", "ROS", "NVIDIA Isaac Sim", "ORBIT-Surgical", "Singularity", "dVRK"].map(t => (
                  <span key={t} className="font-mono text-xs text-[var(--muted)]">{t}</span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <h3 className="font-semibold">BU Center for Space Physics</h3>
                <span className="font-mono text-xs text-[var(--muted)]">Apr 2025 – Present</span>
              </div>
              <p className="text-sm text-[var(--muted)] mb-2">Machine Learning Researcher · Boston, MA</p>
              <p className="text-[15px] text-[var(--secondary)] leading-relaxed">
                Building neural network models for space weather forecasting. Processing 7M+ satellite
                samples per month for predictive analytics of energetic electron precipitation events.
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-1 mt-3">
                {["Python", "PyTorch", "Keras", "Pandas", "NetCDF"].map(t => (
                  <span key={t} className="font-mono text-xs text-[var(--muted)]">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Selected Projects */}
        <section className="py-12 border-b border-[var(--border)]">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">Selected Projects</h2>
            <Link href="/projects" className="font-mono text-xs text-[var(--accent)] hover:text-[var(--accent-hover)]">
              View all →
            </Link>
          </div>

          <div className="space-y-1">
            {site.projects.slice(0, 4).map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-0 py-3 border-b border-[var(--border-light)] last:border-0 hover:bg-[var(--hover-bg)] -mx-3 px-3 transition-colors"
              >
                <span className="font-medium group-hover:text-[var(--accent)] transition-colors flex-1">
                  {project.title}
                </span>
                <span className="text-sm text-[var(--muted)] sm:ml-4 flex-shrink-0">
                  {project.tech.slice(0, 3).join(" · ")}
                </span>
                <span className="font-mono text-xs text-[var(--muted)] sm:ml-4 flex-shrink-0">
                  {project.date}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="py-12 border-b border-[var(--border)]">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-6">Education</h2>

          <div className="space-y-6">
            {site.education.map((edu) => (
              <div key={edu.institution}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <span className="font-mono text-xs text-[var(--muted)]">{edu.date}</span>
                </div>
                <p className="text-[15px] text-[var(--secondary)]">
                  {edu.degree}
                  {edu.concentration && ` · ${edu.concentration}`}
                </p>
                {edu.coursework && edu.coursework.length > 0 && (
                  <p className="text-sm text-[var(--muted)] mt-2">
                    {edu.coursework.join(" · ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="py-12 border-b border-[var(--border)]">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-6">Skills</h2>

          <div className="space-y-3 text-[15px]">
            <div>
              <span className="text-[var(--muted)] text-sm">Languages — </span>
              <span className="text-[var(--secondary)]">{site.skills.programming.join(", ")}</span>
            </div>
            <div>
              <span className="text-[var(--muted)] text-sm">ML — </span>
              <span className="text-[var(--secondary)]">{site.skills.machineLearning.join(", ")}</span>
            </div>
            <div>
              <span className="text-[var(--muted)] text-sm">Libraries — </span>
              <span className="text-[var(--secondary)]">{site.skills.librariesFrameworks.join(", ")}</span>
            </div>
            <div>
              <span className="text-[var(--muted)] text-sm">Tools — </span>
              <span className="text-[var(--secondary)]">{site.skills.cloudTools.join(", ")}</span>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-12">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-4">Contact</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
            <a href={`mailto:${site.email}`} className="text-[var(--accent)] hover:text-[var(--accent-hover)]">
              {site.email}
            </a>
            <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:text-[var(--accent-hover)]">
              LinkedIn
            </a>
            <a href={site.links.github} target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:text-[var(--accent-hover)]">
              GitHub
            </a>
          </div>
        </section>
      </div>

      <footer className="border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <p className="text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </footer>
    </main>
  );
}
```

- [ ] **Step 16.2: Verify build succeeds**

Run:
```bash
npm run build
```
Expected: build succeeds. No type errors.

- [ ] **Step 16.3: Manual sanity check in browser**

Run:
```bash
npm run dev
```
Open http://localhost:3000.
- Hero shows display-serif "Parth Kheni" headline
- Scrolling smoothly enters the dark cinematic section
- Section is pinned for ~5 viewport-heights
- Each scene's text fades in/out as you scroll
- Each scene's visual animates from progress
- Bottom progress bar fills left-to-right as you scroll the section
- Scrolling past the section returns to normal theme
- Current Work, Projects, Education, Skills, Contact still render below

Stop the dev server.

- [ ] **Step 16.4: Commit**

```bash
git add app/page.tsx
git commit -m "Wire HomeHero and ScrollSection into homepage; replace inline hero"
```

---

## Phase 7: Verification

### Task 17: Verify reduced-motion fallback

**Files:**
- None (verification only)

- [ ] **Step 17.1: Enable reduced-motion in DevTools**

Run:
```bash
npm run dev
```
Open http://localhost:3000. In Chrome DevTools, open the Command Palette (Cmd+Shift+P), type "reduced motion", select **Emulate CSS media feature prefers-reduced-motion: reduce**.

- [ ] **Step 17.2: Reload and verify fallback**

Reload the page. Confirm:
- Lenis smooth-scroll is disabled (scroll feels native)
- Scroll section may still pin (Framer Motion's scroll APIs aren't disabled by media query — that's expected; pinning alone is fine, only animation transitions matter for accessibility)
- All scene text is readable
- No animation-induced motion sickness triggers

- [ ] **Step 17.3: Disable emulation, stop dev server**

Turn off the emulation in DevTools. Stop the dev server.

- [ ] **Step 17.4: No code changes — no commit needed**

---

### Task 18: Verify mobile responsiveness

**Files:**
- None (verification only)

- [ ] **Step 18.1: Test at 375px (iPhone SE width)**

Run:
```bash
npm run dev
```
Open http://localhost:3000. Open DevTools, switch to responsive mode, set width to 375px.

- [ ] **Step 18.2: Verify mobile behavior**

Confirm:
- Hero "Parth Kheni" headline scales down but remains readable
- No horizontal scroll
- The scroll section may behave differently on mobile (sticky positioning is unreliable on iOS Safari) — text should still be readable, even if pinning misbehaves
- Scene visuals are hidden on mobile via `hidden md:block` in Scene.tsx — text shows full-width
- Other sections (Current Work, Projects, etc.) reflow correctly

- [ ] **Step 18.3: Stop dev server**

- [ ] **Step 18.4: No code changes — no commit needed**

If mobile is broken in a meaningful way, file follow-up notes; do NOT add fixes in this plan (out of scope).

---

### Task 19: Verify other pages still render correctly + final build

**Files:**
- None (verification only)

- [ ] **Step 19.1: Run dev server**

```bash
npm run dev
```

- [ ] **Step 19.2: Visit each page and confirm new accent**

Open each URL and visually confirm:
- http://localhost:3000/projects — accent links/hover are teal, layout intact
- http://localhost:3000/experience — accent intact, no broken styling
- http://localhost:3000/research — UROP entry shows at top of Awards & Honors, accent intact
- http://localhost:3000/certifications — accent intact

- [ ] **Step 19.3: Stop dev server, run final production build**

```bash
npm run build
```
Expected: build succeeds with no errors and no warnings about Three.js / unused imports / missing types.

- [ ] **Step 19.4: Run lint**

```bash
npm run lint
```
Expected: no errors. (One eslint-disable comment exists in `ScrollSection.tsx` and `SceneData.tsx` for the rules-of-hooks override — that's intentional, see Task 10 Step 10.2.)

- [ ] **Step 19.5: Final summary commit (if anything was tweaked during verification)**

If any small fixes were needed, commit them now:
```bash
git add -p
git commit -m "Fix verification findings"
```

If nothing changed, no commit needed.

---

## Done

The homepage now opens with a Zeta-inspired display-serif hero, transitions into a dark scroll-pinned cinematic that walks visitors through the GC-ACT autonomous suturing project (Gap → Data → Model → Monitor → Result) using real numbers from the Team 23 final report, then returns to the existing minimalist sections below. The Summer 2026 UROP award appears at the top of `/research`. The light/dark theme toggle still works on every page; the cinematic forces dark only within its own scope. Reduced-motion users get a stacked fallback.

Total commits in this plan: ~19 atomic commits forming a clean diff history.
