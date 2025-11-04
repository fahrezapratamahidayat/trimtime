import { ArrowRight, MessageCircle, UserRound } from "lucide-react";

import { RoleLoginTemplate } from "../_components/role-login-template";

const loginFields = [
  {
    id: "email",
    label: "Email atau nomor WhatsApp",
    placeholder: "contoh: kamu@trimtime.id / 0812xxxx",
    autoComplete: "username",
    required: true
  },
  {
    id: "password",
    label: "Kata sandi",
    type: "password",
    placeholder: "Masukkan kata sandi",
    autoComplete: "current-password",
    required: true
  }
];

const secondaryActions = [
  {
    href: "/login/user/otp",
    label: "Masuk dengan OTP WhatsApp",
    description: "Kami kirim kode 6 digit ke nomor WhatsApp kamu.",
    icon: MessageCircle
  },
  {
    href: "/register",
    label: "Daftar akun TrimTime",
    description: "Isi data singkat dan langsung bisa booking layanan.",
    icon: ArrowRight
  }
];

export default function UserLoginPage() {
  return (
    <RoleLoginTemplate
      icon={UserRound}
      badge="Member"
      heading="Masuk sebagai Pelanggan TrimTime"
      description="Booking layanan favorit, kumpulkan loyalty point, dan kelola jadwal reservasi kamu."
      accessNotes={["Daftar mandiri", "Langsung aktif"]}
      loginFields={loginFields}
      submitLabel="Masuk sebagai pelanggan"
      submitIcon={ArrowRight}
      secondaryActions={secondaryActions}
      footerNote={<p>Lupa kata sandi? Pilih opsi OTP WhatsApp untuk reset cepat.</p>}
    />
  );
}
