import Link from "next/link";
import { site } from "../data/site";
import ThemeToggle from "../components/ThemeToggle";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <div className="flex items-baseline justify-between">
            <Link href="/" className="font-mono text-lg font-semibold hover:text-[var(--accent)]">
              PK
            </Link>
            <nav className="hidden md:flex gap-4 text-sm font-mono text-[var(--muted)]">
              <Link href="/" className="hover:text-[var(--foreground)]">home</Link>
              <Link href="/experience" className="hover:text-[var(--foreground)]">experience</Link>
              <Link href="/certifications" className="hover:text-[var(--foreground)]">certifications</Link>
              <Link href="/research" className="hover:text-[var(--foreground)]">research</Link>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-8">Projects</h1>

        <div className="space-y-10">
          {site.projects.map((project) => (
            <article key={project.slug} className="pb-10 border-b border-[var(--border)] last:border-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-lg font-semibold hover:text-[var(--accent)] transition-colors"
                >
                  {project.title}
                </Link>
                <span className="font-mono text-xs text-[var(--muted)] flex-shrink-0">{project.date}</span>
              </div>

              <p className="text-[15px] text-[var(--secondary)] leading-relaxed mb-4">
                {project.blurb}
              </p>

              <div className="flex flex-wrap gap-x-2 gap-y-1 mb-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="font-mono text-xs text-[var(--muted)]">{tech}</span>
                ))}
              </div>

              {project.links && project.links.length > 0 && (
                <div className="flex gap-4">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[var(--accent)] hover:text-[var(--accent-hover)]"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      <footer className="border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <p className="text-xs text-[var(--muted)]">© {new Date().getFullYear()} {site.name}</p>
        </div>
      </footer>
    </main>
  );
}
