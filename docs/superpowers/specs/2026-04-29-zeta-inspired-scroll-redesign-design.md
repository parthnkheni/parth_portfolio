# Zeta-Inspired Hero + BIDMC Scroll Cinematic — Design Spec

**Date:** 2026-04-29
**Author:** Parth Kheni (with Claude as design collaborator)
**Status:** Approved, ready for implementation planning

## Motivation

The current homepage at `parth-portfolio` is a clean editorial-minimalist single column. It reads as a competent personal page but doesn't *demonstrate* the work — visitors who don't read carefully leave with nothing concrete in their head.

Reference: [zetasurgical.com](https://www.zetasurgical.com), specifically the "Meet the Technology" scroll-pinned narrative section. We want that cinematic, continuous-scroll feel — but applied honestly to Parth's flagship work (the Team 23 senior design project on autonomous suturing) instead of as decoration.

This spec covers two changes:

1. **Homepage redesign** — replace the text-only header/about with a Zeta-inspired hero, and add a 5-scene scroll cinematic showcasing the GC-ACT autonomous suturing project.
2. **`awards[]` update** — add the Summer 2026 BU UROP award.

## Non-goals

- Not redesigning `/projects`, `/experience`, `/research`, `/certifications` page structure. These pages inherit the new palette via CSS variables but their layout/copy is unchanged.
- Not adding per-project scroll cinematics on `/projects/[slug]` pages. That's a future phase if Parth chooses.
- Not removing the light/dark theme toggle. The recent commit (`165a181`) deliberately added it — we're enhancing both modes, not reverting that work.
- Not replacing the existing data model (`Project`, `Experience`, `Award` types in `site.ts`) — only adding to it.

## Decisions

| Question | Choice | Rationale |
|---|---|---|
| Scope | Hero refresh + 1 scroll section, other pages inherit palette only | Largest visual payoff per file touched; respects the just-shipped editorial direction |
| Homepage framing | Bio + flagship | Keeps the homepage about Parth (per his explicit instinct) while letting the cinematic prove the bio |
| Visual identity | Hybrid: keep light/dark toggle, deepen dark to navy + teal accent, scroll section forces dark | Doesn't undo the recently-shipped theme toggle |
| Typography | Add display serif (Instrument Serif) for headings; keep Geist Mono for labels | The editorial feel Zeta has comes from serif + mono pairing — sans-only reads like docs |
| BIDMC arc | 5 scenes — Gap → Data → Model → Monitor → Result | Story arc with stakes; uses real numbers from final report; honest framing |
| Scroll library | Framer Motion (`motion` v12) + Lenis | React-native API, declarative, ~50KB total; Lenis gives Zeta-like buttery smooth scroll |
| Visuals | Hybrid — generated SVG/canvas + reuse two polished slide PNGs | Reuses existing production-quality figures; clean abstract for connective tissue |
| UROP dollar amount | Excluded | NSF $ represents grant infrastructure; UROP $7K is personal stipend — different signal |

## Architecture

### Files added

```
app/components/
  HomeHero.tsx                       — display-serif hero, replaces inline header in page.tsx
  scroll/
    SmoothScrollProvider.tsx         — Lenis wrapper, mounted in layout.tsx
    ScrollSection.tsx                — pinned 5×100vh container, owns scroll-progress math
    Scene.tsx                        — primitive: pinned visual + fade-in text panel
    scenes/
      SceneGap.tsx                   — animated suture path + 20% counter
      SceneData.tsx                  — counter 0→1,890 + gesture timeline
      SceneModel.tsx                 — animated architecture diagram
      SceneMonitor.tsx               — fig-classifier.png + accuracy meter ticking to 93.3%
      SceneResult.tsx                — fig-accuracy.png + threshold lines

public/bidmc/
  fig-classifier.png                 — copied from knowledge_export/slides presentation--revamp/fig_slide11_v5_classifier.png
  fig-accuracy.png                   — copied from knowledge_export/slides presentation--revamp/fig_slide10_v5_accuracy.png
```

### Files modified

```
app/data/site.ts        — add UROP to awards[] (top of array); add typed flagshipBidmc.scenes[]
app/page.tsx            — replace inline header/about with <HomeHero/> + <ScrollSection/>; keep Selected Projects, Education, Skills, Contact untouched
app/layout.tsx          — wrap children with <SmoothScrollProvider>; load Instrument Serif font
app/globals.css         — new palette tokens (teal accent, deeper dark navy); .cinematic-dark utility class
package.json            — add `motion` (Framer Motion v12 rebrand) and `lenis`
```

### Dependencies

```
+ motion        ^12.x   (Framer Motion v12; declarative scroll-driven animation)
+ lenis         ^1.x    (smooth scroll, ~10KB gzipped)
```

No removals. No build-system changes.

## Component boundaries

Each component has one responsibility and communicates through well-defined props.

- **`SmoothScrollProvider`** (client component, mounted in `layout.tsx`) owns the Lenis instance. No-ops when `prefers-reduced-motion: reduce`.
- **`HomeHero`** (client) renders the hero. Owns the headline/subhead/about-paragraph layout. No scroll math.
- **`ScrollSection`** (client) owns scroll-progress math via `useScroll({ target: containerRef })`. Renders a sticky-positioned visual stage and a text rail. Reads scenes from `site.flagshipBidmc.scenes`. Maps each scene to a `[start, end]` progress range and passes a 0→1 local `progress` prop to its Scene.
- **`Scene`** (client primitive) is dumb. Receives `progress`, `headline`, `body`, and a `Visual` component. Handles text fade/translate via `motion.div`. Doesn't know which scene index it is.
- **`scenes/Scene*.tsx`** (client) are pure functions of `progress`. Each one is a self-contained visual; can be developed and tweaked in isolation.

This split means changing a scene's content never touches scroll math, and changing scroll behavior never touches scene visuals.

## Scene content (BIDMC cinematic)

Sourced from the Team 23 final report (April 24, 2026), the slide-11 speaker notes (gesture classifier framing), and slide-10 results. All numbers verified against `knowledge_export/Team23 _Final_Report.docx.pdf`.

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
}
```

## UROP award entry

Inserted at the top of `awards[]` in `app/data/site.ts` (most-recent first ordering — slots between NSF ACCESS and the existing GEM Workshop entry by date).

```ts
{
  title: "BU Undergraduate Research Opportunities Program (UROP) Award",
  detail: "Funded summer research with Dr. Luisa Capannolo at the BU Center for Space Physics — advancing neural-network forecasting of energetic electron precipitation in the radiation belts.",
  date: "Summer 2026",
}
```

Dollar amount intentionally omitted (rationale: UROP funds are personal stipend, not grant infrastructure like the NSF ACCESS allocation — listing personal pay reads awkward).

## Visual identity tokens

Replaces existing CSS variables in `app/globals.css`:

```css
:root {
  /* light mode */
  --background: #fafafa;
  --foreground: #171717;
  --muted: #737373;
  --secondary: #404040;
  --border: #e5e5e5;
  --border-light: #f0f0f0;
  --hover-bg: #f5f5f5;
  --accent: #0d9488;          /* teal-700 — was blue-600 */
  --accent-hover: #0f766e;
}

:root.dark {
  /* dark mode — deepened toward navy */
  --background: #0a1520;       /* was #111111 */
  --foreground: #e5e7eb;
  --muted: #94a3b8;
  --secondary: #cbd5e1;
  --border: #1e2937;
  --border-light: #172033;
  --hover-bg: #142033;
  --accent: #14b8a6;          /* teal-500 */
  --accent-hover: #5eead4;
}

/* Forces cinematic dark regardless of user theme; applied by ScrollSection */
.cinematic-dark {
  --background: #0a1520;
  --foreground: #f1f5f9;
  --muted: #94a3b8;
  --accent: #5eead4;
  background: var(--background);
  color: var(--foreground);
}
```

Display serif loaded in `app/layout.tsx`:

```ts
import { Instrument_Serif } from "next/font/google";
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});
```

Used **only** for hero headline + scene headlines via `font-[var(--font-serif)]` Tailwind utility. Body text and labels stay Geist Sans / Geist Mono.

## Theme integration mechanism

The scroll section needs to look cinematic regardless of user theme preference. Two options were considered:

1. **Force dark via context override** — store original `documentElement` class, swap to `.dark`, restore on exit. Brittle: races with the existing `ThemeToggle` component, breaks if user toggles mid-scroll.
2. **Scoped CSS variable override** — apply `.cinematic-dark` class to the section container. Variables cascade only within the section. User's theme is untouched and persists across scroll. **Chosen.**

The `.cinematic-dark` class only applies to the `<section>` element wrapping `ScrollSection`. The CSS-variable override is purely local — outside the section, light/dark behaves exactly as today.

## Accessibility & fallbacks

- **`prefers-reduced-motion: reduce`** → `SmoothScrollProvider` returns `<>{children}</>` with no Lenis. `ScrollSection` renders scenes in a normal stacked block layout (no pinning, no `useTransform`). All text remains.
- **Semantic markup** — each scene's headline is an `<h2>`, body is a `<p>`. Visuals carry `aria-hidden="true"`. A screen reader gets the same five-paragraph story.
- **Mobile (< 768px)** — pinning disabled (mobile sticky behavior on iOS Safari is unreliable). Scenes stack vertically with normal scroll. Visuals scale down to fit viewport width.
- **No layout shift** — figure PNGs declared with explicit width/height. Display serif uses `font-display: swap` and Geist as fallback.
- **Lighthouse target** — 90+ mobile perf and 95+ a11y, no regression vs current homepage.

## Testing approach

Manual + automated checks before considering this complete.

| Check | How |
|---|---|
| Lint clean | `npm run lint` |
| TypeScript + production build | `npm run build` succeeds with no warnings (Next.js build runs full TS type check) |
| Scroll cinematic — desktop | `npm run dev`; scroll top→bottom AND bottom→top through 5 scenes; verify smooth pinning, no jumps, text fades correctly |
| Light/dark toggle preserved | Toggle theme on a non-homepage page; navigate to homepage; confirm toggle setting persists; scroll into and out of section; confirm user's theme restored after exit |
| Reduced motion | Chrome DevTools → Rendering → "Emulate prefers-reduced-motion: reduce"; confirm scenes stack with no pinning, all content readable |
| Mobile (375px) | DevTools responsive mode; confirm scenes stack, no horizontal scroll, hero text legible |
| Other pages unaffected | Visit `/projects`, `/experience`, `/research`, `/certifications`; confirm new accent color applied, layout unchanged, no broken styling |
| UROP entry | Visit `/research`; confirm UROP appears at top of Awards & Honors |

## Risks & open questions

- **Lenis + Next.js App Router** — Lenis hooks need to attach after hydration. Mitigation: `SmoothScrollProvider` is `"use client"` and uses `useEffect` to initialize Lenis post-mount. Standard pattern; documented.
- **Framer Motion v12 (`motion`) is the rebranded package** — replaces `framer-motion`. API is the same for `useScroll` / `useTransform`. Imports change from `framer-motion` → `motion/react`. Worth noting in implementation plan.
- **PNG file sizes** — `fig_slide10_v5_accuracy.png` and `fig_slide11_v5_classifier.png` are matplotlib renders at 300 DPI. Will need to verify they're under ~150KB each before committing; may need to re-export at lower DPI if too large for portfolio perf budget.
- **No automated visual regression tests** in this repo. Acceptable for a personal portfolio of this size; manual sweep before deploy.

## Out of scope (future work, not this spec)

- Per-project scroll cinematics on `/projects/[slug]` pages
- Reworking the `/research` page beyond adding the UROP entry
- A separate "Meet the Work" page that links to multiple project cinematics
- Adding analytics events for scroll-section engagement
