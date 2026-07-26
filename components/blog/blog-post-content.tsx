"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { ReadingProgress } from "@/components/shared/reading-progress";
import type { BlogPost } from "@/lib/blog";

interface BlogPostContentProps {
  post: BlogPost;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <main className="relative z-10 min-h-screen">
      <ReadingProgress />
      <article className="mx-auto max-w-3xl px-6 py-16 md:px-12 md:py-24">
        <Link
          href="/blog"
          className="group mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to all posts
        </Link>

        <header className="mb-12">
          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime}
            </span>
          </div>

          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {post.title}
          </h1>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_8px_var(--glow)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-16 border-t border-border pt-8">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to all posts
          </Link>
        </footer>
      </article>
    </main>
  );
}
