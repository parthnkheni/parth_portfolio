"use client";

import { useState, useEffect } from "react";

type CodeSnippet = {
  title: string;
  language: string;
  description: string;
  code: string;
  tags: string[];
};

const snippets: CodeSnippet[] = [
  {
    title: "Neural Network Training Loop",
    language: "python",
    description: "LSTM-based space weather prediction with custom loss function",
    code: 
    `def train_model(model, train_loader, val_loader, epochs=50):
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    criterion = nn.MSELoss()

    best_val_loss = float('inf')
    for epoch in range(epochs):
        # Training phase
        model.train()
        train_loss = 0.0
        for batch_x, batch_y in train_loader:
            optimizer.zero_grad()
            predictions = model(batch_x)
            loss = criterion(predictions, batch_y)
            loss.backward()
            optimizer.step()
            train_loss += loss.item()

        # Validation phase
        model.eval()
        val_loss = 0.0
        with torch.no_grad():
            for batch_x, batch_y in val_loader:
                predictions = model(batch_x)
                loss = criterion(predictions, batch_y)
                val_loss += loss.item()

        if val_loss < best_val_loss:
            best_val_loss = val_loss
            torch.save(model.state_dict(), 'best_model.pth')`,
    tags: ["PyTorch", "LSTM", "Space Weather"],
  },
  {
    title: "FPGA Debounce Module",
    language: "verilog",
    description: "Hardware button debouncing for Whack-a-Mole game on Nexys4 DDR",
    code: `module debounce #(
    parameter DEBOUNCE_TIME = 1_000_000  // 10ms at 100MHz
)(
    input wire clk,
    input wire reset,
    input wire button_in,
    output reg button_out
);
    reg [19:0] counter;
    reg button_sync;

    always @(posedge clk or posedge reset) begin
        if (reset) begin
            counter <= 0;
            button_sync <= 0;
            button_out <= 0;
        end else begin
            button_sync <= button_in;

            if (button_sync == button_out) begin
                counter <= 0;
            end else begin
                counter <= counter + 1;
                if (counter >= DEBOUNCE_TIME) begin
                    button_out <= button_sync;
                    counter <= 0;
                end
            end
        end
    end
endmodule`,
    tags: ["Verilog", "FPGA", "Hardware Design"],
  },
  {
    title: "Real-time Stock Data Fetcher",
    language: "java",
    description: "Android app using Retrofit for Finnhub API integration",
    code: `public class StockRepository {
    private final FinnhubApi api;
    private final ExecutorService executor;

    public StockRepository() {
        Retrofit retrofit = new Retrofit.Builder()
            .baseUrl("https://finnhub.io/api/v1/")
            .addConverterFactory(GsonConverterFactory.create())
            .build();

        api = retrofit.create(FinnhubApi.class);
        executor = Executors.newFixedThreadPool(3);
    }

    public void fetchStockQuote(String symbol,
                               StockCallback callback) {
        executor.execute(() -> {
            try {
                Response<StockQuote> response =
                    api.getQuote(symbol, API_KEY).execute();

                if (response.isSuccessful()) {
                    callback.onSuccess(response.body());
                } else {
                    callback.onError("API Error");
                }
            } catch (IOException e) {
                callback.onError(e.getMessage());
            }
        });
    }
}`,
    tags: ["Java", "Android", "Retrofit"],
  },
  {
    title: "ECG Signal Processing",
    language: "python",
    description: "Feature extraction pipeline for arrhythmia detection",
    code: `def extract_features(ecg_signal, sampling_rate=360):
    # Bandpass filter to remove noise
    sos = butter(4, [0.5, 50], btype='bandpass',
                 fs=sampling_rate, output='sos')
    filtered = sosfiltfilt(sos, ecg_signal)

    # Detect R-peaks using Pan-Tompkins algorithm
    r_peaks = detect_r_peaks(filtered, sampling_rate)

    # Calculate time-domain features
    rr_intervals = np.diff(r_peaks) / sampling_rate
    features = {
        'mean_hr': 60 / np.mean(rr_intervals),
        'std_hr': np.std(60 / rr_intervals),
        'rmssd': np.sqrt(np.mean(np.diff(rr_intervals)**2)),
        'sdnn': np.std(rr_intervals)
    }

    # Frequency-domain features
    freqs, psd = welch(rr_intervals, fs=4)
    lf = np.trapz(psd[(freqs >= 0.04) & (freqs < 0.15)])
    hf = np.trapz(psd[(freqs >= 0.15) & (freqs < 0.4)])
    features['lf_hf_ratio'] = lf / hf if hf > 0 else 0

    return features`,
    tags: ["Python", "Signal Processing", "ML"],
  },
];

export default function CodeShowcase() {
  const [selectedSnippet, setSelectedSnippet] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Simple syntax highlighting with React elements
  const highlightCode = (code: string, language: string) => {
    // Just return the plain code with basic styling
    // The monospace font and color scheme will handle the display
    return code;
  };

  // Typing animation effect
  useEffect(() => {
    const snippet = snippets[selectedSnippet];
    setIsTyping(true);
    setDisplayedCode("");

    // Trim the code to remove leading/trailing whitespace
    const trimmedCode = snippet.code.trim();

    let index = 0;
    const interval = setInterval(() => {
      if (index < trimmedCode.length) {
        setDisplayedCode((prev) => prev + trimmedCode[index]);
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [selectedSnippet]);

  const currentSnippet = snippets[selectedSnippet];

  return (
    <section className="py-32 border-t border-zinc-900">
      <div className="mb-16">
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">
          Code Examples
        </h2>
        <h3 className="text-4xl md:text-5xl font-light text-zinc-50 mb-4">
          Real Implementation Samples
        </h3>
        <p className="text-zinc-400 max-w-2xl">
          Actual code from production projects. Click snippets to see different implementations.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Snippet selector */}
        <div className="space-y-3">
          {snippets.map((snippet, index) => (
            <button
              key={snippet.title}
              onClick={() => setSelectedSnippet(index)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedSnippet === index
                  ? "border-zinc-600 bg-zinc-900"
                  : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
              }`}
            >
              <h4 className="font-semibold text-zinc-100 mb-1">{snippet.title}</h4>
              <p className="text-xs text-zinc-500 mb-2">{snippet.description}</p>
              <div className="flex gap-2">
                {snippet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Code display */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
            {/* Code editor header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-zinc-400">{currentSnippet.title}</span>
              </div>
              <span className="text-xs text-zinc-600 font-mono">
                {currentSnippet.language}
              </span>
            </div>

            {/* Code content */}
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm font-mono leading-relaxed text-zinc-300 whitespace-pre-wrap m-0 p-0">{displayedCode}{isTyping && <span className="inline-block w-2 h-4 bg-zinc-50 animate-pulse ml-1" />}</pre>
            </div>

            {/* Footer with description */}
            <div className="px-6 py-4 bg-zinc-900/50 border-t border-zinc-800">
              <p className="text-sm text-zinc-400">{currentSnippet.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
