"use client";

import {
    ArrowRight,
    BarChart3,
    LineChart as LineChartIcon,
    Route,
    Star,
    TrendingUp,
    Wallet,
} from "lucide-react";
import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Line,
    LineChart,
    XAxis,
    YAxis,
} from "recharts";

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
    ChartContainer,
    ChartLegend,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const highlightMetrics = [
    {
        label: "Pendapatan minggu ini",
        value: "Rp 8.120.000",
        helper: "+12% dibanding minggu lalu",
        icon: Wallet,
    },
    {
        label: "Rata-rata rating",
        value: "4.9 / 5",
        helper: "118 ulasan baru",
        icon: Star,
    },
    {
        label: "Konversi home service",
        value: "86%",
        helper: "19 dari 22 permintaan",
        icon: Route,
    },
] as const;

const dailyRevenue = [
    { day: "Sen", pendapatan: 820_000, booking: 9 },
    { day: "Sel", pendapatan: 1_250_000, booking: 11 },
    { day: "Rab", pendapatan: 980_000, booking: 8 },
    { day: "Kam", pendapatan: 1_360_000, booking: 12 },
    { day: "Jum", pendapatan: 1_120_000, booking: 10 },
    { day: "Sab", pendapatan: 1_520_000, booking: 13 },
    { day: "Min", pendapatan: 640_000, booking: 6 },
] as const;

const weeklyRevenue = [
    { minggu: "13-19 Jan", pendapatan: 6_820_000, homeService: 14 },
    { minggu: "20-26 Jan", pendapatan: 7_250_000, homeService: 16 },
    { minggu: "27 Jan-2 Feb", pendapatan: 7_580_000, homeService: 18 },
    { minggu: "3-9 Feb", pendapatan: 8_120_000, homeService: 19 },
] as const;

const ratingSources = [
    {
        platform: "Aplikasi TrimTime",
        rating: 4.9,
        reviews: 118,
        highlight: "Mayoritas pelanggan premium",
    },
    {
        platform: "Google Review",
        rating: 4.8,
        reviews: 74,
        highlight: "Respons cepat & ramah",
    },
    {
        platform: "Walk-in Feedback",
        rating: 4.7,
        reviews: 56,
        highlight: "Suka suasana barbershop",
    },
] as const;

const dailyChartConfig = {
    pendapatan: {
        label: "Pendapatan (Rp)",
        color: "hsl(var(--primary))",
    },
    booking: {
        label: "Jumlah booking",
        color: "hsl(var(--accent))",
    },
} satisfies ChartConfig;

const weeklyChartConfig = {
    pendapatan: {
        label: "Pendapatan (Rp)",
        color: "hsl(var(--primary))",
    },
    homeService: {
        label: "Home service",
        color: "hsl(var(--secondary))",
    },
} satisfies ChartConfig;

export default function BarberStatistikPage() {
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
                                <TrendingUp className='h-4 w-4 text-primary' />
                                <div className='leading-tight'>
                                    <p className='text-xs font-semibold text-foreground'>
                                        Pendapatan minggu ini
                                    </p>
                                    <p>Rp 8.120.000</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2'>
                                <Star className='h-4 w-4 text-primary' />
                                <div className='leading-tight'>
                                    <p className='text-xs font-semibold text-foreground'>
                                        Rating rata-rata
                                    </p>
                                    <p>4.9 / 5</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 rounded-lg border border-border/40 bg-muted/15 px-3 py-2'>
                                <Route className='h-4 w-4 text-primary' />
                                <div className='leading-tight'>
                                    <p className='text-xs font-semibold text-foreground'>
                                        Home service
                                    </p>
                                    <p>19 perjalanan</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
                        <div className='space-y-3'>
                            <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary'>
                                <TrendingUp className='h-4 w-4' />
                                Insight Performa
                            </div>
                            <h1 className='text-3xl font-bold tracking-tight lg:text-4xl'>
                                Statistik pendapatan & rating barber
                            </h1>
                            <p className='max-w-2xl text-sm text-muted-foreground lg:text-base'>
                                Analisis pendapatan harian, tren mingguan, dan
                                kualitas layanan berdasarkan rating pelanggan.
                                Gunakan data ini untuk menentukan strategi promo
                                dan kapasitas tim.
                            </p>
                        </div>
                        <div className='flex flex-col gap-3 rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm backdrop-blur-sm lg:w-[22rem]'>
                            <div className='flex items-center justify-between text-xs text-muted-foreground'>
                                <span className='font-semibold uppercase tracking-widest'>
                                    Target bulanan
                                </span>
                                <Badge
                                    variant='outline'
                                    className='border-border/60 text-[10px] uppercase tracking-widest text-muted-foreground'
                                >
                                    Februari 2025
                                </Badge>
                            </div>
                            <div className='space-y-2 text-sm text-muted-foreground'>
                                <p className='text-lg font-bold text-foreground'>
                                    Rp 29.500.000
                                </p>
                                <p>Tercapai 72% hingga hari ini.</p>
                            </div>
                            <Progress value={72} />
                            <Button>Unduh laporan</Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className='space-y-6 px-5 py-6 lg:px-8 lg:py-8'>
                <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                    {highlightMetrics.map(
                        ({ label, value, helper, icon: Icon }) => (
                            <Card
                                key={label}
                                className='border-border/50 bg-card/90 shadow-sm transition-all hover:shadow-md'
                            >
                                <CardHeader className='gap-3'>
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
                                    <CardTitle className='text-2xl font-bold text-foreground'>
                                        {value}
                                    </CardTitle>
                                    <CardDescription className='text-xs text-muted-foreground'>
                                        {helper}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        )
                    )}
                </div>

                <div className='grid gap-5 xl:grid-cols-2'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                            <div>
                                <CardTitle className='text-xl font-semibold tracking-tight'>
                                    Pendapatan harian
                                </CardTitle>
                                <CardDescription>
                                    Bandingkan pendapatan dan jumlah booking
                                    selama 7 hari terakhir.
                                </CardDescription>
                            </div>
                            <Badge
                                variant='outline'
                                className='border-border/60 text-[10px] uppercase tracking-widest text-muted-foreground'
                            >
                                7 hari terakhir
                            </Badge>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <ChartContainer
                                config={dailyChartConfig}
                                className='h-[260px]'
                            >
                                <ComposedChart data={dailyRevenue}>
                                    <CartesianGrid
                                        strokeDasharray='4 8'
                                        stroke='var(--border)'
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey='day'
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        stroke='var(--muted-foreground)'
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        stroke='var(--muted-foreground)'
                                        tickFormatter={(value) =>
                                            `${value / 1000}k`
                                        }
                                    />
                                    <ChartTooltip
                                        cursor={{ fill: "transparent" }}
                                        content={<ChartTooltipContent />}
                                    />
                                    <Bar
                                        dataKey='pendapatan'
                                        barSize={28}
                                        radius={[10, 10, 0, 0]}
                                        fill='var(--color-pendapatan)'
                                    />
                                    <Line
                                        type='monotone'
                                        dataKey='booking'
                                        stroke='var(--color-booking)'
                                        strokeWidth={2.5}
                                        dot={{ r: 3.5 }}
                                        activeDot={{ r: 5 }}
                                    />
                                </ComposedChart>
                            </ChartContainer>
                            <div className='flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground'>
                                <div className='flex items-center gap-2'>
                                    <span className='inline-flex h-2 w-2 rounded-full bg-[var(--color-pendapatan)]' />
                                    Pendapatan (Rp)
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='inline-flex h-2 w-2 rounded-full bg-[var(--color-booking)]' />
                                    Jumlah booking
                                </div>
                                <Button
                                    variant='outline'
                                    size='sm'
                                    className='border-border/60'
                                >
                                    <BarChart3 className='h-3.5 w-3.5' />
                                    Detail transaksi
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                            <div>
                                <CardTitle className='text-xl font-semibold tracking-tight'>
                                    Tren mingguan
                                </CardTitle>
                                <CardDescription>
                                    Lihat performa pendapatan dan jumlah
                                    perjalanan home service.
                                </CardDescription>
                            </div>
                            <Badge
                                variant='outline'
                                className='border-border/60 text-[10px] uppercase tracking-widest text-muted-foreground'
                            >
                                4 minggu terakhir
                            </Badge>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <ChartContainer
                                config={weeklyChartConfig}
                                className='h-[260px]'
                            >
                                <LineChart data={weeklyRevenue}>
                                    <CartesianGrid
                                        strokeDasharray='4 8'
                                        stroke='var(--border)'
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey='minggu'
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                        stroke='var(--muted-foreground)'
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        stroke='var(--muted-foreground)'
                                        tickFormatter={(value) =>
                                            `${value / 1000}k`
                                        }
                                    />
                                    <ChartTooltip
                                        cursor={{ stroke: "var(--border)" }}
                                        content={
                                            <ChartTooltipContent indicator='line' />
                                        }
                                    />
                                    <Line
                                        type='monotone'
                                        dataKey='pendapatan'
                                        stroke='var(--color-pendapatan)'
                                        strokeWidth={2.5}
                                        dot={{ r: 3.5 }}
                                        activeDot={{ r: 5 }}
                                    />
                                    <Line
                                        type='monotone'
                                        dataKey='homeService'
                                        stroke='var(--color-homeService)'
                                        strokeWidth={2.5}
                                        strokeDasharray='6 3'
                                        dot={{ r: 3.5 }}
                                        activeDot={{ r: 5 }}
                                    />
                                    <ChartLegend className='pt-4 text-xs text-muted-foreground' />
                                </LineChart>
                            </ChartContainer>
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground'>
                                <p className='font-semibold text-primary'>
                                    Insight mingguan
                                </p>
                                <p className='mt-1 leading-relaxed'>
                                    Permintaan home service meningkat 15%
                                    setelah promo “TrimTime Anywhere” berjalan.
                                    Pertimbangkan untuk menambah slot barber
                                    mobile di akhir pekan.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className='grid gap-5 lg:grid-cols-[1.2fr_1fr]'>
                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
                            <div>
                                <CardTitle className='text-xl font-semibold tracking-tight'>
                                    Sumber rating pelanggan
                                </CardTitle>
                                <CardDescription>
                                    Pantau kualitas layanan dari berbagai kanal
                                    feedback.
                                </CardDescription>
                            </div>
                            <Button
                                variant='outline'
                                size='sm'
                                className='border-border/60'
                            >
                                <Star className='h-3.5 w-3.5' />
                                Lihat review
                            </Button>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            {ratingSources.map((source) => (
                                <div
                                    key={source.platform}
                                    className='rounded-xl border border-border/40 bg-muted/20 p-4'
                                >
                                    <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                                        <div>
                                            <p className='text-sm font-semibold text-foreground'>
                                                {source.platform}
                                            </p>
                                            <p className='text-xs text-muted-foreground'>
                                                {source.highlight}
                                            </p>
                                        </div>
                                        <Badge className='bg-primary/15 text-sm font-semibold text-primary'>
                                            {source.rating.toFixed(1)} / 5
                                        </Badge>
                                    </div>
                                    <div className='mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground'>
                                        <span>{source.reviews} ulasan</span>
                                        <span className='inline-flex items-center gap-1 rounded-full bg-background px-2 py-1'>
                                            <LineChartIcon className='h-3.5 w-3.5 text-primary' />
                                            Konsistensi bagus
                                        </span>
                                        <Button
                                            variant='outline'
                                            size='sm'
                                            className='border-border/60'
                                        >
                                            Respon cepat
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className='border-border/50 shadow-sm'>
                        <CardHeader className='space-y-3'>
                            <CardTitle className='text-xl font-semibold tracking-tight'>
                                Target yang disarankan
                            </CardTitle>
                            <CardDescription>
                                Fokuskan promo dan optimalisasi jadwal
                                berdasarkan data terbaru.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4 text-xs text-muted-foreground'>
                            <div className='rounded-xl border border-border/40 bg-muted/20 p-4'>
                                <p className='font-semibold text-primary'>
                                    Naikkan slot home service 10%
                                </p>
                                <p className='mt-1 leading-relaxed'>
                                    Permintaan meningkat di area Sudirman &
                                    Kuningan. Atur barber cadangan pada jam
                                    sibuk sore.
                                </p>
                            </div>
                            <div className='rounded-xl border border-border/40 bg-muted/20 p-4'>
                                <p className='font-semibold text-primary'>
                                    Kirim kampanye rating otomatis
                                </p>
                                <p className='mt-1 leading-relaxed'>
                                    40% pelanggan belum memberi review. Gunakan
                                    reminder via WhatsApp setelah layanan
                                    selesai.
                                </p>
                            </div>
                            <div className='rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4'>
                                <p className='font-semibold text-primary'>
                                    Eksport data mentah
                                </p>
                                <p className='mt-1 leading-relaxed'>
                                    Simpan laporan lengkap untuk rapat mingguan
                                    atau kolaborasi dengan tim marketing
                                    TrimTime.
                                </p>
                                <Button
                                    variant='outline'
                                    size='sm'
                                    className='mt-3 border-border/60'
                                >
                                    <ArrowRight className='h-3.5 w-3.5' />
                                    Buka pusat laporan
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </PageShell>
    );
}
