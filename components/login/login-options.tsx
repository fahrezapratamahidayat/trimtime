"use client";

import Link from "next/link";
import { useId, useState } from "react";

import type { LucideIcon } from "lucide-react";
import { ArrowRight, KeyRound, Mail, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

type LoginOption = {
  key: "google" | "email" | "whatsapp";
  icon: LucideIcon;
  label: string;
  tone: string;
};

const loginOptions: LoginOption[] = [
  { key: "google", icon: Sparkles, label: "Masuk dengan Google", tone: "text-blue-500" },
  { key: "email", icon: Mail, label: "Masuk dengan Email", tone: "text-indigo-500" },
  { key: "whatsapp", icon: MessageCircle, label: "Masuk dengan WhatsApp OTP", tone: "text-emerald-500" }
];

type EmailDrawerProps = {
  label: string;
  tone: string;
  Icon: LucideIcon;
};

function EmailDrawer({ label, tone, Icon }: EmailDrawerProps) {
  const [open, setOpen] = useState(false);
  const emailId = useId();
  const passwordId = useId();
  const rememberId = useId();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start gap-3 rounded-2xl border-border text-sm font-medium text-foreground hover:bg-accent"
        >
          <Icon className={`h-4 w-4 ${tone}`} />
          {label}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-t-3xl border-border">
        <DrawerHeader className="space-y-1 text-left">
          <DrawerTitle className="text-lg font-semibold text-foreground">Masuk dengan Email</DrawerTitle>
          <DrawerDescription className="text-xs text-muted-foreground">
            Masukkan email dan pilih metode verifikasi favoritmu.
          </DrawerDescription>
        </DrawerHeader>
        <div className="space-y-4 px-6 pb-4">
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground" htmlFor={emailId}>
                Alamat email
              </label>
              <Input
                id={emailId}
                type="email"
                placeholder="nama@contoh.com"
                className="rounded-2xl border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground" htmlFor={passwordId}>
                Kata sandi
              </label>
              <Input
                id={passwordId}
                type="password"
                placeholder="Masukkan kata sandi"
                className="rounded-2xl border-border"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <label className="inline-flex items-center gap-2" htmlFor={rememberId}>
                <Checkbox id={rememberId} className="rounded" />
                Ingat saya di perangkat ini
              </label>
              <button type="button" className="text-primary hover:underline">
                Lupa kata sandi?
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Button className="w-full justify-center gap-2 rounded-2xl bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <ShieldCheck className="h-4 w-4" />
              Masuk sekarang
            </Button>
            <Button
              variant="outline"
              className="w-full justify-center gap-2 rounded-2xl border-dashed text-sm font-semibold text-foreground hover:bg-accent"
            >
              <KeyRound className="h-4 w-4" />
              Kirim OTP ke email saya
            </Button>
          </div>
        </div>
        <DrawerFooter className="border-t border-border px-6 py-4">
          <DrawerClose asChild>
            <Button variant="ghost" className="w-full justify-center rounded-2xl text-sm">
              Batal
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function LoginOptions() {
  return (
    <div className="space-y-2 rounded-3xl border border-border bg-card p-4 shadow-sm">
      {loginOptions.map(({ key, icon: Icon, label, tone }) =>
        key === "email" ? (
          <EmailDrawer key={key} Icon={Icon} label={label} tone={tone} />
        ) : (
          <Button
            key={key}
            variant="outline"
            className="w-full justify-start gap-3 rounded-2xl border-border text-sm font-medium text-foreground hover:bg-accent"
          >
            <Icon className={`h-4 w-4 ${tone}`} />
            {label}
          </Button>
        )
      )}
      <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
        <span>Belum punya akun?</span>
        <Link href="/register" className="inline-flex items-center gap-1 font-semibold text-primary">
          Daftar sekarang
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
