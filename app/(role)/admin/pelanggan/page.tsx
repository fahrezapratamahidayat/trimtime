"use client";

import Link from "next/link";
import { useCallback } from "react";
import {
    BadgeCheck,
    Ban,
    Filter,
    Gift,
    Mail,
    MessageCircle,
    Phone,
    Search,
    Sparkles,
    Users,
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
    Aktif: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600",
    "Butuh follow-up": "border-amber-500/40 bg-amber-500/10 text-amber-600",
    Suspended: "border-destructive/40 bg-destructive/10 text-destructive",
};

const quickStats = [
    { label: "Total pelanggan aktif", value: "128.420" },
    { label: "Loyalty tier Gold", value: "8.432 user" },
    { label: "User baru 30 hari", value: "+12.840" },
    { label: "Tiket support terbuka", value: "56 tiket" },
] as const;

type CustomerRecord = {
    id: string;
    name: string;
    tier: string;
    city: string;
    lastBooking: string;
    lifetimeValue: string;
    status: keyof typeof statusStyles;
    email: string;
    phone: string;
    note: string;
};

const customerRecords: readonly CustomerRecord[] = [
    {
        id: "user-98231",
        name: "Rizky Pratama",
        tier: "Gold",
        city: "Jakarta Selatan",
        lastBooking: "2 hari lalu",
        lifetimeValue: "Rp 4,2 jt",
        status: "Aktif",
        email: "rizky@trimtime.id",
        phone: "+62 812-8899-1123",
        note: "Rutin booking home service fade haircut",
    },
    {
        id: "user-98110",
        name: "Ivana Pertiwi",
        tier: "Platinum",
        city: "Bandung",
        lastBooking: "5 hari lalu",
        lifetimeValue: "Rp 7,8 jt",
        status: "Aktif",
        email: "ivana@trimtime.id",
        phone: "+62 811-5566-7788",
        note: "Sering redeem loyalty point coloring",
    },
    {
        id: "user-97754",
        name: "Adrian Saputra",
        tier: "Silver",
        city: "BSD City",
        lastBooking: "19 hari lalu",
        lifetimeValue: "Rp 2,1 jt",
        status: "Butuh follow-up",
        email: "adrian@trimtime.id",
        phone: "+62 813-4455-6677",
        note: "Belum booking ulang setelah cancel",
    },
    {
        id: "user-97301",
        name: "Salsa Putri",
        tier: "Gold",
        city: "Surabaya",
        lastBooking: "34 hari lalu",
        lifetimeValue: "Rp 1,8 jt",
        status: "Suspended",
        email: "salsa@trimtime.id",
        phone: "+62 811-7700-4511",
        note: "Akun dibekukan (chargeback) - butuh audit",
    },
] as const;

const loyaltyHighlights = [
    {
        title: "Top referrer",
        value: "312 user",
        helper: "Mengajak teman dalam 90 hari",
    },
    {
        title: "Redeem reward bulan ini",
        value: "1.420 voucher",
        helper: "+18% dibanding bulan lalu",
    },
    {
        title: "User rawan churn",
        value: "842 akun",
        helper: "Tidak booking > 45 hari",
    },
] as const;

export default function AdminCustomersPage() {
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
                                Manajemen Pelanggan
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                Segmentasi & loyalty member
                            </h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Pantau perilaku pelanggan TrimTime, tindak
                                lanjuti user rawan churn, dan catat histori
                                komunikasi.
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button asChild className='gap-2'>
                                <Link href='/admin/support'>
                                    <MessageCircle className='h-4 w-4' />
                                    Kirim broadcast support
                                </Link>
                            </Button>
                            <Button
                                variant='outline'
                                className='border-border/60 gap-2'
                            >
                                <Filter className='h-4 w-4' />
                                Segmentasi lanjutan
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
                            Insight loyalty & referral
                        </CardTitle>
                        <CardDescription>
                            Pantau performa program loyalty untuk menentukan
                            kampanye hadiah berikutnya.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-4 sm:grid-cols-3'>
                        {loyaltyHighlights.map((item) => (
                            <div
                                key={item.title}
                                className='space-y-2 rounded-2xl border border-border/40 bg-muted/30 p-4'
                            >
                                <div className='flex items-center justify-between text-xs text-muted-foreground'>
                                    <span>{item.title}</span>
                                    <Gift className='h-4 w-4 text-primary' />
                                </div>
                                <p className='text-2xl font-bold text-foreground'>
                                    {item.value}
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                    {item.helper}
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Daftar pelanggan TrimTime
                        </CardTitle>
                        <CardDescription>
                            Catat tindakan follow-up atau pembekuan akun
                            langsung dari panel ini.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-5'>
                        <div className='flex flex-wrap gap-3'>
                            <Input
                                placeholder='Cari nama / email / kota'
                                className='max-w-md border-border/60'
                            />
                            <Button
                                variant='outline'
                                className='gap-2 border-border/60'
                            >
                                <Search className='h-4 w-4' />
                                Filter cepat
                            </Button>
                            <Button
                                variant='outline'
                                className='gap-2 border-border/60'
                            >
                                <Users className='h-4 w-4' />
                                Segmentasi manual
                            </Button>
                        </div>

                        <div className='overflow-x-auto'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Pelanggan</TableHead>
                                        <TableHead>Domisili</TableHead>
                                        <TableHead>Histori</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {customerRecords.map((customer) => (
                                        <TableRow key={customer.id}>
                                            <TableCell>
                                                <div className='space-y-1'>
                                                    <p className='font-semibold text-foreground'>
                                                        {customer.name}
                                                    </p>
                                                    <div className='flex flex-wrap items-center gap-3 text-xs text-muted-foreground'>
                                                        <span className='inline-flex items-center gap-1'>
                                                            <Phone className='h-3.5 w-3.5 text-primary' />
                                                            {customer.phone}
                                                        </span>
                                                        <span className='inline-flex items-center gap-1'>
                                                            <Mail className='h-3.5 w-3.5 text-primary' />
                                                            {customer.email}
                                                        </span>
                                                        <Badge className='bg-primary/10 text-[10px] font-semibold uppercase tracking-widest text-primary'>
                                                            {customer.tier}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className='text-sm text-muted-foreground'>
                                                {customer.city}
                                            </TableCell>
                                            <TableCell>
                                                <p className='text-sm text-muted-foreground'>
                                                    Terakhir booking:{" "}
                                                    {customer.lastBooking}
                                                </p>
                                                <p className='text-xs text-muted-foreground'>
                                                    LTV {customer.lifetimeValue}{" "}
                                                    • {customer.note}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant='outline'
                                                    className={`text-[11px] uppercase tracking-widest ${
                                                        statusStyles[
                                                            customer.status
                                                        ]
                                                    }`}
                                                >
                                                    {customer.status}
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
                                                        Tandai loyal
                                                    </Button>
                                                    <Button
                                                        size='sm'
                                                        variant='outline'
                                                        onClick={
                                                            handlePlaceholder
                                                        }
                                                    >
                                                        <Ban className='mr-2 h-4 w-4 text-destructive' />
                                                        Bekukan
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
