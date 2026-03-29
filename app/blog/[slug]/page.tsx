import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostData, getAllPostSlugs } from "@/lib/blog";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

const siteUrl = "https://zentaichi.me";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = `${siteUrl}/blog/${slug}/`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: canonicalUrl,
      publishedTime: post.date,
      modifiedTime: post.updatedAt ?? post.date,
      tags: post.tags,
      images: [
        {
          url: post.image ?? "/placeholder.png",
          width: 1200,
          height: 630,
          alt: `${post.title} preview image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image ?? "/placeholder.png"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  const blogPostJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    mainEntityOfPage: `${siteUrl}/blog/${slug}/`,
    url: `${siteUrl}/blog/${slug}/`,
    image: [post.image ?? `${siteUrl}/placeholder.png`],
    author: {
      "@type": "Person",
      name: "Ernest Endrino",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Ernest Endrino",
      url: siteUrl,
    },
    keywords: post.tags,
  };

  return (
    <main className="relative z-10 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
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
