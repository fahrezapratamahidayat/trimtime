"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Coins,
  CreditCard,
  MessageCircle,
  Minus,
  PackageCheck,
  Phone,
  Plus,
  QrCode,
  ShieldCheck,
  Truck,
  Wallet
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";

import type { BarberProduct } from "@/data/barber-products";

const shippingOptions = [
  {
    id: "instant",
    label: "Instant Courier",
    description: "Kurir khusus barber, tiba dalam 2 jam",
    eta: "Estimasi 1-2 jam",
    price: 18000
  },
  {
    id: "same-day",
    label: "Same Day",
    description: "Pengiriman di hari yang sama untuk Jabodetabek",
    eta: "Estimasi 3-6 jam",
    price: 12000
  },
  {
    id: "regular",
    label: "Reguler",
    description: "Lebih hemat untuk luar kota",
    eta: "Estimasi 2-4 hari",
    price: 9000
  }
] as const;

type PaymentOption = {
  id: string;
  label: string;
  helper: string;
  icon: LucideIcon;
  extraFee?: number;
  badge?: string;
  details?: string[];
};

const paymentOptions: PaymentOption[] = [
  {
    id: "qris",
    label: "QRIS TrimTime",
    helper: "Scan sekali untuk semua bank & e-wallet",
    icon: QrCode,
    badge: "Rekomendasi",
    details: ["Konfirmasi instan", "Limit hingga Rp10 juta"]
  },
  {
    id: "ewallet",
    label: "E-Wallet",
    helper: "OVO, GoPay, Dana, ShopeePay",
    icon: Wallet,
    extraFee: 1000,
    details: ["Saldo terpotong otomatis", "Biaya platform ringan"]
  },
  {
    id: "virtual-account",
    label: "Virtual Account",
    helper: "Transfer via BCA, BNI, Mandiri, BRI",
    icon: CreditCard,
    details: ["Ada bukti transfer", "Proses verifikasi ≤10 menit"]
  },
  {
    id: "cash",
    label: "Bayar di Tempat",
    helper: "Bayar tunai ke kurir saat produk diterima",
    icon: Coins,
    details: ["Cocok jika tanpa e-wallet", "Siapkan uang pas ya"]
  }
];

const priceFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

type ProductOrderFormProps = {
  product: BarberProduct;
};

export function ProductOrderForm({ product }: ProductOrderFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [shipping, setShipping] = useState<
    (typeof shippingOptions)[number]["id"]
  >(shippingOptions[0].id);
  const [payment, setPayment] = useState<
    (typeof paymentOptions)[number]["id"]
  >(paymentOptions[0].id);

  const selectedShipping = useMemo(
    () => shippingOptions.find((option) => option.id === shipping),
    [shipping]
  );

  const selectedPayment = useMemo(
    () => paymentOptions.find((option) => option.id === payment),
    [payment]
  );

  const subtotal = useMemo(
    () => product.price * quantity,
    [product.price, quantity]
  );
  const shippingFee = selectedShipping?.price ?? 0;
  const paymentFee = selectedPayment?.extraFee ?? 0;
  const total = subtotal + shippingFee + paymentFee;

  return (
    <form className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-6">
        <Card className="gap-0 border-border/60">
          <CardHeader className="border-b border-border/50">
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="text-xl font-semibold">
                  Detail Pemesanan
                </CardTitle>
                <CardDescription>
                  Atur kuantitas produk dan catatan khusus untuk barber.
                </CardDescription>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <PackageCheck className="h-3.5 w-3.5" />
                {product.weight}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 py-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-foreground">
                Jumlah Produk
              </Label>
              <div className="inline-flex items-center gap-3 rounded-lg border border-border/50 bg-muted/40 px-3 py-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  className="rounded-md"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center text-sm font-semibold">
                  {quantity}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  className="rounded-md"
                  onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Maksimal 10 item per transaksi. Hubungi barber untuk jumlah besar.
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground">
                Catatan untuk barber (opsional)
              </Label>
              <Textarea
                placeholder="Contoh: tolong bungkus rapi, kirim setelah jam 15.00, dsb."
                rows={3}
                className="rounded-lg border-border/50 bg-background"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="gap-0 border-border/60">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="text-xl font-semibold">
              Pengiriman
            </CardTitle>
            <CardDescription>
              Pilih metode pengiriman yang sesuai kebutuhanmu.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 py-6">
            <RadioGroup
              value={shipping}
              onValueChange={(value) =>
                setShipping(
                  value as (typeof shippingOptions)[number]["id"]
                )
              }
              className="space-y-3"
            >
              {shippingOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition ${
                    shipping === option.id
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border/50 bg-muted/20 hover:bg-muted/30"
                  }`}
                >
                  <RadioGroupItem
                    value={option.id}
                    className="mt-1"
                    aria-label={option.label}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {option.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {option.description}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                      <span className="inline-flex items-center gap-1 rounded-full bg-background px-2 py-1 font-semibold text-primary shadow-sm">
                        <Truck className="h-3 w-3" />
                        {option.eta}
                      </span>
                      <span className="text-muted-foreground">
                        {priceFormatter.format(option.price)}
                      </span>
                    </div>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="gap-0 border-border/60">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="text-xl font-semibold">
              Informasi Kontak
            </CardTitle>
            <CardDescription>
              Pastikan detail kontak benar agar barber mudah menghubungi.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 py-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="buyer-name">Nama penerima</Label>
                <Input
                  id="buyer-name"
                  placeholder="Nama lengkap"
                  className="rounded-lg border-border/50 bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyer-phone">Nomor WhatsApp</Label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="buyer-phone"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    className="rounded-lg border-border/50 bg-background pl-10"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="buyer-address">Alamat pengiriman</Label>
              <Textarea
                id="buyer-address"
                placeholder="Tulis alamat lengkap beserta patokan, contoh: Jl. Sudirman No. 12, Blok A, Jakarta Selatan."
                rows={3}
                className="rounded-lg border-border/50 bg-background"
                required
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <aside className="space-y-6">
        <Card className="gap-0 border-border/60">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="text-xl font-semibold">
              Metode Pembayaran
            </CardTitle>
            <CardDescription>
              Pilih metode pembayaran favoritmu.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 py-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-foreground">
                Metode pembayaran
              </Label>
              <RadioGroup
                value={payment}
                onValueChange={(value) =>
                  setPayment(value as (typeof paymentOptions)[number]["id"])
                }
                className="space-y-3"
              >
                {paymentOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`group relative flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition ${
                      payment === option.id
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border/50 bg-muted/20 hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <option.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {option.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {option.helper}
                          </p>
                        </div>
                        {option.badge ? (
                          <span className="whitespace-nowrap rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground shadow-sm">
                            {option.badge}
                          </span>
                        ) : null}
                      </div>
                      {option.details?.length ? (
                        <div className="flex flex-wrap gap-1.5">
                          {option.details.map((detail) => (
                            <span
                              key={detail}
                              className="inline-flex items-center rounded-full bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                            >
                              {detail}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <RadioGroupItem
                      value={option.id}
                      className="mt-1 h-4 w-4 border-border/60 text-primary focus-visible:ring-primary"
                      aria-label={option.label}
                    />
                  </label>
                ))}
              </RadioGroup>
            </div>
            <div className="rounded-xl border border-border/50 bg-muted/30 p-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Wallet className="h-4 w-4 text-primary" />
                Keamanan pembayaran TrimTime
              </div>
              <p className="mt-2 leading-relaxed">
                Pembayaran diproses melalui mitra resmi. Barber menerima notifikasi otomatis setelah transaksi berhasil.
              </p>
              <p className="mt-2 font-semibold text-primary">
                {selectedPayment?.extraFee
                  ? `Biaya platform: ${priceFormatter.format(
                      selectedPayment.extraFee
                    )}`
                  : "Tanpa biaya tambahan"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="gap-0 border-border/60">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="text-xl font-semibold">
              Ringkasan Pembayaran
            </CardTitle>
            <CardDescription>
              Cek kembali detail sebelum melanjutkan pembayaran.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 py-6 text-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Harga produk</span>
                <span className="font-semibold">
                  {priceFormatter.format(product.price)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Jumlah</span>
                <span className="font-semibold">x{quantity}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{priceFormatter.format(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Pengiriman</span>
                <span>{priceFormatter.format(shippingFee)}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Biaya platform</span>
                <span>{priceFormatter.format(paymentFee)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-3 text-base font-semibold text-foreground">
              <span>Total pembayaran</span>
              <span>{priceFormatter.format(total)}</span>
            </div>
            <div className="space-y-2 rounded-lg border border-primary/30 bg-primary/5 p-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <ShieldCheck className="h-4 w-4" />
                Garansi belanja aman
              </div>
              <p>
                Dana kamu aman dan baru diteruskan ke barber setelah pesanan dikonfirmasi diterima.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 border-t border-border/50 py-4">
            <Button size="lg" className="w-full rounded-lg text-sm font-semibold">
              Selesaikan Pembayaran
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              asChild
              className="w-full rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              <Link href={`/user/chat/${product.id}`}>
                <MessageCircle className="h-4 w-4" />
                Tanya barber sebelum checkout
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </aside>
    </form>
  );
}
