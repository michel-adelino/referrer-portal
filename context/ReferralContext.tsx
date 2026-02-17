"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Lead, LeadStatus, Referrer } from "@/lib/types";
import {
  loadStore,
  saveStore,
  seedReferrers,
  seedLeads,
  getReferrerBySlug as getReferrerBySlugFromStore,
  getLeadsByReferrer as getLeadsByReferrerFromStore,
  getAllLeads as getAllLeadsFromStore,
  addLead as addLeadToStore,
  updateLeadStatus as updateLeadStatusInStore,
  getStats as getStatsFromStore,
  getRewardsEarned as getRewardsEarnedFromStore,
  type StoreData,
} from "@/lib/store";

interface ReferralContextValue {
  data: StoreData;
  currentReferrerId: string | null;
  setCurrentReferrerId: (id: string | null) => void;
  getReferrerBySlug: (slug: string) => Referrer | undefined;
  getLeadsByReferrer: (referrerId: string) => Lead[];
  getAllLeads: () => Lead[];
  addLead: (referrerId: string, lead: { name: string; phone: string; address: string; serviceType: string }) => void;
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  getStats: () => { totalReferrals: number; topReferrers: { referrerName: string; referrerId: string; count: number }[] };
  getRewardsEarned: (referrerId: string) => number;
  currentReferrer: Referrer | null;
}

const ReferralContext = createContext<ReferralContextValue | null>(null);

const initialData: StoreData = { referrers: seedReferrers, leads: seedLeads };

export function ReferralProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<StoreData>(initialData);
  const [currentReferrerId, setCurrentReferrerId] = useState<string | null>(null);

  useEffect(() => {
    setData(loadStore());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    saveStore(data);
  }, [data]);

  const addLead = useCallback((referrerId: string, lead: { name: string; phone: string; address: string; serviceType: string }) => {
    setData((prev) => addLeadToStore(prev, referrerId, lead));
  }, []);

  const updateLeadStatus = useCallback((leadId: string, status: LeadStatus) => {
    setData((prev) => updateLeadStatusInStore(prev, leadId, status));
  }, []);

  const getReferrerBySlug = useCallback((slug: string) => getReferrerBySlugFromStore(data, slug), [data]);
  const getLeadsByReferrer = useCallback((referrerId: string) => getLeadsByReferrerFromStore(data, referrerId), [data]);
  const getAllLeads = useCallback(() => getAllLeadsFromStore(data), [data]);
  const getStats = useCallback(() => getStatsFromStore(data), [data]);
  const getRewardsEarned = useCallback((referrerId: string) => getRewardsEarnedFromStore(data, referrerId), [data]);

  const currentReferrer = currentReferrerId ? data.referrers.find((r) => r.id === currentReferrerId) ?? null : null;

  const value: ReferralContextValue = {
    data,
    currentReferrerId,
    setCurrentReferrerId,
    getReferrerBySlug,
    getLeadsByReferrer,
    getAllLeads,
    addLead,
    updateLeadStatus,
    getStats,
    getRewardsEarned,
    currentReferrer,
  };

  return <ReferralContext.Provider value={value}>{children}</ReferralContext.Provider>;
}

export function useReferral() {
  const ctx = useContext(ReferralContext);
  if (!ctx) throw new Error("useReferral must be used within ReferralProvider");
  return ctx;
}
