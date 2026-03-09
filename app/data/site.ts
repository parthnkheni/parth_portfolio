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

export type Publication = {
  authors: string;
  title: string;
  venue: string;
  date: string;
  note?: string;
};

export type Award = {
  title: string;
  detail: string;
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
    librariesFrameworks: string[];
  };
  experiences: Experience[];
  education: Education[];
  activities: Activity[];
  publications: Publication[];
  awards: Award[];
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
    programming: ["Python", "SQL", "MATLAB", "C++", "Java", "C#", "Objective-C", "OOP"],
    cloudTools: ["Azure AD", "GitHub", "Microsoft 365", "Arduino", "Android Studio", "API", "Power BI", "WorkManager"],
    machineLearning: ["Predictive Modeling", "Statistical Modeling", "Time-Series Analysis", "Anomaly Detection"],
    librariesFrameworks: ["NumPy", "Matplotlib", "Pandas", "scikit-learn", "TensorFlow", "PyTorch", "Retrofit/Gson", "Android Jetpack"],
  },

  experiences: [
    {
      company: "Beth Israel Deaconess Medical Center (BIDMC)",
      role: "Machine Learning Intern",
      date: "Sept 2025 – Present",
      location: "Boston, MA",
      description: [
        "Lead a multi-institutional collaboration between BIDMC and Johns Hopkins to develop and integrate a learning-based autonomous wound closure algorithm within the da Vinci Research Kit (dVRK) platform for future clinical translation, coordinating requirements and experiment milestones across teams",
        "Build repeatable wound-closure experiments by standardizing task setup, ROS data capture, labeling guidelines, and evaluation metrics; maintain consistent dataset formats across runs to enable clean comparisons and faster iteration on autonomy behavior",
        "Maintain a reproducible NVIDIA Isaac Sim + ORBIT-Surgical pipeline on BU's HPC Cluster using Singularity containers, and document protocols, results, and meeting action items to keep development aligned",
      ],
      tech: ["Python", "ROS", "NVIDIA Isaac Sim", "ORBIT-Surgical", "Singularity", "dVRK"],
    },
    {
      company: "Boston University Center for Space Physics",
      role: "Machine Learning Research Assistant",
      date: "Apr 2025 – Present",
      location: "Boston, MA",
      description: [
        "Build end-to-end Python pipelines for POES and OMNI time-series data, generating model-ready datasets with 7M+ 2-second satellite samples per month by ingesting NetCDF files, interpolating gaps, enforcing L-shell (3–9) and MLT quality cuts, and joining with 4-hour windows of 1-minute solar-wind drivers",
        "Improve E4_0/E4_90 energetic electron precipitation forecasts, lowering test MAE/RMSE and boosting correlation vs prior baselines, by training Keras neural nets and Ridge regressors with standardized features and time-ordered train/val/test splits",
        "Increase interpretability of space-weather predictions across different storm conditions and locations in the radiation belts, improving generalization during rare, high-flux events, by testing different time resolutions (2-second vs 1-minute data), quantile-based flux aggregations, and simple features that capture local time around Earth",
      ],
      tech: ["Python", "Keras", "Ridge Regression", "Pandas", "NetCDF", "Time-series Analysis"],
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
        "Delivered math instruction to classes of up to 10 students, raising comprehension by 20% and improving engagement by 25%",
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
        "Machine Learning",
        "Probability Statistics & Data Science",
        "Computation Linear Algebra",
        "Applied Algorithms",
        "Cloud Computing",
        "Software Engineering",
        "Computer Architecture",
        "Differential Equations",
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

  publications: [
    {
      authors: "Capannolo, L., Pettit, J., Elliott, S., Morales, J. P. B., Bibeau, A., Kheni, P. N.",
      title: "Monitoring radiation belt electrons at LEO: preliminary results of MAPLE (MAPs of LEO Electrons) model.",
      venue: "COSPAR 2026",
      date: "Feb 2026",
      note: "Abstract (submitted)",
    },
  ],

  awards: [
    {
      title: "NSF ACCESS / Jetstream2 Allocation (CIS260066)",
      detail: "$31,444 awarded; 146,000 GPU SUs; 4 TB storage.",
      date: "Jan 2026 – Present",
    },
    {
      title: "GEM Workshop – Invited Speaker (Portland, ME)",
      detail: "Selected to present machine learning research.",
      date: "July 2026",
    },
  ],

  projects: [
    {
      slug: "llm-incident-pipeline",
      title: "LLM-Assisted Incident Summarization & Clustering",
      date: "Jan 2026 – Present",
      blurb:
        "End-to-end incident intelligence pipeline using LLMs to ingest logs, generate structured summaries, embed and cluster incidents to identify duplicates and recurring failure patterns. Microsoft-affiliated.",
      overview:
        "Built an end-to-end incident intelligence pipeline that ingests large-scale system/application logs, generates structured incident summaries with LLMs, embeds summaries, and clusters incidents to identify duplicates and recurring failure patterns. Includes a backend service and lightweight UI/API to explore incidents and clusters.",
      tech: ["Python", "LLMs", "Embeddings", "Clustering", "NLP", "REST API"],
      highlights: [
        "Built an end-to-end incident intelligence pipeline: ingest large-scale system/application logs, generate structured incident summaries with LLMs, embed summaries, and cluster incidents to identify duplicates and recurring failure patterns",
        "Implemented a backend service and lightweight UI/API to explore incidents and clusters, making practical accuracy vs cost/latency tradeoffs to support scalable operation on noisy real-world logs",
      ],
      results: [
        "Scalable pipeline handling noisy real-world logs with practical accuracy vs cost/latency tradeoffs",
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
      slug: "whack-a-mole-fpga",
      title: "Whack-a-Mole Reaction Game on FPGA",
      date: "Sept 2025 – Dec 2025",
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
  ],
};