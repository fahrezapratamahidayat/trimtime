import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Gift,
  Heart,
  Sparkles,
  Star
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Dummy data
const ratingData = {
  barbershop: "Cut & Chill Studio",
  barber: "Raka Pratama",
  service: "Skin Fade Premium + Beard Trim"
};

const loyaltyPerks = [
  { icon: Sparkles, title: "5 poin", description: "Diskon 10% booking berikutnya" },
  { icon: Heart, title: "10 poin", description: "Gratis biaya booking" },
  { icon: Gift, title: "Referral", description: "Cashback Rp5.000 per teman" }
];

export default function RatingPage({ params }: { params: { id: string } }) {
  return (
    <PageShell background="hero" contentClassName="gap-8">
      <header className="flex items-center justify-between rounded-3xl border border-border bg-card/90 px-6 py-5 shadow-sm">
        <Link
          href={`/status/${params.id}`}
          className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-2 text-xs text-muted-foreground transition hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>
        <span className="rounded-full border border-border bg-muted px-3 py-2 text-xs text-muted-foreground">
          Rating #{params.id}
        </span>
      </header>

      <main className="flex flex-col gap-6">
        <Card className="border-none bg-card text-card-foreground shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-semibold">
              Bagikan pengalamanmu
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Nilai barber agar rekomendasi semakin akurat.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 text-sm text-muted-foreground">
            <section className="rounded-2xl border border-border p-4">
              <p className="text-sm font-semibold text-card-foreground">
                {ratingData.barbershop}
              </p>
              <p className="text-xs text-muted-foreground">
                {ratingData.barber} • {ratingData.service}
              </p>
            </section>

            <section className="space-y-2">
              <Label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <Star className="h-4 w-4 text-primary" />
                Beri rating
              </Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card text-muted-foreground shadow-sm transition hover:bg-accent"
                  >
                    <Star className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-2">
              <Label
                htmlFor="review"
                className="text-xs font-semibold text-muted-foreground"
              >
                Ceritakan pengalamanmu (opsional)
              </Label>
              <Textarea
                id="review"
                placeholder="Pelayanan cepat, barber ramah, hasil sesuai ekspektasi..."
                className="rounded-xl border-border"
                rows={4}
              />
            </section>

            <section className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground">
                Tambahkan foto hasil (opsional)
              </Label>
              <Button
                variant="outline"
                className="w-full justify-center gap-2 rounded-2xl border-border text-muted-foreground transition hover:bg-accent"
              >
                <Camera className="h-4 w-4" />
                Upload foto
              </Button>
              <p className="text-xs text-muted-foreground">
                Max 3 foto, ukuran maksimal 5 MB.
              </p>
            </section>

            <section className="rounded-2xl border border-secondary bg-secondary/30 p-4 text-xs text-secondary-foreground">
              <p className="font-semibold">
                🎉 Kamu mendapatkan 1 loyalty point!
              </p>
              <p className="mt-1 text-secondary-foreground/80">
                Gunakan poin untuk diskon dan promo eksklusif.
              </p>
            </section>
          </CardContent>
        </Card>

        <Card className="border-none bg-card text-card-foreground shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-semibold">
              Loyalty & promo
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Semakin sering review, makin banyak benefit.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {loyaltyPerks.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-2xl border border-border p-4 text-xs text-muted-foreground"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-muted text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">
                    {title}
                  </p>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Link href="/homepage">
          <Button className="w-full justify-center gap-2 rounded-2xl bg-primary text-primary-foreground shadow-xl transition hover:bg-primary/90">
            Kirim review & kembali ke home
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </main>
    </PageShell>
  );
}
