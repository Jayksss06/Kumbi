// Supabase Seed Script for Kumbi
// Mengisi data ilmiah awal langsung ke Supabase PostgreSQL via REST Client

import { createClient } from '@supabase/supabase-js';
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

const supabaseUrl = 'https://deucgyrgwovsszktdvih.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRldWNneXJnd292c3N6a3RkdmloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4MjU3MDcsImV4cCI6MjEwODQwMTcwN30.ZwvFGAtKTXr8N-8EQoKB7CdrNn8zCQ0FTFvlqW5hMUo';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('--- Memulai Seeding Supabase Database Kumbi ---');

  // 1. Posyandu Partners
  console.log('1. Mengunggah Posyandu Partners...');
  const posyanduPayload = POSYANDU_PARTNERS_DATA.map(p => ({
    id: p.id,
    code: p.code,
    name: p.name,
    organizationType: p.organizationType,
    kelurahan: p.kelurahan,
    kecamatan: p.kecamatan,
    city: p.city,
    address: p.address || null,
    registeredToddlersCount: p.registeredToddlersCount,
    contactPerson: p.contactPerson || null,
    contactWhatsapp: p.contactWhatsapp || null,
    isVerified: p.isVerified,
    updatedAt: new Date().toISOString()
  }));
  const { error: posyanduErr } = await supabase.from('posyandu_partners').upsert(posyanduPayload);
  if (posyanduErr) console.error('Error posyandu:', posyanduErr.message);
  else console.log(`   Berhasil: ${posyanduPayload.length} unit mitra posyandu.`);

  // 2. Tubers
  console.log('2. Mengunggah Data Ilmiah Umbi...');
  const tubersPayload = TUBERS_DATA.map(t => ({
    id: t.id,
    slug: t.slug,
    localName: t.localName,
    scientificName: t.scientificName,
    isReferenceComparison: t.isReferenceComparison,
    caloriesKcal: t.caloriesKcal,
    caloriesRangeText: t.caloriesRangeText,
    carbsG: t.carbsG,
    carbsRangeText: t.carbsRangeText,
    proteinG: t.proteinG,
    proteinRangeText: t.proteinRangeText,
    fiberG: t.fiberG,
    fiberRangeText: t.fiberRangeText,
    glycemicIndexMin: t.glycemicIndexMin,
    glycemicIndexMax: t.glycemicIndexMax,
    potassiumMg: t.potassiumMg || null,
    keyMicronutrientsJson: JSON.stringify(t.keyMicronutrients),
    mocafDerivativeInfo: t.mocafDerivativeInfo || null,
    safetyPreparationStepsJson: JSON.stringify(t.safetyPreparationSteps),
    toxinWarning: t.toxinWarning,
    themeColorHex: t.themeColorHex
  }));
  const { error: tubersErr } = await supabase.from('tubers').upsert(tubersPayload);
  if (tubersErr) console.error('Error tubers:', tubersErr.message);
  else console.log(`   Berhasil: ${tubersPayload.length} komoditas umbi.`);

  // 3. Protein Pairings
  console.log('3. Mengunggah Sumber Protein Pendamping...');
  const proteinPayload = PROTEIN_PAIRINGS_DATA.map(p => ({
    id: p.id,
    name: p.name,
    proteinType: p.proteinType,
    caloriesPer100g: p.caloriesPer100g,
    proteinGPer100g: p.proteinGPer100g,
    ironMgPer100g: p.ironMgPer100g || null,
    defaultServingGramsMpasi: p.defaultServingGramsMpasi,
    householdUnitDescription: p.householdUnitDescription,
    nutritionBenefitNote: p.nutritionBenefitNote
  }));
  const { error: proteinErr } = await supabase.from('protein_pairings').upsert(proteinPayload);
  if (proteinErr) console.error('Error protein:', proteinErr.message);
  else console.log(`   Berhasil: ${proteinPayload.length} sumber protein.`);

  // 4. Myth Facts
  console.log('4. Mengunggah Kartu Mitos vs Fakta...');
  const mythPayload = MYTH_FACTS_DATA.map(m => ({
    id: m.id,
    category: m.category,
    mythStatement: m.mythStatement,
    factExplanation: m.factExplanation,
    scientificReferenceNote: m.scientificReferenceNote,
    isActive: m.isActive,
    sortOrder: m.sortOrder
  }));
  const { error: mythErr } = await supabase.from('myth_facts').upsert(mythPayload);
  if (mythErr) console.error('Error myth facts:', mythErr.message);
  else console.log(`   Berhasil: ${mythPayload.length} kartu mitos vs fakta.`);

  // 5. Quiz Questions
  console.log('5. Mengunggah Soal Kuis Gizi...');
  const quizPayload = QUIZ_QUESTIONS_DATA.map(q => ({
    id: q.id,
    questionText: q.questionText,
    optionsJson: JSON.stringify(q.options),
    correctOptionIndex: q.correctOptionIndex,
    explanationText: q.explanationText,
    isActive: q.isActive,
    sortOrder: q.sortOrder
  }));
  const { error: quizErr } = await supabase.from('quiz_questions').upsert(quizPayload);
  if (quizErr) console.error('Error quiz questions:', quizErr.message);
  else console.log(`   Berhasil: ${quizPayload.length} butir soal kuis.`);

  // 6. Users
  console.log('6. Mengunggah Akun Demo Pengguna...');
  const usersPayload = DEMO_USERS.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone || null,
    passwordHash: 'argon2id_mock_hash_for_demo',
    role: u.role,
    posyanduId: u.posyanduId || null,
    isActive: true,
    updatedAt: new Date().toISOString()
  }));
  const { error: usersErr } = await supabase.from('users').upsert(usersPayload);
  if (usersErr) console.error('Error users:', usersErr.message);
  else console.log(`   Berhasil: ${usersPayload.length} akun pengguna.`);

  // 7. Recipes
  console.log('7. Mengunggah Katalog Resep Terstandarisasi...');
  const recipesPayload = RECIPES_DATA.map(r => ({
    id: r.id,
    recipeCode: r.recipeCode,
    slug: r.slug,
    title: r.title,
    tuberId: r.tuberId,
    usesMocaf: r.usesMocaf,
    ageCategory: r.ageCategory,
    cookingMethod: r.cookingMethod,
    prepTimeMinutes: r.prepTimeMinutes,
    cookTimeMinutes: r.cookTimeMinutes,
    basePortions: r.basePortions,
    caloriesPerPortion: r.caloriesPerPortion,
    carbsGPerPortion: r.carbsGPerPortion,
    proteinGPerPortion: r.proteinGPerPortion,
    fatGPerPortion: r.fatGPerPortion,
    fiberGPerPortion: r.fiberGPerPortion,
    micronutrientHighlights: r.micronutrientHighlights,
    textureGuideByAge: r.textureGuideByAge,
    safetyWarningBanner: r.safetyWarningBanner,
    stepsJson: JSON.stringify(r.steps),
    status: r.status,
    authorId: r.authorId || null,
    posyanduId: r.posyanduId || null,
    avgLahapRating: r.avgLahapRating,
    reviewCount: r.reviewCount,
    updatedAt: new Date().toISOString()
  }));
  const { error: recipesErr } = await supabase.from('recipes').upsert(recipesPayload);
  if (recipesErr) console.error('Error recipes:', recipesErr.message);
  else console.log(`   Berhasil: ${recipesPayload.length} resep olahan.`);

  // 8. Recipe Ingredients
  console.log('8. Mengunggah Komposisi Bahan Resep...');
  const ingredientsPayload: any[] = [];
  RECIPES_DATA.forEach(r => {
    r.ingredients.forEach(i => {
      ingredientsPayload.push({
        id: i.id,
        recipeId: r.id,
        ingredientName: i.ingredientName,
        category: i.category,
        proteinPairingId: i.proteinPairingId || null,
        weightGrams: i.weightGrams,
        householdQty: i.householdQty,
        householdUnit: i.householdUnit,
        estimatedPriceIdr: i.estimatedPriceIdr,
        preparationNote: i.preparationNote || null,
        sortOrder: i.sortOrder
      });
    });
  });
  const { error: ingErr } = await supabase.from('recipe_ingredients').upsert(ingredientsPayload);
  if (ingErr) console.error('Error ingredients:', ingErr.message);
  else console.log(`   Berhasil: ${ingredientsPayload.length} takaran bahan resep.`);

  // 9. PMT Schedules
  console.log('9. Mengunggah Jadwal & Snapshot PMT...');
  const schedulesPayload = PMT_SCHEDULES_DATA.map(s => ({
    id: s.id,
    scheduleCode: s.scheduleCode,
    posyanduId: s.posyanduId,
    recipeId: s.recipeId,
    createdByUserId: s.createdByUserId,
    eventDate: new Date(s.eventDate).toISOString(),
    counselingTopic: s.counselingTopic,
    targetPortions: s.targetPortions,
    actualPortionsDistributed: s.actualPortionsDistributed || null,
    attendeesMothersCount: s.attendeesMothersCount || null,
    estimatedTotalCostIdr: s.estimatedTotalCostIdr,
    shoppingListSnapshotJson: JSON.stringify(s.shoppingListSnapshot),
    recipeNutritionSnapshotJson: JSON.stringify(s.recipeNutritionSnapshot),
    status: s.status,
    evaluationNotes: s.evaluationNotes || null,
    cancellationReason: s.cancellationReason || null,
    updatedAt: new Date().toISOString()
  }));
  const { error: schedErr } = await supabase.from('pmt_schedules').upsert(schedulesPayload);
  if (schedErr) console.error('Error schedules:', schedErr.message);
  else console.log(`   Berhasil: ${schedulesPayload.length} jadwal PMT.`);

  // 10. Reviews
  console.log('10. Mengunggah Ulasan Evaluasi...');
  const reviewsPayload = REVIEWS_DATA.map(rv => ({
    id: rv.id,
    recipeId: rv.recipeId,
    pmtScheduleId: rv.pmtScheduleId || null,
    posyanduId: rv.posyanduId || null,
    motherName: rv.motherName,
    childAgeMonths: rv.childAgeMonths,
    lahapRating: rv.lahapRating,
    hasRecookedAtHome: rv.hasRecookedAtHome,
    comment: rv.comment,
    isApproved: rv.isApproved,
    createdAt: new Date().toISOString()
  }));
  const { error: revErr } = await supabase.from('reviews').upsert(reviewsPayload);
  if (revErr) console.error('Error reviews:', revErr.message);
  else console.log(`   Berhasil: ${reviewsPayload.length} ulasan anak lahap.`);

  console.log('--- SEEDING SELESAI DENGAN SUKSES! ---');
}

seed().catch(err => console.error('Seed exception:', err));
