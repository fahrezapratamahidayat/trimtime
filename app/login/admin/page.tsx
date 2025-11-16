"use client";

import { Building2, IdCard, ShieldCheck } from "lucide-react";

import { RoleLoginTemplate } from "../_components/role-login-template";

const loginFields = [
    {
        id: "email",
        label: "Email TrimTime",
        type: "email",
        placeholder: "nama@trimtime.id",
        autoComplete: "email",
        required: true,
    },
    {
        id: "password",
        label: "Kata sandi",
        type: "password",
        placeholder: "Masukkan kata sandi",
        autoComplete: "current-password",
        required: true,
    },
    {
        id: "passkey",
        label: "Kode internal",
        placeholder: "Masukkan kode keamanan",
        description:
            "Kode unik diberikan oleh lead TrimTime untuk akses admin.",
        required: true,
    },
];

const secondaryActions = [
    {
        href: "mailto:cs@trimtime.id",
        label: "Minta reset akses admin",
        description: "Hubungi lead atau HR TrimTime untuk verifikasi ulang.",
        icon: IdCard,
    },
    {
        href: "/intro",
        label: "Lihat panduan ekosistem",
        description:
            "Kenali alur owner, barber, dan freelancer sebelum bantu mereka.",
        icon: Building2,
        variant: "ghost" as const,
    },
];

const mockCredentials = {
    email: "admin@trimtime.id",
    password: "admin123",
    passkey: "TRIM-OPS",
};

export default function AdminLoginPage() {
    return (
        <RoleLoginTemplate
            icon={ShieldCheck}
            badge='Tim Internal'
            heading='Masuk sebagai Admin TrimTime'
            description='Pantau performa outlet, proses verifikasi, dan dukungan pelanggan dalam satu portal.'
            accessNotes={["Khusus tim internal", "Hubungi lead untuk akses"]}
            loginFields={loginFields}
            submitLabel='Masuk dashboard admin'
            secondaryActions={secondaryActions}
            mockCredentials={mockCredentials}
            successRedirect='/admin/dashboard'
            errorMessage='Akses admin ditolak. Pastikan email, sandi, dan kode internal sesuai.'
        />
    );
}
