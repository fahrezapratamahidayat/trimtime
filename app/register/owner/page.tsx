import Link from "next/link";

import { ArrowLeft, Building2, CheckCircle2, ClipboardCheck, Sparkles } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function OwnerRegisterPage() {
  return (
    <PageShell background="plain" containerClassName="pb-20 sm:pb-16" contentClassName="gap-10">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="w-fit gap-2 px-0 text-muted-foreground hover:text-foreground"
        >
          <Link href="/login/owner">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke login owner
          </Link>
        </Button>

        <div className="space-y-6 rounded-2xl border border-border/60 bg-card/95 p-6 shadow-sm backdrop-blur">
          <header className="space-y-3 text-center sm:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Ajukan barbershop kamu ke TrimTime
            </p>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
                Pendaftaran Owner Barbershop
              </h1>
              <p className="text-sm text-muted-foreground sm:text-base">
                Lengkapi data pemilik dan outlet untuk proses verifikasi. Tim admin TrimTime akan menghubungi kamu maks. 1×24 jam kerja melalui email terdaftar.
              </p>
            </div>
          </header>

          <form className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Data pemilik
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="owner-name" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Nama lengkap pemilik
                  </label>
                  <Input
                    id="owner-name"
                    name="owner-name"
                    placeholder="Nama sesuai KTP"
                    autoComplete="name"
                    required
                    className="rounded-2xl border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="owner-email" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Email bisnis
                  </label>
                  <Input
                    id="owner-email"
                    name="owner-email"
                    type="email"
                    placeholder="owner@barbershop.com"
                    autoComplete="email"
                    required
                    className="rounded-2xl border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="owner-phone" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Nomor WhatsApp aktif
                  </label>
                  <Input
                    id="owner-phone"
                    name="owner-phone"
                    type="tel"
                    placeholder="0812 3456 7890"
                    autoComplete="tel"
                    required
                    className="rounded-2xl border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="owner-id" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Nomor identitas (KTP/NIK)
                  </label>
                  <Input
                    id="owner-id"
                    name="owner-id"
                    placeholder="16 digit"
                    required
                    className="rounded-2xl border-border"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Informasi barbershop
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="barbershop-name" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Nama barbershop
                  </label>
                  <Input
                    id="barbershop-name"
                    name="barbershop-name"
                    placeholder="Contoh: TrimTime Barber HQ"
                    required
                    className="rounded-2xl border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="brand-status" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Status brand
                  </label>
                  <Input
                    id="brand-status"
                    name="brand-status"
                    placeholder="Independent / Franchise / Chain"
                    className="rounded-2xl border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="total-branch" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Jumlah outlet aktif
                  </label>
                  <Input
                    id="total-branch"
                    name="total-branch"
                    type="number"
                    min={1}
                    placeholder="1"
                    className="rounded-2xl border-border"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2 sm:col-span-3">
                  <label htmlFor="outlet-address" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Alamat outlet utama
                  </label>
                  <Textarea
                    id="outlet-address"
                    name="outlet-address"
                    placeholder="Tulis alamat lengkap beserta patokan lokasi"
                    required
                    className="rounded-2xl border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="city" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Kota/Kabupaten
                  </label>
                  <Input id="city" name="city" placeholder="Kota" required className="rounded-2xl border-border" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="province" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Provinsi
                  </label>
                  <Input id="province" name="province" placeholder="Provinsi" required className="rounded-2xl border-border" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="seat-count" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Jumlah kursi barber
                  </label>
                  <Input
                    id="seat-count"
                    name="seat-count"
                    type="number"
                    min={1}
                    placeholder="Contoh: 6"
                    className="rounded-2xl border-border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="services" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Layanan unggulan & jam operasional
                </label>
                <Textarea
                  id="services"
                  name="services"
                  placeholder="Contoh: Haircut premium, coloring, perawatan brewok. Buka setiap hari 10.00-22.00"
                  className="rounded-2xl border-border"
                />
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Dokumen pendukung
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="license" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Surat izin usaha / NIB
                  </label>
                  <Input
                    id="license"
                    name="license"
                    type="file"
                    accept="application/pdf,image/*"
                    className="rounded-2xl border-dashed"
                  />
                  <p className="text-xs text-muted-foreground">Unggah dalam format PDF atau gambar (maks. 10MB).</p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="siup" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Foto outlet & interior
                  </label>
                  <Input
                    id="siup"
                    name="siup"
                    type="file"
                    accept="image/*"
                    multiple
                    className="rounded-2xl border-dashed"
                  />
                  <p className="text-xs text-muted-foreground">Unggah 3-5 foto terbaik barbershop kamu.</p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="portfolio-link" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Link media sosial / katalog
                  </label>
                  <Input
                    id="portfolio-link"
                    name="portfolio-link"
                    type="url"
                    placeholder="https://instagram.com/"
                    className="rounded-2xl border-border"
                  />
                  <p className="text-xs text-muted-foreground">Opsional, bantu tim melihat aktivitas promosi kamu.</p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="supporting-notes" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Catatan tambahan (opsional)
                  </label>
                  <Textarea
                    id="supporting-notes"
                    name="supporting-notes"
                    placeholder="Sertakan info promo, partner brand, atau jajaran tim manajemen."
                    className="rounded-2xl border-border"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-3 rounded-2xl border border-dashed border-border/70 bg-muted/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground">Konfirmasi pendaftaran</p>
              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-border" />
                <span>
                  Saya menyatakan data yang diisi benar dan siap mengikuti proses kurasi TrimTime. Saya memahami bahwa akun owner akan aktif setelah admin TrimTime menyetujui pengajuan ini.
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-border" />
                <span>Mau menerima update promo, partnership, dan tips manajemen outlet dari TrimTime.</span>
              </label>
            </section>

            <Button type="submit" className="w-full justify-center gap-2 rounded-2xl bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Kirim pengajuan owner TrimTime
              <ClipboardCheck className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <section className="space-y-3 rounded-2xl border border-border/60 bg-muted/40 p-5 text-sm text-muted-foreground">
          <div className="flex items-center gap-3 text-foreground">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <p className="font-semibold">Proses verifikasi setelah submit</p>
          </div>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Tim admin TrimTime meninjau kelengkapan dokumen dan profil outlet (maks. 1×24 jam kerja).</li>
            <li>Jika disetujui, kami kirim email berisi kode outlet dan langkah aktivasi dashboard owner.</li>
            <li>Setelah aktif, kamu bisa mengundang barber, mengatur layanan, dan mengelola promo marketplace.</li>
          </ol>
          <div className="flex items-center gap-2 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-3 text-xs text-primary">
            <Building2 className="h-4 w-4" />
            <span>Pastikan data outlet sesuai dokumen resmi agar proses verifikasi berjalan cepat.</span>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
