"use client";

import {
    ArrowLeft,
    KeyRound,
    Layers,
    RefreshCcw,
    Shield,
    UserPlus,
} from "lucide-react";
import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const roleOptions = [
    {
        value: "super",
        label: "Super Admin",
        helper: "Akses penuh semua regional",
    },
    {
        value: "regional",
        label: "Admin Regional",
        helper: "Pantau cabang kota tertentu",
    },
    {
        value: "ops",
        label: "Ops Support",
        helper: "Hanya monitoring & laporan",
    },
] as const;

const coverageOptions = [
    "Jakarta Selatan",
    "Bandung",
    "Surabaya",
    "Makassar",
] as const;

const accessModules = [
    {
        label: "Verifikasi Owner",
        helper: "Approve dokumen legal & KYC cabang baru",
        defaultChecked: true,
    },
    {
        label: "Kontrol Barber",
        helper: "Suspend / reactivate akun barber & freelancer",
        defaultChecked: true,
    },
    {
        label: "User Support",
        helper: "Reset password & hapus akun user",
        defaultChecked: true,
    },
    {
        label: "Keuangan",
        helper: "Akses laporan payout & invoice",
        defaultChecked: false,
    },
    {
        label: "Audit & Keamanan",
        helper: "Kelola role granular dan log aktivitas",
        defaultChecked: false,
    },
] as const;

export default function AdminAkunCreatePage() {
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 pt-8 pb-4 lg:px-8 lg:pt-10 lg:pb-6'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <Shield className='h-4 w-4' />
                                Manajemen Akun
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                Buat akun admin baru
                            </h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Tim admin memastikan owner, barber, dan user
                                mengikuti standar operasional TrimTime. Pastikan
                                kredensial dan hak akses sesuai kebutuhan
                                operasional.
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button
                                asChild
                                variant='outline'
                                className='border-border/60 gap-2'
                            >
                                <Link
                                    href='/admin/akun'
                                    className='inline-flex items-center gap-2'
                                >
                                    <ArrowLeft className='h-4 w-4' />
                                    Kembali ke daftar
                                </Link>
                            </Button>
                            <Button variant='secondary' className='gap-2'>
                                <RefreshCcw className='h-4 w-4' />
                                Sinkron RBAC
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 pt-4 pb-6 lg:px-8 lg:pt-5 lg:pb-10'>
                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Informasi akun
                        </CardTitle>
                        <CardDescription>
                            Masukkan identitas lengkap admin dan kanal
                            komunikasi resmi.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-6'>
                        <div className='grid gap-4 lg:grid-cols-2'>
                            <div className='space-y-2'>
                                <Label htmlFor='nama'>Nama lengkap</Label>
                                <Input
                                    id='nama'
                                    placeholder='Contoh: Dewi Lestari'
                                    className='border-border/60'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='jabatan'>Posisi</Label>
                                <Input
                                    id='jabatan'
                                    placeholder='Admin Regional / Ops Lead'
                                    className='border-border/60'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='email'>Email kerja</Label>
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder='nama@trimtime.id'
                                    className='border-border/60'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='phone'>Nomor WhatsApp</Label>
                                <Input
                                    id='phone'
                                    type='tel'
                                    placeholder='+62 812 xxx'
                                    className='border-border/60'
                                />
                            </div>
                        </div>
                        <div className='grid gap-4 lg:grid-cols-2'>
                            <div className='space-y-2'>
                                <Label htmlFor='role'>Role admin</Label>
                                <Select defaultValue='regional'>
                                    <SelectTrigger
                                        id='role'
                                        className='border-border/60'
                                    >
                                        <SelectValue placeholder='Pilih role' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roleOptions.map((role) => (
                                            <SelectItem
                                                key={role.value}
                                                value={role.value}
                                            >
                                                <div className='flex flex-col text-left'>
                                                    <span className='font-semibold'>
                                                        {role.label}
                                                    </span>
                                                    <span className='text-xs text-muted-foreground'>
                                                        {role.helper}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='coverage'>
                                    Coverage wilayah
                                </Label>
                                <Select defaultValue='Jakarta Selatan'>
                                    <SelectTrigger
                                        id='coverage'
                                        className='border-border/60'
                                    >
                                        <SelectValue placeholder='Pilih wilayah' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {coverageOptions.map((city) => (
                                            <SelectItem key={city} value={city}>
                                                {city}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Hak akses & RBAC
                        </CardTitle>
                        <CardDescription>
                            Atur module yang boleh diakses serta level
                            persetujuan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-6'>
                        <div className='grid gap-4 lg:grid-cols-2'>
                            <div className='space-y-3 rounded-xl border border-border/40 bg-muted/15 p-4'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-sm font-semibold text-foreground'>
                                            Level otorisasi
                                        </p>
                                        <p className='text-xs text-muted-foreground'>
                                            Tentukan wewenang persetujuan
                                            dokumen
                                        </p>
                                    </div>
                                    <Badge
                                        variant='outline'
                                        className='border-border/50 text-[10px] uppercase tracking-widest'
                                    >
                                        RBAC
                                    </Badge>
                                </div>
                                <Select defaultValue='multi'>
                                    <SelectTrigger className='border-border/60'>
                                        <SelectValue placeholder='Pilih level' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='multi'>
                                            Multi-factor approval
                                        </SelectItem>
                                        <SelectItem value='single'>
                                            Single approval
                                        </SelectItem>
                                        <SelectItem value='observer'>
                                            Read only
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className='flex items-center justify-between rounded-lg border border-dashed border-primary/40 bg-primary/5 px-3 py-2 text-xs text-muted-foreground'>
                                    <span>
                                        Butuh verifikasi dua admin untuk suspend
                                        akun
                                    </span>
                                    <KeyRound className='h-4 w-4 text-primary' />
                                </div>
                            </div>
                            <div className='space-y-3 rounded-xl border border-border/40 bg-muted/15 p-4'>
                                <div className='flex items-center justify-between text-sm'>
                                    <div>
                                        <p className='font-semibold text-foreground'>
                                            Mode keamanan
                                        </p>
                                        <p className='text-xs text-muted-foreground'>
                                            Aktifkan proteksi tambahan
                                        </p>
                                    </div>
                                </div>
                                <label className='flex items-center justify-between rounded-lg border border-border/40 bg-background px-3 py-2 text-sm'>
                                    <span>Aktifkan 2FA wajib</span>
                                    <Switch defaultChecked />
                                </label>
                                <label className='flex items-center justify-between rounded-lg border border-border/40 bg-background px-3 py-2 text-sm'>
                                    <span>Notifikasi login baru</span>
                                    <Switch defaultChecked={false} />
                                </label>
                            </div>
                        </div>
                        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                            {accessModules.map((module) => (
                                <label
                                    key={module.label}
                                    className='flex gap-3 rounded-lg border border-border/40 bg-muted/10 p-3'
                                >
                                    <Checkbox
                                        defaultChecked={module.defaultChecked}
                                        className='border-border/60'
                                    />
                                    <span className='text-sm'>
                                        <span className='font-semibold text-foreground'>
                                            {module.label}
                                        </span>
                                        <br />
                                        <span className='text-xs text-muted-foreground'>
                                            {module.helper}
                                        </span>
                                    </span>
                                </label>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Catatan & onboarding
                        </CardTitle>
                        <CardDescription>
                            Tambahkan detail pelatihan atau perangkat yang harus
                            disiapkan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='grid gap-4 lg:grid-cols-2'>
                            <div className='space-y-2'>
                                <Label htmlFor='perangkat'>
                                    Perangkat tersinkron
                                </Label>
                                <Textarea
                                    id='perangkat'
                                    placeholder='Contoh: Laptop kantor + SSO Microsoft Entra'
                                    className='min-h-[100px] border-border/60'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='catatan'>
                                    Catatan tambahan
                                </Label>
                                <Textarea
                                    id='catatan'
                                    placeholder='Instruksi onboarding, jadwal training, dsb.'
                                    className='min-h-[100px] border-border/60'
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='flex flex-wrap gap-3 border-t border-border/40 bg-muted/5 px-6 py-4'>
                        <Button
                            variant='outline'
                            className='border-border/60 gap-2'
                        >
                            <Layers className='h-4 w-4' />
                            Simpan draft
                        </Button>
                        <Button className='gap-2'>
                            <UserPlus className='h-4 w-4' />
                            Buat akun admin
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        </PageShell>
    );
}
