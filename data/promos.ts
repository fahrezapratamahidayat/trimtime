export type PromoCategory = "Haircut" | "Home Service" | "Bundles" | "Student";

export type Promo = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  discountLabel: string;
  barbershopId: string;
  barbershopName: string;
  validUntilLabel: string;
  category: PromoCategory;
  image: string;
  terms: string[];
  code: string;
};

export const promoCollection: {
  featured: Promo;
  recommendations: Promo[];
  categories: {
    label: string;
    value: PromoCategory;
    description: string;
    icon: string;
  }[];
} = {
  featured: {
    id: "PROMO-NEWYEAR",
    title: "Glow Up New Year",
    subtitle: "Diskon 25% untuk layanan paket styling",
    description: "Dapatkan potongan rambut + styling pomade premium khusus minggu ini.",
    discountLabel: "25%",
    barbershopId: "1",
    barbershopName: "Cut & Chill Studio",
    validUntilLabel: "Berlaku hingga 15 Februari 2025",
    category: "Bundles",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200&auto=format&fit=crop",
    terms: [
      "Diskon otomatis saat checkout",
      "Tidak dapat digabung dengan promo lain",
      "Pemakaian maksimal 2x per akun"
    ],
    code: "GLOWUP25"
  },
  recommendations: [
    {
      id: "PROMO-HOMESERVICE-10",
      title: "Home Service Hemat",
      subtitle: "Gratis biaya transport",
      description: "Nikmati layanan barber ke rumah tanpa biaya tambahan transportasi.",
      discountLabel: "Hemat 10K",
      barbershopId: "1",
      barbershopName: "Cut & Chill Studio",
      validUntilLabel: "Hingga 28 Februari 2025",
      category: "Home Service",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
      terms: ["Minimal transaksi Rp 80.000", "Hanya di area Jakarta Selatan"],
      code: "HOMEFREE10"
    },
    {
      id: "PROMO-STUDENT-20",
      title: "Student Cut Deal",
      subtitle: "Tunjukkan kartu pelajar",
      description: "Potongan khusus pelajar & mahasiswa setiap Senin-Kamis.",
      discountLabel: "Diskon 20%",
      barbershopId: "2",
      barbershopName: "Urban Fade Lounge",
      validUntilLabel: "Berlaku hingga 30 April 2025",
      category: "Student",
      image: "https://images.unsplash.com/photo-1542838686-ad36956f0716?q=80&w=1200&auto=format&fit=crop",
      terms: ["Wajib reservasi online", "Tunjukkan kartu pelajar saat check-in"],
      code: "STUDENT20"
    },
    {
      id: "PROMO-BUNDLES-15",
      title: "Gentlemen Bundle",
      subtitle: "Haircut + Royal Shave",
      description: "Paket lengkap untuk tampilan gentleman, hemat Rp 35.000.",
      discountLabel: "Diskon 15%",
      barbershopId: "3",
      barbershopName: "Gentlemen's Den",
      validUntilLabel: "Hingga 10 Maret 2025",
      category: "Bundles",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      terms: ["Termasuk complimentary espresso", "Dapatkan poin member 2x"],
      code: "GENTLEMEN15"
    }
  ],
  categories: [
    {
      label: "Semua Potongan",
      value: "Haircut",
      description: "Promo terbaik untuk layanan haircut setiap minggu",
      icon: "Scissors"
    },
    {
      label: "Home Service",
      value: "Home Service",
      description: "Diskon layanan barber ke rumah",
      icon: "Home"
    },
    {
      label: "Bundling",
      value: "Bundles",
      description: "Paket hemat dengan lebih dari satu layanan",
      icon: "Gift"
    },
    {
      label: "Promo Pelajar",
      value: "Student",
      description: "Potongan harga khusus untuk pelajar & mahasiswa",
      icon: "GraduationCap"
    }
  ]
};
