import Link from "next/link";
import { site } from "../data/site";
import ThemeToggle from "../components/ThemeToggle";

export default function ResearchPage() {
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
              <Link href="/experience" className="hover:text-[var(--foreground)]">experience</Link>
              <Link href="/certifications" className="hover:text-[var(--foreground)]">certifications</Link>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <section className="mb-12">
          <h1 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-8">Publications & Presentations</h1>

          <div className="space-y-8">
            {site.publications.map((pub) => (
              <article key={pub.title} className="pb-8 border-b border-[var(--border)]">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <p className="font-medium">
                    &ldquo;{pub.title}&rdquo;
                  </p>
                  <span className="font-mono text-xs text-[var(--muted)] flex-shrink-0">{pub.date}</span>
                </div>
                <p className="text-[15px] text-[var(--secondary)] leading-relaxed">
                  {pub.authors.split("Kheni, P. N.").map((part, j, arr) => (
                    <span key={j}>
                      {part}
                      {j < arr.length - 1 && (
                        <span className="font-semibold text-[var(--foreground)]">Kheni, P. N.</span>
                      )}
                    </span>
                  ))}
                </p>
                <p className="text-sm text-[var(--muted)] mt-1">
                  <span className="italic">{pub.venue}</span>
                  {pub.note && <span> — {pub.note}</span>}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-8">Awards & Honors</h2>

          <div className="space-y-6">
            {site.awards.map((award) => (
              <article key={award.title} className="pb-6 border-b border-[var(--border)] last:border-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                  <h3 className="font-semibold">{award.title}</h3>
                  <span className="font-mono text-xs text-[var(--muted)] flex-shrink-0">{award.date}</span>
                </div>
                <p className="text-[15px] text-[var(--secondary)]">{award.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <footer className="border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <p className="text-xs text-[var(--muted)]">© {new Date().getFullYear()} {site.name}</p>
        </div>
      </footer>
    </main>
  );
}
