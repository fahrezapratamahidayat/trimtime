"use client";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordType = showPassword ? "text" : "password";
  const confirmPasswordType = showConfirmPassword ? "text" : "password";

  return (
    <form className="space-y-4">
      <div className="grid gap-3">
        <Input
          id="full-name"
          placeholder="Nama lengkap"
          autoComplete="name"
          className="rounded-2xl border-border"
        />
        <Input
          id="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          className="rounded-2xl border-border"
        />
        <Input
          id="phone"
          type="tel"
          placeholder="Nomor WhatsApp"
          autoComplete="tel"
          className="rounded-2xl border-border"
        />
        <div className="relative">
          <Input
            id="password"
            type={passwordType}
            placeholder="Kata sandi"
            autoComplete="new-password"
            className="rounded-2xl border-border pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <div className="relative">
          <Input
            id="confirm-password"
            type={confirmPasswordType}
            placeholder="Ulangi kata sandi"
            autoComplete="new-password"
            className="rounded-2xl border-border pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-3 rounded-2xl border border-dashed border-border p-4 text-xs text-muted-foreground">
        <label className="flex items-start gap-3">
          <Checkbox id="terms" required className="rounded" />
          <span>
            Saya setuju dengan <span className="text-primary">Ketentuan Layanan</span> &amp;{' '}
            <span className="text-primary">Kebijakan Privasi</span> TrimTime.
          </span>
        </label>
        <label className="flex items-start gap-3">
          <Checkbox id="promo-opt" className="rounded" />
          <span>Mau dapat promo dan reminder jadwal lewat email atau WhatsApp.</span>
        </label>
      </div>

      <Button type="submit" className="w-full justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90">
        Buat akun TrimTime
      </Button>
    </form>
  );
}
