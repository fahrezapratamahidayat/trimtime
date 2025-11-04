import Link from "next/link";
import {
  ArrowRight,
  Gift,
  GraduationCap,
  Home,
  Percent,
  Scissors,
  Sparkles
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { promoCollection } from "@/data/promos";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Scissors,
  Home,
  Gift,
  GraduationCap
};

export default function PromoPage() {
  const { featured, recommendations, categories } = promoCollection;

  return (
    <PageShell background="soft" contentClassName="gap-0">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 px-5 py-8 lg:px-8 lg:py-12">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative space-y-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              <Percent className="h-3.5 w-3.5" />
              Promo Spesial
            </div>
            <Badge className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-sm">
              New Deals
            </Badge>
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight lg:text-4xl">
            Hemat Lebih Banyak
            <br />
            <span className="text-primary">Dengan Promo Terbaik</span>
          </h1>
          <p className="text-sm text-muted-foreground lg:text-base">
            Pilih promo terbaik untuk hemat grooming di TrimTime
          </p>
        </div>
      </section>

      <main className="flex flex-col">
        {/* Featured Promo */}
        <section className="space-y-5 px-5 py-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight lg:text-2xl">Promo Unggulan</h2>
              <p className="mt-1 text-sm text-muted-foreground">Penawaran terbaik bulan ini</p>
            </div>
            <Link href={`/barbershop/${featured.barbershopId}`} className="text-sm font-semibold text-primary transition-colors hover:text-primary/80">
              Detail Barbershop →
            </Link>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-lg transition-all hover:shadow-xl">
            <div className="relative h-56 w-full overflow-hidden lg:h-64">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${featured.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                <Badge className="rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground shadow-lg backdrop-blur-sm">
                  {featured.discountLabel}
                </Badge>
                <Button size="sm" className="rounded-full bg-white font-semibold text-primary shadow-lg transition-all hover:bg-white/90 hover:shadow-xl">
                  Salin Kode
                </Button>
              </div>
              <div className="absolute inset-x-5 bottom-5 space-y-2 text-left text-white lg:inset-x-6 lg:bottom-6">
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5" />
                  {featured.subtitle}
                </p>
                <h3 className="text-2xl font-bold drop-shadow-lg lg:text-3xl">{featured.title}</h3>
                <p className="text-sm text-white/90">{featured.validUntilLabel}</p>
              </div>
            </div>

            <div className="space-y-4 p-5 lg:p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">{featured.description}</p>
              <div className="flex flex-wrap gap-2">
                {featured.terms.map((term) => (
                  <span key={term} className="rounded-lg bg-muted/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    {term}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4">
                <div className="text-sm">
                  <span className="text-muted-foreground">Berlaku di </span>
                  <span className="font-bold text-foreground">{featured.barbershopName}</span>
                </div>
                <Link href={`/booking/${featured.barbershopId}`}>
                  <Button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-semibold shadow-sm transition-all hover:bg-primary/90 hover:shadow">
                    Pakai Sekarang
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="space-y-5 bg-muted/30 px-5 py-8 lg:px-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight lg:text-2xl">Kategori Promo</h2>
            <p className="mt-1 text-sm text-muted-foreground">Temukan promo berdasarkan kebutuhan</p>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = iconMap[category.icon] ?? Sparkles;
              return (
                <div key={category.value} className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-5 shadow-sm transition-all hover:shadow-md">
                  <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/5 blur-2xl transition-transform group-hover:scale-150" />
                  <div className="relative space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold tracking-tight text-foreground">{category.label}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                    <Button variant="ghost" className="w-full justify-between px-0 text-xs font-semibold text-primary hover:text-primary/80">
                      Lihat Promo
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Recommendations */}
        <section className="space-y-5 px-5 py-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight lg:text-2xl">Rekomendasi Untukmu</h2>
              <p className="mt-1 text-sm text-muted-foreground">{recommendations.length} promo aktif tersedia</p>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {recommendations.map((promo) => (
              <div key={promo.id} className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all hover:shadow-md">
                <div className="relative h-40 w-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${promo.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                    <Badge className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-lg backdrop-blur-sm">
                      {promo.discountLabel}
                    </Badge>
                    <span className="rounded-lg bg-white/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                      {promo.category}
                    </span>
                  </div>
                  <div className="absolute inset-x-4 bottom-4 space-y-1 text-left text-white">
                    <h3 className="text-lg font-bold drop-shadow-lg">{promo.title}</h3>
                    <p className="text-xs text-white/90">{promo.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-3 p-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">{promo.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {promo.terms.map((term) => (
                      <span key={term} className="rounded-lg bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        {term}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-xs">
                    <span className="text-muted-foreground">
                      Berlaku sampai <span className="font-bold text-foreground">{promo.validUntilLabel}</span>
                    </span>
                    <span className="rounded-md bg-primary/10 px-2 py-1 font-bold text-primary">
                      {promo.code}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border/50 pt-3">
                    <Link
                      href={`/barbershop/${promo.barbershopId}`}
                      className="text-sm font-bold text-primary transition-colors hover:text-primary/80"
                    >
                      {promo.barbershopName}
                    </Link>
                    <Link href={`/booking/${promo.barbershopId}`}>
                      <Button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold shadow-sm transition-all hover:bg-primary/90 hover:shadow">
                        Pakai Promo
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
