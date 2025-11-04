import Link from "next/link";

import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CalendarCheck,
  MessageCircle,
  ShieldCheck,
  Sparkles
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const highlightFeatures: Array<{
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    id: "multi-role",
    title: "Multi-role platform",
    description:
      "Satu aplikasi untuk owner, barber, pelanggan, dan freelancer dengan akses yang disesuaikan.",
    icon: Sparkles
  },
  {
    id: "booking",
    title: "Booking real-time",
    description:
      "Kelola jadwal layanan, notifikasi, dan antrean pelanggan tanpa chat terpisah.",
    icon: CalendarCheck
  },
  {
    id: "komunikasi",
    title: "Komunikasi terpadu",
    description:
      "Chat langsung dengan barber atau pelanggan untuk memastikan kebutuhan layanan terpenuhi.",
    icon: MessageCircle
  },
  {
    id: "keamanan",
    title: "Keamanan data",
    description:
      "Verifikasi berlapis untuk owner, admin, dan freelancer menjaga ekosistem tetap terpercaya.",
    icon: ShieldCheck
  }
];

const onboardingFlow: Array<{
  id: string;
  label: string;
  detail: string;
}> = [
  {
    id: "owner",
    label: "Owner Barbershop",
    detail: "Daftar mandiri, unggah profil outlet, lalu tunggu verifikasi Admin TrimTime."
  },
  {
    id: "barber",
    label: "Barber Partner",
    detail: "Owner menambahkan barber ke tim. Terima undangan dan langsung mulai menerima booking."
  },
  {
    id: "pelanggan",
    label: "Pelanggan",
    detail: "Daftar dengan email atau WhatsApp dan langsung bisa booking layanan favorit."
  },
  {
    id: "freelancer",
    label: "Freelancer",
    detail: "Ajukan portofolio, pilih job yang cocok, dan aktif setelah disetujui Admin TrimTime."
  }
];

export default function IntroPage() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <span className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 left-10 h-96 w-96 rounded-full bg-secondary/25 blur-[120px]" />
      <span className="pointer-events-none absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-12 px-5 py-10 sm:gap-16 sm:py-16">
        <header className="space-y-6 text-center sm:text-left">
          <Badge className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 text-xs font-medium uppercase tracking-wide text-primary">
            TrimTime ecosystem
          </Badge>
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Satu aplikasi untuk mengelola barbershop, layanan, dan komunitasmu
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              Mulai dari pengelolaan outlet, jadwal barber, hingga pengalaman pelanggan.
              Lihat alur yang tepat untuk peranmu sebelum masuk ke dashboard TrimTime.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <Button size="lg" asChild className="gap-2">
              <Link href="/login">
                Masuk sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-border/60 bg-background/80">
              <Link href="/register">Daftar akun baru</Link>
            </Button>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          {highlightFeatures.map(({ id, icon: Icon, title, description }) => (
            <div
              key={id}
              className="group flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm transition duration-200 hover:border-primary/40 hover:bg-card hover:shadow-md"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-semibold leading-tight">{title}</h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </section>

        <section className="space-y-6 rounded-2xl border border-border/60 bg-muted/40 p-6 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Alur akses cepat</h2>
            <p className="text-sm text-muted-foreground">
              Setiap peran punya cara masuk yang berbeda. Pastikan kamu mengikuti langkah yang sesuai sebelum login.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {onboardingFlow.map(({ id, label, detail }) => (
              <div
                key={id}
                className="flex flex-col gap-2 rounded-xl border border-dashed border-border/70 bg-background/80 p-4"
              >
                <div className="text-sm font-semibold uppercase tracking-wide text-primary">
                  {label}
                </div>
                <p className="text-sm text-muted-foreground">{detail}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/70 p-4 text-sm text-muted-foreground">
            <span>Siap lanjut? Pilih peran kamu di halaman login TrimTime.</span>
            <Button size="sm" asChild className="gap-1">
              <Link href="/login">
                Buka halaman login
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
