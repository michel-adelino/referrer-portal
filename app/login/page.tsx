"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useReferral } from "@/context/ReferralContext";

const DEMO_CODE = "123456";

export default function LoginPage() {
  const router = useRouter();
  const { data, setCurrentReferrerId } = useReferral();
  const [step, setStep] = useState<"input" | "code">("input");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!phoneOrEmail.trim()) {
      setError("Enter your phone or email.");
      return;
    }
    setStep("code");
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (code.trim() !== DEMO_CODE) {
      setError("Invalid code. Use 123456 for this demo.");
      return;
    }
    const referrer = data.referrers[0];
    if (referrer) {
      setCurrentReferrerId(referrer.id);
      router.push("/portal");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-card-border bg-card/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-heading text-xl font-bold text-foreground">
            Referral Hub
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Back
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-lg border border-card-border bg-card p-8 shadow-md">
          <h1 className="font-heading text-2xl font-bold text-foreground">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We’ll send you a one-time code. For this demo, use any phone/email and code <strong>123456</strong>.
          </p>

          {step === "input" ? (
            <form onSubmit={handleSendCode} className="mt-8 space-y-6">
              <Input
                label="Phone or email"
                type="text"
                placeholder="+1 555 123 4567 or you@example.com"
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                autoFocus
              />
              {error && <p className="text-sm text-warning">{error}</p>}
              <Button type="submit" fullWidth size="lg">
                Send code
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="mt-8 space-y-6">
              <p className="text-sm text-muted-foreground">
                Code sent to <strong className="text-foreground">{phoneOrEmail || "your device"}</strong>. Enter it below.
              </p>
              <Input
                label="Verification code"
                type="text"
                placeholder="123456"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                autoFocus
              />
              {error && <p className="text-sm text-warning">{error}</p>}
              <Button type="submit" fullWidth size="lg">
                Verify and continue
              </Button>
              <button
                type="button"
                onClick={() => setStep("input")}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground"
              >
                Use a different phone or email
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
