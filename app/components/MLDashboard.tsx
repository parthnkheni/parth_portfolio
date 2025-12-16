"use client";

import { useEffect, useState, useRef } from "react";

type ModelMetric = {
  epoch: number;
  trainLoss: number;
  valLoss: number;
  accuracy: number;
};

export default function MLDashboard() {
  const [isTraining, setIsTraining] = useState(false);
  const [metrics, setMetrics] = useState<ModelMetric[]>([]);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulate training
  const startTraining = () => {
    setIsTraining(true);
    setMetrics([]);
    setCurrentEpoch(0);

    const maxEpochs = 50;
    let epoch = 0;

    const interval = setInterval(() => {
      if (epoch >= maxEpochs) {
        setIsTraining(false);
        clearInterval(interval);
        return;
      }

      // Simulate realistic training metrics
      const trainLoss = 0.8 * Math.exp(-epoch / 10) + 0.05 + Math.random() * 0.05;
      const valLoss = 0.9 * Math.exp(-epoch / 12) + 0.08 + Math.random() * 0.08;
      const accuracy = 100 * (1 - Math.exp(-epoch / 8)) * (0.95 + Math.random() * 0.05);

      setMetrics((prev) => [
        ...prev,
        { epoch, trainLoss, valLoss, accuracy },
      ]);
      setCurrentEpoch(epoch);
      epoch++;
    }, 100);
  };

  // Draw loss curve
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || metrics.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = "rgba(113, 113, 122, 0.2)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Find max values for scaling
    const maxLoss = Math.max(...metrics.map((m) => Math.max(m.trainLoss, m.valLoss)));
    const padding = 20;

    // Draw train loss
    ctx.beginPath();
    ctx.strokeStyle = "#3b82f6"; // blue
    ctx.lineWidth = 2;
    metrics.forEach((metric, i) => {
      const x = padding + ((width - 2 * padding) / metrics.length) * i;
      const y = height - padding - ((height - 2 * padding) * (1 - metric.trainLoss / maxLoss));
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw validation loss
    ctx.beginPath();
    ctx.strokeStyle = "#f59e0b"; // amber
    ctx.lineWidth = 2;
    metrics.forEach((metric, i) => {
      const x = padding + ((width - 2 * padding) / metrics.length) * i;
      const y = height - padding - ((height - 2 * padding) * (1 - metric.valLoss / maxLoss));
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Labels
    ctx.fillStyle = "#a1a1aa";
    ctx.font = "10px monospace";
    ctx.fillText("Loss", 5, 15);
    ctx.fillText("Epoch", width - 35, height - 5);
  }, [metrics]);

  const latestMetrics = metrics[metrics.length - 1];

  return (
    <section className="py-32 border-t border-zinc-900">
      <div className="mb-16 text-center">
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">
          Live Demo
        </h2>
        <h3 className="text-4xl md:text-5xl font-light text-zinc-50 mb-4">
          ML Training Dashboard
        </h3>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Simulated neural network training with real-time metrics visualization
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Metrics Cards */}
        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-sm text-zinc-500 mb-1">Training Loss</div>
            <div className="text-3xl font-bold text-blue-400">
              {latestMetrics ? latestMetrics.trainLoss.toFixed(4) : "—"}
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-zinc-600">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              {latestMetrics && metrics.length > 1
                ? `${((1 - latestMetrics.trainLoss / metrics[0].trainLoss) * 100).toFixed(1)}% improvement`
                : "—"}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-sm text-zinc-500 mb-1">Validation Loss</div>
            <div className="text-3xl font-bold text-amber-400">
              {latestMetrics ? latestMetrics.valLoss.toFixed(4) : "—"}
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-zinc-600">
              <div
                className={`w-2 h-2 rounded-full ${
                  latestMetrics && latestMetrics.valLoss < latestMetrics.trainLoss * 1.1
                    ? "bg-emerald-500"
                    : "bg-red-500"
                }`}
              />
              {latestMetrics && latestMetrics.valLoss < latestMetrics.trainLoss * 1.1
                ? "No overfitting detected"
                : "Monitor for overfitting"}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-sm text-zinc-500 mb-1">Accuracy</div>
            <div className="text-3xl font-bold text-emerald-400">
              {latestMetrics ? `${latestMetrics.accuracy.toFixed(2)}%` : "—"}
            </div>
            <div className="mt-2 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-300"
                style={{ width: latestMetrics ? `${latestMetrics.accuracy}%` : "0%" }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-sm text-zinc-500 mb-1">Current Epoch</div>
            <div className="text-3xl font-bold text-purple-400">
              {currentEpoch}/{50}
            </div>
            <div className="mt-2 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${(currentEpoch / 50) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Loss Curve Graph */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-zinc-100">Training Progress</h4>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-blue-500" />
                  <span className="text-zinc-400">Train Loss</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-amber-500" />
                  <span className="text-zinc-400">Val Loss</span>
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-[300px] bg-zinc-900 rounded-lg p-4">
              <canvas
                ref={canvasRef}
                width={600}
                height={300}
                className="w-full h-full"
              />
            </div>

            <div className="mt-4 flex justify-center">
              <button
                onClick={startTraining}
                disabled={isTraining}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  isTraining
                    ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                }`}
              >
                {isTraining ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Training... Epoch {currentEpoch}/50
                  </span>
                ) : (
                  "Start Training"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Model Architecture Info */}
      <div className="mt-8 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900 p-6">
        <h4 className="font-semibold text-zinc-100 mb-4">Simulated Model Architecture</h4>
        <div className="grid md:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="text-zinc-500 mb-1">Input Layer</div>
            <div className="text-zinc-200">784 neurons</div>
            <div className="text-xs text-zinc-600">28×28 images</div>
          </div>
          <div>
            <div className="text-zinc-500 mb-1">Hidden Layers</div>
            <div className="text-zinc-200">2 × 128 neurons</div>
            <div className="text-xs text-zinc-600">ReLU activation</div>
          </div>
          <div>
            <div className="text-zinc-500 mb-1">Output Layer</div>
            <div className="text-zinc-200">10 neurons</div>
            <div className="text-xs text-zinc-600">Softmax classifier</div>
          </div>
          <div>
            <div className="text-zinc-500 mb-1">Optimizer</div>
            <div className="text-zinc-200">Adam</div>
            <div className="text-xs text-zinc-600">lr=0.001, β=(0.9, 0.999)</div>
          </div>
        </div>
      </div>
    </section>
  );
}
