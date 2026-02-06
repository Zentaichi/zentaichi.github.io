import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";
import { GlowCard } from "@/components/shared/glow-card";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react";

export const metadata = {
  title: "Blog | Portfolio",
  description: "Thoughts on development, design, and building for the web.",
};

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <main className="relative z-10 min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16 md:px-12 md:py-24">
        <Link
          href="/"
          className="group mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back home
        </Link>

        <header className="mb-16">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Writing
          </h1>
          <p className="text-lg text-muted-foreground">
            Thoughts on development, design, and building for the web.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Check back soon!</p>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <GlowCard key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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

                  <h2 className="mb-2 text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {post.title}
                    <ArrowUpRight className="ml-1 inline-block h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </h2>

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
        )}
      </div>
    </main>
  );
}
