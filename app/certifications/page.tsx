// app/certifications/page.tsx
import Link from "next/link";
import { site } from "../data/site";
import Certifications from "../components/Certifications";
import ParticleBackground from "../components/ParticleBackground";

export default function CertificationsPage() {
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

      <div className="relative max-w-6xl mx-auto px-6 py-32">
        <header className="mb-24">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            Certifications
          </h1>
          <p className="text-xl text-zinc-400 font-light max-w-2xl">
            Professional certifications and completed coursework in software engineering,
            machine learning, and data science
          </p>
        </header>

        <Certifications />
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
