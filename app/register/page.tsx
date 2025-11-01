import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { RegisterForm } from "@/components/register/register-form";

export default function RegisterPage() {
  return (
    <PageShell
      background="plain"
      containerClassName="pb-20 sm:pb-16"
      contentClassName="items-center gap-10"
    >
      <header className="flex w-full max-w-md items-center justify-between gap-4 rounded-3xl border border-border bg-card/90 px-6 py-5 shadow-sm">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-accent hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali
        </Link>
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          TrimTime
        </span>
      </header>

      <main className="flex w-full max-w-md flex-1 flex-col gap-6">
        <section className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-foreground">
            Buat akun TrimTime
          </h1>
          <p className="text-sm text-muted-foreground">
            Isi data di bawah ini supaya kamu bisa booking barber favoritmu kapan
            saja.
          </p>
        </section>

        <section className="rounded-3xl border border-border bg-card/95 p-6 shadow-md">
          <RegisterForm />
        </section>

        <section className="rounded-3xl border border-dashed border-border bg-muted/40 p-4 text-center text-xs text-muted-foreground">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Masuk di sini
          </Link>
        </section>
      </main>
    </PageShell>
  );
}
