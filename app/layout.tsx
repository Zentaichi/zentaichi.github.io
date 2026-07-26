import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AnimatedBackground } from '@/components/shared/animated-background'
import { CommandPalette } from '@/components/shared/command-palette'
import { CustomCursor } from '@/components/shared/custom-cursor'
import { TerminalMockup } from '@/components/shared/terminal-mockup'
import { ThemeToggle } from '@/components/shared/theme-toggle'
import { UmamiAnalytics } from '@/components/shared/umami-analytics'
import { ThemeProvider } from '@/components/theme-provider'
import { getSortedPostsData } from '@/lib/blog'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const siteUrl = 'https://zentaichi.me'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ernest Endrino | Full-Stack Developer',
    template: '%s | Ernest Endrino',
  },
  description: 'Full-stack developer in the Philippines specializing in Laravel, Vue.js, and TypeScript. Building enterprise MIS, CLI tools, and desktop apps.',
  alternates: {
    canonical: '/',
  },
  keywords: ['Ernest Endrino', 'Zentaichi', 'full-stack developer', 'web developer portfolio', 'Next.js developer', 'Philippines developer'],
  authors: [{ name: 'Ernest Endrino' }],
  creator: 'Ernest Endrino',
  publisher: 'Ernest Endrino',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Ernest Endrino Portfolio',
    title: 'Ernest Endrino | Full-Stack Developer',
    description: 'Full-stack developer in the Philippines specializing in Laravel, Vue.js, and TypeScript. Building enterprise MIS, CLI tools, and desktop apps.',
    images: [
      {
        url: '/placeholder.png',
        width: 1200,
        height: 630,
        alt: 'Ernest Endrino portfolio preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ernest Endrino | Full-Stack Developer',
    description: 'Full-stack developer in the Philippines specializing in Laravel, Vue.js, and TypeScript. Building enterprise MIS, CLI tools, and desktop apps.',
    images: ['/placeholder.png'],
  },
  icons: {
    icon: [
      {
        url: '/placeholder.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/placeholder.ico',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/placeholder.ico',
        type: 'image/svg+xml',
      },
    ],
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Ernest Endrino Portfolio',
  url: siteUrl,
  inLanguage: 'en',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const posts = getSortedPostsData().map((p) => ({ title: p.title, slug: p.slug }));

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CustomCursor />
          <AnimatedBackground />
          <div id="main-content">{children}</div>
          <TerminalMockup />
          <ThemeToggle />
          <CommandPalette posts={posts} />
        </ThemeProvider>
        <Analytics />
        <UmamiAnalytics />
      </body>
    </html>
  )
}
