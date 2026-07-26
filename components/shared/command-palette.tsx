"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import {
  ArrowUpRight,
  Briefcase,
  Copy,
  FileText,
  FolderGit2,
  Github,
  GraduationCap,
  Home,
  Linkedin,
  Mail,
  Moon,
  Search,
  Sun,
} from "lucide-react";

interface BlogPostRef {
  title: string;
  slug: string;
}

interface CommandPaletteProps {
  posts: BlogPostRef[];
}

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Education", href: "#education", icon: GraduationCap },
  { label: "Projects", href: "#projects", icon: FolderGit2 },
  { label: "Blog", href: "/blog", icon: FileText },
  { label: "Contact", href: "#contact", icon: Mail },
] as const;

const PROJECTS = [
  { label: "Horde", href: "https://github.com/Zentaichi/horde" },
  { label: "Sleepyhead CLI", href: "https://github.com/Zentaichi/sleepyhead-cli" },
  { label: "Swiss Army Tools", href: "https://github.com/zentaichi/swiss-army-tools" },
  { label: "React Tic-Tac-Toe", href: "https://github.com/Zentaichi/tic-tac-toe" },
] as const;

export function CommandPalette({ posts }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
    >
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg rounded-lg border border-border bg-card shadow-2xl">
        <div className="flex items-center border-b border-border px-4">
          <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
          <Command.Input
            placeholder="Type a command or search..."
            className="flex h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>

        <Command.List className="max-h-80 overflow-y-auto p-2 scroll-py-2">
          <Command.Empty className="px-4 py-12 text-center text-sm text-muted-foreground">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation" className="text-xs font-semibold text-muted-foreground px-2 mb-1 pt-2">
            {NAV_ITEMS.map((item) => (
              <Command.Item
                key={item.label}
                value={item.label}
                onSelect={() => {
                  if (item.href.startsWith("/")) {
                    if (item.href.startsWith("/#") || item.href === "/") {
                      const id = item.href.replace("/#", "");
                      if (id === "/") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                      }
                    } else {
                      router.push(item.href);
                    }
                  }
                  setOpen(false);
                }}
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Projects" className="text-xs font-semibold text-muted-foreground px-2 mb-1 pt-2">
            {PROJECTS.map((project) => (
              <Command.Item
                key={project.label}
                value={project.label}
                onSelect={() => {
                  window.open(project.href, "_blank");
                  setOpen(false);
                }}
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary"
              >
                <ArrowUpRight className="h-4 w-4" />
                {project.label}
              </Command.Item>
            ))}
          </Command.Group>

          {posts.length > 0 && (
            <Command.Group heading="Blog Posts" className="text-xs font-semibold text-muted-foreground px-2 mb-1 pt-2">
              {posts.map((post) => (
                <Command.Item
                  key={post.slug}
                  value={`blog ${post.title}`}
                  keywords={["blog", "post", "article"]}
                  onSelect={() => {
                    router.push(`/blog/${post.slug}/`);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary"
                >
                  <FileText className="h-4 w-4 shrink-0" />
                  <span className="truncate">{post.title}</span>
                </Command.Item>
              ))}
            </Command.Group>
          )}

          <Command.Group heading="Social" className="text-xs font-semibold text-muted-foreground px-2 mb-1 pt-2">
            <Command.Item
              value="github"
              onSelect={() => {
                window.open("https://github.com/zentaichi", "_blank");
                setOpen(false);
              }}
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Command.Item>
            <Command.Item
              value="linkedin"
              onSelect={() => {
                window.open("https://www.linkedin.com/in/ernest-endrino/", "_blank");
                setOpen(false);
              }}
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Command.Item>
            <Command.Item
              value="email"
              onSelect={() => {
                window.location.href = "mailto:ernest.endrino@gmail.com";
                setOpen(false);
              }}
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              <Mail className="h-4 w-4" />
              Email
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Actions" className="text-xs font-semibold text-muted-foreground px-2 mb-1 pt-2">
            <Command.Item
              value="toggle theme"
              keywords={["dark", "light", "mode"]}
              onSelect={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                setOpen(false);
              }}
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              Toggle Theme
            </Command.Item>
            <Command.Item
              value="copy email"
              keywords={["copy", "email", "clipboard"]}
              onSelect={() => {
                navigator.clipboard.writeText("ernest.endrino@gmail.com");
                setOpen(false);
              }}
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              <Copy className="h-4 w-4" />
              Copy Email
            </Command.Item>
          </Command.Group>
        </Command.List>

        <div className="flex items-center justify-end gap-2 border-t border-border px-4 py-2">
          <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground">
            ESC
          </kbd>
          <span className="text-xs text-muted-foreground">to close</span>
        </div>
      </div>
    </Command.Dialog>
  );
}
