"use client";

import Link from "next/link";
import {
    ArrowRight,
    Banknote,
    Globe2,
    Layers,
    LineChart,
    MapPin,
    ShieldCheck,
    Ticket,
    Users,
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

const summaryCards = [
    {
        label: "Total user aktif",
        value: "128.420",
        helper: "+2.4% vs minggu lalu",
        icon: Users,
    },
    {
        label: "Barbershop terverifikasi",
        value: "432",
        helper: "12 menunggu approval",
        icon: ShieldCheck,
    },
    {
        label: "Transaksi 24 jam",
        value: "Rp 742 jt",
        helper: "Fee 10% ≈ Rp 74 jt",
        icon: Banknote,
    },
    {
        label: "Ticket support terbuka",
        value: "56 tiket",
        helper: "44% SLA < 1 jam",
        icon: Ticket,
    },
] as const;

const regionStats = [
    { region: "Jabodetabek", booking: 1_820, growth: "+8%" },
    { region: "Bandung Raya", booking: 640, growth: "+5%" },
    { region: "Surabaya", booking: 510, growth: "+2%" },
    { region: "Bali", booking: 210, growth: "-3%" },
] as const;

const quickActions = [
    {
        title: "Verifikasi owner baru",
        description: "Cek dokumen, NPWP, dan legalitas usaha.",
        href: "/admin/barbershops",
    },
    {
        title: "Audit transaksi digital",
        description: "Pantau payment gateway, refund, dan fee 10%.",
        href: "/admin/transaksi",
    },
    {
        title: "Kelola banner promo",
        description: "Publish kampanye nasional / event lokal.",
        href: "/admin/cms",
    },
] as const;

export default function AdminDashboardPage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-3'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='flex items-center gap-4'>
                            <Avatar className='h-14 w-14 border-2 border-primary/40 shadow-lg'>
                                <AvatarImage
                                    src='/placeholder.jpg'
                                    alt='TrimTime Admin'
                                />
                                <AvatarFallback className='bg-primary/10 text-base font-semibold text-primary'>
                                    AD
                                </AvatarFallback>
                            </Avatar>
                            <div className='space-y-1.5'>
                                <div className='flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground'>
                                    <Badge
                                        variant='outline'
                                        className='border-border/60 bg-muted/20 text-[9px] font-semibold uppercase tracking-[0.3em]'
                                    >
                                        Admin TrimTime
                                    </Badge>
                                    <Badge
                                        variant='outline'
                                        className='border-border/60 bg-muted/20 text-[9px] font-semibold uppercase tracking-[0.3em]'
                                    >
                                        Platform Ops
                                    </Badge>
                                </div>
                                <p className='text-xs text-muted-foreground'>
                                    Tim platform & keamanan
                                </p>
                                <h1 className='text-3xl font-bold tracking-tight text-foreground lg:text-4xl'>
                                    Dashboard Global
                                </h1>
                                <div className='flex flex-wrap gap-3 text-xs text-muted-foreground'>
                                    <span className='inline-flex items-center gap-1'>
                                        <MapPin className='h-3.5 w-3.5 text-primary' />
                                        34 provinsi terliput
                                    </span>
                                    <span className='inline-flex items-center gap-1'>
                                        <Globe2 className='h-3.5 w-3.5 text-primary' />
                                        Infrastruktur Multi-region
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 rounded-2xl border border-border/40 bg-background/70 p-4 text-sm shadow-sm'>
                            <p className='text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground'>
                                Status sistem
                            </p>
                            <p className='text-2xl font-bold text-foreground'>
                                All services operational
                            </p>
                            <div className='flex flex-wrap gap-2'>
                                <Button
                                    variant='outline'
                                    className='border-border/60'
                                    asChild
                                >
                                    <Link href='/admin/keamanan'>
                                        Lihat log keamanan
                                    </Link>
                                </Button>
                                <Button asChild>
                                    <Link href='/admin/support'>
                                        Buka tiket prioritas
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                        {summaryCards.map(
                            ({ label, value, helper, icon: Icon }) => (
                                <Card
                                    key={label}
                                    className='border-border/50 shadow-sm'
                                >
                                    <CardHeader className='flex flex-row items-start justify-between gap-3'>
                                        <div>
                                            <CardDescription className='text-xs uppercase tracking-widest'>
                                                {label}
                                            </CardDescription>
                                            <CardTitle className='text-3xl font-bold'>
                                                {value}
                                            </CardTitle>
                                        </div>
                                        <span className='flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                                            <Icon className='h-5 w-5' />
                                        </span>
                                    </CardHeader>
                                    <CardContent>
                                        <p className='text-xs font-semibold text-emerald-600'>
                                            {helper}
                                        </p>
                                    </CardContent>
                                </Card>
                            )
                        )}
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-3'>
                <div className='grid gap-5 lg:grid-cols-[1.4fr_1fr]'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                            <div>
                                <CardTitle className='text-xl font-semibold'>
                                    Booking per wilayah
                                </CardTitle>
                                <CardDescription>
                                    Monitoring real-time per region/kota.
                                </CardDescription>
                            </div>
                            <Button
                                variant='outline'
                                className='border-border/60 gap-2'
                                asChild
                            >
                                <Link href='/admin/analytics'>
                                    <LineChart className='h-4 w-4' />
                                    Lihat insight
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            {regionStats.map((stat) => (
                                <div
                                    key={stat.region}
                                    className='rounded-xl border border-border/40 bg-muted/15 p-4'
                                >
                                    <div className='flex items-center justify-between text-sm'>
                                        <p className='font-semibold text-foreground'>
                                            {stat.region}
                                        </p>
                                        <Badge
                                            variant='outline'
                                            className='border-border/40 text-[10px] uppercase tracking-widest text-muted-foreground'
                                        >
                                            {stat.growth}
                                        </Badge>
                                    </div>
                                    <div className='mt-2 text-sm text-muted-foreground'>
                                        {stat.booking} booking / minggu
                                    </div>
                                    <Progress
                                        className='mt-3'
                                        value={Math.min(100, stat.booking / 20)}
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Quick action
                            </CardTitle>
                            <CardDescription>
                                Tugas tim platform yang sering diakses.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            {quickActions.map((item) => (
                                <div
                                    key={item.title}
                                    className='rounded-xl border border-border/40 bg-background/70 p-4'
                                >
                                    <p className='text-sm font-semibold text-foreground'>
                                        {item.title}
                                    </p>
                                    <p className='text-xs text-muted-foreground'>
                                        {item.description}
                                    </p>
                                    <Button
                                        variant='link'
                                        className='px-0 text-xs font-semibold text-primary'
                                        asChild
                                    >
                                        <Link href={item.href}>
                                            Buka panel
                                            <ArrowRight className='ml-1 h-3.5 w-3.5' />
                                        </Link>
                                    </Button>
                                </div>
                            ))}
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground'>
                                <p className='font-semibold text-primary flex items-center gap-2'>
                                    <Layers className='h-4 w-4' />
                                    RBAC aktif
                                </p>
                                <p>
                                    Role admin bisa dibagi (ops, finance,
                                    security) lewat menu keamanan.
                                </p>
                                <Button size='sm' className='mt-3' asChild>
                                    <Link href='/admin/keamanan'>
                                        Atur role & akses
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                        <div>
                            <CardTitle className='text-xl font-semibold'>
                                Monitoring transaksi digital
                            </CardTitle>
                            <CardDescription>
                                Fee 10%, refund, dan sengketa dalam 24 jam
                                terakhir.
                            </CardDescription>
                        </div>
                        <Button
                            variant='outline'
                            className='border-border/60'
                            asChild
                        >
                            <Link href='/admin/transaksi'>
                                Lihat detail transaksi
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent className='grid gap-4 md:grid-cols-3'>
                        {[
                            {
                                label: "Transaksi sukses",
                                value: "5.412",
                                helper: "Fee Rp 54,1 jt",
                            },
                            {
                                label: "Refund & sengketa",
                                value: "32 kasus",
                                helper: "20 selesai, 12 berjalan",
                            },
                            {
                                label: "Payment gateway",
                                value: "100% up",
                                helper: "No throttling",
                            },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className='rounded-xl border border-border/40 bg-muted/15 p-4 text-sm text-muted-foreground'
                            >
                                <p className='text-xs uppercase tracking-widest'>
                                    {item.label}
                                </p>
                                <p className='text-2xl font-bold text-foreground'>
                                    {item.value}
                                </p>
                                <p>{item.helper}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </main>
        </PageShell>
    );
}
