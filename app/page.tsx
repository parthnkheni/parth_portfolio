import Link from "next/link";
import { site } from "./data/site";
import ThemeToggle from "./components/ThemeToggle";

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <header className="border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <div>
              <h1 className="font-mono text-lg font-semibold">{site.name}</h1>
              <p className="text-sm text-[var(--muted)]">
                Computer Engineering · Machine Learning · Robotics
              </p>
            </div>
            <nav className="flex gap-4 text-sm text-[var(--muted)] font-mono">
              <a href={`mailto:${site.email}`} className="hover:text-[var(--foreground)]">
                email
              </a>
              <a href={site.links.github} target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)]">
                github
              </a>
              <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)]">
                linkedin
              </a>
              <a href={site.links.resume} className="hover:text-[var(--foreground)]">
                resume
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Nav */}
      <nav className="border-b border-[var(--border)] sticky top-0 bg-[var(--background)]/95 backdrop-blur-sm z-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex gap-6 text-sm font-mono overflow-x-auto">
            <a href="#about" className="py-3 text-[var(--muted)] hover:text-[var(--foreground)] border-b-2 border-transparent hover:border-[var(--foreground)] whitespace-nowrap">
              about
            </a>
            <a href="#work" className="py-3 text-[var(--muted)] hover:text-[var(--foreground)] border-b-2 border-transparent hover:border-[var(--foreground)] whitespace-nowrap">
              current work
            </a>
            <Link href="/projects" className="py-3 text-[var(--muted)] hover:text-[var(--foreground)] border-b-2 border-transparent hover:border-[var(--foreground)] whitespace-nowrap">
              projects
            </Link>
            <Link href="/experience" className="py-3 text-[var(--muted)] hover:text-[var(--foreground)] border-b-2 border-transparent hover:border-[var(--foreground)] whitespace-nowrap">
              experience
            </Link>
            <Link href="/research" className="py-3 text-[var(--muted)] hover:text-[var(--foreground)] border-b-2 border-transparent hover:border-[var(--foreground)] whitespace-nowrap">
              research
            </Link>
            <Link href="/certifications" className="py-3 text-[var(--muted)] hover:text-[var(--foreground)] border-b-2 border-transparent hover:border-[var(--foreground)] whitespace-nowrap">
              certifications
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6">
        {/* About */}
        <section id="about" className="py-12 border-b border-[var(--border)]">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-4">About</h2>
          <div className="space-y-3 text-[15px] leading-relaxed text-[var(--secondary)]">
            <p>
              I&apos;m a Computer Engineering student at Boston University with a concentration
              in Machine Learning. I take projects from data all the way to deployment, including training, evaluation, and integration.
            </p>
            <p>
              My work spans assistive-robotics research, surgical robotics simulation, space-weather
              forecasting, and applied data science — from LLM/MCP workflows to embedded systems. I care about
              building systems that are easy to reproduce, measure, and improve over time.
            </p>
          </div>
        </section>

        {/* Current Work */}
        <section id="work" className="py-12 border-b border-[var(--border)]">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-6">Current Work</h2>

          <div className="space-y-8">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <h3 className="font-semibold">Tufts University — AABL Lab (CRA-WP DREU)</h3>
                <span className="font-mono text-xs text-[var(--muted)]">June 2026 – Present</span>
              </div>
              <p className="text-sm text-[var(--muted)] mb-2">Undergraduate Research Fellow · Medford, MA</p>
              <p className="text-[15px] text-[var(--secondary)] leading-relaxed">
                CRA-WP DREU fellow with Prof. Elaine Short, researching socially assistive human-robot
                interaction and human-in-the-loop learning. Building a real-to-sim manipulation pipeline —
                a digital twin of a Kinova Gen3 Lite arm in the Genesis simulator, reaching ~0.7 cm place accuracy.
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-1 mt-3">
                {["Python", "Genesis", "Kinova Gen3 Lite", "Real-to-Sim", "Digital Twin"].map(t => (
                  <span key={t} className="font-mono text-xs text-[var(--muted)]">{t}</span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <h3 className="font-semibold">New Harbor Venture Partners</h3>
                <span className="font-mono text-xs text-[var(--muted)]">May 2026 – Present</span>
              </div>
              <p className="text-sm text-[var(--muted)] mb-2">Applied Data Science Intern</p>
              <p className="text-[15px] text-[var(--secondary)] leading-relaxed">
                Migrating a ~20,000-contact investor CRM (Affinity) with a Python dedupe/import pipeline, and
                building an LLM workflow that connects Claude to the CRM over the Model Context Protocol (MCP)
                to auto-tag funds and surface ranked investor targets per deal.
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-1 mt-3">
                {["Python", "Pandas", "Affinity CRM", "Claude", "MCP", "LLMs"].map(t => (
                  <span key={t} className="font-mono text-xs text-[var(--muted)]">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Selected Projects */}
        <section className="py-12 border-b border-[var(--border)]">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">Selected Projects</h2>
            <Link href="/projects" className="font-mono text-xs text-[var(--accent)] hover:text-[var(--accent-hover)]">
              View all →
            </Link>
          </div>

          <div className="space-y-1">
            {site.projects.slice(0, 4).map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-0 py-3 border-b border-[var(--border-light)] last:border-0 hover:bg-[var(--hover-bg)] -mx-3 px-3 transition-colors"
              >
                <span className="font-medium group-hover:text-[var(--accent)] transition-colors flex-1">
                  {project.title}
                </span>
                <span className="text-sm text-[var(--muted)] sm:ml-4 flex-shrink-0">
                  {project.tech.slice(0, 3).join(" · ")}
                </span>
                <span className="font-mono text-xs text-[var(--muted)] sm:ml-4 flex-shrink-0">
                  {project.date}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="py-12 border-b border-[var(--border)]">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-6">Education</h2>

          <div className="space-y-6">
            {site.education.map((edu) => (
              <div key={edu.institution}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <span className="font-mono text-xs text-[var(--muted)]">{edu.date}</span>
                </div>
                <p className="text-[15px] text-[var(--secondary)]">
                  {edu.degree}
                  {edu.concentration && ` · ${edu.concentration}`}
                </p>
                {edu.coursework && edu.coursework.length > 0 && (
                  <p className="text-sm text-[var(--muted)] mt-2">
                    {edu.coursework.join(" · ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="py-12 border-b border-[var(--border)]">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-6">Skills</h2>

          <div className="space-y-3 text-[15px]">
            <div>
              <span className="text-[var(--muted)] text-sm">Languages — </span>
              <span className="text-[var(--secondary)]">{site.skills.programming.join(", ")}</span>
            </div>
            <div>
              <span className="text-[var(--muted)] text-sm">ML — </span>
              <span className="text-[var(--secondary)]">{site.skills.machineLearning.join(", ")}</span>
            </div>
            <div>
              <span className="text-[var(--muted)] text-sm">Libraries — </span>
              <span className="text-[var(--secondary)]">{site.skills.librariesFrameworks.join(", ")}</span>
            </div>
            <div>
              <span className="text-[var(--muted)] text-sm">Tools — </span>
              <span className="text-[var(--secondary)]">{site.skills.cloudTools.join(", ")}</span>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-12">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-4">Contact</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
            <a href={`mailto:${site.email}`} className="text-[var(--accent)] hover:text-[var(--accent-hover)]">
              {site.email}
            </a>
            <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:text-[var(--accent-hover)]">
              LinkedIn
            </a>
            <a href={site.links.github} target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:text-[var(--accent-hover)]">
              GitHub
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <p className="text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </footer>
    </main>
  );
}
