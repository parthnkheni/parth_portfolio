import Link from "next/link";
import { site } from "../data/site";
import ThemeToggle from "../components/ThemeToggle";

type Certification = {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl?: string;
};

const certifications: Certification[] = [
  {
    title: "Electronic Arts - Software Engineering Job Simulation",
    issuer: "Forage",
    date: "Jun 2025",
    credentialId: "4NDypMWz2htHwNt4X",
    credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/j43dGscQHtJJ57N54/a77WE3de8qrxWferQ_j43dGscQHtJJ57N54_4NDypMWz2htHwNt4X_1750790447479_completion_certificate.pdf",
  },
  {
    title: "Python for Everybody Specialization",
    issuer: "University of Michigan",
    date: "May 2024",
    credentialId: "HFL97LVB8FCV",
    credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/HFL97LVB8FCV",
  },
  {
    title: "Capstone: Retrieving, Processing, and Visualizing Data with Python",
    issuer: "University of Michigan",
    date: "May 2024",
    credentialId: "38SKJ6DD72YU",
    credentialUrl: "https://www.coursera.org/account/accomplishments/records/38SKJ6DD72YU",
  },
  {
    title: "Using Databases with Python",
    issuer: "University of Michigan",
    date: "May 2024",
    credentialId: "B64FS88WE6GR",
    credentialUrl: "https://www.coursera.org/account/accomplishments/records/B64FS88WE6GR",
  },
  {
    title: "Using Python to Access Web Data",
    issuer: "University of Michigan",
    date: "May 2024",
    credentialId: "BTNXM42J69W8",
    credentialUrl: "https://www.coursera.org/account/accomplishments/records/BTNXM42J69W8",
  },
  {
    title: "Python Data Structures",
    issuer: "University of Michigan",
    date: "May 2024",
    credentialId: "XPSRRGQ63VCK",
    credentialUrl: "https://www.coursera.org/account/accomplishments/records/XPSRRGQ63VCK",
  },
  {
    title: "Programming for Everybody (Getting Started with Python)",
    issuer: "University of Michigan",
    date: "May 2024",
    credentialId: "N8WVDXL8DBXJ",
    credentialUrl: "https://www.coursera.org/account/accomplishments/records/N8WVDXL8DBXJ",
  },
];

export default function CertificationsPage() {
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
              <Link href="/research" className="hover:text-[var(--foreground)]">research</Link>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-8">Certifications</h1>

        <div className="space-y-1">
          {certifications.map((cert) => (
            <div
              key={cert.credentialId}
              className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-0 py-3 border-b border-[var(--border-light)]"
            >
              <div className="flex-1">
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-[var(--accent)] transition-colors"
                  >
                    {cert.title}
                  </a>
                ) : (
                  <span className="font-medium">{cert.title}</span>
                )}
              </div>
              <span className="text-sm text-[var(--muted)] sm:ml-4 flex-shrink-0">{cert.issuer}</span>
              <span className="font-mono text-xs text-[var(--muted)] sm:ml-4 flex-shrink-0">{cert.date}</span>
            </div>
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
