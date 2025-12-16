"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "../data/site";

type Skill = {
  name: string;
  level: number; // 0-100
  category: string;
  projects: string[];
};

const skills: Skill[] = [
  // ML/AI
  { name: "PyTorch", level: 85, category: "ML/AI", projects: ["dVRK Autonomy", "Space Weather"] },
  { name: "TensorFlow", level: 80, category: "ML/AI", projects: ["ECG Analysis"] },
  { name: "scikit-learn", level: 90, category: "ML/AI", projects: ["ECG Analysis", "Space Weather"] },
  { name: "LSTM/RNN", level: 85, category: "ML/AI", projects: ["Space Weather"] },
  { name: "Computer Vision", level: 75, category: "ML/AI", projects: ["dVRK"] },
  { name: "Time-Series", level: 88, category: "ML/AI", projects: ["ECG", "Space Weather"] },
  { name: "Statistical Analysis", level: 85, category: "ML/AI", projects: ["ECG Analysis"] },

  // Programming
  { name: "Python", level: 95, category: "Programming", projects: ["All ML Projects"] },
  { name: "C++", level: 85, category: "Programming", projects: ["Arduino Projects"] },
  { name: "Java", level: 80, category: "Programming", projects: ["Finance App"] },
  { name: "Verilog", level: 75, category: "Programming", projects: ["FPGA Whack-a-Mole"] },
  { name: "SQL", level: 80, category: "Programming", projects: ["Data Pipelines"] },

  // Robotics/Embedded
  { name: "ROS", level: 80, category: "Robotics", projects: ["dVRK"] },
  { name: "Arduino", level: 90, category: "Robotics", projects: ["MAPS", "Temp Monitor"] },
  { name: "FPGA", level: 75, category: "Robotics", projects: ["Whack-a-Mole"] },
  { name: "Embedded C", level: 85, category: "Robotics", projects: ["Arduino Projects"] },
  { name: "Motor Control", level: 82, category: "Robotics", projects: ["MAPS"] },
  { name: "Sensor Fusion", level: 85, category: "Robotics", projects: ["MAPS"] },
  { name: "Signal Processing", level: 88, category: "Robotics", projects: ["ECG", "Arduino"] },

  // Tools/Frameworks
  { name: "Git", level: 90, category: "Tools", projects: ["All Projects"] },
  { name: "Docker", level: 70, category: "Tools", projects: ["dVRK"] },
  { name: "Next.js", level: 85, category: "Tools", projects: ["This Portfolio"] },
  { name: "Pandas/NumPy", level: 95, category: "Tools", projects: ["All ML Projects"] },
  { name: "Android Studio", level: 78, category: "Tools", projects: ["Finance App"] },
  { name: "Azure AD", level: 75, category: "Tools", projects: ["Blue Leaf"] },
  { name: "CAD", level: 80, category: "Tools", projects: ["MAPS", "3D Printing"] },
];

const categories = ["ML/AI", "Programming", "Robotics", "Tools"];
const categoryColors: Record<string, string> = {
  "ML/AI": "#3b82f6", // blue
  "Programming": "#10b981", // emerald
  "Robotics": "#f59e0b", // amber
  "Tools": "#8b5cf6", // purple
};

export default function TechRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Store fixed positions for skills to prevent jitter
  const skillPositionsRef = useRef<Map<string, { angle: number; x: number; y: number }>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = Math.min(550, window.innerWidth - 40);
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;
    const maxRadius = size / 2 - 80;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw concentric circles (skill levels)
    const levels = [25, 50, 75, 100];
    levels.forEach((level, i) => {
      const radius = (maxRadius * level) / 100;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(113, 113, 122, 0.2)"; // zinc-500
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw level labels
      if (i < levels.length - 1) {
        ctx.fillStyle = "rgba(161, 161, 170, 0.5)"; // zinc-400
        ctx.font = "10px monospace";
        ctx.fillText(`${level}%`, centerX + radius + 5, centerY);
      }
    });

    // Draw category axes
    const angleStep = (Math.PI * 2) / categories.length;
    categories.forEach((category, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * maxRadius;
      const y = centerY + Math.sin(angle) * maxRadius;

      // Axis line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = categoryColors[category];
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Category label
      ctx.fillStyle = categoryColors[category];
      ctx.font = "bold 13px sans-serif";
      ctx.textBaseline = "middle";

      // Adjust text alignment based on position
      const labelDistance = maxRadius + 40;
      const labelX = centerX + Math.cos(angle) * labelDistance;
      const labelY = centerY + Math.sin(angle) * labelDistance;

      // Set alignment based on horizontal position
      if (Math.abs(Math.cos(angle)) < 0.3) {
        ctx.textAlign = "center";
      } else if (Math.cos(angle) > 0) {
        ctx.textAlign = "right";  // Right side labels extend left into canvas
      } else {
        ctx.textAlign = "left";   // Left side labels extend right into canvas
      }

      ctx.fillText(category, labelX, labelY);
    });

    // Plot skills
    const filteredSkills = selectedCategory
      ? skills.filter((s) => s.category === selectedCategory)
      : skills;

    filteredSkills.forEach((skill) => {
      const categoryIndex = categories.indexOf(skill.category);
      const baseAngle = categoryIndex * angleStep - Math.PI / 2;

      // Get or create fixed position for this skill
      if (!skillPositionsRef.current.has(skill.name)) {
        const spreadAngle = (Math.random() - 0.5) * (angleStep * 0.6);
        const angle = baseAngle + spreadAngle;
        const radius = (maxRadius * skill.level) / 100;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        skillPositionsRef.current.set(skill.name, { angle, x, y });
      }

      const { x, y } = skillPositionsRef.current.get(skill.name)!;

      // Draw skill point
      const isHovered = hoveredSkill?.name === skill.name;
      const dotRadius = isHovered ? 8 : 5;

      // Glow effect for hovered
      if (isHovered) {
        ctx.beginPath();
        ctx.arc(x, y, dotRadius * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, dotRadius * 3);
        gradient.addColorStop(0, `${categoryColors[skill.category]}66`);
        gradient.addColorStop(1, `${categoryColors[skill.category]}00`);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Skill dot
      ctx.beginPath();
      ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = categoryColors[skill.category];
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Skill name on hover
      if (isHovered) {
        ctx.fillStyle = "#fff";
        ctx.font = "bold 11px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(skill.name, x, y - 15);
        ctx.font = "9px sans-serif";
        ctx.fillStyle = "#a1a1aa";
        ctx.fillText(`${skill.level}%`, x, y - 3);
      }
    });
  }, [hoveredSkill, selectedCategory]);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let foundSkill: Skill | null = null;
    let closestDistance = Infinity;

    // Use stored positions for consistent hover detection
    skills.forEach((skill) => {
      const position = skillPositionsRef.current.get(skill.name);
      if (!position) return;

      const { x, y } = position;
      const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);

      // Find the closest skill within hover range
      if (distance < 15 && distance < closestDistance) {
        foundSkill = skill;
        closestDistance = distance;
      }
    });

    setHoveredSkill(foundSkill);
  };

  return (
    <section className="py-32 border-t border-zinc-900">
      <div className="mb-16 text-center">
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">
          Technical Skills
        </h2>
        <h3 className="text-4xl md:text-5xl font-light text-zinc-50 mb-4">
          Interactive Tech Radar
        </h3>
        <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
          Hover over points to see skills. Click categories to filter.
        </p>

        {/* Category filters */}
        <div className="flex justify-center gap-4 flex-wrap mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg border transition-all ${
              selectedCategory === null
                ? "border-zinc-300 bg-zinc-100 text-zinc-900"
                : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
            }`}
          >
            All Skills
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                selectedCategory === cat
                  ? "border-zinc-300 text-zinc-900"
                  : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
              }`}
              style={{
                backgroundColor: selectedCategory === cat ? categoryColors[cat] : undefined,
                borderColor: selectedCategory === cat ? categoryColors[cat] : undefined,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Radar chart */}
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <canvas
              ref={canvasRef}
              onMouseMove={handleCanvasMouseMove}
              onMouseLeave={() => setHoveredSkill(null)}
              className="cursor-pointer"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>

        {/* Skill details */}
        <div className="flex-1 max-w-md">
          {hoveredSkill ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-2xl font-semibold text-zinc-50 mb-1">
                    {hoveredSkill.name}
                  </h4>
                  <p className="text-sm text-zinc-500">{hoveredSkill.category}</p>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: `${categoryColors[hoveredSkill.category]}22`,
                    color: categoryColors[hoveredSkill.category],
                  }}
                >
                  {hoveredSkill.level}%
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-zinc-600 mb-2">Proficiency</p>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${hoveredSkill.level}%`,
                        backgroundColor: categoryColors[hoveredSkill.category],
                      }}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-zinc-600 mb-2">Used in Projects</p>
                  <div className="flex flex-wrap gap-2">
                    {hoveredSkill.projects.map((project) => (
                      <span
                        key={project}
                        className="text-xs px-2 py-1 rounded bg-zinc-900 text-zinc-400"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-center">
              <p className="text-zinc-500">Hover over a skill point to see details</p>
            </div>
          )}

          {/* Legend */}
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <p className="text-xs text-zinc-600 mb-3">Color Legend</p>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: categoryColors[cat] }}
                  />
                  <span className="text-xs text-zinc-400">{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
