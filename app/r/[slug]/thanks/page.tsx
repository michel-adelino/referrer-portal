import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function ThanksPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-card-border bg-card/80">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-heading text-lg font-bold text-foreground">
            Referral Hub
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-lg px-4 py-16">
        <Card className="text-center">
          <CardContent className="py-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-muted text-2xl font-bold text-success">
              ✓
            </div>
            <h1 className="mt-6 font-heading text-2xl font-bold text-foreground">Thank you</h1>
            <p className="mt-3 text-muted-foreground">
              We’ve received your information and will be in touch soon. Your referral has been recorded.
            </p>
            <div className="mt-8">
              <Link href="/login">
                <Button variant="outline" size="md">
                  Get your own referral link
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
