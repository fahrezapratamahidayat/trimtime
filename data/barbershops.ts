export type Service = {
  name: string;
  description: string;
  price: string;
  duration: string;
  allowBarberChoice: boolean;
};

export type Barber = {
  id: number;
  name: string;
  rating: number;
  experience: string;
  specialties: string[];
  avatar: string;
};

export type Comment = {
  id: number;
  author: string;
  date: string;
  rating: number;
  content: string;
};

export type BarbershopDetail = {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  description: string;
  status: string;
  photos: string[];
  barbers: Barber[];
  services: Service[];
  benefits: string[];
  comments: Comment[];
};

export type BarbershopSummary = {
  id: string;
  name: string;
  address: string;
  rating: number;
  ratingCount: number;
  status: string;
  distance: string;
  price: string;
  heroImage: string;
  tags: string[];
  services: string[];
};

export type BarbershopDatabase = {
  list: BarbershopSummary[];
  details: Record<string, BarbershopDetail>;
};

export const barbershopDatabase: BarbershopDatabase = {
  list: [
    {
      id: "1",
      name: "Cut & Chill Studio",
      address: "Jl. Sudirman No. 1, Jakarta",
      rating: 4.8,
      ratingCount: 179,
      status: "Open sekarang",
      distance: "1.2 km",
      price: "Rp 65.000",
      heroImage: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=1200&auto=format&fit=crop",
      tags: ["Premium", "Cepat", "Higienis"],
      services: ["Skin fade", "Beard trim", "Home service"]
    },
    {
      id: "2",
      name: "Urban Fade Lounge",
      address: "Jl. Kemang Raya No. 22, Jakarta",
      rating: 4.6,
      ratingCount: 98,
      status: "Buka besok",
      distance: "3.5 km",
      price: "Rp 55.000",
      heroImage: "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=1200&auto=format&fit=crop",
      tags: ["Barber favorit", "Live DJ"],
      services: ["Classic cut", "Coloring", "Hair tattoo"]
    },
    {
      id: "3",
      name: "Gentlemen's Den",
      address: "Jl. Asia Afrika No. 10, Bandung",
      rating: 4.7,
      ratingCount: 142,
      status: "Open sekarang",
      distance: "2.1 km",
      price: "Rp 60.000",
      heroImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      tags: ["Classic cut", "Coffee bar"],
      services: ["Classic cut", "Shave", "Massage"]
    }
  ],
  details: {
    "1": {
      id: "1",
      name: "Cut & Chill Studio",
      address: "Jl. Sudirman No. 1, Jakarta",
      rating: 4.8,
      description: "Studio barber premium dengan fokus pada layanan cepat, higienis, dan hasil presisi.",
      status: "Open sekarang",
      reviewCount: 179,
      photos: [
        "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599360889420-da1d61bba527?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1571171637578-0419d10ea7e1?q=80&w=1200&auto=format&fit=crop"
      ],
      barbers: [
        {
          id: 1,
          name: "Raka Pratama",
          rating: 4.7,
          experience: "5 tahun",
          specialties: ["Skin fade", "Beard trim"],
          avatar: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=400&auto=format&fit=crop"
        },
        {
          id: 2,
          name: "Ardi Nugroho",
          rating: 4.6,
          experience: "4 tahun",
          specialties: ["Classic cut", "Hair coloring"],
          avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400&auto=format&fit=crop"
        }
      ],
      services: [
        {
          name: "Skin Fade Premium",
          description: "Potongan rapi dengan fade halus menggunakan teknik clipper & gunting.",
          price: "Rp 65.000",
          duration: "35 menit",
          allowBarberChoice: true
        },
        {
          name: "Beard Trim",
          description: "Perapihan kumis & jenggot dengan finishing oil hangat.",
          price: "Rp 35.000",
          duration: "20 menit",
          allowBarberChoice: false
        },
        {
          name: "Home Service",
          description: "Barber datang ke rumah lengkap dengan peralatan sterilisasi.",
          price: "Rp 90.000",
          duration: "45 menit",
          allowBarberChoice: true
        }
      ],
      benefits: ["Gratis minuman dingin", "Sterilisasi alat setiap pelanggan", "Garansi touch-up 24 jam"],
      comments: [
        {
          id: 1,
          author: "Dimas Nugraha",
          date: "12 Jan 2025",
          rating: 5,
          content: "Barbernya ramah, hasil fade mulus banget. Tempatnya juga bersih dan wangi."
        },
        {
          id: 2,
          author: "Indra Wijaya",
          date: "8 Jan 2025",
          rating: 4.5,
          content: "Booking mudah, tapi home service agak telat 10 menit. Overall puas dengan hasilnya."
        }
      ]
    },
    "2": {
      id: "2",
      name: "Urban Fade Lounge",
      address: "Jl. Kemang Raya No. 22, Jakarta",
      rating: 4.6,
      reviewCount: 98,
      description: "Barbershop urban dengan suasana lounge, musik live, dan barber spesialis gaya modern.",
      status: "Buka besok",
      photos: [
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1619983081593-ec39e479a539?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1465125200746-411b9d5231dd?q=80&w=1200&auto=format&fit=crop"
      ],
      barbers: [
        {
          id: 3,
          name: "Fajar Ramdhan",
          rating: 4.8,
          experience: "6 tahun",
          specialties: ["Pompadour", "Textured crop"],
          avatar: "https://images.unsplash.com/photo-1616547035322-7e8f354fc386?q=80&w=400&auto=format&fit=crop"
        },
        {
          id: 4,
          name: "Yudha Permana",
          rating: 4.5,
          experience: "3 tahun",
          specialties: ["Undercut", "Hair tattoo"],
          avatar: "https://images.unsplash.com/photo-1544723795-432537e90ad1?q=80&w=400&auto=format&fit=crop"
        }
      ],
      services: [
        {
          name: "Urban Classic",
          description: "Potongan klasik dengan styling pomade matte.",
          price: "Rp 55.000",
          duration: "30 menit",
          allowBarberChoice: true
        },
        {
          name: "Color Refresh",
          description: "Pewarnaan rambut semi permanen dengan toner premium.",
          price: "Rp 120.000",
          duration: "60 menit",
          allowBarberChoice: true
        },
        {
          name: "Hair Tattoo",
          description: "Seni garis artistik menggunakan trimmer presisi.",
          price: "Rp 85.000",
          duration: "40 menit",
          allowBarberChoice: false
        }
      ],
      benefits: ["Live DJ setiap weekend", "Ruang tunggu nyaman", "Free soft drink"],
      comments: [
        {
          id: 1,
          author: "Rian Mahendra",
          date: "6 Jan 2025",
          rating: 4.5,
          content: "Tempatnya keren, barber ngerti style modern. Cuma parkir agak susah."
        },
        {
          id: 2,
          author: "Galuh Pertiwi",
          date: "28 Des 2024",
          rating: 4.7,
          content: "Coloring rapi dan hasilnya pas sama request. Staff ramah semua."
        }
      ]
    },
    "3": {
      id: "3",
      name: "Gentlemen's Den",
      address: "Jl. Asia Afrika No. 10, Bandung",
      rating: 4.7,
      reviewCount: 142,
      description: "Barbershop bergaya klasik dengan layanan lengkap dan fasilitas lounge eksklusif.",
      status: "Open sekarang",
      photos: [
        "https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop"
      ],
      barbers: [
        {
          id: 5,
          name: "Rico Mahesa",
          rating: 4.9,
          experience: "7 tahun",
          specialties: ["Classic gentleman cut", "Hot towel shave"],
          avatar: "https://images.unsplash.com/photo-1558365915-8a29239774b8?q=80&w=400&auto=format&fit=crop"
        },
        {
          id: 6,
          name: "Bayu Arianto",
          rating: 4.6,
          experience: "5 tahun",
          specialties: ["Massage", "Beard sculpting"],
          avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop"
        }
      ],
      services: [
        {
          name: "Gentlemen's Classic",
          description: "Potongan klasik khas gentleman dengan styling pomade oil-based.",
          price: "Rp 60.000",
          duration: "35 menit",
          allowBarberChoice: true
        },
        {
          name: "Royal Shave",
          description: "Cukur basah dengan pisau straight razor dan hot towel treatment.",
          price: "Rp 75.000",
          duration: "30 menit",
          allowBarberChoice: true
        },
        {
          name: "Relaxing Massage",
          description: "Pijatan bahu dan kepala selama 20 menit dengan essential oil.",
          price: "Rp 50.000",
          duration: "20 menit",
          allowBarberChoice: false
        }
      ],
      benefits: ["Free espresso bar", "Member lounge", "Garansi touch-up 48 jam"],
      comments: [
        {
          id: 1,
          author: "Hendri Wijaya",
          date: "15 Jan 2025",
          rating: 5,
          content: "Service terbaik! Royal shave-nya bikin rileks, tempatnya juga eksklusif."
        },
        {
          id: 2,
          author: "Risa Marlina",
          date: "2 Jan 2025",
          rating: 4.6,
          content: "Suasananya nyaman dan staff sangat profesional. Cocok untuk me time." 
        }
      ]
    }
  }
};
