"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Terminal, Trash2, X } from "lucide-react";

const TERMINAL_LINES = [
  { text: "", delay: 0 },
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
  { text: "", delay: 200 },
  { text: "> _", delay: 100 },
];

export function TerminalMockup() {
  const [expanded, setExpanded] = useState(false);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const startTypewriter = useCallback(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setVisibleLines(TERMINAL_LINES.map((l) => l.text));
      setDone(true);
      return;
    }

    setVisibleLines([]);
    setDone(false);
    clearTimers();

    let cumulativeDelay = 0;
    TERMINAL_LINES.forEach((line) => {
      cumulativeDelay += line.delay;
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line.text]);
      }, cumulativeDelay);
      timersRef.current.push(timer);
    });

    const doneTimer = setTimeout(() => {
      setDone(true);
    }, cumulativeDelay + 100);
    timersRef.current.push(doneTimer);
  }, [clearTimers]);

  useEffect(() => {
    if (expanded && visibleLines.length === 0) {
      startTypewriter();
    }
  }, [expanded, visibleLines.length, startTypewriter]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  const handleClear = () => {
    clearTimers();
    setVisibleLines([]);
    setDone(false);
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
    <div className="fixed bottom-6 left-6 z-40 w-[380px] overflow-hidden rounded-lg border border-border bg-[#1e1e1e] shadow-2xl">
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
        className="h-[300px] overflow-y-auto p-4"
      >
        <pre className="font-mono text-[13px] leading-relaxed text-green-400 whitespace-pre-wrap break-words">
          {visibleLines.map((line, i) => (
            <span key={i}>
              {line}
              {"\n"}
            </span>
          ))}
          {done && (
            <span className="inline-block h-[15px] w-[8px] animate-pulse bg-green-400 align-middle" />
          )}
        </pre>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-3 py-1.5">
        <span className="text-[10px] text-muted-foreground/50">
          Typewriter terminal — no shell access
        </span>
        <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[10px] text-muted-foreground/50">
          ESC
        </kbd>
      </div>
    </div>
  );
}
