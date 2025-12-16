"use client";

import { useState } from "react";
import Image from "next/image";

type ResultSet = {
  name: string;
  description: string;
  images: {
    train: string;
    validation: string;
    test: string;
  };
};

const results: ResultSet[] = [
  {
    name: "E4_0 Channel (Smaller Dataset)",
    description: "Energetic electron flux predictions at 0° pitch angle using reduced training data",
    images: {
      train: "/E40_train_smaller_remove.jpg",
      validation: "/E40_validation_smaller_remove.jpg",
      test: "/E40_test_smaller_remove.jpg",
    },
  },
  {
    name: "E4_90 Channel (Full Dataset)",
    description: "Energetic electron flux predictions at 90° pitch angle with complete training set",
    images: {
      train: "/E490_train_remove.jpg",
      validation: "/E490_validation_remove.jpg",
      test: "/E490_test_remove.jpg",
    },
  },
];

export default function SpacePhysicsResearch() {
  const [selectedModel, setSelectedModel] = useState(0);
  const [selectedView, setSelectedView] = useState<'train' | 'validation' | 'test'>('validation');

  return (
    <section className="py-32 border-t border-zinc-900">
      <div className="mb-16">
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">
          Research Showcase
        </h2>
        <h3 className="text-4xl md:text-5xl font-light text-zinc-50 mb-6">
          Aurora Flux Forecasting
        </h3>
        <p className="text-zinc-400 max-w-3xl leading-relaxed mb-8">
          LSTM-based machine learning models for predicting energetic electron precipitation
          events using POES satellite telemetry and OMNI solar wind data. This research aims
          to improve space weather forecasting accuracy for radiation belt dynamics.
        </p>

        {/* Proposal Link */}
        <a
          href="/Aurora Flux Forecasting Project Proposal.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-800 text-zinc-400 text-sm hover:bg-zinc-900 hover:text-zinc-50 transition-all hover:-translate-y-0.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          View Project Proposal
        </a>
      </div>

      {/* Model Selection */}
      <div className="mb-12">
        <div className="flex gap-4 mb-8">
          {results.map((result, index) => (
            <button
              key={result.name}
              onClick={() => setSelectedModel(index)}
              className={`flex-1 p-6 rounded-xl border transition-all ${
                selectedModel === index
                  ? "border-zinc-600 bg-zinc-900"
                  : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
              }`}
            >
              <h4 className="text-lg font-semibold text-zinc-100 mb-2">{result.name}</h4>
              <p className="text-sm text-zinc-500">{result.description}</p>
            </button>
          ))}
        </div>

        {/* View Selector */}
        <div className="flex gap-3 justify-center">
          {(['train', 'validation', 'test'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view)}
              className={`px-6 py-2 rounded-lg border transition-all ${
                selectedView === view
                  ? "border-zinc-300 bg-zinc-100 text-zinc-900"
                  : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)} Results
            </button>
          ))}
        </div>
      </div>

      {/* Results Visualization */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
        <div className="relative aspect-[16/10] bg-zinc-900">
          <Image
            src={results[selectedModel].images[selectedView]}
            alt={`${results[selectedModel].name} - ${selectedView} results`}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Image Caption */}
        <div className="p-6 border-t border-zinc-800">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-zinc-50 font-semibold mb-1">
                {results[selectedModel].name} - {selectedView.charAt(0).toUpperCase() + selectedView.slice(1)} Set
              </h4>
              <p className="text-sm text-zinc-500">
                Model predictions vs. actual energetic electron flux measurements from POES satellite data
              </p>
            </div>
            <a
              href={results[selectedModel].images[selectedView]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors inline-flex items-center gap-2"
            >
              View Full Size
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Key Findings */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
          <h4 className="text-zinc-50 font-semibold mb-2">7M+ Data Points</h4>
          <p className="text-sm text-zinc-500">
            Processing 2-second satellite samples per month for time-series forecasting
          </p>
        </div>
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
          <h4 className="text-zinc-50 font-semibold mb-2">85%+ Accuracy</h4>
          <p className="text-sm text-zinc-500">
            LSTM model performance for energetic electron precipitation event forecasting
          </p>
        </div>
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
          <h4 className="text-zinc-50 font-semibold mb-2">Multi-Input Architecture</h4>
          <p className="text-sm text-zinc-500">
            Combining POES flux measurements with 4-hour windows of solar wind drivers
          </p>
        </div>
      </div>
    </section>
  );
}
