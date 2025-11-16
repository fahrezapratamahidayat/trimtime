import {
    AlertTriangle,
    ArrowLeft,
    Building2,
    CalendarClock,
    CheckCircle2,
    MapPin,
    Mail,
    PhoneCall,
    Shield,
    Users2,
} from "lucide-react";
import Link from "next/link";

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
import { Separator } from "@/components/ui/separator";

const barbershopDetail = {
    brand: "FadeSmith Indonesia",
    owner: "Rifky Mahesa",
    coverage: "Jabodetabek",
    headquarters: "Jl. Wijaya II No. 45, Jakarta Selatan",
    branches: 8,
    status: "Aktif",
    lastAudit: "2 minggu lalu",
    nextAudit: "28 Nov 2025",
    email: "ops@fadesmith.id",
    phone: "+62 812 9000 1212",
    opsLead: "Dewi Lestari",
    lastSync: "16 Nov 2025, 19:48",
    channels: ["TrimTime App", "Walk-in", "Home Service"],
    docs: "NPWP, SIUP, foto outlet, perjanjian kemitraan",
};

const complianceChecklist = [
    {
        label: "Legalitas & dokumen",
        detail: "NPWP + SIUP diverifikasi Head of Ops",
        status: "done" as const,
        timestamp: "12 Okt 2025, 09:20",
    },
    {
        label: "Audit operasional",
        detail: "QC layanan & kualitas outlet",
        status: "done" as const,
        timestamp: "29 Okt 2025, 15:42",
    },
    {
        label: "Integrasi TrimTime",
        detail: "Sinkron inventory & Home Service tracker",
        status: "pending" as const,
        timestamp: "Menunggu data armada",
    },
];

const integrationModules = [
    {
        title: "POS & Inventory",
        helper: "Integrasi otomatis stok cabang",
        level: "Realtime",
    },
    {
        title: "Home Service Tracker",
        helper: "Armada mobile & jadwal freelancer",
        level: "Aktif",
    },
    {
        title: "Promo & Campaign",
        helper: "Sync push TrimTime + WhatsApp",
        level: "Terjadwal",
    },
    {
        title: "Keuangan",
        helper: "Invoice & payout digital",
        level: "Read",
    },
];

const auditActivity = [
    {
        action: "Audit outlet Tebet",
        note: "Perbaikan layout kursi sudah selesai",
        time: "16 Nov 2025, 18:15",
    },
    {
        action: "Approve ekspansi BSD",
        note: "Menunggu upload foto final",
        time: "15 Nov 2025, 11:42",
    },
    {
        action: "Survey armada home service",
        note: "Cek kelayakan kendaraan mobile",
        time: "14 Nov 2025, 21:05",
    },
];

const statusStyles: Record<string, string> = {
    Aktif: "border-emerald-500/40 text-emerald-600 bg-emerald-500/10",
    Monitoring: "border-blue-500/40 text-blue-600 bg-blue-500/10",
    Pending: "border-amber-500/40 text-amber-600 bg-amber-500/10",
    "Butuh revisi": "border-orange-500/40 text-orange-600 bg-orange-500/10",
    Survey: "border-indigo-500/40 text-indigo-600 bg-indigo-500/10",
};

type AdminDetailPageProps = {
    params: Promise<{ id: string }>;
};

export default async function AdminAkunDetailPage({
    params,
}: AdminDetailPageProps) {
    const { id } = await params;
    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 pt-8 pb-4 lg:px-8 lg:pt-10 lg:pb-6'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-3'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <Shield className='h-4 w-4' />
                                Manajemen Barbershop
                            </div>
                            <div>
                                <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                    {barbershopDetail.brand}
                                </h1>
                                <p className='text-sm text-muted-foreground lg:text-base'>
                                    Owner {barbershopDetail.owner} • Coverage{" "}
                                    {barbershopDetail.coverage}
                                </p>
                            </div>
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
                            <Button
                                asChild
                                variant='secondary'
                                className='gap-2'
                            >
                                <Link
                                    href={`/admin/akun/${id}/edit`}
                                    className='inline-flex items-center gap-2'
                                >
                                    <Building2 className='h-4 w-4' />
                                    Edit jaringan
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 pt-4 pb-6 lg:px-8 lg:pt-5 lg:pb-10'>
                <Card className='border-border/50 shadow-sm'>
                    <CardHeader className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                        <div>
                            <CardTitle className='text-xl font-semibold'>
                                Profil jaringan & kontak
                            </CardTitle>
                            <CardDescription>
                                Data operasional, total cabang, dan kanal
                                komunikasi FadeSmith.
                            </CardDescription>
                        </div>
                        <Badge
                            variant='outline'
                            className={`border-border/60 text-[10px] uppercase tracking-widest ${
                                statusStyles[barbershopDetail.status] ?? ""
                            }`}
                        >
                            {barbershopDetail.status}
                        </Badge>
                    </CardHeader>
                    <CardContent className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
                        <div className='space-y-4'>
                            <div className='grid gap-4 sm:grid-cols-2'>
                                <InfoItem
                                    label='Owner'
                                    value={barbershopDetail.owner}
                                />
                                <InfoItem
                                    label='Coverage'
                                    value={barbershopDetail.coverage}
                                />
                                <InfoItem
                                    label='Total cabang'
                                    value={`${barbershopDetail.branches} lokasi`}
                                    icon={
                                        <Users2 className='h-4 w-4 text-primary' />
                                    }
                                />
                                <InfoItem
                                    label='Headquarters'
                                    value={barbershopDetail.headquarters}
                                    icon={
                                        <MapPin className='h-4 w-4 text-primary' />
                                    }
                                />
                            </div>
                            <Separator />
                            <div className='grid gap-4 sm:grid-cols-2'>
                                <InfoItem
                                    label='Kontak ops'
                                    value={barbershopDetail.email}
                                    icon={
                                        <Mail className='h-4 w-4 text-primary' />
                                    }
                                />
                                <InfoItem
                                    label='Hotline owner'
                                    value={barbershopDetail.phone}
                                    icon={
                                        <PhoneCall className='h-4 w-4 text-primary' />
                                    }
                                />
                            </div>
                        </div>
                        <div className='space-y-4 rounded-2xl border border-border/40 bg-muted/10 p-4 text-sm'>
                            <div className='flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground'>
                                <span>Sinkronisasi & audit</span>
                                <CalendarClock className='h-4 w-4 text-primary' />
                            </div>
                            <div className='space-y-1'>
                                <p className='text-sm text-muted-foreground'>
                                    Audit terakhir
                                </p>
                                <p className='text-base font-semibold text-foreground'>
                                    {barbershopDetail.lastAudit}
                                </p>
                            </div>
                            <Separator />
                            <div className='grid gap-2 text-sm'>
                                <p className='text-muted-foreground'>
                                    Audit berikutnya
                                </p>
                                <p className='text-base font-semibold text-foreground'>
                                    {barbershopDetail.nextAudit}
                                </p>
                            </div>
                            <Separator />
                            <div className='space-y-1'>
                                <p className='text-sm text-muted-foreground'>
                                    Channel aktif
                                </p>
                                <p className='text-base font-semibold text-foreground'>
                                    {barbershopDetail.channels.join(" • ")}
                                </p>
                            </div>
                            <div className='rounded-lg border border-dashed border-primary/40 bg-primary/5 px-3 py-2 text-xs text-muted-foreground'>
                                <p className='font-semibold text-primary'>
                                    Last sync
                                </p>
                                <p>{barbershopDetail.lastSync}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Checklist compliance
                            </CardTitle>
                            <CardDescription>
                                Progress legalitas & integrasi TrimTime untuk
                                jaringan ini.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            {complianceChecklist.map((step) => (
                                <div
                                    key={step.label}
                                    className='flex gap-3 rounded-xl border border-border/40 bg-muted/10 p-4'
                                >
                                    <div className='mt-0.5'>
                                        {step.status === "done" ? (
                                            <CheckCircle2 className='h-5 w-5 text-primary' />
                                        ) : (
                                            <AlertTriangle className='h-5 w-5 text-amber-500' />
                                        )}
                                    </div>
                                    <div className='space-y-1'>
                                        <p className='text-sm font-semibold text-foreground'>
                                            {step.label}
                                        </p>
                                        <p className='text-xs text-muted-foreground'>
                                            {step.detail}
                                        </p>
                                        <p className='text-[11px] uppercase tracking-widest text-muted-foreground'>
                                            {step.timestamp}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground'>
                                <p className='font-semibold text-primary'>
                                    Catatan lapangan
                                </p>
                                <p>
                                    Tim audit merekomendasikan refresh SOP
                                    customer journey sebelum high season akhir
                                    tahun.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Integrasi & akses
                            </CardTitle>
                            <CardDescription>
                                Modul TrimTime yang diaktifkan untuk jaringan
                                FadeSmith.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            {integrationModules.map((module) => (
                                <div
                                    key={module.title}
                                    className='rounded-xl border border-border/40 bg-muted/10 p-4'
                                >
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <p className='text-sm font-semibold text-foreground'>
                                                {module.title}
                                            </p>
                                            <p className='text-xs text-muted-foreground'>
                                                {module.helper}
                                            </p>
                                        </div>
                                        <Badge
                                            variant='outline'
                                            className='border-border/50 text-[10px] uppercase tracking-widest'
                                        >
                                            {module.level}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground'>
                                <p className='font-semibold text-primary'>
                                    Proteksi tambahan
                                </p>
                                <p>
                                    Perubahan data outlet membutuhkan approval
                                    Head of Ops + Regional Admin.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Aktivitas inspeksi
                        </CardTitle>
                        <CardDescription>
                            Timeline audit lapangan & status eksekusi tugas.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                        {auditActivity.map((log) => (
                            <div
                                key={log.time}
                                className='rounded-xl border border-border/40 bg-muted/10 p-4'
                            >
                                <p className='text-sm font-semibold text-foreground'>
                                    {log.action}
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                    {log.note}
                                </p>
                                <p className='mt-2 text-[11px] uppercase tracking-widest text-muted-foreground'>
                                    {log.time}
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </main>
        </PageShell>
    );
}

type InfoItemProps = {
    label: string;
    value: string;
    icon?: React.ReactNode;
};

function InfoItem({ label, value, icon }: InfoItemProps) {
    return (
        <div className='space-y-1 rounded-lg border border-border/40 bg-background/80 p-3'>
            <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                {label}
            </p>
            <div className='flex items-center gap-2 text-sm font-semibold text-foreground'>
                {icon}
                <span>{value}</span>
            </div>
        </div>
    );
}
