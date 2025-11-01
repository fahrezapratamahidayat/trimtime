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
import { Card, CardContent } from "@/components/ui/card";
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
    <PageShell background="soft" contentClassName="gap-8">
      <header className="flex items-center justify-between rounded-3xl border border-border bg-card/90 px-6 py-5 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-foreground">Promo spesial</h1>
          <p className="text-sm text-muted-foreground">
            Pilih promo terbaik untuk hemat grooming di TrimTime.
          </p>
        </div>
        <Badge className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Percent className="mr-1 h-3.5 w-3.5" />
          New deals
        </Badge>
      </header>

      <main className="flex flex-col gap-6">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Promo unggulan</h2>
            <Link href={`/barbershop/${featured.barbershopId}`} className="text-xs font-semibold text-primary underline-offset-4 hover:underline">
              Detail barbershop
            </Link>
          </div>

          <Card className="overflow-hidden border-none bg-card text-card-foreground shadow-xl">
            <div className="relative h-40 w-full overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${featured.image})` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                <Badge className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {featured.discountLabel}
                </Badge>
                <Button variant="secondary" size="sm" className="rounded-full text-xs font-semibold">
                  Salin kode
                </Button>
              </div>
              <div className="absolute inset-x-4 bottom-4 space-y-1 text-left text-white">
                <p className="text-xs font-semibold uppercase tracking-wide">{featured.subtitle}</p>
                <h3 className="text-xl font-semibold">{featured.title}</h3>
                <p className="text-xs text-white/80">{featured.validUntilLabel}</p>
              </div>
            </div>

            <CardContent className="space-y-3 p-4 text-sm text-muted-foreground">
              <p className="leading-relaxed">{featured.description}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {featured.terms.map((term) => (
                  <span key={term} className="rounded-full bg-muted px-3 py-1 text-muted-foreground">
                    {term}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-muted-foreground">
                  Berlaku di{" "}
                  <span className="font-semibold text-card-foreground">
                    {featured.barbershopName}
                  </span>
                </div>
                <Link href={`/booking/${featured.barbershopId}`}>
                  <Button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90">
                    Pakai sekarang
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Kategori promo</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => {
              const Icon = iconMap[category.icon] ?? Sparkles;
              return (
                <Card key={category.value} className="border-none bg-card text-card-foreground shadow-md">
                  <CardContent className="space-y-3 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-card-foreground">
                        {category.label}
                      </span>
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>
                    <Button variant="ghost" className="w-full justify-between px-0 text-xs text-primary">
                      Lihat promo
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Rekomendasi untukmu</h2>
            <span className="text-xs text-muted-foreground">
              {recommendations.length} promo aktif
            </span>
          </div>
          <div className="space-y-4">
            {recommendations.map((promo) => (
              <Card key={promo.id} className="overflow-hidden border-none bg-card text-card-foreground shadow-lg">
                <div className="relative h-32 w-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${promo.image})` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                    <Badge className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      {promo.discountLabel}
                    </Badge>
                    <span className="rounded-full bg-background/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                      {promo.category}
                    </span>
                  </div>
                  <div className="absolute inset-x-4 bottom-4 space-y-1 text-left text-white">
                    <h3 className="text-lg font-semibold">{promo.title}</h3>
                    <p className="text-xs text-white/80">{promo.subtitle}</p>
                  </div>
                </div>
                <CardContent className="space-y-3 p-4 text-sm text-muted-foreground">
                  <p>{promo.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {promo.terms.map((term) => (
                      <span key={term} className="rounded-full bg-muted px-3 py-1">
                        {term}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
                    <span>
                      Berlaku sampai{" "}
                      <span className="font-semibold text-card-foreground">
                        {promo.validUntilLabel}
                      </span>
                    </span>
                    <span className="font-semibold text-primary">
                      Kode: {promo.code}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Link
                      href={`/barbershop/${promo.barbershopId}`}
                      className="text-xs font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      {promo.barbershopName}
                    </Link>
                    <Link href={`/booking/${promo.barbershopId}`}>
                      <Button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90">
                        Pakai promo
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
