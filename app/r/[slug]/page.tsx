import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";

export default function ReferralPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-card-border bg-card/80">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-heading text-lg font-bold text-foreground">
            Referral Hub
          </Link>
        </div>
      </header>
      <main className="px-4 py-12 sm:py-16">
        <LeadForm referrerSlug={params.slug} />
      </main>
    </div>
  );
}
