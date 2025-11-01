"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, ClipboardList, MapPin, PanelsTopLeft, Settings2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import { appNavItems } from "./bottom-nav";

const barberNavItems = [
  { href: "/barber/dashboard", label: "Dashboard", icon: PanelsTopLeft },
  { href: "/barber/booking", label: "Booking", icon: ClipboardList },
  { href: "/barber/home-service", label: "Home Service", icon: MapPin },
  { href: "/barber/statistik", label: "Statistik", icon: BarChart3 },
  { href: "/barber/pengaturan", label: "Pengaturan", icon: Settings2 }
] as const;

export function DesktopNav() {
  const pathname = usePathname();
  const isBarberRoute = pathname?.startsWith("/barber") ?? false;

  return (
    <aside className="hidden border-r border-border/50 bg-card shadow-sm lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-80 lg:overflow-y-auto">
      <div className="flex h-full w-full flex-col gap-6 p-6">
        {/* Brand Header */}
        <div className="space-y-5">
          <Link href="/homepage" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg transition-transform group-hover:scale-105">
              <svg className="h-6 w-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121a3 3 0 1 0 4.243 4.243M14.121 9.879l-4.242 4.242M10.535 5.464 8.05 7.95a3 3 0 1 1-4.243-4.243M8.052 8.048l7.07 7.07" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">TrimTime</h1>
              <p className="text-xs text-muted-foreground">Your Grooming Partner</p>
            </div>
          </Link>

          {/* User Card */}
          <div className="relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 p-4 shadow-sm">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
            <div className="relative flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-background shadow-md ring-2 ring-primary/20">
                <AvatarImage src="/placeholder.jpg" alt="Rizky" />
                <AvatarFallback className="bg-primary/10 text-primary font-bold">RZ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">Hi, Rizky! 👋</p>
                <p className="text-xs text-muted-foreground">📍 SCBD, Jakarta</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1.5">
          {!isBarberRoute ? (
            <>
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Menu</p>
              {appNavItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href || pathname?.startsWith(`${href}/`);

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
                        <span className="absolute inset-y-0 left-0 w-1 rounded-r-full bg-primary-foreground" />
                      )}
                      <Icon className={cn("h-5 w-5 transition-transform", isActive ? "" : "group-hover:scale-110")} />
                      <span>{label}</span>
                    </span>
                  </Link>
                );
              })}
            </>
          ) : null}
          <div className={cn(!isBarberRoute ? "mt-6" : "", "space-y-1.5")}>
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Barber Panel</p>
            {barberNavItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || pathname?.startsWith(`${href}/`);

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
                      <span className="absolute inset-y-0 left-0 w-1 rounded-r-full bg-primary-foreground" />
                    )}
                    <Icon className={cn("h-5 w-5 transition-transform", isActive ? "" : "group-hover:scale-110")} />
                    <span>{label}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Promotional Card */}
        <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-4 shadow-sm">
          <div className="absolute -right-6 -bottom-6 h-20 w-20 rounded-full bg-primary/20 blur-2xl" />
          <div className="relative space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-2.5 py-1 text-xs font-bold text-primary">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Promo Spesial
            </div>
            <p className="text-sm font-bold leading-snug text-foreground">
              Tetap Rapi Sepanjang Minggu! ✨
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Temukan promo terbaru dan jadwalkan styling favorit kamu sekarang.
            </p>
            <Link href="/promo" className="inline-flex items-center gap-1 text-xs font-bold text-primary transition-colors hover:text-primary/80">
              Lihat Promo
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
