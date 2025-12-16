"use client";

type Skill = {
  name: string;
  category: string;
};

const skills: Skill[] = [
  // Languages
  { name: "Python", category: "Languages" },
  { name: "C/C++", category: "Languages" },
  { name: "Java", category: "Languages" },
  { name: "JavaScript/TypeScript", category: "Languages" },
  { name: "MATLAB", category: "Languages" },
  { name: "Verilog", category: "Languages" },
  { name: "SQL", category: "Languages" },

  // ML/AI
  { name: "TensorFlow", category: "ML/AI" },
  { name: "PyTorch", category: "ML/AI" },
  { name: "Scikit-learn", category: "ML/AI" },
  { name: "OpenCV", category: "ML/AI" },
  { name: "Pandas", category: "ML/AI" },
  { name: "NumPy", category: "ML/AI" },

  // Robotics
  { name: "ROS", category: "Robotics" },
  { name: "Gazebo", category: "Robotics" },
  { name: "AMBF", category: "Robotics" },
  { name: "Arduino", category: "Robotics" },

  // Web/Cloud
  { name: "React", category: "Web/Cloud" },
  { name: "Node.js", category: "Web/Cloud" },
  { name: "AWS", category: "Web/Cloud" },
  { name: "Docker", category: "Web/Cloud" },
  { name: "Git", category: "Web/Cloud" },
];

const categories = ["Languages", "ML/AI", "Robotics", "Web/Cloud"];

export default function SimpleSkills() {
  return (
    <section className="py-24 border-t border-zinc-900">
      <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-8">
        Technical Skills
      </h2>

      <div className="grid md:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-sm font-light text-zinc-400 mb-3">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1.5 rounded border border-zinc-800 bg-zinc-950 text-zinc-500 text-xs hover:border-zinc-700 hover:text-zinc-400 transition-all"
                  >
                    {skill.name}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
