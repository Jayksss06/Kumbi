// Pure Calculation and Validation Engine for Kumbi
// 100% compliant with Master Prompt Specifications

import { 
  RiceConversionResult, 
  BalancedPlateResult, 
  AgeCategory, 
  TuberSlug,
  Recipe,
  RecipeIngredient
} from '../types';
import { TUBERS_DATA, PROTEIN_PAIRINGS_DATA } from '../data/scientific-seed-data';

/**
 * Kalkulator Penukar Porsi Nasi Anak ke Umbi Lokal
 * Standar Acuan:
 * 1 centong nasi anak = 50g nasi putih matang (~65 kkal, ~14g karbohidrat).
 * Target Energi (kkal) = centongCount * 65 kkal
 * 
 * Nilai Acuan Energi Umbi (per 100g):
 * 1. Singkong: 162.5 kkal (nilai tengah 160-165)
 * 2. Ubi Jalar: 86.0 kkal
 * 3. Talas: 145.0 kkal
 * 
 * Nasi putih matang per 100g = 130 kkal, ~28g karbo, ~2.5g protein
 */
export function calculateRiceToTuberEquivalence(centongCount: number): RiceConversionResult {
  // Edge case: sanitasi input
  const safeCentong = Math.max(0.5, Math.min(10, isNaN(centongCount) ? 1 : centongCount));
  
  const cookedRiceGrams = safeCentong * 50;
  const targetEnergyKcal = safeCentong * 65;
  const cookedRiceCarbsG = (cookedRiceGrams / 100) * 28;
  const cookedRiceProteinG = (cookedRiceGrams / 100) * 2.5;

  // Rumus Setara Energi (Iso-Caloric)
  const singkongGrams = Math.round((targetEnergyKcal / 162.5) * 100);
  const ubiJalarGrams = Math.round((targetEnergyKcal / 86.0) * 100);
  const talasGrams = Math.round((targetEnergyKcal / 145.0) * 100);

  // URT (Ukuran Rumah Tangga)
  const singkongUrt = getSingkongUrt(singkongGrams);
  const ubiJalarUrt = getUbiJalarUrt(ubiJalarGrams);
  const talasUrt = getTalasUrt(talasGrams);

  // Selisih protein: nasi 2.5g/100g vs rata-rata umbi ~1.2g/100g
  const avgTuberProteinG = ((singkongGrams * 0.0118) + (ubiJalarGrams * 0.0157) + (talasGrams * 0.015)) / 3;
  const proteinDifferenceG = Math.max(0, Number((cookedRiceProteinG - avgTuberProteinG).toFixed(1)));

  const proteinRecommendation = `Karena kandungan protein umbi (${avgTuberProteinG.toFixed(1)}g) lebih rendah dari nasi (${cookedRiceProteinG.toFixed(1)}g), Bunda WAJIB menambahkan lauk pendamping protein hewani: +1 butir telur ayam / 1 potong ikan kembung (35g) / 1 hati ayam (30g) agar gizi anak seimbang dan terhindar dari risiko stunting.`;

  return {
    toddlerCentongCount: safeCentong,
    cookedRiceGrams,
    targetEnergyKcal,
    cookedRiceCarbsG: Number(cookedRiceCarbsG.toFixed(1)),
    cookedRiceProteinG: Number(cookedRiceProteinG.toFixed(1)),
    singkongGrams,
    singkongUrt,
    ubiJalarGrams,
    ubiJalarUrt,
    talasGrams,
    talasUrt,
    proteinDifferenceG,
    proteinRecommendation
  };
}

function getSingkongUrt(grams: number): string {
  if (grams <= 45) return `sekitar ½ potong sedang atau 2 sdm lumat (${grams}g)`;
  if (grams <= 90) return `sekitar 1 potong sedang atau 3-4 sdm lumat (${grams}g)`;
  if (grams <= 130) return `sekitar 1½ potong sedang (${grams}g)`;
  return `sekitar 2 potong sedang (${grams}g)`;
}

function getUbiJalarUrt(grams: number): string {
  if (grams <= 80) return `sekitar ½ buah sedang atau 3 sdm puree (${grams}g)`;
  if (grams <= 160) return `sekitar 1 buah sedang atau 5-6 sdm munjung puree (${grams}g)`;
  if (grams <= 230) return `sekitar 1½ buah sedang (${grams}g)`;
  return `sekitar 2 buah sedang (${grams}g)`;
}

function getTalasUrt(grams: number): string {
  if (grams <= 50) return `sekitar ½ potong sedang dadu kukus (${grams}g)`;
  if (grams <= 100) return `sekitar 1 potong sedang atau 4 sdm lumat (${grams}g)`;
  if (grams <= 150) return `sekitar 1½ potong sedang (${grams}g)`;
  return `sekitar 2 potong sedang (${grams}g)`;
}

/**
 * Simulator Piring Seimbang Anak (Interactive Balanced Plate Simulator)
 */
export function calculateBalancedPlate(
  ageCategory: AgeCategory,
  tuberSlug: TuberSlug,
  proteinPairingId: string
): BalancedPlateResult {
  const tuber = TUBERS_DATA.find(t => t.slug === tuberSlug) || TUBERS_DATA[1];
  const protein = PROTEIN_PAIRINGS_DATA.find(p => p.id === proteinPairingId) || PROTEIN_PAIRINGS_DATA[0];

  // Porsi standar menurut usia anak
  let tuberGrams = 60;
  let proteinGrams = protein.defaultServingGramsMpasi;
  let healthyFatGrams = 5;
  let veggieFruitGrams = 20;
  let textureGuide = '';

  switch (ageCategory) {
    case 'MPASI_6_8':
      tuberGrams = 50;
      proteinGrams = 30;
      healthyFatGrams = 5;
      veggieFruitGrams = 15;
      textureGuide = 'Usia 6-8 Bulan: Bubur saring kental / puree halus (tidak tumpah saat sendok dimiringkan). Disaring kawat 1-2 kali.';
      break;
    case 'MPASI_9_11':
      tuberGrams = 70;
      proteinGrams = 35;
      healthyFatGrams = 5;
      veggieFruitGrams = 20;
      textureGuide = 'Usia 9-11 Bulan: Bubur tim cincang halus / makanan lumat lembut bertekstur kasar untuk melatih oromotor anak.';
      break;
    case 'MPASI_12_23':
      tuberGrams = 90;
      proteinGrams = 40;
      healthyFatGrams = 7;
      veggieFruitGrams = 30;
      textureGuide = 'Usia 12-23 Bulan: Makanan keluarga tekstural lunak, schotel kukus, atau bola-bola lembut yang bisa digigit anak.';
      break;
    case 'BALITA_2_5':
      tuberGrams = 120;
      proteinGrams = 50;
      healthyFatGrams = 10;
      veggieFruitGrams = 40;
      textureGuide = 'Usia 2-5 Tahun: Makanan keluarga porsi penuh & finger food padat gizi untuk mendukung masa pertumbuhan aktif.';
      break;
    case 'PMT_KUDAPAN':
    default:
      tuberGrams = 80;
      proteinGrams = 35;
      healthyFatGrams = 7;
      veggieFruitGrams = 25;
      textureGuide = 'Kudapan PMT Posyandu: Kudapan sehat bernutrisi tinggi (bukan jajanan ultra-proses) ramah dikunyah.';
      break;
  }

  // Hitung total nutrisi
  const tuberCalories = (tuberGrams / 100) * tuber.caloriesKcal;
  const tuberCarbs = (tuberGrams / 100) * tuber.carbsG;
  const tuberProtein = (tuberGrams / 100) * tuber.proteinG;
  const tuberFiber = (tuberGrams / 100) * tuber.fiberG;

  const proteinCalories = (proteinGrams / 100) * protein.caloriesPer100g;
  const proteinProtein = (proteinGrams / 100) * protein.proteinGPer100g;
  const proteinFat = (proteinGrams / 100) * 8.0; // rata-rata lemak protein hewani/nabati

  const fatCalories = healthyFatGrams * 9.0;
  const veggieCalories = (veggieFruitGrams / 100) * 35.0;

  const totalCaloriesKcal = Math.round(tuberCalories + proteinCalories + fatCalories + veggieCalories);
  const totalCarbsG = Number((tuberCarbs + (veggieFruitGrams * 0.05)).toFixed(1));
  const totalProteinG = Number((tuberProtein + proteinProtein).toFixed(1));
  const totalFatG = Number((proteinFat + healthyFatGrams).toFixed(1));
  const totalFiberG = Number((tuberFiber + (veggieFruitGrams * 0.02)).toFixed(1));

  // Persentase piring seimbang anak
  const totalPlateGrams = tuberGrams + proteinGrams + veggieFruitGrams + healthyFatGrams;
  const tuberPct = Math.round((tuberGrams / totalPlateGrams) * 100);
  const proteinPct = Math.round((proteinGrams / totalPlateGrams) * 100);
  const veggieFruitPct = Math.round((veggieFruitGrams / totalPlateGrams) * 100);
  const healthyFatPct = 100 - (tuberPct + proteinPct + veggieFruitPct);

  // Micronutrient highlights
  let micronutrientHighlights = `${protein.nutritionBenefitNote}`;
  if (tuber.potassiumMg) {
    micronutrientHighlights += ` Dipadu Talas tinggi Kalium (${tuber.potassiumMg}mg/100g) untuk keseimbangan elektrolit & fungsi jantung.`;
  } else if (tuber.slug === 'ubi-jalar') {
    micronutrientHighlights += ` Dipadu Ubi Jalar kaya Beta-Karoten alami (IG 44) untuk kesehatan mata & imunitas.`;
  } else if (tuber.slug === 'singkong') {
    micronutrientHighlights += ` Dipadu Singkong sumber energi padat untuk balita aktif.`;
  }

  // Safety reminder
  let safetyReminder = tuber.toxinWarning;

  return {
    ageCategory,
    tuberSlug,
    proteinPairingId,
    totalCaloriesKcal,
    totalCarbsG,
    totalProteinG,
    totalFatG,
    totalFiberG,
    plateComposition: {
      tuberPct,
      proteinPct,
      veggieFruitPct,
      healthyFatPct
    },
    textureGuide,
    micronutrientHighlights,
    safetyReminder
  };
}

/**
 * Validator Aturan Gizi & Keamanan Resep (Recipe Nutrition Guard)
 * Menegakkan aturan:
 * 1. Resep balita/MPASI wajib memiliki minimal 1 bahan PROTEIN_HEWANI / PROTEIN_NABATI
 * 2. Resep talas wajib memuat protokol anti-oksalat
 * 3. Resep singkong wajib memuat peringatan kulit merah muda & anti-sianida
 */
export interface RecipeValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  injectedSafetySteps: string[];
}

export function validateRecipeNutritionAndSafety(
  recipeData: Partial<Recipe>,
  ingredients: Partial<RecipeIngredient>[] = []
): RecipeValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const injectedSafetySteps: string[] = [];

  const age = recipeData.ageCategory || 'BALITA_2_5';
  const isToddlerRecipe = ['MPASI_6_8', 'MPASI_9_11', 'MPASI_12_23', 'BALITA_2_5'].includes(age);

  // 1. Validasi Protein Wajib
  const hasProtein = ingredients.some(
    ing => ing.category === 'PROTEIN_HEWANI' || ing.category === 'PROTEIN_NABATI'
  );

  if (isToddlerRecipe && !hasProtein) {
    errors.push(
      'Resep belum dapat dipublikasikan. Karena kandungan protein alami umbi rendah (1,0–1,57g/100g), setiap resep MPASI/Balita wajib menyertakan minimal 1 bahan sumber Protein Hewani (seperti telur, ikan kembung, ayam, hati ayam) atau Protein Nabati (tempe/tahu) untuk mencegah risiko stunting. Silakan tambahkan bahan protein terlebih dahulu.'
    );
  }

  // 2. Validasi Talas & Oksalat
  const isTalas = recipeData.tuberSlug === 'talas' || ingredients.some(i => i.ingredientName?.toLowerCase().includes('talas'));
  if (isTalas) {
    const hasOxalateWarning = recipeData.steps?.some(s => 
      s.instruction.toLowerCase().includes('garam') || s.instruction.toLowerCase().includes('kupas kering')
    );
    if (!hasOxalateWarning) {
      warnings.push('Resep Talas memerlukan instruksi keamanan wajib kalsium oksalat. Langkah pengamanan akan disisipkan otomatis.');
      injectedSafetySteps.push(
        'LANGKAH KEAMANAN KRITIS TALAS (ANTI-OKSALAT): Kupas talas dalam keadaan KERING (jangan dibasahi air). Potong dadu lalu rendam dalam air hangat bergaram selama 15-20 menit untuk melarutkan kristal kalsium oksalat pemicu gatal. Bilas berkali-kali di air mengalir hingga kesat sebelum dikukus matang.'
      );
    }
  }

  // 3. Validasi Singkong Segar & Sianida
  const isSingkong = (recipeData.tuberSlug === 'singkong' && !recipeData.usesMocaf) || 
    ingredients.some(i => i.ingredientName?.toLowerCase().includes('singkong'));
  if (isSingkong) {
    const hasCyanideWarning = recipeData.steps?.some(s => 
      s.instruction.toLowerCase().includes('merah muda') || s.instruction.toLowerCase().includes('rendam')
    );
    if (!hasCyanideWarning) {
      warnings.push('Resep Singkong memerlukan instruksi seleksi aman singkong manis.');
      injectedSafetySteps.push(
        'LANGKAH KEAMANAN SELEKSI SINGKONG: Pastikan memilih singkong segar berkulit ari merah muda. Hindari singkong dengan semburat kebiruan atau berasa pahit (asam sianida/HCN tinggi). Kupas bersih dan rendam air minimal 15 menit.'
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    injectedSafetySteps
  };
}
