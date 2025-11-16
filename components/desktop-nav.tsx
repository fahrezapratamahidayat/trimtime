"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BarChart3,
    Building2,
    ClipboardList,
    Crown,
    Headphones,
    Gift,
    LogOut,
    MapPin,
    MessageCircle,
    Megaphone,
    PanelsTopLeft,
    Settings2,
    ShoppingBag,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    UserCog,
    Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { appNavItems } from "./bottom-nav";

const barberNavItems = [
    { href: "/barber/dashboard", label: "Dashboard", icon: PanelsTopLeft },
    { href: "/barber/booking", label: "Booking", icon: ClipboardList },
    { href: "/barber/home-service", label: "Home Service", icon: MapPin },
    { href: "/barber/statistik", label: "Statistik", icon: BarChart3 },
    { href: "/barber/pengaturan", label: "Pengaturan", icon: Settings2 },
] as const;

const freelancerNavItems = [
    { href: "/freelancer/dashboard", label: "Dashboard", icon: PanelsTopLeft },
    { href: "/freelancer/jobs", label: "Daftar Job", icon: ClipboardList },
    { href: "/freelancer/home-service", label: "Home Service", icon: MapPin },
    { href: "/freelancer/statistik", label: "Statistik", icon: BarChart3 },
    { href: "/freelancer/pengaturan", label: "Pengaturan", icon: Settings2 },
] as const;

const ownerNavItems = [
    { href: "/owner/dashboard", label: "Dashboard", icon: PanelsTopLeft },
    { href: "/owner/cabang", label: "Cabang", icon: Building2 },
    { href: "/owner/barber", label: "Manajemen Barber", icon: UserCog },
    { href: "/owner/laporan", label: "Laporan & Keuangan", icon: BarChart3 },
    { href: "/owner/promo", label: "Promo & Loyalitas", icon: Gift },
    { href: "/owner/store", label: "Mini Store", icon: ShoppingBag },
    { href: "/owner/review", label: "Review Monitoring", icon: MessageCircle },
    { href: "/owner/premium", label: "TrimTime Premium", icon: Crown },
] as const;

const adminNavItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: PanelsTopLeft },
    {
        href: "/admin/barbershops",
        label: "Manajemen Barbershop",
        icon: ShieldCheck,
    },
    { href: "/admin/freelancer", label: "Kurasi Freelancer", icon: Sparkles },
    { href: "/admin/pelanggan", label: "Manajemen Pelanggan", icon: Users },
    {
        href: "/admin/transaksi",
        label: "Monitoring Transaksi",
        icon: BarChart3,
    },
    { href: "/admin/cms", label: "CMS & Konten", icon: Megaphone },
    {
        href: "/admin/analytics",
        label: "Analytics & Insight",
        icon: TrendingUp,
    },
    { href: "/admin/iklan", label: "Iklan & Partner", icon: Building2 },
    { href: "/admin/support", label: "Customer Support", icon: Headphones },
    { href: "/admin/keamanan", label: "Audit & Keamanan", icon: ShieldCheck },
] as const;

export function DesktopNav() {
    const pathname = usePathname();
    const isBarberRoute = pathname?.startsWith("/barber") ?? false;
    const isFreelancerRoute = pathname?.startsWith("/freelancer") ?? false;
    const isOwnerRoute = pathname?.startsWith("/owner") ?? false;
    const isAdminRoute = pathname?.startsWith("/admin") ?? false;

    return (
        <aside className='hidden border-r border-border/50 bg-card shadow-sm lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-80 lg:overflow-y-auto'>
            <div className='flex h-full w-full flex-col gap-6 p-6'>
                <div className='space-y-5'>
                    <Link
                        href='/user/homepage'
                        className='group flex items-center gap-3'
                    >
                        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/80 shadow-lg transition-transform group-hover:scale-105'>
                            <svg
                                className='h-6 w-6 text-primary-foreground'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M14.121 14.121a3 3 0 1 0 4.243 4.243M14.121 9.879l-4.242 4.242M10.535 5.464 8.05 7.95a3 3 0 1 1-4.243-4.243M8.052 8.048l7.07 7.07'
                                />
                            </svg>
                        </div>
                        <div>
                            <h1 className='text-xl font-bold tracking-tight text-foreground'>
                                TrimTime
                            </h1>
                            <p className='text-xs text-muted-foreground'>
                                Your Grooming Partner
                            </p>
                        </div>
                    </Link>
                    <div className='relative overflow-hidden rounded-xl border border-border/50 bg-linear-to-br from-primary/5 to-accent/5 p-4 shadow-sm'>
                        <div className='absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl' />
                        <div className='relative flex items-center gap-3'>
                            <Avatar className='h-12 w-12 border-2 border-background shadow-md ring-2 ring-primary/20'>
                                <AvatarImage
                                    src='/placeholder.jpg'
                                    alt='Rizky'
                                />
                                <AvatarFallback className='bg-primary/10 text-primary font-bold'>
                                    RZ
                                </AvatarFallback>
                            </Avatar>
                            <div className='flex-1'>
                                <p className='text-sm font-bold text-foreground'>
                                    Hi, Rizky! 👋
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                    📍 SCBD, Jakarta
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className='flex flex-1 flex-col gap-1.5'>
                    {!isBarberRoute &&
                        !isFreelancerRoute &&
                        !isOwnerRoute &&
                        !isAdminRoute && (
                            <>
                                <p className='px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                                    Menu
                                </p>
                                {appNavItems.map(
                                    ({ href, label, icon: Icon }) => {
                                        const isActive =
                                            pathname === href ||
                                            pathname?.startsWith(`${href}/`);

                                        return (
                                            <Link key={href} href={href}>
                                                <span
                                                    className={cn(
                                                        "group relative flex w-full items-center gap-3 overflow-hidden rounded-lg px-4 py-3 text-sm font-semibold transition-all",
                                                        isActive
                                                            ? "bg-primary text-primary-foreground shadow-md"
                                                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                                    )}
                                                >
                                                    {isActive && (
                                                        <span className='absolute inset-y-0 left-0 w-1 rounded-r-full bg-primary-foreground' />
                                                    )}
                                                    <Icon
                                                        className={cn(
                                                            "h-5 w-5 transition-transform",
                                                            isActive
                                                                ? ""
                                                                : "group-hover:scale-110"
                                                        )}
                                                    />
                                                    <span>{label}</span>
                                                </span>
                                            </Link>
                                        );
                                    }
                                )}
                            </>
                        )}
                    {isBarberRoute && (
                        <div className='mt-6 space-y-1.5'>
                            <p className='px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                                Barber Panel
                            </p>
                            {barberNavItems.map(
                                ({ href, label, icon: Icon }) => {
                                    const isActive =
                                        pathname === href ||
                                        pathname?.startsWith(`${href}/`);

                                    return (
                                        <Link key={href} href={href}>
                                            <span
                                                className={cn(
                                                    "group relative flex w-full items-center gap-3 overflow-hidden rounded-lg px-4 py-3 text-sm font-semibold transition-all",
                                                    isActive
                                                        ? "bg-primary text-primary-foreground shadow-md"
                                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                                )}
                                            >
                                                {isActive && (
                                                    <span className='absolute inset-y-0 left-0 w-1 rounded-r-full bg-primary-foreground' />
                                                )}
                                                <Icon
                                                    className={cn(
                                                        "h-5 w-5 transition-transform",
                                                        isActive
                                                            ? ""
                                                            : "group-hover:scale-110"
                                                    )}
                                                />
                                                <span>{label}</span>
                                            </span>
                                        </Link>
                                    );
                                }
                            )}
                        </div>
                    )}
                    {isFreelancerRoute && (
                        <div className='mt-6 space-y-1.5'>
                            <p className='px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                                Freelancer Panel
                            </p>
                            {freelancerNavItems.map(
                                ({ href, label, icon: Icon }) => {
                                    const isActive =
                                        pathname === href ||
                                        pathname?.startsWith(`${href}/`);

                                    return (
                                        <Link key={href} href={href}>
                                            <span
                                                className={cn(
                                                    "group relative flex w-full items-center gap-3 overflow-hidden rounded-lg px-4 py-3 text-sm font-semibold transition-all",
                                                    isActive
                                                        ? "bg-primary text-primary-foreground shadow-md"
                                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                                )}
                                            >
                                                {isActive && (
                                                    <span className='absolute inset-y-0 left-0 w-1 rounded-r-full bg-primary-foreground' />
                                                )}
                                                <Icon
                                                    className={cn(
                                                        "h-5 w-5 transition-transform",
                                                        isActive
                                                            ? ""
                                                            : "group-hover:scale-110"
                                                    )}
                                                />
                                                <span>{label}</span>
                                            </span>
                                        </Link>
                                    );
                                }
                            )}
                        </div>
                    )}
                    {isOwnerRoute && (
                        <div className='mt-6 space-y-1.5'>
                            <p className='px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                                Owner Panel
                            </p>
                            {ownerNavItems.map(
                                ({ href, label, icon: Icon }) => {
                                    const isActive =
                                        pathname === href ||
                                        pathname?.startsWith(`${href}/`);

                                    return (
                                        <Link key={href} href={href}>
                                            <span
                                                className={cn(
                                                    "group relative flex w-full items-center gap-3 overflow-hidden rounded-lg px-4 py-3 text-sm font-semibold transition-all",
                                                    isActive
                                                        ? "bg-primary text-primary-foreground shadow-md"
                                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                                )}
                                            >
                                                {isActive && (
                                                    <span className='absolute inset-y-0 left-0 w-1 rounded-r-full bg-primary-foreground' />
                                                )}
                                                <Icon
                                                    className={cn(
                                                        "h-5 w-5 transition-transform",
                                                        isActive
                                                            ? ""
                                                            : "group-hover:scale-110"
                                                    )}
                                                />
                                                <span>{label}</span>
                                            </span>
                                        </Link>
                                    );
                                }
                            )}
                        </div>
                    )}
                    {isAdminRoute && (
                        <div className='mt-6 space-y-1.5'>
                            <p className='px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                                Admin Panel
                            </p>
                            {adminNavItems.map(
                                ({ href, label, icon: Icon }) => {
                                    const isActive =
                                        pathname === href ||
                                        pathname?.startsWith(`${href}/`);

                                    return (
                                        <Link key={href} href={href}>
                                            <span
                                                className={cn(
                                                    "group relative flex w-full items-center gap-3 overflow-hidden rounded-lg px-4 py-3 text-sm font-semibold transition-all",
                                                    isActive
                                                        ? "bg-primary text-primary-foreground shadow-md"
                                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                                )}
                                            >
                                                {isActive && (
                                                    <span className='absolute inset-y-0 left-0 w-1 rounded-r-full bg-primary-foreground' />
                                                )}
                                                <Icon
                                                    className={cn(
                                                        "h-5 w-5 transition-transform",
                                                        isActive
                                                            ? ""
                                                            : "group-hover:scale-110"
                                                    )}
                                                />
                                                <span>{label}</span>
                                            </span>
                                        </Link>
                                    );
                                }
                            )}
                        </div>
                    )}
                </nav>
                <Button
                    variant='outline'
                    className='mt-2 w-full border-border/60 text-sm font-semibold'
                    asChild
                >
                    <Link
                        href='/login'
                        className='flex items-center justify-center gap-2'
                    >
                        <LogOut className='h-4 w-4' />
                        Keluar
                    </Link>
                </Button>
            </div>
        </aside>
    );
}
