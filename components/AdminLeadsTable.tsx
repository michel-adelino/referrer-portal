"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { useReferral } from "@/context/ReferralContext";
import { LEAD_STATUSES, type Lead, type LeadStatus } from "@/lib/types";

export function AdminLeadsTable() {
  const { data, getAllLeads, updateLeadStatus } = useReferral();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const leads = useMemo(() => getAllLeads(), [getAllLeads]);
  const filtered = useMemo(() => {
    if (statusFilter === "all") return leads;
    return leads.filter((l) => l.status === statusFilter);
  }, [leads, statusFilter]);

  const referrerName = (referrerId: string) => data.referrers.find((r) => r.id === referrerId)?.name ?? "—";

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    updateLeadStatus(leadId, newStatus);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-heading text-lg font-semibold text-foreground">All leads</h2>
        <Select
          options={[{ value: "all", label: "All statuses" }, ...LEAD_STATUSES.map((s) => ({ value: s, label: s }))]}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-44"
        />
      </div>
      <div className="overflow-hidden rounded-lg border border-card-border bg-card/50">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">No leads match the filter.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Referrer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-muted-foreground">IP (demo)</TableHead>
                <TableHead className="text-muted-foreground">Duplicate (demo)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell className="max-w-[180px] truncate">{lead.address}</TableCell>
                  <TableCell>{lead.serviceType}</TableCell>
                  <TableCell>{referrerName(lead.referrerId)}</TableCell>
                  <TableCell>
                    <Badge status={lead.status} />
                    {lead.status === "Paid" && (
                      <span className="ml-1.5 text-xs text-success">Reward eligible</span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">Logged</TableCell>
                  <TableCell className="text-xs text-muted-foreground">OK</TableCell>
                  <TableCell className="text-right">
                    <StatusActions lead={lead} onStatusChange={handleStatusChange} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

function StatusActions({ lead, onStatusChange }: { lead: Lead; onStatusChange: (id: string, status: LeadStatus) => void }) {
  const nextSteps: LeadStatus[] = lead.status === "New" ? ["Booked"] : lead.status === "Booked" ? ["Completed"] : lead.status === "Completed" ? ["Paid"] : [];
  return (
    <div className="flex flex-wrap justify-end gap-1">
      {nextSteps.map((status) => (
        <Button key={status} variant="ghost" size="sm" onClick={() => onStatusChange(lead.id, status)}>
          {status === "Paid" ? "Mark as Paid" : `→ ${status}`}
        </Button>
      ))}
      {lead.status === "Paid" && <span className="text-xs text-muted-foreground">—</span>}
    </div>
  );
}
