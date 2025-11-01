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
    <PageShell background="soft" contentClassName="gap-8">
      <header className="flex items-center justify-between gap-3 rounded-3xl border border-border bg-card/90 px-6 py-5 shadow-sm">
        <Link
          href="/homepage"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-xs text-muted-foreground transition hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>
        <span className="text-xs text-muted-foreground">
          {activeFiltersText}
        </span>
      </header>

      <main className="flex flex-col gap-6">
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Cari barbershop atau layanan…"
                className="h-12 rounded-2xl border border-border bg-background pl-11 pr-4 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DialogTrigger asChild>
                <button className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card text-muted-foreground shadow-lg transition hover:bg-accent hover:text-foreground">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Buka filter</span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-lg rounded-3xl border border-border bg-card p-0 text-left">
                <DialogHeader className="border-b border-border px-5 py-4 text-left">
                  <DialogTitle className="flex items-center gap-2 text-base font-semibold text-card-foreground">
                    <Filter className="h-4 w-4 text-primary" />
                    Filter pencarian
                  </DialogTitle>
                  <DialogDescription className="text-xs">
                    Sesuaikan radius, harga, rating, dan ketersediaan untuk hasil terbaik.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 px-5 py-4 text-sm text-muted-foreground">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                      <span>Radius lokasi</span>
                      <span>{radius[0]} km</span>
                    </div>
                    <Slider min={1} max={10} step={1} value={radius} onValueChange={setRadius} className="w-full" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">Rentang harga</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {priceOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setPriceFilter(option.value)}
                          className={`rounded-2xl border px-3 py-2 font-medium transition ${
                            priceFilter === option.value
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">Rating minimal</p>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      {ratingOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setRatingFilter(option.value)}
                          className={`rounded-2xl border px-3 py-2 font-medium transition ${
                            ratingFilter === option.value
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">Ketersediaan</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {availabilityOptions.map((option) => {
                        const isActive = activeToggles.includes(option.key);
                        return (
                          <button
                            key={option.key}
                            type="button"
                            onClick={() => toggleAvailability(option.key)}
                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 transition ${
                              isActive
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                    <Button variant="ghost" className="rounded-full px-4 py-2" onClick={handleResetFilters}>
                      Reset filter
                    </Button>
                    <span>{filteredShops.length} barbershop ditemukan</span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-xs text-muted-foreground">{activeFiltersText}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Hasil pencarian</h2>
          <div className="grid grid-cols-1 gap-4">
            {filteredShops.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                Tidak ada hasil cocok. Coba ubah kata kunci atau filter.
              </div>
            ) : (
              filteredShops.map((shop) => (
                <div key={shop.id} className="overflow-hidden rounded-3xl bg-card text-card-foreground shadow-xl">
                  <div className="relative h-40 w-full overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${shop.heroImage})` }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />
                    <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                        ⭐ {shop.rating}
                        <span className="font-normal text-white/70">({shop.ratingCount})</span>
                      </span>
                      <button className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition hover:bg-black/50">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3 p-4">
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold text-card-foreground">{shop.name}</h3>
                      <p className="text-xs text-muted-foreground">{shop.address} • {shop.distance}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">Mulai dari {shop.price}</span>
                        <span className="h-1 w-1 rounded-full bg-border" />
                        <span className="text-secondary-foreground">{shop.status}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {shop.services.map((service) => (
                        <span key={service} className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground">
                          {service}
                        </span>
                      ))}
                    </div>

                    <Link href={`/barbershop/${shop.id}`}>
                      <Button className="w-full justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90">
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
