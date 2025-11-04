"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Clock,
    Home,
    MapPin,
    Scissors,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Dummy data
const bookingData = {
    barbershop: "Cut & Chill Studio",
    services: [
        {
            id: "in-shop",
            name: "Cukur di studio",
            price: 65000,
            duration: "35 menit",
        },
        {
            id: "home",
            name: "Home service",
            price: 95000,
            duration: "55 menit",
        },
    ],
    estimate: { price: 65000, duration: "35 menit" },
};

const schedule = [
    {
        date: "2025-11-01",
        label: "Sabtu, 1 Nov",
        slots: [
            { time: "09:00", available: true, barbers: [1, 2] },
            { time: "10:30", available: true, barbers: [1] },
            { time: "13:00", available: false, barbers: [] },
            { time: "15:30", available: true, barbers: [2, 3] },
        ],
    },
    {
        date: "2025-01-16",
        label: "Kamis, 16 Jan",
        slots: [
            { time: "09:30", available: true, barbers: [2] },
            { time: "11:00", available: true, barbers: [1, 3] },
            { time: "14:30", available: true, barbers: [1, 2, 3] },
            { time: "16:00", available: false, barbers: [] },
        ],
    },
    {
        date: "2025-01-17",
        label: "Jumat, 17 Jan",
        slots: [
            { time: "10:00", available: true, barbers: [3] },
            { time: "12:30", available: true, barbers: [1, 2] },
            { time: "17:00", available: true, barbers: [2, 3] },
            { time: "19:00", available: false, barbers: [] },
        ],
    },
];

const barbers = [
    {
        id: 1,
        name: "Raka Pratama",
        rating: 4.7,
        avatar: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=400&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "Ardi Nugroho",
        rating: 4.6,
        avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "Lukman Hakim",
        rating: 4.8,
        avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=400&auto=format&fit=crop",
    },
];

export default function BookingPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [serviceType, setServiceType] = useState<"in-shop" | "home">(
        "in-shop"
    );
    const [homeAddress, setHomeAddress] = useState("");
    const [homeNotes, setHomeNotes] = useState("");
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedBarberId, setSelectedBarberId] = useState<number | null>(
        null
    );
    const [customerNote, setCustomerNote] = useState("");

    const selectedDay = useMemo(
        () => schedule.find((day) => day.date === selectedDate) ?? null,
        [selectedDate]
    );

    const slots = useMemo(() => selectedDay?.slots ?? [], [selectedDay]);
    const allTimes = useMemo(
        () => [
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "12:00",
            "12:30",
            "13:00",
            "13:30",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
            "16:30",
            "17:00",
            "17:30",
            "18:00",
            "18:30",
            "19:00",
            "19:30",
            "20:00",
        ],
        []
    );

    const availableBarberIds = useMemo(() => {
        if (!selectedTime) return [] as number[];
        const slot = slots.find((item) => item.time === selectedTime);
        return slot?.barbers ?? [];
    }, [selectedTime, slots]);

    const availableBarbers = useMemo(
        () =>
            barbers.filter((barber) => availableBarberIds.includes(barber.id)),
        [availableBarberIds]
    );

    const shippingFee = serviceType === "home" ? 10000 : 0;
    const baseService =
        bookingData.services.find((service) => service.id === serviceType) ??
        bookingData.services[0];
    const totalEstimate = baseService.price + shippingFee;

    const canBook = Boolean(
        selectedDate &&
            selectedTime &&
            selectedBarberId &&
            (serviceType === "home" ? homeAddress.trim().length >= 8 : true)
    );

    const handleServiceChange = (value: string) => {
        setServiceType(value === "home" ? "home" : "in-shop");
    };

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        setSelectedTime(null);
        setSelectedBarberId(null);
    };

    const handleTimeSelect = (time: string) => {
        const slot = slots.find((item) => item.time === time);
        if (!slot?.available || !slot.barbers.length) return;
        setSelectedTime(time);
        setSelectedBarberId(null);
    };

    const handleBooking = () => {
        if (!canBook || !selectedDate || !selectedTime || !selectedBarberId)
            return;

        const paramsObj = new URLSearchParams({
            serviceType,
            date: selectedDate,
            time: selectedTime,
            barber: selectedBarberId.toString(),
        });

        if (serviceType === "home" && homeAddress) {
            paramsObj.append("address", homeAddress);
        }

        if (homeNotes) {
            paramsObj.append("homeNotes", homeNotes);
        }

        if (customerNote) {
            paramsObj.append("note", customerNote);
        }

        router.push(`/payment/${params.id}?${paramsObj.toString()}`);
    };

    return (
        <PageShell background='hero' contentClassName='gap-6'>
            <header className='flex items-center justify-between rounded-xl border border-border/50 bg-card/95 px-5 py-4 shadow-sm backdrop-blur-sm lg:hidden'>
                <Link
                    href={`/barbershop/${params.id}`}
                    className='inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-background px-3 py-2 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground'
                >
                    <ArrowLeft className='h-3.5 w-3.5' />
                    Kembali
                </Link>
                <span className='rounded-lg border border-border/50 bg-muted px-3 py-2 text-xs font-medium text-muted-foreground shadow-sm'>
                    Booking #{params.id}
                </span>
            </header>

            <main className='flex flex-col gap-6'>
                <Card className='border border-border/50 bg-card text-card-foreground shadow-sm'>
                    <CardHeader className='space-y-1'>
                        <CardTitle className='text-lg font-semibold tracking-tight'>
                            {bookingData.barbershop}
                        </CardTitle>
                        <CardDescription className='text-sm text-muted-foreground'>
                            Pilih preferensi layanan dan jadwal terbaikmu.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-5'>
                        <section className='space-y-3'>
                            <Label className='flex items-center gap-2 text-xs font-semibold text-foreground'>
                                <Scissors className='h-4 w-4 text-primary' />
                                Jenis layanan
                            </Label>
                            <RadioGroup
                                defaultValue='in-shop'
                                value={serviceType}
                                onValueChange={handleServiceChange}
                                className='space-y-2'
                            >
                                <label
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg border p-4 transition-colors cursor-pointer",
                                        serviceType === "in-shop"
                                            ? "border-primary bg-primary/5 shadow-sm"
                                            : "border-border/50 hover:bg-muted/50"
                                    )}
                                >
                                    <RadioGroupItem
                                        value='in-shop'
                                        id='in-shop'
                                    />
                                    <div className='flex flex-1 flex-col text-sm'>
                                        <span className='font-semibold tracking-tight text-card-foreground'>
                                            Cukur di studio
                                        </span>
                                        <span className='text-xs text-muted-foreground'>
                                            Datang langsung ke barbershop
                                        </span>
                                    </div>
                                </label>
                                <label
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg border p-4 transition-colors cursor-pointer",
                                        serviceType === "home"
                                            ? "border-primary bg-primary/5 shadow-sm"
                                            : "border-border/50 hover:bg-muted/50"
                                    )}
                                >
                                    <RadioGroupItem value='home' id='home' />
                                    <div className='flex flex-1 flex-col text-sm'>
                                        <span className='flex items-center gap-2 font-semibold tracking-tight text-card-foreground'>
                                            Cukur di rumah
                                            <BadgeHome />
                                        </span>
                                        <span className='text-xs text-muted-foreground'>
                                            Stylist datang ke alamat kamu
                                        </span>
                                    </div>
                                </label>
                            </RadioGroup>
                        </section>

                        {serviceType === "home" && (
                            <section className='space-y-3 rounded-lg border border-border/50 bg-muted/20 p-4'>
                                <div className='space-y-2'>
                                    <Label className='flex items-center gap-2 text-xs font-semibold text-foreground'>
                                        <Home className='h-4 w-4 text-primary' />
                                        Alamat lengkap
                                    </Label>
                                    <Input
                                        id='address'
                                        value={homeAddress}
                                        onChange={(event) =>
                                            setHomeAddress(event.target.value)
                                        }
                                        placeholder='Contoh: Apartemen Sudirman Park, Tower A, No. 15'
                                        className='rounded-lg border-border/50 shadow-sm'
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className='text-xs font-semibold text-foreground'>
                                        Catatan untuk barber (opsional)
                                    </Label>
                                    <Input
                                        id='home-notes'
                                        value={homeNotes}
                                        onChange={(event) =>
                                            setHomeNotes(event.target.value)
                                        }
                                        placeholder='Misal: Gerbang cluster kode 1234, parkir di basement'
                                        className='rounded-lg border-border/50 shadow-sm'
                                    />
                                </div>
                                <p className='text-xs text-muted-foreground'>
                                    Biaya transportasi akan ditambahkan otomatis
                                    (maksimal jarak 10 km).
                                </p>
                            </section>
                        )}

                        <section className='space-y-4'>
                            <div className='space-y-2'>
                                <Label className='flex items-center gap-2 text-xs font-semibold text-foreground'>
                                    <CalendarDays className='h-4 w-4 text-primary' />
                                    Pilih tanggal booking
                                </Label>
                                <Input
                                    type='date'
                                    value={selectedDate || ""}
                                    onChange={(e) =>
                                        handleDateSelect(e.target.value)
                                    }
                                    min={new Date().toISOString().split("T")[0]}
                                    className='rounded-lg border-border/50 shadow-sm'
                                />
                                <p className='text-xs text-muted-foreground'>
                                    Pilih tanggal untuk melihat slot waktu yang
                                    tersedia
                                </p>
                            </div>

                            {selectedDate && (
                                <div className='space-y-2'>
                                    <Label className='flex items-center gap-2 text-xs font-semibold text-foreground'>
                                        <Clock className='h-4 w-4 text-primary' />
                                        Pilih waktu (
                                        {new Date(
                                            selectedDate
                                        ).toLocaleDateString("id-ID", {
                                            weekday: "long",
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                        )
                                    </Label>
                                    <div className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
                                        {allTimes.map((time) => {
                                            const slot = slots.find(
                                                (item) => item.time === time
                                            );
                                            const isAvailable = Boolean(
                                                slot?.available &&
                                                    slot.barbers.length
                                            );
                                            return (
                                                <button
                                                    key={time}
                                                    type='button'
                                                    onClick={() =>
                                                        isAvailable &&
                                                        handleTimeSelect(time)
                                                    }
                                                    disabled={!isAvailable}
                                                    className={cn(
                                                        "flex flex-col rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors",
                                                        selectedTime === time
                                                            ? "border-primary bg-primary/10 text-primary shadow-sm"
                                                            : "border-border/50 text-muted-foreground hover:bg-muted/50",
                                                        !isAvailable &&
                                                            "cursor-not-allowed opacity-40 hover:bg-card"
                                                    )}
                                                >
                                                    <span>{time}</span>
                                                    <span className='text-[11px] font-normal text-muted-foreground'>
                                                        {isAvailable
                                                            ? `${
                                                                  slot?.barbers
                                                                      .length ??
                                                                  0
                                                              } barber`
                                                            : "Tidak tersedia"}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <p className='text-xs text-muted-foreground'>
                                        💡 Slot cepat terisi di jam 17:00 -
                                        20:00, pesan lebih awal untuk
                                        menghindari antrian
                                    </p>
                                </div>
                            )}
                        </section>

                        <section className='space-y-3'>
                            <Label className='flex items-center gap-2 text-xs font-semibold text-muted-foreground'>
                                <Scissors className='h-4 w-4 text-primary' />
                                Pilih barber
                            </Label>
                            {selectedTime ? (
                                availableBarbers.length ? (
                                    <div className='space-y-2'>
                                        {availableBarbers.map((barber) => {
                                            const isSelected =
                                                selectedBarberId === barber.id;
                                            return (
                                                <button
                                                    key={barber.id}
                                                    type='button'
                                                    onClick={() =>
                                                        setSelectedBarberId(
                                                            barber.id
                                                        )
                                                    }
                                                    className={cn(
                                                        "flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors",
                                                        isSelected
                                                            ? "border-primary bg-primary/5 shadow-sm"
                                                            : "border-border/50 hover:bg-muted/50"
                                                    )}
                                                >
                                                    <Avatar className='h-12 w-12 border-2 border-border/50 shadow-sm'>
                                                        <AvatarImage
                                                            src={barber.avatar}
                                                            alt={barber.name}
                                                        />
                                                        <AvatarFallback className='bg-primary/10 text-primary font-semibold'>
                                                            {barber.name
                                                                .slice(0, 2)
                                                                .toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className='flex flex-1 flex-col'>
                                                        <span className='text-sm font-semibold tracking-tight text-card-foreground'>
                                                            {barber.name}
                                                        </span>
                                                        <span className='text-xs font-medium text-muted-foreground'>
                                                            Rating{" "}
                                                            {barber.rating.toFixed(
                                                                1
                                                            )}
                                                        </span>
                                                    </div>
                                                    <span className='text-xs text-muted-foreground'>
                                                        Pilih
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className='rounded-2xl border border-dashed border-border p-4 text-xs text-muted-foreground'>
                                        Slot {selectedTime} sudah penuh. Silakan
                                        pilih waktu lain.
                                    </div>
                                )
                            ) : (
                                <div className='rounded-lg border border-dashed border-border/50 bg-muted/20 p-4 text-xs text-muted-foreground'>
                                    Pilih waktu terlebih dahulu untuk melihat
                                    barber yang tersedia.
                                </div>
                            )}
                        </section>

                        <section className='space-y-2'>
                            <Label className='flex items-center gap-2 text-xs font-semibold text-muted-foreground'>
                                <MapPin className='h-4 w-4 text-primary' />
                                Catatan tambahan (opsional)
                            </Label>
                            <Textarea
                                value={customerNote}
                                onChange={(event) =>
                                    setCustomerNote(event.target.value)
                                }
                                rows={3}
                                placeholder='Contoh: Minta fade tipis ya, bawa alat steril sendiri'
                                className='rounded-lg border-border/50 shadow-sm'
                            />
                        </section>

                        <section className='space-y-3 rounded-lg border border-border/50 bg-muted/40 p-4 text-sm text-muted-foreground'>
                            <div className='flex items-center justify-between'>
                                <span className='font-semibold tracking-tight text-card-foreground'>
                                    Subtotal layanan
                                </span>
                                <span className='font-semibold text-card-foreground'>
                                    Rp {baseService.price.toLocaleString()}
                                </span>
                            </div>
                            <div className='flex items-center justify-between text-xs font-medium text-muted-foreground'>
                                <span className='inline-flex items-center gap-2'>
                                    <Clock className='h-3.5 w-3.5' />
                                    Estimasi durasi
                                </span>
                                <span>{baseService.duration}</span>
                            </div>
                            {serviceType === "home" && (
                                <div className='flex items-center justify-between text-xs font-medium text-muted-foreground'>
                                    <span className='inline-flex items-center gap-2'>
                                        <MapPin className='h-3.5 w-3.5' />
                                        Ongkir
                                    </span>
                                    <span>
                                        Rp {shippingFee.toLocaleString()}
                                    </span>
                                </div>
                            )}
                            <div className='flex items-center justify-between border-t border-border/50 pt-3 text-sm font-bold tracking-tight text-card-foreground'>
                                <span>Total estimasi</span>
                                <span>Rp {totalEstimate.toLocaleString()}</span>
                            </div>
                        </section>
                    </CardContent>
                </Card>

                <Button
                    onClick={handleBooking}
                    disabled={!canBook}
                    className='w-full justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-medium shadow-sm transition-all hover:bg-primary/90 hover:shadow disabled:opacity-50 disabled:shadow-none'
                >
                    Booking sekarang
                    <ArrowRight className='h-4 w-4' />
                </Button>
            </main>
        </PageShell>
    );
}

function BadgeHome() {
    return (
        <span className='inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-[10px] font-semibold text-secondary-foreground'>
            <Home className='h-3 w-3' />
            Populer
        </span>
    );
}
