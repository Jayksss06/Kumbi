# UmbiCare — Dapur Umbi Posyandu
### Platform Edukasi & Resep Olahan Umbi Lokal Berbasis Kemitraan Posyandu Anak
> Proyek Pengembangan Sistem Kemandirian Pangan & Pencegahan Stunting (Mata Kuliah Multimedia & Masyarakat)

[![Unit Tests](https://img.shields.io/badge/Unit%20Tests-8%20Passed%20(100%25)-success?style=for-the-badge)](./tests)
[![SDG Alignment](https://img.shields.io/badge/SDGs-2%20%7C%203%20%7C%2012-emerald?style=for-the-badge)](https://sdgs.un.org)
[![Zero-Cost Sustainability](https://img.shields.io/badge/Sustainability-Zero--Cost%20CSV%2FJSON-blue?style=for-the-badge)](./src/lib/csv-exporter.ts)

---

## 1. Ringkasan Visi Produk & Pembagian Peran Keberlanjutan
UmbiCare (**Dapur Umbi Posyandu**) adalah platform web interaktif untuk mengedukasi dan memfasilitasi pemanfaatan 3 umbi lokal utama (**Singkong/Mocaf, Ubi Jalar, dan Talas**) sebagai alternatif karbohidrat pendamping/pengganti beras beserta resep olahan MPASI dan Pemberian Makanan Tambahan (PMT) Posyandu yang bergizi seimbang.

### Pembagian Peran:
- **Mahasiswa (Fasilitator):** Membangun arsitektur perangkat lunak, memvalidasi parameter gizi berbasis data ilmiah nasional, dan melatih literasi digital awal kader.
- **Kader Posyandu (Eksekutor Utama):** Menjalankan operasional bulanan secara mandiri (kalkulasi belanja bahan PMT massal, penyuluhan Meja 4, distribusi kotak ber-QR Code, dan pencatatan porsi terealisasi tanpa perlu menyentuh kode pemrograman).

---

## 2. Landasan Masalah & Indikator Dampak SDGs
- **Ketergantungan Beras Ekstrem:** Konsumsi beras rumah tangga Indonesia mencapai **98,35%** (139,5 kg/kapita/tahun vs rata-rata global 60 kg).
- **Krisis Ekologis:** Padi sawah menyerap **2.291 – 3.420 liter air per 1 kg beras** dan menyumbang **39% emisi agrikultur nasional**.
- **Potensi Lokal yang Belum Optimal:** Indonesia memiliki 77 jenis karbohidrat dengan produksi tahunan singkong & ubi jalar mencapai **16.462.391 ton**.
- **Indikator Dampak Terukur pada Sistem:**
  1. **SDG 2 (Zero Hunger):** Total porsi PMT olahan umbi lokal yang tersalurkan kepada balita.
  2. **SDG 3 (Good Health & Well-being):** 100% kepatuhan aturan wajib protein hewani pendamping umbi untuk membasmi stunting.
  3. **SDG 12 (Responsible Consumption & Production):** Estimasi kilogram beras tersubstitusi dan ribuan liter penghematan jejak air tanah.

---

## 3. Data Ilmiah Terkunci 3 Umbi Lokal vs Beras Putih (Per 100g)

| Parameter | Singkong (`Manihot esculenta`) | Ubi Jalar (`Ipomoea batatas`) | Talas Bogor (`Colocasia esculenta`) | Beras Putih (`Oryza sativa`) |
| :--- | :---: | :---: | :---: | :---: |
| **Energi** | 160 – 165 kkal (Mocaf) | 86 kkal | 145 kkal | ~130 kkal (matang) / 369 kkal (mentah) |
| **Karbohidrat** | 35 – 40 g | 20,12 g | 34 g | ~28 g (matang) / 77,1 g (mentah) |
| **Protein** | 1,0 – 1,36 g | 1,57 g | 1,5 g | ~2,5 g (matang) / 9,5 g (mentah) |
| **Serat Pangan** | 2,0 – 2,5 g (5x Beras) | 2,0 – 3,0 g (6x Beras) | 1,5 – 2,0 g (4x Beras) | 0,4 g (Sangat Rendah) |
| **Indeks Glikemik** | 60 – 80 (Mocaf lebih rendah) | **44 (Sangat Rendah)** | 53 (Sedang - Rendah) | 70 – 90 (Tinggi) |
| **Keunggulan** | Padat energi & bebas gluten | Super kaya Beta-Karoten | Kalium tinggi (**536,1 mg**), pati halus | Kalori cepat serap |
| **Keamanan** | Kulit merah muda, rendam air | Kukus/rebus, hindari goreng | **Kupas kering, rendam air garam 20 mnt** | - |

> **GOLDEN RULE GIZI ANAK:** Karena kandungan protein alami umbi lokal rendah (1,0–1,57g), seluruh olahan MPASI/Balita **WAJIB** dipadukan dengan sumber **Protein Hewani** (ikan kembung, telur, hati ayam, ayam cincang, lele) dan/atau **Protein Nabati** (tempe/tahu).

---

## 4. Formula Matematis & Scaling Engine
1. **Kalkulator Penukar Porsi Nasi Anak ke Umbi:**
   $$\text{Target Energi (kkal)} = \text{Jumlah Centong Anak} \times 65\text{ kkal}$$
   $$\text{Singkong (g)} = \text{round}\left(\frac{\text{Target Energi}}{162,5} \times 100\right)$$
   $$\text{Ubi Jalar (g)} = \text{round}\left(\frac{\text{Target Energi}}{86} \times 100\right)$$
   $$\text{Talas (g)} = \text{round}\left(\frac{\text{Target Energi}}{145} \times 100\right)$$
2. **Kalkulator Belanja PMT Massal (1–500 Porsi):**
   $$\text{Skala } S = \frac{\text{Target Porsi PMT}}{\text{Base Portions Resep}}$$
   $$\text{Berat Bersih } (g) = \text{Base Weight} \times S$$
   $$\text{Berat Pasar Umbi } (kg) = \frac{\text{Berat Bersih } (g) \times 1,18}{1000} \quad (+18\%\text{ toleransi kupas})$$
   Bahan butir satuan (telur): $\text{Math.ceil}(\text{Base Qty} \times S)$.
3. **Indikator Dampak SDGs:**
   $$\text{Substitusi Beras (kg)} = \frac{\text{Total Porsi Umbi Tersalurkan} \times 50\text{ g}}{1000}$$
   $$\text{Jejak Air Dihemat (L)} = \text{Kg Beras Tersubstitusi} \times [2.291 \text{ s.d. } 3.420]\text{ Liter}$$

---

## 5. Fitur Utama Platform

### A. Fitur Ibu Balita (100% Akses Terbuka Tanpa Wajib Login)
- **Modul Edukasi Sains 3 Umbi:** Komparasi tabel & grafik bar visual, keunggulan gizi, dan protokol anti-gatal oksalat talas.
- **Kalkulator Centong Nasi ke Umbi:** Konversi gram + ukuran rumah tangga (URT) dan rekomendasi protein pendamping.
- **Simulator Piring Seimbang:** Ilustrasi persentase piring anak sesuai usia (6-8 bln, 9-11 bln, 12-23 bln, 2-5 thn) dan panduan tekstur wajib.
- **Katalog Resep & Mode Masak Interaktif:** Checklist bahan & langkah masak tersimpan di `localStorage`, timer durasi, tombol Share WA, cetak kartu resep 1 halaman ber-QR, dan form rating "Anak Lahap" (1-5 bintang).
- **Zona Antrean Posyandu:** 8 Kartu Balik Mitos vs Fakta 3D CSS dan Micro-Quiz 5 soal berhadiah lencana digital.
- **Akses Cepat Kode Kotak PMT:** Resolver kode singkat kotak PMT (`UMBI-01` s/d `UMBI-06`).

### B. Fitur Operasional Kader Posyandu (Role `KADER`)
- **Mode Penyuluhan Meja 4:** Presentasi layar penuh berhuruf besar (20-28px) untuk tablet atau proyektor balai posyandu.
- **Kalkulator Belanja PMT Massal (20–100+ Porsi):** Hitung otomatis kg bersih, berat kotor pasar, pembulatan butir telur, estimasi anggaran dana, dan cetak daftar belanja pasar.
- **Manajemen Siklus Jadwal PMT Bulanan:** State machine (`PLANNED` $\rightarrow$ `SHOPPING_READY` $\rightarrow$ `DISTRIBUTED` $\rightarrow$ `EVALUATED`), pencatatan realisasi porsi, pengumuman WA otomatis, dan pencetak stiker label QR kotak PMT (grid 8 label per A4).
- **No-Code Recipe Builder:** Form terpandu untuk kader menambah kreasi resep lokal dengan validasi otomatis wajib protein & injeksi protokol keamanan umbi.

### C. Fitur Fasilitator Akademik & Keberlanjutan (Role `ADMIN`)
- **Dashboard Dampak SDGs:** Metrik kuantitatif porsi umbi, substitusi beras, penghematan jejak air, dan 100% kepatuhan gizi.
- **Antrean Moderasi Resep Kader (`PENDING_REVIEW`):** Peninjauan dan approval publikasi resep baru.
- **Pusat Ekspor & Cadangan Data (Zero-Cost Sustainability):** Unduh data resep, jadwal, dan ulasan dalam format CSV (kompatibel Google Sheets/Excel) serta Full Backup JSON.

---

## 6. Akun Demo Cepat (One-Click Demo Login)
Tersedia tombol pemilih peran langsung pada header aplikasi:
1. **Ibu Balita (Public User):** `bunda.nisa@umbicare.id` (Akses langsung tanpa wajib login)
2. **Kader Posyandu (Mitra Eksekutor):** `kader.melati@umbicare.id` (Password: `DemoPassword123!`)
3. **Admin Fasilitator (Akademik):** `admin@umbicare.id` (Password: `DemoPassword123!`)

---

## 7. Panduan Instalasi & Menjalankan Proyek

### Kebutuhan Sistem:
- Node.js versi 18+ (direkomendasikan Node.js 20 atau 24)
- npm 9+

### Langkah Menjalankan:
```bash
# 1. Masuk ke direktori proyek
cd Kumbi

# 2. Pasang dependensi
npm install

# 3. Jalankan pengujian unit (Vitest)
npm test

# 4. Jalankan server lokal aplikasi
npm run dev

# Aplikasi aktif di browser pada: http://localhost:5173/
```

### Membangun Versi Produksi:
```bash
npm run build
```

---

## 8. Struktur Direktori Proyek
```
Kumbi/
├── prisma/
│   ├── schema.prisma              # Skema database 11 tabel relasional
│   └── seed.ts                    # Seeder data ilmiah, 6 resep, & Posyandu
├── src/
│   ├── types/
│   │   └── index.ts               # Definisi tipe data TypeScript lengkap
│   ├── data/
│   │   └── scientific-seed-data.ts# Master data ilmiah 3 umbi, beras, 6 resep, 8 mitos, 5 kuis
│   ├── lib/
│   │   ├── nutrition-engine.ts    # Rumus porsi nasi, piring seimbang, & validator protein
│   │   ├── pmt-scaling-engine.ts  # Rumus penskalaan belanja massal & dampak SDGs
│   │   ├── qr-generator.ts        # Generator QR Code SVG mandiri (offline-ready)
│   │   ├── whatsapp-builder.ts    # Generator teks pengumuman WA resmi kader & resep ibu
│   │   ├── csv-exporter.ts        # Modul ekspor/impor CSV & JSON kompatibel Google Sheets
│   │   └── storage-sync.ts        # State management & LocalStorage persistence
│   ├── components/
│   │   ├── layout/                # Navbar, BottomNav, Footer
│   │   ├── tubers/                # TuberComparisonTable
│   │   ├── calculator/            # RiceToTuberCalc, BalancedPlateSimulator
│   │   ├── recipes/               # RecipeCard, InteractiveCookingMode, PrintableRecipeSheet
│   │   ├── posyandu/              # MejaEmpatPresenter, PmtMassScaler, QrLabelSheetGenerator, WaShareModal, KaderRecipeBuilder
│   │   ├── quiz/                  # MythFactFlipCards, MicroQuizEngine
│   │   └── dashboard/             # SdgImpactPanel, PmtStateMachineTracker
│   ├── views/
│   │   ├── HomeView.tsx           # Beranda utama ramah ibu balita
│   │   ├── TuberEduView.tsx       # Modul eksplorasi ilmiah 3 umbi
│   │   ├── NutritionCalcView.tsx  # Pusat kalkulator porsi & piring seimbang
│   │   ├── RecipesCatalogView.tsx # Katalog resep & pencarian bahan kulkas
│   │   ├── QuizMythView.tsx       # Zona antrean posyandu (mitos & kuis)
│   │   ├── KaderDashboardView.tsx # Dashboard operasional bulanan kader
│   │   ├── AdminDashboardView.tsx # Dashboard evaluasi akademik & SDGs
│   │   └── PmtAccessModal.tsx     # Resolver kode stiker kotak PMT
│   ├── App.tsx                    # Root routing & modal orchestration
│   ├── main.tsx                   # Entry point React 19
│   └── index.css                  # Tailwind styles & @media print setup
├── tests/
│   ├── nutrition-engine.test.ts   # Unit test konversi porsi & validasi gizi
│   └── pmt-scaling.test.ts        # Unit test penskalaan bahan & SDGs
├── tailwind.config.js             # Brand palette (#2E5A44, #C85A32, #6B4C7B)
├── vite.config.ts                 # Konfigurasi Vite
└── package.json
```

---

## 9. Buku Saku Operasional Bulanan Kader Posyandu (Handover Kit)
Bagi Ibu-Ibu Kader Posyandu, berikut panduan praktis 4 langkah operasional bulanan:
1. **H-7 Sebelum Buka Posyandu (Perencanaan & Belanja):**
   - Login ke UmbiCare dan buka menu **Ruang Kader**.
   - Pilih menu **"Hitung Belanja PMT Massal"**, tentukan target balita (misal: 50 porsi).
   - Klik **"Cetak Daftar Belanja Pasar"** untuk dibawa berbelanja ke pasar tradisional.
   - Klik **"Cetak Label QR"** dan cetak 50 stiker pada kertas stiker untuk ditempel di kotak PMT balita.
2. **H-1 Sebelum Buka Posyandu (Pengumuman Grup WA):**
   - Buka agenda PMT pada menu **"Jadwal & Realisasi PMT"**.
   - Klik tombol **"Info WA"**, salin teks atau klik **"Kirim Langsung ke WA"** untuk menyapa ibu-ibu balita di grup WhatsApp Posyandu.
3. **Hari-H Pelaksanaan Posyandu (Meja 4 Penyuluhan):**
   - Nyalakan tablet/laptop di Meja 4, klik tombol oranye besar **"Mode Penyuluhan Meja 4"**.
   - Gunakan slide berhuruf besar untuk menjelaskan cara aman olah talas tanpa gatal dan alasan wajib menambah telur/ikan pada olahan umbi.
   - Bagikan kotak PMT berstiker label QR kepada ibu balita.
4. **H+1 Pasca-Posyandu (Pencatatan Realisasi):**
   - Buka kembali agenda PMT, klik **"Catat Terbagi"**, masukkan jumlah aktual kotak PMT yang tersalurkan (misal: 52 kotak).
   - Lihat rangkuman bintang ulasan *"Anak Lahap"* yang dikirimkan oleh ibu balita melalui pemindaian stiker QR Code.
