import type { Referrer, Lead, LeadStatus } from "./types";

const STORAGE_KEY = "referral-hub-demo";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const seedReferrers: Referrer[] = [
  { id: "ref-1", name: "Jane Doe", email: "jane@example.com", phone: "+15551234567", slug: "jane-doe" },
  { id: "ref-2", name: "Mike Smith", email: "mike@example.com", phone: "+15559876543", slug: "mike-smith" },
  { id: "ref-3", name: "Sarah Lee", email: "sarah@example.com", phone: "+15555551234", slug: "sarah-lee" },
];

export const seedLeads: Lead[] = [
  { id: "lead-1", referrerId: "ref-1", name: "Alice Brown", phone: "+15551112222", address: "123 Main St", serviceType: "HVAC Repair", status: "New", createdAt: "2025-02-01T10:00:00Z" },
  { id: "lead-2", referrerId: "ref-1", name: "Bob Green", phone: "+15553334444", address: "456 Oak Ave", serviceType: "AC Maintenance", status: "Booked", createdAt: "2025-02-05T14:00:00Z" },
  { id: "lead-3", referrerId: "ref-1", name: "Carol White", phone: "+15555556666", address: "789 Pine Rd", serviceType: "Heating", status: "Completed", createdAt: "2025-02-08T09:00:00Z" },
  { id: "lead-4", referrerId: "ref-1", name: "Dave Black", phone: "+15557778888", address: "321 Elm St", serviceType: "HVAC Installation", status: "Paid", createdAt: "2025-01-15T11:00:00Z" },
  { id: "lead-5", referrerId: "ref-2", name: "Eve Gray", phone: "+15559990000", address: "654 Cedar Ln", serviceType: "Exterior Painting", status: "New", createdAt: "2025-02-10T16:00:00Z" },
  { id: "lead-6", referrerId: "ref-2", name: "Frank Hill", phone: "+15552223333", address: "987 Birch Blvd", serviceType: "Roofing", status: "Booked", createdAt: "2025-02-12T08:00:00Z" },
  { id: "lead-7", referrerId: "ref-3", name: "Grace King", phone: "+15554445555", address: "147 Maple Dr", serviceType: "Siding", status: "Paid", createdAt: "2025-01-20T13:00:00Z" },
];

export interface StoreData {
  referrers: Referrer[];
  leads: Lead[];
}

export function loadStore(): StoreData {
  if (typeof window === "undefined") {
    return { referrers: seedReferrers, leads: seedLeads };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoreData;
      if (Array.isArray(parsed.referrers) && Array.isArray(parsed.leads)) return parsed;
    }
  } catch {
    // ignore
  }
  return { referrers: seedReferrers, leads: seedLeads };
}

export function saveStore(data: StoreData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function getReferrerBySlug(data: StoreData, slug: string): Referrer | undefined {
  return data.referrers.find((r) => r.slug === slug);
}

export function getLeadsByReferrer(data: StoreData, referrerId: string): Lead[] {
  return data.leads.filter((l) => l.referrerId === referrerId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getAllLeads(data: StoreData): Lead[] {
  return [...data.leads].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addLead(data: StoreData, referrerId: string, lead: Omit<Lead, "id" | "referrerId" | "status" | "createdAt">): StoreData {
  const newLead: Lead = {
    id: generateId(),
    referrerId,
    ...lead,
    status: "New",
    createdAt: new Date().toISOString(),
  };
  return { ...data, leads: [newLead, ...data.leads] };
}

export function updateLeadStatus(data: StoreData, leadId: string, status: LeadStatus): StoreData {
  return {
    ...data,
    leads: data.leads.map((l) => (l.id === leadId ? { ...l, status } : l)),
  };
}

export function getStats(data: StoreData): { totalReferrals: number; topReferrers: { referrerName: string; referrerId: string; count: number }[] } {
  const totalReferrals = data.leads.length;
  const byReferrer = new Map<string, number>();
  for (const lead of data.leads) {
    byReferrer.set(lead.referrerId, (byReferrer.get(lead.referrerId) ?? 0) + 1);
  }
  const topReferrers = Array.from(byReferrer.entries())
    .map(([referrerId, count]) => ({
      referrerId,
      referrerName: data.referrers.find((r) => r.id === referrerId)?.name ?? "Unknown",
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  return { totalReferrals, topReferrers };
}

export function getRewardsEarned(data: StoreData, referrerId: string): number {
  return data.leads.filter((l) => l.referrerId === referrerId && l.status === "Paid").length;
}
