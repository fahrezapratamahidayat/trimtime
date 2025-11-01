import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { LoginOptions } from "@/components/login/login-options";

export default function LoginPage() {
  return (
    <PageShell
      background="plain"
      containerClassName="pb-20 sm:pb-16"
      contentClassName="gap-10"
    >
      <header className="flex items-center justify-between gap-4 rounded-3xl border border-border bg-card/90 px-6 py-5 shadow-sm">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            TrimTime
          </span>
          <h1 className="text-xl font-semibold text-foreground">
            Masuk untuk lanjut booking
          </h1>
        </div>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-accent hover:text-foreground"
        >
          Daftar
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </header>

      <main className="flex flex-1 flex-col gap-6">
        <section className="space-y-4 rounded-3xl border border-border bg-card/95 p-6 shadow-md">
          <p className="text-sm text-muted-foreground">
            Pilih salah satu metode di bawah ini untuk masuk ke akun TrimTime
            kamu.
          </p>

          <LoginOptions />
        </section>

        <section className="rounded-3xl border border-dashed border-border bg-muted/50 p-4 text-center text-xs text-muted-foreground">
          Dengan masuk, kamu menyetujui Ketentuan Layanan dan Kebijakan Privasi
          TrimTime.
        </section>

        <div className="mt-auto space-y-3 rounded-3xl border border-border bg-muted/60 p-5 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">
            Keuntungan masuk:
          </p>
          <ul className="list-inside list-disc space-y-1">
            <li>Booking lebih cepat dengan preferensi tersimpan.</li>
            <li>Lacak riwayat layanan dan loyalty points kamu.</li>
            <li>
              Dapatkan notifikasi promo eksklusif dari barber favorit.
            </li>
          </ul>
        </div>
      </main>
    </PageShell>
  );
}
