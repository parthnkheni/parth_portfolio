"use client";

import { useEffect, useState } from "react";

export default function TerminalNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already seen the notification
    const hasSeenNotification = localStorage.getItem("hasSeenTerminalNotification");

    if (!hasSeenNotification) {
      // Show notification after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      // Auto-hide after 8 seconds
      const autoHideTimer = setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem("hasSeenTerminalNotification", "true");
      }, 10000);

      return () => {
        clearTimeout(timer);
        clearTimeout(autoHideTimer);
      };
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("hasSeenTerminalNotification", "true");
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{
        animation: isVisible ? "slideInUp 0.5s ease-out" : "none",
      }}
    >
      <div className="relative">
        {/* Main content */}
        <div className="relative rounded-xl border border-zinc-800 bg-black/95 backdrop-blur-xl p-5 shadow-2xl max-w-sm">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Icon */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-9 h-9 rounded border border-zinc-800 bg-zinc-900 flex items-center justify-center">
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <div className="flex-1">
              <h4 className="text-sm font-light text-zinc-50 mb-1">
                Terminal Access
              </h4>
              <p className="text-xs text-zinc-500 mb-3 leading-relaxed font-light">
                Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs">Ctrl+K</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs">/</kbd> to open
              </p>

              {/* Quick command examples */}
              <div className="space-y-1">
                <div className="text-xs text-zinc-600 font-mono">
                  $ show projects --ml
                </div>
                <div className="text-xs text-zinc-600 font-mono">
                  $ contact
                </div>
                <div className="text-xs text-zinc-600 font-mono">
                  $ download resume
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Try it button */}
        <button
          onClick={() => {
            handleDismiss();
            // Trigger Ctrl+K programmatically
            window.dispatchEvent(new KeyboardEvent('keydown', {
              key: 'k',
              ctrlKey: true,
              bubbles: true
            }));
          }}
          className="mt-2 w-full px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 text-xs font-light hover:bg-zinc-800 hover:text-zinc-300 transition-all"
        >
          Try it now →
        </button>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
