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
  title: "Ernest Endrino | Full-Stack Developer",
  description:
    "Full-stack developer in the Philippines specializing in Laravel, Vue.js, and TypeScript. Building enterprise MIS, CLI tools, and desktop apps.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ernest Endrino | Full-Stack Developer",
    description:
      "Full-stack developer in the Philippines specializing in Laravel, Vue.js, and TypeScript. Building enterprise MIS, CLI tools, and desktop apps.",
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
    title: "Ernest Endrino | Full-Stack Developer",
    description:
      "Full-stack developer in the Philippines specializing in Laravel, Vue.js, and TypeScript. Building enterprise MIS, CLI tools, and desktop apps.",
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
    sameAs: [
      "https://github.com/zentaichi",
      "https://www.linkedin.com/in/ernest-endrino/",
    ],
  };

  const projectsJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Sleepyhead CLI",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Windows",
      description:
        "Guided TypeScript CLI for hardening MariaDB/MySQL installations with Transparent Data Encryption.",
      url: "https://github.com/Zentaichi/sleepyhead-cli",
      author: {
        "@type": "Person",
        name: "Ernest Endrino",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Horde",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Windows",
      description:
        "Electron + Vue 3 desktop app for managing multiple PHP versions and portable database servers without Docker.",
      url: "https://github.com/Zentaichi/horde",
      author: {
        "@type": "Person",
        name: "Ernest Endrino",
      },
    },
  ];

  return (
    <main className="relative z-10 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
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
