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
        <PageShell background='mesh' contentClassName='gap-8'>
            <header className='rounded-3xl border border-border bg-card/90 px-6 py-5 shadow-sm'>
                <div className='flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-3'>
                        <Avatar className='h-12 w-12 border border-muted'>
                            <AvatarImage src='/placeholder.jpg' alt='Rizky' />
                            <AvatarFallback>RZ</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                            <p className='text-sm font-semibold text-foreground'>
                                Hi, Rizky
                            </p>
                            <span className='inline-flex items-center gap-1 text-xs text-muted-foreground'>
                                <MapPin className='h-4 w-4' />
                                SCBD, Jakarta
                            </span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className='relative inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-muted text-muted-foreground backdrop-blur transition hover:bg-accent'>
                                    <Bell className='h-5 w-5' />
                                    {mockNotifications.length > 0 ? (
                                        <span className='absolute top-1 right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground shadow-sm'>
                                            <span className='sr-only'>
                                                Ada notifikasi baru
                                            </span>
                                            {mockNotifications.length}
                                        </span>
                                    ) : null}
                                </button>
                            </DialogTrigger>
                            <DialogContent className='max-w-md rounded-3xl border border-border bg-card p-0 text-left'>
                                <DialogHeader className='border-b border-border px-5 py-4 text-left'>
                                    <DialogTitle className='flex items-center gap-2 text-base font-semibold text-card-foreground'>
                                        <Sparkles className='h-4 w-4 text-primary' />
                                        Notifikasi terbaru
                                    </DialogTitle>
                                    <DialogDescription className='text-xs'>
                                        Reminder booking, promo, dan update
                                        loyalty kamu.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className='space-y-3 px-5 py-4 text-sm text-muted-foreground'>
                                    {mockNotifications.map((item) => (
                                        <div
                                            key={item.id}
                                            className='rounded-2xl border border-border p-4'
                                        >
                                            <div className='flex items-center justify-between text-xs text-muted-foreground'>
                                                <span className='inline-flex items-center gap-2 font-semibold text-card-foreground'>
                                                    <Filter className='h-3.5 w-3.5 text-primary' />
                                                    {item.title}
                                                </span>
                                                <span>{item.time}</span>
                                            </div>
                                            <p className='mt-3 text-sm text-card-foreground'>
                                                {item.message}
                                            </p>
                                            <div className='mt-3 flex items-center justify-end gap-2 text-xs'>
                                                <Button
                                                    variant='ghost'
                                                    size='sm'
                                                    className='rounded-full px-3 py-1 text-xs text-primary'
                                                >
                                                    Tandai dibaca
                                                </Button>
                                                <Link href='/orders'>
                                                    <Button
                                                        size='sm'
                                                        className='rounded-full px-3 py-1 text-xs'
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
                        <button className='inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-muted text-muted-foreground backdrop-blur transition hover:bg-accent'>
                            <Heart className='h-5 w-5' />
                        </button>
                    </div>
                </div>
            </header>

            <main className='flex flex-col gap-6'>
                <section className='space-y-2'>
                    <button
                        onClick={() => router.push("/search")}
                        className='group flex h-12 w-full items-center gap-3 rounded-2xl border border-transparent bg-card px-4 text-left text-sm text-muted-foreground shadow-lg transition hover:border-border hover:text-foreground'
                    >
                        <Search className='h-4 w-4 text-muted-foreground transition group-hover:text-primary' />
                        <span>Cari barbershop atau layanan…</span>
                    </button>
                </section>

                <section className='space-y-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-lg font-semibold'>
                            Barbershop terdekat
                        </h2>
                        <Link
                            href='#'
                            className='text-xs text-primary underline-offset-4 hover:underline'
                        >
                            Lihat semua
                        </Link>
                    </div>

                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                        {barbershopDatabase.list.map((shop) => (
                            <div
                                key={shop.id}
                                className='group overflow-hidden rounded-3xl bg-card text-card-foreground shadow-xl transition hover:-translate-y-1'
                            >
                                <div className='relative aspect-[5/4] w-full overflow-hidden sm:aspect-[4/3] xl:aspect-[16/9]'>
                                    <div
                                        className='absolute inset-0 bg-cover bg-center'
                                        style={{
                                            backgroundImage: `url(${shop.heroImage})`,
                                        }}
                                    />
                                    <div className='absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent' />
                                    <div className='absolute inset-x-3 top-3 flex items-center justify-between'>
                                        <span className='inline-flex items-center gap-1 rounded-full bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur'>
                                            ⭐ {shop.rating}
                                            <span className='font-normal text-white/70'>
                                                ({shop.ratingCount})
                                            </span>
                                        </span>
                                        <button
                                            aria-label='Tambah ke favorit'
                                            className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition hover:bg-black/50'
                                        >
                                            <Heart className='h-4 w-4' />
                                        </button>
                                    </div>
                                </div>

                                <div className='space-y-3 p-4'>
                                    <div className='space-y-1'>
                                        <h3 className='text-base font-semibold text-card-foreground'>
                                            {shop.name}
                                        </h3>
                                        <p className='text-xs text-muted-foreground'>
                                            {shop.address} • {shop.distance}
                                        </p>
                                        <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                                            <span className='font-medium text-foreground'>
                                                Mulai dari {shop.price}
                                            </span>
                                            <span className='h-1 w-1 rounded-full bg-border' />
                                            <span className='text-secondary-foreground'>
                                                {shop.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='flex flex-wrap gap-2'>
                                        {shop.services.map((service) => (
                                            <span
                                                key={service}
                                                className='rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground'
                                            >
                                                {service}
                                            </span>
                                        ))}
                                    </div>

                                    <Link href={`/barbershop/${shop.id}`}>
                                        <Button className='w-full justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90'>
                                            Lihat detail
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </PageShell>
    );
}
