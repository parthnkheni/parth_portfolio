"use client";

import { useEffect, useState, useCallback } from "react";

// Data point type
type Point = { x: number; y: number; label: 0 | 1 };

// Simple 2-layer neural network
class NeuralNetwork {
  weights1: number[][];
  weights2: number[];
  bias1: number[];
  bias2: number;

  constructor(hiddenSize: number) {
    // Initialize random weights
    this.weights1 = Array(hiddenSize).fill(0).map(() => [
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    ]);
    this.weights2 = Array(hiddenSize).fill(0).map(() => (Math.random() - 0.5) * 2);
    this.bias1 = Array(hiddenSize).fill(0).map(() => (Math.random() - 0.5) * 2);
    this.bias2 = (Math.random() - 0.5) * 2;
  }

  sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }

  forward(x: number, y: number): number {
    // Hidden layer
    const hidden = this.weights1.map((w, i) =>
      this.sigmoid(w[0] * x + w[1] * y + this.bias1[i])
    );

    // Output layer
    const output = this.weights2.reduce((sum, w, i) => sum + w * hidden[i], this.bias2);
    return this.sigmoid(output);
  }

  train(points: Point[], learningRate: number) {
    points.forEach(point => {
      // Forward pass
      const hidden = this.weights1.map((w, i) =>
        this.sigmoid(w[0] * point.x + w[1] * point.y + this.bias1[i])
      );
      const output = this.sigmoid(
        this.weights2.reduce((sum, w, i) => sum + w * hidden[i], this.bias2)
      );

      // Backward pass (simplified gradient descent)
      const error = point.label - output;
      const outputGrad = error * output * (1 - output);

      // Update output weights
      this.weights2 = this.weights2.map((w, i) => w + learningRate * outputGrad * hidden[i]);
      this.bias2 += learningRate * outputGrad;

      // Update hidden weights
      this.weights1 = this.weights1.map((w, i) => {
        const hiddenGrad = outputGrad * this.weights2[i] * hidden[i] * (1 - hidden[i]);
        return [
          w[0] + learningRate * hiddenGrad * point.x,
          w[1] + learningRate * hiddenGrad * point.y
        ];
      });

      this.bias1 = this.bias1.map((b, i) => {
        const hiddenGrad = outputGrad * this.weights2[i] * hidden[i] * (1 - hidden[i]);
        return b + learningRate * hiddenGrad;
      });
    });
  }
}

export default function GameClient() {
  const [dataPoints, setDataPoints] = useState<Point[]>([]);
  const [network, setNetwork] = useState<NeuralNetwork | null>(null);
  const [hiddenSize, setHiddenSize] = useState(6);
  const [learningRate, setLearningRate] = useState(0.3);
  const [epoch, setEpoch] = useState(0);
  const [training, setTraining] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [currentClass, setCurrentClass] = useState<0 | 1>(0);
  const [showInstructions, setShowInstructions] = useState(true);

  // Initialize network when hiddenSize changes
  useEffect(() => {
    setNetwork(new NeuralNetwork(hiddenSize));
    setEpoch(0);
    setAccuracy(0);
  }, [hiddenSize]);

  // Calculate accuracy
  const calculateAccuracy = useCallback(() => {
    if (!network || dataPoints.length === 0) return 0;

    const correct = dataPoints.filter(point => {
      const prediction = network.forward(point.x, point.y);
      return (prediction > 0.5 ? 1 : 0) === point.label;
    }).length;

    return (correct / dataPoints.length) * 100;
  }, [network, dataPoints]);

  // Training step
  useEffect(() => {
    if (!training || !network || dataPoints.length < 2) return;

    const interval = setInterval(() => {
      network.train(dataPoints, learningRate);
      setEpoch(e => e + 1);
      const newAccuracy = calculateAccuracy();
      setAccuracy(newAccuracy);

      // Auto-stop at 99% accuracy
      if (newAccuracy >= 99) {
        setTraining(false);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [training, network, dataPoints, learningRate, calculateAccuracy]);

  // Handle canvas click to add points
  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const size = 400;
    const scale = 40;
    const offset = size / 2;

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Convert to coordinate system
    const x = (clickX - offset) / scale;
    const y = (clickY - offset) / scale;

    const newPoint: Point = { x, y, label: currentClass };
    setDataPoints([...dataPoints, newPoint]);
    setShowInstructions(false);
  };

  // Clear all points
  const clearPoints = () => {
    setDataPoints([]);
    setNetwork(new NeuralNetwork(hiddenSize));
    setEpoch(0);
    setAccuracy(0);
    setTraining(false);
    setShowInstructions(true);
  };

  // Remove last point
  const undoPoint = () => {
    if (dataPoints.length > 0) {
      setDataPoints(dataPoints.slice(0, -1));
    }
  };

  // Render decision boundary and points
  const renderCanvas = () => {
    const size = 400;
    const scale = 40;
    const offset = size / 2;

    return (
      <div className="relative">
        <svg
          width={size}
          height={size}
          className="rounded-xl border-2 border-zinc-800 bg-zinc-900 cursor-crosshair"
          onClick={handleCanvasClick}
        >
          {/* Decision boundary background */}
          {network && dataPoints.length >= 2 && Array.from({ length: size / 8 }).map((_, i) =>
            Array.from({ length: size / 8 }).map((_, j) => {
              const x = (i * 8 - offset) / scale;
              const y = (j * 8 - offset) / scale;
              const prediction = network.forward(x, y);
              const color = prediction > 0.5
                ? `rgba(239, 68, 68, ${prediction * 0.4})`
                : `rgba(59, 130, 246, ${(1 - prediction) * 0.4})`;

              return (
                <rect
                  key={`${i}-${j}`}
                  x={i * 8}
                  y={j * 8}
                  width={8}
                  height={8}
                  fill={color}
                />
              );
            })
          )}

          {/* Grid lines */}
          <line x1={offset} y1={0} x2={offset} y2={size} stroke="#3f3f46" strokeWidth={1} strokeDasharray="4" />
          <line x1={0} y1={offset} x2={size} y2={offset} stroke="#3f3f46" strokeWidth={1} strokeDasharray="4" />

          {/* Data points */}
          {dataPoints.map((point, idx) => (
            <g key={idx}>
              <circle
                cx={point.x * scale + offset}
                cy={point.y * scale + offset}
                r={6}
                fill={point.label === 1 ? "#ef4444" : "#3b82f6"}
                stroke="#fff"
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
            </g>
          ))}

          {/* Instructions overlay */}
          {showInstructions && (
            <text
              x={size / 2}
              y={size / 2}
              textAnchor="middle"
              fill="#a1a1aa"
              fontSize="14"
              style={{ pointerEvents: 'none' }}
            >
              Click anywhere to add points!
            </text>
          )}
        </svg>

        <div className="mt-2 text-xs text-zinc-500 text-center">
          Click on the canvas to add {currentClass === 0 ? "blue" : "red"} points
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="rounded-xl border border-blue-900/50 bg-gradient-to-br from-blue-950/30 to-indigo-950/30 p-6">
        <h2 className="text-lg font-semibold mb-3">
          Neural Network Sandbox
        </h2>
        <p className="text-sm text-zinc-300 mb-4">
          Create your own pattern by clicking on the canvas! Switch between blue and red points,
          then train a neural network to learn how to separate them. The more creative your pattern,
          the more challenging it is for the AI!
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg bg-zinc-900/50 p-4">
            <div className="font-medium text-zinc-200 mb-2">Hidden Neurons (Network Capacity)</div>
            <div className="text-zinc-400">
              Think of this as brain power. Simple patterns (like a line) need fewer neurons (3-4).
              Complex patterns (spirals, circles) need more neurons (8-12). Experiment!
            </div>
          </div>
          <div className="rounded-lg bg-zinc-900/50 p-4">
            <div className="font-medium text-zinc-200 mb-2">Learning Rate (Training Speed)</div>
            <div className="text-zinc-400">
              Controls how fast the network learns. Too high = overshooting. Too low = takes forever.
              Sweet spot is usually 0.2-0.5 for most patterns.
            </div>
          </div>
        </div>
      </div>

      {/* Drawing Controls */}
      <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-6">
        <h3 className="text-lg font-semibold mb-4">Drawing Controls</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setCurrentClass(0)}
            className={`flex-1 min-w-[120px] rounded-xl border px-4 py-3 font-semibold transition ${
              currentClass === 0
                ? "border-blue-500 bg-blue-500/20 text-blue-400"
                : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            Blue Class
          </button>
          <button
            onClick={() => setCurrentClass(1)}
            className={`flex-1 min-w-[120px] rounded-xl border px-4 py-3 font-semibold transition ${
              currentClass === 1
                ? "border-red-500 bg-red-500/20 text-red-400"
                : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            Red Class
          </button>
          <button
            onClick={undoPoint}
            disabled={dataPoints.length === 0}
            className="rounded-xl border border-zinc-800 px-4 py-3 text-sm hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Undo
          </button>
          <button
            onClick={clearPoints}
            className="rounded-xl border border-zinc-800 px-4 py-3 text-sm hover:bg-zinc-900"
          >
            Clear All
          </button>
        </div>
        <div className="mt-4 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 text-sm text-zinc-400">
          Points created: <span className="font-semibold text-zinc-200">{dataPoints.length}</span>
          {dataPoints.length < 4 && <span className="text-yellow-400 ml-2">(Add at least 4 points to start training)</span>}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-4">
          <div className="text-sm text-zinc-400">Epochs Trained</div>
          <div className="text-2xl font-semibold mt-1">{epoch}</div>
        </div>
        <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-4">
          <div className="text-sm text-zinc-400">Current Accuracy</div>
          <div className={`text-2xl font-semibold mt-1 ${
            accuracy >= 95 ? "text-green-400" : "text-zinc-100"
          }`}>
            {dataPoints.length >= 2 ? `${accuracy.toFixed(1)}%` : "—"}
          </div>
        </div>
        <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-4">
          <div className="text-sm text-zinc-400">Hidden Neurons</div>
          <div className="text-2xl font-semibold mt-1">{hiddenSize}</div>
        </div>
        <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-4">
          <div className="text-sm text-zinc-400">Learning Rate</div>
          <div className="text-2xl font-semibold mt-1">{learningRate.toFixed(2)}</div>
        </div>
      </div>

      {/* Network Configuration */}
      <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-6 space-y-4">
        <h3 className="text-lg font-semibold">Network Settings</h3>
        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Hidden Layer Size: {hiddenSize} neurons
          </label>
          <input
            type="range"
            min="3"
            max="12"
            value={hiddenSize}
            onChange={(e) => setHiddenSize(Number(e.target.value))}
            disabled={training}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-200"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Learning Rate: {learningRate.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.01"
            max="1"
            step="0.01"
            value={learningRate}
            onChange={(e) => setLearningRate(Number(e.target.value))}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-200"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => setTraining(!training)}
            disabled={dataPoints.length < 4}
            className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
              dataPoints.length < 4
                ? "opacity-50 cursor-not-allowed border-zinc-800 bg-zinc-900"
                : training
                ? "border-orange-800 bg-orange-900/30 hover:bg-orange-900/50 text-orange-400"
                : "border-green-800 bg-green-900/30 hover:bg-green-900/50 text-green-400"
            }`}
          >
            {training ? "Pause Training" : "Start Training"}
          </button>

          <button
            onClick={() => {
              setNetwork(new NeuralNetwork(hiddenSize));
              setEpoch(0);
              setAccuracy(0);
              setTraining(false);
            }}
            className="rounded-xl border border-zinc-800 px-4 py-3 text-sm hover:bg-zinc-900"
          >
            Reset Network
          </button>
        </div>
      </div>

      {/* Visualization */}
      <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-6">
        <h3 className="text-lg font-medium mb-4">Interactive Canvas</h3>
        <div className="flex justify-center">
          {renderCanvas()}
        </div>

        <div className="mt-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <h4 className="text-sm font-medium text-zinc-300 mb-2">How to use:</h4>
          <ul className="text-xs text-zinc-400 space-y-1.5">
            <li>• <strong>Step 1:</strong> Click "Blue Class" or "Red Class" to choose your color</li>
            <li>• <strong>Step 2:</strong> Click on the canvas to place points—make any pattern you like!</li>
            <li>• <strong>Step 3:</strong> Once you have at least 4 points, click "Start Training"</li>
            <li>• <strong>Step 4:</strong> Watch the background fill in as the AI learns your pattern</li>
            <li>• <strong>Pro tip:</strong> Try making spirals, circles, diagonal lines, or random patterns to challenge the AI!</li>
            <li>• <strong>Challenge:</strong> Can you create a pattern that takes 100+ epochs to learn?</li>
          </ul>
        </div>
      </div>

      {/* Success notification */}
      {accuracy >= 95 && dataPoints.length >= 4 && (
        <div className="rounded-xl border border-green-900/50 bg-green-950/20 p-6 text-center">
          <div className="text-green-400 text-lg font-semibold">Pattern Mastered!</div>
          <div className="text-sm text-zinc-400 mt-1">
            The neural network learned your pattern with {accuracy.toFixed(1)}% accuracy in {epoch} epochs!
          </div>
          <div className="text-xs text-zinc-500 mt-2">
            Try creating a more complex pattern to challenge it further!
          </div>
        </div>
      )}

      {/* Training progress */}
      {training && accuracy < 95 && (
        <div className="rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-400">Training in progress...</span>
            <span className="text-sm text-zinc-400">
              {accuracy.toFixed(1)}% accuracy
            </span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${Math.min((accuracy / 95) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
