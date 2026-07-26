# Portfolio

Personal portfolio website with blog, interactive CLI mockup, and a CMD+K command palette — built with Next.js, deployed to Cloudflare Pages.

## Features

- Single-page portfolio with scroll-triggered fade animations
- Light/dark theme with system preference detection and manual toggle
- Interactive glow effects on cards and buttons
- Custom cursor with hover states (respects `prefers-reduced-motion`)
- CMD+K command palette for keyboard-driven navigation
- Terminal/CLI mockup easter egg with typewriter effect
- Reading progress bar on blog posts
- Blog with markdown file support
- Fully responsive, skip-to-content link, focus-visible styles

## Tech Stack

- **Framework**: Next.js 16 (App Router, static export)
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui, Radix UI, cmdk
- **Theme**: next-themes (class strategy, dark default)
- **Blog**: Markdown with gray-matter and remark
- **Icons**: Lucide React
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Deployment**: Cloudflare Pages
- **Analytics**: Umami (prod-only via hostname detection) + Vercel Analytics

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/
│   ├── blog/
│   │   ├── [slug]/page.tsx     # Individual blog post (SSG + metadata)
│   │   └── page.tsx            # Blog listing
│   ├── globals.css             # Theme tokens, animations, prose, utilities
│   ├── layout.tsx              # Root layout (ThemeProvider, palette, terminal)
│   ├── not-found.tsx           # Custom 404 for Cloudflare Pages
│   └── page.tsx                # Home page (single-page portfolio)
├── components/
│   ├── blog/                   # Blog-specific (blog-post-content wrapper)
│   ├── portfolio/              # Portfolio sections (hero, experience, projects, etc.)
│   ├── shared/                 # Reusable (cursor, glow-card, terminal, palette, etc.)
│   └── ui/                     # shadcn/ui components
├── content/
│   └── blog/                   # Markdown blog posts
├── hooks/                      # Custom React hooks (useFadeIn)
├── lib/                        # Utilities (cn, blog functions)
├── public/
│   ├── _headers                # Cloudflare Pages cache rules
│   ├── resume.html             # Resume template
│   └── resume.pdf              # Generated PDF resume
└── scripts/                    # Build scripts (resume PDF generation)
```

## Adding Blog Posts

Create a markdown file in `content/blog/` with frontmatter:

```md
---
title: "Post Title"
date: "2025-01-30"
excerpt: "A brief description of the post."
tags: ["Tag1", "Tag2"]
published: true
---

Your content here...
```

## Deployment

This site deploys to Cloudflare Pages:

- **Build command:** `pnpm build`
- **Output directory:** `out`
- **Environment:** Cloudflare Pages auto-deploys on push to `master`
- **Custom domain:** `zentaichi.me`

Caching is configured via `public/_headers` with immutable cache for hashed assets and short-lived cache for HTML.

## License

MIT
