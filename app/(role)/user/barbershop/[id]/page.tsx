import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
    MapPin,
    Share2,
    ShieldCheck,
    Star,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { barbershopDatabase } from "@/data/barbershops";

export default async function BarbershopDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const barbershop = barbershopDatabase.details[id];

    if (!barbershop) {
        return (
            <PageShell
                background='plain'
                contentClassName='items-center justify-center text-center'
            >
                <div className='space-y-4'>
                    <p className='text-sm text-muted-foreground'>
                        Barbershop tidak ditemukan.
                    </p>
                    <Link
                        href='/homepage'
                        className='inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary transition hover:bg-accent'
                    >
                        <ArrowLeft className='h-4 w-4' />
                        Kembali ke beranda
                    </Link>
                </div>
            </PageShell>
        );
    }

    const heroImage = barbershop.photos[0];
    const comments = barbershop.comments;

    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <main className='flex flex-col'>
                <section className='relative '>
                    <div className='relative h-[280px] lg:h-[400px] w-full overflow-hidden lg:rounded-t-2xl'>
                        <div
                            className='absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105'
                            style={{ backgroundImage: `url(${heroImage})` }}
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />

                        {/* Mobile Navigation */}
                        <div className='absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-5 lg:hidden'>
                            <Link
                                href='/homepage'
                                className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur-md transition-all hover:bg-background'
                            >
                                <ArrowLeft className='h-4 w-4' />
                            </Link>
                            <button className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur-md transition-all hover:bg-background'>
                                <Share2 className='h-4 w-4' />
                            </button>
                        </div>

                        {/* Hero Content */}
                        <div className='absolute inset-x-0 bottom-0 p-5 lg:p-8'>
                            <div className='space-y-3'>
                                <div className='inline-flex items-center gap-2 rounded-full bg-primary/90 px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg backdrop-blur-sm'>
                                    <ShieldCheck className='h-3.5 w-3.5' />
                                    Premium Verified
                                </div>
                                <h1 className='text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-lg'>
                                    {barbershop.name}
                                </h1>
                                <div className='flex flex-wrap items-center gap-2'>
                                    <div className='inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-md'>
                                        <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                                        <span className='font-bold'>
                                            {barbershop.rating}
                                        </span>
                                        <span className='text-white/80'>
                                            ({barbershop.reviewCount})
                                        </span>
                                    </div>
                                    <div className='inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-md'>
                                        <CheckCircle2 className='h-4 w-4' />
                                        {barbershop.status}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Bar - Sticky on Desktop */}
                    <div className='border-b border-border/50 bg-background/95 backdrop-blur-sm lg:sticky lg:top-0 lg:z-20'>
                        <div className='flex items-center gap-4 overflow-x-auto px-5 py-4 lg:px-8'>
                            <div className='flex items-center gap-2 text-sm'>
                                <MapPin className='h-4 w-4 text-primary' />
                                <span className='font-medium text-foreground whitespace-nowrap'>
                                    {barbershop.address}
                                </span>
                            </div>
                            <div className='h-4 w-px bg-border' />
                            <div className='flex items-center gap-2 text-sm'>
                                <Clock className='h-4 w-4 text-primary' />
                                <span className='font-medium text-foreground whitespace-nowrap'>
                                    {barbershop.services[0]?.duration ?? "-"}
                                </span>
                            </div>
                            <div className='ml-auto hidden lg:flex items-center gap-2'>
                                <button className='inline-flex items-center gap-2 rounded-lg border border-border/50 bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent'>
                                    <Share2 className='h-4 w-4' />
                                    Bagikan
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Description Card */}
                    <div className='px-5 py-6 lg:px-8'>
                        <div className='space-y-4'>
                            <p className='text-sm leading-relaxed text-muted-foreground lg:text-base'>
                                {barbershop.description}
                            </p>
                            <div className='flex flex-wrap gap-2'>
                                {barbershop.benefits.map((benefit) => (
                                    <span
                                        key={benefit}
                                        className='inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary ring-1 ring-primary/10'
                                    >
                                        <ShieldCheck className='h-3.5 w-3.5' />
                                        {benefit}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section className='space-y-5  py-6 '>
                    <div className='flex items-end justify-between'>
                        <div>
                            <h2 className='text-xl font-bold tracking-tight lg:text-2xl'>
                                Layanan Tersedia
                            </h2>
                            <p className='mt-1 text-sm text-muted-foreground'>
                                Pilih paket yang sesuai kebutuhanmu
                            </p>
                        </div>
                        <span className='text-xs font-medium text-muted-foreground'>
                            Harga sudah termasuk pajak
                        </span>
                    </div>
                    <div className='grid gap-4 lg:grid-cols-2'>
                        {barbershop.services.map((service, index) => (
                            <div
                                key={service.name}
                                className='group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-card to-muted/20 p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/30'
                            >
                                <div className='absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/5 blur-2xl transition-transform group-hover:scale-150' />
                                <div className='relative space-y-4'>
                                    <div className='flex items-start justify-between gap-3'>
                                        <div className='flex-1 space-y-2'>
                                            <div className='inline-flex items-center gap-2'>
                                                <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary'>
                                                    {index + 1}
                                                </span>
                                                <h3 className='text-base font-bold tracking-tight text-foreground'>
                                                    {service.name}
                                                </h3>
                                            </div>
                                            <p className='text-sm leading-relaxed text-muted-foreground'>
                                                {service.description}
                                            </p>
                                        </div>
                                        <div className='flex flex-col items-end gap-1'>
                                            <span className='text-2xl font-bold tracking-tight text-primary'>
                                                {service.price}
                                            </span>
                                            <span className='text-xs text-muted-foreground'>
                                                per sesi
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap items-center gap-3 pt-2 border-t border-border/50'>
                                        <div className='inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground'>
                                            <Clock className='h-4 w-4 text-primary' />
                                            {service.duration}
                                        </div>
                                        <div className='h-1 w-1 rounded-full bg-border' />
                                        <div className='inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground'>
                                            <CheckCircle2 className='h-4 w-4 text-primary' />
                                            {service.allowBarberChoice
                                                ? "Pilih barber"
                                                : "Auto assign"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <section className='space-y-5 bg-muted/30 px-5 py-8 lg:px-8'>
                    <div>
                        <h2 className='text-xl font-bold tracking-tight lg:text-2xl'>
                            Tim Barber Profesional
                        </h2>
                        <p className='mt-1 text-sm text-muted-foreground'>
                            Dipilih dan terverifikasi untuk kualitas terbaik
                        </p>
                    </div>
                    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                        {barbershop.barbers.map((barber) => (
                            <div
                                key={barber.id}
                                className='group relative overflow-hidden rounded-xl border border-border/50 bg-card p-5 shadow-sm transition-all hover:shadow-lg hover:border-primary/30'
                            >
                                <div className='absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/5 blur-2xl transition-transform group-hover:scale-150' />
                                <div className='relative space-y-4'>
                                    <div className='flex items-start gap-4'>
                                        <Avatar className='h-16 w-16 border-2 border-primary/20 shadow-md ring-2 ring-background'>
                                            <AvatarImage
                                                src={barber.avatar}
                                                alt={barber.name}
                                            />
                                            <AvatarFallback className='bg-primary/10 text-primary text-lg font-bold'>
                                                {barber.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='flex-1 space-y-1'>
                                            <h3 className='font-bold tracking-tight text-foreground'>
                                                {barber.name}
                                            </h3>
                                            <div className='inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-2 py-0.5'>
                                                <Star className='h-3.5 w-3.5 fill-yellow-500 text-yellow-500' />
                                                <span className='text-xs font-bold text-yellow-700 dark:text-yellow-400'>
                                                    {barber.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='space-y-2 text-sm'>
                                        <div className='flex items-center gap-2 text-muted-foreground'>
                                            <CheckCircle2 className='h-4 w-4 text-primary' />
                                            <span className='font-medium'>
                                                {barber.experience}
                                            </span>
                                        </div>
                                        <div className='flex flex-wrap gap-1'>
                                            {barber.specialties.map(
                                                (specialty) => (
                                                    <span
                                                        key={specialty}
                                                        className='rounded-md bg-primary/5 px-2 py-1 text-xs font-medium text-primary'
                                                    >
                                                        {specialty}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <Button className='w-full rounded-lg bg-primary font-medium shadow-sm transition-all hover:bg-primary/90 hover:shadow'>
                                        Pilih Barber
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <section className='space-y-5 px-5 py-6 lg:px-8'>
                    <div>
                        <h2 className='text-xl font-bold tracking-tight lg:text-2xl'>
                            Galeri Barbershop
                        </h2>
                        <p className='mt-1 text-sm text-muted-foreground'>
                            Lihat suasana dan hasil karya kami
                        </p>
                    </div>
                    <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
                        {barbershop.photos.map((photo, index) => (
                            <div
                                key={photo + index}
                                className={`group relative overflow-hidden rounded-xl border border-border/50 shadow-sm transition-all hover:shadow-lg ${
                                    index === 0
                                        ? "col-span-2 row-span-2 h-64 lg:h-80"
                                        : "h-32 lg:h-40"
                                }`}
                            >
                                <div
                                    className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110'
                                    style={{ backgroundImage: `url(${photo})` }}
                                />
                                <div className='absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20' />
                            </div>
                        ))}
                    </div>
                </section>
                <section className='space-y-5 bg-muted/30 px-5 py-8 lg:px-8'>
                    <div className='flex items-end justify-between'>
                        <div>
                            <h2 className='text-xl font-bold tracking-tight lg:text-2xl'>
                                Ulasan Pelanggan
                            </h2>
                            <p className='mt-1 text-sm text-muted-foreground'>
                                {barbershop.reviewCount} review dari pelanggan
                                puas
                            </p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Star className='h-5 w-5 fill-yellow-500 text-yellow-500' />
                            <span className='text-2xl font-bold tracking-tight'>
                                {barbershop.rating}
                            </span>
                        </div>
                    </div>
                    <div className='grid gap-4 lg:grid-cols-2'>
                        {comments.map((comment) => (
                            <div
                                key={comment.id}
                                className='group relative overflow-hidden rounded-xl border border-border/50 bg-card p-5 shadow-sm transition-all hover:shadow-md'
                            >
                                <div className='absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/5 blur-2xl' />
                                <div className='relative space-y-3'>
                                    <div className='flex items-start justify-between gap-3'>
                                        <div className='flex items-center gap-3'>
                                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary'>
                                                {comment.author.charAt(0)}
                                            </div>
                                            <div>
                                                <p className='font-bold tracking-tight text-foreground'>
                                                    {comment.author}
                                                </p>
                                                <p className='text-xs text-muted-foreground'>
                                                    {comment.date}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-2.5 py-1'>
                                            <Star className='h-3.5 w-3.5 fill-yellow-500 text-yellow-500' />
                                            <span className='text-sm font-bold text-yellow-700 dark:text-yellow-400'>
                                                {comment.rating.toFixed(1)}
                                            </span>
                                        </div>
                                    </div>
                                    <p className='text-sm leading-relaxed text-muted-foreground'>
                                        &ldquo;{comment.content}&rdquo;
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <div className='sticky bottom-0 border-t border-border/50 bg-background/95 p-5 backdrop-blur-sm lg:px-8'>
                    <div className='flex items-center gap-3'>
                        <div className='hidden flex-1 lg:block'>
                            <p className='text-sm font-medium text-muted-foreground'>
                                Mulai dari{" "}
                                <span className='text-lg font-bold text-primary'>
                                    {barbershop.services[0]?.price}
                                </span>
                            </p>
                            <p className='text-xs text-muted-foreground'>
                                Harga sudah termasuk pajak
                            </p>
                        </div>
                        <Link
                            href={`/booking/${barbershop.id}`}
                            className='flex-1 lg:flex-none'
                        >
                            <Button className='w-full justify-center gap-2 rounded-lg bg-primary px-8 py-6 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl lg:py-3'>
                                Booking Sekarang
                                <ArrowRight className='h-5 w-5' />
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </PageShell>
    );
}
