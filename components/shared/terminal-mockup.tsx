"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Terminal, Trash2, X } from "lucide-react";

const PROMPT = "zentaichi@portfolio / >";

const INTRO_LINES = [
  { text: "> neofetch", delay: 150 },
  { text: "   ___   Ernest Endrino", delay: 60 },
  { text: "  / _ |  OS: Windows 11 · WSL2", delay: 60 },
  { text: " | |_| | Shell: pwsh 7 · bash · zsh", delay: 60 },
  { text: " |  _  | Editor: VS Code", delay: 60 },
  { text: " |_| |_| Stack: Laravel · Vue · TypeScript", delay: 60 },
  { text: "       Projects: Horde · Sleepyhead CLI", delay: 60 },
  { text: "", delay: 200 },
  { text: "> sleepyhead check", delay: 200 },
  { text: "[\u2713] MariaDB 10.4 detected via XAMPP", delay: 80 },
  { text: "[\u2713] keyfile present at keyfile.enc", delay: 80 },
  { text: "[\u2713] file_key_manager plugin loaded", delay: 80 },
  { text: "[\u2713] innodb_encrypt_tables = ON", delay: 80 },
  { text: "[\u2713] All checks passed — 4/4", delay: 80 },
  { text: "", delay: 200 },
  { text: "> cowsay \"hire me\"", delay: 200 },
  { text: "  _________", delay: 40 },
  { text: " < hire me >", delay: 40 },
  { text: "  ---------", delay: 40 },
  { text: "         \\   ^__^", delay: 40 },
  { text: "          \\  (oo)\\_______", delay: 40 },
  { text: "             (__)\\       )\\/\\", delay: 40 },
  { text: "                 ||----w |", delay: 40 },
  { text: "                 ||     ||", delay: 40 },
];

function getManilaTime() {
  return new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(new Date());
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0),
  );
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function findClosestCommand(
  input: string,
  knownCommands: string[],
  maxDistance = 2,
): string | null {
  const lower = input.toLowerCase().trim();
  let best: string | null = null;
  let bestDist = Infinity;
  for (const cmd of knownCommands) {
    const dist = levenshtein(lower, cmd);
    if (dist < bestDist) {
      bestDist = dist;
      best = cmd;
    }
  }
  return bestDist <= maxDistance ? best : null;
}

const KNOWN_COMMANDS = [
  "help",
  "neofetch",
  "sleepyhead check",
  "cowsay",
  "whoami",
  "projects",
  "contact",
  "date",
  "clear",
  "exit",
  "ls",
  "sudo",
  "vim",
  "npm install",
  "git push --force",
  "rm -rf /",
];

const HELP_OUTPUT = [
  "Available commands:",
  "",
  "  help              Show this command list",
  "  neofetch          Display system info (ASCII art)",
  "  sleepyhead check  Run MariaDB TDE hardening checks",
  "  cowsay [msg]      Have a cow say something",
  "  whoami            Who are you?",
  "  projects          List portfolio projects",
  "  contact           Show contact information",
  "  date              Show current Manila time",
  "  clear             Clear the terminal output",
  "  exit              Collapse the terminal",
  "",
  "Tab to autocomplete. Up/Down for command history.",
];

const NEOFETCH_OUTPUT = [
  "   ___   Ernest Endrino",
  "  / _ |  OS: Windows 11 · WSL2",
  " | |_| | Shell: pwsh 7 · bash · zsh",
  " |  _  | Editor: VS Code",
  " |_| |_| Stack: Laravel · Vue · TypeScript",
  "       Projects: Horde · Sleepyhead CLI",
];

const SLEEPYHEAD_OUTPUT = [
  "[\u2713] MariaDB 10.4 detected via XAMPP",
  "[\u2713] keyfile present at keyfile.enc",
  "[\u2713] file_keymanager plugin loaded",
  "[\u2713] innodb_encrypt_tables = ON",
  "[\u2713] All checks passed — 4/4",
];

function cowsayMessage(msg: string): string[] {
  const lines = [` ${"_".repeat(msg.length + 2)}`];
  lines.push(`< ${msg} >`);
  lines.push(` ${"-".repeat(msg.length + 2)}`);
  lines.push("        \\   ^__^");
  lines.push("         \\  (oo)\\_______");
  lines.push("            (__)\\       )\\/\\");
  lines.push("                ||----w |");
  lines.push("                ||     ||");
  return lines;
}

const PROJECTS_OUTPUT = [
  "Portfolio Projects:",
  "",
  "  [ACTIVE]   Horde              Electron + Vue 3 PHP/DB manager",
  "  [ACTIVE]   Sleepyhead CLI     MariaDB/MySQL TDE hardening CLI",
  "  [INACTIVE] The H.O.L.E.       Anonymous letter-sharing platform",
  "  [INACTIVE] Swiss Army Tools   Developer utility collection",
  "  [LEARNING] React Tic-Tac-Toe  React state exploration",
];

const CONTACT_OUTPUT = [
  "  Email    ernest.endrino@gmail.com",
  "  GitHub   github.com/zentaichi",
  "  LinkedIn linkedin.com/in/ernest-endrino",
  "",
  "  Located in Quezon City, PH (UTC+8)",
];

const CLIPPY = [
  "┌──────────────────────────┐",
  "│  It looks like you're    │",
  "│  trying to run           │",
];

function clippyArt(cmd: string): string[] {
  const displayCmd = cmd.length > 20 ? cmd.slice(0, 17) + "..." : cmd;
  return [
    ...CLIPPY,
    `│  '${displayCmd}'.${" ".repeat(Math.max(0, 17 - cmd.length))}   │`,
    "│                          │",
    "│  That command doesn't    │",
    "│  exist. Type 'help'      │",
    "│  for available commands. │",
    "│      ╭─────────╮         │",
    "│      │ (O) (O) │         │",
    "│      │    ⌣    │         │",
    "│      ╰─────────╯         │",
    "│      ──┴──┴──            │",
    "└──────────────────────────┘",
  ];
}

const EASTER_EGGS: Record<string, string[]> = {
  ls: [
    "You're in a portfolio terminal, not a filesystem.",
    "Try 'projects' or 'help'.",
  ],
  sudo: ["Nice try. This terminal has no root access."],
  vim: [
    "To exit vim: press Esc, then type :q! and press Enter.",
    "...you're welcome.",
  ],
  "npm install": [
    "Added 1,247 packages in 47s.",
    "",
    "Just kidding. This is a static site.",
  ],
  "git push --force": [
    "ERROR: Permission denied.",
    "Hint: Maybe don't force-push to master.",
  ],
  "rm -rf /": [
    "Nice try, but this terminal doesn't have",
    "write access to the root filesystem.",
    "",
    "(Also: please don't run this anywhere.)",
  ],
};

function generateOutput(input: string): string[] {
  const trimmed = input.trim();
  const lower = trimmed.toLowerCase();
  const parts = lower.split(/\s+/);
  const firstWord = parts[0];

  if (firstWord === "help" || lower === "help") return HELP_OUTPUT;
  if (firstWord === "neofetch" || lower === "neofetch")
    return NEOFETCH_OUTPUT;
  if (lower === "sleepyhead check") return SLEEPYHEAD_OUTPUT;
  if (firstWord === "cowsay") {
    const msg =
      trimmed.slice(firstWord.length).trim() || "hire me";
    return cowsayMessage(msg);
  }
  if (firstWord === "whoami" || lower === "whoami")
    return ["Ernest Endrino — Full-Stack Developer"];
  if (firstWord === "projects" || lower === "projects")
    return PROJECTS_OUTPUT;
  if (firstWord === "contact" || lower === "contact")
    return CONTACT_OUTPUT;
  if (firstWord === "date" || lower === "date")
    return [getManilaTime()];

  const egg = EASTER_EGGS[lower];
  if (egg) return egg;

  const suggestion = findClosestCommand(trimmed, KNOWN_COMMANDS);
  if (suggestion) {
    return [
      `Command '${trimmed}' not found. Did you mean '${suggestion}'?`,
    ];
  }

  return clippyArt(trimmed);
}

export function TerminalMockup() {
  const [expanded, setExpanded] = useState(false);
  const [phase, setPhase] = useState<"intro" | "interactive">("intro");
  const [introLines, setIntroLines] = useState<string[]>([]);
  const [output, setOutput] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const skipToInteractive = useCallback(() => {
    clearTimers();
    setIntroLines(INTRO_LINES.map((l) => l.text).filter((t) => t !== ""));
    setPhase("interactive");
  }, [clearTimers]);

  const appendOutput = useCallback((lines: string[]) => {
    setOutput((prev) => [...prev, ...lines]);
  }, []);

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) return;

      if (trimmed.toLowerCase() === "clear") {
        setOutput([]);
        return;
      }

      if (trimmed.toLowerCase() === "exit") {
        setExpanded(false);
        return;
      }

      appendOutput([`${PROMPT} ${trimmed}`]);
      const result = generateOutput(trimmed);
      appendOutput(result);
      appendOutput([""]);
    },
    [appendOutput],
  );

  const handleSubmit = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    executeCommand(trimmed);
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    setInputValue("");
  }, [inputValue, executeCommand]);

  const startTypewriter = useCallback(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      skipToInteractive();
      return;
    }

    setIntroLines([]);
    clearTimers();

    let cumulativeDelay = 0;
    INTRO_LINES.forEach((line) => {
      cumulativeDelay += line.delay;
      const timer = setTimeout(() => {
        setIntroLines((prev) => [...prev, line.text]);
      }, cumulativeDelay);
      timersRef.current.push(timer);
    });

    const doneTimer = setTimeout(() => {
      setIntroLines((prev) => [
        ...prev,
        "",
        "Type 'help' for available commands.",
        "",
      ]);
      setPhase("interactive");
    }, cumulativeDelay + 200);
    timersRef.current.push(doneTimer);
  }, [clearTimers, skipToInteractive]);

  useEffect(() => {
    if (expanded && phase === "intro" && introLines.length === 0) {
      startTypewriter();
    }
  }, [expanded, phase, introLines.length, startTypewriter]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [introLines, output]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (phase === "intro") {
          skipToInteractive();
        } else {
          setExpanded(false);
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [expanded, phase, skipToInteractive]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const next = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInputValue(commandHistory[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const next = historyIndex + 1;
      if (next >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputValue("");
      } else {
        setHistoryIndex(next);
        setInputValue(commandHistory[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (!inputValue.trim()) return;
      const lower = inputValue.toLowerCase().trim();
      for (const cmd of KNOWN_COMMANDS) {
        if (cmd.startsWith(lower)) {
          setInputValue(cmd);
          return;
        }
      }
    }
  };

  const handleContainerClick = () => {
    if (phase === "interactive") {
      inputRef.current?.focus();
    }
  };

  const handleClear = () => {
    clearTimers();
    setPhase("intro");
    setIntroLines([]);
    setOutput([]);
    setInputValue("");
    setCommandHistory([]);
    setHistoryIndex(-1);
    startTypewriter();
  };

  const handleClose = () => {
    setExpanded(false);
  };

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-lg border border-border bg-card/90 px-3 py-2 font-mono text-xs text-muted-foreground shadow-lg backdrop-blur transition-all duration-300 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_16px_var(--glow)]"
        aria-label="Open terminal"
      >
        <Terminal className="h-3.5 w-3.5" />
        <span className="text-primary/80">&gt;_</span>
        <span>zentaichi@portfolio ~</span>
        <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-primary/60" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 w-[420px] overflow-hidden rounded-lg border border-border bg-[#1e1e1e] shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="font-mono text-xs text-muted-foreground">
          TERMINAL
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleClear}
            className="rounded p-1 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
            aria-label="Clear terminal"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleClose}
            className="rounded p-1 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
            aria-label="Close terminal"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="h-[320px] overflow-y-auto p-3"
        onClick={handleContainerClick}
      >
        <pre
          className="font-mono text-[13px] leading-relaxed text-green-400 whitespace-pre-wrap break-words"
          role="log"
          aria-live="polite"
        >
          {introLines.map((line, i) => (
            <span key={`intro-${i}`}>
              {line}
              {"\n"}
            </span>
          ))}
          {phase === "intro" && (
            <span className="inline-block h-[15px] w-[8px] animate-pulse bg-green-400 align-middle" />
          )}
          {output.map((line, i) => (
            <span key={`out-${i}`}>
              {line}
              {"\n"}
            </span>
          ))}
        </pre>
      </div>

      {phase === "intro" && (
        <div className="border-t border-white/10 px-3 py-1.5">
          <button
            onClick={skipToInteractive}
            className="w-full rounded bg-white/5 px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
          >
            Press Enter to skip intro...
          </button>
        </div>
      )}

      {phase === "interactive" && (
        <div className="flex items-center border-t border-white/10 px-3 py-1.5">
          <span className="mr-1 shrink-0 font-mono text-[13px] text-green-400">
            {PROMPT}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent font-mono text-[13px] text-green-400 outline-none caret-green-400"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
        </div>
      )}

      <div className="flex items-center justify-between border-t border-white/10 px-3 py-1.5">
        <span className="text-[10px] text-muted-foreground/50">
          Interactive — try &apos;help&apos;
        </span>
        <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[10px] text-muted-foreground/50">
          ESC
        </kbd>
      </div>
    </div>
  );
}
