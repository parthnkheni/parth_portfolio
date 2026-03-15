import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "../../data/site";
import ThemeToggle from "../../components/ThemeToggle";

export function generateStaticParams() {
  return site.projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = site.projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <Link href="/projects" className="font-mono text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
            ← Projects
          </Link>
          <div className="flex gap-4 items-baseline">
            <Link href="/" className="font-mono text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
              Home
            </Link>
            <ThemeToggle />
          </div>
        </div>

        <header className="pb-8 border-b border-[var(--border)]">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-3">
            <h1 className="text-2xl font-semibold">{project.title}</h1>
            <span className="font-mono text-xs text-[var(--muted)]">{project.date}</span>
          </div>

          <p className="text-[15px] text-[var(--secondary)] leading-relaxed mb-4">{project.overview}</p>

          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {project.tech.map((t) => (
              <span key={t} className="font-mono text-xs text-[var(--muted)]">{t}</span>
            ))}
          </div>
        </header>

        <section className="py-8 border-b border-[var(--border)]">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-4">Highlights</h2>
          <ul className="space-y-2 text-[15px] text-[var(--secondary)]">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="text-[var(--muted)] select-none">—</span>
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </section>

        {project.results?.length ? (
          <section className="py-8 border-b border-[var(--border)]">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-4">Results</h2>
            <ul className="space-y-2 text-[15px] text-[var(--secondary)]">
              {project.results.map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="text-[var(--muted)] select-none">—</span>
                  <span className="leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {project.links?.length ? (
          <section className="py-8">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-4">Links</h2>
            <div className="flex flex-wrap gap-4">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm text-[var(--accent)] hover:text-[var(--accent-hover)]"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <footer className="border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <p className="text-xs text-[var(--muted)]">© {new Date().getFullYear()} {site.name}</p>
        </div>
      </footer>
    </main>
  );
}
