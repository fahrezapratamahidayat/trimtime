import Link from "next/link";
import {
    ArrowLeft,
    BadgeCheck,
    CalendarClock,
    ClipboardCheck,
    Clock,
    History,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    ShieldCheck,
    SquarePen,
    UserCheck,
    UserRound,
    Wallet,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);

const statusBadgeStyles = {
    pending: "bg-amber-500/15 text-amber-600",
    confirmed: "bg-primary/10 text-primary",
    ongoing: "bg-sky-500/15 text-sky-600",
    done: "bg-emerald-500/15 text-emerald-600",
    cancelled: "bg-destructive/10 text-destructive",
} satisfies Record<string, string>;

const bookingDetails = {
    "tt-3021": {
        id: "TT-3021",
        externalId: "INV-9041",
        status: "pending",
        statusLabel: "Menunggu check-in",
        customer: {
            name: "Dimas Saputra",
            initials: "DS",
            phone: "0812-8890-1122",
            location: "Menara BCA, Jakarta",
            memberSince: "Agustus 2023",
        },
        schedule: {
            date: "Selasa, 11 Feb 2025",
            time: "09:00 WIB",
            duration: "60 menit",
            room: "Kursi 2 • Area Signature Fade",
        },
        service: {
            name: "Signature Fade + Steam",
            barber: "Rama Putra",
            notes: "Tambahkan steam therapy 10 menit. Pelanggan suka finishing matte.",
            channel: "Walk-in",
        },
        payment: {
            items: [
                { name: "Skin Fade Premium", price: 65000 },
                { name: "Steam Therapy", price: 20000 },
            ],
            subtotal: 85000,
            discount: 8500,
            total: 76500,
            promoCode: "TRIM10",
            method: "QRIS (diproses saat check-out)",
            tip: "Belum diatur",
            status: "Menunggu pembayaran",
        },
        timeline: [
            {
                time: "08:30",
                title: "Reminder dikirim",
                description:
                    "Sistem mengirim notifikasi WhatsApp otomatis ke pelanggan.",
                icon: BadgeCheck,
            },
            {
                time: "08:45",
                title: "Check-in belum diterima",
                description:
                    "Pelanggan belum konfirmasi kedatangan. Siapkan tim front desk.",
                icon: Clock,
            },
            {
                time: "09:00",
                title: "Estimasi sesi dimulai",
                description:
                    "Barber siap di kursi. Update status saat pelanggan tiba.",
                icon: CalendarClock,
                status: "upcoming",
            },
        ],
        progress: 25,
        actionLabel: "Konfirmasi kehadiran",
    },
    "inv-9041": {
        id: "INV-9041",
        externalId: "TT-3021",
        status: "pending",
        statusLabel: "Menunggu konfirmasi",
        customer: {
            name: "Dimas Saputra",
            initials: "DS",
            phone: "0812-8890-1122",
            location: "TrimTime HQ, SCBD",
            memberSince: "Agustus 2023",
        },
        schedule: {
            date: "Selasa, 11 Feb 2025",
            time: "09:00 WIB",
            duration: "60 menit",
            room: "Kursi 2 • Area Signature Fade",
        },
        service: {
            name: "Signature Fade + Steam",
            barber: "Rama Putra",
            notes: "Tambahkan steam therapy 10 menit. Pelanggan suka finishing matte.",
            channel: "Walk-in",
        },
        payment: {
            items: [
                { name: "Skin Fade Premium", price: 65000 },
                { name: "Steam Therapy", price: 20000 },
            ],
            subtotal: 85000,
            discount: 8500,
            total: 76500,
            promoCode: "TRIM10",
            method: "QRIS (diproses saat check-out)",
            tip: "Belum diatur",
            status: "Menunggu pembayaran",
        },
        timeline: [
            {
                time: "08:30",
                title: "Reminder dikirim",
                description:
                    "Sistem mengirim notifikasi WhatsApp otomatis ke pelanggan.",
                icon: BadgeCheck,
            },
            {
                time: "08:45",
                title: "Check-in belum diterima",
                description:
                    "Pelanggan belum konfirmasi kedatangan. Siapkan tim front desk.",
                icon: Clock,
            },
            {
                time: "09:00",
                title: "Estimasi sesi dimulai",
                description:
                    "Barber siap di kursi. Update status saat pelanggan tiba.",
                icon: CalendarClock,
                status: "upcoming",
            },
        ],
        progress: 25,
        actionLabel: "Konfirmasi kehadiran",
    },
} satisfies Record<
    string,
    {
        id: string;
        externalId: string;
        status: keyof typeof statusBadgeStyles;
        statusLabel: string;
        customer: {
            name: string;
            initials: string;
            phone: string;
            location: string;
            memberSince: string;
        };
        schedule: {
            date: string;
            time: string;
            duration: string;
            room: string;
        };
        service: {
            name: string;
            barber: string;
            notes: string;
            channel: string;
        };
        payment: {
            items: Array<{ name: string; price: number }>;
            subtotal: number;
            discount: number;
            total: number;
            promoCode?: string;
            method: string;
            tip: string;
            status: string;
        };
        timeline: Array<{
            time: string;
            title: string;
            description: string;
            icon: typeof CalendarClock;
            status?: "upcoming";
        }>;
        progress: number;
        actionLabel: string;
    }
>;

type BarberBookingDetailPageProps = {
    params: Promise<{ id: string }>;
};

export default async function BarberBookingDetailPage({
    params,
}: BarberBookingDetailPageProps) {
    const { id } = await params;
    const bookingKey = id?.toLowerCase?.() ?? "";
    const booking = bookingDetails[bookingKey];
    const phoneDigits = booking?.customer.phone
        ? booking.customer.phone.replace(/\D/g, "")
        : "";
    const normalizedPhone = phoneDigits.startsWith("0")
        ? `62${phoneDigits.slice(1)}`
        : phoneDigits;
    const telHref = normalizedPhone ? `tel:+${normalizedPhone}` : undefined;
    const bookingBasePath = `/barber/booking/${id}`;

    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-10'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative flex flex-col gap-6'>
                    <div className='flex flex-wrap items-center justify-between gap-4'>
                        <div className='flex items-center gap-3'>
                            <Link
                                href='/barber/booking'
                                className='inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
                            >
                                <ArrowLeft className='h-3.5 w-3.5' />
                                Kembali ke daftar booking
                            </Link>
                            <Badge
                                variant='outline'
                                className='border-border/60 text-[10px] uppercase tracking-widest text-muted-foreground'
                            >
                                Detail Booking
                            </Badge>
                        </div>
                        {booking ? (
                            <Badge
                                className={statusBadgeStyles[booking.status]}
                            >
                                {booking.statusLabel}
                            </Badge>
                        ) : null}
                    </div>
                    <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
                        <div className='space-y-3'>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                {booking
                                    ? booking.customer.name
                                    : "Booking tidak ditemukan"}
                            </h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                {booking
                                    ? `Pantau status layanan dan kelola komunikasi pelanggan secara real-time.`
                                    : `Periksa kembali ID booking atau hubungi admin TrimTime.`}
                            </p>
                        </div>
                        {booking ? (
                            <div className='flex flex-wrap items-center gap-2 text-xs text-muted-foreground'>
                                <Badge
                                    variant='outline'
                                    className='border-border/60 bg-background/80'
                                >
                                    ID internal: {booking.id}
                                </Badge>
                                <Badge
                                    variant='outline'
                                    className='border-border/60 bg-background/80'
                                >
                                    Invoice: {booking.externalId}
                                </Badge>
                            </div>
                        ) : null}
                    </div>
                </div>
            </section>

            <main className='space-y-7 px-5 py-6 lg:space-y-8 lg:px-8 lg:py-8'>
                {booking ? (
                    <>
                        <div className='grid cols-1 gap-8'>
                            <Card className='border-border/50 shadow-sm'>
                                <CardHeader className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <Avatar className='h-12 w-12 border border-border/50'>
                                            <AvatarImage
                                                src='/placeholder.jpg'
                                                alt={booking.customer.name}
                                            />
                                            <AvatarFallback className='bg-primary/10 text-sm font-semibold text-primary'>
                                                {booking.customer.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className='text-xl font-semibold'>
                                                {booking.customer.name}
                                            </CardTitle>
                                            <CardDescription className='text-sm text-muted-foreground'>
                                                Pelanggan sejak{" "}
                                                {booking.customer.memberSince}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap items-center gap-2 text-xs text-muted-foreground'>
                                        <Badge
                                            variant='outline'
                                            className='border-border/50'
                                        >
                                            <UserRound className='mr-1.5 h-3.5 w-3.5 text-primary' />
                                            {booking.service.channel}
                                        </Badge>
                                        <Badge
                                            variant='outline'
                                            className='border-border/50'
                                        >
                                            <ShieldCheck className='mr-1.5 h-3.5 w-3.5 text-primary' />
                                            Priority client
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className='space-y-6 text-sm text-muted-foreground'>
                                    <div className='grid gap-4 rounded-xl border border-border/40 bg-muted/20 p-4 sm:grid-cols-2'>
                                        <div className='space-y-2'>
                                            <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                                Jadwal
                                            </p>
                                            <div className='space-y-1'>
                                                <p className='inline-flex items-center gap-2 text-sm font-semibold text-foreground'>
                                                    <CalendarClock className='h-4 w-4 text-primary' />
                                                    {booking.schedule.date}
                                                </p>
                                                <p className='flex items-center gap-2'>
                                                    <Clock className='h-4 w-4 text-primary' />
                                                    {booking.schedule.time} •{" "}
                                                    {booking.schedule.duration}
                                                </p>
                                                <p className='flex items-center gap-2'>
                                                    <MapPin className='h-4 w-4 text-primary' />
                                                    {booking.schedule.room}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='space-y-2'>
                                            <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                                Kontak pelanggan
                                            </p>
                                            <div className='space-y-1'>
                                                <p className='flex items-center gap-2'>
                                                    <Phone className='h-4 w-4 text-primary' />
                                                    {booking.customer.phone}
                                                </p>
                                                <p className='flex items-center gap-2'>
                                                    <MapPin className='h-4 w-4 text-primary' />
                                                    {booking.customer.location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='rounded-xl border border-border/40 bg-background/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'>
                                        <div className='space-y-1.5'>
                                            <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                                Aksi cepat
                                            </p>
                                            <p className='text-xs text-muted-foreground'>
                                                Kelola komunikasi dan update
                                                status pelanggan langsung dari
                                                dashboard barber.
                                            </p>
                                        </div>
                                        <div className='mt-4 grid gap-2 sm:grid-cols-2'>
                                            {telHref ? (
                                                <Button
                                                    size='sm'
                                                    variant='outline'
                                                    className='border-border/60 justify-start gap-2 text-xs'
                                                    asChild
                                                >
                                                    <a
                                                        href={telHref}
                                                        className='inline-flex items-center gap-2'
                                                    >
                                                        <Phone className='h-3.5 w-3.5' />
                                                        Hubungi via telepon
                                                    </a>
                                                </Button>
                                            ) : null}
                                            <Button
                                                size='sm'
                                                variant='outline'
                                                className='border-border/60 justify-start gap-2 text-xs'
                                                asChild
                                            >
                                                <Link
                                                    href={`${bookingBasePath}?action=send-message`}
                                                    className='inline-flex items-center gap-2'
                                                >
                                                    <Send className='h-3.5 w-3.5' />
                                                    Kirim pesan instan
                                                </Link>
                                            </Button>
                                            <Button
                                                size='sm'
                                                variant='outline'
                                                className='border-border/60 justify-start gap-2 text-xs'
                                                asChild
                                            >
                                                <Link
                                                    href={`${bookingBasePath}/messages`}
                                                    className='inline-flex items-center gap-2'
                                                >
                                                    <MessageCircle className='h-3.5 w-3.5' />
                                                    Riwayat pesan
                                                </Link>
                                            </Button>
                                            <Button
                                                size='sm'
                                                variant='outline'
                                                className='border-border/60 justify-start gap-2 text-xs'
                                                asChild
                                            >
                                                <Link
                                                    href={`${bookingBasePath}?action=confirm-attendance`}
                                                    className='inline-flex items-center gap-2'
                                                >
                                                    <UserCheck className='h-3.5 w-3.5' />
                                                    Konfirmasi kehadiran
                                                </Link>
                                            </Button>
                                            <Button
                                                size='sm'
                                                variant='outline'
                                                className='border-border/60 justify-start gap-2 text-xs'
                                                asChild
                                            >
                                                <Link
                                                    href={`${bookingBasePath}?action=mark-check-in`}
                                                    className='inline-flex items-center gap-2'
                                                >
                                                    <ClipboardCheck className='h-3.5 w-3.5' />
                                                    Tandai check-in
                                                </Link>
                                            </Button>
                                            <Button
                                                size='sm'
                                                variant='outline'
                                                className='border-border/60 justify-start gap-2 text-xs'
                                                asChild
                                            >
                                                <Link
                                                    href={`${bookingBasePath}?action=add-note`}
                                                    className='inline-flex items-center gap-2'
                                                >
                                                    <SquarePen className='h-3.5 w-3.5' />
                                                    Tambah catatan internal
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>

                                    <div className='grid gap-4 lg:grid-cols-2'>
                                        <div className='rounded-xl border border-border/40 bg-muted/20 p-4'>
                                            <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                                Layanan
                                            </p>
                                            <p className='mt-1 text-lg font-semibold text-foreground'>
                                                {booking.service.name}
                                            </p>
                                            <p className='text-xs text-muted-foreground'>
                                                Barber: {booking.service.barber}
                                            </p>
                                            <Separator className='my-3' />
                                            <p className='text-xs leading-relaxed text-muted-foreground'>
                                                {booking.service.notes}
                                            </p>
                                        </div>
                                        <div
                                            id='payment'
                                            className='rounded-xl border border-border/40 bg-muted/20 p-4'
                                        >
                                            <div className='flex items-start justify-between'>
                                                <div>
                                                    <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                                        Pembayaran
                                                    </p>
                                                    <p className='mt-1 text-xs text-muted-foreground'>
                                                        Status:{" "}
                                                        {booking.payment.status}
                                                    </p>
                                                </div>
                                                {booking.payment.promoCode ? (
                                                    <Badge
                                                        variant='outline'
                                                        className='border-primary/40 bg-primary/10 text-[11px] uppercase tracking-widest text-primary'
                                                    >
                                                        Promo{" "}
                                                        {
                                                            booking.payment
                                                                .promoCode
                                                        }
                                                    </Badge>
                                                ) : null}
                                            </div>
                                            <div className='mt-3 space-y-2 text-sm text-muted-foreground'>
                                                {booking.payment.items.map(
                                                    (item) => (
                                                        <div
                                                            key={`payment-${item.name}`}
                                                            className='flex items-center justify-between'
                                                        >
                                                            <span>
                                                                {item.name}
                                                            </span>
                                                            <span className='font-semibold text-foreground'>
                                                                {formatCurrency(
                                                                    item.price
                                                                )}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                                <Separator className='my-2' />
                                                <div className='flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground'>
                                                    <span>Subtotal</span>
                                                    <span className='text-sm font-semibold text-foreground'>
                                                        {formatCurrency(
                                                            booking.payment
                                                                .subtotal
                                                        )}
                                                    </span>
                                                </div>
                                                {booking.payment.discount >
                                                0 ? (
                                                    <div className='flex items-center justify-between text-xs uppercase tracking-widest text-emerald-600'>
                                                        <span>Diskon</span>
                                                        <span className='text-sm font-semibold'>
                                                            -
                                                            {formatCurrency(
                                                                booking.payment
                                                                    .discount
                                                            )}
                                                        </span>
                                                    </div>
                                                ) : null}
                                                <div className='flex items-center justify-between border-t border-border/40 pt-3 text-sm font-semibold text-foreground'>
                                                    <span>Total</span>
                                                    <span>
                                                        {formatCurrency(
                                                            booking.payment
                                                                .total
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='mt-3 space-y-1 text-xs text-muted-foreground'>
                                                <p>
                                                    Metode:{" "}
                                                    {booking.payment.method}
                                                </p>
                                                <p>
                                                    Tip: {booking.payment.tip}
                                                </p>
                                            </div>
                                            <div className='mt-3 flex flex-wrap gap-2'>
                                                <Button
                                                    size='sm'
                                                    className='gap-2 text-xs'
                                                    asChild
                                                >
                                                    <Link
                                                        href={`${bookingBasePath}?action=confirm-payment`}
                                                        className='inline-flex items-center gap-2'
                                                    >
                                                        <Wallet className='h-3.5 w-3.5' />
                                                        Konfirmasi pembayaran
                                                    </Link>
                                                </Button>
                                                <Button
                                                    size='sm'
                                                    variant='outline'
                                                    className='border-border/60 gap-2 text-xs'
                                                    asChild
                                                >
                                                    <Link
                                                        href={`${bookingBasePath}?action=view-transactions#payment`}
                                                        className='inline-flex items-center gap-2'
                                                    >
                                                        <History className='h-3.5 w-3.5' />
                                                        Lihat riwayat transaksi
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className='border-border/50 shadow-sm'>
                                <CardHeader className='space-y-2'>
                                    <CardTitle className='text-xl font-semibold tracking-tight'>
                                        Progress layanan
                                    </CardTitle>
                                    <CardDescription>
                                        Update status booking agar pelanggan
                                        menerima notifikasi realtime dari
                                        TrimTime.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='space-y-4 text-sm text-muted-foreground'>
                                    <div className='space-y-2'>
                                        <div className='flex items-center justify-between'>
                                            <p className='font-semibold text-foreground'>
                                                {booking.progress}% selesai
                                            </p>
                                            <Badge
                                                variant='outline'
                                                className='border-border/60'
                                            >
                                                Status: {booking.statusLabel}
                                            </Badge>
                                        </div>
                                        <Progress value={booking.progress} />
                                    </div>
                                    <div className='grid gap-3'>
                                        <Button>{booking.actionLabel}</Button>
                                        <Button
                                            variant='outline'
                                            className='border-border/60'
                                        >
                                            Tandai selesai & kirim permintaan
                                            rating
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className='border-border/50 shadow-sm'>
                            <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                                <div>
                                    <CardTitle className='text-xl font-semibold tracking-tight'>
                                        Timeline aktivitas
                                    </CardTitle>
                                    <CardDescription>
                                        Riwayat otomatis dari sistem booking
                                        TrimTime.
                                    </CardDescription>
                                </div>
                                <Badge
                                    variant='outline'
                                    className='border-border/60 bg-background/60 text-xs font-semibold uppercase tracking-widest text-muted-foreground'
                                >
                                    Update realtime
                                </Badge>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                {booking.timeline.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={`${item.time}-${item.title}`}
                                            className='flex gap-4 rounded-xl border border-border/40 bg-muted/20 p-4 text-sm text-muted-foreground'
                                        >
                                            <span className='mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary'>
                                                <Icon className='h-4 w-4' />
                                            </span>
                                            <div className='flex-1 space-y-1'>
                                                <div className='flex flex-wrap items-center gap-2'>
                                                    <p className='text-base font-semibold text-foreground'>
                                                        {item.title}
                                                    </p>
                                                    <Badge
                                                        variant='outline'
                                                        className='border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground'
                                                    >
                                                        {item.time}
                                                    </Badge>
                                                    {item.status ===
                                                    "upcoming" ? (
                                                        <Badge className='bg-primary/15 text-primary'>
                                                            Selanjutnya
                                                        </Badge>
                                                    ) : null}
                                                </div>
                                                <p className='text-xs leading-relaxed'>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </>
                ) : (
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle>Booking tidak ditemukan</CardTitle>
                            <CardDescription>
                                ID booking yang kamu cari belum tercatat.
                                Silakan kembali ke daftar booking.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild>
                                <Link href='/barber/booking'>
                                    Kembali ke daftar booking
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </main>
        </PageShell>
    );
}
