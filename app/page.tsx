import type { Metadata } from "next";
import { getSortedPostsData } from "@/lib/blog";
import {
  HeroSection,
  ExperienceSection,
  EducationSection,
  ProjectsSection,
  ResumeSection,
  BlogSection,
  ContactSection,
} from "@/components/portfolio";

const siteUrl = "https://zentaichi.me";

export const metadata: Metadata = {
  title: "Ernest Endrino | Full-Stack Developer Portfolio",
  description:
    "Full-stack developer portfolio featuring web projects, engineering experience, and technical writing by Ernest Endrino.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ernest Endrino | Full-Stack Developer Portfolio",
    description:
      "Explore projects, experience, and blog posts by Ernest Endrino, a full-stack developer based in the Philippines.",
    url: siteUrl,
    type: "website",
    images: [
      {
        url: "/placeholder.png",
        width: 1200,
        height: 630,
        alt: "Ernest Endrino portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ernest Endrino | Full-Stack Developer Portfolio",
    description:
      "Explore projects, experience, and blog posts by Ernest Endrino, a full-stack developer based in the Philippines.",
    images: ["/placeholder.png"],
  },
};

export default function Home() {
  const posts = getSortedPostsData();
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ernest Endrino",
    alternateName: "Zentaichi",
    url: siteUrl,
    jobTitle: "Full-Stack Developer",
    knowsAbout: [
      "Full-stack web development",
      "Next.js",
      "React",
      "TypeScript",
      "Laravel",
      "Vue.js",
    ],
    sameAs: ["https://github.com/zentaichi"],
  };

  return (
    <main className="relative z-10 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-12 md:py-24 lg:px-24 lg:py-32">
        <HeroSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <BlogSection posts={posts} />
        <ResumeSection />
        <ContactSection />
      </div>
    </main>
  );
}
