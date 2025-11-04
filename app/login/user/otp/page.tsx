import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";

import { RoleLoginTemplate } from "../../_components/role-login-template";

const loginFields = [
  {
    id: "phone",
    label: "Nomor WhatsApp",
    type: "tel",
    placeholder: "Contoh: 0812 3456 7890",
    autoComplete: "tel",
    required: true
  },
  {
    id: "otp",
    label: "Kode OTP",
    placeholder: "Masukkan kode 6 digit",
    description: "Kami kirim kode OTP ke WhatsApp kamu. Berlaku 5 menit.",
    required: true
  }
];

export default function UserOtpLoginPage() {
  return (
    <RoleLoginTemplate
      icon={MessageCircle}
      badge="Login cepat"
      heading="Masuk dengan WhatsApp OTP"
      description="Cara paling cepat untuk mengakses akun pelanggan TrimTime tanpa kata sandi."
      accessNotes={["Nomor terverifikasi", "OTP berlaku 5 menit"]}
      loginFields={loginFields}
      submitLabel="Verifikasi & masuk"
      submitIcon={ArrowRight}
      secondaryActions={[
        {
          href: "/login/user",
          label: "Masuk dengan email & kata sandi",
          description: "Gunakan metode tradisional untuk akses akun kamu.",
          icon: ArrowLeft
        }
      ]}
      footerNote={<p>Belum menerima kode? Pastikan WhatsApp aktif atau kirim ulang OTP setelah 60 detik.</p>}
    />
  );
}
