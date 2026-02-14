// app/experience/page.tsx
import Link from "next/link";
import { site } from "../data/site";

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-black text-zinc-50">
      <nav className="border-b border-zinc-900">
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
              <Link href="/certifications" className="hover:text-zinc-50 transition-colors">
                Certifications
              </Link>
              <Link href="/research" className="hover:text-zinc-50 transition-colors">
                Research
              </Link>
              <Link href="/game" className="hover:text-zinc-50 transition-colors">
                Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-32">
        <header className="mb-24">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            Experience
          </h1>
          <p className="text-xl text-zinc-400 font-light max-w-2xl">
            Professional roles, internships, and research positions
          </p>
        </header>

        <div className="space-y-16">
          {site.experiences.map((exp, i) => (
            <article
              key={i}
              className="grid md:grid-cols-3 gap-8 pb-16 border-b border-zinc-900"
            >
              <div>
                <h2 className="text-2xl font-light text-zinc-50 mb-2">
                  {exp.company}
                </h2>
                <p className="text-zinc-400 mb-1">{exp.role}</p>
                {exp.location && (
                  <p className="text-sm text-zinc-600 mb-2">{exp.location}</p>
                )}
                <p className="text-sm text-zinc-500">{exp.date}</p>
              </div>

              <div className="md:col-span-2">
                <ul className="space-y-3 mb-6">
                  {exp.description.map((item, j) => (
                    <li key={j} className="text-zinc-400 leading-relaxed flex gap-3">
                      <span className="text-zinc-600 mt-1.5">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {exp.tech && exp.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-zinc-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <footer className="border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </footer>
    </main>
  );
}
