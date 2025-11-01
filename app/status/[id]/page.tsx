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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
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
        <PageShell background="hero" contentClassName="gap-8">
            <header className="flex items-center justify-between rounded-3xl border border-border bg-card/90 px-6 py-5 shadow-sm">
                <Link
                    href="/homepage"
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-2 text-xs text-muted-foreground transition hover:bg-accent"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Home
                </Link>
                <span className="rounded-full border border-border bg-muted px-3 py-2 text-xs text-muted-foreground">
                    #{params.id}
                </span>
            </header>

            <main className="flex flex-col gap-6">
                <Card className="border-none bg-card text-card-foreground shadow-xl">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold">
                                Status booking
                            </CardTitle>
                            <Badge variant={meta.variant}>{meta.label}</Badge>
                        </div>
                        <CardDescription className="text-sm text-muted-foreground">
                            Kami bantu pantau progres haircut kamu.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-muted-foreground">
                        <div className="rounded-2xl border border-border p-4">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span className="inline-flex items-center gap-2">
                                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                                    Barbershop
                                </span>
                                <span className="font-semibold text-card-foreground">
                                    {bookingStatus.barbershop}
                                </span>
                            </div>
                            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                                <span className="inline-flex items-center gap-2">
                                    <CalendarClock className="h-3.5 w-3.5 text-primary" />
                                    Jadwal
                                </span>
                                <span>{bookingStatus.date}</span>
                            </div>
                            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                                <span className="inline-flex items-center gap-2">
                                    <MapPin className="h-3.5 w-3.5 text-primary" />
                                    Lokasi
                                </span>
                                <span>{bookingStatus.location}</span>
                            </div>
                            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                                <span className="inline-flex items-center gap-2">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                                    Barber
                                </span>
                                <span>{bookingStatus.barber}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none bg-card text-card-foreground shadow-xl">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-lg font-semibold">
                            Timeline layanan
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                            Step berikutnya akan otomatis diperbarui.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {statusSteps.map((step, index) => {
                            const Icon = step.icon;
                            const isDone = index <= currentIndex;
                            return (
                                <div
                                    key={step.key}
                                    className={`flex items-start gap-3 rounded-2xl border p-4 ${
                                        isDone
                                            ? "border-primary/30 bg-primary/10"
                                            : "border-border"
                                    }`}
                                >
                                    <span
                                        className={`mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl ${
                                            isDone
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-muted-foreground"
                                        }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-card-foreground">
                                            {step.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

                {bookingStatus.status !== "completed" ? (
                    <Card className="border-none bg-card text-card-foreground shadow-xl">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-lg font-semibold">
                                Notifikasi otomatis
                            </CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                                Kami akan kirim pengingat sebelum jadwalmu.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {reminders.map((reminder) => (
                                <div
                                    key={reminder.label}
                                    className="flex items-center justify-between rounded-2xl border border-border p-4 text-xs text-muted-foreground"
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <AlarmClock className="h-3.5 w-3.5 text-primary" />
                                        {reminder.label}
                                    </span>
                                    <span>{reminder.time}</span>
                                </div>
                            ))}
                            <Button
                                variant='outline'
                                className='w-full justify-center gap-2 rounded-2xl border-border text-muted-foreground hover:bg-accent'
                            >
                                Batalkan booking
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Link href={`/rating/${params.id}`}>
                        <Button className='w-full justify-center gap-2 rounded-2xl bg-primary text-primary-foreground shadow-xl transition hover:bg-primary/90'>
                            Beri rating & review
                            <ArrowRight className='h-4 w-4' />
                        </Button>
                    </Link>
                )}
            </main>
        </PageShell>
    );
}
