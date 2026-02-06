# Portfolio

A minimalist portfolio website with subtle interactive animations and a markdown-powered blog.

## Features

- Single-page portfolio with scroll-triggered fade animations
- Interactive glow effects on cards and buttons
- Blog with markdown file support
- Dark theme with teal accent colors
- Fully responsive design

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui, Radix UI
- **Blog**: Markdown with gray-matter and remark
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/
│   ├── blog/
│   │   ├── [slug]/page.tsx    # Individual blog post
│   │   └── page.tsx           # Blog listing
│   ├── globals.css            # Global styles and theme
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── portfolio/             # Portfolio-specific components
│   ├── shared/                # Reusable components
│   └── ui/                    # shadcn/ui components
├── content/
│   └── blog/                  # Markdown blog posts
├── hooks/                     # Custom React hooks
└── lib/                       # Utilities and blog functions
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

## Resume

A Resume section is included with download and view functionality. The resume is served as a PDF from the `public` folder.

### Setting Up Your Resume

1. **Edit the HTML resume**: Update `public/resume.html` with your information
2. **Generate PDF** (recommended): 
   ```bash
   npm install puppeteer --save-dev
   node scripts/generate-resume-pdf.js
   ```
   This creates `public/resume.pdf`
3. **Or provide your own**: Simply place your PDF file at `public/resume.pdf`

The Resume section displays on the home page with quick links to blog, projects, and contact information.

## License

MIT
