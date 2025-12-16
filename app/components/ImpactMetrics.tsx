"use client";

import { useEffect, useState, useRef } from "react";

type Metric = {
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
};

const metrics: Metric[] = [
  {
    value: 7000000,
    suffix: "+",
    label: "Data Points Processed",
    description: "2-second satellite samples per month in space weather prediction pipeline",
    color: "from-blue-500 to-cyan-500",
  },
  {
    value: 90,
    suffix: "%+",
    label: "ML Accuracy Achieved",
    description: "ECG arrhythmia detection using SVM and Random Forest classifiers",
    color: "from-emerald-500 to-green-500",
  },
  {
    value: 85,
    suffix: "%+",
    label: "Prediction Accuracy",
    description: "LSTM model performance for energetic electron precipitation event forecasting",
    color: "from-purple-500 to-pink-500",
  },
  {
    value: 12,
    suffix: "+",
    label: "Hardware Projects",
    description: "Arduino, FPGA, and embedded systems designs from temperature monitors to reaction games",
    color: "from-orange-500 to-red-500",
  },
];

function useCountUp(target: number, duration: number = 2000, isVisible: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * easeOut));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, isVisible]);

  return count;
}

function MetricCard({ metric, index, isVisible }: { metric: Metric; index: number; isVisible: boolean }) {
  const count = useCountUp(metric.value, 2000 + index * 200, isVisible);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  return (
    <div
      className="relative group"
      style={{
        animation: isVisible ? `slideUp 0.6s ease-out ${index * 0.1}s both` : "none",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
           style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
      />
      <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/90 backdrop-blur-sm p-8 hover:border-zinc-700 transition-all duration-300">
        {/* Metric value */}
        <div className={`text-6xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-2`}>
          {formatNumber(count)}
          <span className="text-4xl">{metric.suffix}</span>
        </div>

        {/* Label */}
        <h3 className="text-xl font-semibold text-zinc-100 mb-3">{metric.label}</h3>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed">{metric.description}</p>

        {/* Progress bar */}
        <div className="mt-6 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${metric.color} transition-all duration-1000`}
            style={{
              width: isVisible ? "100%" : "0%",
              transitionDelay: `${index * 100}ms`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ImpactMetrics() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <section ref={sectionRef} className="py-32 border-t border-zinc-900">
        <div className="mb-16 text-center">
          <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">
            Impact & Metrics
          </h2>
          <h3 className="text-4xl md:text-5xl font-light text-zinc-50 mb-4">
            Measurable Results
          </h3>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Real numbers from production systems, research projects, and deployed applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} isVisible={isVisible} />
          ))}
        </div>
      </section>
    </>
  );
}
