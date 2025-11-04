"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HTMLAttributes } from "react";
import {
    CheckCircle2,
    Home,
    Scissors,
    ShoppingBag,
    Sparkles,
    User,
} from "lucide-react";

import { cn } from "@/lib/utils";

export const appNavItems = [
    { href: "/user/homepage", label: "Beranda", icon: Home },
    { href: "/user/marketplace", label: "Marketplace", icon: ShoppingBag },
    { href: "/user/orders", label: "Pesanan", icon: Scissors },
    { href: "/user/promo", label: "Promo", icon: Sparkles },
    { href: "/user/profile", label: "Profil", icon: User },
] as const;

type BottomNavProps = HTMLAttributes<HTMLDivElement>;

export function BottomNav({ className, ...props }: BottomNavProps) {
    const pathname = usePathname();
    const isBarbershopDetail = pathname?.startsWith("/barbershop/") ?? false;
    const allowedPrefixes = appNavItems.map(
        ({ href }) => href
    ) as ReadonlyArray<(typeof appNavItems)[number]["href"]>;
    const shouldShowDefaultNav = allowedPrefixes.some(
        (prefix) => pathname === prefix || pathname?.startsWith(`${prefix}/`)
    );

    if (isBarbershopDetail) {
        const barbershopId = pathname?.split("/")[2] ?? "";
        const detailMap: Record<string, { name: string; status: string }> = {
            "1": { name: "Cut & Chill Studio", status: "Open sekarang" },
        };
        const detail = detailMap[barbershopId] ?? {
            name: "Barbershop",
            status: "Open",
        };

        return (
            <nav
                className={cn(
                    "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 shadow-xl backdrop-blur-lg",
                    className
                )}
                {...props}
            >
                <div className='mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6'>
                    <div className='flex flex-col'>
                        <span className='text-sm font-semibold text-foreground'>
                            {detail.name}
                        </span>
                        <span className='inline-flex items-center gap-1 text-xs text-muted-foreground'>
                            <CheckCircle2 className='h-3.5 w-3.5 text-primary' />
                            {detail.status}
                        </span>
                    </div>
                    <Link
                        href={`/booking/${barbershopId}`}
                        className='shrink-0'
                    >
                        <span className='inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90'>
                            Booking sekarang
                            <Scissors className='h-4 w-4' />
                        </span>
                    </Link>
                </div>
            </nav>
        );
    }

    if (!shouldShowDefaultNav) {
        return null;
    }

    return (
        <nav
            className={cn(
                "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 shadow-xl backdrop-blur-lg",
                className
            )}
            {...props}
        >
            <div className='mx-auto flex w-full max-w-6xl items-center justify-around px-4 py-3 sm:px-6'>
                {appNavItems.map(({ href, label, icon: Icon }) => {
                    const isActive =
                        pathname === href || pathname?.startsWith(`${href}/`);
                    return (
                        <Link
                            key={href}
                            href={href}
                            className='flex flex-1 justify-center'
                        >
                            <span
                                className={cn(
                                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-lg"
                                        : "text-muted-foreground hover:bg-muted"
                                )}
                            >
                                <Icon className='h-4 w-4' />
                                <span>{label}</span>
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
