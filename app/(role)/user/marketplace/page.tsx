"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
    ArrowRight,
    Filter,
    Heart,
    MapPin,
    MessageCircle,
    Search,
    ShoppingBag,
    Sparkles,
    Star,
    Tag,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    barberMarketplaceProducts,
    type BarberProductCategory,
} from "@/data/barber-products";

type CategoryFilterKey = "all" | BarberProductCategory;

const categoryFilters: Array<{
    key: CategoryFilterKey;
    label: string;
    description: string;
}> = [
    {
        key: "all",
        label: "Semua Produk",
        description: "Koleksi lengkap marketplace barber",
    },
    {
        key: "pomade",
        label: "Pomade & Clay",
        description: "Finishing matte hingga high shine",
    },
    {
        key: "styling",
        label: "Styling Spray",
        description: "Sea salt & texturizer favorit",
    },
    {
        key: "haircare",
        label: "Perawatan Rambut",
        description: "Toner, pewarna, dan treatment",
    },
    {
        key: "grooming",
        label: "Grooming Pria",
        description: "Perawatan jenggot & wajah",
    },
    {
        key: "bundle",
        label: "Paket Bundling",
        description: "Hemat untuk styling lengkap",
    },
    {
        key: "accessories",
        label: "Aksesori Barber",
        description: "Sisir & tools profesional",
    },
];

const stockStatusStyles = {
    ready: {
        label: "Ready stock",
        className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    },
    limited: {
        label: "Stok terbatas",
        className: "border-amber-200 bg-amber-50 text-amber-700",
    },
    preorder: {
        label: "Pre-order",
        className: "border-sky-200 bg-sky-50 text-sky-700",
    },
} as const;

const priceFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
});

function getInitials(text: string) {
    return text
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

export default function MarketplacePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] =
        useState<CategoryFilterKey>("all");

    const uniqueShopCount = useMemo(() => {
        const ids = new Set(
            barberMarketplaceProducts.map((item) => item.barbershop.id)
        );
        return ids.size;
    }, []);

    const totalProducts = barberMarketplaceProducts.length;

    const trendingTags = useMemo(() => {
        return Array.from(
            new Set(barberMarketplaceProducts.flatMap((item) => item.tags))
        ).slice(0, 6);
    }, []);

    const filteredProducts = useMemo(() => {
        const normalizedTerm = searchTerm.trim().toLowerCase();

        return barberMarketplaceProducts
            .filter((product) => {
                const matchesTerm = normalizedTerm
                    ? product.name.toLowerCase().includes(normalizedTerm) ||
                      product.barbershop.name
                          .toLowerCase()
                          .includes(normalizedTerm) ||
                      product.tags.some((tag) =>
                          tag.toLowerCase().includes(normalizedTerm)
                      ) ||
                      product.highlights.some((highlight) =>
                          highlight.toLowerCase().includes(normalizedTerm)
                      )
                    : true;

                const matchesCategory =
                    activeCategory === "all" ||
                    product.category === activeCategory;

                return matchesTerm && matchesCategory;
            })
            .sort((a, b) => {
                if (b.rating !== a.rating) {
                    return b.rating - a.rating;
                }
                return a.price - b.price;
            });
    }, [searchTerm, activeCategory]);

    return (
        <PageShell background='soft' contentClassName='gap-0'>
            <section className='relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 px-5 py-8 lg:px-8 lg:py-12'>
                <div className='absolute inset-0 bg-grid-pattern opacity-5' />
                <div className='absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl' />
                <div className='absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-accent/10 blur-3xl' />
                <div className='relative space-y-6'>
                    <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary'>
                        <ShoppingBag className='h-3.5 w-3.5' />
                        Marketplace Barber
                    </div>
                    <div className='space-y-3'>
                        <h1 className='text-3xl font-bold leading-tight tracking-tight text-foreground lg:text-4xl'>
                            Belanja Produk Grooming Barber Favoritmu
                        </h1>
                        <p className='text-sm text-muted-foreground lg:text-base'>
                            Pomade, hair dye, dan paket styling dari barbershop
                            pilihan – langsung checkout tanpa ribet.
                        </p>
                    </div>
                    <div className='flex flex-col gap-3 rounded-xl border border-border/50 bg-card/95 p-4 shadow-sm backdrop-blur-sm lg:flex-row lg:items-center lg:gap-4'>
                        <div className='relative w-full lg:flex-1'>
                            <Search className='pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                            <Input
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(event.target.value)
                                }
                                placeholder='Cari produk, barber, atau manfaat…'
                                className='h-11 rounded-lg border-border/50 bg-background pl-10 pr-4 text-sm shadow-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20'
                            />
                        </div>
                        <div className='flex shrink-0 gap-2'>
                            <button className='inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border/50 bg-background text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground'>
                                <Filter className='h-4 w-4' />
                                <span className='sr-only'>Filter lanjutan</span>
                            </button>
                            <button className='inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border/50 bg-background text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground'>
                                <Heart className='h-4 w-4' />
                                <span className='sr-only'>Lihat wishlist</span>
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-wrap items-center gap-2 text-xs text-muted-foreground'>
                        <Sparkles className='h-3.5 w-3.5 text-primary' />
                        <span>
                            {totalProducts} produk pilihan dari{" "}
                            {uniqueShopCount} barbershop partner
                        </span>
                        <span className='hidden h-4 w-px bg-border/60 lg:block' />
                        <span className='hidden lg:inline'>
                            Transaksi aman, bisa pick-up di barber atau dikirim
                        </span>
                    </div>
                </div>
            </section>

            <main className='flex flex-col gap-6 pt-6'>
                <section className='space-y-5'>
                    <div className='flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between'>
                        <div className='space-y-1'>
                            <h2 className='text-xl font-bold tracking-tight lg:text-2xl'>
                                Pilih Produk Sesuai Kebutuhanmu
                            </h2>
                            <p className='text-sm text-muted-foreground'>
                                {filteredProducts.length} produk cocok dengan
                                preferensi kamu
                            </p>
                        </div>
                        <div className='flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground'>
                            <Tag className='h-3.5 w-3.5 text-primary' />
                            Trending:
                            {trendingTags.map((tag) => (
                                <span
                                    key={tag}
                                    className='rounded-full bg-muted/60 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground'
                                >
                                    #{tag.toLowerCase().replace(/\s+/g, "")}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        {categoryFilters.map(({ key, label, description }) => {
                            const isActive = activeCategory === key;
                            return (
                                <button
                                    key={key}
                                    type='button'
                                    onClick={() => setActiveCategory(key)}
                                    className={`group relative flex min-w-[150px] flex-1 rounded-xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 sm:min-w-[170px] ${
                                        isActive
                                            ? "border-primary bg-primary/10 text-primary shadow-sm"
                                            : "border-border/50 bg-background text-muted-foreground hover:border-border hover:bg-muted/40"
                                    }`}
                                >
                                    <div className='space-y-1'>
                                        <p className='text-sm font-semibold'>
                                            {label}
                                        </p>
                                        <p className='text-xs leading-relaxed'>
                                            {description}
                                        </p>
                                    </div>
                                    {isActive ? (
                                        <span className='absolute right-4 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded-full bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground shadow'>
                                            Aktif
                                        </span>
                                    ) : null}
                                </button>
                            );
                        })}
                    </div>
                </section>

                <section className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
                    {filteredProducts.map((product) => {
                        const stockMeta =
                            stockStatusStyles[product.stockStatus];
                        const barberInitials = getInitials(
                            product.barbershop.name
                        );
                        const detailPath = product.barbershop.detailPath;

                        return (
                            <div
                                key={product.id}
                                className='group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-all hover:shadow-lg'
                            >
                                <div className='relative h-48 w-full overflow-hidden'>
                                    <div
                                        className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110'
                                        style={{
                                            backgroundImage: `url(${product.image})`,
                                        }}
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
                                    <div className='absolute inset-x-4 top-4 flex items-center justify-between'>
                                        <span
                                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold shadow backdrop-blur-sm ${stockMeta.className}`}
                                        >
                                            {stockMeta.label}
                                        </span>
                                        <span className='rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-sm'>
                                            {product.weight}
                                        </span>
                                    </div>
                                    <div className='absolute inset-x-4 bottom-4 space-y-1 text-left text-white'>
                                        <span className='inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow'>
                                            <Sparkles className='h-3 w-3 text-primary-foreground' />
                                            Official Store
                                        </span>
                                        <p className='text-sm font-semibold text-white/90'>
                                            {product.barbershop.name}
                                        </p>
                                        <h3 className='text-lg font-bold leading-snug drop-shadow-lg'>
                                            {product.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className='flex flex-1 flex-col gap-4 p-4'>
                                    <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
                                        <div className='space-y-1'>
                                            <p className='text-lg font-semibold text-foreground'>
                                                {priceFormatter.format(
                                                    product.price
                                                )}
                                            </p>
                                            <p className='text-xs text-muted-foreground line-clamp-3'>
                                                {product.description}
                                            </p>
                                        </div>
                                        <Badge className='self-start rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary sm:self-auto'>
                                            Produk barber asli
                                        </Badge>
                                    </div>

                                    <div className='flex flex-wrap gap-2'>
                                        {product.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className='rounded-lg bg-muted/50 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground'
                                            >
                                                #{tag.replace(/\s+/g, "")}
                                            </span>
                                        ))}
                                    </div>

                                    <div className='flex flex-wrap gap-2'>
                                        {product.highlights.map((highlight) => (
                                            <span
                                                key={highlight}
                                                className='inline-flex items-center gap-1 rounded-lg bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary'
                                            >
                                                <Sparkles className='h-3 w-3' />
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>

                                    <div className='flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted/40 px-3 py-2 text-xs text-muted-foreground'>
                                        <div className='inline-flex items-center gap-1.5 text-foreground'>
                                            <Star className='h-3.5 w-3.5 fill-yellow-400 text-yellow-400' />
                                            <span className='font-semibold'>
                                                {product.rating.toFixed(1)}
                                            </span>
                                            <span>({product.ratingCount})</span>
                                        </div>
                                        <div className='inline-flex items-center gap-1.5'>
                                            <MapPin className='h-3.5 w-3.5 text-primary' />
                                            <span className='font-semibold text-foreground'>
                                                {product.barbershop.location}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='mt-auto flex flex-col gap-3 border-t border-border/50 pt-4  '>
                                        <div className='flex items-center gap-3'>
                                            <Avatar className='h-10 w-10 border border-border/70 shadow-sm'>
                                                <AvatarImage
                                                    src={
                                                        product.barbershop
                                                            .avatar
                                                    }
                                                    alt={
                                                        product.barbershop.name
                                                    }
                                                />
                                                <AvatarFallback className='bg-primary/10 text-xs font-bold text-primary'>
                                                    {barberInitials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className='text-sm font-semibold text-foreground'>
                                                    {product.barbershop.name}
                                                </p>
                                                <span className='text-xs text-muted-foreground'>
                                                    Siap kirim dari{" "}
                                                    {
                                                        product.barbershop
                                                            .location
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className='flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:justify-end'>
                                            {detailPath ? (
                                                <Link href={detailPath}>
                                                    <Button
                                                        variant='outline'
                                                        size='sm'
                                                        className='w-full rounded-lg border-border/60 text-xs font-semibold sm:w-auto'
                                                    >
                                                        Detail Barber
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    className='w-full rounded-lg border-border/60 text-xs font-semibold sm:w-auto'
                                                    disabled
                                                >
                                                    Profil Barber
                                                </Button>
                                            )}
                                            <Link
                                                href={`/user/marketplace/order/${product.id}`}
                                            >
                                                <Button
                                                    size='sm'
                                                    className='w-full rounded-lg text-xs font-semibold shadow-sm sm:w-auto'
                                                >
                                                    Pesan Sekarang
                                                    <ArrowRight className='ml-1 h-3.5 w-3.5' />
                                                </Button>
                                            </Link>
                                            <Button
                                                type='button'
                                                variant='ghost'
                                                size='sm'
                                                className='w-full rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground sm:w-auto'
                                            >
                                                <MessageCircle className='h-3.5 w-3.5' />
                                                Chat Barber
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </section>

                {filteredProducts.length === 0 ? (
                    <div className='flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border/60 bg-card/70 px-6 py-12 text-center'>
                        <ShoppingBag className='h-8 w-8 text-muted-foreground' />
                        <div className='space-y-2'>
                            <p className='text-sm font-semibold text-foreground'>
                                Belum ada produk yang cocok
                            </p>
                            <p className='text-sm text-muted-foreground'>
                                Coba ganti kata kunci atau filter untuk
                                menemukan produk terbaik dari barbershop
                                favoritmu.
                            </p>
                        </div>
                        <Button
                            variant='outline'
                            className='rounded-lg border-border/50 text-sm font-semibold'
                            onClick={() => {
                                setActiveCategory("all");
                                setSearchTerm("");
                            }}
                        >
                            Reset pencarian
                        </Button>
                    </div>
                ) : null}
            </main>
        </PageShell>
    );
}
