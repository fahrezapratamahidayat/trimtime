"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Filter, Heart, Search, Sparkles } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { barbershopDatabase } from "@/data/barbershops";

const DEFAULT_RADIUS = 3;

const priceOptions = [
  { label: "Semua harga", value: "all" },
  { label: "< Rp 50K", value: "lt50" },
  { label: "Rp 50K - 80K", value: "50to80" },
  { label: "> Rp 80K", value: "gt80" }
];

const ratingOptions = [
  { label: "Semua", value: "all" },
  { label: "≥ 4.0", value: "4" },
  { label: "≥ 4.5", value: "4.5" },
  { label: "≥ 4.8", value: "4.8" }
];

const availabilityOptions = [
  { key: "open", label: "Sedang buka" },
  { key: "active-barber", label: "Barber aktif" },
  { key: "home-service", label: "Home service" }
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [radius, setRadius] = useState<number[]>([DEFAULT_RADIUS]);
  const [priceFilter, setPriceFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("4.5");
  const [activeToggles, setActiveToggles] = useState<string[]>(["open", "home-service"]);

  const activeFiltersText = useMemo(() => {
    const radiusText = `${radius[0]} km`;
    const priceText = priceOptions.find((opt) => opt.value === priceFilter)?.label ?? "Semua harga";
    const ratingText = ratingOptions.find((opt) => opt.value === ratingFilter)?.label ?? "Semua";
    const togglesText = activeToggles.length ? `${activeToggles.length} filter aktif` : "Tidak ada filter tambahan";
    return `${radiusText} • ${priceText} • ${ratingText} • ${togglesText}`;
  }, [radius, priceFilter, ratingFilter, activeToggles]);

  const handleResetFilters = () => {
    setRadius([DEFAULT_RADIUS]);
    setPriceFilter("all");
    setRatingFilter("4.5");
    setActiveToggles(["open", "home-service"]);
  };

  const toggleAvailability = (key: string) => {
    setActiveToggles((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]));
  };

  const filteredShops = useMemo(() => {
    const minRating = ratingFilter === "all" ? 0 : Number(ratingFilter);
    return barbershopDatabase.list.filter((shop) => {
      const matchTerm = searchTerm
        ? shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shop.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        : true;
      const matchRating = shop.rating >= minRating;
      return matchTerm && matchRating;
    });
  }, [searchTerm, ratingFilter]);

  return (
    <PageShell background="soft" contentClassName="gap-6">
      <header className="flex items-center justify-between gap-3 rounded-xl border border-border/50 bg-card/95 px-5 py-4 shadow-sm backdrop-blur-sm lg:hidden">
        <Link
          href="/homepage"
          className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-background px-3 py-2 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali
        </Link>
        <span className="text-xs font-medium text-muted-foreground line-clamp-1">
          {activeFiltersText}
        </span>
      </header>

      <main className="flex flex-col gap-6">
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Cari barbershop atau layanan…"
                className="h-11 rounded-lg border-border/50 bg-background pl-10 pr-4 text-sm shadow-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
              />
            </div>
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DialogTrigger asChild>
                <button className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Buka filter</span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-lg rounded-xl border border-border/50 bg-card p-0 text-left shadow-lg">
                <DialogHeader className="border-b border-border/50 px-6 py-4 text-left">
                  <DialogTitle className="flex items-center gap-2 text-base font-semibold tracking-tight text-card-foreground">
                    <Filter className="h-4 w-4 text-primary" />
                    Filter pencarian
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground">
                    Sesuaikan radius, harga, rating, dan ketersediaan untuk hasil terbaik.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-5 px-6 py-5 text-sm text-muted-foreground">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                      <span>Radius lokasi</span>
                      <span className="text-primary">{radius[0]} km</span>
                    </div>
                    <Slider min={1} max={10} step={1} value={radius} onValueChange={setRadius} className="w-full" />
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-foreground">Rentang harga</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {priceOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setPriceFilter(option.value)}
                          className={`rounded-lg border px-3 py-2 font-medium transition-colors ${
                            priceFilter === option.value
                              ? "border-primary bg-primary/10 text-primary shadow-sm"
                              : "border-border/50 text-muted-foreground hover:bg-muted/50"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-foreground">Rating minimal</p>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      {ratingOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setRatingFilter(option.value)}
                          className={`rounded-lg border px-3 py-2 font-medium transition-colors ${
                            ratingFilter === option.value
                              ? "border-primary bg-primary/10 text-primary shadow-sm"
                              : "border-border/50 text-muted-foreground hover:bg-muted/50"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-foreground">Ketersediaan</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {availabilityOptions.map((option) => {
                        const isActive = activeToggles.includes(option.key);
                        return (
                          <button
                            key={option.key}
                            type="button"
                            onClick={() => toggleAvailability(option.key)}
                            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 font-medium transition-colors ${
                              isActive
                                ? "border-primary bg-primary/10 text-primary shadow-sm"
                                : "border-border/50 text-muted-foreground hover:bg-muted/50"
                            }`}
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border/50 pt-4 text-xs">
                    <Button variant="ghost" size="sm" className="h-9 rounded-lg px-3 font-medium text-muted-foreground hover:text-foreground" onClick={handleResetFilters}>
                      Reset filter
                    </Button>
                    <span className="font-semibold text-foreground">{filteredShops.length} barbershop</span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Hasil pencarian</h2>
            <span className="text-sm font-medium text-muted-foreground">{filteredShops.length} ditemukan</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {filteredShops.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border/50 bg-muted/30 p-8 text-center text-sm text-muted-foreground">
                Tidak ada hasil cocok. Coba ubah kata kunci atau filter.
              </div>
            ) : (
              filteredShops.map((shop) => (
                <div key={shop.id} className="overflow-hidden rounded-xl border border-border/50 bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
                  <div className="relative h-40 w-full overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${shop.heroImage})` }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        ⭐ {shop.rating}
                        <span className="font-normal text-white/80">({shop.ratingCount})</span>
                      </span>
                      <button className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60">
                        <Heart className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4 p-4">
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold tracking-tight text-card-foreground line-clamp-1">{shop.name}</h3>
                      <p className="text-xs leading-relaxed text-muted-foreground line-clamp-1">{shop.address} • {shop.distance}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">Mulai dari {shop.price}</span>
                        <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                        <span className="text-muted-foreground">{shop.status}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {shop.services.map((service) => (
                        <span key={service} className="rounded-md bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                          {service}
                        </span>
                      ))}
                    </div>

                    <Link href={`/barbershop/${shop.id}`}>
                      <Button className="w-full justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow">
                        Lihat detail
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
