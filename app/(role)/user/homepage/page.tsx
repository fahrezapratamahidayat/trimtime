"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Filter, Heart, MapPin, Search, Sparkles } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { barbershopDatabase } from "@/data/barbershops";

const mockNotifications = [
    {
        id: 1,
        title: "Reminder jadwal haircut",
        time: "Selasa, 11 Feb 2025 09:30",
        message:
            "Raka Pratama akan siap pukul 09:30. Pastikan kamu sudah di lokasi 10 menit sebelumnya.",
    },
    {
        id: 2,
        title: "Promo baru untuk kamu",
        time: "Senin, 10 Feb 2025 18:00",
        message:
            "Gunakan kode GLOWUP25 untuk diskon 25% paket styling minggu ini.",
    },
    {
        id: 3,
        title: "Loyalty point bertambah",
        time: "Minggu, 9 Feb 2025 20:45",
        message:
            "Kamu memperoleh 1 poin baru setelah memberi rating ke Urban Fade Lounge.",
    },
];

export default function Homepage() {
    const router = useRouter();

    return (
        <PageShell background='soft' contentClassName='gap-0'>
            {/* Mobile Header - Hidden on Desktop */}
            <header className='rounded-xl border border-border/50 bg-card/95 px-5 py-4 shadow-sm backdrop-blur-sm lg:hidden'>
                <div className='flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-3'>
                        <Avatar className='h-11 w-11 border-2 border-border/50 shadow-sm'>
                            <AvatarImage src='/placeholder.jpg' alt='Rizky' />
                            <AvatarFallback className='bg-primary/10 text-primary font-semibold'>RZ</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                            <p className='text-sm font-semibold tracking-tight text-foreground'>
                                Hi, Rizky
                            </p>
                            <span className='inline-flex items-center gap-1.5 text-xs text-muted-foreground'>
                                <MapPin className='h-3.5 w-3.5' />
                                SCBD, Jakarta
                            </span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className='relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-background text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground'>
                                    <Bell className='h-4 w-4' />
                                    {mockNotifications.length > 0 ? (
                                        <span className='absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground shadow-sm ring-2 ring-background'>
                                            <span className='sr-only'>
                                                Ada notifikasi baru
                                            </span>
                                            {mockNotifications.length}
                                        </span>
                                    ) : null}
                                </button>
                            </DialogTrigger>
                            <DialogContent className='max-w-md rounded-xl border border-border/50 bg-card p-0 text-left shadow-lg'>
                                <DialogHeader className='border-b border-border/50 px-6 py-4 text-left'>
                                    <DialogTitle className='flex items-center gap-2 text-base font-semibold tracking-tight text-card-foreground'>
                                        <Sparkles className='h-4 w-4 text-primary' />
                                        Notifikasi terbaru
                                    </DialogTitle>
                                    <DialogDescription className='text-xs text-muted-foreground'>
                                        Reminder booking, promo, dan update
                                        loyalty kamu.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className='space-y-2 px-6 py-4 text-sm text-muted-foreground'>
                                    {mockNotifications.map((item) => (
                                        <div
                                            key={item.id}
                                            className='rounded-lg border border-border/50 bg-muted/30 p-4 transition-colors hover:bg-muted/50'
                                        >
                                            <div className='flex items-center justify-between gap-2 text-xs text-muted-foreground'>
                                                <span className='inline-flex items-center gap-1.5 font-semibold text-card-foreground'>
                                                    <Filter className='h-3.5 w-3.5 text-primary' />
                                                    {item.title}
                                                </span>
                                                <span className='text-[11px]'>{item.time}</span>
                                            </div>
                                            <p className='mt-2 text-sm leading-relaxed text-card-foreground'>
                                                {item.message}
                                            </p>
                                            <div className='mt-3 flex items-center justify-end gap-2 text-xs'>
                                                <Button
                                                    variant='ghost'
                                                    size='sm'
                                                    className='h-8 rounded-md px-3 text-xs font-medium text-muted-foreground hover:text-foreground'
                                                >
                                                    Tandai dibaca
                                                </Button>
                                                <Link href='/orders'>
                                                    <Button
                                                        size='sm'
                                                        className='h-8 rounded-md px-3 text-xs font-medium shadow-sm'
                                                    >
                                                        Lihat detail
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </DialogContent>
                        </Dialog>
                        <button className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-background text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground'>
                            <Heart className='h-4 w-4' />
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section - Welcome Banner */}
            <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-12'>
                <div className='absolute inset-0 bg-grid-pattern opacity-5' />
                <div className='relative space-y-6'>
                    <div className='flex items-start justify-between'>
                        <div className='flex-1 space-y-3'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary'>
                                <Sparkles className='h-3.5 w-3.5' />
                                TrimTime Premium
                            </div>
                            <h1 className='text-3xl font-bold leading-tight tracking-tight lg:text-4xl'>
                                Temukan Barbershop
                                <br />
                                <span className='text-primary'>Terbaik Untukmu</span>
                            </h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Booking mudah, barber profesional, hasil maksimal
                            </p>
                        </div>
                        {/* Desktop: Notification & Favorite buttons */}
                        <div className='hidden lg:flex items-center gap-2'>
                <Dialog>
                    <DialogTrigger asChild>
                        <button className='relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-background text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground'>
                            <Bell className='h-4 w-4' />
                            {mockNotifications.length > 0 ? (
                                <span className='absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground shadow-sm ring-2 ring-background'>
                                    <span className='sr-only'>Ada notifikasi baru</span>
                                    {mockNotifications.length}
                                </span>
                            ) : null}
                        </button>
                    </DialogTrigger>
                    <DialogContent className='max-w-md rounded-xl border border-border/50 bg-card p-0 text-left shadow-lg'>
                        <DialogHeader className='border-b border-border/50 px-6 py-4 text-left'>
                            <DialogTitle className='flex items-center gap-2 text-base font-semibold tracking-tight text-card-foreground'>
                                <Sparkles className='h-4 w-4 text-primary' />
                                Notifikasi terbaru
                            </DialogTitle>
                            <DialogDescription className='text-xs text-muted-foreground'>
                                Reminder booking, promo, dan update loyalty kamu.
                            </DialogDescription>
                        </DialogHeader>
                        <div className='space-y-2 px-6 py-4 text-sm text-muted-foreground'>
                            {mockNotifications.map((item) => (
                                <div
                                    key={item.id}
                                    className='rounded-lg border border-border/50 bg-muted/30 p-4 transition-colors hover:bg-muted/50'
                                >
                                    <div className='flex items-center justify-between gap-2 text-xs text-muted-foreground'>
                                        <span className='inline-flex items-center gap-1.5 font-semibold text-card-foreground'>
                                            <Filter className='h-3.5 w-3.5 text-primary' />
                                            {item.title}
                                        </span>
                                        <span className='text-[11px]'>{item.time}</span>
                                    </div>
                                    <p className='mt-2 text-sm leading-relaxed text-card-foreground'>
                                        {item.message}
                                    </p>
                                    <div className='mt-3 flex items-center justify-end gap-2 text-xs'>
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            className='h-8 rounded-md px-3 text-xs font-medium text-muted-foreground hover:text-foreground'
                                        >
                                            Tandai dibaca
                                        </Button>
                                        <Link href='/orders'>
                                            <Button
                                                size='sm'
                                                className='h-8 rounded-md px-3 text-xs font-medium shadow-sm'
                                            >
                                                Lihat detail
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DialogContent>
                        </Dialog>
                        <button className='inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-background text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground'>
                            <Heart className='h-4 w-4' />
                        </button>
                    </div>
                    </div>
                    
                    {/* Enhanced Search Bar */}
                    <div className='relative'>
                        <button
                            onClick={() => router.push("/search")}
                            className='group flex h-14 w-full items-center gap-4 rounded-xl border-2 border-border/50 bg-background px-5 text-left shadow-lg transition-all hover:border-primary/50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                        >
                            <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground'>
                                <Search className='h-5 w-5' />
                            </div>
                            <div className='flex-1'>
                                <p className='text-sm font-medium text-foreground'>Cari barbershop atau layanan</p>
                                <p className='text-xs text-muted-foreground'>Temukan yang terdekat denganmu</p>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            <main className='flex flex-col'>

                {/* Featured Barbershop */}
                <section className='px-5 py-6 lg:px-8'>
                    <div className='space-y-4'>
                        <div className='flex items-end justify-between'>
                            <div>
                                <h2 className='text-xl font-bold tracking-tight lg:text-2xl'>
                                    Barbershop Pilihan
                                </h2>
                                <p className='mt-1 text-sm text-muted-foreground'>
                                    Terverifikasi dan terpercaya
                                </p>
                            </div>
                            <Link
                                href='#'
                                className='text-sm font-semibold text-primary transition-colors hover:text-primary/80'
                            >
                                Lihat Semua →
                            </Link>
                        </div>

                        {/* Featured Card - First Item Larger */}
                        <div className='group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-lg transition-all hover:shadow-xl lg:h-[400px]'>
                            <div className='relative h-64 overflow-hidden lg:h-full'>
                                <div
                                    className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
                                    style={{ backgroundImage: `url(${barbershopDatabase.list[0].heroImage})` }}
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />
                                <div className='absolute inset-x-0 top-0 flex items-center justify-between p-4'>
                                    <div className='inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-lg backdrop-blur-sm'>
                                        <Sparkles className='h-3.5 w-3.5' />
                                        Featured
                                    </div>
                                    <button className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/30'>
                                        <Heart className='h-4 w-4' />
                                    </button>
                                </div>
                                <div className='absolute inset-x-0 bottom-0 p-5 lg:p-6'>
                                    <div className='space-y-3'>
                                        <div className='flex items-center gap-2'>
                                            <div className='inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-md'>
                                                ⭐ {barbershopDatabase.list[0].rating}
                                                <span className='text-white/80'>({barbershopDatabase.list[0].ratingCount})</span>
                                            </div>
                                            <div className='inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-md'>
                                                <MapPin className='h-3.5 w-3.5' />
                                                {barbershopDatabase.list[0].distance}
                                            </div>
                                        </div>
                                        <h3 className='text-2xl font-bold text-white drop-shadow-lg lg:text-3xl'>
                                            {barbershopDatabase.list[0].name}
                                        </h3>
                                        <p className='text-sm text-white/90'>
                                            {barbershopDatabase.list[0].address}
                                        </p>
                                        <div className='flex items-center gap-2 pt-2'>
                                            <span className='text-lg font-bold text-white'>Mulai dari {barbershopDatabase.list[0].price}</span>
                                            <span className='h-1 w-1 rounded-full bg-white/50' />
                                            <span className='text-sm text-white/80'>{barbershopDatabase.list[0].status}</span>
                                        </div>
                                        <Link href={`/barbershop/${barbershopDatabase.list[0].id}`}>
                                            <Button className='w-full rounded-lg bg-white font-semibold text-primary shadow-lg transition-all hover:bg-white/90 hover:shadow-xl'>
                                                Lihat Detail
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* All Barbershops Grid */}
                <section className='bg-muted/30 px-5 py-8 lg:px-8'>
                    <div className='space-y-5'>
                        <h2 className='text-xl font-bold tracking-tight lg:text-2xl'>
                            Semua Barbershop
                        </h2>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {barbershopDatabase.list.slice(1).map((shop) => (
                            <div
                                key={shop.id}
                                className='group overflow-hidden rounded-xl border border-border/50 bg-card text-card-foreground shadow-sm transition-all hover:-translate-y-1 hover:shadow-md'
                            >
                                <div className='relative aspect-[5/4] w-full overflow-hidden sm:aspect-[4/3] xl:aspect-[16/9]'>
                                    <div
                                        className='absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105'
                                        style={{
                                            backgroundImage: `url(${shop.heroImage})`,
                                        }}
                                    />
                                    <div className='absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent' />
                                    <div className='absolute inset-x-3 top-3 flex items-center justify-between'>
                                        <span className='inline-flex items-center gap-1.5 rounded-md bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm'>
                                            ⭐ {shop.rating}
                                            <span className='font-normal text-white/80'>
                                                ({shop.ratingCount})
                                            </span>
                                        </span>
                                        <button
                                            aria-label='Tambah ke favorit'
                                            className='inline-flex h-8 w-8 items-center justify-center rounded-md bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60'
                                        >
                                            <Heart className='h-3.5 w-3.5' />
                                        </button>
                                    </div>
                                </div>

                                <div className='space-y-4 p-4'>
                                    <div className='space-y-2'>
                                        <h3 className='text-base font-semibold tracking-tight text-card-foreground line-clamp-1'>
                                            {shop.name}
                                        </h3>
                                        <p className='text-xs leading-relaxed text-muted-foreground line-clamp-1'>
                                            {shop.address} • {shop.distance}
                                        </p>
                                        <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                                            <span className='font-semibold text-foreground'>
                                                Mulai dari {shop.price}
                                            </span>
                                            <span className='h-1 w-1 rounded-full bg-muted-foreground/40' />
                                            <span className='text-muted-foreground'>
                                                {shop.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='flex flex-wrap gap-1.5'>
                                        {shop.services.map((service) => (
                                            <span
                                                key={service}
                                                className='rounded-md bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground'
                                            >
                                                {service}
                                            </span>
                                        ))}
                                    </div>

                                    <Link href={`/barbershop/${shop.id}`}>
                                        <Button className='w-full justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow'>
                                            Lihat detail
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </PageShell>
    );
}
