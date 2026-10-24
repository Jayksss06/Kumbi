// Master Scientific & Operational Seed Data for Kumbi
// 100% compliant with Master Prompt specifications

import { 
  TuberInfo, 
  ProteinPairing, 
  Recipe, 
  MythFact, 
  QuizQuestion, 
  PosyanduPartner, 
  PmtSchedule, 
  Review,
  User 
} from '../types';

export const NATIONAL_FOOD_STATS = {
  riceDependencePct: 98.35,
  riceConsumptionKgPerCapitaYear: 139.5,
  globalRiceConsumptionAvgKg: 60.0,
  riceWaterFootprintMinLiters: 2291,
  riceWaterFootprintMaxLiters: 3420,
  riceWaterFootprintAvgLiters: 2855,
  agriculturalEmissionSharePct: 39,
  localCarbVarietiesCount: 77,
  nationalCassavaSweetPotatoAnnualTons: 16462391,
};

export const TUBERS_DATA: TuberInfo[] = [
  {
    id: 'tub-01',
    slug: 'singkong',
    localName: 'Singkong / Kaspe / Sampeu',
    scientificName: 'Manihot esculenta',
    isReferenceComparison: false,
    caloriesKcal: 162.5, // nilai tengah 160-165 kkal
    caloriesRangeText: '160 - 165 kkal',
    carbsG: 37.5,
    carbsRangeText: '35 - 40 g',
    proteinG: 1.18,
    proteinRangeText: '1,0 - 1,36 g',
    fiberG: 2.25,
    fiberRangeText: '2,0 - 2,5 g',
    glycemicIndexMin: 60,
    glycemicIndexMax: 80,
    keyMicronutrients: [
      'Pati Kompleks Padat Energi',
      'Vitamin C (Antioksidan)',
      'Kalsium (Pembentukan Tulang & Gigi)',
      'Fosfor'
    ],
    mocafDerivativeInfo: 'Dapat diolah menjadi tepung Mocaf (Modified Cassava Flour) melalui proses fermentasi asam laktat alami. Fermentasi menghasilkan pati resisten (resistant starch) tinggi yang menurunkan indeks glikemik, memperbaiki mikroflora usus anak, serta 100% bebas gluten (gluten-free).',
    safetyPreparationSteps: [
      'Pilih singkong segar dengan lapisan kulit ari dalam berwarna merah muda/kemerahan cerah.',
      'HINDARI singkong dengan bercak kebiruan/kehitaman atau berasa pahit (indikasi racun asam sianida/HCN tinggi).',
      'Kupas kulit luar dan kulit ari hingga bersih sempurna.',
      'Potong-potong dan rendam dalam air bersih mengalir selama minimal 15-30 menit untuk melarutkan sisa glukosida sianogenik.',
      'Kukus atau rebus hingga benar-benar empuk dan matang sempurna sebelum dilumatkan untuk balita.'
    ],
    toxinWarning: 'WASPADA ASAM SIANIDA (HCN): Singkong pahit atau singkong yang telah lama dipanen dapat mengandung glukosida sianogenik. Selalu pilih singkong manis segar berkulit ari merah muda dan masak hingga matang sempurna.',
    themeColorHex: '#2E5A44'
  },
  {
    id: 'tub-02',
    slug: 'ubi-jalar',
    localName: 'Ubi Jalar / Ketela Rambat / Boled',
    scientificName: 'Ipomoea batatas',
    isReferenceComparison: false,
    caloriesKcal: 86.0,
    caloriesRangeText: '86 kkal',
    carbsG: 20.12,
    carbsRangeText: '20,12 g',
    proteinG: 1.57,
    proteinRangeText: '1,57 g',
    fiberG: 2.5,
    fiberRangeText: '2,0 - 3,0 g',
    glycemicIndexMin: 44,
    glycemicIndexMax: 44,
    keyMicronutrients: [
      'Sangat Kaya Beta-Karoten (Provitamin A Imunitas & Mata)',
      'Vitamin C Alami',
      'Kalium (Keseimbangan Cairan & Otot)',
      'Zat Besi (Cegah Anemia)',
      'Magnesium'
    ],
    safetyPreparationSteps: [
      'Cuci bersih kulit luar ubi dari sisa tanah sebelum dikupas.',
      'Olah dengan metode kukus, rebus, atau panggang teflon untuk menjaga Indeks Glikemik tetap rendah (44) dan melindungi beta-karoten.',
      'HINDARI menggoreng dengan minyak banyak (deep frying) untuk menu MPASI dan balita karena dapat menaikkan kalori lemak jenuh dan merusak vitamin.',
      'Untuk varietas ubi ungu, kaya antioksidan antosianin alami yang baik untuk daya tahan tubuh.'
    ],
    toxinWarning: 'KEUNGGULAN INDEKS GLIKEMIK RENDAH (44): Ubi jalar melepaskan glukosa secara perlahan dan ramah pada pencernaan anak. Tetap wajib dipadukan dengan protein hewani karena kandungan protein alaminya 1,57g.',
    themeColorHex: '#C85A32'
  },
  {
    id: 'tub-03',
    slug: 'talas',
    localName: 'Talas / Keladi (Talas Bogor)',
    scientificName: 'Colocasia esculenta',
    isReferenceComparison: false,
    caloriesKcal: 145.0,
    caloriesRangeText: '145 kkal',
    carbsG: 34.0,
    carbsRangeText: '34 g',
    proteinG: 1.5,
    proteinRangeText: '1,5 g',
    fiberG: 1.75,
    fiberRangeText: '1,5 - 2,0 g',
    glycemicIndexMin: 53,
    glycemicIndexMax: 53,
    potassiumMg: 536.1,
    keyMicronutrients: [
      'Kalium Sangat Tinggi (536,1 mg / 100g)',
      'Pati Sangat Halus (Sangat Mudah Dicerna Usus Bayi)',
      'Fosfor & Kalsium',
      'Zat Besi',
      'Vitamin A, B1, B2, & C'
    ],
    safetyPreparationSteps: [
      'PROTOKOL KRITIS #1: Kupas kulit talas dalam keadaan KERING! Dilarang mencuci talas dengan air sebelum dikupas agar lendir dan kristal kalsium oksalat tidak menyebar ke pori-pori kulit tangan.',
      'PROTOKOL KRITIS #2: Setelah dikupas dan dipotong dadu, rendam potongan talas dalam larutan air garam hangat selama 15 - 20 menit untuk meluruhkan kristal jarum kalsium oksalat penyebab gatal.',
      'PROTOKOL KRITIS #3: Remas perlahan dalam air garam, lalu bilas berkali-kali menggunakan air bersih mengalir hingga lendirnya hilang kesat.',
      'Kukus atau rebus talas hingga benar-benar empuk sempurna sebelum diolah menjadi bubur tim atau kudapan anak.'
    ],
    toxinWarning: 'PROTOKOL ANTI-GATAL OKSALAT: Kristal kalsium oksalat berbentuk jarum mikroskopis dapat memicu rasa gatal di mulut jika tidak diolah benar. Selalu kupas kering dan rendam air garam hangat 15-20 menit!',
    themeColorHex: '#6B4C7B'
  },
  {
    id: 'tub-ref',
    slug: 'beras-putih',
    localName: 'Beras Putih Mentah (Nasi Putih Matang)',
    scientificName: 'Oryza sativa',
    isReferenceComparison: true,
    caloriesKcal: 369.0, // per 100g beras mentah, setara ~130 kkal per 100g nasi matang
    caloriesRangeText: '369 kkal (mentah) / ~130 kkal (nasi matang)',
    carbsG: 77.1,
    carbsRangeText: '77,1 g (mentah) / ~28 g (nasi matang)',
    proteinG: 9.5,
    proteinRangeText: '9,5 g (mentah) / ~2,5 g (nasi matang)',
    fiberG: 0.4,
    fiberRangeText: '0,4 g (sangat rendah)',
    glycemicIndexMin: 70,
    glycemicIndexMax: 90,
    keyMicronutrients: [
      'Energi Cepat Serap',
      'Zat Besi Rendah (Non-Fortifikasi)',
      'Serat Sangat Minim (0,4g vs Umbi 2,0-3,0g)'
    ],
    safetyPreparationSteps: [
      'Cuci beras hingga bersih dan masak hingga pulen.',
      'Perhatikan bahwa konsumsi beras berlebih tanpa variasi pangan lokal mempersempit keragaman mikronutrisi anak.'
    ],
    toxinWarning: 'JEJAK EKOLOGIS TINGGI: Menghabiskan 2.291 - 3.420 liter air per 1 kg beras dan menyumbang 39% emisi pertanian nasional. Diversifikasi ke umbi lokal membantu kelestarian bumi.',
    themeColorHex: '#64748B'
  }
];

export const PROTEIN_PAIRINGS_DATA: ProteinPairing[] = [
  {
    id: 'prot-01',
    name: 'Ikan Kembung Fillet',
    proteinType: 'HEWANI',
    caloriesPer100g: 167.0,
    proteinGPer100g: 21.3,
    ironMgPer100g: 1.5,
    defaultServingGramsMpasi: 35.0,
    householdUnitDescription: '1 potong sedang (35g)',
    nutritionBenefitNote: 'Kaya asam lemak Omega-3 (DHA & EPA) untuk perkembangan otak balita, protein tinggi, dan harga terjangkau.'
  },
  {
    id: 'prot-02',
    name: 'Hati Ayam Segar',
    proteinType: 'HEWANI',
    caloriesPer100g: 119.0,
    proteinGPer100g: 16.9,
    ironMgPer100g: 15.8,
    defaultServingGramsMpasi: 30.0,
    householdUnitDescription: '1 buah hati ayam sedang (30g)',
    nutritionBenefitNote: 'Sumber Zat Besi Heme tertinggi dan Vitamin A alami untuk percepatan cegah anemia dan stunting pada MPASI.'
  },
  {
    id: 'prot-03',
    name: 'Telur Ayam Negeri / Kampung',
    proteinType: 'HEWANI',
    caloriesPer100g: 155.0,
    proteinGPer100g: 12.6,
    ironMgPer100g: 1.2,
    defaultServingGramsMpasi: 50.0,
    householdUnitDescription: '1 butir (50g)',
    nutritionBenefitNote: 'Protein bernilai biologi tinggi (skor 100), kaya kolin untuk memori otak anak, praktis dimasak.'
  },
  {
    id: 'prot-04',
    name: 'Telur Puyuh',
    proteinType: 'HEWANI',
    caloriesPer100g: 158.0,
    proteinGPer100g: 13.0,
    ironMgPer100g: 3.65,
    defaultServingGramsMpasi: 20.0,
    householdUnitDescription: '2 butir telur puyuh (20g)',
    nutritionBenefitNote: 'Ukuran mungil padat zat besi, vitamin B12, dan sangat disukai balita sebagai finger food.'
  },
  {
    id: 'prot-05',
    name: 'Daging Ayam Cincang / Fillet',
    proteinType: 'HEWANI',
    caloriesPer100g: 165.0,
    proteinGPer100g: 31.0,
    ironMgPer100g: 0.9,
    defaultServingGramsMpasi: 35.0,
    householdUnitDescription: '2 sendok makan munjung cincang (35g)',
    nutritionBenefitNote: 'Asam amino esensial lengkap pembangun massa otot balita, rasa gurih alami disukai anak GTM.'
  },
  {
    id: 'prot-06',
    name: 'Ikan Lele Segar Fillet',
    proteinType: 'HEWANI',
    caloriesPer100g: 105.0,
    proteinGPer100g: 18.0,
    ironMgPer100g: 1.0,
    defaultServingGramsMpasi: 35.0,
    householdUnitDescription: '1 potong fillet lele (35g)',
    nutritionBenefitNote: 'Murah, mudah didapat di pasar tradisional, tekstur daging sangat lembut, kaya fosfor dan protein hewani.'
  },
  {
    id: 'prot-07',
    name: 'Tempe Kedelai Murni',
    proteinType: 'NABATI',
    caloriesPer100g: 192.0,
    proteinGPer100g: 20.8,
    ironMgPer100g: 2.7,
    defaultServingGramsMpasi: 25.0,
    householdUnitDescription: '1 potong persegi sedang (25g)',
    nutritionBenefitNote: 'Hasil fermentasi kedelai kaya probiotik, kalsium nabati, dan isoflavon yang ramah pada saluran cerna anak.'
  }
];

export const RECIPES_DATA: Recipe[] = [
  // 1. UMBI-01: Bubur Tim Talas Ikan Kembung
  {
    id: 'rec-01',
    recipeCode: 'UMBI-01',
    slug: 'bubur-tim-talas-ikan-kembung',
    title: 'Bubur Tim Talas Ikan Kembung',
    shortDescription: 'MPASI 9-11 bulan kaya Kalium 536mg dari Talas Bogor yang lembut dipadukan dengan Omega-3 tinggi dari Ikan Kembung untuk kecerdasan otak.',
    tuberId: 'tub-03',
    tuberSlug: 'talas',
    usesMocaf: false,
    ageCategory: 'MPASI_9_11',
    cookingMethod: 'KUKUS',
    prepTimeMinutes: 25,
    cookTimeMinutes: 30,
    basePortions: 2,
    caloriesPerPortion: 165.0,
    carbsGPerPortion: 24.5,
    proteinGPerPortion: 8.8,
    fatGPerPortion: 3.8,
    fiberGPerPortion: 1.8,
    micronutrientHighlights: 'Tinggi Kalium (Talas 536,1 mg) & Omega-3 DHA (Ikan Kembung)',
    textureGuideByAge: 'Usia 9-11 Bulan: Bubur tim cincang halus / lumat lembut bertekstur, tidak disaring halus agar menstimulasi refleks mengunyah anak.',
    safetyWarningBanner: 'Wajib Kupas Kering & Rendam Air Garam Hangat 15-20 Menit (Anti-Oksalat Kalsium)',
    steps: [
      {
        stepNumber: 1,
        instruction: 'LANGKAH KRITIS ANTI-OKSALAT: Kupas kulit talas dalam keadaan KERING (jangan dibasahi air dulu agar tangan tidak gatal). Potong dadu kecil.',
        durationMinutes: 5,
        isCriticalSafetyStep: true
      },
      {
        stepNumber: 2,
        instruction: 'LANGKAH KRITIS RENDAM GARAM: Rendam potongan talas dalam air hangat yang diberi 1 sdt garam selama 15-20 menit untuk meluruhkan kristal kalsium oksalat. Bilas bersih 3 kali di air mengalir.',
        durationMinutes: 20,
        isCriticalSafetyStep: true
      },
      {
        stepNumber: 3,
        instruction: 'Kukus potongan talas bersama fillet ikan kembung dan wortel parut hingga talas sangat empuk (sekitar 20 menit).',
        durationMinutes: 20,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 4,
        instruction: 'Haluskan talas kukus menggunakan garpu/penekan kentang, lalu suwir halus daging ikan kembung (pastikan tidak ada duri yang tertinggal).',
        durationMinutes: 5,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 5,
        instruction: 'Campurkan talas lumat, suwiran ikan kembung, wortel, dan 1 sdt minyak kelapa/lemak ayam. Aduk rata hingga tekstur tim lembut siap santap.',
        durationMinutes: 3,
        isCriticalSafetyStep: false
      }
    ],
    ingredients: [
      {
        id: 'ing-01-1',
        recipeId: 'rec-01',
        ingredientName: 'Talas Bogor Kupas Bersih',
        category: 'KARBO_UMBI',
        weightGrams: 140.0,
        householdQty: 1.5,
        householdUnit: 'potong sedang',
        estimatedPriceIdr: 2500,
        preparationNote: 'kupas kering, rendam air garam hangat 20 menit',
        sortOrder: 1
      },
      {
        id: 'ing-01-2',
        recipeId: 'rec-01',
        ingredientName: 'Fillet Ikan Kembung Segar',
        category: 'PROTEIN_HEWANI',
        proteinPairingId: 'prot-01',
        weightGrams: 70.0,
        householdQty: 2.0,
        householdUnit: 'potong kecil tanpa duri',
        estimatedPriceIdr: 4500,
        preparationNote: 'pastikan bebas duri, kukus matang',
        sortOrder: 2
      },
      {
        id: 'ing-01-3',
        recipeId: 'rec-01',
        ingredientName: 'Wortel Manis Parut',
        category: 'SAYUR_BUMBU',
        weightGrams: 30.0,
        householdQty: 2.0,
        householdUnit: 'sendok makan parut',
        estimatedPriceIdr: 800,
        preparationNote: 'parut halus kukus',
        sortOrder: 3
      },
      {
        id: 'ing-01-4',
        recipeId: 'rec-01',
        ingredientName: 'Minyak Kelapa / Lemak Ayam (Lemak Tambahan)',
        category: 'LEMAK_TAMBAHAN',
        weightGrams: 10.0,
        householdQty: 1.0,
        householdUnit: 'sendok teh',
        estimatedPriceIdr: 500,
        preparationNote: 'campurkan saat hangat',
        sortOrder: 4
      }
    ],
    status: 'FEATURED_PMT',
    authorId: 'usr-kader-01',
    posyanduId: 'pos-01',
    avgLahapRating: 4.8,
    reviewCount: 14,
    createdAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-10-15T09:30:00Z'
  },

  // 2. UMBI-02: Puree Ubi Jalar Oranye Hati Ayam Telur Puyuh
  {
    id: 'rec-02',
    recipeCode: 'UMBI-02',
    slug: 'puree-ubi-jalar-hati-ayam-telur-puyuh',
    title: 'Puree Ubi Jalar Oranye Hati Ayam Telur Puyuh',
    shortDescription: 'MPASI 6-8 bulan dengan Indeks Glikemik rendah (44) kaya Beta-Karoten dan Double Protein Hewani (Hati Ayam + Telur Puyuh) untuk membasmi risiko stunting.',
    tuberId: 'tub-02',
    tuberSlug: 'ubi-jalar',
    usesMocaf: false,
    ageCategory: 'MPASI_6_8',
    cookingMethod: 'KUKUS',
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    basePortions: 2,
    caloriesPerPortion: 142.0,
    carbsGPerPortion: 16.5,
    proteinGPerPortion: 7.9,
    fatGPerPortion: 4.8,
    fiberGPerPortion: 2.1,
    micronutrientHighlights: 'Tinggi Zat Besi Heme (Hati Ayam 15,8mg) & Beta-Karoten Alami',
    textureGuideByAge: 'Usia 6-8 Bulan: Puree / bubur saring kental halus. Tekstur kental tidak mudah tumpah saat sendok dimiringkan sesuai standar Kemenkes.',
    safetyWarningBanner: 'Kukus Matang dan Saring Halus; Hindari Menggoreng untuk Menjaga IG Rendah (44)',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Cuci bersih ubi jalar oranye, kupas kulit tipisnya, dan potong kecil agar cepat matang saat dikukus.',
        durationMinutes: 5,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 2,
        instruction: 'Bersihkan hati ayam segar di bawah air mengalir, buang selaput putih, lumuri sedikit air perasan jeruk nipis selama 5 menit untuk mengurangi bau amis.',
        durationMinutes: 5,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 3,
        instruction: 'Kukus ubi jalar, hati ayam, dan 2 butir telur puyuh rebus selama 15-20 menit hingga ubi dan hati benar-benar matang sempurna.',
        durationMinutes: 18,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 4,
        instruction: 'LANGKAH TEKSTUR MPASI: Masukkan ubi jalar, hati ayam kukus, dan kuning telur puyuh ke dalam saringan kawat kawat (strainer). Tekan menggunakan punggung sendok hingga menghasilkan puree lembut kental.',
        durationMinutes: 7,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 5,
        instruction: 'Tambahkan 1 sdt kaldu ayam hangat dan santan matang/minyak kelapa, aduk hingga tekstur puree lembut dan tidak tumpah saat sendok dimiringkan.',
        durationMinutes: 3,
        isCriticalSafetyStep: false
      }
    ],
    ingredients: [
      {
        id: 'ing-02-1',
        recipeId: 'rec-02',
        ingredientName: 'Ubi Jalar Oranye Kupas',
        category: 'KARBO_UMBI',
        weightGrams: 120.0,
        householdQty: 1.0,
        householdUnit: 'buah sedang (120g)',
        estimatedPriceIdr: 1800,
        preparationNote: 'pilih yang segar, kupas tipis',
        sortOrder: 1
      },
      {
        id: 'ing-02-2',
        recipeId: 'rec-02',
        ingredientName: 'Hati Ayam Kampung Segar',
        category: 'PROTEIN_HEWANI',
        proteinPairingId: 'prot-02',
        weightGrams: 40.0,
        householdQty: 1.0,
        householdUnit: 'buah hati ayam',
        estimatedPriceIdr: 2500,
        preparationNote: 'cuci bersih, kukus matang sempurna',
        sortOrder: 2
      },
      {
        id: 'ing-02-3',
        recipeId: 'rec-02',
        ingredientName: 'Telur Puyuh Rebus',
        category: 'PROTEIN_HEWANI',
        proteinPairingId: 'prot-04',
        weightGrams: 20.0,
        householdQty: 2.0,
        householdUnit: 'butir',
        estimatedPriceIdr: 1000,
        preparationNote: 'rebus kupas, ambil kuning & putihnya',
        sortOrder: 3
      },
      {
        id: 'ing-02-4',
        recipeId: 'rec-02',
        ingredientName: 'Santan Kental Matang / Minyak Kelapa',
        category: 'LEMAK_TAMBAHAN',
        weightGrams: 10.0,
        householdQty: 1.0,
        householdUnit: 'sendok teh munjung',
        estimatedPriceIdr: 600,
        preparationNote: 'lemak tambahan booster kalori',
        sortOrder: 4
      }
    ],
    status: 'FEATURED_PMT',
    authorId: 'usr-admin-01',
    posyanduId: 'pos-01',
    avgLahapRating: 4.9,
    reviewCount: 22,
    createdAt: '2026-10-02T08:00:00Z',
    updatedAt: '2026-10-16T10:00:00Z'
  },

  // 3. UMBI-03: Schotel Singkong Kukus Ayam Keju
  {
    id: 'rec-03',
    recipeCode: 'UMBI-03',
    slug: 'schotel-singkong-kukus-ayam-keju',
    title: 'Schotel Singkong Kukus Ayam Keju',
    shortDescription: 'Menu padat energi dan kalsium untuk balita 12-23 bulan dan kudapan PMT Posyandu. Gurih lembut, sangat manjur mengatasi anak Gerakan Tutup Mulut (GTM).',
    tuberId: 'tub-01',
    tuberSlug: 'singkong',
    usesMocaf: false,
    ageCategory: 'MPASI_12_23',
    cookingMethod: 'KUKUS',
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    basePortions: 4,
    caloriesPerPortion: 195.0,
    carbsGPerPortion: 26.0,
    proteinGPerPortion: 9.5,
    fatGPerPortion: 5.8,
    fiberGPerPortion: 1.9,
    micronutrientHighlights: 'Padat Kalori (Singkong 162 kkal) + Kalsium & Protein Lengkap Telur Ayam',
    textureGuideByAge: 'Usia 12-23 Bulan & Balita: Tekstur schotel padat-lembut gurih, mudah dipotong kecil-kecil dan dikunyah sendiri oleh anak.',
    safetyWarningBanner: 'Pilih Singkong Segar Kulit Ari Merah Muda (Bebas Pahit/Sianida), Rendam Air Bersih',
    steps: [
      {
        stepNumber: 1,
        instruction: 'LANGKAH SELEKSI SINGKONG AMAN: Pilih singkong yang kulit ari dalamnya berwarna merah muda/kemerahan cerah. Jangan gunakan jika ada semburat biru/hitam.',
        durationMinutes: 5,
        isCriticalSafetyStep: true
      },
      {
        stepNumber: 2,
        instruction: 'Kupas singkong tebal, buang serat tengahnya, cuci bersih dan rendam air bersih selama 15 menit. Kukus hingga empuk lalu tumbuk kasar/halus sesuai selera anak.',
        durationMinutes: 20,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 3,
        instruction: 'Tumis bawang bombay dan bawang putih cincang dengan sedikit margarin/mentega hingga harum, masukkan daging ayam cincang hingga berubah warna.',
        durationMinutes: 6,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 4,
        instruction: 'Kocok 2 butir telur ayam bersama susu UHT tawar/kaldu, campurkan ke dalam singkong tumbuk dan tumisan ayam. Tambahkan parutan keju cheddar.',
        durationMinutes: 5,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 5,
        instruction: 'Tuang adonan ke dalam pinggan tahan panas atau wadah foil PMT. Kukus selama 20 menit hingga matang set. Sajikan hangat.',
        durationMinutes: 20,
        isCriticalSafetyStep: false
      }
    ],
    ingredients: [
      {
        id: 'ing-03-1',
        recipeId: 'rec-03',
        ingredientName: 'Singkong Manis Segar Kupas',
        category: 'KARBO_UMBI',
        weightGrams: 250.0,
        householdQty: 2.0,
        householdUnit: 'potong besar (250g)',
        estimatedPriceIdr: 2500,
        preparationNote: 'kupas kulit ari merah muda, kukus empuk lumatkan',
        sortOrder: 1
      },
      {
        id: 'ing-03-2',
        recipeId: 'rec-03',
        ingredientName: 'Daging Ayam Giling Segar',
        category: 'PROTEIN_HEWANI',
        proteinPairingId: 'prot-05',
        weightGrams: 100.0,
        householdQty: 5.0,
        householdUnit: 'sendok makan munjung',
        estimatedPriceIdr: 5000,
        preparationNote: 'cincang/giling halus',
        sortOrder: 2
      },
      {
        id: 'ing-03-3',
        recipeId: 'rec-03',
        ingredientName: 'Telur Ayam Negeri',
        category: 'PROTEIN_HEWANI',
        proteinPairingId: 'prot-03',
        weightGrams: 100.0,
        householdQty: 2.0,
        householdUnit: 'butir',
        estimatedPriceIdr: 4000,
        preparationNote: 'kocok lepas bersama susu/kaldu',
        sortOrder: 3
      },
      {
        id: 'ing-03-4',
        recipeId: 'rec-03',
        ingredientName: 'Keju Cheddar Parut',
        category: 'PROTEIN_HEWANI',
        weightGrams: 40.0,
        householdQty: 3.0,
        householdUnit: 'sendok makan parut',
        estimatedPriceIdr: 3000,
        preparationNote: 'sumber kalsium dan rasa gurih alami',
        sortOrder: 4
      },
      {
        id: 'ing-03-5',
        recipeId: 'rec-03',
        ingredientName: 'Susu UHT Plain / Kaldu Ayam Kampung',
        category: 'LEMAK_TAMBAHAN',
        weightGrams: 100.0,
        householdQty: 0.5,
        householdUnit: 'gelas belimbing (100ml)',
        estimatedPriceIdr: 2000,
        preparationNote: 'cairan pelembut adonan schotel',
        sortOrder: 5
      }
    ],
    status: 'PUBLISHED',
    authorId: 'usr-kader-01',
    posyanduId: 'pos-01',
    avgLahapRating: 4.7,
    reviewCount: 19,
    createdAt: '2026-10-03T09:00:00Z',
    updatedAt: '2026-10-14T11:00:00Z'
  },

  // 4. UMBI-04: Bola-Bola Ubi Ungu Ayam Tempe
  {
    id: 'rec-04',
    recipeCode: 'UMBI-04',
    slug: 'bola-bola-ubi-ungu-ayam-tempe',
    title: 'Bola-Bola Ubi Ungu Ayam Tempe',
    shortDescription: 'Kudapan PMT Posyandu dan balita 2-5 tahun berbalut warna ungu alami antosianin dengan isian ganda ayam (hewani) dan tempe (nabati) yang renyah di luar, empuk di dalam.',
    tuberId: 'tub-02',
    tuberSlug: 'ubi-jalar',
    usesMocaf: false,
    ageCategory: 'BALITA_2_5',
    cookingMethod: 'KUKUS',
    prepTimeMinutes: 20,
    cookTimeMinutes: 20,
    basePortions: 4,
    caloriesPerPortion: 158.0,
    carbsGPerPortion: 22.0,
    proteinGPerPortion: 7.6,
    fatGPerPortion: 4.2,
    fiberGPerPortion: 2.8,
    micronutrientHighlights: 'Kaya Antioksidan Antosianin + Probiotik Tempe & Protein Ayam',
    textureGuideByAge: 'Balita 2-5 Tahun & PMT: Bentuk bola-bola finger food genggam anak, tekstur lembut di dalam dan tidak bikin tersedak.',
    safetyWarningBanner: 'Kukus Ubi Ungu Hingga Sangat Lembut; Hindari Deep Frying Berminyak Berlebih',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Kupas ubi ungu, cuci bersih, lalu kukus selama 20 menit hingga sangat empuk. Lumatkan ubi selagi hangat hingga halus.',
        durationMinutes: 20,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 2,
        instruction: 'Kukus tempe kedelai selama 10 menit untuk menghilangkan rasa langu mentah, lalu hancurkan/lumatkan halus.',
        durationMinutes: 10,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 3,
        instruction: 'Campurkan ubi ungu lumat, tempe halus, daging ayam cincang, 1 butir telur kocok, bawang putih halus, dan sejumput garam.',
        durationMinutes: 5,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 4,
        instruction: 'Bentuk adonan menjadi bola-bola kecil seukuran bola pingpong (sekitar 25-30g per butir).',
        durationMinutes: 7,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 5,
        instruction: 'Kukus bola-bola selama 15 menit. Untuk sajian menarik balita, dapat dipanggang teflon sejenak dengan olesan sedikit mentega agar harum.',
        durationMinutes: 15,
        isCriticalSafetyStep: false
      }
    ],
    ingredients: [
      {
        id: 'ing-04-1',
        recipeId: 'rec-04',
        ingredientName: 'Ubi Ungu Segar Kupas',
        category: 'KARBO_UMBI',
        weightGrams: 240.0,
        householdQty: 2.0,
        householdUnit: 'buah sedang (240g)',
        estimatedPriceIdr: 3500,
        preparationNote: 'kukus matang lumatkan',
        sortOrder: 1
      },
      {
        id: 'ing-04-2',
        recipeId: 'rec-04',
        ingredientName: 'Daging Ayam Cincang Halus',
        category: 'PROTEIN_HEWANI',
        proteinPairingId: 'prot-05',
        weightGrams: 80.0,
        householdQty: 4.0,
        householdUnit: 'sendok makan cincang',
        estimatedPriceIdr: 4000,
        preparationNote: 'protein hewani gurih',
        sortOrder: 2
      },
      {
        id: 'ing-04-3',
        recipeId: 'rec-04',
        ingredientName: 'Tempe Kedelai Murni',
        category: 'PROTEIN_NABATI',
        proteinPairingId: 'prot-07',
        weightGrams: 60.0,
        householdQty: 2.0,
        householdUnit: 'potong sedang',
        estimatedPriceIdr: 1000,
        preparationNote: 'kukus 10 menit lalu lumatkan',
        sortOrder: 3
      },
      {
        id: 'ing-04-4',
        recipeId: 'rec-04',
        ingredientName: 'Telur Ayam Perekat',
        category: 'PROTEIN_HEWANI',
        proteinPairingId: 'prot-03',
        weightGrams: 50.0,
        householdQty: 1.0,
        householdUnit: 'butir',
        estimatedPriceIdr: 2000,
        preparationNote: 'kocok lepas campur ke adonan',
        sortOrder: 4
      }
    ],
    status: 'FEATURED_PMT',
    authorId: 'usr-kader-02',
    posyanduId: 'pos-02',
    avgLahapRating: 4.9,
    reviewCount: 31,
    createdAt: '2026-10-04T07:30:00Z',
    updatedAt: '2026-10-17T08:00:00Z'
  },

  // 5. UMBI-05: Perkedel Kukus Panggang Talas Ikan Lele
  {
    id: 'rec-05',
    recipeCode: 'UMBI-05',
    slug: 'perkedel-kukus-panggang-talas-ikan-lele',
    title: 'Perkedel Kukus Panggang Talas Ikan Lele',
    shortDescription: 'Olahan talas ramah kantong berpadu ikan lele segar tinggi protein hewani dan fosfor. Metode kukus lalu panggang teflon minim minyak, bebas kolesterol jahat.',
    tuberId: 'tub-03',
    tuberSlug: 'talas',
    usesMocaf: false,
    ageCategory: 'BALITA_2_5',
    cookingMethod: 'PANGGANG',
    prepTimeMinutes: 25,
    cookTimeMinutes: 25,
    basePortions: 4,
    caloriesPerPortion: 168.0,
    carbsGPerPortion: 23.5,
    proteinGPerPortion: 9.2,
    fatGPerPortion: 4.1,
    fiberGPerPortion: 1.9,
    micronutrientHighlights: 'Tinggi Fosfor, Kalium (Talas 536mg) & Protein Lele Bersih',
    textureGuideByAge: 'Balita 2-5 Tahun: Tekstur perkedel lembut di dalam dengan lapisan luar kecokelatan harum tanpa keras.',
    safetyWarningBanner: 'Wajib Kupas Kering & Rendam Air Garam Hangat 15-20 Menit (Anti-Gatal Oksalat)',
    steps: [
      {
        stepNumber: 1,
        instruction: 'LANGKAH KRITIS KUPAS KERING: Kupas talas tanpa dicuci terlebih dahulu untuk mencegah getah oksalat memicu gatal di tangan.',
        durationMinutes: 5,
        isCriticalSafetyStep: true
      },
      {
        stepNumber: 2,
        instruction: 'LANGKAH KRITIS AIR GARAM: Rendam talas potong di air hangat bergaram selama 15-20 menit, lalu bilas mengalir hingga kesat bersih.',
        durationMinutes: 20,
        isCriticalSafetyStep: true
      },
      {
        stepNumber: 3,
        instruction: 'Kukus talas bersama fillet lele hingga matang empuk. Suwir halus daging lele (pastikan tidak ada duri halus tersisa).',
        durationMinutes: 18,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 4,
        instruction: 'Tumbuk talas kukus, campurkan suwiran lele, irisan daun seledri, 1 butir telur, bawang putih goreng halus, dan lada sedikit.',
        durationMinutes: 7,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 5,
        instruction: 'Bentuk pipih bulat perkedel. Panggang di atas wajan teflon anti-lengket dengan olesan kuas minyak tipis hingga kedua sisi kuning keemasan.',
        durationMinutes: 10,
        isCriticalSafetyStep: false
      }
    ],
    ingredients: [
      {
        id: 'ing-05-1',
        recipeId: 'rec-05',
        ingredientName: 'Talas Bogor Kupas Bersih',
        category: 'KARBO_UMBI',
        weightGrams: 260.0,
        householdQty: 2.0,
        householdUnit: 'potong sedang (260g)',
        estimatedPriceIdr: 4000,
        preparationNote: 'kupas kering rendam garam hangat',
        sortOrder: 1
      },
      {
        id: 'ing-05-2',
        recipeId: 'rec-05',
        ingredientName: 'Fillet Ikan Lele Kukus Suwir',
        category: 'PROTEIN_HEWANI',
        proteinPairingId: 'prot-06',
        weightGrams: 120.0,
        householdQty: 2.0,
        householdUnit: 'potong fillet lele',
        estimatedPriceIdr: 4500,
        preparationNote: 'buang duri suwir lembut',
        sortOrder: 2
      },
      {
        id: 'ing-05-3',
        recipeId: 'rec-05',
        ingredientName: 'Telur Ayam',
        category: 'PROTEIN_HEWANI',
        proteinPairingId: 'prot-03',
        weightGrams: 50.0,
        householdQty: 1.0,
        householdUnit: 'butir',
        estimatedPriceIdr: 2000,
        preparationNote: 'campur ke dalam adonan',
        sortOrder: 3
      },
      {
        id: 'ing-05-4',
        recipeId: 'rec-05',
        ingredientName: 'Daun Seledri & Bawang Bumbu',
        category: 'SAYUR_BUMBU',
        weightGrams: 15.0,
        householdQty: 1.0,
        householdUnit: 'sendok makan cincang',
        estimatedPriceIdr: 800,
        preparationNote: 'aroma wangi disukai balita',
        sortOrder: 4
      }
    ],
    status: 'PUBLISHED',
    authorId: 'usr-kader-01',
    posyanduId: 'pos-01',
    avgLahapRating: 4.8,
    reviewCount: 16,
    createdAt: '2026-10-05T08:00:00Z',
    updatedAt: '2026-10-15T09:00:00Z'
  },

  // 6. UMBI-06: Pancake Tepung Mocaf Singkong Pisang Telur
  {
    id: 'rec-06',
    recipeCode: 'UMBI-06',
    slug: 'pancake-tepung-mocaf-pisang-telur',
    title: 'Pancake Tepung Mocaf Singkong Pisang Telur',
    shortDescription: 'Inovasi kudapan PMT berbahan Mocaf (fermentasi singkong kaya pati resisten) dipadu pisang manis dan telur. Bebas gluten (gluten-free), empuk lembut untuk MPASI 12-23 bulan.',
    tuberId: 'tub-01',
    tuberSlug: 'singkong',
    usesMocaf: true,
    ageCategory: 'PMT_KUDAPAN',
    cookingMethod: 'PANGGANG',
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    basePortions: 4,
    caloriesPerPortion: 152.0,
    carbsGPerPortion: 23.0,
    proteinGPerPortion: 6.2,
    fatGPerPortion: 3.8,
    fiberGPerPortion: 2.3,
    micronutrientHighlights: 'Pati Resisten (Resistant Starch) Mocaf + Kalium Pisang & Kolin Telur',
    textureGuideByAge: 'Kudapan PMT & 12-23 Bulan: Tekstur pancake empuk pori lembut, wangi pisang manis alami tanpa gula pasir berlebih.',
    safetyWarningBanner: 'Gunakan Tepung Mocaf Tervalidasi BPOM / Sertifikasi Higienis Bebas Gluten',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Lumatkan pisang ambon/raja matang menggunakan garpu hingga halus beraroma harum.',
        durationMinutes: 4,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 2,
        instruction: 'Kocok 2 butir telur ayam bersama santan/susu cair hingga menyatu rata.',
        durationMinutes: 3,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 3,
        instruction: 'Campurkan tepung Mocaf dan sejumput kayu manis bubuk ke dalam kocokan telur dan pisang lumat. Aduk perlahan hingga menjadi adonan kental halus tanpa gumpalan.',
        durationMinutes: 5,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 4,
        instruction: 'Panaskan wajan teflon anti-lengket dengan api sangat kecil, olesi sedikit minyak kelapa/mentega.',
        durationMinutes: 2,
        isCriticalSafetyStep: false
      },
      {
        stepNumber: 5,
        instruction: 'Tuang 1 sendok sayur kecil adonan. Masak hingga muncul gelembung berpori di permukaan, balik perlahan, masak 1-2 menit hingga matang sempurna. Sajikan untuk PMT balita.',
        durationMinutes: 8,
        isCriticalSafetyStep: false
      }
    ],
    ingredients: [
      {
        id: 'ing-06-1',
        recipeId: 'rec-06',
        ingredientName: 'Tepung Mocaf (Modified Cassava Flour)',
        category: 'KARBO_UMBI',
        weightGrams: 100.0,
        householdQty: 10.0,
        householdUnit: 'sendok makan munjung',
        estimatedPriceIdr: 2500,
        preparationNote: 'ayak halus bebas gluten',
        sortOrder: 1
      },
      {
        id: 'ing-06-2',
        recipeId: 'rec-06',
        ingredientName: 'Telur Ayam Negeri Utuh',
        category: 'PROTEIN_HEWANI',
        proteinPairingId: 'prot-03',
        weightGrams: 100.0,
        householdQty: 2.0,
        householdUnit: 'butir',
        estimatedPriceIdr: 4000,
        preparationNote: 'kocok lepas bersama pisang',
        sortOrder: 2
      },
      {
        id: 'ing-06-3',
        recipeId: 'rec-06',
        ingredientName: 'Pisang Ambon / Raja Matang',
        category: 'SAYUR_BUMBU',
        weightGrams: 100.0,
        householdQty: 1.0,
        householdUnit: 'buah sedang',
        estimatedPriceIdr: 2000,
        preparationNote: 'pemanis dan pelembut alami',
        sortOrder: 3
      },
      {
        id: 'ing-06-4',
        recipeId: 'rec-06',
        ingredientName: 'Santan Encer / Susu UHT Plain',
        category: 'LEMAK_TAMBAHAN',
        weightGrams: 80.0,
        householdQty: 0.3,
        householdUnit: 'gelas belimbing (80ml)',
        estimatedPriceIdr: 1200,
        preparationNote: 'cairan pelembut adonan',
        sortOrder: 4
      }
    ],
    status: 'FEATURED_PMT',
    authorId: 'usr-admin-01',
    posyanduId: 'pos-01',
    avgLahapRating: 4.9,
    reviewCount: 25,
    createdAt: '2026-10-06T08:00:00Z',
    updatedAt: '2026-10-18T09:00:00Z'
  }
];

export const MYTH_FACTS_DATA: MythFact[] = [
  {
    id: 'mf-01',
    category: 'Gizi Karbohidrat',
    mythStatement: 'Anak belum makan namanya kalau belum makan nasi putih.',
    factExplanation: 'Tubuh anak membutuhkan karbohidrat sebagai sumber energi, bukan harus selalu dari beras! Singkong, Ubi Jalar, dan Talas mengandung karbohidrat kompleks dan serat 4-7 kali lebih tinggi dibanding beras putih (0,4g vs 2,0-3,0g). Yang terpenting adalah memadukannya dengan protein hewani pendamping.',
    scientificReferenceNote: 'Kementerian Kesehatan RI & Tabel Komposisi Pangan Indonesia (TKPI)',
    isActive: true,
    sortOrder: 1
  },
  {
    id: 'mf-02',
    category: 'Keamanan Talas',
    mythStatement: 'Talas pasti bikin gatal tenggorokan anak, jadi dilarang untuk MPASI.',
    factExplanation: 'Rasa gatal talas berasal dari kristal kalsium oksalat yang mudah dihilangkan secara tuntas dengan: (1) Kupas talas dalam keadaan KERING, (2) Rendam di air garam hangat selama 15-20 menit, (3) Bilas bersih air mengalir, dan (4) Kukus hingga matang sempurna. Talas memiliki pati terhalus yang justru sangat aman bagi pencernaan bayi.',
    scientificReferenceNote: 'Penelitian Pengolahan Umbi Talas Balitkabi & UI Kimia Pangan',
    isActive: true,
    sortOrder: 2
  },
  {
    id: 'mf-03',
    category: 'Metabolisme Energi',
    mythStatement: 'Ubi jalar bikin anak cepat lapar dibanding makan nasi.',
    factExplanation: 'Justru sebaliknya! Ubi jalar memiliki Indeks Glikemik rendah (IG 44) dibanding nasi matang (IG 70-90) dan serat tinggi (2,5g/100g). Karbohidratnya diserap perlahan sehingga gula darah stabil dan anak kenyang lebih lama tanpa lemas.',
    scientificReferenceNote: 'International Glycemic Index Database & Harvard Health Publishing',
    isActive: true,
    sortOrder: 3
  },
  {
    id: 'mf-04',
    category: 'Pencegahan Stunting',
    mythStatement: 'Makan umbi saja sudah cukup mengenyangkan, tidak perlu repot tambah ikan atau telur.',
    factExplanation: 'BAHAYA STUNTING! Umbi lokal unggul dalam karbohidrat dan serat, namun kandungan protein alaminya hanya 1,0 - 1,57 g per 100g. Otak dan tulang balita WAJIB membutuhkan asam amino esensial dari protein hewani (telur, ikan kembung, ayam, hati) untuk tumbuh tinggi dan cerdas.',
    scientificReferenceNote: 'Panduan Praktik MPASI IDAI (Ikatan Dokter Anak Indonesia)',
    isActive: true,
    sortOrder: 4
  },
  {
    id: 'mf-05',
    category: 'Keamanan Singkong',
    mythStatement: 'Semua jenis singkong mengandung racun yang membahayakan balita.',
    factExplanation: 'Hanya singkong varietas pahit yang berkadar asam sianida (HCN) tinggi. Singkong manis konsumsi sehari-hari dengan kulit ari berwarna merah muda sangat aman bila dikupas, dicuci/direndam air bersih, dan dimasak hingga matang sempurna.',
    scientificReferenceNote: 'Balai Penelitian Tanaman Aneka Kacang dan Umbi (Balitkabi)',
    isActive: true,
    sortOrder: 5
  },
  {
    id: 'mf-06',
    category: 'Inovasi Tepung',
    mythStatement: 'Tepung Mocaf sama saja dengan tepung tapioka biasa.',
    factExplanation: 'Berbeda! Tepung tapioka hanya pati murni dari endapan sari singkong, sedangkan Tepung Mocaf (Modified Cassava Flour) dibuat dari seluruh umbi singkong yang difermentasi asam laktat. Mocaf kaya pati resisten (penurun gula darah), lebih kaya serat, dan bebas gluten.',
    scientificReferenceNote: 'Pusat Penelitian Bioteknologi LIPI / BRIN',
    isActive: true,
    sortOrder: 6
  },
  {
    id: 'mf-07',
    category: 'Ekologi Pangan',
    mythStatement: 'Produksi beras tidak berdampak buruk pada lingkungan kita.',
    factExplanation: 'Produksi 1 kg beras sawah membutuhkan 2.291 hingga 3.420 liter air dan menyumbang 39% dari total emisi gas rumah kaca pertanian nasional. Umbi lokal jauh lebih hemat air, tahan kekeringan, dan ramah iklim.',
    scientificReferenceNote: 'Water Footprint Network & Kajian Ketahanan Pangan Bappenas',
    isActive: true,
    sortOrder: 7
  },
  {
    id: 'mf-08',
    category: 'Biaya PMT Posyandu',
    mythStatement: 'Memasak PMT berbahan umbi dan ikan lebih mahal dibanding biskuit pabrikan.',
    factExplanation: 'Pemanfaatan umbi lokal (Rp 2.000 - Rp 4.000/kg) dipadu telur/ikan lokal jauh lebih hemat per porsi, tanpa bahan pengawet/pemanis buatan, dan langsung melatih lidah balita menyukai cita rasa pangan segar Nusantara.',
    scientificReferenceNote: 'Studi Evaluasi Menu PMT Berbasis Pangan Lokal Kemenkes RI',
    isActive: true,
    sortOrder: 8
  }
];

export const QUIZ_QUESTIONS_DATA: QuizQuestion[] = [
  {
    id: 'qz-01',
    questionText: 'Berapakah jejak air (water footprint) rata-rata yang dihabiskan untuk memproduksi 1 kg beras di sawah?',
    options: [
      '100 - 300 liter air',
      '500 - 800 liter air',
      '2.291 - 3.420 liter air',
      '10.000 liter air'
    ],
    correctOptionIndex: 2,
    explanationText: 'Tepat sekali! Produksi 1 kg beras sawah membutuhkan 2.291 hingga 3.420 liter air dan menyumbang 39% emisi gas rumah kaca pertanian. Mengganti sebagian porsi nasi dengan umbi lokal sangat menghemat air bumi kita!',
    isActive: true,
    sortOrder: 1
  },
  {
    id: 'qz-02',
    questionText: 'Bagaimana langkah terpenting untuk menghilangkan rasa gatal kristal kalsium oksalat pada Talas sebelum dimasak untuk balita?',
    options: [
      'Cuci talas dengan sabun cuci piring',
      'Kupas talas dalam keadaan KERING, lalu rendam di air garam hangat selama 15-20 menit',
      'Langsung goreng talas dengan api besar tanpa dikupas',
      'Jemur talas di bawah terik matahari selama 3 hari'
    ],
    correctOptionIndex: 1,
    explanationText: 'Benar! Mengupas talas dalam keadaan kering mencegah getah menyebar ke pori tangan, dan perendaman air garam hangat melarutkan kristal kalsium oksalat penyebab gatal di tenggorokan secara tuntas.',
    isActive: true,
    sortOrder: 2
  },
  {
    id: 'qz-03',
    questionText: 'Mengapa setiap menu olahan umbi lokal (Singkong, Ubi, Talas) untuk balita WAJIB dipadukan dengan sumber protein hewani/nabati?',
    options: [
      'Agar warna makanan menjadi lebih menarik',
      'Karena umbi mengandung protein alami yang relatif rendah (1,0 - 1,57g / 100g) sehingga butuh protein pendamping untuk cegah stunting',
      'Agar umbi tidak cepat basi',
      'Supaya kuah masakan menjadi lebih kental'
    ],
    correctOptionIndex: 1,
    explanationText: 'Hebat! Umbi kaya energi dan serat, namun kandungan proteinnya hanya 1,0-1,57g/100g. Balita wajib mendapat protein hewani (telur/ikan/ayam) demi pembentukan jaringan otak dan pencegahan stunting.',
    isActive: true,
    sortOrder: 3
  },
  {
    id: 'qz-04',
    questionText: 'Manakah di antara umbi lokal berikut yang memiliki Indeks Glikemik (IG) paling rendah (hanya 44) dan kaya Beta-Karoten?',
    options: [
      'Beras Putih',
      'Ubi Jalar Oranye',
      'Singkong Goreng',
      'Tepung Terigu'
    ],
    correctOptionIndex: 1,
    explanationText: 'Luar biasa! Ubi jalar memiliki IG sangat rendah (44) dan kaya Beta-karoten (provitamin A) yang menjaga imunitas serta kesehatan mata anak.',
    isActive: true,
    sortOrder: 4
  },
  {
    id: 'qz-05',
    questionText: 'Ciri-ciri fisik apakah yang menandakan singkong segar berkualitas baik dan aman dari racun asam sianida (HCN)?',
    options: [
      'Kulit ari dalam berwarna merah muda cerah dan daging umbi bersih tanpa bercak kebiruan',
      'Kulit ari luar berlendir dan berbau menyengat',
      'Memiliki bercak biru kehitaman di bagian tengah',
      'Rasanya pahit saat dicicipi mentah'
    ],
    correctOptionIndex: 0,
    explanationText: 'Sempurna! Pilih singkong manis segar dengan lapisan kulit ari dalam kemerahan/merah muda. Hindari singkong yang ada semburat biru atau berasa pahit karena berisiko sianida tinggi.',
    isActive: true,
    sortOrder: 5
  }
];

export const POSYANDU_PARTNERS_DATA: PosyanduPartner[] = [
  {
    id: 'pos-01',
    code: 'POS-DPK-01',
    name: 'Posyandu Melati RW 05',
    organizationType: 'POSYANDU_ANAK',
    kelurahan: 'Beji',
    kecamatan: 'Beji',
    city: 'Kota Depok',
    address: 'Balai Warga RW 05, Jl. Melati Raya No. 12',
    registeredToddlersCount: 68,
    contactPerson: 'Ibu Siti Rahmawati',
    contactWhatsapp: '081298765432',
    isVerified: true,
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'pos-02',
    code: 'POS-DPK-02',
    name: 'Posyandu Anggrek Ceria',
    organizationType: 'POSYANDU_ANAK',
    kelurahan: 'Mekarjaya',
    kecamatan: 'Sukmajaya',
    city: 'Kota Depok',
    address: 'Pos RW 03, Jl. Anggrek Ceria No. 4',
    registeredToddlersCount: 54,
    contactPerson: 'Ibu Nurhasanah',
    contactWhatsapp: '081311223344',
    isVerified: true,
    createdAt: '2026-09-10T08:00:00Z'
  },
  {
    id: 'pos-03',
    code: 'POS-DPK-03',
    name: 'Posyandu Tunas Harapan',
    organizationType: 'POSYANDU_ANAK',
    kelurahan: 'Pondok Cina',
    kecamatan: 'Beji',
    city: 'Kota Depok',
    address: 'Jl. Margonda Raya Gg. Kober No. 20',
    registeredToddlersCount: 45,
    contactPerson: 'Ibu Ratna Dewi',
    contactWhatsapp: '085712345678',
    isVerified: true,
    createdAt: '2026-09-15T08:00:00Z'
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'usr-admin-01',
    name: 'Tim Fasilitator Mahasiswa UI/Akademik',
    email: 'admin@umbicare.id',
    role: 'ADMIN',
    isActive: true,
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'usr-kader-01',
    name: 'Ibu Siti Rahmawati (Ketua Kader Melati RW 05)',
    email: 'kader.melati@umbicare.id',
    role: 'KADER',
    posyanduId: 'pos-01',
    isActive: true,
    createdAt: '2026-09-02T08:00:00Z'
  },
  {
    id: 'usr-kader-02',
    name: 'Ibu Nurhasanah (Kader Posyandu Anggrek)',
    email: 'kader.anggrek@umbicare.id',
    role: 'KADER',
    posyanduId: 'pos-02',
    isActive: true,
    createdAt: '2026-09-03T08:00:00Z'
  },
  {
    id: 'usr-public-01',
    name: 'Bunda Nisa (Ibu Balita 11 Bulan)',
    email: 'bunda.nisa@umbicare.id',
    role: 'PUBLIC_USER',
    posyanduId: 'pos-01',
    isActive: true,
    createdAt: '2026-10-01T08:00:00Z'
  }
];

export const PMT_SCHEDULES_DATA: PmtSchedule[] = [
  {
    id: 'pmt-sched-01',
    scheduleCode: 'PMT-202609-01',
    posyanduId: 'pos-01',
    recipeId: 'rec-01',
    createdByUserId: 'usr-kader-01',
    eventDate: '2026-09-15',
    counselingTopic: 'Pengenalan Talas Bogor Aman Anti-Gatal & Asam Lemak Ikan Kembung untuk Balita',
    targetPortions: 50,
    actualPortionsDistributed: 52,
    attendeesMothersCount: 48,
    estimatedTotalCostIdr: 195000,
    shoppingListSnapshot: [
      {
        ingredientName: 'Talas Bogor',
        category: 'KARBO_UMBI',
        cleanWeightGrams: 3500,
        cleanWeightDisplay: '3,50 kg bersih',
        marketGrossWeightKg: 4.13,
        marketGrossDisplay: '4,15 kg belanja pasar (+18% toleransi kupas kulit)',
        householdDisplay: 'sekitar 38 potong sedang',
        estimatedCostIdr: 62500,
        preparationNote: 'kupas kering, rendam air garam hangat 20 menit',
        isUnitItem: false
      },
      {
        ingredientName: 'Fillet Ikan Kembung Segar',
        category: 'PROTEIN_HEWANI',
        cleanWeightGrams: 1750,
        cleanWeightDisplay: '1,75 kg bersih',
        marketGrossWeightKg: 1.75,
        marketGrossDisplay: '1,75 kg pasar',
        householdDisplay: 'sekitar 50 potong fillet tanpa duri',
        estimatedCostIdr: 112500,
        preparationNote: 'bebas duri, kukus bersama kaldu',
        isUnitItem: false
      },
      {
        ingredientName: 'Wortel Manis Parut',
        category: 'SAYUR_BUMBU',
        cleanWeightGrams: 750,
        cleanWeightDisplay: '0,75 kg bersih',
        householdDisplay: 'sekitar 50 sdm parut',
        estimatedCostIdr: 20000,
        preparationNote: 'parut halus',
        isUnitItem: false
      }
    ],
    recipeNutritionSnapshot: {
      caloriesPerPortion: 165.0,
      carbsGPerPortion: 24.5,
      proteinGPerPortion: 8.8,
      tuberGramsPerPortion: 70.0,
      recipeTitle: 'Bubur Tim Talas Ikan Kembung',
      recipeCode: 'UMBI-01'
    },
    status: 'EVALUATED',
    evaluationNotes: 'Ibu-ibu sangat antusias karena baru tahu talas bisa diolah tanpa gatal sama sekali. Balita makan lahap, mangkok bersih!',
    createdAt: '2026-09-08T08:00:00Z',
    updatedAt: '2026-09-16T11:00:00Z'
  },
  {
    id: 'pmt-sched-02',
    scheduleCode: 'PMT-202610-01',
    posyanduId: 'pos-01',
    recipeId: 'rec-04',
    createdByUserId: 'usr-kader-01',
    eventDate: '2026-10-15',
    counselingTopic: 'Mitos vs Fakta Nasi vs Ubi Jalar & Manfaat Antosianin untuk Daya Tahan Balita',
    targetPortions: 60,
    actualPortionsDistributed: 60,
    attendeesMothersCount: 53,
    estimatedTotalCostIdr: 157500,
    shoppingListSnapshot: [
      {
        ingredientName: 'Ubi Ungu Segar',
        category: 'KARBO_UMBI',
        cleanWeightGrams: 3600,
        cleanWeightDisplay: '3,60 kg bersih',
        marketGrossWeightKg: 4.25,
        marketGrossDisplay: '4,25 kg pasar (+18% kupas)',
        householdDisplay: 'sekitar 30 buah ubi sedang',
        estimatedCostIdr: 52500,
        preparationNote: 'kukus lumatkan halus',
        isUnitItem: false
      },
      {
        ingredientName: 'Daging Ayam Cincang',
        category: 'PROTEIN_HEWANI',
        cleanWeightGrams: 1200,
        cleanWeightDisplay: '1,20 kg',
        marketGrossDisplay: '1,20 kg pasar',
        householdDisplay: '60 sendok makan cincang',
        estimatedCostIdr: 60000,
        preparationNote: 'cincang halus',
        isUnitItem: false
      },
      {
        ingredientName: 'Tempe Kedelai Murni',
        category: 'PROTEIN_NABATI',
        cleanWeightGrams: 900,
        cleanWeightDisplay: '0,90 kg',
        householdDisplay: '3 papan tempe sedang (30 potong)',
        estimatedCostIdr: 15000,
        preparationNote: 'kukus 10 menit lalu lumatkan',
        isUnitItem: false
      },
      {
        ingredientName: 'Telur Ayam Perekat',
        category: 'PROTEIN_HEWANI',
        cleanWeightGrams: 750,
        cleanWeightDisplay: '0,75 kg',
        householdDisplay: '15 butir telur (dibulatkan ke atas)',
        estimatedCostIdr: 30000,
        preparationNote: 'kocok lepas campur ke adonan',
        isUnitItem: true,
        unitItemCount: 15
      }
    ],
    recipeNutritionSnapshot: {
      caloriesPerPortion: 158.0,
      carbsGPerPortion: 22.0,
      proteinGPerPortion: 7.6,
      tuberGramsPerPortion: 60.0,
      recipeTitle: 'Bola-Bola Ubi Ungu Ayam Tempe',
      recipeCode: 'UMBI-04'
    },
    status: 'DISTRIBUTED',
    evaluationNotes: 'Dibagikan dalam 60 kotak PMT berstiker label QR Code. 90% ibu langsung scan kode dan melihat resep.',
    createdAt: '2026-10-05T08:00:00Z',
    updatedAt: '2026-10-15T14:00:00Z'
  },
  {
    id: 'pmt-sched-03',
    scheduleCode: 'PMT-202611-01',
    posyanduId: 'pos-01',
    recipeId: 'rec-03',
    createdByUserId: 'usr-kader-01',
    eventDate: '2026-11-12',
    counselingTopic: 'Kreativitas Singkong Bebas GTM & Tips Memilih Singkong Manis Kulit Merah Muda',
    targetPortions: 50,
    estimatedTotalCostIdr: 205000,
    shoppingListSnapshot: [
      {
        ingredientName: 'Singkong Manis Segar',
        category: 'KARBO_UMBI',
        cleanWeightGrams: 3125,
        cleanWeightDisplay: '3,13 kg bersih',
        marketGrossWeightKg: 3.69,
        marketGrossDisplay: '3,70 kg belanja pasar (+18% toleransi kulit)',
        householdDisplay: 'sekitar 25 potong besar',
        estimatedCostIdr: 31250,
        preparationNote: 'pilih kulit ari merah muda, rendam 15 menit',
        isUnitItem: false
      },
      {
        ingredientName: 'Daging Ayam Giling',
        category: 'PROTEIN_HEWANI',
        cleanWeightGrams: 1250,
        cleanWeightDisplay: '1,25 kg',
        marketGrossDisplay: '1,25 kg pasar',
        householdDisplay: '63 sendok makan munjung',
        estimatedCostIdr: 62500,
        preparationNote: 'giling segar',
        isUnitItem: false
      },
      {
        ingredientName: 'Telur Ayam Negeri',
        category: 'PROTEIN_HEWANI',
        cleanWeightGrams: 1250,
        cleanWeightDisplay: '1,25 kg',
        householdDisplay: '25 butir telur utuh',
        estimatedCostIdr: 50000,
        preparationNote: 'kocok lepas',
        isUnitItem: true,
        unitItemCount: 25
      },
      {
        ingredientName: 'Keju Cheddar Parut',
        category: 'PROTEIN_HEWANI',
        cleanWeightGrams: 500,
        cleanWeightDisplay: '0,50 kg (3 balok keju)',
        householdDisplay: '38 sdm parut',
        estimatedCostIdr: 37500,
        preparationNote: 'parut halus',
        isUnitItem: false
      },
      {
        ingredientName: 'Susu UHT Plain / Kaldu Ayam',
        category: 'LEMAK_TAMBAHAN',
        cleanWeightGrams: 1250,
        cleanWeightDisplay: '1,25 liter',
        householdDisplay: 'sekitar 6 gelas belimbing',
        estimatedCostIdr: 24000,
        preparationNote: 'cairan pelembut adonan',
        isUnitItem: false
      }
    ],
    recipeNutritionSnapshot: {
      caloriesPerPortion: 195.0,
      carbsGPerPortion: 26.0,
      proteinGPerPortion: 9.5,
      tuberGramsPerPortion: 62.5,
      recipeTitle: 'Schotel Singkong Kukus Ayam Keju',
      recipeCode: 'UMBI-03'
    },
    status: 'SHOPPING_READY',
    createdAt: '2026-10-18T09:00:00Z',
    updatedAt: '2026-10-18T09:30:00Z'
  },
  {
    id: 'pmt-sched-04',
    scheduleCode: 'PMT-202611-02',
    posyanduId: 'pos-02',
    recipeId: 'rec-02',
    createdByUserId: 'usr-kader-02',
    eventDate: '2026-11-20',
    counselingTopic: 'Pentingnya Double Protein Hewani (Hati Ayam + Telur Puyuh) Pendamping Ubi MPASI 6-8 Bulan',
    targetPortions: 40,
    estimatedTotalCostIdr: 118000,
    shoppingListSnapshot: [],
    recipeNutritionSnapshot: {
      caloriesPerPortion: 142.0,
      carbsGPerPortion: 16.5,
      proteinGPerPortion: 7.9,
      tuberGramsPerPortion: 60.0,
      recipeTitle: 'Puree Ubi Jalar Oranye Hati Ayam Telur Puyuh',
      recipeCode: 'UMBI-02'
    },
    status: 'PLANNED',
    createdAt: '2026-10-18T10:00:00Z',
    updatedAt: '2026-10-18T10:00:00Z'
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-01',
    recipeId: 'rec-01',
    pmtScheduleId: 'pmt-sched-01',
    posyanduId: 'pos-01',
    motherName: 'Bunda Fitri',
    childAgeMonths: 10,
    lahapRating: 5,
    hasRecookedAtHome: true,
    comment: 'Awalnya sempat takut masak talas karena mitos gatal di leher. Pas coba resep Posyandu kupas kering dan rendam air garam hangat, hasilnya lembuuut banget dan rasanya gurih gurih manis. Si kecil lahap habis 1 mangkok!',
    isApproved: true,
    createdAt: '2026-09-16T10:20:00Z'
  },
  {
    id: 'rev-02',
    recipeId: 'rec-01',
    pmtScheduleId: 'pmt-sched-01',
    posyanduId: 'pos-01',
    motherName: 'Bunda Rini (Ibu Kenzi)',
    childAgeMonths: 9,
    lahapRating: 5,
    hasRecookedAtHome: false,
    comment: 'Dapat PMT ini dari meja 4 Posyandu Melati. Tekstur timnya pas banget buat usia 9 bulan, ikannya gak amis karena dipadukan kaldu dan talas.',
    isApproved: true,
    createdAt: '2026-09-16T11:45:00Z'
  },
  {
    id: 'rev-03',
    recipeId: 'rec-02',
    posyanduId: 'pos-01',
    motherName: 'Bunda Nisa (Ibu Alika)',
    childAgeMonths: 7,
    lahapRating: 5,
    hasRecookedAtHome: true,
    comment: 'Alika lagi masa awal MPASI. Hati ayam biasanya ditolak kalau dicampur nasi bubur, tapi pas dipadu ubi oranye yang manis legit, dia mangap terus!',
    isApproved: true,
    createdAt: '2026-10-04T13:10:00Z'
  },
  {
    id: 'rev-04',
    recipeId: 'rec-04',
    pmtScheduleId: 'pmt-sched-02',
    posyanduId: 'pos-01',
    motherName: 'Mama Arka',
    childAgeMonths: 24,
    lahapRating: 5,
    hasRecookedAtHome: true,
    comment: 'Warnanya ungu cantik menarik anak. Isian ayam tempenya bikin kenyang dan padat gizi. Sangat rekomen buat ide snack PMT!',
    isApproved: true,
    createdAt: '2026-10-15T15:30:00Z'
  },
  {
    id: 'rev-05',
    recipeId: 'rec-03',
    posyanduId: 'pos-01',
    motherName: 'Bunda Laila',
    childAgeMonths: 18,
    lahapRating: 4,
    hasRecookedAtHome: true,
    comment: 'Solusi jitu anak GTM nasi! Schotel singkongnya harum keju dan ayam, lembut empuk digigit anak.',
    isApproved: true,
    createdAt: '2026-10-14T09:15:00Z'
  },
  {
    id: 'rev-06',
    recipeId: 'rec-05',
    posyanduId: 'pos-01',
    motherName: 'Ibu Desi',
    childAgeMonths: 36,
    lahapRating: 5,
    hasRecookedAtHome: false,
    comment: 'Kombinasi talas dan lele ini jenius. Murah tapi gizinya tinggi. Anak saya minta nambah dua potong perkedel.',
    isApproved: true,
    createdAt: '2026-10-16T14:20:00Z'
  },
  {
    id: 'rev-07',
    recipeId: 'rec-06',
    posyanduId: 'pos-01',
    motherName: 'Bunda Maya',
    childAgeMonths: 14,
    lahapRating: 5,
    hasRecookedAtHome: true,
    comment: 'Tepung Mocaf praktis banget disimpan di toples dapur. Dibuat pancake sama pisang harum banget tanpa perlu tambah gula pasir.',
    isApproved: true,
    createdAt: '2026-10-17T08:45:00Z'
  },
  {
    id: 'rev-08',
    recipeId: 'rec-02',
    posyanduId: 'pos-02',
    motherName: 'Ibu Tari',
    childAgeMonths: 8,
    lahapRating: 5,
    hasRecookedAtHome: false,
    comment: 'Senang banget ada info Indeks Glikemik ubi jalar yang rendah (44). Pureenya halus dan bikin anak tidur nyenyak kenyang.',
    isApproved: true,
    createdAt: '2026-10-12T16:00:00Z'
  },
  {
    id: 'rev-09',
    recipeId: 'rec-04',
    pmtScheduleId: 'pmt-sched-02',
    posyanduId: 'pos-01',
    motherName: 'Bunda Cita',
    childAgeMonths: 30,
    lahapRating: 5,
    hasRecookedAtHome: true,
    comment: 'Langsung recook di rumah setelah dapat dari Posyandu Melati kemarin. Tempe dicampur ubi jadi gak ketahuan sama anak yang biasanya pilih-pilih makan.',
    isApproved: true,
    createdAt: '2026-10-16T18:20:00Z'
  },
  {
    id: 'rev-10',
    recipeId: 'rec-01',
    posyanduId: 'pos-02',
    motherName: 'Ibu Wati',
    childAgeMonths: 11,
    lahapRating: 4,
    hasRecookedAtHome: false,
    comment: 'Sangat terbantu dengan panduan tekstur sesuai usia. Bener-bener informatif dan tidak ribet.',
    isApproved: true,
    createdAt: '2026-10-10T11:00:00Z'
  },
  {
    id: 'rev-11',
    recipeId: 'rec-03',
    posyanduId: 'pos-02',
    motherName: 'Bunda Eka',
    childAgeMonths: 20,
    lahapRating: 5,
    hasRecookedAtHome: true,
    comment: 'Singkong disulap jadi schotel gaya barat tapi bahan lokal murah meriah. Top banget!',
    isApproved: true,
    createdAt: '2026-10-15T12:00:00Z'
  },
  {
    id: 'rev-12',
    recipeId: 'rec-06',
    posyanduId: 'pos-03',
    motherName: 'Bunda Zahra',
    childAgeMonths: 16,
    lahapRating: 5,
    hasRecookedAtHome: true,
    comment: 'Pancakenya lembut empuk, anak gak tersedak. Bagus banget buat snack sore penambah berat badan.',
    isApproved: true,
    createdAt: '2026-10-18T14:10:00Z'
  }
];
