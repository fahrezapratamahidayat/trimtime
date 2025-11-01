"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
    CalendarCog,
    CheckCircle2,
    MapPin,
    Power,
    Scissors,
    Settings2,
    Sparkles,
} from "lucide-react";

const workingHours = [
    { day: "Senin", start: "09:00", end: "20:00", active: true },
    { day: "Selasa", start: "09:00", end: "20:00", active: true },
    { day: "Rabu", start: "09:00", end: "20:00", active: true },
    { day: "Kamis", start: "09:00", end: "20:00", active: true },
    { day: "Jumat", start: "09:00", end: "21:00", active: true },
    { day: "Sabtu", start: "08:00", end: "21:00", active: true },
    { day: "Minggu", start: "10:00", end: "18:00", active: false },
] as const;

const skillOptions = [
    { name: "Skin Fade & Styling", active: true },
    { name: "Beard Sculpting", active: true },
    { name: "Steam Therapy & Mask", active: true },
    { name: "Kids Specialist", active: true },
    { name: "Colouring Basic", active: false },
] as const;

export default function BarberPengaturanPage() {
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
                                <MapPin className='h-4 w-4 text-primary' />
                                <div className='leading-tight'>
                                    <p className='text-xs font-semibold text-foreground'>
                                        TrimTime HQ
                                    </p>
                                    <p>Menara BCA, Jakarta</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2'>
                                <CalendarCog className='h-4 w-4 text-primary' />
                                <div className='leading-tight'>
                                    <p className='text-xs font-semibold text-foreground'>
                                        Jadwal aktif
                                    </p>
                                    <p>09:00 - 21:00 WIB</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2'>
                                <Power className='h-4 w-4 text-primary' />
                                <div className='leading-tight'>
                                    <p className='text-xs font-semibold text-foreground'>
                                        Status mode
                                    </p>
                                    <p>Online & Home Service</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-3'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary'>
                                <Settings2 className='h-4 w-4' />
                                Pengaturan Barber
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                Atur jadwal, mode layanan, dan skill barber
                            </h1>
                            <p className='max-w-2xl text-sm text-muted-foreground lg:text-base'>
                                Sesuaikan jam kerja, aktifkan mode home service,
                                dan kelola daftar keahlian agar profil barber
                                selalu up-to-date di aplikasi TrimTime.
                            </p>
                        </div>
                        <div className='flex flex-col gap-3 rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm backdrop-blur-sm lg:w-[22rem]'>
                            <div className='flex items-center justify-between text-xs text-muted-foreground'>
                                <span className='font-semibold uppercase tracking-widest'>
                                    Status barber
                                </span>
                                <Badge
                                    variant='outline'
                                    className='border-border/60 text-[10px] uppercase tracking-widest text-muted-foreground'
                                >
                                    Tersambung
                                </Badge>
                            </div>
                            <div className='space-y-2 text-sm text-muted-foreground'>
                                <p className='text-lg font-bold text-foreground'>
                                    Rama Putra
                                </p>
                                <p>Ketersediaan: 09:00 - 21:00 WIB</p>
                            </div>
                            <Button>Simpan seluruh perubahan</Button>
                        </div>
                    </div>
                </div>
            </section>
            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-8'>
                <div className='grid gap-5 lg:grid-cols-[1.4fr_1fr]'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                            <div className='flex items-center gap-3'>
                                <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                                    <CalendarCog className='h-5 w-5' />
                                </span>
                                <div>
                                    <CardTitle className='text-xl font-semibold tracking-tight'>
                                        Jadwal kerja mingguan
                                    </CardTitle>
                                    <CardDescription>
                                        Tentukan jam operasional agar pelanggan
                                        tahu kapan kamu tersedia.
                                    </CardDescription>
                                </div>
                            </div>
                            <Badge
                                variant='outline'
                                className='border-border/60 text-[10px] uppercase tracking-widest text-muted-foreground'
                            >
                                Auto-sync kalender
                            </Badge>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='space-y-3'>
                                {workingHours.map((item) => (
                                    <div
                                        key={item.day}
                                        className='flex flex-col gap-3 rounded-xl border border-border/40 bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between'
                                    >
                                        <div>
                                            <p className='text-sm font-semibold text-foreground'>
                                                {item.day}
                                            </p>
                                            <p className='text-xs text-muted-foreground'>
                                                {item.start} - {item.end} WIB
                                            </p>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <span className='text-[10px] uppercase tracking-widest text-muted-foreground'>
                                                {item.active
                                                    ? "Aktif"
                                                    : "Libur"}
                                            </span>
                                            <Switch
                                                defaultChecked={item.active}
                                                aria-label={`Aktifkan jadwal ${item.day}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='grid gap-3 sm:grid-cols-2'>
                                <div className='space-y-2'>
                                    <Label
                                        htmlFor='custom-date'
                                        className='text-xs uppercase tracking-widest text-muted-foreground'
                                    >
                                        Jadwal khusus
                                    </Label>
                                    <Input
                                        id='custom-date'
                                        placeholder='17 Feb 2025'
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label
                                        htmlFor='custom-time'
                                        className='text-xs uppercase tracking-widest text-muted-foreground'
                                    >
                                        Jam layanan
                                    </Label>
                                    <Input
                                        id='custom-time'
                                        placeholder='10:00 - 14:00'
                                    />
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <Label
                                    htmlFor='notes'
                                    className='text-xs uppercase tracking-widest text-muted-foreground'
                                >
                                    Catatan untuk pelanggan
                                </Label>
                                <Textarea
                                    id='notes'
                                    placeholder='Contoh: Libur tanggal merah dan buka lebih lama saat akhir pekan.'
                                    rows={3}
                                />
                            </div>
                            <div className='flex flex-wrap items-center gap-2 text-xs text-muted-foreground'>
                                <Badge
                                    variant='outline'
                                    className='border-border/50 bg-background/60'
                                >
                                    Puncak permintaan 17.00 - 20.00 WIB
                                </Badge>
                                <Badge className='bg-primary/15 text-primary'>
                                    4 pelanggan setuju jadwal ini
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                            <div className='flex items-center gap-3'>
                                <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                                    <MapPin className='h-5 w-5' />
                                </span>
                                <div>
                                    <CardTitle className='text-xl font-semibold tracking-tight'>
                                        Mode home service
                                    </CardTitle>
                                    <CardDescription>
                                        Atur radius layanan, ongkir, dan area
                                        favorit untuk kunjungan ke rumah.
                                    </CardDescription>
                                </div>
                            </div>
                            <Switch
                                defaultChecked
                                aria-label='Aktifkan mode home service'
                            />
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='grid gap-3 sm:grid-cols-2'>
                                <div className='space-y-2'>
                                    <Label
                                        htmlFor='radius'
                                        className='text-xs uppercase tracking-widest text-muted-foreground'
                                    >
                                        Radius layanan (km)
                                    </Label>
                                    <Input id='radius' placeholder='8 km' />
                                </div>
                                <div className='space-y-2'>
                                    <Label
                                        htmlFor='fee'
                                        className='text-xs uppercase tracking-widest text-muted-foreground'
                                    >
                                        Ongkir minimum
                                    </Label>
                                    <Input id='fee' placeholder='Rp 25.000' />
                                </div>
                            </div>
                            <div className='space-y-2 text-xs text-muted-foreground'>
                                <p className='font-semibold uppercase tracking-widest text-foreground'>
                                    Area favorit
                                </p>
                                <div className='flex flex-wrap gap-2'>
                                    <Badge className='bg-primary text-primary-foreground'>
                                        Sudirman
                                    </Badge>
                                    <Badge
                                        variant='outline'
                                        className='border-border/50'
                                    >
                                        Kuningan
                                    </Badge>
                                    <Badge
                                        variant='outline'
                                        className='border-border/50'
                                    >
                                        Senopati
                                    </Badge>
                                    <Badge
                                        variant='outline'
                                        className='border-border/50'
                                    >
                                        Mega Kuningan
                                    </Badge>
                                </div>
                                <Button
                                    variant='outline'
                                    size='sm'
                                    className='w-fit border-border/60'
                                >
                                    Tambah area baru
                                </Button>
                            </div>
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground'>
                                <p className='font-semibold text-primary'>
                                    Tips optimasi ongkir
                                </p>
                                <p className='mt-1 leading-relaxed'>
                                    Sesuaikan ongkir dengan jarak dan waktu
                                    tempuh. Pelanggan mendapat estimasi otomatis
                                    saat booking.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className='grid gap-5 lg:grid-cols-[1.2fr_1fr]'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                            <div className='flex items-center gap-3'>
                                <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                                    <Scissors className='h-5 w-5' />
                                </span>
                                <div>
                                    <CardTitle className='text-xl font-semibold tracking-tight'>
                                        Skill & layanan unggulan
                                    </CardTitle>
                                    <CardDescription>
                                        Pilih layanan yang ingin ditampilkan di
                                        profil kamu.
                                    </CardDescription>
                                </div>
                            </div>
                            <Badge className='bg-primary/15 text-primary'>
                                5 skill aktif
                            </Badge>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='space-y-3'>
                                {skillOptions.map((skill) => (
                                    <label
                                        key={skill.name}
                                        className='flex items-start justify-between gap-4 rounded-xl border border-border/40 bg-muted/20 p-4 text-sm text-muted-foreground'
                                    >
                                        <div className='space-y-1'>
                                            <p className='text-sm font-semibold text-foreground'>
                                                {skill.name}
                                            </p>
                                            <p className='text-xs'>
                                                Ditampilkan di halaman profil &
                                                paket promo.
                                            </p>
                                        </div>
                                        <Checkbox
                                            defaultChecked={skill.active}
                                            aria-label={`Aktifkan skill ${skill.name}`}
                                        />
                                    </label>
                                ))}
                            </div>
                            <Button
                                variant='outline'
                                className='w-full border-border/60'
                            >
                                Tambah skill baru
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='space-y-3'>
                            <div className='flex items-center gap-3'>
                                <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                                    <Power className='h-5 w-5' />
                                </span>
                                <div>
                                    <CardTitle className='text-xl font-semibold tracking-tight'>
                                        Mode offline & notifikasi
                                    </CardTitle>
                                    <CardDescription>
                                        Kontrol status kehadiran dan
                                        pemberitahuan otomatis.
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className='space-y-4 text-xs text-muted-foreground'>
                            <div className='flex items-center justify-between rounded-xl border border-border/40 bg-muted/20 p-4'>
                                <div className='space-y-1'>
                                    <p className='text-sm font-semibold text-foreground'>
                                        Mode offline cepat
                                    </p>
                                    <p>
                                        Matikan semua booking baru selama kamu
                                        istirahat atau sedang pelatihan.
                                    </p>
                                </div>
                                <Switch aria-label='Aktifkan mode offline' />
                            </div>
                            <div className='rounded-xl border border-border/40 bg-muted/20 p-4'>
                                <p className='text-sm font-semibold text-foreground'>
                                    Notifikasi otomatis
                                </p>
                                <ul className='mt-2 space-y-2'>
                                    <li className='flex items-center gap-2'>
                                        <CheckCircle2 className='h-3.5 w-3.5 text-primary' />
                                        Kirim update status ke pelanggan tiap
                                        pergantian mode.
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <Sparkles className='h-3.5 w-3.5 text-primary' />
                                        Rekomendasi promo akan menyesuaikan
                                        jadwal aktifmu.
                                    </li>
                                </ul>
                            </div>
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4'>
                                <p className='text-sm font-semibold text-primary'>
                                    Catatan singkat
                                </p>
                                <p className='mt-1 leading-relaxed'>
                                    Mode offline akan berlangsung maksimal 24
                                    jam kecuali kamu aktifkan kembali secara
                                    manual.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </PageShell>
    );
}
