"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
    BadgeCheck,
    CalendarCheck,
    CheckCircle2,
    Clock,
    Phone,
    Filter,
    Menu,
    MessageCircle,
    PencilLine,
    PlayCircle,
    RefreshCcw,
    Search,
    Scissors,
    SquarePen,
    Truck,
    MapPin,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { LucideIcon } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";

const bookingSummary = [
    {
        label: "Menunggu konfirmasi",
        value: 2,
        helper: "Silakan validasi manual",
        icon: Clock,
    },
    {
        label: "Siap dimulai",
        value: 3,
        helper: "Barber standby di kursi",
        icon: CalendarCheck,
    },
    {
        label: "Home service aktif",
        value: 1,
        helper: "Pantau GPS secara berkala",
        icon: Truck,
    },
    {
        label: "Selesai hari ini",
        value: 4,
        helper: "Siap minta rating pelanggan",
        icon: CheckCircle2,
    },
] as const;

const bookingList = [
    {
        id: "INV-9041",
        customer: "Dimas Saputra",
        initials: "DS",
        phone: "0812-8890-1122",
        schedule: "Selasa, 11 Feb • 09:00",
        location: "TrimTime HQ, SCBD",
        service: "Signature Fade + Steam",
        type: "On-site",
        status: "pending",
        price: "Rp 230.000",
    },
    {
        id: "INV-9042",
        customer: "Hafidz Rahman",
        initials: "HR",
        phone: "0813-2200-4422",
        schedule: "Selasa, 11 Feb • 10:30",
        location: "TrimTime HQ, SCBD",
        service: "Classic Cut & Beard Trim",
        type: "On-site",
        status: "confirmed",
        price: "Rp 185.000",
    },
    {
        id: "INV-9043",
        customer: "Reyhan Fadil",
        initials: "RF",
        phone: "0812-9988-7744",
        schedule: "Selasa, 11 Feb • 11:30",
        location: "Menara BCA Lt. 32",
        service: "Home Service Deluxe",
        type: "Home service",
        status: "ongoing",
        price: "Rp 320.000",
    },
    {
        id: "INV-9044",
        customer: "Vino Mahardika",
        initials: "VM",
        phone: "0813-6655-2200",
        schedule: "Selasa, 11 Feb • 13:00",
        location: "TrimTime HQ, SCBD",
        service: "Kids Haircut Package",
        type: "On-site",
        status: "completed",
        price: "Rp 150.000",
    },
    {
        id: "INV-9045",
        customer: "Indra Syahputra",
        initials: "IS",
        phone: "0817-5522-3311",
        schedule: "Selasa, 11 Feb • 15:00",
        location: "Cluster Kemang Pratama",
        service: "Home Service Basic",
        type: "Home service",
        status: "pending",
        price: "Rp 210.000",
    },
] as const;

const statusBadgeStyles = {
    pending: "bg-amber-500/15 text-amber-600",
    confirmed: "bg-primary/10 text-primary",
    ongoing: "bg-sky-500/15 text-sky-600",
    completed: "bg-emerald-500/15 text-emerald-600",
} satisfies Record<string, string>;

type BookingStatus = (typeof bookingList)[number]["status"];

const statusLabels: Record<BookingStatus, string> = {
    pending: "Menunggu konfirmasi",
    confirmed: "Sudah dikonfirmasi",
    ongoing: "Sedang berjalan",
    completed: "Selesai",
};

const barberServices = [
    {
        id: "skin-fade-premium",
        name: "Skin Fade Premium",
        description: "Potongan rapi dengan fade halus & styling matte finish.",
        price: 65000,
        duration: "35 menit",
    },
    {
        id: "classic-cut",
        name: "Classic Cut & Wash",
        description: "Potong rambut klasik termasuk shampoo dan quick dry.",
        price: 55000,
        duration: "30 menit",
    },
    {
        id: "beard-trim",
        name: "Beard Trim",
        description: "Perapihan kumis & jenggot dengan warm towel finish.",
        price: 35000,
        duration: "20 menit",
    },
    {
        id: "steam-therapy",
        name: "Steam Therapy",
        description: "Perawatan kulit kepala dengan essential oil & pijat.",
        price: 20000,
        duration: "15 menit",
    },
    {
        id: "home-service",
        name: "Home Service (add-on)",
        description: "Tambahan biaya kunjungan barber ke lokasi pelanggan.",
        price: 30000,
        duration: "Opsional",
    },
] as const;

const promoCatalog: Record<
    string,
    {
        label: string;
        discountType: "percent" | "amount";
        value: number;
        minSubtotal?: number;
        notes?: string;
    }
> = {
    TRIM10: {
        label: "Diskon 10%",
        discountType: "percent",
        value: 0.1,
        minSubtotal: 100000,
        notes: "Minimal transaksi Rp 100.000",
    },
    VIP15: {
        label: "Diskon Member 15%",
        discountType: "percent",
        value: 0.15,
        notes: "Khusus pelanggan loyal",
    },
    HEMAT10K: {
        label: "Potongan Rp 10.000",
        discountType: "amount",
        value: 10000,
    },
};

const statusActions: Record<
    BookingStatus,
    Array<{
        label: string;
        description?: string;
        icon: LucideIcon;
        href?: string;
    }>
> = {
    pending: [
        {
            label: "Konfirmasi booking",
            description: "Kirim pemberitahuan ke pelanggan",
            icon: CheckCircle2,
        },
        {
            label: "Catat kedatangan manual",
            description: "Gunakan jika pelanggan walk-in",
            icon: SquarePen,
        },
    ],
    confirmed: [
        {
            label: "Mulai layanan",
            description: "Tandai barber sudah memulai sesi",
            icon: PlayCircle,
        },
        {
            label: "Update status / reschedule",
            description: "Atur ulang waktu atau pindah barber",
            icon: RefreshCcw,
        },
    ],
    ongoing: [
        {
            label: "Kirim update ke pelanggan",
            description: "Beritahu progres layanan",
            icon: MessageCircle,
        },
        {
            label: "Tandai layanan selesai",
            description: "Tutup sesi dan buat ringkasan pembayaran",
            icon: BadgeCheck,
        },
    ],
    completed: [
        {
            label: "Kirim permintaan rating",
            description: "Minta feedback otomatis",
            icon: MessageCircle,
        },
        {
            label: "Catatan layanan manual",
            description: "Tambahkan highlight untuk riwayat",
            icon: SquarePen,
        },
    ],
};

type BookingActionMenuProps = {
    bookingSlug: string;
    telHref: string;
    status: BookingStatus;
    handlePlaceholderAction: (event: Event) => void;
    align?: "start" | "center" | "end";
};

function BookingActionMenu({
    bookingSlug,
    telHref,
    status,
    handlePlaceholderAction,
    align = "end",
}: BookingActionMenuProps) {
    return (
        <DropdownMenuContent
            align={align}
            className='min-w-[16rem] space-y-1 rounded-lg border border-border/50 bg-card/95 p-2 shadow-lg backdrop-blur'
        >
            <DropdownMenuLabel className='text-[11px] uppercase tracking-widest text-muted-foreground'>
                Tindakan Booking
            </DropdownMenuLabel>
            <DropdownMenuItem asChild>
                <Link
                    href={`/barber/booking/${bookingSlug}`}
                    className='flex items-start gap-3 text-sm'
                >
                    <BadgeCheck className='mt-0.5 h-4 w-4 text-primary' />
                    <div className='flex flex-col'>
                        <span className='font-semibold text-foreground'>
                            Lihat detail booking
                        </span>
                        <span className='text-[11px] text-muted-foreground'>
                            Cek informasi lengkap & timeline aktivitas
                        </span>
                    </div>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <a
                    href={telHref}
                    className='flex items-start gap-3 text-sm'
                >
                    <MessageCircle className='mt-0.5 h-4 w-4 text-primary' />
                    <div className='flex flex-col'>
                        <span className='font-semibold text-foreground'>
                            Hubungi pelanggan
                        </span>
                        <span className='text-[11px] text-muted-foreground'>
                            Telepon cepat sebelum sesi dimulai
                        </span>
                    </div>
                </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator className='bg-border/40' />
            {statusActions[status]?.map(({ label, description, icon: Icon }) => (
                <DropdownMenuItem
                    key={label}
                    onSelect={handlePlaceholderAction}
                    className='flex items-start gap-3 text-sm text-muted-foreground'
                >
                    <Icon className='mt-0.5 h-4 w-4 text-primary' />
                    <div className='flex flex-col'>
                        <span className='font-semibold text-foreground'>
                            {label}
                        </span>
                        {description ? (
                            <span className='text-[11px] leading-snug text-muted-foreground'>
                                {description}
                            </span>
                        ) : null}
                    </div>
                </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className='bg-border/40' />
            <DropdownMenuItem
                onSelect={handlePlaceholderAction}
                className='flex items-start gap-3 text-sm text-muted-foreground'
            >
                <SquarePen className='mt-0.5 h-4 w-4 text-primary' />
                <div className='flex flex-col'>
                    <span className='font-semibold text-foreground'>
                        Tambah catatan manual
                    </span>
                    <span className='text-[11px] text-muted-foreground'>
                        Simpan insight untuk owner atau tim CS
                    </span>
                </div>
            </DropdownMenuItem>
        </DropdownMenuContent>
    );
}

export default function BarberBookingPage() {
    const [isManualDialogOpen, setManualDialogOpen] = useState(false);
    const [manualForm, setManualForm] = useState({
        customerName: "",
        phone: "",
        scheduleDate: "",
        scheduleTime: "",
        type: "on-site",
        notes: "",
        promoCode: "",
    });
    const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

    const handlePlaceholderAction = useCallback((event: Event) => {
        event.preventDefault();
    }, []);

    const isManualFormValid = useMemo(() => {
        return (
            manualForm.customerName.trim().length > 0 &&
            manualForm.phone.trim().length > 0 &&
            manualForm.scheduleDate.trim().length > 0 &&
            manualForm.scheduleTime.trim().length > 0 &&
            selectedServiceIds.length > 0
        );
    }, [manualForm, selectedServiceIds]);

    const handleManualFormChange = useCallback(
        (field: keyof typeof manualForm, value: string) => {
            setManualForm((prev) => ({
                ...prev,
                [field]: value,
            }));
        },
        []
    );

    const toggleServiceSelection = useCallback((serviceId: string) => {
        setSelectedServiceIds((prev) =>
            prev.includes(serviceId)
                ? prev.filter((id) => id !== serviceId)
                : [...prev, serviceId]
        );
    }, []);

    const formatCurrency = useCallback((value: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    }, []);

    const selectedServices = useMemo(
        () =>
            barberServices.filter((service) =>
                selectedServiceIds.includes(service.id)
            ),
        [selectedServiceIds]
    );

    const subtotal = useMemo(
        () => selectedServices.reduce((acc, service) => acc + service.price, 0),
        [selectedServices]
    );

    const appliedPromo = useMemo(() => {
        const code = manualForm.promoCode.trim().toUpperCase();
        return promoCatalog[code] ?? null;
    }, [manualForm.promoCode]);

    const promoIsEligible = useMemo(() => {
        if (!appliedPromo) {
            return false;
        }
        if (appliedPromo.minSubtotal && subtotal < appliedPromo.minSubtotal) {
            return false;
        }
        return true;
    }, [appliedPromo, subtotal]);

    const discountValue = useMemo(() => {
        if (!appliedPromo || !promoIsEligible) {
            return 0;
        }
        if (appliedPromo.discountType === "percent") {
            return Math.round(subtotal * appliedPromo.value);
        }
        return appliedPromo.value;
    }, [appliedPromo, promoIsEligible, subtotal]);

    const grandTotal = useMemo(
        () => Math.max(subtotal - discountValue, 0),
        [subtotal, discountValue]
    );

    const handleManualSubmit = useCallback(() => {
        setManualDialogOpen(false);
        setManualForm({
            customerName: "",
            phone: "",
            scheduleDate: "",
            scheduleTime: "",
            type: "on-site",
            notes: "",
            promoCode: "",
        });
        setSelectedServiceIds([]);
    }, []);

    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-5 py-8 lg:px-8 lg:py-10'>
                <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                <div className='relative space-y-6'>
                    <div className='flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between'>
                        <div className='flex items-center gap-4'>
                            <Avatar className='h-12 w-12 border-2 border-primary/40 shadow-lg'>
                                <AvatarImage
                                    src='/placeholder.jpg'
                                    alt='Rama Putra'
                                />
                                <AvatarFallback className='bg-primary/10 text-sm font-semibold text-primary'>
                                    RP
                                </AvatarFallback>
                            </Avatar>
                            <div className='space-y-1.5'>
                                <div className='flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground'>
                                    <Badge
                                        variant='outline'
                                        className='border-border/60 bg-muted/20 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground'
                                    >
                                        Barber
                                    </Badge>
                                    <Badge
                                        variant='outline'
                                        className='border-border/60 bg-muted/20 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground'
                                    >
                                        Barber-Owner
                                    </Badge>
                                </div>
                                <p className='text-sm text-muted-foreground'>
                                    Barber
                                </p>
                                <h2 className='text-xl font-bold tracking-tight text-foreground'>
                                    Rama Putra
                                </h2>
                            </div>
                        </div>
                        <div className='grid gap-3 text-xs text-muted-foreground sm:grid-cols-2 lg:w-auto lg:grid-cols-3'>
                            <div className='flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2'>
                                <Scissors className='h-4 w-4 text-primary' />
                                <div className='leading-tight'>
                                    <p className='text-xs font-semibold text-foreground'>
                                        Barber aktif
                                    </p>
                                    <p>Slot tersisa: 5/12</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2'>
                                <MapPin className='h-4 w-4 text-primary' />
                                <div className='leading-tight'>
                                    <p className='text-xs font-semibold text-foreground'>
                                        TrimTime HQ
                                    </p>
                                    <p>Menara BCA, Jakarta</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2'>
                                <Clock className='h-4 w-4 text-primary' />
                                <div className='leading-tight'>
                                    <p className='text-xs font-semibold text-foreground'>
                                        Jadwal berikutnya
                                    </p>
                                    <p>09:00 WIB • 11 Feb</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-3'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary'>
                                <Scissors className='h-4 w-4' />
                                Manajemen Booking
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                Booking Barber Hari Ini
                            </h1>
                            <p className='max-w-2xl text-sm text-muted-foreground lg:text-base'>
                                Lihat seluruh jadwal pelanggan, konfirmasi
                                permintaan baru, dan update status layanan
                                secara realtime untuk menjaga pengalaman
                                pelanggan tetap mulus.
                            </p>
                        </div>
                        <div className='flex flex-col gap-3 rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm backdrop-blur-sm lg:w-80'>
                            <div className='flex items-center justify-between'>
                                <span className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                                    Agenda aktif
                                </span>
                                <Badge
                                    variant='outline'
                                    className='border-border/60 text-[10px] uppercase tracking-widest text-muted-foreground'
                                >
                                    Auto-sync
                                </Badge>
                            </div>
                            <div>
                                <p className='text-2xl font-bold text-foreground'>
                                    12 booking
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                    Termasuk 4 pelanggan loyal & 2 jadwal home
                                    service.
                                </p>
                            </div>
                            <Dialog
                                open={isManualDialogOpen}
                                onOpenChange={setManualDialogOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button type='button'>
                                        Buat booking manual
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className='max-w-2xl overflow-hidden p-0'>
                                    <div className='flex max-h-[85vh] flex-col'>
                                        <DialogHeader className='px-6 pt-6 pb-4 text-left'>
                                            <DialogTitle>
                                                Booking manual pelanggan
                                            </DialogTitle>
                                            <DialogDescription>
                                                Catat kedatangan walk-in atau
                                                permintaan via telepon supaya
                                                jadwal barber dan kapasitas
                                                kursi tetap sinkron.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className='flex-1 overflow-y-auto px-6 pb-6'>
                                            <div className='space-y-4'>
                                                <div className='grid gap-3 sm:grid-cols-2'>
                                                    <div className='space-y-2'>
                                                        <Label htmlFor='manual-name'>
                                                            Nama pelanggan
                                                        </Label>
                                                        <Input
                                                            id='manual-name'
                                                            placeholder='Contoh: Dimas Saputra'
                                                            value={
                                                                manualForm.customerName
                                                            }
                                                            onChange={(event) =>
                                                                handleManualFormChange(
                                                                    "customerName",
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className='space-y-2'>
                                                        <Label htmlFor='manual-phone'>
                                                            Nomor telepon
                                                        </Label>
                                                        <Input
                                                            id='manual-phone'
                                                            placeholder='Contoh: 0812xxxxxxx'
                                                            value={
                                                                manualForm.phone
                                                            }
                                                            onChange={(event) =>
                                                                handleManualFormChange(
                                                                    "phone",
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className='space-y-2'>
                                                    <Label>Pilih layanan</Label>
                                                    <div className='space-y-2 rounded-xl border border-border/40 bg-muted/15 p-3'>
                                                        {barberServices.map(
                                                            (service) => {
                                                                const isChecked =
                                                                    selectedServiceIds.includes(
                                                                        service.id
                                                                    );
                                                                return (
                                                                    <label
                                                                        key={
                                                                            service.id
                                                                        }
                                                                        htmlFor={`service-${service.id}`}
                                                                        className='flex flex-col gap-1 rounded-lg border border-transparent px-2 py-2 transition hover:bg-background/80'
                                                                    >
                                                                        <div className='flex items-start justify-between gap-3'>
                                                                            <div className='flex items-start gap-3'>
                                                                                <Checkbox
                                                                                    id={`service-${service.id}`}
                                                                                    checked={
                                                                                        isChecked
                                                                                    }
                                                                                    onCheckedChange={() =>
                                                                                        toggleServiceSelection(
                                                                                            service.id
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <div>
                                                                                    <p className='text-sm font-semibold text-foreground'>
                                                                                        {
                                                                                            service.name
                                                                                        }
                                                                                    </p>
                                                                                    <p className='text-xs text-muted-foreground'>
                                                                                        {
                                                                                            service.description
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div className='text-right text-sm font-semibold text-foreground'>
                                                                                {formatCurrency(
                                                                                    service.price
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <div className='pl-8 text-[11px] uppercase tracking-widest text-muted-foreground'>
                                                                            Durasi:{" "}
                                                                            {
                                                                                service.duration
                                                                            }
                                                                        </div>
                                                                    </label>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                    {selectedServiceIds.length ===
                                                    0 ? (
                                                        <p className='text-[11px] text-destructive'>
                                                            Pilih minimal satu
                                                            layanan.
                                                        </p>
                                                    ) : null}
                                                </div>

                                                <div className='grid gap-3 sm:grid-cols-2'>
                                                    <div className='space-y-2'>
                                                        <Label htmlFor='manual-date'>
                                                            Tanggal
                                                        </Label>
                                                        <Input
                                                            id='manual-date'
                                                            placeholder='mm/dd/yyyy'
                                                            value={
                                                                manualForm.scheduleDate
                                                            }
                                                            onChange={(event) =>
                                                                handleManualFormChange(
                                                                    "scheduleDate",
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className='space-y-2'>
                                                        <Label htmlFor='manual-time'>
                                                            Waktu
                                                        </Label>
                                                        <Input
                                                            id='manual-time'
                                                            placeholder='--:-- --'
                                                            value={
                                                                manualForm.scheduleTime
                                                            }
                                                            onChange={(event) =>
                                                                handleManualFormChange(
                                                                    "scheduleTime",
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className='space-y-2'>
                                                    <Label>Tipe layanan</Label>
                                                    <Select
                                                        value={manualForm.type}
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            handleManualFormChange(
                                                                "type",
                                                                value
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger id='manual-type'>
                                                            <SelectValue placeholder='Pilih tipe layanan' />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value='on-site'>
                                                                On-site (di
                                                                barbershop)
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className='space-y-2'>
                                                    <Label htmlFor='manual-notes'>
                                                        Catatan tambahan
                                                    </Label>
                                                    <Textarea
                                                        id='manual-notes'
                                                        placeholder='Permintaan khusus, preferensi barber, atau catatan penting lainnya.'
                                                        value={manualForm.notes}
                                                        onChange={(event) =>
                                                            handleManualFormChange(
                                                                "notes",
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                        rows={4}
                                                    />
                                                </div>

                                                <div className='space-y-3 rounded-xl border border-border/40 bg-muted/15 p-3'>
                                                    <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
                                                        <div className='w-full space-y-2 sm:max-w-xs'>
                                                            <Label htmlFor='manual-promo'>
                                                                Kode promo
                                                            </Label>
                                                            <Input
                                                                id='manual-promo'
                                                                placeholder='Contoh: TRIM10'
                                                                value={
                                                                    manualForm.promoCode
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleManualFormChange(
                                                                        "promoCode",
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        {appliedPromo ? (
                                                            <Badge
                                                                variant='outline'
                                                                className='w-fit border-primary/40 bg-primary/10 text-[11px] font-semibold uppercase tracking-widest text-primary'
                                                            >
                                                                {
                                                                    appliedPromo.label
                                                                }
                                                            </Badge>
                                                        ) : null}
                                                    </div>
                                                    {appliedPromo ? (
                                                        <p className='text-xs text-muted-foreground'>
                                                            {promoIsEligible
                                                                ? "Promo diterapkan otomatis saat booking tersimpan."
                                                                : appliedPromo.notes ??
                                                                  "Promo belum memenuhi syarat."}
                                                        </p>
                                                    ) : (
                                                        <p className='text-xs text-muted-foreground'>
                                                            Masukkan kode promo
                                                            pelanggan jika
                                                            tersedia.
                                                        </p>
                                                    )}
                                                </div>

                                                <div className='space-y-2 rounded-xl border border-border/40 bg-background/80 p-4'>
                                                    <p className='text-sm font-semibold text-foreground'>
                                                        Ringkasan biaya
                                                    </p>
                                                    <div className='space-y-2 text-sm text-muted-foreground'>
                                                        {selectedServices.length ===
                                                        0 ? (
                                                            <p className='text-xs text-muted-foreground'>
                                                                Belum ada
                                                                layanan yang
                                                                dipilih.
                                                            </p>
                                                        ) : null}
                                                        {selectedServices.map(
                                                            (service) => (
                                                                <div
                                                                    key={`summary-${service.id}`}
                                                                    className='flex items-center justify-between'
                                                                >
                                                                    <span>
                                                                        {
                                                                            service.name
                                                                        }
                                                                    </span>
                                                                    <span className='font-medium text-foreground'>
                                                                        {formatCurrency(
                                                                            service.price
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            )
                                                        )}
                                                        <div className='flex items-center justify-between pt-2 text-xs uppercase tracking-widest text-muted-foreground'>
                                                            <span>
                                                                Subtotal
                                                            </span>
                                                            <span className='text-sm font-semibold text-foreground'>
                                                                {formatCurrency(
                                                                    subtotal
                                                                )}
                                                            </span>
                                                        </div>
                                                        {discountValue > 0 ? (
                                                            <div className='flex items-center justify-between text-xs uppercase tracking-widest text-emerald-600'>
                                                                <span>
                                                                    Diskon
                                                                </span>
                                                                <span className='text-sm font-semibold'>
                                                                    -
                                                                    {formatCurrency(
                                                                        discountValue
                                                                    )}
                                                                </span>
                                                            </div>
                                                        ) : null}
                                                        <div className='flex items-center justify-between border-t border-border/40 pt-3 text-sm font-semibold text-foreground'>
                                                            <span>Total</span>
                                                            <span>
                                                                {formatCurrency(
                                                                    grandTotal
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <DialogFooter className='border-t border-border/40 '>
                                                    <Button
                                                        variant='outline'
                                                        onClick={() =>
                                                            setManualDialogOpen(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        Batalkan
                                                    </Button>
                                                    <Button
                                                        onClick={
                                                            handleManualSubmit
                                                        }
                                                        disabled={
                                                            !isManualFormValid
                                                        }
                                                    >
                                                        Simpan & konfirmasi
                                                    </Button>
                                                </DialogFooter>
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-7 px-5 py-6 lg:space-y-8 lg:px-8 lg:py-8'>
                <Card className='border-border/50 shadow-sm'>
                    <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                        <div>
                            <CardTitle className='text-xl font-semibold tracking-tight'>
                                Ringkasan antrian
                            </CardTitle>
                            <CardDescription>
                                Prioritaskan konfirmasi manual agar pelanggan
                                menerima notifikasi tepat waktu.
                            </CardDescription>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            <Button
                                variant='outline'
                                size='sm'
                                className='border-border/60'
                            >
                                <Filter className='h-3.5 w-3.5' />
                                Filter status
                            </Button>
                            <Button
                                variant='outline'
                                size='sm'
                                className='border-border/60'
                            >
                                <Menu className='h-3.5 w-3.5' />
                                Urutkan
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                        {bookingSummary.map(
                            ({ label, value, helper, icon: Icon }) => (
                                <div
                                    key={label}
                                    className='rounded-xl border border-border/40 bg-muted/20 p-4 shadow-sm transition-all hover:border-primary/40 hover:shadow'
                                >
                                    <div className='flex items-center justify-between'>
                                        <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                                            <Icon className='h-5 w-5' />
                                        </span>
                                        <Badge
                                            variant='outline'
                                            className='border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground'
                                        >
                                            {label}
                                        </Badge>
                                    </div>
                                    <p className='mt-4 text-2xl font-bold text-foreground'>
                                        {value}
                                    </p>
                                    <p className='text-xs text-muted-foreground'>
                                        {helper}
                                    </p>
                                </div>
                            )
                        )}
                    </CardContent>
                </Card>

                <Card className='border-border/50 shadow-sm'>
                    <CardHeader className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
                        <div>
                            <CardTitle className='text-xl font-semibold tracking-tight'>
                                Daftar booking
                            </CardTitle>
                            <CardDescription>
                                Update status: konfirmasi → mulai → selesai agar
                                pelanggan menerima notifikasi otomatis.
                            </CardDescription>
                        </div>
                        <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                            <div className='relative w-full sm:w-64'>
                                <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                                <Input
                                    placeholder='Cari nama atau ID booking'
                                    className='pl-9'
                                />
                            </div>
                            <Button
                                variant='outline'
                                className='border-border/60'
                            >
                                <Clock className='h-4 w-4' />
                                Agenda saya
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='space-y-3 lg:hidden'>
                            {bookingList.map((item) => {
                                const bookingSlug = item.id.toLowerCase();
                                const phoneDigits = item.phone.replace(
                                    /\D/g,
                                    ""
                                );
                                const dialNumber = phoneDigits.startsWith("0")
                                    ? `62${phoneDigits.slice(1)}`
                                    : phoneDigits;
                                const telHref = `tel:+${dialNumber}`;
                                return (
                                    <div
                                        key={`${item.id}-compact`}
                                        className='space-y-3 rounded-2xl border border-border/50 bg-muted/15 p-4 shadow-sm'
                                    >
                                        <div className='flex flex-wrap items-start justify-between gap-3'>
                                            <div className='flex items-center gap-3'>
                                                <Avatar className='h-10 w-10 border border-border/40'>
                                                    <AvatarImage
                                                        src='/placeholder.jpg'
                                                        alt={item.customer}
                                                    />
                                                    <AvatarFallback className='bg-primary/10 text-xs font-semibold text-primary'>
                                                        {item.initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className='text-sm font-semibold text-foreground'>
                                                        {item.customer}
                                                    </p>
                                                    <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                                        {item.id}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col items-end gap-2 text-right'>
                                                <Badge
                                                    variant='outline'
                                                    className='border-border/50 bg-background/80 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground'
                                                >
                                                    {item.type}
                                                </Badge>
                                                <span className='text-sm font-semibold text-foreground'>
                                                    {item.price}
                                                </span>
                                            </div>
                                        </div>
                                        <div className='space-y-2 text-xs text-muted-foreground'>
                                            <span className='inline-flex items-center gap-1.5'>
                                                <Clock className='h-3.5 w-3.5 text-primary' />
                                                {item.schedule}
                                            </span>
                                            <span className='inline-flex items-center gap-1.5'>
                                                <MapPin className='h-3.5 w-3.5 text-primary' />
                                                {item.location}
                                            </span>
                                            <span className='inline-flex items-center gap-1.5'>
                                                <Scissors className='h-3.5 w-3.5 text-primary' />
                                                {item.service}
                                            </span>
                                        </div>
                                        <div className='flex flex-wrap items-center gap-2'>
                                            <Badge
                                                className={
                                                    statusBadgeStyles[
                                                        item.status
                                                    ]
                                                }
                                            >
                                                {statusLabels[item.status]}
                                            </Badge>
                                        </div>
                                        <div className='flex flex-wrap items-center gap-2'>
                                            <Button size='sm' asChild>
                                                <Link
                                                    href={`/barber/booking/${bookingSlug}`}
                                                    className='inline-flex items-center gap-2'
                                                >
                                                    <BadgeCheck className='h-3.5 w-3.5' />
                                                    Detail booking
                                                </Link>
                                            </Button>
                                            <Button
                                                size='sm'
                                                variant='outline'
                                                className='border-border/60'
                                                asChild
                                            >
                                                <a
                                                    href={telHref}
                                                    className='inline-flex items-center gap-2'
                                                >
                                                    <Phone className='h-3.5 w-3.5' />
                                                    Hubungi pelanggan
                                                </a>
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        size='sm'
                                                        variant='outline'
                                                        className='border-border/60'
                                                    >
                                                        Tindakan lain
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <BookingActionMenu
                                                    bookingSlug={bookingSlug}
                                                    telHref={telHref}
                                                    status={item.status}
                                                    handlePlaceholderAction={
                                                        handlePlaceholderAction
                                                    }
                                                    align='start'
                                                />
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className='hidden overflow-x-auto lg:block'>
                            <Table className='min-w-[960px]'>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className='whitespace-nowrap text-xs uppercase tracking-widest text-muted-foreground'>
                                            Pelanggan
                                        </TableHead>
                                        <TableHead className='whitespace-nowrap text-xs uppercase tracking-widest text-muted-foreground'>
                                            Jadwal & Lokasi
                                        </TableHead>
                                        <TableHead className='whitespace-nowrap text-xs uppercase tracking-widest text-muted-foreground'>
                                            Layanan
                                        </TableHead>
                                        <TableHead className='whitespace-nowrap text-xs uppercase tracking-widest text-muted-foreground'>
                                            Tipe
                                        </TableHead>
                                        <TableHead className='whitespace-nowrap text-xs uppercase tracking-widest text-muted-foreground'>
                                            Status
                                        </TableHead>
                                        <TableHead className='whitespace-nowrap text-right text-xs uppercase tracking-widest text-muted-foreground'>
                                            Tarif
                                        </TableHead>
                                        <TableHead className='whitespace-nowrap text-right text-xs uppercase tracking-widest text-muted-foreground'>
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bookingList.map((item) => {
                                        const bookingSlug = item.id.toLowerCase();
                                        const phoneDigits = item.phone.replace(
                                            /\D/g,
                                            ""
                                        );
                                        const dialNumber = phoneDigits.startsWith(
                                            "0"
                                        )
                                            ? `62${phoneDigits.slice(1)}`
                                            : phoneDigits;
                                        const telHref = `tel:+${dialNumber}`;
                                        return (
                                            <TableRow
                                                key={item.id}
                                                className='transition-colors hover:bg-muted/20'
                                            >
                                                <TableCell className='align-top'>
                                                    <div className='flex items-center gap-3'>
                                                        <Avatar className='h-9 w-9 border border-border/40'>
                                                            <AvatarImage
                                                                src='/placeholder.jpg'
                                                                alt={item.customer}
                                                            />
                                                            <AvatarFallback className='bg-primary/10 text-xs font-semibold text-primary'>
                                                                {item.initials}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className='text-sm font-semibold text-foreground'>
                                                                {item.customer}
                                                            </p>
                                                            <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                                                                {item.id}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className='align-top'>
                                                    <div className='space-y-1 text-xs text-muted-foreground'>
                                                        <span className='inline-flex items-center gap-1'>
                                                            <Clock className='h-3.5 w-3.5 text-primary' />
                                                            {item.schedule}
                                                        </span>
                                                        <span className='inline-flex items-center gap-1'>
                                                            <MapPin className='h-3.5 w-3.5 text-primary' />
                                                            {item.location}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className='align-top'>
                                                    <div className='inline-flex items-center gap-2 text-xs text-muted-foreground'>
                                                        <Scissors className='h-3.5 w-3.5 text-primary' />
                                                        {item.service}
                                                    </div>
                                                </TableCell>
                                                <TableCell className='align-top'>
                                                    <Badge
                                                        variant='outline'
                                                        className='border-border/50 bg-muted/10 text-xs text-muted-foreground'
                                                    >
                                                        {item.type}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className='align-top'>
                                                    <Badge
                                                        className={
                                                            statusBadgeStyles[
                                                                item.status
                                                            ]
                                                        }
                                                    >
                                                        {statusLabels[item.status]}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className='align-top text-right text-sm font-semibold text-foreground'>
                                                    {item.price}
                                                </TableCell>
                                                <TableCell className='align-top text-right'>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant='outline'
                                                                size='icon-sm'
                                                                className='border-border/60'
                                                                aria-label='Buka tindakan booking'
                                                            >
                                                                <PencilLine className='h-4 w-4' />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <BookingActionMenu
                                                            bookingSlug={bookingSlug}
                                                            telHref={telHref}
                                                            status={item.status}
                                                            handlePlaceholderAction={
                                                                handlePlaceholderAction
                                                            }
                                                        />
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                                <TableCaption>
                                    Data di-update otomatis dari aplikasi TrimTime.
                                    Pastikan status diperbarui agar pelanggan
                                    mendapat notifikasi realtime.
                                </TableCaption>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </PageShell>
    );
}
