import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
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
import { ArrowLeft, Building2, RefreshCcw, Shield } from "lucide-react";

const statusOptions = [
    { value: "Aktif", label: "Aktif" },
    { value: "Monitoring", label: "Monitoring" },
    { value: "Pending", label: "Pending" },
    { value: "Butuh revisi", label: "Butuh revisi" },
    { value: "Survey", label: "Survey" },
] as const;

const coverageOptions = [
    "Jabodetabek",
    "Bandung Raya",
    "Surabaya",
    "Makassar",
    "Bali",
] as const;

const integrationModules = [
    {
        label: "POS & Inventory",
        helper: "Sinkron stok + penjualan realtime",
        enabled: true,
    },
    {
        label: "Home Service Tracker",
        helper: "Pantau armada freelancer mobile",
        enabled: true,
    },
    {
        label: "Promo & Campaign",
        helper: "Auto-sync push TrimTime + WhatsApp",
        enabled: false,
    },
    {
        label: "Keuangan",
        helper: "Akses invoice & payout digital",
        enabled: true,
    },
] as const;

const complianceChecklist = [
    {
        label: "NPWP / SIUP",
        helper: "Upload scan terbaru",
        checked: true,
    },
    {
        label: "Foto outlet",
        helper: "Minimal 5 foto, resolusi tinggi",
        checked: true,
    },
    {
        label: "Perjanjian kemitraan",
        helper: "Pastikan tanda tangan digital",
        checked: false,
    },
    {
        label: "Integrasi POS",
        helper: "API key aktif + log sukses",
        checked: true,
    },
] as const;

const channelOptions = [
    "TrimTime App",
    "Walk-in",
    "Home Service",
    "Corporate",
] as const;

const docsTemplates = [
    "SOP pelayanan FadeSmith",
    "Checklist armada mobile",
    "Catatan audit minggu ini",
] as const;

type AdminEditPageProps = {
    params: Promise<{ id: string }>;
};

export default async function AdminAkunEditPage({
    params,
}: AdminEditPageProps) {
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
                                Edit Barbershop
                            </div>
                            <div>
                                <p className='text-sm text-muted-foreground uppercase tracking-widest'>
                                    ID #{id}
                                </p>
                                <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                    Atur jaringan FadeSmith
                                </h1>
                                <p className='text-sm text-muted-foreground lg:text-base'>
                                    Perbarui status operasional, kontak owner,
                                    serta integrasi TrimTime sebelum ditayangkan
                                    ke pengguna.
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
                                    href={`/admin/akun/${id}`}
                                    className='inline-flex items-center gap-2'
                                >
                                    <ArrowLeft className='h-4 w-4' />
                                    Kembali ke detail
                                </Link>
                            </Button>
                            <Button variant='secondary' className='gap-2'>
                                <RefreshCcw className='h-4 w-4' />
                                Sinkron data owner
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 pt-4 pb-6 lg:px-8 lg:pt-5 lg:pb-10'>
                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Informasi jaringan
                        </CardTitle>
                        <CardDescription>
                            Ubah nama brand, cakupan, dan status onboarding.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-4 md:grid-cols-2'>
                        <div className='space-y-2'>
                            <Label htmlFor='brand'>Nama brand</Label>
                            <Input
                                id='brand'
                                defaultValue='FadeSmith Indonesia'
                                className='border-border/60'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='owner'>Owner / PIC</Label>
                            <Input
                                id='owner'
                                defaultValue='Rifky Mahesa'
                                className='border-border/60'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='coverage'>Coverage utama</Label>
                            <Select defaultValue='Jabodetabek'>
                                <SelectTrigger
                                    id='coverage'
                                    className='border-border/60'
                                >
                                    <SelectValue placeholder='Pilih coverage' />
                                </SelectTrigger>
                                <SelectContent>
                                    {coverageOptions.map((area) => (
                                        <SelectItem key={area} value={area}>
                                            {area}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='branches'>Total cabang</Label>
                            <Input
                                id='branches'
                                type='number'
                                min={0}
                                defaultValue={8}
                                className='border-border/60'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='hq'>Alamat headquarters</Label>
                            <Input
                                id='hq'
                                defaultValue='Jl. Wijaya II No. 45, Jakarta Selatan'
                                className='border-border/60'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='status'>Status jaringan</Label>
                            <Select defaultValue='Aktif'>
                                <SelectTrigger
                                    id='status'
                                    className='border-border/60'
                                >
                                    <SelectValue placeholder='Pilih status' />
                                </SelectTrigger>
                                <SelectContent>
                                    {statusOptions.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Kontak & kanal layanan
                        </CardTitle>
                        <CardDescription>
                            Pastikan owner dan tim support menerima update
                            otomatis.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='grid gap-4 md:grid-cols-2'>
                            <div className='space-y-2'>
                                <Label htmlFor='email'>Email operasional</Label>
                                <Input
                                    id='email'
                                    type='email'
                                    defaultValue='ops@fadesmith.id'
                                    className='border-border/60'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='phone'>
                                    Nomor WhatsApp owner
                                </Label>
                                <Input
                                    id='phone'
                                    type='tel'
                                    defaultValue='+62 812 9000 1212'
                                    className='border-border/60'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='ops-lead'>
                                    Ops lead TrimTime
                                </Label>
                                <Input
                                    id='ops-lead'
                                    defaultValue='Dewi Lestari'
                                    className='border-border/60'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='channels'>Channel aktif</Label>
                                <div className='grid gap-2 rounded-xl border border-border/40 bg-muted/10 p-3 text-sm'>
                                    {channelOptions.map((channel) => (
                                        <label
                                            key={channel}
                                            className='flex items-center gap-3'
                                        >
                                            <Checkbox
                                                defaultChecked={
                                                    channel !== "Corporate"
                                                }
                                                className='border-border/60'
                                            />
                                            <span>{channel}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='notes'>Catatan onboarding</Label>
                            <Textarea
                                id='notes'
                                className='min-h-[120px] border-border/60'
                                placeholder='Tuliskan kebutuhan perangkat, jadwal training, atau SLA khusus pelanggan corporate.'
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className='grid gap-6 lg:grid-cols-2'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Integrasi TrimTime
                            </CardTitle>
                            <CardDescription>
                                Aktifkan modul yang dibutuhkan jaringan
                                FadeSmith.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            {integrationModules.map((module) => (
                                <label
                                    key={module.label}
                                    className='flex items-start gap-3 rounded-xl border border-border/40 bg-muted/10 p-4'
                                >
                                    <Switch defaultChecked={module.enabled} />
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
                        </CardContent>
                    </Card>

                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader>
                            <CardTitle className='text-xl font-semibold'>
                                Checklist dokumen
                            </CardTitle>
                            <CardDescription>
                                Validasi legalitas & audit terbaru.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            {complianceChecklist.map((item) => (
                                <label
                                    key={item.label}
                                    className='flex items-start gap-3 rounded-xl border border-border/40 bg-muted/10 p-3 text-sm'
                                >
                                    <Checkbox
                                        defaultChecked={item.checked}
                                        className='mt-1 border-border/60'
                                    />
                                    <span>
                                        <span className='font-semibold text-foreground'>
                                            {item.label}
                                        </span>
                                        <br />
                                        <span className='text-xs text-muted-foreground'>
                                            {item.helper}
                                        </span>
                                    </span>
                                </label>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>
                            Template & arsip
                        </CardTitle>
                        <CardDescription>
                            Catatan audit dan dokumen pendukung untuk tim ops.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-3 md:grid-cols-2'>
                        {docsTemplates.map((doc) => (
                            <div
                                key={doc}
                                className='rounded-xl border border-border/40 bg-muted/10 p-4 text-sm'
                            >
                                <p className='font-semibold text-foreground'>
                                    {doc}
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                    Perbarui jika ada revisi dari tim pusat.
                                </p>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter className='flex flex-wrap gap-3 border-t border-border/40 bg-muted/5 px-6 py-4'>
                        <Button
                            asChild
                            variant='outline'
                            className='border-border/60 gap-2'
                        >
                            <Link
                                href={`/admin/akun/${id}`}
                                className='inline-flex items-center gap-2'
                            >
                                <ArrowLeft className='h-4 w-4' />
                                Batal
                            </Link>
                        </Button>
                        <Button className='gap-2'>
                            <Building2 className='h-4 w-4' />
                            Simpan perubahan
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        </PageShell>
    );
}
