// app/data/site.ts
export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  date: string;
  blurb: string;
  overview: string;
  tech: string[];
  highlights: string[];
  results?: string[];
  links?: ProjectLink[];
  images?: { src: string; alt: string }[];
};

export type Experience = {
  company: string;
  role: string;
  date: string;
  location?: string;
  description: string[];
  tech?: string[];
};

export type Education = {
  institution: string;
  degree: string;
  concentration?: string;
  gpa?: string;
  date: string;
  coursework?: string[];
  honors?: string[];
};

export type Activity = {
  organization: string;
  role: string;
  date: string;
};

export const site: {
  name: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  links: {
    github: string;
    linkedin: string;
    resume: string;
  };
  skills: {
    programming: string[];
    cloudTools: string[];
    machineLearning: string[];
  };
  experiences: Experience[];
  education: Education[];
  activities: Activity[];
  projects: Project[];
} = {
  name: "Parth Kheni",
  tagline: "Computer Engineering @ Boston University · ML · Robotics",
  location: "Boston, MA",
  email: "pkheni@bu.edu",
  phone: "908-335-5448",
  links: {
    github: "https://github.com/parthnkheni",
    linkedin: "https://www.linkedin.com/in/parthnkheni/",
    resume: "/resume.pdf",
  },

  skills: {
    programming: ["Python", "C++", "Java", "Kotlin", "MATLAB", "SQL", "C#", "Objective-C"],
    cloudTools: ["Azure AD", "GitHub", "Microsoft 365", "Arduino", "Android Studio", "Postman", "WorkManager"],
    machineLearning: ["PyTorch", "TensorFlow", "LSTM", "CNN", "RNN", "scikit-learn", "Time-series", "Regression"],
  },

  experiences: [
    {
      company: "Beth Israel Deaconess Medical Center (BIDMC)",
      role: "Machine Learning Intern",
      date: "Sept 2025 – Present",
      location: "Boston, MA",
      description: [
        "Built GPU-enabled surgical robotics simulation workflow for da Vinci Research Kit (dVRK), a research platform used in autonomous surgery development",
        "Designed and implemented neural network architectures to predict 6-DoF end-effector states based on surgical instrument telemetry",
        "Prototyped incision-closure tasks in NVIDIA Isaac Sim/ORBIT Surgical by setting up a reproducible Omniverse/Isaac environment for labeling and dataset construction",
        "Improved ML autonomy training reliability by diagnosing a preprocessing mismatch that reduced performance from -90% to 48% accuracy, enabling better learning and control",
      ],
      tech: ["Python", "PyTorch", "NVIDIA Isaac Sim", "ROS", "Computer Vision", "dVRK"],
    },
    {
      company: "Boston University Center for Space Physics",
      role: "Machine Learning Research Assistant",
      date: "Apr 2025 – Present",
      location: "Boston, MA",
      description: [
        "Developed end-to-end data pipelines in Python and SQL for time-series ingestion and preprocessing of POES satellite telemetry and the OMNI database",
        "Designed and trained supervised machine learning models (Random Forests, LSTM Neural Networks) for predictive analytics of space-weather events, improving detection accuracy by 15%",
        "Performed advanced feature engineering, hyperparameter tuning (grid search, cross-validation), and statistical modeling to optimize model precision and recall",
      ],
      tech: ["Python", "SQL", "Pandas", "LSTM", "Random Forest", "scikit-learn", "Time-series Analysis"],
    },
    {
      company: "Electronic Arts",
      role: "Software Engineering Virtual Experience Program",
      date: "June 2025",
      description: [
        "Proposed a new feature for EA Sports College Football and wrote a Feature Proposal describing it to other stakeholders",
        "Built a class diagram and created a header file in C++ with class definitions for each object",
        "Patched a bugfix and optimized the EA Sports College Football codebase by implementing an improved data structure",
      ],
      tech: ["C++", "Software Design", "Data Structures"],
    },
    {
      company: "Blue Leaf Technologies",
      role: "IT Consultant",
      date: "Jul 2023 – Aug 2023",
      description: [
        "Engineered and deployed secure authentication systems using Azure Active Directory and Windows Hello for Business, increasing login efficiency by 25%",
        "Implemented Cloud Kerberos Trust with domain controllers, streamlining credential workflows by 40%",
        "Built Python scripts to automate data collection, cutting manual tracking by 50% and improving real-time system monitoring",
      ],
      tech: ["Azure AD", "Windows Hello", "Python", "Cloud Kerberos"],
    },
    {
      company: "Mathnasium",
      role: "Instructor",
      date: "Apr 2022 – Jul 2023",
      description: [
        "Delivered engaging math instruction to classes of up to 10 students using diverse methods, raising comprehension by 20% and improving overall engagement by 25%",
        "Evaluated 100+ assignments monthly, providing constructive feedback, clear guidelines, and tailored reinforcement to build confidence, discipline, and student growth",
      ],
      tech: [],
    },
  ],

  education: [
    {
      institution: "Boston University",
      degree: "BS Computer Engineering",
      concentration: "Machine Learning",
      date: "Expected Dec 2026",
      coursework: [
        "Differential Equations",
        "Multi-Variable Calculus",
        "Microeconomics",
        "Macroeconomics",
        "Statistics",
        "Linear Algebra",
        "Electric Circuits",
        "Discrete Math",
        "Data Structures",
      ],
      honors: [],
    },
    {
      institution: "Rutgers University",
      degree: "BS Computer Engineering",
      date: "Sept 2023 – May 2024",
      coursework: [],
      honors: [],
    },
  ],

  activities: [
    {
      organization: "BU Baja Society of Automotive Engineers",
      role: "Head Engineer of Computer Systems",
      date: "Sept 2024 – Present",
    },
    {
      organization: "Boston University Jalwa Dance Troupe",
      role: "Secretary",
      date: "Sept 2024 – Present",
    },
  ],

  projects: [
    {
      slug: "whack-a-mole-fpga",
      title: "Whack-a-Mole Reaction Game on FPGA",
      date: "Sept 2025 – Present",
      blurb:
        "Real-time Whack-a-Mole reaction game on Nexys4 DDR FPGA with multi-difficulty rounds and LED/switch I/O.",
      overview:
        "Designed a real-time Whack-a-Mole reaction game on a Nexys4 DDR FPGA, enabling 30-second multi-difficulty rounds with 5 LED 'moles' and per-mole switch/hammer input. Features debounced button I/O, difficulty timing, random mole selection, and comprehensive top-level integration in Verilog.",
      tech: ["Verilog", "FPGA", "Nexys4 DDR", "Vivado", "Digital Logic Design"],
      highlights: [
        "Designed real-time Whack-a-Mole reaction game on Nexys4 DDR FPGA with 30-second multi-difficulty rounds",
        "Implemented 5 LED 'moles' with per-mole switch/hammer input using debounced button I/O",
        "Engineered difficulty timing, random mole selection, and top-level integration in Verilog",
        "Improved reliability and integration by owning input and game-control modules across 4-person team",
        "Delivered glitch-free demo through Vivado simulation, timing analysis, and on-board testing",
      ],
      results: [
        "Successfully delivered glitch-free demo with reliable game mechanics",
        "Coordinated interfaces across 4-person team with comprehensive module integration",
      ],
      links: [
        { label: "GitHub", href: "https://github.com/parthnkheni/whack-a-mole-fpga" },
        { label: "Report", href: "/Whack_A_Mole_FPGA_Report.pdf" }
      ],
    },
    {
      slug: "portfolio-website",
      title: "Building this Portfolio",
      date: "Dec 2025",
      blurb:
        "Modern portfolio website built with Next.js 15, React, TypeScript, and Three.js featuring interactive 3D project visualizations.",
      overview:
        "A responsive portfolio website showcasing projects, experience, and skills. Features custom 3D wireframe models for each project built with React Three Fiber, dynamic routing, and a minimalist dark theme design.",
      tech: ["Next.js 15", "React", "TypeScript", "Three.js", "React Three Fiber", "Tailwind CSS"],
      highlights: [
        "Built with Next.js 15 App Router and TypeScript for type-safe development",
        "Integrated React Three Fiber for interactive 3D project visualizations with auto-rotating models",
        "Designed custom wireframe 3D models for each project (FPGA board, robot car, temperature sensor)",
        "Implemented responsive design with Tailwind CSS and particle background effects",
        "Created dynamic routing system for project detail pages with static generation",
      ],
      results: [
        "Fully responsive portfolio with seamless navigation and interactive 3D graphics",
        "Optimized performance with Next.js static generation and Suspense boundaries",
      ],
      links: [
        { label: "GitHub", href: "https://github.com/parthnkheni/parth-portfolio" },
      ],
    },
    {
      slug: "maps-robot",
      title: "MAPS: Mobile Autonomous Path-Following System",
      date: "Jan 2025 – May 2025",
      blurb:
        "Autonomous line-following robot with obstacle detection and touchless activation.",
      overview:
        "Mobile autonomous robot that follows a black tape line, detects and avoids obstacles using ultrasonic sensors, and stops at designated finish lines. Features touchless hand-wave activation for operation.",
      tech: ["Arduino Uno", "L298N Motor Driver", "IR Sensors", "HC-SR04 Ultrasonic", "3D Printing", "AutoCAD"],
      highlights: [
        "Dual IR sensors follow 2cm-wide black line with >90% accuracy",
        "Ultrasonic sensor halts robot if object <10cm, resumes when clear",
        "Finish line recognition with 4cm-width tape detection (9/10 trial success rate)",
        "Touchless start via ultrasonic trigger (hand wave), <250ms reaction time",
      ],
      results: [
        ">90% line detection accuracy under indoor lighting",
        "Lightweight design (~0.5 lb) with 3D-printed PLA chassis, total cost ~$30.83",
      ],
      links: [
        { label: "GitHub", href: "https://github.com/parthnkheni/MAPS" },
        { label: "Report", href: "/MAPS_report.pdf" },
        { label: "Pitch Deck", href: "/MAPS_pitchdeck.pdf" }
      ],
    },
    {
      slug: "personal-finance-app",
      title: "Personal Finance App",
      date: "Jan 2025 – May 2025",
      blurb:
        "Android stock tracking app with real-time data, portfolio persistence, and price alerts.",
      overview:
        "Built in Android Studio with Java, Retrofit/Gson, and the Finnhub.io API to fetch and display real-time stock symbols and quotes in RecyclerViews and MPAndroidChart line charts.",
      tech: ["Java", "Android Studio", "Retrofit", "Gson", "Finnhub.io API", "MPAndroidChart", "WorkManager"],
      highlights: [
        "Built in Android Studio with Java, Retrofit/Gson, and Finnhub.io API to fetch and display real-time stock symbols and quotes in RecyclerViews and MPAndroidChart line charts",
        "Engineered portfolio persistence using SharedPreferences, enabled MainActivity→BrowseStocksActivity navigation for seamless stock selection",
        "Integrated WorkManager background tasks with Android Notifications for price alerts",
      ],
      results: ["Successfully deployed app with persistent portfolio tracking and real-time alerts"],
      links: [
        { label: "GitHub", href: "https://github.com/parthnkheni/personal_finance_app" },
        { label: "Report", href: "/Personal_Finance_App_Report.pdf" }
      ],
    },
    {
      slug: "room-temperature-monitor",
      title: "Room Temperature Monitor",
      date: "Sept 2024 – Dec 2024",
      blurb:
        "Arduino-powered temperature monitoring device with real-time alerts and LCD display.",
      overview:
        "Compact, user-friendly device that measures ambient temperature and displays readings in both Celsius and Fahrenheit. Provides real-time alerts via buzzer and LED if temperature deviates from predefined range.",
      tech: ["Arduino Uno", "TMP36 Sensor", "16x2 I2C LCD", "C++", "3D Printing", "AutoCAD"],
      highlights: [
        "Real-time temperature display on 16x2 I2C LCD in Celsius and Fahrenheit",
        "Piezo buzzer and red LED triggered when temperature falls outside customizable range (default: 72°F–75°F)",
        "Powered by 9V battery with ~6.25 hours runtime",
        "3D-printed ABS enclosure for component protection and portability",
      ],
      results: [
        "Reliable temperature monitoring with ±2°C accuracy margin",
        "Instant visual and audio feedback for out-of-range temperatures",
      ],
      links: [
        { label: "GitHub", href: "https://github.com/parthnkheni/Portable-Arduino-Powered-Threshold-Sensor" },
        { label: "Report", href: "/Portable Arduino Powered Threshold Sensor.pdf" }
      ],
    },
    {
      slug: "ecg-data-analysis",
      title: "ECG Data Analysis",
      date: "Sept 2024 – Dec 2024",
      blurb:
        "ML classifiers for ECG arrhythmia detection achieving over 90% accuracy.",
      overview:
        "Processed and cleaned raw ECG signals in Python/Pandas, applying digital filters and performing feature engineering (time-domain and frequency-domain metrics) for anomaly detection.",
      tech: ["Python", "Pandas", "scikit-learn", "SVM", "Random Forest", "Matplotlib", "Seaborn"],
      highlights: [
        "Processed and cleaned raw ECG signals in Python/Pandas, applying digital filters and feature engineering (time-domain and frequency-domain metrics) for anomaly detection",
        "Developed and validated machine learning classifiers (SVM, Random Forest) in scikit-learn to identify arrhythmias, achieving over 90% accuracy",
        "Visualized results with Matplotlib and Seaborn for comprehensive analysis",
      ],
      results: ["Achieved over 90% accuracy in arrhythmia classification"],
      links: [
        { label: "GitHub", href: "https://github.com/parthnkheni/ECG-Data-Analysis" },
        { label: "Report", href: "/ECG_Data_Analysis_Final_Report.pdf" }
      ],
    },
  ],
};