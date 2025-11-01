"use client";

import {
    ArrowRight,
    CheckCircle2,
    Clock,
    MapPin,
    MessageCircle,
    Navigation,
    Phone,
    Route,
    Truck,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activeTrip = {
    id: "HS-4473",
    customer: "Reyhan Fadil",
    phone: "0812-8890-1122",
    pickup: "TrimTime HQ, SCBD",
    destination: "Menara BCA Lt. 32",
    distance: "4,2 km",
    eta: "12 menit lagi",
    fee: "Rp 25.000",
    status: "on-the-way",
} as const;

const timelineSteps = [
    {
        label: "Berangkat",
        description: "Barber meninggalkan barbershop pukul 10:05 WIB.",
        time: "10:05 WIB",
        status: "done",
    },
    {
        label: "Dalam perjalanan",
        description: "Sedang menuju Menara BCA melalui Sudirman.",
        time: "Estimasi tiba 10:27 WIB",
        status: "current",
    },
    {
        label: "Sesi dimulai",
        description: "Pastikan pelanggan siap menerima layanan.",
        time: "Estimasi mulai 10:30 WIB",
        status: "next",
    },
] as const;

const queueRequests = [
    {
        id: "HS-4474",
        customer: "Indra Syahputra",
        schedule: "11 Feb • 13:30",
        address: "Cluster Kemang Pratama, Bekasi",
        distance: "8,6 km",
        fee: "Rp 30.000",
        status: "awaiting",
    },
    {
        id: "HS-4475",
        customer: "Gabriella Prameswari",
        schedule: "11 Feb • 15:00",
        address: "Apartemen Sudirman Park Tower A",
        distance: "5,1 km",
        fee: "Rp 22.000",
        status: "awaiting",
    },
    {
        id: "HS-4476",
        customer: "Yoga Mahendra",
        schedule: "11 Feb • 16:30",
        address: "Soho Podomoro City, Lantai 12",
        distance: "6,4 km",
        fee: "Rp 24.000",
        status: "draft",
    },
] as const;

const timelineStyles = {
    done: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
    current: "bg-primary/10 text-primary border-primary/30",
    next: "bg-muted/20 text-muted-foreground border-border/40",
} satisfies Record<string, string>;

const queueStatusLabel = {
    awaiting: "Menunggu konfirmasi",
    draft: "Butuh jadwal ulang",
} satisfies Record<string, string>;

export default function BarberHomeServicePage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-10'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='flex items-center gap-4'>
                            <Avatar className='h-12 w-12 border-2 border-primary/40 shadow-lg'>
                                <AvatarImage
                                    src='/placeholder.jpg'
                                    alt='Rama Putra'
                                />
                                <AvatarFallback className='bg-primary/10 text-sm font-semibold text-primary'>
                                    RP
                                </AvatarFallback>
                            </Avatar>
                            <div className='space-y-1.5'>
                                <div className='flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground'>
                                    <Badge
                                        variant='outline'
                                        className='border-border/60 bg-muted/20 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground'
                                    >
                                        Barber
                                    </Badge>
                                    <Badge
                                        variant='outline'
                                        className='border-border/60 bg-muted/20 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground'
                                    >
                                        Barber-Owner
                                    </Badge>
                                </div>
                                <p className='text-sm text-muted-foreground'>
                                    Barber
                                </p>
                                <h2 className='text-xl font-bold tracking-tight text-foreground'>
                                    Rama Putra
                                </h2>
                            </div>
                        </div>
                        <div className='grid gap-3 text-xs text-muted-foreground sm:grid-cols-2 lg:w-auto lg:grid-cols-3'>
                            <div className='flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2'>
                                <Truck className='h-4 w-4 text-primary' />
                                <div className='leading-tight'>
                                    <p className='text-xs font-semibold text-foreground'>
                                        Home service aktif
                                    </p>
                                    <p>Perjalanan: 3 (1 OTW)</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2'>
                                <MapPin className='h-4 w-4 text-primary' />
                                <div className='leading-tight'>
                                    <p className='text-xs font-semibold text-foreground'>
                                        TrimTime HQ
                                    </p>
                                    <p>Menara BCA, Jakarta</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2'>
                                <Clock className='h-4 w-4 text-primary' />
                                <div className='leading-tight'>
                                    <p className='text-xs font-semibold text-foreground'>
                                        Jadwal berikutnya
                                    </p>
                                    <p>11 Feb • 13:30 WIB</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-3'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary'>
                                <Truck className='h-4 w-4' />
                                Home Service Tracker
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                Pantau perjalanan barber dalam sekali klik
                            </h1>
                            <p className='max-w-2xl text-sm text-muted-foreground lg:text-base'>
                                Update status perjalanan (on the way → tiba →
                                selesai), pantau estimasi jarak & ongkir, dan
                                pastikan pelanggan menerima notifikasi otomatis.
                            </p>
                        </div>
                        <div className='flex flex-col gap-3 rounded-2xl border border-border/40 bg-card/80 p-4 shadow-sm backdrop-blur-sm lg:w-[22rem]'>
                            <div className='flex items-center justify-between text-xs text-muted-foreground'>
                                <span className='font-semibold uppercase tracking-widest'>
                                    Perjalanan aktif
                                </span>
                                <Badge
                                    variant='outline'
                                    className='border-border/60 text-[10px] uppercase tracking-widest text-muted-foreground'
                                >
                                    Live GPS
                                </Badge>
                            </div>
                            <div className='space-y-2 text-sm text-muted-foreground'>
                                <p className='text-foreground text-lg font-bold'>
                                    {activeTrip.customer}
                                </p>
                                <p>Tujuan: {activeTrip.destination}</p>
                                <p>
                                    Estimasi tiba dalam{" "}
                                    <span className='font-semibold text-foreground'>
                                        {activeTrip.eta}
                                    </span>
                                </p>
                            </div>
                            <Button>Kirim update ke pelanggan</Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-8'>
                <div className='grid gap-5 lg:grid-cols-[1.4fr_1fr]'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                            <div>
                                <CardTitle className='text-xl font-semibold tracking-tight'>
                                    Peta perjalanan aktif
                                </CardTitle>
                                <CardDescription>
                                    Pastikan barber tiba tepat waktu dan
                                    pelanggan siap menyambut.
                                </CardDescription>
                            </div>
                            <div className='flex flex-wrap items-center gap-2 text-xs text-muted-foreground'>
                                <Badge className='bg-primary text-primary-foreground shadow-sm'>
                                    {activeTrip.status === "on-the-way"
                                        ? "Sedang OTW"
                                        : "Status tidak diketahui"}
                                </Badge>
                                <Badge
                                    variant='outline'
                                    className='border-border/50'
                                >
                                    ID {activeTrip.id}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='relative overflow-hidden rounded-2xl border border-border/40'>
                                <div className='absolute inset-0 bg-linear-to-tr from-primary/10 via-transparent to-accent/20' />
                                <div className='relative flex h-64 flex-col justify-between bg-[url("/map-placeholder.svg")] bg-cover bg-center p-5 sm:h-72'>
                                    <div className='flex items-center justify-between text-xs text-muted-foreground'>
                                        <div className='flex items-center gap-2'>
                                            <span className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow'>
                                                <Navigation className='h-4 w-4' />
                                            </span>
                                            <div>
                                                <p className='text-sm font-semibold text-foreground'>
                                                    {activeTrip.pickup}
                                                </p>
                                                <p>Berangkat pukul 10:05 WIB</p>
                                            </div>
                                        </div>
                                        <div className='rounded-full border border-border/40 bg-card/80 px-3 py-1 text-[10px] uppercase tracking-widest'>
                                            Tracking realtime
                                        </div>
                                    </div>
                                    <div className='rounded-2xl border border-border/40 bg-card/90 p-4 text-xs text-muted-foreground shadow-sm backdrop-blur'>
                                        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                                            <div className='space-y-1'>
                                                <p className='text-sm font-semibold text-foreground'>
                                                    {activeTrip.destination}
                                                </p>
                                                <p className='flex items-center gap-1'>
                                                    <MapPin className='h-3.5 w-3.5 text-primary' />
                                                    {activeTrip.distance} •{" "}
                                                    {activeTrip.eta}
                                                </p>
                                            </div>
                                            <div className='flex flex-wrap items-center gap-2'>
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    className='border-border/60'
                                                >
                                                    <Route className='h-3.5 w-3.5' />
                                                    Buka di Maps
                                                </Button>
                                                <Button size='sm'>
                                                    Update status
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='grid gap-3 sm:grid-cols-3'>
                                <div className='rounded-xl border border-border/40 bg-muted/20 p-4 text-xs text-muted-foreground'>
                                    <p className='font-semibold uppercase tracking-widest text-foreground'>
                                        Ongkir
                                    </p>
                                    <p className='mt-1 text-lg font-bold text-foreground'>
                                        {activeTrip.fee}
                                    </p>
                                    <p>
                                        Otomatis ditambahkan ke invoice
                                        pelanggan.
                                    </p>
                                </div>
                                <div className='rounded-xl border border-border/40 bg-muted/20 p-4 text-xs text-muted-foreground'>
                                    <p className='font-semibold uppercase tracking-widest text-foreground'>
                                        Estimasi perjalanan
                                    </p>
                                    <p className='mt-1 text-lg font-bold text-foreground'>
                                        {activeTrip.distance}
                                    </p>
                                    <p>Rute tercepat via Jl. Sudirman.</p>
                                </div>
                                <div className='rounded-xl border border-border/40 bg-muted/20 p-4 text-xs text-muted-foreground'>
                                    <p className='font-semibold uppercase tracking-widest text-foreground'>
                                        Kontak pelanggan
                                    </p>
                                    <div className='mt-1 flex flex-wrap items-center gap-2 text-sm text-foreground'>
                                        <Phone className='h-4 w-4 text-primary' />
                                        {activeTrip.phone}
                                    </div>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        className='mt-2 w-full border-border/60'
                                    >
                                        <MessageCircle className='h-3.5 w-3.5' />
                                        Kirim pesan cepat
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='space-y-2'>
                            <CardTitle className='text-xl font-semibold tracking-tight'>
                                Detail perjalanan
                            </CardTitle>
                            <CardDescription>
                                Pastikan pelanggan menerima kabar setiap status
                                berubah.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4 text-sm text-muted-foreground'>
                            <div className='rounded-xl border border-border/40 bg-muted/20 p-4'>
                                <div className='flex items-center justify-between'>
                                    <span className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                                        Tujuan
                                    </span>
                                    <Badge
                                        variant='outline'
                                        className='border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground'
                                    >
                                        Prioritas tinggi
                                    </Badge>
                                </div>
                                <p className='mt-2 text-base font-semibold text-foreground'>
                                    {activeTrip.destination}
                                </p>
                                <p className='text-xs'>
                                    Pastikan akses lobby dan parkir sudah
                                    dikonfirmasi.
                                </p>
                            </div>
                            <div className='rounded-xl border border-border/40 bg-muted/20 p-4'>
                                <span className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                                    Pengingat pelanggan
                                </span>
                                <ul className='mt-2 space-y-2 text-xs leading-relaxed'>
                                    <li>
                                        • Hubungi pelanggan 5 menit sebelum
                                        tiba.
                                    </li>
                                    <li>
                                        • Periksa perlengkapan sebelum memasuki
                                        lokasi.
                                    </li>
                                    <li>
                                        • Update status selesai begitu layanan
                                        rampung.
                                    </li>
                                </ul>
                            </div>
                            <Button
                                variant='outline'
                                className='w-full border-border/60'
                            >
                                Lihat riwayat perjalanan
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className='grid gap-5 lg:grid-cols-[1.3fr_1fr]'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                            <div>
                                <CardTitle className='text-xl font-semibold tracking-tight'>
                                    Timeline status
                                </CardTitle>
                                <CardDescription>
                                    Ikuti urutan update agar pelanggan tahu
                                    progres layanan.
                                </CardDescription>
                            </div>
                            <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                                <span>Status progres:</span>
                                <Badge className='bg-primary text-primary-foreground'>
                                    66% selesai
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className='space-y-5'>
                            <Progress value={66} />
                            <div className='space-y-4'>
                                {timelineSteps.map((step) => {
                                    const Icon =
                                        step.status === "done"
                                            ? CheckCircle2
                                            : step.status === "current"
                                            ? Navigation
                                            : Clock;
                                    return (
                                        <div
                                            key={step.label}
                                            className='flex gap-3 rounded-xl border border-border/40 bg-muted/20 p-4'
                                        >
                                            <span
                                                className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                                                    timelineStyles[step.status]
                                                }`}
                                            >
                                                <Icon className='h-4 w-4' />
                                            </span>
                                            <div className='space-y-1 text-sm text-muted-foreground'>
                                                <div className='flex flex-wrap items-center gap-2'>
                                                    <p className='text-base font-semibold text-foreground'>
                                                        {step.label}
                                                    </p>
                                                    <Badge
                                                        variant='outline'
                                                        className='border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground'
                                                    >
                                                        {step.time}
                                                    </Badge>
                                                </div>
                                                <p className='text-xs leading-relaxed'>
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground'>
                                <p className='font-semibold text-primary'>
                                    Tips koordinasi
                                </p>
                                <p className='mt-1 leading-relaxed'>
                                    Aktifkan tombol “Tiba” sesaat setelah sampai
                                    agar pelanggan menerima notifikasi dan
                                    segera siap di lokasi layanan.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='flex flex-col gap-2'>
                            <CardTitle className='text-xl font-semibold tracking-tight'>
                                Antrean berikutnya
                            </CardTitle>
                            <CardDescription>
                                Atur slot waktu dan ongkir sebelum barber
                                berangkat.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            {queueRequests.map((request) => (
                                <div
                                    key={request.id}
                                    className='space-y-3 rounded-xl border border-border/40 bg-muted/20 p-4'
                                >
                                    <div className='flex items-center justify-between text-xs text-muted-foreground'>
                                        <p className='font-semibold uppercase tracking-widest text-foreground'>
                                            {request.customer}
                                        </p>
                                        <Badge
                                            variant='outline'
                                            className='border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground'
                                        >
                                            {request.id}
                                        </Badge>
                                    </div>
                                    <div className='text-xs text-muted-foreground'>
                                        <p className='flex items-center gap-1'>
                                            <Clock className='h-3.5 w-3.5 text-primary' />
                                            {request.schedule}
                                        </p>
                                        <p className='mt-1 flex items-center gap-1'>
                                            <MapPin className='h-3.5 w-3.5 text-primary' />
                                            {request.address}
                                        </p>
                                        <div className='mt-2 flex flex-wrap items-center gap-2'>
                                            <Badge
                                                variant='outline'
                                                className='border-border/50 bg-background/60 text-[10px] uppercase tracking-widest text-muted-foreground'
                                            >
                                                {request.distance}
                                            </Badge>
                                            <Badge className='bg-primary/15 text-xs font-medium text-primary'>
                                                Ongkir {request.fee}
                                            </Badge>
                                            <Badge
                                                variant='outline'
                                                className='border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground'
                                            >
                                                {
                                                    queueStatusLabel[
                                                        request.status
                                                    ]
                                                }
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap items-center gap-2 text-xs'>
                                        <Button
                                            size='sm'
                                            variant='outline'
                                            className='border-border/60'
                                        >
                                            Cek detail
                                        </Button>
                                        <Button size='sm'>
                                            Konfirmasi jadwal
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground'>
                                <p className='font-semibold text-primary'>
                                    Rencanakan rute
                                </p>
                                <p className='mt-1 leading-relaxed'>
                                    Kelompokkan permintaan berdasarkan area agar
                                    perjalanan lebih efisien dan ongkir tetap
                                    kompetitif.
                                </p>
                                <Button
                                    variant='outline'
                                    size='sm'
                                    className='mt-3 border-border/60'
                                >
                                    <ArrowRight className='h-3.5 w-3.5' />
                                    Lihat peta rute
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </PageShell>
    );
}
