"use client";

import { useFadeIn } from "@/hooks/use-fade-in";
import { GlowCard } from "@/components/shared/glow-card";
import { cn } from "@/lib/utils";

const education = {
  school: "STI College Novaliches",
  degree: "Bachelor of Science in Information Technology (BSIT)",
  honors: "Magna Cum Laude",
  period: "September 2020 - July 2024",
  gwa: "GWA: 1.38 | Cumulative GWA: 1.23",
  capstoneTitle:
    "A Web-Based Sales and Inventory Management System with Pre-Built Customization and Chatbot Integration for CJ Industrial Engineering Services",
  capstoneHighlights: [
    "Built a web-based sales and inventory platform to streamline core business operations.",
    "Integrated Tawk.to chatbot to improve customer interaction and support accessibility.",
    "Implemented PayPal billing payment API to enable digital payment workflows.",
    "Digitalized supplier-related processes and documentation to reduce manual handling.",
  ],
};

export function EducationSection() {
  const { ref, isVisible } = useFadeIn(0.1, "-50px");

  return (
    <section
      id="education"
      ref={ref}
      className={cn(
        "mb-16 transition-all duration-700 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
      style={{ transitionDelay: "50ms" }}
    >
      <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Education
      </h2>

      <GlowCard>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <h3 className="font-semibold text-foreground">{education.school}</h3>
            <span className="text-sm text-muted-foreground">{education.period}</span>
          </div>

          <p className="text-sm text-muted-foreground">{education.degree}</p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
              {education.honors}
            </span>
            <span className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">
              {education.gwa}
            </span>
          </div>

          <div className="mt-2">
            <h4 className="text-sm font-semibold text-foreground">Capstone Project</h4>
            <p className="mt-1 text-sm text-muted-foreground">{education.capstoneTitle}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {education.capstoneHighlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </GlowCard>
    </section>
  );
}