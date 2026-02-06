import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AnimatedBackground } from '@/components/shared/animated-background'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Zentaichi Portfolio',
  description: 'The portfolio of Ernest Endrino, full stack developer',
  generator: 'v0.app',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <AnimatedBackground />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
