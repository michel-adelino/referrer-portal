"use client";

import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { AdminLeadsTable } from "@/components/AdminLeadsTable";
import { useReferral } from "@/context/ReferralContext";

export default function AdminPage() {
  const { getStats } = useReferral();
  const stats = getStats();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-card-border bg-card/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-heading text-xl font-bold text-foreground">
            Referral Hub
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-bold text-foreground">Admin dashboard</h1>
          <p className="mt-1 text-muted-foreground">View leads, update status, and trigger reward eligibility.</p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>Total referrals</CardHeader>
            <CardContent>
              <p className="font-heading text-3xl font-bold text-foreground">{stats.totalReferrals}</p>
            </CardContent>
          </Card>
          <Card className="sm:col-span-2 lg:col-span-1">
            <CardHeader>Top referrers</CardHeader>
            <CardContent>
              {stats.topReferrers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No data yet.</p>
              ) : (
                <ul className="space-y-2">
                  {stats.topReferrers.slice(0, 5).map((r) => (
                    <li key={r.referrerId} className="flex justify-between text-sm">
                      <span className="text-foreground">{r.referrerName}</span>
                      <span className="font-medium text-accent">{r.count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mb-4">
          <CardContent className="pt-6">
            <p className="mb-4 text-xs text-muted-foreground">
              Reward rules (demo): Reward eligible when status = Completed then Paid. One reward per household per 12 months (simulated). Self-referrals not eligible.
            </p>
            <AdminLeadsTable />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
