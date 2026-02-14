// app/game/page.tsx
import Link from "next/link";
import GameClient from "./GameClient";

export default function GamePage() {
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
              <Link href="/experience" className="hover:text-zinc-50 transition-colors">
                Experience
              </Link>
              <Link href="/research" className="hover:text-zinc-50 transition-colors">
                Research
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Neural Network Playground
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Draw patterns and watch a neural network learn to classify them in real-time
          </p>
        </header>

        <GameClient />
      </div>
    </main>
  );
}
