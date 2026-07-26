import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostData, getAllPostSlugs } from "@/lib/blog";
import { BlogPostContent } from "@/components/blog/blog-post-content";

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <BlogPostContent post={post} />
    </>
  );
}
