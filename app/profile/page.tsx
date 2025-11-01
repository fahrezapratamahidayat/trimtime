import type { ComponentType, SVGProps } from "react";

import {
  Bell,
  Edit3,
  Gift,
  Instagram,
  Languages,
  Lock,
  LogOut,
  MapPin,
  MoonStar,
  PhoneCall,
  Scissors,
  ShieldAlert,
  Sparkles,
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
    <PageShell background="mesh" contentClassName="gap-10">
      <main className="flex flex-col gap-8">
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-[3px] border-primary shadow-lg">
              <AvatarImage src="/placeholder.jpg" alt={profileData.nama} />
              <AvatarFallback>
                {profileData.nama
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="text-xl font-semibold">{profileData.nama}</h1>
              <p className="text-sm text-muted-foreground">
                Member sejak {profileData.bergabung}
              </p>
            </div>
          </div>

          <Card className="border-none bg-card text-card-foreground shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
            <CardContent className="space-y-4 p-6">
              <div className="grid gap-3 text-sm">
                <InfoRow icon={PhoneCall} label="Nomor Telepon" value={profileData.nomor_hp} />
                <InfoRow icon={MapPin} label="Lokasi" value={profileData.lokasi} />
                <InfoRow icon={Scissors} label="Preferensi Gaya Rambut" value={profileData.preferensi.join(", ")} />
                <InfoRow icon={CalendarIcon} label="Bergabung Sejak" value={profileData.bergabung} />
              </div>
              <Button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90">
                <Edit3 className="h-4 w-4" />
                Edit Data Diri
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-5">
          <h2 className="text-lg font-semibold">Aktivitas Saya</h2>
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon={Sparkles} label="Total Booking" value={`${profileData.total_booking}`} />
            <StatCard icon={Star} label="Rating Diberikan" value={`${profileData.rating_diberikan}`} />
            <StatCard icon={Gift} label="Loyalty Points" value={`${profileData.loyalty_points} poin`} />
          </div>
          <div className="grid gap-3">
            <Button variant="outline" className="w-full justify-center gap-2 rounded-2xl border-border bg-muted text-sm font-semibold text-muted-foreground transition hover:bg-accent">
              <Ticket className="h-4 w-4" />
              Lihat Riwayat Booking
            </Button>
            <Button variant="outline" className="w-full justify-center gap-2 rounded-2xl border-border bg-muted text-sm font-semibold text-muted-foreground transition hover:bg-accent">
              <Star className="h-4 w-4" />
              Barber Favorit Saya
            </Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Wallet & Promo</h2>
          <Card className="border-none bg-linear-to-br from-primary to-accent shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
            <CardContent className="space-y-4 p-6 text-primary-foreground">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-sm text-primary-foreground/80">
                  <Wallet className="h-4 w-4" />
                  Saldo Cashback
                </span>
                <p className="text-lg font-semibold text-primary-foreground">
                  Rp {profileData.saldo_wallet.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-sm text-primary-foreground/80">
                  <Ticket className="h-4 w-4" />
                  Promo Aktif
                </span>
                <p className="text-lg font-semibold text-primary-foreground">
                  {profileData.promo} voucher tersedia
                </p>
              </div>
              <Button className="w-full justify-center rounded-2xl bg-card text-card-foreground shadow hover:bg-card/90">
                Gunakan Promo
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Pengaturan</h2>
          <Card className="border-none bg-card text-card-foreground shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
            <CardContent className="space-y-1 p-4">
              {settingsMenu.map((item) => (
                <SettingsRow key={item.label} {...item} />
              ))}
            </CardContent>
          </Card>
        </section>

        <footer className="space-y-3 pb-4 text-center text-xs text-muted-foreground">
          <p>Versi 1.0.3 — TrimTime © 2025</p>
          <div className="flex items-center justify-center gap-4">
            {socials.map(({ icon: Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground backdrop-blur transition hover:bg-accent"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
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
    <div className="flex items-start gap-3 rounded-2xl bg-muted p-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-card-foreground">{value}</p>
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
    <Card className="border-none bg-card text-card-foreground shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
      <CardContent className="space-y-2 p-4 text-center">
        <span className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-muted text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-card-foreground">{value}</p>
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
    <div className="flex items-center justify-between rounded-2xl px-3 py-3 transition hover:bg-muted">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-muted text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <p className={cn("text-sm font-semibold", emphasis)}>{label}</p>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
      </div>
      {type === "toggle" ? (
        <Switch defaultChecked />
      ) : (
        <button className="text-xs font-semibold text-primary">Kelola</button>
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
