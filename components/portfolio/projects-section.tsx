"use client";

import Image from "next/image";
import { useFadeIn } from "@/hooks/use-fade-in";
import { GlowCard } from "@/components/shared/glow-card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

type ProjectStatus = "in-development" | null;
type ProjectVariant = "real" | "learning" | null;

const projects = [
  {
    title: "The H.O.L.E.",
    description:
      "A digital sanctuary for unsent letters and unspoken words. HOLE is an anonymous platform where users can share letters they never sent, creating a collective space for emotional expression and healing.",
    href: "#",
    github: "#",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "PostgreSQL", "shadcn/ui", "Lucide Icons"],
    image: undefined,
    status: "in-development" as ProjectStatus,
    variant: "real" as ProjectVariant,
  },
  {
    title: "Swiss Army Tools",
    description:
      "A comprehensive collection of developer utilities and tools, all accessible from one convenient web application inspired by DevUtils.",
    href: "https://zentaichi.me/swiss-army-tools/",
    github: "https://github.com/zentaichi/swiss-army-tools",
    technologies: ["Vue.js", "Vite", "TailwindCSS", "Vue Router"],
    image: undefined,
    status: "in-development" as ProjectStatus,
    variant: "real" as ProjectVariant,
  },
  {
    title: "React Tic-Tac-Toe",
    description:
      "Exploring React's state model and TypeScript outside my primary Vue stack — built with Vite, fully typed, deployed via GitHub Pages — a classic Tic-Tac-Toe game with interactive features and state management.",
    href: "https://zentaichi.me/tic-tac-toe/",
    github: "https://github.com/Zentaichi/tic-tac-toe",
    technologies: ["React", "TypeScript", "Vite"],
    image: undefined,
    status: null,
    variant: "learning" as ProjectVariant,
  },
];

export function ProjectsSection() {
  const { ref, isVisible } = useFadeIn(0.1, "-50px");

  return (
    <section
      id="projects"
      ref={ref}
      className={cn(
        "mb-16 transition-all duration-700 ease-out",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      )}
      style={{ transitionDelay: "100ms" }}
    >
      <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Projects
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          const isInDevelopment = project.status === "in-development";
          const isLearning = project.variant === "learning";
          const isRealProject = project.variant === "real";

          return (
          <GlowCard key={index} className="flex flex-col overflow-hidden">
            {project.image && (
              <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg bg-secondary">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            <div className="mb-3 flex min-h-18 flex-col">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-foreground transition-colors duration-300 hover:text-primary">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3">
                  <a
                    href={project.github === "#" ? undefined : project.github}
                    onClick={(e) => project.github === "#" && e.preventDefault()}
                    aria-label={`GitHub repository for ${project.title}`}
                    className={cn(
                      "transition-all duration-300",
                      project.github === "#"
                        ? "cursor-not-allowed text-muted-foreground/40 opacity-50"
                        : "text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_6px_oklch(0.75_0.12_185/0.5)]"
                    )}
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href={project.href === "#" ? undefined : project.href}
                    onClick={(e) => project.href === "#" && e.preventDefault()}
                    aria-label={`Live demo for ${project.title}`}
                    className={cn(
                      "transition-all duration-300",
                      project.href === "#"
                        ? "cursor-not-allowed text-muted-foreground/40 opacity-50"
                        : "text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_6px_oklch(0.75_0.12_185/0.5)]"
                    )}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex min-h-10 flex-wrap items-center gap-2">
                {isRealProject && (
                  <span className="inline-flex items-center rounded-full border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-xs leading-none text-foreground/80">
                    Production
                  </span>
                )}
                {isLearning && (
                  <span className="inline-flex items-center rounded-full border border-border/50 bg-secondary/30 px-2 py-0.5 font-mono text-xs leading-none text-muted-foreground/80">
                    Learning
                  </span>
                )}
                {isInDevelopment && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 font-mono text-xs leading-none text-primary/80">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>
                    In Development
                  </span>
                )}
              </div>
            </div>
            <p className="mb-4 flex-1 text-pretty text-sm text-muted-foreground">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className={cn(
                    "rounded-full border border-border bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground",
                    "transition-all duration-300",
                    "hover:border-primary/50 hover:text-primary"
                  )}
                >
                  {tech}
                </span>
              ))}
            </div>
          </GlowCard>
        )})}
      </div>

      <a
        href="https://github.com/zentaichi?tab=repositories"
        className="group mt-8 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors duration-300 hover:text-primary"
      >
        View Full Project Archive
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </section>
  );
}
