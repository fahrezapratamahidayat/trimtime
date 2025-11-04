export type BarberProductCategory =
  | "pomade"
  | "styling"
  | "haircare"
  | "grooming"
  | "bundle"
  | "accessories";

export type BarberProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  stockStatus: "ready" | "limited" | "preorder";
  rating: number;
  ratingCount: number;
  image: string;
  tags: string[];
  category: BarberProductCategory;
  barbershop: {
    id: string;
    name: string;
    location: string;
    avatar: string;
    detailPath?: string;
    bookingPath?: string;
  };
  highlights: string[];
};

export const barberMarketplaceProducts: BarberProduct[] = [
  {
    id: "menstilo-pomade-matte",
    name: "Menstilo Matte Clay Pomade",
    description:
      "Pomade berbahan dasar clay dengan hasil matte natural. Cocok untuk gaya textured crop atau slick back rapi.",
    price: 98000,
    weight: "85 gr",
    stockStatus: "ready",
    rating: 4.9,
    ratingCount: 212,
    image:
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop",
    tags: ["matte finish", "strong hold", "water soluble"],
    category: "pomade",
    barbershop: {
      id: "menstilo",
      name: "Menstilo Barbershop",
      location: "Jakarta Selatan",
      avatar:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=200&auto=format&fit=crop"
    },
    highlights: ["Tahan seharian", "Mudah dibilas", "Aroma sandalwood"]
  },
  {
    id: "undercut-hair-dye",
    name: "Undercut Vibrant Hair Dye",
    description:
      "Pewarna rambut semi-permanen dengan formula low-damage. Menawarkan tone ash grey dan caramel bronze.",
    price: 125000,
    weight: "120 ml",
    stockStatus: "limited",
    rating: 4.7,
    ratingCount: 156,
    image:
      "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?q=80&w=800&auto=format&fit=crop",
    tags: ["low damage", "ash grey", "conditioning"],
    category: "haircare",
    barbershop: {
      id: "undercut",
      name: "Undercut Studio",
      location: "Bandung",
      avatar:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200&auto=format&fit=crop"
    },
    highlights: ["Dengan keratin booster", "Gratis konsultasi warna", "Tahan hingga 8 minggu"]
  },
  {
    id: "cutchill-home-kit",
    name: "Cut & Chill Home Styling Kit",
    description:
      "Paket lengkap alat styling premium: pomade, sea salt spray, dan sisir sisal lipat.",
    price: 185000,
    weight: "3 item",
    stockStatus: "ready",
    rating: 4.8,
    ratingCount: 134,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    tags: ["bundle", "home styling", "limited edition"],
    category: "bundle",
    barbershop: {
      id: "cutchill",
      name: "Cut & Chill Studio",
      location: "Jakarta Pusat",
      avatar:
        "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=200&auto=format&fit=crop",
      detailPath: "/barbershop/1",
      bookingPath: "/booking/1"
    },
    highlights: ["Bonus tote bag eksklusif", "Panduan styling digital", "Cocok untuk travel"]
  },
  {
    id: "urbanfade-texture-spray",
    name: "Urban Fade Sea Salt Spray",
    description:
      "Sea salt spray dengan vitamin B5 untuk volume ekstra dan tekstur natural sepanjang hari.",
    price: 88000,
    weight: "150 ml",
    stockStatus: "ready",
    rating: 4.6,
    ratingCount: 198,
    image:
      "https://images.unsplash.com/photo-1495989049393-7870f10d5c64?q=80&w=800&auto=format&fit=crop",
    tags: ["sea salt", "volume boost", "heat protection"],
    category: "styling",
    barbershop: {
      id: "urbanfade",
      name: "Urban Fade Lounge",
      location: "Jakarta Selatan",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
      detailPath: "/barbershop/2",
      bookingPath: "/booking/2"
    },
    highlights: ["Tanpa lengket", "Proteksi panas hingga 180°C", "Aroma citrus segar"]
  },
  {
    id: "gentlemens-den-beard-oil",
    name: "Gentlemen's Den Beard Oil",
    description:
      "Minyak perawatan jenggot dengan argan dan jojoba untuk menjaga kelembapan dan kilau sehat.",
    price: 99000,
    weight: "50 ml",
    stockStatus: "ready",
    rating: 4.9,
    ratingCount: 174,
    image:
      "https://images.unsplash.com/photo-1582719478181-2cf4e1e8861d?q=80&w=800&auto=format&fit=crop",
    tags: ["beard care", "jojoba oil", "conditioning"],
    category: "grooming",
    barbershop: {
      id: "gentlemensden",
      name: "Gentlemen's Den",
      location: "Bandung",
      avatar:
        "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=200&auto=format&fit=crop",
      detailPath: "/barbershop/3",
      bookingPath: "/booking/3"
    },
    highlights: ["Mengurangi gatal", "Cepat meresap", "Aroma woody fresh"]
  },
  {
    id: "rawr-barber-kit",
    name: "Rawr Barber Essential Comb Set",
    description:
      "Set sisir barber berbahan karbon dengan anti-statis, cocok untuk styling profesional maupun harian.",
    price: 62000,
    weight: "4 pcs",
    stockStatus: "preorder",
    rating: 4.5,
    ratingCount: 89,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
    tags: ["accessories", "anti static", "barber grade"],
    category: "accessories",
    barbershop: {
      id: "rawrbarber",
      name: "Rawr Barber Collective",
      location: "Surabaya",
      avatar:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=200&auto=format&fit=crop"
    },
    highlights: ["Anti-statis", "Ringan & kuat", "Bonus pouch mesh"]
  }
];

export function getBarberProductById(id: string) {
  return barberMarketplaceProducts.find((product) => product.id === id);
}
