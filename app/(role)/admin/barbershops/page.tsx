"use client";

import Link from "next/link";
import { useCallback } from "react";
import {
    BadgeCheck,
    Ban,
    Building2,
    CheckSquare,
    Mail,
    MoreHorizontal,
    RefreshCcw,
    Search,
    Shield,
    Users2,
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type BarbershopRecord = {
    id: string;
    brand: string;
    owner: string;
    coverage: string;
    branches: number;
    status: string;
    note: string;
    action: "detail" | "verify";
};

const barbershopRecords: readonly BarbershopRecord[] = [
    {
        id: "fadesmith",
        brand: "FadeSmith Indonesia",
        owner: "Rifky Mahesa",
        coverage: "Jabodetabek",
        branches: 8,
        status: "Aktif",
        note: "Audit lengkap 2 minggu lalu",
        action: "detail",
    },
    {
        id: "gentle-club",
        brand: "Gentle Club",
        owner: "Nadia Lestari",
        coverage: "Bandung",
        branches: 5,
        status: "Aktif",
        note: "Audit komprehensif 1 bulan lalu",
        action: "detail",
    },
    {
        id: "trim-lab",
        brand: "Trim Lab",
        owner: "Alvin Saputra",
        coverage: "Surabaya",
        branches: 3,
        status: "Monitoring",
        note: "Catatan inventory - review 3 hari lalu",
        action: "detail",
    },
    {
        id: "nomads",
        brand: "Nomads Grooming",
        owner: "Sella Wijaya",
        coverage: "Makassar",
        branches: 4,
        status: "Butuh revisi",
        note: "Dokumen POS perlu update (5 hari)",
        action: "detail",
    },
    {
        id: "gentle-club-new",
        brand: "Gentle Club Bandung",
        owner: "Nadia Lestari",
        coverage: "Bandung Raya",
        branches: 0,
        status: "Pending",
        note: "NPWP, SIUP (butuh revisi)",
        action: "verify",
    },
    {
        id: "fadesmith-kemang",
        brand: "FadeSmith Group",
        owner: "Rifky Mahesa",
        coverage: "Jakarta Selatan",
        branches: 0,
        status: "Pending",
        note: "NPWP, SIUP, foto outlet",
        action: "verify",
    },
    {
        id: "urban-fade",
        brand: "Urban Fade Lab",
        owner: "Bayu Rahadian",
        coverage: "Surabaya",
        branches: 0,
        status: "Survey",
        note: "Menunggu hasil survey lapangan",
        action: "verify",
    },
] as const;

const statusStyles: Record<string, string> = {
    Aktif: "border-emerald-500/40 text-emerald-600 bg-emerald-500/10",
    Monitoring: "border-blue-500/40 text-blue-600 bg-blue-500/10",
    Pending: "border-amber-500/40 text-amber-600 bg-amber-500/10",
    "Butuh revisi": "border-orange-500/40 text-orange-600 bg-orange-500/10",
    Survey: "border-indigo-500/40 text-indigo-600 bg-indigo-500/10",
};

type BarbershopActionMenuProps = {
    variant: "detail" | "verify";
    shopId: string;
    brand: string;
    handleAction: (event: Event) => void;
};

function BarbershopActionMenu({
    variant,
    shopId,
    brand,
    handleAction,
}: BarbershopActionMenuProps) {
    const buttonLabel = variant === "detail" ? "Kelola" : "Proses";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size='sm'
                    variant='outline'
                    className='border-border/60 gap-2 text-sm'
                >
                    <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
                    {buttonLabel}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='min-w-[18rem] space-y-1 rounded-xl border border-border/40 bg-card/95 p-2 shadow-lg backdrop-blur'>
                <DropdownMenuLabel className='text-[11px] uppercase tracking-widest text-muted-foreground'>
                    {variant === "detail"
                        ? "Manajemen jaringan"
                        : "Proses verifikasi"}
                </DropdownMenuLabel>
                {variant === "detail" ? (
                    <>
                        <DropdownMenuItem asChild>
                            <Link
                                href={`/admin/akun/${shopId}`}
                                className='flex items-start gap-3 text-sm'
                            >
                                <BadgeCheck className='mt-0.5 h-4 w-4 text-primary' />
                                <div>
                                    <p className='font-semibold text-foreground'>
                                        Lihat detail jaringan
                                    </p>
                                    <p className='text-[11px] text-muted-foreground'>
                                        Audit, catatan, dan akses cabang
                                    </p>
                                </div>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link
                                href={`/admin/akun/${shopId}/edit`}
                                className='flex items-start gap-3 text-sm'
                            >
                                <Building2 className='mt-0.5 h-4 w-4 text-primary' />
                                <div>
                                    <p className='font-semibold text-foreground'>
                                        Kelola/ubah jaringan
                                    </p>
                                    <p className='text-[11px] text-muted-foreground'>
                                        Perbarui status cabang & integrasi
                                        TrimTime
                                    </p>
                                </div>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={handleAction}
                            className='flex items-start gap-3 text-sm text-muted-foreground'
                        >
                            <RefreshCcw className='mt-0.5 h-4 w-4 text-primary' />
                            <div>
                                <p className='font-semibold text-foreground'>
                                    Sinkron data audit
                                </p>
                                <p className='text-[11px] leading-snug'>
                                    Perbarui laporan terakhir secara manual
                                </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={handleAction}
                            className='flex items-start gap-3 text-sm text-muted-foreground'
                        >
                            <CheckSquare className='mt-0.5 h-4 w-4 text-primary' />
                            <div>
                                <p className='font-semibold text-foreground'>
                                    Catat tindakan
                                </p>
                                <p className='text-[11px] leading-snug'>
                                    Simpan insight untuk tim owner support
                                </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className='bg-border/40' />
                        <DropdownMenuItem
                            onSelect={handleAction}
                            className='flex items-start gap-3 text-sm text-muted-foreground'
                        >
                            <CheckSquare className='mt-0.5 h-4 w-4 text-primary' />
                            <div>
                                <p className='font-semibold text-foreground'>
                                    Tambah catatan audit
                                </p>
                                <p className='text-[11px] leading-snug'>
                                    Dokumentasikan temuan lapangan terbaru
                                </p>
                            </div>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem
                            onSelect={handleAction}
                            className='flex items-start gap-3 text-sm text-muted-foreground'
                        >
                            <Mail className='mt-0.5 h-4 w-4 text-primary' />
                            <div>
                                <p className='font-semibold text-foreground'>
                                    Hubungi owner
                                </p>
                                <p className='text-[11px] text-muted-foreground'>
                                    Koordinasi dokumen {brand}
                                </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className='bg-border/40' />
                        <DropdownMenuItem
                            onSelect={handleAction}
                            className='flex items-start gap-3 text-sm text-muted-foreground'
                        >
                            <BadgeCheck className='mt-0.5 h-4 w-4 text-primary' />
                            <div>
                                <p className='font-semibold text-foreground'>
                                    Setujui pengajuan
                                </p>
                                <p className='text-[11px] leading-snug'>
                                    Aktifkan barbershop setelah checklist
                                    terpenuhi
                                </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={handleAction}
                            className='flex items-start gap-3 text-sm text-muted-foreground'
                        >
                            <Ban className='mt-0.5 h-4 w-4 text-destructive' />
                            <div>
                                <p className='font-semibold text-foreground'>
                                    Tolak pengajuan
                                </p>
                                <p className='text-[11px] leading-snug'>
                                    Kirim catatan revisi via email owner
                                </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={handleAction}
                            className='flex items-start gap-3 text-sm text-muted-foreground'
                        >
                            <CheckSquare className='mt-0.5 h-4 w-4 text-primary' />
                            <div>
                                <p className='font-semibold text-foreground'>
                                    Tambah catatan audit
                                </p>
                                <p className='text-[11px] leading-snug'>
                                    Update temuan survey lapangan
                                </p>
                            </div>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function AdminAkunPage() {
    const handlePlaceholderAction = useCallback((event: Event) => {
        event.preventDefault();
    }, []);

    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-3'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/85 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-2'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
                                <Shield className='h-4 w-4' />
                                Manajemen Barbershop
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                Verifikasi & kontrol jaringan
                            </h1>
                            <p className='text-sm text-muted-foreground lg:text-base'>
                                Pantau status barbershop yang terdaftar di
                                TrimTime: legalitas owner, total cabang, hingga
                                hasil audit lapangan.
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Button asChild className='gap-2'>
                                <Link
                                    href='/admin/akun/create'
                                    className='inline-flex items-center gap-2'
                                >
                                    <Building2 className='h-4 w-4' />
                                    Tambah barbershop
                                </Link>
                            </Button>
                            <Button
                                variant='outline'
                                className='border-border/60 gap-2'
                            >
                                <RefreshCcw className='h-4 w-4' />
                                Sinkron data owner
                            </Button>
                            <Button
                                variant='outline'
                                className='border-border/60 gap-2'
                                asChild
                            >
                                <Link href='/admin/akun/freelancer'>
                                    <Users2 className='h-4 w-4' />
                                    Kurasi freelancer
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-3'>
                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Jaringan barbershop TrimTime
                        </CardTitle>
                        <CardDescription>
                            Monitor pengajuan baru, jaringan aktif, dan status
                            audit dalam satu tampilan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='flex flex-wrap gap-3'>
                            <Input
                                placeholder='Cari brand/owner'
                                className='max-w-sm border-border/60'
                            />
                            <Button
                                variant='outline'
                                className='gap-2 border-border/60'
                            >
                                <Search className='h-4 w-4' />
                                Filter
                            </Button>
                            <Button
                                variant='outline'
                                className='gap-2 border-border/60'
                            >
                                <CheckSquare className='h-4 w-4' />
                                Approve massal
                            </Button>
                        </div>
                        <div className='overflow-x-auto'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Brand</TableHead>
                                        <TableHead>Owner</TableHead>
                                        <TableHead>Coverage</TableHead>
                                        <TableHead>Total cabang</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Catatan</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {barbershopRecords.map((shop) => (
                                        <TableRow key={shop.id}>
                                            <TableCell className='font-semibold text-foreground'>
                                                {shop.brand}
                                            </TableCell>
                                            <TableCell>{shop.owner}</TableCell>
                                            <TableCell>
                                                {shop.coverage}
                                            </TableCell>
                                            <TableCell>
                                                <span className='inline-flex items-center gap-1 text-sm'>
                                                    <Users2 className='h-3.5 w-3.5 text-muted-foreground' />
                                                    {shop.branches > 0
                                                        ? `${shop.branches} cabang`
                                                        : "-"}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant='outline'
                                                    className={`text-[10px] uppercase tracking-widest ${
                                                        statusStyles[
                                                            shop.status
                                                        ] ?? "border-border/40"
                                                    }`}
                                                >
                                                    {shop.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className='text-sm text-muted-foreground'>
                                                {shop.note}
                                            </TableCell>
                                            <TableCell>
                                                <BarbershopActionMenu
                                                    variant={shop.action}
                                                    shopId={shop.id}
                                                    brand={shop.brand}
                                                    handleAction={
                                                        handlePlaceholderAction
                                                    }
                                                />
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
