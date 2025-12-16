// app/projects/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "../../data/site";

export function generateStaticParams() {
  return site.projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = site.projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <Link className="text-sm text-zinc-300 hover:text-zinc-50" href="/projects">
            ← Projects
          </Link>
          <Link className="text-sm text-zinc-300 hover:text-zinc-50" href="/">
            Home
          </Link>
        </div>

        <header className="space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
            <span className="text-sm text-zinc-400">{project.date}</span>
          </div>

          <p className="text-zinc-300">{project.overview}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-zinc-800 px-2.5 py-1 text-xs text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>
        </header>

        <section className="mt-10">
          <h2 className="text-sm font-semibold tracking-wide text-zinc-200">
            HIGHLIGHTS
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-300">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>

        {project.results?.length ? (
          <section className="mt-10">
            <h2 className="text-sm font-semibold tracking-wide text-zinc-200">
              RESULTS
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-300">
              {project.results.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {project.links?.length ? (
          <section className="mt-10">
            <h2 className="text-sm font-semibold tracking-wide text-zinc-200">
              LINKS
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-zinc-800 px-4 py-2 text-sm hover:bg-zinc-900"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
