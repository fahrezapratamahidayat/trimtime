"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import { appNavItems } from "./bottom-nav";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r border-border bg-card/90 shadow-lg backdrop-blur lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-72 lg:overflow-y-auto">
      <div className="flex h-full w-full flex-col gap-8 px-6 py-8">
        <div className="space-y-4">
          <Link href="/homepage" className="text-lg font-semibold tracking-tight text-foreground">
            TrimTime
          </Link>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/80 p-3 shadow-sm">
            <Avatar className="h-11 w-11 border border-muted">
              <AvatarImage src="/placeholder.jpg" alt="Rizky" />
              <AvatarFallback>RZ</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">Hi, Rizky</span>
              <span className="text-xs text-muted-foreground">SCBD, Jakarta</span>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {appNavItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href || pathname?.startsWith(`${href}/`);

            return (
              <Link key={href} href={href}>
                <span
                  className={cn(
                    "inline-flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3 rounded-2xl border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Tetap rapi sepanjang minggu</p>
          <p>
            Temukan promo terbaru dan jadwalkan styling favorit kamu langsung dari dashboard ini.
          </p>
        </div>
      </div>
    </aside>
  );
}
