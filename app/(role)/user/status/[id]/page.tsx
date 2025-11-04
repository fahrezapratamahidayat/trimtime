import Link from "next/link";
import {
  AlarmClock,
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  TimerReset
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type StatusKey = "waiting" | "confirmed" | "in_progress" | "completed" | "canceled";

// Dummy data
const bookingStatus: {
  id: string;
  status: StatusKey;
  barbershop: string;
  service: string;
  date: string;
  barber: string;
  location: string;
} = {
  id: "BK001",
  status: "confirmed",
  barbershop: "Cut & Chill Studio",
  service: "Skin Fade Premium + Beard Trim",
  date: "15 Jan 2024, 10:00",
  barber: "Raka Pratama",
  location: "Jl. Sudirman No. 1, Jakarta"
};

const statusSteps = [
    {
        key: "waiting",
        title: "Booking dibuat",
        description: "Kami sudah menerima pesananmu.",
        icon: Clock3
    },
    {
        key: "confirmed",
        title: "Dikonfirmasi",
        description: "Barber menyetujui jadwal kamu.",
        icon: CheckCircle2
    },
    {
        key: "in_progress",
        title: "Dalam proses",
        description: "Barber sedang menuju lokasi.",
        icon: TimerReset
    },
    {
        key: "completed",
        title: "Selesai",
        description: "Saatnya tampil fresh!",
        icon: ShieldCheck
    }
] as const;

const statusMeta: Record<StatusKey, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  waiting: { label: "Menunggu Konfirmasi", variant: "secondary" },
  confirmed: { label: "Dikonfirmasi", variant: "default" },
  in_progress: { label: "Dalam Proses", variant: "outline" },
  completed: { label: "Selesai", variant: "default" },
  canceled: { label: "Dibatalkan", variant: "destructive" }
};

const reminders = [
    { label: "Reminder H-1", time: "14 Jan 2024, 09:00" },
    { label: "Reminder 30 menit", time: "15 Jan 2024, 09:30" },
];

export default function StatusPage({ params }: { params: { id: string } }) {
    const meta = statusMeta[bookingStatus.status];
    const currentIndex = statusSteps.findIndex(
        (step) => step.key === bookingStatus.status
    );

    return (
        <PageShell background="soft" contentClassName="gap-0">
            {/* Hero Header */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 px-5 py-6 lg:px-8">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div className="relative space-y-4">
                    <Link href="/homepage" className="inline-flex w-fit items-center gap-2 rounded-lg border border-border/50 bg-background px-3 py-2 text-xs font-medium shadow-sm transition-colors hover:bg-accent">
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Kembali ke Home
                    </Link>
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Status Booking
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Booking #{params.id}</h1>
                            <p className="text-sm text-muted-foreground lg:text-base">Pantau progres layanan kamu secara realtime</p>
                        </div>
                        <Badge className="rounded-lg px-3 py-1.5 text-xs font-bold shadow-sm" variant={meta.variant}>{meta.label}</Badge>
                    </div>
                </div>
            </section>

            <main className="flex flex-col">
                {/* Booking Details */}
                <section className="space-y-4 px-5 py-6 lg:px-8">
                    <h2 className="text-xl font-bold tracking-tight">Detail Booking</h2>
                    <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm">
                        <div className="grid gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <ShieldCheck className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Barbershop</p>
                                    <p className="mt-0.5 text-base font-bold text-foreground">{bookingStatus.barbershop}</p>
                                </div>
                            </div>
                            <div className="h-px bg-border/50" />
                            <div className="grid gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                        <CalendarClock className="h-4 w-4 text-primary" />
                                        Jadwal
                                    </span>
                                    <span className="text-sm font-semibold text-foreground">{bookingStatus.date}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4 text-primary" />
                                        Lokasi
                                    </span>
                                    <span className="text-sm font-semibold text-foreground">{bookingStatus.location}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                        Barber
                                    </span>
                                    <span className="text-sm font-semibold text-foreground">{bookingStatus.barber}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Timeline */}
                <section className="space-y-4 bg-muted/30 px-5 py-6 lg:px-8">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">Timeline Layanan</h2>
                        <p className="mt-1 text-sm text-muted-foreground">Step berikutnya akan otomatis diperbarui</p>
                    </div>
                    <div className="space-y-3">
                        {statusSteps.map((step, index) => {
                            const Icon = step.icon;
                            const isDone = index <= currentIndex;
                            return (
                                <div key={step.key} className={`flex items-start gap-4 rounded-xl border p-4 transition-all ${isDone ? "border-primary/30 bg-primary/5 shadow-sm" : "border-border/50 bg-card"}`}>
                                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${isDone ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground"}`}>
                                        <Icon className="h-6 w-6" />
                                    </span>
                                    <div className="flex-1 pt-1">
                                        <p className="text-sm font-bold text-card-foreground">{step.title}</p>
                                        <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {bookingStatus.status !== "completed" ? (
                    <section className="space-y-4 px-5 py-6 lg:px-8">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Notifikasi Otomatis</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Kami akan kirim pengingat sebelum jadwalmu</p>
                        </div>
                        <div className="space-y-3">
                            {reminders.map((reminder) => (
                                <div key={reminder.label} className="flex items-center justify-between rounded-lg border border-border/50 bg-card p-4">
                                    <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                                        <AlarmClock className="h-4 w-4 text-primary" />
                                        {reminder.label}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{reminder.time}</span>
                                </div>
                            ))}
                            <Button variant='outline' className='w-full justify-center gap-2 rounded-lg border-border/50 font-medium hover:bg-accent'>
                                Batalkan Booking
                            </Button>
                        </div>
                    </section>
                ) : (
                    <div className="sticky bottom-0 border-t border-border/50 bg-background/95 p-5 backdrop-blur-sm lg:px-8">
                        <Link href={`/rating/${params.id}`}>
                            <Button className='w-full justify-center gap-2 rounded-lg bg-primary px-8 py-6 text-base font-semibold shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl lg:py-3'>
                                Beri Rating & Review
                                <ArrowRight className='h-5 w-5' />
                            </Button>
                        </Link>
                    </div>
                )}
            </main>
        </PageShell>
    );
}
