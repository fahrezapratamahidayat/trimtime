import Link from "next/link";

import type { LucideIcon } from "lucide-react";
import { ArrowRight, BriefcaseBusiness, Crown, Scissors, UserRound } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type RoleDefinition = {
  id: string;
  label: string;
  badge: string;
  description: string;
  icon: LucideIcon;
  href: string;
  cta: string;
  features: string[];
};

const roles: RoleDefinition[] = [
  {
    id: "owner",
    label: "Owner Barbershop",
    badge: "Kelola Outlet",
    description:
      "Kelola jadwal, tim barber, dan laporan outlet dalam satu dashboard.",
    icon: Crown,
    href: "/login/owner",
    cta: "Buka login owner",
    features: [
      "Daftar mandiri",
      "Menunggu persetujuan admin"
    ]
  },
  {
    id: "barber",
    label: "Barber Partner",
    badge: "Tim Layanan",
    description:
      "Akses operasional harian untuk menerima dan mengupdate booking.",
    icon: Scissors,
    href: "/login/barber",
    cta: "Buka login barber",
    features: [
      "Dibuat oleh owner",
      "Minta akses ke owner"
    ]
  },
  {
    id: "user",
    label: "Pelanggan TrimTime",
    badge: "Member",
    description:
      "Booking layanan favorit, atur jadwal, dan kumpulkan loyalty point.",
    icon: UserRound,
    href: "/login/user",
    cta: "Buka login pelanggan",
    features: [
      "Daftar mandiri",
      "Langsung aktif"
    ]
  },
  {
    id: "freelancer",
    label: "Freelancer TrimTime",
    badge: "Partner Lepas",
    description:
      "Terima job on-demand dan kembangkan portofolio barber kamu.",
    icon: BriefcaseBusiness,
    href: "/login/freelancer",
    cta: "Buka login freelancer",
    features: [
      "Daftar mandiri",
      "Menunggu persetujuan admin"
    ]
  }
];

export default function LoginPage() {
  return (
    <PageShell
      background="plain"
      containerClassName="pb-20 sm:pb-16"
      contentClassName="gap-8"
    >
      <main className="flex flex-1 flex-col gap-6">
        <section className="space-y-5 rounded-xl border border-border/50 bg-card/95 p-6 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Pilih peran kamu
            </p>
            <h2 className="text-lg font-semibold text-foreground">
              Login sesuai kebutuhan dan akses fitur yang tepat
            </h2>
            <p className="text-sm text-muted-foreground">
              Setiap peran mendapatkan akses dashboard berbeda. Pilih peran yang
              paling relevan sebelum melanjutkan metode login.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {roles.map(({ id, label, badge, description, icon: Icon, href, cta, features }) => (
              <Card
                key={id}
                className="flex h-full flex-col justify-between border-border/60 bg-background/60 shadow-sm transition hover:border-primary/50 hover:shadow-md"
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="space-y-1">
                        <CardTitle className="text-base font-semibold">
                          {label}
                        </CardTitle>
                        <Badge variant="outline" className="border-primary/40 bg-primary/10 text-xs font-medium uppercase tracking-wide text-primary">
                          {badge}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground">
                    {description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Alur akses:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {features.map((feature) => (
                      <Badge
                        key={feature}
                        variant="secondary"
                        className="border border-border/60 bg-background text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button asChild className="w-full justify-center gap-2">
                    <Link href={href}>
                      {cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-dashed border-border/50 bg-muted/30 p-4 text-center text-xs font-medium text-muted-foreground">
          Dengan masuk, kamu menyetujui Ketentuan Layanan dan Kebijakan Privasi
          TrimTime. Tim internal memiliki portal khusus di
          <span className="px-1 font-semibold text-primary">admin TrimTime</span>.
        </section>

        <div className="mt-auto space-y-3 rounded-xl border border-border/50 bg-muted/40 p-5 text-sm text-muted-foreground">
          <p className="font-semibold tracking-tight text-foreground">
            Keuntungan masuk:
          </p>
          <ul className="list-inside list-disc space-y-1">
            <li>Booking lebih cepat dengan preferensi tersimpan.</li>
            <li>Lacak riwayat layanan dan loyalty points kamu.</li>
            <li>
              Dapatkan notifikasi promo eksklusif dari barber favorit.
            </li>
          </ul>
        </div>
      </main>
    </PageShell>
  );
}
