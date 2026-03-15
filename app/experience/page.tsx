import Link from "next/link";
import { site } from "../data/site";
import ThemeToggle from "../components/ThemeToggle";

export default function ExperiencePage() {
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
              <Link href="/projects" className="hover:text-[var(--foreground)]">projects</Link>
              <Link href="/certifications" className="hover:text-[var(--foreground)]">certifications</Link>
              <Link href="/research" className="hover:text-[var(--foreground)]">research</Link>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-8">Experience</h1>

        <div className="space-y-10">
          {site.experiences.map((exp) => (
            <article key={exp.company} className="pb-10 border-b border-[var(--border)] last:border-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                <h2 className="font-semibold">{exp.company}</h2>
                <span className="font-mono text-xs text-[var(--muted)] flex-shrink-0">{exp.date}</span>
              </div>

              <p className="text-sm text-[var(--muted)] mb-4">
                {exp.role}
                {exp.location && ` · ${exp.location}`}
              </p>

              <ul className="space-y-2 text-[15px] text-[var(--secondary)]">
                {exp.description.map((item, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-[var(--muted)] select-none">—</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {exp.tech && exp.tech.length > 0 && (
                <div className="flex flex-wrap gap-x-2 gap-y-1 mt-4">
                  {exp.tech.map((tech) => (
                    <span key={tech} className="font-mono text-xs text-[var(--muted)]">{tech}</span>
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
