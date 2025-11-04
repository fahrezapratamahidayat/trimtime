import { MailPlus, MessageCircle, Scissors } from "lucide-react";

import { RoleLoginTemplate } from "../_components/role-login-template";

const loginFields = [
  {
    id: "email",
    label: "Email kerja",
    type: "email",
    placeholder: "barber@barbershop.com",
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
    id: "invite-code",
    label: "Kode undangan dari owner",
    placeholder: "Masukkan kode undangan",
    description: "Owner akan mengirim kode akses melalui email atau WhatsApp.",
    required: true
  }
];

const secondaryActions = [
  {
    href: "mailto:support@trimtime.id",
    label: "Belum punya kode? Hubungi TrimTime",
    description: "Kami bantu cek status undangan dari owner kamu.",
    icon: MailPlus
  },
  {
    href: "/login/owner",
    label: "Owner ingin mengundang barber",
    description: "Masuk sebagai owner untuk menambahkan anggota tim.",
    icon: MessageCircle,
    variant: "ghost" as const
  }
];

export default function BarberLoginPage() {
  return (
    <RoleLoginTemplate
      icon={Scissors}
      badge="Tim Layanan"
      heading="Masuk sebagai Barber Partner"
      description="Akses jadwal harian, update status layanan, dan catat preferensi pelanggan dengan cepat."
      accessNotes={["Dibuat oleh owner", "Minta akses ke owner"]}
      loginFields={loginFields}
      submitLabel="Masuk dashboard barber"
      secondaryActions={secondaryActions}
      footerNote={<p>Gunakan email kerja yang terdaftar oleh owner kamu di TrimTime.</p>}
    />
  );
}
