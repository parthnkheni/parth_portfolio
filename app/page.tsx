// app/page.tsx
"use client";

import Link from "next/link";
import { site } from "./data/site";
import { useEffect, useRef, useState } from "react";
import NeuralNetworkViz from "./components/NeuralNetworkViz";
import SimpleSkills from "./components/SimpleSkills";
import SpacePhysicsResearch from "./components/SpacePhysicsResearch";
import ContactForm from "./components/ContactForm";

// Animated Gradient Orbs Component
function AnimatedOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create floating orbs
    const orbs = [
      { x: 0.3, y: 0.4, size: 300, color: "52, 211, 153", speed: 0.0003 }, // emerald
      { x: 0.7, y: 0.6, size: 250, color: "96, 165, 250", speed: 0.0004 }, // blue
      { x: 0.5, y: 0.3, size: 200, color: "167, 139, 250", speed: 0.00035 }, // purple
    ];

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb) => {
        const x = orb.x * canvas.width + Math.sin(time * orb.speed) * 100;
        const y = orb.y * canvas.height + Math.cos(time * orb.speed * 1.2) * 80;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.size);
        gradient.addColorStop(0, `rgba(${orb.color}, 0.15)`);
        gradient.addColorStop(0.5, `rgba(${orb.color}, 0.05)`);
        gradient.addColorStop(1, `rgba(${orb.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      time += 1;
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ filter: 'blur(60px)' }}
      aria-hidden="true"
    />
  );
}

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-black text-zinc-50">
      {/* Hero Section with 3D Morphing Shape */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(82, 82, 91, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(82, 82, 91, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)'
          }}
        />

        {/* Animated gradient orbs */}
        {mounted && <AnimatedOrbs />}

        {/* Neural Network Visualization */}
        {mounted && (
          <div className="absolute inset-0">
            <NeuralNetworkViz />
          </div>
        )}

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-light tracking-tight mb-6">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 blur-3xl"></span>
              <span className="relative bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]">
                {site.name.split(" ")[0]}
              </span>
            </span>
            <br />
            <span className="bg-gradient-to-r from-zinc-400 to-zinc-500 bg-clip-text text-transparent">
              {site.name.split(" ")[1]}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 font-light tracking-wide max-w-2xl mx-auto">
            Machine Learning · Robotics · Computer Engineering
          </p>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-zinc-900 bg-black/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm">
            <Link href="/" className="text-zinc-50 font-light">
              PK
            </Link>
            <div className="hidden md:flex gap-8 text-zinc-400 font-light">
              <a href="#work" className="hover:text-zinc-50 transition-colors">
                Work
              </a>
              <Link href="/projects" className="hover:text-zinc-50 transition-colors">
                Projects
              </Link>
              <Link href="/experience" className="hover:text-zinc-50 transition-colors">
                Experience
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
              <a href="#contact" className="hover:text-zinc-50 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6">
        {/* About Section */}
        <section id="work" className="py-32">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-8">
                Currently
              </h2>
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-light text-zinc-50 mb-2">
                    Beth Israel Deaconess Medical Center
                  </h3>
                  <p className="text-zinc-400 mb-4">Machine Learning Intern</p>
                  <p className="text-zinc-500 leading-relaxed">
                    Leading a multi-institutional collaboration between BIDMC and Johns Hopkins to develop and integrate
                    a learning-based autonomous wound closure algorithm within the da Vinci research platform for future
                    clinical translation.
                  </p>
                  <p className="text-zinc-500 mt-3 text-sm">
                    <span className="text-zinc-400">NSF ACCESS / Jetstream2</span> — $31,444 allocation · 146,000 GPU SUs
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-light text-zinc-50 mb-2">
                    BU Center for Space Physics
                  </h3>
                  <p className="text-zinc-400 mb-4">ML Researcher</p>
                  <p className="text-zinc-500 leading-relaxed">
                    Developing LSTM models for space weather forecasting. Processing satellite
                    telemetry data for predictive analytics of energetic electron precipitation events.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-8">
                About
              </h2>
              <div className="space-y-6 text-zinc-400 leading-relaxed">
                <p>
                  I'm a Computer Engineering student at Boston University with a concentration
                  in Machine Learning. I take projects from data all the way to deployment, including training, evaluation, and integration.

                </p>
                <p>
                  My work spans surgical robotics simulation, space weather prediction, and
                  embedded systems. I care about building systems that are easy to reproduce, measure, and improve over time.
                </p>
              </div>

              <div className="mt-12 flex gap-4">
                <a
                  href={site.links.resume}
                  className="px-6 py-3 border border-zinc-800 text-zinc-50 text-sm hover:bg-zinc-900 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-900/50 transition-all"
                >
                  Resume
                </a>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 text-zinc-400 text-sm hover:text-zinc-50 hover:-translate-y-0.5 transition-all"
                >
                  GitHub →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Space Physics Research */}
        <SpacePhysicsResearch />

        {/* Skills */}
        <SimpleSkills />

        {/* ML Demo Link */}
        <section className="py-32 border-t border-zinc-900">
          <Link
            href="/game"
            className="group block max-w-3xl hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">
              Interactive Demo
            </h2>
            <h3 className="text-4xl font-light text-zinc-50 mb-4 group-hover:bg-gradient-to-r group-hover:from-zinc-50 group-hover:to-zinc-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
              Neural Network Playground
            </h3>
            <p className="text-zinc-400 mb-6 leading-relaxed">
              Draw your own patterns and watch a neural network learn to classify them
              in real-time. A hands-on demonstration of machine learning fundamentals.
            </p>
            <span className="text-zinc-500 text-sm inline-flex items-center gap-2 group-hover:gap-4 group-hover:text-zinc-400 transition-all">
              Try it out
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </section>

        {/* Education */}
        <section className="py-32 border-t border-zinc-900">
          <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-12">
            Education
          </h2>
          <div className="space-y-12">
            {site.education.map((edu) => (
              <div key={edu.institution}>
                <h3 className="text-2xl font-light text-zinc-50 mb-2">
                  {edu.institution}
                </h3>
                <p className="text-zinc-400 mb-1">
                  {edu.degree}
                  {edu.concentration && ` · ${edu.concentration}`}
                </p>
                <p className="text-zinc-600 text-sm mb-4">{edu.date}</p>
                {edu.gpa && (
                  <p className="text-zinc-500">GPA: {edu.gpa}</p>
                )}
                {edu.honors && edu.honors.length > 0 && (
                  <p className="text-zinc-500">{edu.honors.join(", ")}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-32 border-t border-zinc-900">
          <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-12">
            Get in Touch
          </h2>
          <div className="max-w-2xl">
            <p className="text-2xl font-light text-zinc-400 mb-12 leading-relaxed">
              I'm always open to discussing new opportunities, collaborations,
              or just connecting with fellow engineers and researchers.
            </p>
            <div className="space-y-6">
              <a
                href={`mailto:${site.email}`}
                className="block text-xl text-zinc-50 hover:text-zinc-400 transition-colors"
              >
                {site.email}
              </a>
              <div className="flex gap-8 text-zinc-500">
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-zinc-50 transition-colors text-sm"
                >
                  LinkedIn
                </a>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-zinc-50 transition-colors text-sm"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <ContactForm />

        {/* Footer */}
        <footer className="py-12 border-t border-zinc-900">
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} {site.name}
          </p>
        </footer>
      </div>
    </main>
  );
}
