"use client";

type Certification = {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl?: string;
  logo?: string;
};

const certifications: Certification[] = [
  {
    title: "Electronic Arts - Software Engineering Job Simulation",
    issuer: "Forage",
    date: "Dec 2024",
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

export default function Certifications() {
  return (
    <section>

      <div className="grid md:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <div
            key={cert.credentialId}
            className="group rounded-xl border border-zinc-800 bg-zinc-950 p-6 hover:border-zinc-700 transition-all"
            style={{
              animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-zinc-100 mb-2 group-hover:text-zinc-50 transition-colors">
                  {cert.title}
                </h4>
                <p className="text-sm text-zinc-400 mb-1">{cert.issuer}</p>
                <p className="text-xs text-zinc-600">{cert.date}</p>
              </div>
              {cert.issuer === "Forage" && (
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                  EA
                </div>
              )}
              {cert.issuer === "University of Michigan" && (
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                  UM
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
              <div className="text-xs text-zinc-600 font-mono">
                ID: {cert.credentialId}
              </div>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
                >
                  View Certificate
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-12 grid grid-cols-3 gap-6">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">7</div>
          <div className="text-sm text-zinc-500">Total Certifications</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-6 text-center">
          <div className="text-3xl font-bold text-emerald-400 mb-2">2</div>
          <div className="text-sm text-zinc-500">Institutions</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">2024-25</div>
          <div className="text-sm text-zinc-500">Years Active</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
