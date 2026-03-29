import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AnimatedBackground } from '@/components/shared/animated-background'
import { CustomCursor } from '@/components/shared/custom-cursor'
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
  description: 'Portfolio of Ernest Endrino, a full-stack developer building modern web applications and sharing engineering insights.',
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
    description: 'Portfolio of Ernest Endrino, a full-stack developer building modern web applications and sharing engineering insights.',
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
    description: 'Portfolio of Ernest Endrino, a full-stack developer building modern web applications and sharing engineering insights.',
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
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="744bdfc7-0f49-4ef3-9032-27fd57ab37ab"></script>
      </head>
      <body className={`font-sans antialiased`}>
        <CustomCursor />
        <AnimatedBackground />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
