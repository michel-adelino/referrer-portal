export type LeadStatus = "New" | "Booked" | "Completed" | "Paid";

export interface Referrer {
  id: string;
  name: string;
  email: string;
  phone: string;
  slug: string;
}

export interface Lead {
  id: string;
  referrerId: string;
  name: string;
  phone: string;
  address: string;
  serviceType: string;
  status: LeadStatus;
  createdAt: string; // ISO
}

export interface Stats {
  totalReferrals: number;
  topReferrers: { referrerName: string; referrerId: string; count: number }[];
}

export const LEAD_STATUSES: LeadStatus[] = ["New", "Booked", "Completed", "Paid"];

export const SERVICE_TYPES = [
  "HVAC Repair",
  "HVAC Installation",
  "AC Maintenance",
  "Heating",
  "Exterior Painting",
  "Siding",
  "Roofing",
  "Other",
] as const;
