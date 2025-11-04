import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  MessageCircle,
  Search
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { chatThreads } from "@/data/chat-threads";

const statusColors: Record<string, string> = {
  Aktif: "bg-emerald-500/10 text-emerald-600",
  "Menunggu balasan": "bg-amber-500/10 text-amber-600",
  Selesai: "bg-muted/40 text-muted-foreground"
};

export default function UserChatListPage() {
  return (
    <PageShell background="soft" contentClassName="gap-0">
      <section className="relative overflow-hidden bg-linear-to-br from-primary/10 via-primary/5 to-accent/10 px-5 py-6 lg:px-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              <MessageCircle className="h-3.5 w-3.5" />
              Chat Barber
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                Kotak pesan TrimTime
              </h1>
              <p className="text-sm text-muted-foreground lg:text-base">
                Simpan percakapanmu dengan barber untuk konsultasi produk dan status pesanan.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border border-border/40 bg-background/80 p-4 text-xs text-muted-foreground shadow-sm lg:text-sm">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <BadgeCheck className="h-4 w-4 text-primary" />
              Semua chat diamankan oleh TrimTime.
            </div>
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <MessageCircle className="h-4 w-4 text-primary" />
              Barber merespons rata-rata <span className="font-semibold text-foreground">&lt; 10 menit</span>.
            </div>
          </div>
        </div>
      </section>

      <main className="space-y-6 px-5 py-6 lg:px-8 lg:pb-10">
        <div className="flex flex-col gap-3 rounded-xl border border-border/50 bg-card/95 p-4 shadow-sm backdrop-blur">
          <label className="flex items-center gap-2 rounded-lg border border-border/50 bg-background px-3 py-2 text-sm text-muted-foreground focus-within:border-primary focus-within:text-foreground">
            <Search className="h-4 w-4" />
            <Input
              type="search"
              placeholder="Cari barber, produk, atau status chat"
              className="h-8 border-0 bg-transparent px-0 text-sm focus-visible:ring-0"
            />
          </label>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Riwayat terbaru</span>
            <span>•</span>
            <span>
              Total chat <span className="font-semibold text-foreground">{chatThreads.length}</span>
            </span>
          </div>
        </div>

        <section className="grid gap-4">
          {chatThreads.map((thread) => {
            const statusClass = statusColors[thread.statusLabel] ?? "bg-muted/40 text-muted-foreground";

            return (
              <Card
                key={thread.id}
                className="group relative overflow-hidden border-border/50 bg-card/95 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <CardContent className="relative flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-1 items-start gap-3">
                    <Avatar className="h-12 w-12 border border-border/50">
                      <AvatarImage src={thread.barbershopAvatar} alt={thread.barbershopName} />
                      <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                        {thread.barbershopName
                          .split(" ")
                          .map((word) => word[0])
                          .slice(0, 2)
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-semibold text-foreground">
                          {thread.barbershopName}
                        </h2>
                        <Badge className={statusClass}>{thread.statusLabel}</Badge>
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {thread.productName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {thread.lastMessagePreview}
                      </p>
                      <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                        <span>{thread.lastActivityLabel}</span>
                        {thread.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-full bg-muted/30 px-2 py-0.5 font-semibold"
                          >
                            #{tag.replace(/\s+/g, "")}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-stretch sm:self-center">
                    {thread.unreadCount > 0 ? (
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
                        {thread.unreadCount} baru
                      </span>
                    ) : null}
                    <Button asChild className="gap-2" size="sm">
                      <Link href={`/user/chat/${thread.id}`}>
                        Lanjutkan chat
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </main>
    </PageShell>
  );
}
