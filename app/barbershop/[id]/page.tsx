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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
            <PageShell background='plain' contentClassName='items-center justify-center text-center'>
                <div className='space-y-4'>
                    <p className='text-sm text-muted-foreground'>Barbershop tidak ditemukan.</p>
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
        <PageShell background='hero' contentClassName='gap-6'>

            <main className='flex flex-col gap-6'>
                <section className='space-y-4'>
                    <div className='relative h-[360px] w-full overflow-hidden'>
                        <div
                            className='pointer-events-none absolute inset-0 bg-cover bg-center'
                            style={{ backgroundImage: `url(${heroImage})` }}
                        />
                        <div className='pointer-events-none absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/10 to-transparent' />
                        <div className='absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-6 text-foreground/90 z-10'>
                            <Link
                                href='/homepage'
                                className='inline-flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-2 text-xs text-muted-foreground backdrop-blur transition hover:bg-accent'
                            >
                                <ArrowLeft className='h-4 w-4' />
                                Home
                            </Link>
                            <span className='rounded-full border border-border bg-muted px-3 py-2 text-xs text-muted-foreground'>
                                #{id}
                            </span>
                        </div>
                        <div className='relative z-10 flex h-full flex-col justify-between p-5 pt-24'>
                            <div className='inline-flex items-center gap-2 self-start rounded-full bg-background/20 px-3 py-1 text-xs text-primary-foreground/80'>
                                <ShieldCheck className='h-4 w-4' />
                                Barber premium pilihan editor
                            </div>
                            <div className='space-y-3'>
                                <h1 className='text-2xl font-semibold leading-tight text-primary-foreground'>
                                    {barbershop.name}
                                </h1>
                                <div className='flex flex-wrap items-center justify-between gap-3 text-xs text-primary-foreground/80'>
                                    <span className='inline-flex items-center gap-2 rounded-full bg-background/20 px-3 py-1'>
                                        <CheckCircle2 className='h-3.5 w-3.5' />
                                        {barbershop.status}
                                    </span>
                                    <button className='inline-flex items-center gap-2 rounded-full bg-background/15 px-3 py-1 text-xs font-medium text-primary-foreground transition hover:bg-background/30'>
                                        <Share2 className='h-3.5 w-3.5' />
                                        Bagikan
                                    </button>
                                </div>
                                <div className='flex flex-wrap items-center gap-2 text-xs text-primary-foreground/80'>
                                    <span className='inline-flex items-center gap-1 rounded-full bg-background/20 px-3 py-1'>
                                        <MapPin className='h-3.5 w-3.5' />
                                        {barbershop.address}
                                    </span>
                                    <span className='inline-flex items-center gap-1 rounded-full bg-background/20 px-3 py-1'>
                                        <Star className='h-3.5 w-3.5 text-primary-foreground' />
                                        {barbershop.rating}
                                    </span>
                                    <span className='inline-flex items-center gap-1 rounded-full bg-background/20 px-3 py-1'>
                                        <Clock className='h-3.5 w-3.5' />
                                        {barbershop.services[0]?.duration ?? "-"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Card className='border-none bg-card text-card-foreground shadow-xl'>
                        <CardContent className='space-y-3 p-5 text-sm text-muted-foreground'>
                            <p>{barbershop.description}</p>
                            <div className='flex flex-wrap gap-2 text-xs text-muted-foreground'>
                                {barbershop.benefits.map((benefit) => (
                                    <span
                                        key={benefit}
                                        className='inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1'
                                    >
                                        <ShieldCheck className='h-3.5 w-3.5 text-primary' />
                                        {benefit}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <section className='space-y-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-lg font-semibold'>Pilih layanan</h2>
                        <span className='text-xs text-muted-foreground'>
                            Harga sudah termasuk pajak
                        </span>
                    </div>
                    <Card className='border-none bg-card text-card-foreground shadow-xl'>
                        <CardContent className='space-y-3 p-4'>
                            {barbershop.services.map((service) => (
                                <div
                                    key={service.name}
                                    className='rounded-2xl border border-border p-4'
                                >
                                    <div className='flex items-start justify-between gap-3'>
                                        <div className='space-y-1'>
                                            <p className='text-sm font-semibold text-card-foreground'>
                                                {service.name}
                                            </p>
                                            <p className='text-xs text-muted-foreground'>
                                                {service.description}
                                            </p>
                                        </div>
                                        <span className='inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-semibold text-card-foreground'>
                                            {service.price}
                                        </span>
                                    </div>
                                    <div className='mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground'>
                                        <span className='inline-flex items-center gap-1'>
                                            <Clock className='h-3.5 w-3.5' />
                                            {service.duration}
                                        </span>
                                        <span className='inline-flex items-center gap-1'>
                                            <CheckCircle2 className='h-3.5 w-3.5 text-primary' />
                                            {service.allowBarberChoice
                                                ? "Bisa pilih barber favorit"
                                                : "Barber ditentukan otomatis"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </section>

                <section className='space-y-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-lg font-semibold'>
                            Barber tersedia
                        </h2>
                        <span className='text-xs text-muted-foreground'>
                            Pilih favoritmu
                        </span>
                    </div>
                    <Card className='border-none bg-card text-card-foreground shadow-xl'>
                        <CardContent className='space-y-3 p-4'>
                            {barbershop.barbers.map((barber) => (
                                <div
                                    key={barber.id}
                                    className='flex items-center gap-3 rounded-2xl border border-border p-4'
                                >
                                    <Avatar className='h-12 w-12 border border-border'>
                                        <AvatarImage src={barber.avatar} alt={barber.name} />
                                        <AvatarFallback>
                                            {barber.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-1 flex-col'>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-sm font-semibold text-card-foreground'>
                                                {barber.name}
                                            </p>
                                            <Badge className='inline-flex items-center gap-1 rounded-full bg-secondary text-secondary-foreground'>
                                                <Star className='h-3.5 w-3.5' />
                                                {barber.rating}
                                            </Badge>
                                        </div>
                                        <p className='text-xs text-muted-foreground'>
                                            Pengalaman {barber.experience}
                                        </p>
                                        <p className='text-xs text-muted-foreground'>
                                            Spesialis:{" "}
                                            {barber.specialties.join(", ")}
                                        </p>
                                    </div>
                                    <Button
                                        size='sm'
                                        className='rounded-full bg-primary text-primary-foreground shadow hover:bg-primary/90'
                                    >
                                        Pilih
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </section>

                <section className='space-y-3 px-5'>
                    <h2 className='text-lg font-semibold'>Galeri barbershop</h2>
                    <div className='grid grid-cols-3 gap-2'>
                        {barbershop.photos.map((photo, index) => (
                            <div
                                key={photo + index}
                                className='relative h-24 overflow-hidden rounded-2xl'
                            >
                                <div
                                    className='absolute inset-0 bg-cover bg-center'
                                    style={{ backgroundImage: `url(${photo})` }}
                                    aria-hidden
                                />
                            </div>
                        ))}
                    </div>
                </section>

                <section className='space-y-4 px-5'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h2 className='text-lg font-semibold'>Review pelanggan</h2>
                            <p className='text-xs text-muted-foreground'>
                                {barbershop.reviewCount} ulasan pelanggan
                            </p>
                        </div>
                    </div>
                    <Card className='border-none bg-card text-card-foreground shadow-xl'>
                        <CardContent className='space-y-4 p-4'>
                            {comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className='rounded-2xl border border-border p-4 text-sm text-muted-foreground'
                                >
                                    <div className='flex items-center justify-between'>
                                        <span className='text-sm font-semibold text-card-foreground'>
                                            {comment.author}
                                        </span>
                                        <span className='text-xs text-muted-foreground'>
                                            {comment.date}
                                        </span>
                                    </div>
                                    <div className='mt-1 flex items-center gap-1 text-xs text-primary'>
                                        <Star className='h-3.5 w-3.5' />
                                        {comment.rating.toFixed(1)}
                                    </div>
                                    <p className='mt-3 text-sm text-card-foreground'>
                                        {comment.content}
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </section>

                <Link href={`/booking/${barbershop.id}`}>
                    <Button className='w-full justify-center gap-2 rounded-2xl bg-primary text-primary-foreground shadow-xl transition hover:bg-primary/90'>
                        Booking sekarang
                        <ArrowRight className='h-4 w-4' />
                    </Button>
                </Link>
            </main>
        </PageShell>
    );
}
