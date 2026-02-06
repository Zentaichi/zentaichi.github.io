import { getSortedPostsData } from "@/lib/blog";
import {
  HeroSection,
  ExperienceSection,
  ProjectsSection,
  ResumeSection,
  BlogSection,
  ContactSection,
} from "@/components/portfolio";

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <main className="relative z-10 min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-12 md:py-24 lg:px-24 lg:py-32">
        <HeroSection />
        <ResumeSection />
        <ExperienceSection />
        <ProjectsSection />
        <BlogSection posts={posts} />
        <ContactSection />
      </div>
    </main>
  );
}
