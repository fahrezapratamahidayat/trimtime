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
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="border-none bg-card text-card-foreground shadow-xl">
      <CardContent className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              {order.id}
            </p>
            <h3 className="mt-1 text-base font-semibold text-card-foreground">
              {order.barbershopName}
            </h3>
          </div>
          <Badge className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.status]}`}>
            {statusLabels[order.status]}
          </Badge>
        </div>

        <div className="space-y-3 rounded-2xl bg-muted/40 p-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-4 w-4 text-primary" />
            <span>{order.scheduledDateLabel}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-primary" />
            <span>{order.scheduledTimeLabel}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{order.addressLabel}</span>
          </div>
          <div className="flex items-center gap-3">
            <Scissors className="h-4 w-4 text-primary" />
            <span className="text-card-foreground">{order.serviceName}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            Barber: <span className="text-card-foreground">{order.barberName}</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            Tarif: <span className="text-card-foreground">{order.price}</span>
          </span>
          {order.notes ? (
            <span className="inline-flex flex-1 items-center gap-2 rounded-2xl bg-muted px-3 py-2 text-left text-xs text-muted-foreground">
              <span className="font-medium text-card-foreground">Catatan:</span>
              {order.notes}
            </span>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link href={`/barbershop/${order.barbershopId}`} className="text-xs font-semibold text-primary underline-offset-4 hover:underline">
            Lihat barbershop
          </Link>
          <Link href={ctaHref}>
            <Button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90">
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function OrdersPage() {
  return (
    <PageShell background="hero" contentClassName="gap-8">
      <header className="rounded-3xl border border-border bg-card/90 px-6 py-5 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-foreground">
            Pesanan kamu
          </h1>
          <p className="text-sm text-muted-foreground">
            Atur jadwal cukur kamu dan lihat riwayat kunjungan sebelumnya.
          </p>
        </div>
      </header>

      <main className="flex flex-col gap-6">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Jadwal mendatang
            </h2>
            <span className="text-xs text-muted-foreground">
              {ordersData.upcoming.length} reservasi
            </span>
          </div>
          <div className="space-y-4">
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

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Riwayat layanan
            </h2>
            <span className="text-xs text-muted-foreground">
              {ordersData.history.length} riwayat
            </span>
          </div>
          <div className="space-y-4">
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
