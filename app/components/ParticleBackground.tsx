"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  depth: number; // For parallax effect
  rotation: number;
  rotationSpeed: number;
  shape: 'circle' | 'square' | 'triangle';
};

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const particleCount = 50;
    const particles: Particle[] = [];

    const shapes: Array<'circle' | 'square' | 'triangle'> = ['circle', 'square', 'triangle'];

    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random();
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: (Math.random() * 4 + 2) * (0.5 + depth * 0.5), // Larger particles
        speedX: (Math.random() - 0.5) * 0.5 * (1 - depth * 0.5),
        speedY: (Math.random() - 0.5) * 0.5 * (1 - depth * 0.5),
        opacity: 0.15 + depth * 0.25, // More visible
        depth: depth,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }
    particlesRef.current = particles;

    // Mouse move handler for parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY + window.scrollY
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;

        // Parallax effect based on mouse position
        const parallaxX = (mouseRef.current.x - canvas.width / 2) * particle.depth * 0.02;
        const parallaxY = (mouseRef.current.y - canvas.height / 2) * particle.depth * 0.02;

        // Wrap around edges
        if (particle.x < -20) particle.x = canvas.width + 20;
        if (particle.x > canvas.width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = canvas.height + 20;
        if (particle.y > canvas.height + 20) particle.y = -20;

        // Draw particle with parallax offset
        const drawX = particle.x + parallaxX;
        const drawY = particle.y + parallaxY;

        ctx.save();
        ctx.translate(drawX, drawY);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = particle.opacity;

        // Draw different shapes
        if (particle.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(161, 161, 170, 1)'; // zinc-400
          ctx.fill();
        } else if (particle.shape === 'square') {
          ctx.fillStyle = 'rgba(161, 161, 170, 1)';
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        } else if (particle.shape === 'triangle') {
          ctx.beginPath();
          ctx.moveTo(0, -particle.size);
          ctx.lineTo(particle.size, particle.size);
          ctx.lineTo(-particle.size, particle.size);
          ctx.closePath();
          ctx.fillStyle = 'rgba(161, 161, 170, 1)';
          ctx.fill();
        }

        ctx.restore();

        // Draw connecting lines between nearby particles
        particles.forEach((other) => {
          const dx = (other.x + parallaxX * other.depth) - drawX;
          const dy = (other.y + parallaxY * other.depth) - drawY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200 && distance > 0) {
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(other.x + parallaxX * other.depth, other.y + parallaxY * other.depth);
            ctx.strokeStyle = `rgba(161, 161, 170, ${0.1 * (1 - distance / 200)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
