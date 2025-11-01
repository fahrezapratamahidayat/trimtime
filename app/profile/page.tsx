import type { ComponentType, SVGProps } from "react";

import {
  Bell,
  Edit3,
  Instagram,
  Languages,
  Lock,
  LogOut,
  MapPin,
  MoonStar,
  PhoneCall,
  Scissors,
  ShieldAlert,
  Star,
  Ticket,
  Wallet,
  X as XIcon,
  Facebook
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const profileData = {
  nama: "Fahreza Pratama",
  nomor_hp: "+62 812 3456 7890",
  lokasi: "Garut, Jawa Barat",
  preferensi: ["Fade", "Undercut"],
  total_booking: 12,
  rating_diberikan: 4.8,
  loyalty_points: 7,
  saldo_wallet: 25000,
  promo: 2,
  bergabung: "Januari 2025"
};

const settingsMenu = [
  { icon: MoonStar, label: "Ganti Mode", hint: "Dark / Light", type: "toggle" as const },
  { icon: Bell, label: "Notifikasi & Reminder" },
  { icon: Languages, label: "Bahasa & Wilayah" },
  { icon: ShieldAlert, label: "Keamanan Akun", hint: "Ubah password, verifikasi OTP" },
  { icon: LogOut, label: "Logout Akun", tone: "warning" as const },
  { icon: Lock, label: "Hapus Akun Permanen", tone: "danger" as const }
];

const socials = [
  { icon: Instagram, label: "Instagram" },
  { icon: XIcon, label: "X" },
  { icon: Facebook, label: "Facebook" }
];

export default function ProfilePage() {
  return (
    <PageShell background="soft" contentClassName="gap-0">
      {/* Hero Profile Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 px-5 py-8 lg:px-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative space-y-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20 border-4 border-background shadow-lg ring-2 ring-primary/20 lg:h-24 lg:w-24">
              <AvatarImage src="/placeholder.jpg" alt={profileData.nama} />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                {profileData.nama
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div>
                <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">{profileData.nama}</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Member sejak {profileData.bergabung}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.preferensi.map((pref) => (
                  <span key={pref} className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <Scissors className="h-3 w-3" />
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-background/80 p-3 text-center backdrop-blur-sm">
              <p className="text-2xl font-bold text-primary">{profileData.total_booking}</p>
              <p className="text-xs font-medium text-muted-foreground">Booking</p>
            </div>
            <div className="rounded-lg bg-background/80 p-3 text-center backdrop-blur-sm">
              <p className="text-2xl font-bold text-primary">{profileData.rating_diberikan}</p>
              <p className="text-xs font-medium text-muted-foreground">Rating</p>
            </div>
            <div className="rounded-lg bg-background/80 p-3 text-center backdrop-blur-sm">
              <p className="text-2xl font-bold text-primary">{profileData.loyalty_points}</p>
              <p className="text-xs font-medium text-muted-foreground">Points</p>
            </div>
          </div>
        </div>
      </section>

      <main className="flex flex-col">
        {/* Profile Info */}
        <section className="space-y-4 px-5 py-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight">Informasi Pribadi</h2>
          <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm">

            <div className="grid gap-3 text-sm">
              <InfoRow icon={PhoneCall} label="Nomor Telepon" value={profileData.nomor_hp} />
              <InfoRow icon={MapPin} label="Lokasi" value={profileData.lokasi} />
            </div>
            <Button className="mt-4 w-full justify-center gap-2 rounded-lg bg-primary font-semibold shadow-sm transition-all hover:bg-primary/90 hover:shadow">
              <Edit3 className="h-4 w-4" />
              Edit Data Diri
            </Button>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="space-y-4 bg-muted/30 px-5 py-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight">Aksi Cepat</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="outline" className="h-auto flex-col gap-2 rounded-xl border-border/50 p-4 transition-all hover:bg-accent hover:shadow-sm">
              <Ticket className="h-6 w-6 text-primary" />
              <span className="text-sm font-semibold">Riwayat Booking</span>
              <span className="text-xs text-muted-foreground">{profileData.total_booking} pesanan</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 rounded-xl border-border/50 p-4 transition-all hover:bg-accent hover:shadow-sm">
              <Star className="h-6 w-6 text-primary" />
              <span className="text-sm font-semibold">Barber Favorit</span>
              <span className="text-xs text-muted-foreground">Kelola favorit</span>
            </Button>
          </div>
        </section>

        {/* Wallet & Promo */}
        <section className="space-y-4 px-5 py-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight">Wallet & Promo</h2>
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary via-primary to-accent p-6 shadow-lg">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="relative space-y-5 text-primary-foreground">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">
                    <Wallet className="h-5 w-5" />
                    Saldo Cashback
                  </span>
                  <p className="text-2xl font-bold">
                    Rp {profileData.saldo_wallet.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="h-px bg-white/20" />
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">
                    <Ticket className="h-5 w-5" />
                    Promo Aktif
                  </span>
                  <p className="text-2xl font-bold">
                    {profileData.promo} voucher
                  </p>
                </div>
              </div>
              <Button className="w-full justify-center rounded-lg bg-white font-bold text-primary shadow-lg transition-all hover:bg-white/90 hover:shadow-xl">
                Gunakan Promo
              </Button>
            </div>
          </div>
        </section>

        {/* Settings */}
        <section className="space-y-4 bg-muted/30 px-5 py-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight">Pengaturan</h2>
          <div className="rounded-xl border border-border/50 bg-card p-2 shadow-sm">
            {settingsMenu.map((item) => (
              <SettingsRow key={item.label} {...item} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="space-y-4 px-5 py-8 text-center lg:px-8">
          <div className="flex items-center justify-center gap-3">
            {socials.map(({ icon: Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-background text-muted-foreground shadow-sm transition-all hover:bg-primary hover:text-primary-foreground hover:shadow"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
          <p className="text-xs font-medium text-muted-foreground">Versi 1.0.3 — TrimTime © 2025</p>
        </footer>
      </main>
    </PageShell>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border/30 bg-muted/40 p-3">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-card-foreground">{value}</p>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
}) {
  return (
    <Card className="border border-border/50 bg-card text-card-foreground shadow-sm">
      <CardContent className="space-y-2 p-4 text-center">
        <span className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-base font-bold tracking-tight text-card-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}

function SettingsRow({
  icon: Icon,
  label,
  hint,
  type,
  tone
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  hint?: string;
  type?: "toggle";
  tone?: "warning" | "danger";
}) {
  const emphasis =
    tone === "warning"
      ? "text-secondary-foreground"
      : tone === "danger"
        ? "text-destructive"
        : "text-card-foreground";

  return (
    <div className="flex items-center justify-between rounded-lg px-3 py-3 transition-colors hover:bg-muted/50">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className={cn("text-sm font-semibold tracking-tight", emphasis)}>{label}</p>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
      </div>
      {type === "toggle" ? (
        <Switch defaultChecked className="shrink-0" />
      ) : (
        <button className="shrink-0 text-xs font-medium text-primary hover:text-primary/80">Kelola</button>
      )}
    </div>
  );
}

function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </svg>
  );
}
