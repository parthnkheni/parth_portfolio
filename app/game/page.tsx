// app/game/page.tsx
import Link from "next/link";
import GameClient from "./GameClient";

export default function GamePage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-[#171717]">
      <header className="border-b border-[#e5e5e5]">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <div className="flex items-baseline justify-between">
            <Link href="/" className="font-mono text-lg font-semibold hover:text-[#2563eb]">
              PK
            </Link>
            <nav className="hidden md:flex gap-4 text-sm font-mono text-[#737373]">
              <Link href="/" className="hover:text-[#171717]">home</Link>
              <Link href="/projects" className="hover:text-[#171717]">projects</Link>
              <Link href="/experience" className="hover:text-[#171717]">experience</Link>
              <Link href="/certifications" className="hover:text-[#171717]">certifications</Link>
              <Link href="/research" className="hover:text-[#171717]">research</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-mono text-xs uppercase tracking-wider text-[#737373] mb-2">Demo</h1>
        <h2 className="text-2xl font-semibold mb-2">Neural Network Playground</h2>
        <p className="text-[15px] text-[#404040] mb-10">
          Draw patterns and watch a neural network learn to classify them in real-time.
        </p>

        <GameClient />
      </div>
    </main>
  );
}
