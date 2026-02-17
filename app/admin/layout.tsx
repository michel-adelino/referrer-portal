"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [{ href: "/admin", label: "Dashboard" }];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      <div
        aria-hidden
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-200 lg:hidden"
        style={{
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
        }}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Sidebar: fixed drawer on mobile, static column on desktop; full viewport height */}
      <aside
        className={`
          z-50 flex w-64 shrink-0 flex-col border-r border-card-border bg-card
          transition-transform duration-200 ease-out
          fixed inset-y-0 left-0 h-screen min-h-screen
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:left-auto lg:top-auto lg:min-h-screen lg:translate-x-0
        `}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-card-border px-4">
          <Link
            href="/admin"
            className="font-heading text-lg font-bold text-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            Referral Hub
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            className="rounded-lg p-2 text-muted-foreground hover:bg-black/5 hover:text-foreground lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Admin
          </p>
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
                    }`}
                  >
                    <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="shrink-0 border-t border-card-border px-3 py-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground"
          >
            <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-card-border bg-background/95 px-4 backdrop-blur sm:gap-4 sm:px-6">
          <button
            type="button"
            aria-label="Open menu"
            className="rounded-lg p-2 text-muted-foreground hover:bg-black/5 hover:text-foreground lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="font-heading text-base font-semibold text-foreground sm:text-lg">Dashboard</h1>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
