// app/research/page.tsx
import Link from "next/link";
import { site } from "../data/site";
import ParticleBackground from "../components/ParticleBackground";

export default function ResearchPage() {
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
              <Link href="/projects" className="hover:text-zinc-50 transition-colors">
                Projects
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
            Research & Honors
          </h1>
          <p className="text-xl text-zinc-400 font-light max-w-2xl">
            Publications, presentations, and awards in machine learning and space physics
          </p>
        </header>

        {/* Publications & Presentations */}
        <section className="mb-24">
          <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-12">
            Publications & Presentations
          </h2>
          <div className="space-y-12">
            {site.publications.map((pub, i) => (
              <article key={i} className="pb-12 border-b border-zinc-900">
                <p className="text-zinc-400 leading-relaxed">
                  {pub.authors.split("Kheni, P. N.").map((part, j, arr) => (
                    <span key={j}>
                      {part}
                      {j < arr.length - 1 && (
                        <span className="text-zinc-50 font-medium">Kheni, P. N.</span>
                      )}
                    </span>
                  ))}
                </p>
                <p className="text-zinc-50 mt-2">
                  &ldquo;{pub.title}&rdquo;
                </p>
                <p className="text-zinc-500 mt-1">
                  <span className="italic">{pub.venue}</span>
                  {pub.note && <span> — {pub.note}</span>}
                  <span className="ml-4">{pub.date}</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Awards & Honors */}
        <section>
          <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-12">
            Awards & Honors
          </h2>
          <div className="space-y-12">
            {site.awards.map((award, i) => (
              <article key={i} className="pb-12 border-b border-zinc-900">
                <h3 className="text-xl font-light text-zinc-50 mb-2">
                  {award.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {award.detail}
                </p>
                <p className="text-sm text-zinc-500 mt-2">{award.date}</p>
              </article>
            ))}
          </div>
        </section>
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
