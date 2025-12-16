// app/projects/page.tsx
"use client";

import Link from "next/link";
import { site } from "../data/site";
import ParticleBackground from "../components/ParticleBackground";
import Project3DModel from "../components/Project3DModel";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-50 relative">
      <ParticleBackground />
      <nav className="relative border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm">
            <Link href="/" className="text-zinc-50 font-light">
              PK
            </Link>
            <div className="flex gap-8 text-zinc-400 font-light">
              <Link href="/" className="hover:text-zinc-50 transition-colors">
                Home
              </Link>
              <Link href="/experience" className="hover:text-zinc-50 transition-colors">
                Experience
              </Link>
              <Link href="/certifications" className="hover:text-zinc-50 transition-colors">
                Certifications
              </Link>
              <Link href="/game" className="hover:text-zinc-50 transition-colors">
                Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative max-w-6xl mx-auto px-6 py-32">
        <header className="mb-24">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            Projects
          </h1>
          <p className="text-xl text-zinc-400 font-light max-w-2xl">
            Technical projects spanning machine learning, robotics, embedded systems,
            and full-stack development
          </p>
        </header>

        <div className="space-y-16">
          {site.projects.map((project) => (
            <article
              key={project.slug}
              className="group relative pb-16 border-b border-zinc-900"
            >
              <div className="grid md:grid-cols-3 gap-8">
                <div className="relative">
                  <h2 className="text-2xl font-light text-zinc-50 mb-2">
                    {project.title}
                  </h2>
                  <p className="text-sm text-zinc-500 mb-4">{project.date}</p>

                  {/* 3D Model positioned near title */}
                  <div className="h-[200px] w-full overflow-hidden rounded-xl opacity-60">
                    <Project3DModel projectSlug={project.slug} />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    {project.blurb}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-zinc-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.links && project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors inline-flex items-center gap-2"
                      >
                        {link.label}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <footer className="relative border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </footer>
    </main>
  );
}
