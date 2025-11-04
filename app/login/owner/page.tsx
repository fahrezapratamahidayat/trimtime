import { Briefcase, Crown, ShieldCheck } from "lucide-react";

import { RoleLoginTemplate } from "../_components/role-login-template";

const loginFields = [
  {
    id: "email",
    label: "Email bisnis",
    type: "email",
    placeholder: "owner@barbershop.com",
    autoComplete: "email",
    required: true
  },
  {
    id: "password",
    label: "Kata sandi",
    type: "password",
    placeholder: "Masukkan kata sandi",
    autoComplete: "current-password",
    required: true
  },
  {
    id: "outlet-code",
    label: "Kode outlet",
    placeholder: "Contoh: TRIM-001",
    description: "Kode ini akan dikirimkan setelah barbershop kamu terverifikasi.",
    required: false
  }
];

const secondaryActions = [
  {
    href: "/register/owner",
    label: "Daftar sebagai owner",
    description: "Ajukan barbershop baru, proses verifikasi estimasi 1×24 jam.",
    icon: Briefcase
  },
  {
    href: "/intro",
    label: "Pelajari ekosistem TrimTime",
    description: "Lihat alur lengkap sebelum mendaftar.",
    icon: ShieldCheck,
    variant: "ghost" as const
  }
];

export default function OwnerLoginPage() {
  return (
    <RoleLoginTemplate
      icon={Crown}
      badge="Kelola Outlet"
      heading="Masuk sebagai Owner Barbershop"
      description="Kelola jadwal, tim barber, laporan outlet, dan promo marketplace dari satu dashboard."
      accessNotes={["Daftar mandiri", "Menunggu persetujuan admin"]}
      loginFields={loginFields}
      submitLabel="Masuk dashboard owner"
      secondaryActions={secondaryActions}
      footerNote={
        <p>
          Butuh bantuan verifikasi? Hubungi tim TrimTime melalui email <a className="text-primary" href="mailto:support@trimtime.id">support@trimtime.id</a>.
        </p>
      }
    />
  );
}
