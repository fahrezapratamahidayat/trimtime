export type OrderStatus = "upcoming" | "completed" | "cancelled";

export type Order = {
  id: string;
  barbershopId: string;
  barbershopName: string;
  serviceName: string;
  barberName: string;
  scheduledAt: string;
  scheduledDateLabel: string;
  scheduledTimeLabel: string;
  status: OrderStatus;
  price: string;
  addressLabel: string;
  notes?: string;
  paymentMethod: string;
  serviceFee?: string;
  tax?: string;
  totalPrice: string;
  bookedAtLabel: string;
  statusNote?: string;
};

export const ordersData: {
  upcoming: Order[];
  history: Order[];
} = {
  upcoming: [
    {
      id: "INV-2025-001",
      barbershopId: "1",
      barbershopName: "Cut & Chill Studio",
      serviceName: "Skin Fade Premium",
      barberName: "Raka Pratama",
      scheduledAt: "2025-02-11T09:30:00+07:00",
      scheduledDateLabel: "Selasa, 11 Feb 2025",
      scheduledTimeLabel: "09:30",
      status: "upcoming",
      price: "Rp 65.000",
      addressLabel: "Jl. Sudirman No. 1, Jakarta",
      notes: "Mohon siapkan pomade matte",
      paymentMethod: "QRIS Dana",
      serviceFee: "Rp 5.000",
      tax: "Rp 3.000",
      totalPrice: "Rp 73.000",
      bookedAtLabel: "Dibuat pada Senin, 3 Feb 2025 21:15",
      statusNote: "Barber akan tiba 10 menit lebih awal"
    },
    {
      id: "INV-2025-002",
      barbershopId: "2",
      barbershopName: "Urban Fade Lounge",
      serviceName: "Color Refresh",
      barberName: "Fajar Ramdhan",
      scheduledAt: "2025-02-15T15:00:00+07:00",
      scheduledDateLabel: "Sabtu, 15 Feb 2025",
      scheduledTimeLabel: "15:00",
      status: "upcoming",
      price: "Rp 120.000",
      addressLabel: "Jl. Kemang Raya No. 22, Jakarta",
      paymentMethod: "Kartu kredit",
      serviceFee: "Rp 7.500",
      tax: "Rp 4.500",
      totalPrice: "Rp 132.000",
      bookedAtLabel: "Dibuat pada Kamis, 6 Feb 2025 10:05"
    }
  ],
  history: [
    {
      id: "INV-2025-000",
      barbershopId: "3",
      barbershopName: "Gentlemen's Den",
      serviceName: "Royal Shave",
      barberName: "Rico Mahesa",
      scheduledAt: "2025-01-26T18:30:00+07:00",
      scheduledDateLabel: "Minggu, 26 Jan 2025",
      scheduledTimeLabel: "18:30",
      status: "completed",
      price: "Rp 75.000",
      addressLabel: "Jl. Asia Afrika No. 10, Bandung",
      notes: "Tambah handuk hangat",
      paymentMethod: "Tunai",
      tax: "Rp 3.000",
      totalPrice: "Rp 78.000",
      bookedAtLabel: "Selesai pada Minggu, 26 Jan 2025 19:20"
    },
    {
      id: "INV-2024-221",
      barbershopId: "1",
      barbershopName: "Cut & Chill Studio",
      serviceName: "Home Service",
      barberName: "Ardi Nugroho",
      scheduledAt: "2024-12-18T20:00:00+07:00",
      scheduledDateLabel: "Rabu, 18 Des 2024",
      scheduledTimeLabel: "20:00",
      status: "cancelled",
      price: "Rp 90.000",
      addressLabel: "Apartemen Sudirman Park Tower A",
      notes: "Dibatalkan karena hujan deras",
      paymentMethod: "Transfer Bank",
      serviceFee: "Rp 5.000",
      tax: "Rp 4.000",
      totalPrice: "Rp 99.000",
      bookedAtLabel: "Dibatalkan pada Rabu, 18 Des 2024 18:45",
      statusNote: "Dana dikembalikan dalam 1×24 jam"
    }
  ]
};
