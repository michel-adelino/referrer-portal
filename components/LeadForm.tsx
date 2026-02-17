"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { useReferral } from "@/context/ReferralContext";
import { SERVICE_TYPES } from "@/lib/types";

interface LeadFormProps {
  referrerSlug: string;
}

export function LeadForm({ referrerSlug }: LeadFormProps) {
  const router = useRouter();
  const { getReferrerBySlug, addLead } = useReferral();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [serviceType, setServiceType] = useState<string>(SERVICE_TYPES[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const referrer = getReferrerBySlug(referrerSlug);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referrer) return;
    const err: Record<string, string> = {};
    if (!name.trim()) err.name = "Name is required.";
    if (!phone.trim()) err.phone = "Phone is required.";
    if (!address.trim()) err.address = "Address is required.";
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setSubmitting(true);
    addLead(referrer.id, { name: name.trim(), phone: phone.trim(), address: address.trim(), serviceType });
    router.push(`/r/${referrerSlug}/thanks`);
  };

  if (!referrer) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Referral link not found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        Referred by <span className="text-accent">{referrer.name}</span>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-sm text-muted-foreground">
          Submit your details and we’ll get in touch. Your referral will be tracked to {referrer.name}.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            error={errors.name}
          />
          <Input
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 555 123 4567"
            error={errors.phone}
          />
          <Input
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St, City, State"
            error={errors.address}
          />
          <Select
            label="Service type"
            options={SERVICE_TYPES.map((s) => ({ value: s, label: s }))}
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          />
          <Button type="submit" fullWidth size="lg" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
