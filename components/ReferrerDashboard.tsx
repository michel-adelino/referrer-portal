"use client";

import { useCallback, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { useReferral } from "@/context/ReferralContext";
import type { LeadStatus } from "@/lib/types";

export function ReferrerDashboard() {
  const { currentReferrer, getLeadsByReferrer, getRewardsEarned } = useReferral();
  const [copied, setCopied] = useState(false);

  if (!currentReferrer) return null;

  const referralUrl = typeof window !== "undefined" ? `${window.location.origin}/r/${currentReferrer.slug}` : "";
  const leads = getLeadsByReferrer(currentReferrer.id);
  const rewardsEarned = getRewardsEarned(currentReferrer.id);

  const copyLink = useCallback(() => {
    if (!referralUrl) return;
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [referralUrl]);

  const smsLink = referralUrl
    ? `sms:?body=${encodeURIComponent(`Check out this referral link: ${referralUrl}`)}`
    : "#";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Your referral dashboard</h1>
          <p className="mt-1 text-muted-foreground">Share your link and track referrals.</p>
        </div>
        <Link href="/">
          <Button variant="outline" size="sm">Back to home</Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>Your referral link</CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                readOnly
                value={referralUrl}
                className="flex-1 rounded border border-card-border bg-background px-3 py-2 text-sm text-foreground"
              />
              <Button onClick={copyLink} size="md">
                {copied ? "Copied!" : "Copy link"}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href={smsLink}>
                <Button variant="outline" size="sm">Share via SMS</Button>
              </a>
              <Button variant="ghost" size="sm" onClick={copyLink}>
                Copy link again
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>QR code</CardHeader>
          <CardContent className="flex flex-col items-center">
            <QRCodeSVG value={referralUrl} size={180} level="M" className="rounded border border-card-border p-2 bg-white" />
            <p className="mt-3 text-sm text-muted-foreground">Scan to open your referral page</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>Rewards earned</CardHeader>
          <CardContent>
            <p className="font-heading text-3xl font-bold text-success">{rewardsEarned}</p>
            <p className="text-sm text-muted-foreground">Paid referrals (reward eligible)</p>
            <p className="mt-2 text-xs text-muted-foreground">Self-referrals are not eligible for rewards.</p>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>Referrals</CardHeader>
          <CardContent>
            {leads.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">No referrals yet. Share your link to get started.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.serviceType}</TableCell>
                      <TableCell>
                        <Badge status={lead.status as LeadStatus} />
                        {lead.status === "Paid" && (
                          <span className="ml-2 text-xs text-success">Reward eligible</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
