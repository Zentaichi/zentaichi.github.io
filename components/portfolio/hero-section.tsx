"use client";

import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Briefcase, Hammer } from "lucide-react";
import { cn } from "@/lib/utils";

const skillGroups = [
  {
    title: "Frontend",
    context: "Building performant, accessible interfaces and component systems.",
    skills: ["Vue.js", "React", "TailwindCSS"],
  },
  {
    title: "Backend",
    context: "Designing APIs and business logic for scalable enterprise workflows.",
    skills: ["Laravel", "Node.js"],
  },
  {
    title: "Data & Infrastructure",
    context: "Managing reliable persistence, deployments, and runtime environments.",
    skills: ["PostgreSQL", "MySQL", "Docker"],
  },
];

const socials = [
  { icon: Github, href: "https://github.com/zentaichi", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ernest-endrino/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:ernest.endrino@gmail.com", label: "Email" },
];

const CURRENTLY_BUILDING = ["Horde", "Sleepyhead CLI"];
const BUILDING_INTERVAL_MS = 5_000;

export function HeroSection() {
  const formatManilaTime = () =>
    new Intl.DateTimeFormat("en-PH", {
      timeZone: "Asia/Manila",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());

  const [manilaTime, setManilaTime] = useState(formatManilaTime);
  const [buildingIndex, setBuildingIndex] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const updateTime = () => setManilaTime(formatManilaTime());
    updateTime();

    const intervalId = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = media.matches;
    if (media.matches) return;

    const intervalId = window.setInterval(() => {
      setBuildingIndex((prev) => (prev + 1) % CURRENTLY_BUILDING.length);
    }, BUILDING_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="mb-16">
      <div className="mb-8">
        <h1 className="mb-2 text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          <span className="text-balance">Ernest Endrino</span>
        </h1>
        <p className="text-lg font-medium text-primary">Full-Stack Developer</p>

        <div className="mt-3 flex flex-wrap items-center gap-2" role="note" aria-label="Profile metadata">
          <span className="inline-flex items-center rounded-full border border-border/50 bg-secondary/30 px-3 py-1 font-mono text-xs leading-none text-muted-foreground/70">
            @Zentaichi
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1 font-mono text-xs leading-none text-muted-foreground" aria-live="polite">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Quezon City, PH · PHT (UTC+8) · {manilaTime}
          </span>

          <span className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1 font-mono text-xs leading-none text-muted-foreground">
            Available Fri - Sun
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-green-500/10 px-3 py-1 font-mono text-xs leading-none text-green-600/80">
            <Briefcase className="h-3 w-3" />
            Open to Work
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs leading-none text-primary/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <Hammer className="h-3 w-3" />
            Currently building:{" "}
            <span
              key={buildingIndex}
              className="animate-fade-slide-in inline-block"
            >
              {CURRENTLY_BUILDING[buildingIndex]}
            </span>
          </span>
        </div>
      </div>

      <p className="mb-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
        I'm a Full-Stack Developer with a proven track record of optimizing enterprise-level MIS environments. Specialized in Laravel and Vue.js, with a focus on resolving critical performance bottlenecks, implementing secure access protocols, and architecting real-time communication modules.
      </p>

      <p className="mb-10 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
        Proficient at transforming complex client requirements into scalable, production-ready features. Currently developing information systems for operations, management, human resources, universities, and local government with a focus on user experience and system reliability.
      </p>

      <div className="mb-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Skills
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-lg border border-border bg-card/40 p-4"
            >
              <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{group.context}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={cn(
                      "rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm text-secondary-foreground",
                      "transition-all duration-300",
                      "hover:border-primary/50 hover:bg-primary/10 hover:text-primary",
                      "hover:shadow-[0_0_12px_oklch(0.75_0.12_185/0.3)]"
                    )}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className={cn(
              "text-muted-foreground transition-all duration-300",
              "hover:text-primary hover:drop-shadow-[0_0_8px_oklch(0.75_0.12_185/0.6)]"
            )}
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </section>
  );
}
