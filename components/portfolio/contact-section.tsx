"use client";

import { useFadeIn } from "@/hooks/use-fade-in";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export function ContactSection() {
  const { ref, isVisible } = useFadeIn(0.1, "-50px");

  return (
    <section
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      )}
      style={{ transitionDelay: "200ms" }}
    >
      <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Contact
      </h2>

      <div className="max-w-lg">
        <p className="mb-6 text-pretty text-lg leading-relaxed text-muted-foreground">
          {"I'm"} always interested in hearing about new opportunities, interesting
          projects, or just connecting with fellow developers.
        </p>

        <a
          href="mailto:ernest.endrino@gmail.com"
          className={cn(
            "group inline-flex items-center gap-2 rounded-lg border border-primary/50 bg-primary/10 px-6 py-3 font-medium text-primary",
            "transition-all duration-300",
            "hover:border-primary hover:bg-primary/20",
            "hover:shadow-[0_0_20px_oklch(0.75_0.12_185_/_0.3)]"
          )}
        >
          Get in Touch
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <footer className="mt-24 border-t border-border pt-8">
        <p className="text-sm text-muted-foreground">
          Made with love by{" "}
          <a
            href="https://github.com/zentaichi"
            className="transition-colors duration-300 hover:text-primary"
          >
            Zentaichi
          </a>
        </p>
      </footer>
    </section>
  );
}
