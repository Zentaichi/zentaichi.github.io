"use client";

import Link from "next/link";
import { useFadeIn } from "@/hooks/use-fade-in";
import { GlowCard } from "@/components/shared/glow-card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogSectionProps {
  posts: BlogPostMeta[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  const { ref, isVisible } = useFadeIn(0.1, "-50px");

  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      ref={ref}
      className={cn(
        "mb-32 transition-all duration-700 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
      style={{ transitionDelay: "150ms" }}
    >
      <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Writing
      </h2>

      <div className="flex flex-col gap-6">
        {posts.slice(0, 3).map((post) => (
          <GlowCard key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readingTime}
                </span>
              </div>

              <h3 className="mb-2 font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                {post.title}
                <ArrowUpRight className="ml-1 inline-block h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </h3>

              <p className="mb-4 text-pretty text-muted-foreground">
                {post.excerpt}
              </p>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "rounded-full border border-border bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground",
                        "transition-all duration-300",
                        "group-hover:border-primary/30 group-hover:text-primary/80"
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </GlowCard>
        ))}
      </div>

      <Link
        href="/blog"
        className="group mt-8 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors duration-300 hover:text-primary"
      >
        View All Posts
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </section>
  );
}
