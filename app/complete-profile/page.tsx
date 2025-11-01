import Link from "next/link";
import {
  ArrowRight,
  LocateFixed,
  MapPin,
  Scissors,
  User
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const preferenceOptions = [
  { value: "short", label: "Pendek" },
  { value: "medium", label: "Sedang" },
  { value: "long", label: "Panjang" }
];

export default function CompleteProfilePage() {
  return (
    <PageShell background="hero" contentClassName="gap-8">
      <header className="flex flex-col gap-2">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <User className="h-4 w-4" />
          Hai, selangkah lagi!
        </span>
        <h1 className="text-2xl font-semibold leading-snug text-foreground">
          Lengkapi profil agar rekomendasi selalu pas dengan gaya kamu.
        </h1>
      </header>

      <main className="flex flex-1 flex-col gap-6">
        <Card className="border-none bg-card text-card-foreground shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-semibold">
              Detail utama kamu
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Data ini digunakan untuk mempersonalisasi booking dan promo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"
              >
                <Scissors className="h-4 w-4 text-primary" />
                Nama Lengkap
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="rounded-xl border-border"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="location"
                className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"
              >
                <MapPin className="h-4 w-4 text-primary" />
                Lokasi (GPS)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  placeholder="Jakarta Selatan"
                  className="rounded-xl border-border"
                />
                <Button
                  variant="outline"
                  className="shrink-0 rounded-xl border-border bg-muted text-xs text-muted-foreground transition hover:bg-accent"
                >
                  <LocateFixed className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Kami hanya menggunakan lokasi untuk rekomendasi barbershop
                terdekat.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <Scissors className="h-4 w-4 text-primary" />
                Preferensi Rambut
              </Label>
              <Select>
                <SelectTrigger className="rounded-xl border-border">
                  <SelectValue placeholder="Pilih preferensi" />
                </SelectTrigger>
                <SelectContent className="min-w-48">
                  {preferenceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <section className="rounded-3xl border border-border bg-muted/60 p-5 text-muted-foreground backdrop-blur">
          <p className="text-xs uppercase tracking-wide text-secondary-foreground">
            Apa selanjutnya?
          </p>
          <div className="mt-4 space-y-3 text-sm">
            <p className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <MapPin className="h-3.5 w-3.5" />
              </span>
              Temukan barbershop terdekat lengkap dengan rating dan harga
              real-time.
            </p>
            <p className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <Scissors className="h-3.5 w-3.5" />
              </span>
              Booking instan untuk haircut di tempat atau home service.
            </p>
          </div>
        </section>

        <Link href="/homepage" className="mt-auto">
          <Button className="w-full justify-center gap-2 rounded-2xl bg-primary text-primary-foreground shadow-lg transition hover:bg-primary/90">
            Simpan dan lanjut
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </main>
    </PageShell>
  );
}
