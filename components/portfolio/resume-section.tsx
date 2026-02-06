"use client";

import { Download, FileText } from "lucide-react";
import Link from "next/link";

export function ResumeSection() {
  return (
    <section className="mb-32 scroll-mt-24">
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
        Resume
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Resume Card */}
        <div className="group relative overflow-hidden rounded-lg border border-border bg-card/50 p-6 transition-all duration-300 hover:bg-card hover:border-primary/50">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Resume</h3>
                  <p className="text-sm text-muted-foreground">PDF Format</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Download my full resume with detailed work experience, education,
              and technical skills.
            </p>

            <div className="flex gap-2 pt-2">
              <a
                href="/resume.pdf"
                download="resume.pdf"
                className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/20 hover:shadow-[0_0_12px_oklch(0.75_0.12_185_/_0.3)]"
              >
                <Download className="h-4 w-4" />
                Download
              </a>

              <button
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/5"
              >
                <FileText className="h-4 w-4" />
                View
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="group relative overflow-hidden rounded-lg border border-border bg-card/50 p-6 transition-all duration-300 hover:bg-card hover:border-primary/50">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>

            <div className="space-y-3">
              <Link
                href="/blog"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/50" />
                View my blog posts
              </Link>

              <a
                href="#projects"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/50" />
                See featured projects
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/50" />
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
