export type ChatMessage = {
  id: string;
  sender: "user" | "barber";
  text: string;
  timestamp: string;
  highlight?: string;
};

export type ChatThread = {
  id: string;
  productId: string;
  productName: string;
  barbershopName: string;
  barbershopAvatar: string;
  lastMessagePreview: string;
  lastActivityLabel: string;
  unreadCount: number;
  statusLabel: string;
  tags: string[];
  quickReplies: string[];
  highlights: string[];
  conversation: ChatMessage[];
};

export const chatThreads: ChatThread[] = [
  {
    id: "menstilo-pomade-matte",
    productId: "menstilo-pomade-matte",
    productName: "Menstilo Matte Clay Pomade",
    barbershopName: "Menstilo Barbershop",
    barbershopAvatar:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=200&auto=format&fit=crop",
    lastMessagePreview:
      "Bisa banget! Tinggal tulis di kolom catatan saat checkout.",
    lastActivityLabel: "Hari ini • 14.08",
    unreadCount: 0,
    statusLabel: "Aktif",
    tags: ["Produk", "Pomade"],
    quickReplies: [
      "Estimasi pengiriman ke Jakarta?",
      "Ada promo bundling lain ga?",
      "Bisa request gift wrap?"
    ],
    highlights: [
      "Packaging aman & sealed",
      "Include panduan styling",
      "Support konsultasi after-sales"
    ],
    conversation: [
      {
        id: "1",
        sender: "barber",
        text: "Halo! Makasih sudah tertarik sama produk kami. Bisa bantu cek kamu butuh styling seperti apa?",
        timestamp: "14.02"
      },
      {
        id: "2",
        sender: "user",
        text: "Halo kak, mau nanya apakah aromanya strong? Saya mau pakai untuk acara kantor siang ini.",
        timestamp: "14.04"
      },
      {
        id: "3",
        sender: "barber",
        text: "Aromanya soft woody, aman buat dipakai indoor. Kalau mau lebih light tinggal apply tipis aja, nanti kakak bisa styling ulang pakai sedikit air.",
        timestamp: "14.05",
        highlight: "Tips styling harian"
      },
      {
        id: "4",
        sender: "user",
        text: "Oke noted. Kalau kukasih catatan spesifik, barber bisa bantu pre-style sebelum dikirim nggak?",
        timestamp: "14.06"
      },
      {
        id: "5",
        sender: "barber",
        text: "Bisa banget! Tinggal tulis di kolom catatan saat checkout. Kita bantu bentuk dasar biar tinggal touch-up pas barang sampai.",
        timestamp: "14.08"
      }
    ]
  },
  {
    id: "cutchill-home-kit",
    productId: "cutchill-home-kit",
    productName: "Cut & Chill Home Styling Kit",
    barbershopName: "Cut & Chill Studio",
    barbershopAvatar:
      "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=200&auto=format&fit=crop",
    lastMessagePreview:
      "Set lengkapnya ready, bisa kirim same-day kalau order sebelum jam 15.00.",
    lastActivityLabel: "Kemarin • 18.42",
    unreadCount: 2,
    statusLabel: "Menunggu balasan",
    tags: ["Bundle", "Styling"],
    quickReplies: [
      "Apa aja isi paketnya?",
      "Bisa tambah sisir ekstra?",
      "Free gift tersedia?"
    ],
    highlights: [
      "Gratis tote bag eksklusif",
      "Panduan styling digital",
      "Bonus konsultasi video 10 menit"
    ],
    conversation: [
      {
        id: "1",
        sender: "user",
        text: "Halo kak, mau tanya isi kit-nya apa aja ya?",
        timestamp: "18.30"
      },
      {
        id: "2",
        sender: "barber",
        text: "Hai! Ada pomade, sea salt spray, dan sisir lipat. Semua limited edition.",
        timestamp: "18.32"
      },
      {
        id: "3",
        sender: "user",
        text: "Kalau mau sisir ekstra bisa tambah?",
        timestamp: "18.35"
      },
      {
        id: "4",
        sender: "barber",
        text: "Bisa, nanti kami tambahkan add-on Rp25K. Tulis aja di catatan.",
        timestamp: "18.39"
      },
      {
        id: "5",
        sender: "barber",
        text: "Set lengkapnya ready, bisa kirim same-day kalau order sebelum jam 15.00.",
        timestamp: "18.42"
      }
    ]
  },
  {
    id: "urbanfade-texture-spray",
    productId: "urbanfade-texture-spray",
    productName: "Urban Fade Sea Salt Spray",
    barbershopName: "Urban Fade Lounge",
    barbershopAvatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
    lastMessagePreview:
      "Boleh banget. Spray dulu sebelum hair dryer biar volume maksimal.",
    lastActivityLabel: "3 hari lalu • 10.22",
    unreadCount: 0,
    statusLabel: "Selesai",
    tags: ["Haircare", "Sea Salt"],
    quickReplies: [
      "Cara pakai untuk rambut tipis?",
      "Bisa dipakai tiap hari?",
      "Butuh heat protection tambahan?"
    ],
    highlights: [
      "Vitamin B5 untuk volume",
      "Tanpa residu lengket",
      "Aroma citrus segar"
    ],
    conversation: [
      {
        id: "1",
        sender: "user",
        text: "Hai kak, spray ini cocok buat rambut tipis nggak?",
        timestamp: "10.15"
      },
      {
        id: "2",
        sender: "barber",
        text: "Cocok banget! Spray ke rambut semi-kering lalu blow pakai tangan buat volume natural.",
        timestamp: "10.17",
        highlight: "Teknik styling volume"
      },
      {
        id: "3",
        sender: "user",
        text: "Oke noted. Boleh dipakai tiap hari?",
        timestamp: "10.20"
      },
      {
        id: "4",
        sender: "barber",
        text: "Bisa setiap hari, kandungan B5 bantu jaga kelembapan rambut.",
        timestamp: "10.22"
      },
      {
        id: "5",
        sender: "user",
        text: "Makasih! Nanti aku checkout ya. Bisa bantu kasih tips finishing matte?",
        timestamp: "10.23"
      },
      {
        id: "6",
        sender: "barber",
        text: "Boleh banget. Spray dulu sebelum hair dryer biar volume maksimal.",
        timestamp: "10.25"
      }
    ]
  }
];

export function getChatThreadById(id: string) {
  return chatThreads.find((thread) => thread.id === id || thread.productId === id);
}
