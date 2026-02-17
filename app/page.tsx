import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-card-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-heading text-xl font-bold text-foreground">
            Referral Hub
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Admin
            </Link>
            <Link href="/login">
              <Button variant="primary" size="sm">
                Get your link
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent-muted/30 via-transparent to-transparent" />
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Share. Refer. <span className="text-accent">Earn.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Get your personalized referral link, track every referral, and earn rewards when jobs are completed. Built for home services.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/login">
                <Button variant="primary" size="lg">
                  Get your referral link
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="outline" size="lg">
                  Admin dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-card-border bg-card/50 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              How it works
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              <div className="rounded-lg border border-card-border bg-card p-6 shadow">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-lg font-bold text-white">1</div>
                <h3 className="mt-4 font-heading font-semibold text-foreground">Get your link</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Sign in with phone or email and receive a unique referral link and QR code.
                </p>
              </div>
              <div className="rounded-lg border border-card-border bg-card p-6 shadow">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-lg font-bold text-white">2</div>
                <h3 className="mt-4 font-heading font-semibold text-foreground">Share with friends</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Send your link via SMS or copy it. When someone books a service, we track it to you.
                </p>
              </div>
              <div className="rounded-lg border border-card-border bg-card p-6 shadow">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-lg font-bold text-white">3</div>
                <h3 className="mt-4 font-heading font-semibold text-foreground">Earn rewards</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  When a referred job is completed and paid, you become eligible for your reward.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-card-border px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
            Referral Hub — Demo. Frontend only; no backend.
          </div>
        </footer>
      </main>
    </div>
  );
}
