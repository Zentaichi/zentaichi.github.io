"use client";

import { useFadeIn } from "@/hooks/use-fade-in";
import { GlowCard } from "@/components/shared/glow-card";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const experiences = [
  {
    period: "6/2024 — Present",
    title: "Full-Stack Developer",
    company: "Wizzard Technologies Inc.",
    href: "#",
    description:
      "Developed information systems for operations, management, human resources, universities, and local government. Engineered Role-Based Access Control systems, optimized query performance by mitigating N+1 queries, and integrated real-time communication modules using Pusher.",
    technologies: ["Laravel", "Vue.js", "MySQL", "Tailwind CSS", "Pusher", "Docker", "CI/CD"],
  },
  {
    period: "2/2024 — 5/2024",
    title: "Full-Stack Developer (Intern)",
    company: "Wizzard Technologies Inc.",
    href: "#",
    description:
      "Developed core features for HRIS and OES systems including custom notification trackers and activity audit trail functions. Implemented database design conventions and executed system-wide debugging to maintain production stability.",
    technologies: ["Laravel", "Vue.js", "MSSQL", "Database Design", "Agile Methodologies"],
  },
  {
    period: "06/2024",
    title: "Information Technology Student",
    company: "STI College Novaliches",
    href: "#",
    description:
      "Completed comprehensive education in BS Information Technology with honors, building foundational knowledge in software development, algorithms, and enterprise systems architecture.",
    technologies: ["Information Technology", "Software Development", "Algorithms"],
  },
];

export function ExperienceSection() {
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
    >
      <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Experience
      </h2>

      <div className="flex flex-col gap-6">
        {experiences.map((exp, index) => (
          <GlowCard key={index}>
            <a
              href={exp.href}
              className="group block"
            >
              <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <span className="text-sm text-muted-foreground">
                  {exp.period}
                </span>
                <div className="flex items-center gap-1">
                  <h3 className="font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {exp.title}
                  </h3>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-foreground">{exp.company}</span>
                  <ArrowUpRight className="ml-1 h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100" />
                </div>
              </div>
              <p className="mb-4 text-pretty text-muted-foreground">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={cn(
                      "rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary",
                      "transition-all duration-300",
                      "group-hover:border-primary/50 group-hover:shadow-[0_0_8px_oklch(0.75_0.12_185_/_0.2)]"
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}
