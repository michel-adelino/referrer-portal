"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReferrerDashboard } from "@/components/ReferrerDashboard";
import { useReferral } from "@/context/ReferralContext";

export default function PortalPage() {
  const router = useRouter();
  const { currentReferrer } = useReferral();

  useEffect(() => {
    if (currentReferrer === undefined) return;
    if (!currentReferrer) router.replace("/login");
  }, [currentReferrer, router]);

  if (!currentReferrer) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-card-border bg-card/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-heading text-xl font-bold text-foreground">
            Referral Hub
          </Link>
          <span className="text-sm text-muted-foreground">{currentReferrer.name}</span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <ReferrerDashboard />
      </main>
    </div>
  );
}
