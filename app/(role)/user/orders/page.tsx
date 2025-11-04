import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Scissors
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ordersData, type OrderStatus } from "@/data/orders";

const statusLabels: Record<OrderStatus, string> = {
  upcoming: "Menunggu layanan",
  completed: "Selesai",
  cancelled: "Dibatalkan"
};

const statusStyles: Record<OrderStatus, string> = {
  upcoming: "bg-primary/10 text-primary",
  completed: "bg-emerald-500/10 text-emerald-600",
  cancelled: "bg-destructive/10 text-destructive"
};

function OrderCard({
  order,
  ctaLabel,
  ctaHref
}: {
  order: (typeof ordersData.upcoming)[number];
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all hover:shadow-md">
      <div className="absolute top-0 right-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-primary/5 blur-2xl transition-transform group-hover:scale-150" />
      <div className="relative space-y-4 p-5">
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
            <h3 className="mt-2 text-lg font-bold tracking-tight text-card-foreground">
              {order.barbershopName}
            </h3>
          </div>
          <Badge className={`rounded-lg px-3 py-1.5 text-xs font-bold shadow-sm ${statusStyles[order.status]}`}>
            {statusLabels[order.status]}
          </Badge>
        </div>

        <div className="grid gap-3 rounded-xl border border-border/50 bg-muted/20 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <CalendarDays className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-muted-foreground">Tanggal</p>
              <p className="text-sm font-semibold text-foreground">{order.scheduledDateLabel}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-muted-foreground">Waktu</p>
              <p className="text-sm font-semibold text-foreground">{order.scheduledTimeLabel}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-muted-foreground">Lokasi</p>
              <p className="text-sm font-semibold text-foreground">{order.addressLabel}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Scissors className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-muted-foreground">Layanan</p>
              <p className="text-sm font-semibold text-foreground">{order.serviceName}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
            <span className="text-xs font-medium text-muted-foreground">Barber</span>
            <span className="text-sm font-bold text-foreground">{order.barberName}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
            <span className="text-xs font-medium text-muted-foreground">Total Tarif</span>
            <span className="text-sm font-bold text-primary">{order.price}</span>
          </div>
          {order.notes ? (
            <div className="rounded-lg border border-border/50 bg-muted/20 p-3">
              <p className="text-xs font-semibold text-foreground">Catatan:</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{order.notes}</p>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-2 border-t border-border/50 pt-4">
          <Link href={`/barbershop/${order.barbershopId}`} className="flex-1">
            <Button variant="outline" className="w-full rounded-lg border-border/50 font-medium transition-colors hover:bg-accent">
              Lihat Barbershop
            </Button>
          </Link>
          <Link href={ctaHref} className="flex-1">
            <Button className="w-full gap-2 rounded-lg bg-primary font-semibold shadow-sm transition-all hover:bg-primary/90 hover:shadow">
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <PageShell background="soft" contentClassName="gap-0">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <CalendarDays className="h-3.5 w-3.5" />
            Manajemen Pesanan
          </div>
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
            Pesanan Kamu
          </h1>
          <p className="text-sm text-muted-foreground lg:text-base">
            Atur jadwal cukur dan lihat riwayat kunjungan sebelumnya
          </p>
        </div>
      </section>

      <main className="flex flex-col">
        {/* Upcoming Orders */}
        <section className="space-y-5 px-5 py-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight lg:text-2xl">
                Jadwal Mendatang
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {ordersData.upcoming.length} reservasi aktif
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-bold text-primary">{ordersData.upcoming.length}</span>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {ordersData.upcoming.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                ctaLabel="Kelola jadwal"
                ctaHref={`/orders/${order.id}`}
              />
            ))}
          </div>
        </section>

        {/* History Orders */}
        <section className="space-y-5 bg-muted/30 px-5 py-8 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight lg:text-2xl">
                Riwayat Layanan
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {ordersData.history.length} pesanan sebelumnya
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5">
              <Scissors className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-600">{ordersData.history.length}</span>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {ordersData.history.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                ctaLabel={
                  order.status === "completed"
                    ? "Booking lagi"
                    : "Detail pesanan"
                }
                ctaHref={
                  order.status === "completed"
                    ? `/barbershop/${order.barbershopId}`
                    : `/orders/${order.id}`
                }
              />
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
