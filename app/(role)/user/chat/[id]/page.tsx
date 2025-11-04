import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  MessageCircle,
  PackageCheck,
  Send,
  ShieldCheck,
  Sparkles,
  Star
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { getChatThreadById } from "@/data/chat-threads";
import { getBarberProductById } from "@/data/barber-products";

const priceFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

const stockLabels = {
  ready: "Ready stock",
  limited: "Stok terbatas",
  preorder: "Pre-order"
} as const;

export default async function UserChatDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const thread = getChatThreadById(id);

  if (!thread) {
    return (
      <PageShell
        background="plain"
        contentClassName="items-center justify-center gap-3 text-center"
      >
        <p className="text-sm text-muted-foreground">
          Chat tidak ditemukan atau sudah diarsipkan.
        </p>
        <Link
          href="/user/chat"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary transition hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke daftar chat
        </Link>
      </PageShell>
    );
  }

  const product = getBarberProductById(thread.productId);

  if (!product) {
    return (
      <PageShell
        background="plain"
        contentClassName="items-center justify-center gap-3 text-center"
      >
        <p className="text-sm text-muted-foreground">
          Detail produk untuk chat ini tidak ditemukan.
        </p>
        <Link
          href="/user/chat"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary transition hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke daftar chat
        </Link>
      </PageShell>
    );
  }

  const barberInitials = product.barbershop.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const userInitials = "KM";

  return (
    <PageShell background="soft" contentClassName="gap-0">
      <section className="relative overflow-hidden bg-linear-to-br from-primary/10 via-primary/5 to-accent/10 px-5 py-6 lg:px-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/user/chat"
              className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-background px-3 py-2 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Kembali ke Chat
            </Link>
            <Link
              href={`/user/marketplace/order/${product.id}`}
              className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-background px-3 py-2 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
            >
              Lihat detail produk
            </Link>
          </div>
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              <MessageCircle className="h-3.5 w-3.5" />
              {thread.statusLabel}
            </div>
            <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
              Tanya barber tentang produkmu
            </h1>
            <p className="text-sm text-muted-foreground lg:text-base">
              Sampaikan preferensi styling, jadwal pengiriman, atau kebutuhan khusus
              sebelum melanjutkan ke pembayaran.
            </p>
          </div>
        </div>
      </section>

      <main className="flex flex-col gap-6 px-5 py-6 lg:flex-row lg:px-8 lg:pb-10">
        <section className="flex-1 space-y-4">
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-border/40">
                  <AvatarImage
                    src={product.barbershop.avatar}
                    alt={product.barbershop.name}
                  />
                  <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                    {barberInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl font-semibold">
                    {product.barbershop.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Chat terkait {thread.productName}
                  </CardDescription>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <Badge
                  variant="outline"
                  className="border-border/60 bg-background/70 text-[11px] uppercase tracking-widest"
                >
                  {thread.lastActivityLabel}
                </Badge>
                <Badge
                  className="bg-primary/15 text-[11px] font-semibold uppercase tracking-widest text-primary"
                >
                  {thread.unreadCount > 0
                    ? `${thread.unreadCount} pesan belum dibaca`
                    : "Chat langsung barber"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="mx-auto w-fit rounded-full border border-dashed border-border/50 bg-muted/30 px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                Hari ini
              </div>
              <ScrollArea className="h-[380px] rounded-2xl border border-border/40 bg-background/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="space-y-4">
                  {thread.conversation.map((message) => {
                    const isUser = message.sender === "user";
                    const senderName = isUser ? "Kamu" : thread.barbershopName;

                    return (
                      <div
                        key={message.id}
                        className={`flex items-end gap-2 ${
                          isUser ? "flex-row-reverse" : ""
                        }`}
                      >
                        <Avatar className="h-9 w-9 border border-border/40">
                          <AvatarImage
                            src={
                              isUser ? undefined : product.barbershop.avatar
                            }
                            alt={senderName}
                          />
                          <AvatarFallback className="bg-muted text-xs font-semibold text-primary">
                            {isUser ? userInitials : barberInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`flex max-w-[75%] flex-col gap-1 ${
                            isUser ? "items-end text-right" : "items-start"
                          }`}
                        >
                          <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
                            <span className="text-foreground">{senderName}</span>
                            <span>•</span>
                            <span>{message.timestamp}</span>
                          </div>
                          <div
                            className={`w-fit rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                              isUser
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted/40 text-foreground"
                            }`}
                          >
                            <p>{message.text}</p>
                            {message.highlight ? (
                              <span
                                className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${
                                  isUser
                                    ? "text-primary-foreground/80"
                                    : "text-primary"
                                }`}
                              >
                                <Sparkles className="h-3 w-3" />
                                {message.highlight}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Pertanyaan cepat
                </p>
                <div className="flex flex-wrap gap-2">
                  {thread.quickReplies.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="rounded-full border border-border/60 bg-muted/30 px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <form className="flex flex-col gap-3">
                <Textarea
                  placeholder="Tulis pesan untuk barber..."
                  className="min-h-[72px] rounded-2xl border-border/50 bg-background"
                />
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] text-muted-foreground">
                    Barber akan menerima notifikasi instan setelah kamu mengirim pesan.
                  </p>
                  <Button
                    type="submit"
                    size="icon"
                    className="h-12 w-12 rounded-xl"
                    aria-label="Kirim pesan"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-4 lg:w-[320px]">
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="space-y-3">
              <CardTitle className="text-base font-semibold text-foreground">
                Ringkasan produk
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Detail singkat agar barber tahu preferensi kamu.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="space-y-2">
                <div className="relative h-32 overflow-hidden rounded-xl border border-border/40">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/5 to-transparent" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {product.name}
                  </p>
                  <p className="text-xs leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 text-xs">
                <div className="rounded-xl border border-border/40 bg-muted/20 px-3 py-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Harga
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {priceFormatter.format(product.price)}
                  </p>
                </div>
                <div className="rounded-xl border border-border/40 bg-muted/20 px-3 py-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Berat / isi
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {product.weight}
                  </p>
                </div>
                <div className="rounded-xl border border-border/40 bg-muted/20 px-3 py-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Rating pengguna
                  </p>
                  <p className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    {product.rating.toFixed(1)} ({product.ratingCount}+ review)
                  </p>
                </div>
                <div className="rounded-xl border border-border/40 bg-muted/20 px-3 py-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Ketersediaan
                  </p>
                  <Badge
                    variant="outline"
                    className="mt-1 w-fit border-primary/40 bg-primary/5 text-[11px] font-semibold uppercase tracking-widest text-primary"
                  >
                    {stockLabels[product.stockStatus]}
                  </Badge>
                </div>
              </div>

              <Separator className="bg-border/60" />

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Rekomendasi barber
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                    Produk original langsung dari barbershop partner TrimTime.
                  </li>
                  <li className="flex items-start gap-2">
                    <PackageCheck className="mt-0.5 h-4 w-4 text-primary" />
                    Bisa cek paket combo & request pengiriman same-day.
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 text-primary" />
                    Sampaikan jadwal penerimaan sebelum pukul 17.00 untuk diproses hari ini.
                  </li>
                </ul>
              </div>

              <Separator className="bg-border/60" />

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Highlight layanan
                </p>
                <div className="flex flex-wrap gap-2">
                  {thread.highlights.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1 rounded-full bg-muted/40 px-3 py-1 text-[11px] font-semibold text-muted-foreground"
                    >
                      <Sparkles className="h-3 w-3 text-primary" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>
    </PageShell>
  );
}
