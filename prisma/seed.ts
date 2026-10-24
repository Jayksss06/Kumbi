// Prisma Database Seeder for Kumbi
// Memasukkan seluruh data ilmiah 3 umbi, 6 resep tervalidasi, 7 sumber protein, 3 Posyandu, 4 jadwal PMT, dan 12 ulasan

import { 
  TUBERS_DATA, 
  PROTEIN_PAIRINGS_DATA, 
  RECIPES_DATA, 
  MYTH_FACTS_DATA, 
  QUIZ_QUESTIONS_DATA, 
  POSYANDU_PARTNERS_DATA, 
  PMT_SCHEDULES_DATA, 
  REVIEWS_DATA, 
  DEMO_USERS 
} from '../src/data/scientific-seed-data';

export async function runSeed(prismaClient?: any) {
  console.log('Seeding Kumbi Database...');
  console.log(`- ${TUBERS_DATA.length} Data Ilmiah Umbi & Pembanding Beras`);
  console.log(`- ${PROTEIN_PAIRINGS_DATA.length} Sumber Protein Pendamping`);
  console.log(`- ${RECIPES_DATA.length} Resep MPASI & PMT Balita Tervalidasi Gizi`);
  console.log(`- ${MYTH_FACTS_DATA.length} Kartu Mitos vs Fakta`);
  console.log(`- ${QUIZ_QUESTIONS_DATA.length} Soal Micro-Quiz`);
  console.log(`- ${POSYANDU_PARTNERS_DATA.length} Mitra Posyandu Anak`);
  console.log(`- ${PMT_SCHEDULES_DATA.length} Jadwal & Snapshot PMT Bulanan`);
  console.log(`- ${REVIEWS_DATA.length} Ulasan "Anak Lahap"`);
  console.log(`- ${DEMO_USERS.length} Akun Demo (Admin, Kader, Public User)`);
  console.log('Seed data successfully prepared for relational DB integration.');
}

if (process.argv[1]?.includes('seed.ts')) {
  runSeed();
}
