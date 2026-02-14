"use client";

type Skill = {
  name: string;
  category: string;
};

const skills: Skill[] = [
  // Programming
  { name: "Python", category: "Programming" },
  { name: "SQL", category: "Programming" },
  { name: "MATLAB", category: "Programming" },
  { name: "C++", category: "Programming" },
  { name: "Java", category: "Programming" },
  { name: "C#", category: "Programming" },
  { name: "Objective-C", category: "Programming" },
  { name: "OOP", category: "Programming" },

  // Libraries/Frameworks
  { name: "NumPy", category: "Libraries/Frameworks" },
  { name: "Matplotlib", category: "Libraries/Frameworks" },
  { name: "Pandas", category: "Libraries/Frameworks" },
  { name: "scikit-learn", category: "Libraries/Frameworks" },
  { name: "TensorFlow", category: "Libraries/Frameworks" },
  { name: "Retrofit/Gson", category: "Libraries/Frameworks" },
  { name: "Android Jetpack", category: "Libraries/Frameworks" },

  // Cloud/Tools
  { name: "Azure AD", category: "Cloud/Tools" },
  { name: "GitHub", category: "Cloud/Tools" },
  { name: "Microsoft 365", category: "Cloud/Tools" },
  { name: "Arduino", category: "Cloud/Tools" },
  { name: "Android Studio", category: "Cloud/Tools" },
  { name: "API", category: "Cloud/Tools" },
  { name: "Power BI", category: "Cloud/Tools" },
  { name: "WorkManager", category: "Cloud/Tools" },

  // Machine Learning
  { name: "Predictive Modeling", category: "Machine Learning" },
  { name: "Statistical Modeling", category: "Machine Learning" },
  { name: "Time-Series Analysis", category: "Machine Learning" },
  { name: "Anomaly Detection", category: "Machine Learning" },
];

const categories = ["Programming", "Libraries/Frameworks", "Cloud/Tools", "Machine Learning"];

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
