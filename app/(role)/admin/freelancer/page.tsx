"use client";

import Link from "next/link";
import { useCallback } from "react";
import {
    BadgeCheck,
    Ban,
    FileVideo2,
    MapPin,
    Phone,
    RefreshCcw,
    Search,
    Shield,
    Sparkles,
    UserRound,
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
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const statusStyles: Record<string, string> = {
    Pending: "border-amber-500/40 bg-amber-500/10 text-amber-600",
    "Perlu revisi": "border-orange-500/40 bg-orange-500/10 text-orange-600",
    "Butuh review": "border-sky-500/40 bg-sky-500/10 text-sky-600",
    Terverifikasi: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600",
};

type FreelancerSubmission = {
    id: string;
    name: string;
    city: string;
    phone: string;
    email: string;
    expertise: string;
    portfolio: string;
    status: keyof typeof statusStyles;
    note: string;
};

const freelancerSubmissions: readonly FreelancerSubmission[] = [
    {
        id: "freelancer-201",
        name: "Raka Firmansyah",
        city: "Jakarta Selatan",
        phone: "+62 811-2233-9988",
        email: "raka@fadecraft.id",
        expertise: "Fade specialist, hair tattoo",
        portfolio: "https://youtu.be/trimtime-raka",
        status: "Pending",
        note: "Video portofolio lengkap, menunggu verifikasi identitas",
    },
    {
        id: "freelancer-198",
        name: "Salsa Putri",
        city: "Bandung",
        phone: "+62 813-4455-6677",
        email: "salsa@trimstudio.id",
        expertise: "Hair coloring, styling session",
        portfolio: "https://drive.google.com/salsa",
        status: "Butuh review",
        note: "Butuh catatan sertifikasi tambahan",
    },
    {
        id: "freelancer-195",
        name: "Adrian Saputra",
        city: "BSD - Tangerang",
        phone: "+62 812-8899-1123",
        email: "adrian@urbanfade.id",
        expertise: "Premium grooming, home service",
        portfolio: "https://youtu.be/adrian-premium",
        status: "Terverifikasi",
        note: "Approved per 16 Nov, siap live job",
    },
    {
        id: "freelancer-190",
        name: "Ivana Pertiwi",
        city: "Surabaya",
        phone: "+62 811-5566-7788",
        email: "ivana@ivestudio.id",
        expertise: "Bridal hair, session styling",
        portfolio: "https://youtu.be/ivana-showcase",
        status: "Perlu revisi",
        note: "Link video tidak bisa diputar, minta ulang",
    },
] as const;

const quickStats = [
    { label: "Total pendaftar minggu ini", value: "128" },
    { label: "Siap diverifikasi", value: "46 akun" },
    { label: "Terverifikasi bulan ini", value: "74 akun" },
    { label: "Butuh revisi", value: "12 akun" },
] as const;

export default function AdminFreelancerAccountsPage() {
    const handlePlaceholder = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
        },
        []
    );

    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-3'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <Sparkles className='h-4 w-4' />
                                Kurasi Freelancer
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                Verifikasi & aktivasi barber lepas
                            </h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Pantau pendaftaran freelancer dari aplikasi
                                register dan aktifkan akun yang sudah memenuhi
                                standar.
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button asChild className='gap-2'>
                                <Link href='/admin/akun'>
                                    <Shield className='h-4 w-4' />
                                    Kelola barbershop
                                </Link>
                            </Button>
                            <Button
                                variant='outline'
                                className='border-border/60 gap-2'
                            >
                                <RefreshCcw className='h-4 w-4' />
                                Sinkron data freelancer
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-3'>
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    {quickStats.map((stat) => (
                        <Card
                            key={stat.label}
                            className='border-border/50 shadow-sm'
                        >
                            <CardHeader>
                                <CardDescription className='text-xs uppercase tracking-widest'>
                                    {stat.label}
                                </CardDescription>
                                <CardTitle className='text-2xl font-bold'>
                                    {stat.value}
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Pendaftaran freelancer TrimTime
                        </CardTitle>
                        <CardDescription>
                            Saring pendaftar dari halaman register dan lakukan
                            aksi verifikasi, revisi, atau aktivasi akun.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-5'>
                        <div className='flex flex-wrap gap-3'>
                            <Input
                                placeholder='Cari nama, kota, atau email'
                                className='max-w-md border-border/60'
                            />
                            <Button
                                variant='outline'
                                className='gap-2 border-border/60'
                            >
                                <Search className='h-4 w-4' />
                                Filter lanjutan
                            </Button>
                            <Button
                                variant='outline'
                                className='gap-2 border-border/60'
                            >
                                <RefreshCcw className='h-4 w-4' />
                                Tandai sudah dihubungi
                            </Button>
                        </div>

                        <div className='overflow-x-auto'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Freelancer</TableHead>
                                        <TableHead>Domisili</TableHead>
                                        <TableHead>Keahlian utama</TableHead>
                                        <TableHead>Portofolio</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {freelancerSubmissions.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <div className='space-y-1'>
                                                    <p className='font-semibold text-foreground'>
                                                        {item.name}
                                                    </p>
                                                    <div className='flex flex-wrap items-center gap-3 text-xs text-muted-foreground'>
                                                        <span className='inline-flex items-center gap-1'>
                                                            <Phone className='h-3.5 w-3.5 text-primary' />
                                                            {item.phone}
                                                        </span>
                                                        <span className='inline-flex items-center gap-1'>
                                                            <UserRound className='h-3.5 w-3.5 text-primary' />
                                                            {item.email}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className='text-sm text-muted-foreground'>
                                                <span className='inline-flex items-center gap-1'>
                                                    <MapPin className='h-3.5 w-3.5 text-primary' />
                                                    {item.city}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <p className='text-sm text-muted-foreground'>
                                                    {item.expertise}
                                                </p>
                                                <p className='text-xs text-muted-foreground'>
                                                    {item.note}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    asChild
                                                    variant='link'
                                                    className='p-0 text-sm font-semibold text-primary'
                                                >
                                                    <Link
                                                        href={item.portfolio}
                                                        target='_blank'
                                                    >
                                                        Lihat video
                                                        <FileVideo2 className='ml-2 h-4 w-4' />
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant='outline'
                                                    className={`text-[11px] uppercase tracking-widest ${
                                                        statusStyles[
                                                            item.status
                                                        ]
                                                    }`}
                                                >
                                                    {item.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className='flex flex-wrap gap-2 text-xs'>
                                                    <Button
                                                        size='sm'
                                                        variant='outline'
                                                        onClick={
                                                            handlePlaceholder
                                                        }
                                                    >
                                                        <BadgeCheck className='mr-2 h-4 w-4 text-primary' />
                                                        Aktifkan
                                                    </Button>
                                                    <Button
                                                        size='sm'
                                                        variant='outline'
                                                        onClick={
                                                            handlePlaceholder
                                                        }
                                                    >
                                                        <Ban className='mr-2 h-4 w-4 text-destructive' />
                                                        Revisi
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </PageShell>
    );
}
