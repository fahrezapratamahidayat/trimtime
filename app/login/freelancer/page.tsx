import { ArrowRight, BriefcaseBusiness, FilePlus2, ShieldCheck } from "lucide-react";

import { RoleLoginTemplate } from "../_components/role-login-template";

const loginFields = [
  {
    id: "email",
    label: "Email profesional",
    type: "email",
    placeholder: "freelancer@potong.co.id",
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
  }
];

const secondaryActions = [
  {
    href: "/register/freelancer",
    label: "Daftar sebagai freelancer",
    description: "Ajukan portofolio dan pilih kategori layanan barber yang kamu kuasai.",
    icon: FilePlus2
  },
  {
    href: "/intro",
    label: "Pelajari cara kerja TrimTime",
    description: "Lihat alur verifikasi dan job on-demand untuk freelancer.",
    icon: ShieldCheck,
    variant: "ghost" as const
  }
];

export default function FreelancerLoginPage() {
  return (
    <RoleLoginTemplate
      icon={BriefcaseBusiness}
      badge="Partner Lepas"
      heading="Masuk sebagai Freelancer TrimTime"
      description="Terima job on-demand, kelola jadwal fleksibel, dan bangun portofolio barber kamu."
      accessNotes={["Daftar mandiri", "Menunggu persetujuan admin"]}
      loginFields={loginFields}
      submitLabel="Masuk dashboard freelancer"
      submitIcon={ArrowRight}
      secondaryActions={secondaryActions}
      footerNote={<p>Status belum aktif? Cek email kamu untuk update verifikasi dari Admin TrimTime.</p>}
    />
  );
}
