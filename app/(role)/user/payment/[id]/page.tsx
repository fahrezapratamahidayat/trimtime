import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Coins,
  QrCode,
  Wallet
} from "lucide-react";

import type { SVGProps } from "react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Dummy data
const paymentData = {
  barbershop: "Cut & Chill Studio",
  service: "Skin Fade Premium + Beard Trim",
  date: "15 Jan 2024, 10:00",
  total: 105000,
  deposit: 10000
};

const paymentMethods = [
  {
    value: "qris",
    label: "QRIS",
    description: "Scan QR dari aplikasi bank/e-wallet",
    icon: QrCode
  },
  { value: "ovo", label: "OVO", description: "Saldo OVO Cash", icon: Wallet },
  { value: "gopay", label: "GoPay", description: "Saldo GoPay", icon: Wallet },
  { value: "dana", label: "DANA", description: "Saldo DANA", icon: Wallet },
  {
    value: "cash",
    label: "Tunai",
    description: "Bayar langsung saat barber datang",
    icon: Coins
  }
];

export default function PaymentPage({ params }: { params: { id: string } }) {
  return (
    <PageShell background="soft" contentClassName="gap-0">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 px-5 py-6 lg:px-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative space-y-4">
          <Link
            href={`/booking/${params.id}`}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border/50 bg-background px-3 py-2 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke Booking
          </Link>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              <Wallet className="h-3.5 w-3.5" />
              Pembayaran
            </div>
            <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
              Selesaikan Pembayaran
            </h1>
            <p className="text-sm text-muted-foreground lg:text-base">
              Pilih metode pembayaran dan konfirmasi booking kamu
            </p>
          </div>
        </div>
      </section>

      <main className="flex flex-col">
        {/* Booking Summary */}
        <section className="space-y-4 px-5 py-6 lg:px-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Ringkasan Booking</h2>
            <p className="mt-1 text-sm text-muted-foreground">Pastikan detail berikut sudah sesuai</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <BadgeCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Barbershop</p>
                    <p className="mt-0.5 text-base font-bold text-foreground">{paymentData.barbershop}</p>
                  </div>
                </div>
              </div>
              <div className="h-px bg-border/50" />
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <ScissorsSmall />
                    Layanan
                  </span>
                  <span className="text-sm font-semibold text-foreground">{paymentData.service}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarClock className="h-4 w-4 text-primary" />
                    Jadwal
                  </span>
                  <span className="text-sm font-semibold text-foreground">{paymentData.date}</span>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-primary/5 px-4 py-3 border-t-2 border-primary/20">
                <span className="text-base font-bold text-foreground">Total Pembayaran</span>
                <span className="text-xl font-bold text-primary">Rp {paymentData.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="space-y-4 bg-muted/30 px-5 py-6 lg:px-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Metode Pembayaran</h2>
            <p className="mt-1 text-sm text-muted-foreground">Pilih metode yang kamu inginkan</p>
          </div>
          <RadioGroup defaultValue="qris" className="space-y-3">
            {paymentMethods.map(({ value, label, description, icon: Icon }) => (
              <label
                key={value}
                className="group relative flex cursor-pointer items-start gap-4 overflow-hidden rounded-xl border border-border/50 bg-card p-4 transition-all hover:shadow-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:shadow-sm"
              >
                <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/5 blur-2xl transition-transform group-hover:scale-150" />
                <RadioGroupItem value={value} id={value} className="relative mt-1" />
                <div className="relative flex flex-1 items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-card-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                  </div>
                  {value === "qris" && (
                    <span className="rounded-lg bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground shadow-sm">
                      Rekomendasi
                    </span>
                  )}
                </div>
              </label>
            ))}
          </RadioGroup>
        </section>

        {/* Deposit Option */}
        <section className="space-y-4 px-5 py-6 lg:px-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Down Payment (Opsional)</h2>
            <p className="mt-1 text-sm text-muted-foreground">Amankan slot booking kamu dengan DP</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Jumlah DP</span>
                <span className="text-lg font-bold text-primary">Rp {paymentData.deposit.toLocaleString()}</span>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/20 p-4">
                <Checkbox id="deposit" className="mt-0.5" />
                <Label htmlFor="deposit" className="flex-1 cursor-pointer text-sm leading-relaxed text-muted-foreground">
                  Bayar DP sekarang untuk memastikan slot barber tetap aman dan mendapatkan prioritas layanan.
                </Label>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Button */}
        <div className="sticky bottom-0 border-t border-border/50 bg-background/95 p-5 backdrop-blur-sm lg:px-8">
          <Link href={`/status/${params.id}`}>
            <Button className="w-full justify-center gap-2 rounded-lg bg-primary px-8 py-6 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl lg:py-3">
              Bayar Sekarang
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </main>
    </PageShell>
  );
}

function ScissorsSmall() {
  return <ScissorsIcon className="h-3.5 w-3.5 text-primary" />;
}

function ScissorsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.121 14.121a3 3 0 1 0 4.243 4.243" />
      <path d="M14.121 9.879l-4.242 4.242" />
      <path d="M10.535 5.464 8.05 7.95a3 3 0 1 1-4.243-4.243" />
      <path d="m8.052 8.048 7.07 7.07" />
    </svg>
  );
}
