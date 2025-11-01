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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
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
    <PageShell background="hero" contentClassName="gap-8">
      <header className="flex items-center justify-between rounded-3xl border border-border bg-card/90 px-6 py-5 shadow-sm">
        <Link
          href={`/booking/${params.id}`}
          className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-2 text-xs text-muted-foreground transition hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>
        <span className="rounded-full border border-border bg-muted px-3 py-2 text-xs text-muted-foreground">
          Pembayaran #{params.id}
        </span>
      </header>

      <main className="flex flex-col gap-6">
        <Card className="border-none bg-card text-card-foreground shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-semibold">
              Ringkasan booking
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Pastikan detail berikut sudah sesuai.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border p-4 text-sm text-muted-foreground">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                  Barbershop
                </span>
                <span className="font-semibold text-card-foreground">
                  {paymentData.barbershop}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <ScissorsSmall />
                  Layanan
                </span>
                <span>{paymentData.service}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <CalendarClock className="h-3.5 w-3.5 text-primary" />
                  Jadwal
                </span>
                <span>{paymentData.date}</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm font-semibold text-card-foreground">
                <span>Total</span>
                <span>Rp {paymentData.total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-card text-card-foreground shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-semibold">
              Metode pembayaran
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Pilih metode yang kamu inginkan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="qris" className="space-y-3">
              {paymentMethods.map(({ value, label, description, icon: Icon }) => (
                <label
                  key={value}
                  className="flex items-start gap-3 rounded-2xl border border-border p-4 text-sm text-muted-foreground transition hover:bg-muted"
                >
                  <RadioGroupItem value={value} id={value} className="mt-1" />
                  <div className="flex w-full items-center justify-between">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
                        <Icon className="h-4 w-4 text-primary" />
                        {label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {description}
                      </p>
                    </div>
                    {value === "qris" && (
                      <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold text-secondary-foreground">
                        Direkomendasikan
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="border-none bg-card text-card-foreground shadow-xl">
          <CardContent className="space-y-3 p-5 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>DP opsional</span>
              <span className="font-semibold text-card-foreground">
                Rp {paymentData.deposit.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-border p-4">
              <Checkbox id="deposit" />
              <Label
                htmlFor="deposit"
                className="flex-1 text-xs text-muted-foreground"
              >
                Bayar DP sekarang untuk memastikan slot barber tetap aman.
              </Label>
            </div>
          </CardContent>
        </Card>

        <Link href={`/status/${params.id}`}>
          <Button className="w-full justify-center gap-2 rounded-2xl bg-primary text-primary-foreground shadow-xl transition hover:bg-primary/90">
            Bayar sekarang
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
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
