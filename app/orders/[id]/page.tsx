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
import { Card, CardContent } from "@/components/ui/card";
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
    <PageShell background="hero" contentClassName="gap-8">
      <header className="space-y-4">
        <Link
          href="/orders"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted px-3 py-2 text-xs text-muted-foreground transition hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>
        <div className="rounded-3xl border border-border bg-card/95 px-6 py-5 shadow-sm">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-foreground">
              Kelola jadwal
            </h1>
            <p className="text-sm text-muted-foreground">
              Atur ulang jadwal, ubah catatan, atau batalkan reservasi kamu.
            </p>
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-6">
        <section className="space-y-4">
          <Card className="border-none bg-card text-card-foreground shadow-xl">
            <CardContent className="space-y-4 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground">
                    {order.id}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-card-foreground">
                    {order.barbershopName}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {order.serviceName} • Barber {order.barberName}
                  </p>
                </div>
                <Badge
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.status]}`}
                >
                  {statusLabels[order.status]}
                </Badge>
              </div>

              <div className="grid gap-3 rounded-2xl bg-muted/40 p-3 text-sm text-muted-foreground">
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
                {order.notes ? (
                  <div className="flex items-start gap-3">
                    <NotebookPen className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{order.notes}</span>
                  </div>
                ) : null}
              </div>

              {barbershop ? (
                <div className="rounded-2xl border border-border bg-background/80 p-3 text-xs text-muted-foreground">
                  <p className="text-sm font-semibold text-card-foreground">
                    Tentang barbershop
                  </p>
                  <p className="mt-1">{barbershop.address}</p>
                  {barbershopSummary?.tags?.length ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {barbershopSummary.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <Card className="border-none bg-card text-card-foreground shadow-xl">
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-card-foreground">
                  Ringkasan pembayaran
                </h3>
                <span className="text-xs text-muted-foreground">
                  Metode: {order.paymentMethod}
                </span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Layanan</span>
                  <span className="text-card-foreground">{order.price}</span>
                </div>
                {order.serviceFee ? (
                  <div className="flex items-center justify-between">
                    <span>Biaya layanan</span>
                    <span className="text-card-foreground">
                      {order.serviceFee}
                    </span>
                  </div>
                ) : null}
                {order.tax ? (
                  <div className="flex items-center justify-between">
                    <span>Pajak & PPN</span>
                    <span className="text-card-foreground">{order.tax}</span>
                  </div>
                ) : null}
                <div className="flex items-center justify-between border-t border-dashed border-border pt-2 text-sm font-semibold text-card-foreground">
                  <span>Total</span>
                  <span>{order.totalPrice}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-card text-card-foreground shadow-md">
            <CardContent className="space-y-3 p-4 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Dicatat pada</span>
                <span className="text-card-foreground">
                  {order.bookedAtLabel}
                </span>
              </div>
              {order.statusNote ? (
                <div className="rounded-2xl bg-muted/60 p-3 text-xs text-muted-foreground">
                  <p className="font-semibold text-card-foreground">
                    Catatan status
                  </p>
                  <p className="mt-1 leading-relaxed">{order.statusNote}</p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            Aksi cepat
          </h2>
          <div className="space-y-3">
            {isUpcoming ? (
              <>
                <Button className="w-full justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90">
                  Reschedule jadwal
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-center rounded-2xl text-sm font-semibold"
                >
                  Ubah catatan pelanggan
                </Button>
                <Button
                  variant="destructive"
                  className="w-full justify-center rounded-2xl text-sm font-semibold"
                >
                  Batalkan reservasi
                </Button>
              </>
            ) : null}
            {isCompleted ? (
              <>
                <Link href={`/barbershop/${order.barbershopId}`}>
                  <Button className="w-full justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90">
                    Booking lagi
                  </Button>
                </Link>
                <Button variant="secondary" className="w-full justify-center rounded-2xl text-sm font-semibold">
                  Beri ulasan
                </Button>
              </>
            ) : null}
            {!isUpcoming && !isCompleted ? (
              <>
                <Link href={`/barbershop/${order.barbershopId}`}>
                  <Button className="w-full justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90">
                    Booking ulang
                  </Button>
                </Link>
                <Button variant="secondary" className="w-full justify-center rounded-2xl text-sm font-semibold">
                  Hubungi support
                </Button>
              </>
            ) : null}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Butuh bantuan?</h2>
          <Card className="border-none bg-card text-card-foreground shadow-lg">
            <CardContent className="space-y-3 p-4 text-sm text-muted-foreground">
              <p>Hubungi tim support kami untuk ubah jadwal manual atau konsultasi kebutuhan styling.</p>
              <Button variant="outline" className="w-full justify-center rounded-2xl">
                Chat CS TrimTime
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </PageShell>
  );
}
