import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  NotebookPen
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ordersData, type Order, type OrderStatus } from "@/data/orders";
import { barbershopDatabase } from "@/data/barbershops";

const statusLabels: Record<OrderStatus, string> = {
  upcoming: "Jadwal mendatang",
  completed: "Selesai",
  cancelled: "Dibatalkan"
};

const statusStyles: Record<OrderStatus, string> = {
  upcoming: "bg-primary/10 text-primary",
  completed: "bg-emerald-500/10 text-emerald-600",
  cancelled: "bg-destructive/10 text-destructive"
};

function findOrderById(id: string): Order | undefined {
  return ordersData.upcoming.concat(ordersData.history).find((order) => order.id === id);
}

export default async function ManageOrderPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = findOrderById(id);

  if (!order) {
    return (
      <PageShell
        background="plain"
        contentClassName="items-center justify-center text-center"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Pesanan tidak ditemukan.
          </p>
          <Link
            href="/orders"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary transition hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke daftar pesanan
          </Link>
        </div>
      </PageShell>
    );
  }

  const barbershop = barbershopDatabase.details[order.barbershopId];
  const barbershopSummary = barbershopDatabase.list.find(
    (item) => item.id === order.barbershopId
  );
  const isUpcoming = order.status === "upcoming";
  const isCompleted = order.status === "completed";

  return (
    <PageShell background="soft" contentClassName="gap-0">
      {/* Header with Back Button */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-5 py-6 lg:px-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative space-y-4">
          <Link
            href="/orders"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border/50 bg-background px-3 py-2 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke Pesanan
          </Link>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              <NotebookPen className="h-3.5 w-3.5" />
              Detail Pesanan
            </div>
            <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
              Kelola Jadwal
            </h1>
            <p className="text-sm text-muted-foreground lg:text-base">
              Atur ulang jadwal, ubah catatan, atau batalkan reservasi
            </p>
          </div>
        </div>
      </section>

      <main className="flex flex-col">
        {/* Order Info Card */}
        <section className="px-5 py-6 lg:px-8">
          <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm">
            <div className="absolute top-0 right-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-primary/5 blur-2xl transition-transform group-hover:scale-150" />
            <div className="relative space-y-5 p-5 lg:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                      {order.id.split('-')[1]}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {order.id}
                    </p>
                  </div>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-card-foreground">
                    {order.barbershopName}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted/60 px-2.5 py-1 text-xs font-medium">
                      {order.serviceName}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">Barber {order.barberName}</span>
                  </div>
                </div>
                <Badge
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold shadow-sm ${statusStyles[order.status]}`}
                >
                  {statusLabels[order.status]}
                </Badge>
              </div>

              {/* Timeline Style Info */}
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <CalendarDays className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tanggal</p>
                    <p className="mt-1 text-base font-bold text-foreground">{order.scheduledDateLabel}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Waktu</p>
                    <p className="mt-1 text-base font-bold text-foreground">{order.scheduledTimeLabel}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Lokasi</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{order.addressLabel}</p>
                  </div>
                </div>
                {order.notes ? (
                  <div className="rounded-lg border border-border/50 bg-muted/20 p-4">
                    <div className="flex items-start gap-3">
                      <NotebookPen className="h-4 w-4 text-primary" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-foreground">Catatan Pelanggan</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{order.notes}</p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {barbershop ? (
                <div className="rounded-xl border border-border/50 bg-gradient-to-br from-muted/30 to-muted/10 p-4">
                  <p className="text-sm font-bold text-card-foreground">
                    Tentang Barbershop
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{barbershop.address}</p>
                  {barbershopSummary?.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {barbershopSummary.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* Payment Summary */}
        <section className="bg-muted/30 px-5 py-6 lg:px-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight">Ringkasan Pembayaran</h3>
            <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Metode Pembayaran
                </span>
                <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {order.paymentMethod}
                </span>
              </div>
              <div className="space-y-3 pt-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Layanan</span>
                  <span className="font-semibold text-foreground">{order.price}</span>
                </div>
                {order.serviceFee ? (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Biaya layanan</span>
                    <span className="font-semibold text-foreground">{order.serviceFee}</span>
                  </div>
                ) : null}
                {order.tax ? (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Pajak & PPN</span>
                    <span className="font-semibold text-foreground">{order.tax}</span>
                  </div>
                ) : null}
                <div className="flex items-center justify-between border-t-2 border-primary/20 pt-3">
                  <span className="text-base font-bold text-foreground">Total Pembayaran</span>
                  <span className="text-xl font-bold text-primary">{order.totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Dicatat pada</span>
                <span className="font-semibold text-foreground">{order.bookedAtLabel}</span>
              </div>
              {order.statusNote ? (
                <div className="mt-3 rounded-lg bg-muted/40 p-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Catatan Status
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{order.statusNote}</p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="space-y-4 px-5 py-6 lg:px-8">
          <h3 className="text-xl font-bold tracking-tight">Aksi Cepat</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {isUpcoming ? (
              <>
                <Button className="w-full justify-center rounded-lg bg-primary font-semibold shadow-sm transition-all hover:bg-primary/90 hover:shadow sm:col-span-2 lg:col-span-1">
                  Reschedule Jadwal
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-center rounded-lg border-border/50 font-medium transition-colors hover:bg-accent"
                >
                  Ubah Catatan
                </Button>
                <Button
                  variant="destructive"
                  className="w-full justify-center rounded-lg font-semibold shadow-sm transition-all hover:shadow"
                >
                  Batalkan Reservasi
                </Button>
              </>
            ) : null}
            {isCompleted ? (
              <>
                <Link href={`/barbershop/${order.barbershopId}`} className="sm:col-span-2 lg:col-span-1">
                  <Button className="w-full justify-center rounded-lg bg-primary font-semibold shadow-sm transition-all hover:bg-primary/90 hover:shadow">
                    Booking Lagi
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-center rounded-lg border-border/50 font-medium transition-colors hover:bg-accent">
                  Beri Ulasan
                </Button>
              </>
            ) : null}
            {!isUpcoming && !isCompleted ? (
              <>
                <Link href={`/barbershop/${order.barbershopId}`} className="sm:col-span-2 lg:col-span-1">
                  <Button className="w-full justify-center rounded-lg bg-primary font-semibold shadow-sm transition-all hover:bg-primary/90 hover:shadow">
                    Booking Ulang
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-center rounded-lg border-border/50 font-medium transition-colors hover:bg-accent">
                  Hubungi Support
                </Button>
              </>
            ) : null}
          </div>
        </section>

        {/* Help Section */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 px-5 py-8 lg:px-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Butuh Bantuan?</h3>
              <p className="mt-1 text-sm text-muted-foreground">Tim support kami siap membantu</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Hubungi tim support kami untuk ubah jadwal manual atau konsultasi kebutuhan styling kamu.
              </p>
              <Button variant="outline" className="mt-4 w-full justify-center rounded-lg border-border/50 font-medium transition-colors hover:bg-accent">
                Chat CS TrimTime
              </Button>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
