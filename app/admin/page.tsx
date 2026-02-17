"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { AdminLeadsTable } from "@/components/AdminLeadsTable";
import { useReferral } from "@/context/ReferralContext";

export default function AdminPage() {
  const { getStats } = useReferral();
  const stats = getStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Overview of referrals and leads.</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-card-border bg-card shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-muted text-accent">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total referrals</p>
                <p className="font-heading text-2xl font-bold text-foreground">{stats.totalReferrals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-card-border bg-card shadow xl:col-span-3">
          <CardHeader className="pb-2 text-base">Top referrers</CardHeader>
          <CardContent>
            {stats.topReferrers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No data yet.</p>
            ) : (
              <ul className="space-y-3">
                {stats.topReferrers.slice(0, 5).map((r, i) => (
                  <li key={r.referrerId} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-foreground">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-muted text-xs font-semibold text-accent">
                        {i + 1}
                      </span>
                      {r.referrerName}
                    </span>
                    <span className="font-heading font-semibold text-accent">{r.count}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Leads section */}
      <Card className="border-card-border bg-card shadow">
        <CardContent className="pt-6">
          <p className="mb-6 text-xs text-muted-foreground">
            Reward rules (demo): Reward eligible when status = Completed then Paid. One reward per household per 12 months (simulated). Self-referrals not eligible. Fraud: IP logged; duplicate check — see table columns.
          </p>
          <AdminLeadsTable />
        </CardContent>
      </Card>
    </div>
  );
}
