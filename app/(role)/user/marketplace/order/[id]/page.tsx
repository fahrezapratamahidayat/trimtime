import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Star,
  Truck
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import {
  barberMarketplaceProducts,
  getBarberProductById
} from "@/data/barber-products";

import { ProductOrderForm } from "../_components/product-order-form";

const priceFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

export default async function ProductOrderPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getBarberProductById(id);

  if (!product) {
    return (
      <PageShell
        background="plain"
        contentClassName="items-center justify-center text-center gap-4"
      >
        <p className="text-sm text-muted-foreground">
          Produk tidak ditemukan atau sudah tidak tersedia.
        </p>
        <Link
          href="/user/marketplace"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary transition hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke marketplace
        </Link>
      </PageShell>
    );
  }

  const recommended = barberMarketplaceProducts
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  return (
    <PageShell background="soft" contentClassName="gap-0">
      <section className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 px-5 py-8 lg:px-8 lg:py-12">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1 space-y-5">
            <Link
              href="/user/marketplace"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-border/50 bg-background px-3 py-2 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Kembali ke Marketplace
            </Link>
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                {product.barbershop.name}
              </div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground lg:text-4xl">
                {product.name}
              </h1>
              <p className="text-sm text-muted-foreground lg:text-base">
                {product.description}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 font-semibold text-primary shadow-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {product.rating.toFixed(1)} ({product.ratingCount}+)
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 font-semibold text-primary shadow-sm">
                <MapPin className="h-4 w-4" />
                {product.barbershop.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 font-semibold text-primary shadow-sm">
                <PackageCheck className="h-4 w-4" />
                {product.weight}
              </span>
            </div>
            <div className="flex flex-wrap items-baseline gap-3">
              <p className="text-3xl font-bold text-foreground">
                {priceFormatter.format(product.price)}
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                Produk barber asli
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {product.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-full bg-muted/60 px-3 py-1 text-[11px] font-semibold text-muted-foreground"
                >
                  #{tag.replace(/\s+/g, "")}
                </Badge>
              ))}
            </div>
          </div>
          <div className="w-full max-w-sm lg:ml-8">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/50 shadow-lg">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${product.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-primary shadow">
                <Truck className="h-3.5 w-3.5" />
                Siap kirim dari {product.barbershop.location}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex flex-col gap-8 pt-6">
        <ProductOrderForm product={product} />

        {recommended.length > 0 ? (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  Produk lainnya dari marketplace
                </h2>
                <p className="text-sm text-muted-foreground">
                  Coba juga barang favorit pengguna TrimTime lainnya.
                </p>
              </div>
              <Link
                href="/user/marketplace"
                className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Lihat semua →
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {recommended.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute inset-x-4 bottom-4 space-y-1 text-left text-white">
                      <p className="text-xs font-semibold text-white/80">
                        {item.barbershop.name}
                      </p>
                      <h3 className="text-base font-semibold drop-shadow">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-3 p-4">
                    <p className="text-sm font-semibold text-foreground">
                      {priceFormatter.format(item.price)}
                    </p>
                    <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                      {item.highlights.slice(0, 2).map((highlight) => (
                        <span
                          key={highlight}
                          className="inline-flex items-center gap-1 rounded-full bg-muted/40 px-2 py-1 font-semibold"
                        >
                          <Sparkles className="h-3 w-3 text-primary" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        {item.rating.toFixed(1)}
                      </span>
                      <Link
                        href={`/user/marketplace/order/${item.id}`}
                        className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary transition hover:bg-primary/20"
                      >
                        Pesan
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </PageShell>
  );
}
