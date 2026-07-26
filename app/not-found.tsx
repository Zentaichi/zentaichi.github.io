import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 — Page Not Found",
}

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <p className="mb-2 font-mono text-sm text-primary">404</p>
        <h1 className="mb-4 text-3xl font-bold text-foreground">
          Page Not Found
        </h1>
        <p className="mb-8 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-primary/50 bg-primary/10 px-6 py-3 text-sm font-medium text-primary transition-all duration-300 hover:border-primary hover:bg-primary/20"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}
