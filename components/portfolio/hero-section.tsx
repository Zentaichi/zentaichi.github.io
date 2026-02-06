"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

const skills = [
  "Vue.js",
  "React",
  "Laravel",
  "Node.js",
  "TailwindCSS",
  "PostgreSQL",
  "MySQL",
  "Docker",
];

const socials = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "#", label: "Email" },
];

export function HeroSection() {
  return (
    <section className="mb-32">
      <div className="mb-8">
        <h1 className="mb-2 text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          <span className="text-balance">Web Developer</span>
        </h1>
        <p className="text-lg font-medium text-primary">Full-Stack Developer</p>
      </div>

      <p className="mb-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
        Full-Stack Developer with a proven track record of optimizing enterprise-level MIS environments. Specialized in Laravel and Vue.js, with a focus on resolving critical performance bottlenecks, implementing secure access protocols, and architecting real-time communication modules.
      </p>

      <p className="mb-10 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
        Proficient at transforming complex client requirements into scalable, production-ready features. Currently developing information systems for operations, management, human resources, universities, and local government with a focus on user experience and system reliability.
      </p>

      <div className="mb-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className={cn(
                "rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm text-secondary-foreground",
                "transition-all duration-300",
                "hover:border-primary/50 hover:bg-primary/10 hover:text-primary",
                "hover:shadow-[0_0_12px_oklch(0.75_0.12_185_/_0.3)]"
              )}
            >
              {skill}
            </span>
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
              "hover:text-primary hover:drop-shadow-[0_0_8px_oklch(0.75_0.12_185_/_0.6)]"
            )}
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </section>
  );
}
