"use client";

import Image from "next/image";
import { useFadeIn } from "@/hooks/use-fade-in";
import { GlowCard } from "@/components/shared/glow-card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Project One",
    description:
      "A full-stack application that helps users track their daily habits and build consistent routines. Features real-time sync and data visualization.",
    href: "#",
    github: "#",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    image: undefined,
  },
  {
    title: "Project Two",
    description:
      "An open-source component library built with accessibility in mind. Provides a set of reusable UI components for React applications.",
    href: "#",
    github: "#",
    technologies: ["React", "Storybook", "Testing Library", "Rollup"],
    image: undefined,
  },
  {
    title: "Project Three",
    description:
      "A CLI tool for automating development workflows. Streamlines common tasks like scaffolding, testing, and deployment.",
    href: "#",
    github: "#",
    technologies: ["Node.js", "Commander", "Inquirer", "Chalk"],
    image: undefined,
  },
];

export function ProjectsSection() {
  const { ref, isVisible } = useFadeIn(0.1, "-50px");

  return (
    <section
      ref={ref}
      className={cn(
        "mb-32 transition-all duration-700 ease-out",
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
        {projects.map((project, index) => (
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
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-foreground transition-colors duration-300 hover:text-primary">
                {project.title}
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href={project.github}
                  aria-label={`GitHub repository for ${project.title}`}
                  className="text-muted-foreground transition-all duration-300 hover:text-primary hover:drop-shadow-[0_0_6px_oklch(0.75_0.12_185_/_0.5)]"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={project.href}
                  aria-label={`Live demo for ${project.title}`}
                  className="text-muted-foreground transition-all duration-300 hover:text-primary hover:drop-shadow-[0_0_6px_oklch(0.75_0.12_185_/_0.5)]"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
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
        ))}
      </div>

      <a
        href="#"
        className="group mt-8 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors duration-300 hover:text-primary"
      >
        View Full Project Archive
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </section>
  );
}
