"use client";

import { useState } from "react";

const techStack = [
  { name: "Next.js 16", purpose: "React framework with App Router", color: "from-blue-500 to-cyan-500" },
  { name: "TypeScript", purpose: "Type-safe development", color: "from-blue-600 to-blue-400" },
  { name: "Tailwind CSS", purpose: "Utility-first styling", color: "from-cyan-500 to-blue-500" },
  { name: "Canvas API", purpose: "Neural network & radar visualizations", color: "from-purple-500 to-pink-500" },
];

const features = [
  {
    title: "Interactive Neural Network Viz",
    description: "Real-time canvas animation with mouse interaction, showing live signal propagation through network layers",
    loc: "~180 lines",
  },
  {
    title: "Terminal Command Palette",
    description: "Full command-line interface with history, autocomplete, and keyboard shortcuts (Ctrl+K or /)",
    loc: "~250 lines",
  },
  {
    title: "Animated Impact Metrics",
    description: "Scroll-triggered counters with easing animations and intersection observer",
    loc: "~150 lines",
  },
  {
    title: "Interactive Tech Radar",
    description: "Canvas-based skill visualization with hover detection and category filtering",
    loc: "~200 lines",
  },
  {
    title: "Code Showcase",
    description: "Syntax-highlighted code viewer with typing animation effect",
    loc: "~200 lines",
  },
];

const stats = [
  { label: "Components Built", value: "8+", color: "text-blue-400" },
  { label: "Lines of Code", value: "2000+", color: "text-emerald-400" },
  { label: "Custom Animations", value: "15+", color: "text-purple-400" },
  { label: "Canvas Visualizations", value: "3", color: "text-orange-400" },
];

export default function PortfolioMeta() {
  const [showSource, setShowSource] = useState(false);

  return (
    <section className="py-32 border-t border-zinc-900 bg-gradient-to-b from-zinc-950 to-black">
      <div className="mb-16 text-center">
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">
          Meta
        </h2>
        <h3 className="text-4xl md:text-5xl font-light text-zinc-50 mb-4">
          Building This Portfolio
        </h3>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          A fully custom Next.js application with interactive visualizations and unique UX features
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-zinc-800 bg-zinc-950/50 backdrop-blur p-6 text-center"
          >
            <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
            <div className="text-sm text-zinc-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tech Stack */}
      <div className="mb-16">
        <h4 className="text-2xl font-light text-zinc-50 mb-6">Tech Stack</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-semibold text-zinc-100">{tech.name}</h5>
                <div
                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${tech.color}`}
                />
              </div>
              <p className="text-sm text-zinc-400">{tech.purpose}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Breakdown */}
      <div className="mb-16">
        <h4 className="text-2xl font-light text-zinc-50 mb-6">Key Features</h4>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 hover:border-zinc-700 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-600 font-mono text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h5 className="font-semibold text-zinc-100 group-hover:text-zinc-50">
                    {feature.title}
                  </h5>
                </div>
                <span className="text-xs text-zinc-600 font-mono">{feature.loc}</span>
              </div>
              <p className="text-sm text-zinc-400 ml-10">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Design Philosophy */}
      <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900 p-8">
        <h4 className="text-2xl font-light text-zinc-50 mb-6">Design Philosophy</h4>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h5 className="text-emerald-400 font-semibold mb-2">Performance First</h5>
            <p className="text-sm text-zinc-400">
              Optimized animations using Canvas API and requestAnimationFrame. Lazy loading for heavy components.
            </p>
          </div>
          <div>
            <h5 className="text-blue-400 font-semibold mb-2">Accessibility</h5>
            <p className="text-sm text-zinc-400">
              Keyboard navigation support, semantic HTML, proper ARIA labels, and focus management.
            </p>
          </div>
          <div>
            <h5 className="text-purple-400 font-semibold mb-2">Unique UX</h5>
            <p className="text-sm text-zinc-400">
              Custom interactions like terminal commands, interactive radar, and scroll-triggered animations.
            </p>
          </div>
        </div>
      </div>

      {/* Source Code CTA */}
      <div className="mt-12 text-center">
        <button
          onClick={() => setShowSource(!showSource)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition-colors text-zinc-100"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View Portfolio Source Code
        </button>

        {showSource && (
          <div className="mt-4 p-4 rounded-xl border border-zinc-800 bg-zinc-950 inline-block">
            <p className="text-sm text-zinc-400 mb-2">Coming soon: GitHub repository link</p>
            <p className="text-xs text-zinc-600 font-mono">
              Will include full source code, setup instructions, and documentation
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
