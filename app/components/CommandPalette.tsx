"use client";

import { useEffect, useState, useCallback } from "react";
import { site } from "../data/site";

type Command = {
  name: string;
  description: string;
  action: () => void;
  category: string;
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [output, setOutput] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const commands: Command[] = [
    {
      name: "show projects",
      description: "Display all projects",
      category: "navigation",
      action: () => {
        const projectList = site.projects
          .map((p, i) => `  ${i + 1}. ${p.title} (${p.date})`)
          .join("\n");
        setOutput([...output, `\n${projectList}\n`]);
      },
    },
    {
      name: "show projects --ml",
      description: "Filter projects by ML/AI",
      category: "filter",
      action: () => {
        const mlProjects = site.projects
          .filter((p) =>
            p.tech.some((t) =>
              ["Python", "TensorFlow", "PyTorch", "scikit-learn", "LSTM"].includes(t)
            )
          )
          .map((p, i) => `  ${i + 1}. ${p.title}`)
          .join("\n");
        setOutput([...output, `\nML/AI Projects:\n${mlProjects}\n`]);
      },
    },
    {
      name: "show projects --robotics",
      description: "Filter projects by robotics",
      category: "filter",
      action: () => {
        const roboticsProjects = site.projects
          .filter((p) =>
            p.tech.some((t) => ["Arduino", "ROS", "FPGA"].includes(t))
          )
          .map((p, i) => `  ${i + 1}. ${p.title}`)
          .join("\n");
        setOutput([...output, `\nRobotics Projects:\n${roboticsProjects}\n`]);
      },
    },
    {
      name: "show experience",
      description: "Display work experience",
      category: "navigation",
      action: () => {
        const expList = site.experiences
          .map((e) => `  • ${e.role} @ ${e.company} (${e.date})`)
          .join("\n");
        setOutput([...output, `\n${expList}\n`]);
      },
    },
    {
      name: "filter experience --ml",
      description: "Filter experience by ML",
      category: "filter",
      action: () => {
        const mlExp = site.experiences
          .filter((e) =>
            e.description.some((d) =>
              d.toLowerCase().includes("machine learning") ||
              d.toLowerCase().includes("neural network") ||
              d.toLowerCase().includes("ml")
            )
          )
          .map((e) => `  • ${e.role} @ ${e.company}`)
          .join("\n");
        setOutput([...output, `\nML Experience:\n${mlExp}\n`]);
      },
    },
    {
      name: "contact --email",
      description: "Show email address",
      category: "contact",
      action: () => {
        setOutput([...output, `\nEmail: ${site.email}\n`]);
      },
    },
    {
      name: "contact --linkedin",
      description: "Open LinkedIn profile",
      category: "contact",
      action: () => {
        window.open(site.links.linkedin, "_blank");
        setOutput([...output, "\nOpening LinkedIn profile...\n"]);
      },
    },
    {
      name: "contact --github",
      description: "Open GitHub profile",
      category: "contact",
      action: () => {
        window.open(site.links.github, "_blank");
        setOutput([...output, "\nOpening GitHub profile...\n"]);
      },
    },
    {
      name: "download resume",
      description: "Download resume PDF",
      category: "action",
      action: () => {
        window.open(site.links.resume, "_blank");
        setOutput([...output, "\nDownloading resume...\n"]);
      },
    },
    {
      name: "skills",
      description: "Show technical skills",
      category: "info",
      action: () => {
        const skillsOutput = `
Programming: ${site.skills.programming.join(", ")}
ML/AI: ${site.skills.machineLearning.join(", ")}
Tools: ${site.skills.cloudTools.join(", ")}
`;
        setOutput([...output, skillsOutput]);
      },
    },
    {
      name: "clear",
      description: "Clear terminal output",
      category: "system",
      action: () => {
        setOutput([]);
      },
    },
    {
      name: "help",
      description: "Show available commands",
      category: "system",
      action: () => {
        const helpText = commands
          .map((cmd) => `  ${cmd.name.padEnd(25)} - ${cmd.description}`)
          .join("\n");
        setOutput([
          ...output,
          "\nAvailable commands:\n",
          helpText,
          "\n\nTip: Use arrow keys to navigate history, Tab for autocomplete\n",
        ]);
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(input.toLowerCase())
  );

  const executeCommand = useCallback(() => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setCommandHistory([...commandHistory, trimmedInput]);
    setHistoryIndex(-1);
    setOutput([...output, `$ ${trimmedInput}`]);

    const matchedCommand = commands.find(
      (cmd) => cmd.name.toLowerCase() === trimmedInput.toLowerCase()
    );

    if (matchedCommand) {
      matchedCommand.action();
    } else {
      setOutput([
        ...output,
        `$ ${trimmedInput}`,
        `Command not found: ${trimmedInput}`,
        'Type "help" for available commands.\n',
      ]);
    }

    setInput("");
    setSelectedIndex(0);
  }, [input, output, commands, commandHistory]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Open/close palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
        setInput("");
        setSelectedIndex(0);
        return;
      }

      if (e.key === "/" && !isOpen && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setInput("");
        setOutput([]);
      }
    },
    [isOpen]
  );

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        setInput(filteredCommands[0].name);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Terminal */}
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden font-mono text-sm">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-zinc-500 text-xs ml-2">
            parth@portfolio ~ % command-palette
          </span>
          <div className="ml-auto text-zinc-600 text-xs">
            Press Esc to close
          </div>
        </div>

        {/* Output area */}
        <div className="px-4 py-3 max-h-[40vh] overflow-y-auto bg-zinc-950">
          {output.length === 0 && (
            <div className="text-zinc-600 mb-4">
              <p>Welcome to the Command Palette!</p>
              <p className="mt-2">Type 'help' to see available commands.</p>
              <p className="mt-2 text-zinc-700">
                Shortcuts: Ctrl+K or / to open, Tab for autocomplete, ↑↓ for history
              </p>
            </div>
          )}
          {output.map((line, i) => (
            <div
              key={i}
              className={line.startsWith("$") ? "text-emerald-400" : "text-zinc-300"}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              className="flex-1 bg-transparent outline-none text-zinc-100"
              placeholder="Type a command or 'help'..."
              autoFocus
            />
          </div>

          {/* Autocomplete suggestions */}
          {input && filteredCommands.length > 0 && (
            <div className="mt-3 pt-3 border-t border-zinc-800">
              <div className="text-zinc-600 text-xs mb-2">Suggestions:</div>
              {filteredCommands.slice(0, 5).map((cmd, i) => (
                <div
                  key={cmd.name}
                  onClick={() => {
                    setInput(cmd.name);
                    executeCommand();
                  }}
                  className="px-2 py-1 hover:bg-zinc-800 rounded cursor-pointer text-zinc-400 flex justify-between"
                >
                  <span>{cmd.name}</span>
                  <span className="text-zinc-600 text-xs">{cmd.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
