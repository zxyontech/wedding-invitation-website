export const weddingData = {
  // Tanggal pernikahan (format ISO) — mudah diganti
  weddingDate: "2026-06-26T08:00:00+07:00",

  couple: {
    groom: {
      name: "Farrel ",
      shortName: "Farrel",
      parents: "Putra dari Bapak Toni & Ibu Ahui",
      description:
        "Putra kedua yang penuh dedikasi, mencintai musik dan perjalanan.",
      photo: "/images/foto_farrel1.png",
      instagram: "@dimasarya",
    },
    bride: {
      name: "Ellen",
      shortName: "Ellen",
      parents: "Putri dari Bapak Pendi & Ibu AHA",
      description:
        "Putri kedua yang lembut hati, mencintai seni dan literasi.",
      photo: "/images/foto_ellen4.png",
      instagram: "@anindyaputri",
    },
  },

  greeting: {
    salutation: "Salam Sejahtera bagi kita semua",
    quote:
      "Cinta yang tulus adalah hadiah terindah yang dapat kita berikan dan terima. Semoga kebahagiaan selalu menyertai perjalanan kalian berdua.",
    source: "— Hari Bahagia Farrel & Ellen",
  },

  story: [
    {
      title: "Pertemuan",
      date: "Maret 2021",
      description:
        "Takdir mempertemukan kami di sebuah acara komunitas. Sebuah perkenalan sederhana yang menjadi awal dari segalanya.",
      photo: "/images/story-1.png",
    },
    {
      title: "Pendekatan",
      date: "Agustus 2022",
      description:
        "Dari obrolan ringan hingga larut malam, kami menyadari betapa nyamannya kebersamaan ini dan tumbuhnya rasa yang tulus.",
      photo: "/images/story-2.png",
    },
    {
      title: "Lamaran",
      date: "Februari 2025",
      description:
        "Di bawah langit senja, sebuah janji diucapkan. Sebuah pertanyaan yang dijawab dengan air mata bahagia dan kata 'iya'.",
      photo: "/images/story-3.png",
    },
    {
      title: "Pernikahan",
      date: "September 2026",
      description:
        "Dan kini, kami siap melangkah ke babak baru kehidupan, menyatukan dua hati dalam ikatan suci pernikahan.",
      photo: "/images/gallery-1.png",
    },
  ],

  events: [
  {
    title: "Resepsi",
    date: "Jumat, 26 Juni 2026",
    time: "19.00 WIB - Selesai",
    location: "Lapangan Devaloka",
    address: "Jalan Bakti, Lapangan Devaloka",
  },
],

  maps: {
    embedUrl:
      "https://www.google.com/maps?q=Hotel+Mulia+Senayan+Jakarta&output=embed",
    link: "https://maps.google.com/?q=Hotel+Mulia+Senayan+Jakarta",
  },

  gallery: [
    "/images/wedding1.jpg",
    "/images/wedding4.jpg",
    "/images/wedding3.jpg",
    "/images/wedding5.jpg",
    "/images/wedding6.png",
    "/images/wedding7.jpg",
    "/images/wedding8.jpg",
    "/images/wedding9.jpg",
  ],

  gifts: [
    {
      bank: "Bank BCA",
      number: "1234567890",
      holder: "Dimas Arya Pratama",
    },
    {
      bank: "Bank Mandiri",
      number: "0987654321",
      holder: "Anindya Putri Lestari",
    },
  ],

  shippingAddress:
    "Jl. Melati Indah No. 24, Kebayoran Baru, Jakarta Selatan, 12110",

  initialWishes: [
    {
      name: "Rangga & Sari",
      message:
        "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
    },
    {
      name: "Bunga Citra",
      message:
        "Bahagia selalu untuk kalian berdua. Semoga cintanya abadi sampai akhir hayat.",
    },
    {
      name: "Keluarga Besar Wijaya",
      message:
        "Turut berbahagia atas pernikahan kalian. Semoga selalu dilimpahkan keberkahan.",
    },
  ],
}

export type WeddingData = typeof weddingData
