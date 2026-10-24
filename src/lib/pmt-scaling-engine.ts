// PMT Mass Scaling and Market Shopping Calculation Engine
// 100% compliant with Master Prompt Specifications

import { Recipe, PmtScalingResult, ScaledIngredientItem } from '../types';

/**
 * Kalkulator Takaran Masak & Belanja PMT Massal (1 s.d. 500 Porsi)
 * Rumus:
 * Skala S = Target Porsi / Base Portions
 * Berat Bersih (g) = Base Weight (g) * S
 * Berat Kotor Belanja Pasar Umbi (+18% toleransi kupas kulit) = (Berat Bersih * 1.18) / 1000 kg
 * Pembulatan Satuan Pasar:
 * Bahan satuan (misal telur): Math.ceil() ke butir terdekat
 * Bobot >= 1000g diformat ke kg (2 desimal)
 */
export function scalePmtIngredients(
  recipe: Recipe,
  targetPortionsInput: number
): PmtScalingResult {
  // Edge Case: validasi rentang porsi 1 s.d. 500
  let targetPortions = Math.round(Number(targetPortionsInput));
  if (isNaN(targetPortions) || targetPortions < 1) targetPortions = 1;
  if (targetPortions > 500) targetPortions = 500;

  const basePortions = recipe.basePortions || 2;
  const scaleFactor = targetPortions / basePortions;

  let totalEstimatedCostIdr = 0;
  const scaledIngredients: ScaledIngredientItem[] = [];

  recipe.ingredients.forEach(ing => {
    const cleanWeightGrams = Math.round(ing.weightGrams * scaleFactor);
    const scaledPriceIdr = Math.round((ing.estimatedPriceIdr || 0) * scaleFactor);
    totalEstimatedCostIdr += scaledPriceIdr;

    const isTuber = ing.category === 'KARBO_UMBI' && !recipe.usesMocaf;
    const isEgg = ing.ingredientName.toLowerCase().includes('telur');
    const isUnitItem = isEgg || ing.householdUnit.toLowerCase().includes('butir') || ing.householdUnit.toLowerCase().includes('buah');

    // Berat kotor pasar untuk umbi kupas (+18% toleransi kulit)
    let marketGrossWeightKg: number | undefined;
    let marketGrossDisplay: string | undefined;

    if (isTuber) {
      marketGrossWeightKg = Number(((cleanWeightGrams * 1.18) / 1000).toFixed(2));
      marketGrossDisplay = `${marketGrossWeightKg.toString().replace('.', ',')} kg belanja pasar (+18% toleransi kupas)`;
    }

    // Format tampilan berat bersih
    let cleanWeightDisplay = '';
    if (cleanWeightGrams >= 1000) {
      const kg = (cleanWeightGrams / 1000).toFixed(2).replace('.', ',');
      cleanWeightDisplay = `${kg} kg bersih`;
    } else {
      cleanWeightDisplay = `${cleanWeightGrams} g bersih`;
    }

    // Format URT & Satuan
    let householdDisplay = '';
    let unitItemCount: number | undefined;

    if (isUnitItem) {
      unitItemCount = Math.ceil(ing.householdQty * scaleFactor);
      householdDisplay = `${unitItemCount} ${ing.householdUnit} (dibulatkan ke atas)`;
    } else {
      const scaledUrt = Number((ing.householdQty * scaleFactor).toFixed(1));
      householdDisplay = `sekitar ${scaledUrt.toString().replace('.', ',')} ${ing.householdUnit}`;
    }

    scaledIngredients.push({
      ingredientName: ing.ingredientName,
      category: ing.category,
      cleanWeightGrams,
      cleanWeightDisplay,
      marketGrossWeightKg,
      marketGrossDisplay,
      householdDisplay,
      estimatedCostIdr: scaledPriceIdr,
      preparationNote: ing.preparationNote,
      isUnitItem,
      unitItemCount
    });
  });

  // Checklist belanja pasar
  const shoppingChecklist = scaledIngredients.map(item => {
    const isCritical = item.category === 'KARBO_UMBI' || item.category === 'PROTEIN_HEWANI';
    const qtyText = item.marketGrossDisplay || item.cleanWeightDisplay;
    return {
      item: item.ingredientName,
      qty: `${qtyText} (${item.householdDisplay})`,
      isCriticalSafetyItem: isCritical
    };
  });

  // Tuber preparation warning
  let tuberPreparationWarning = '';
  if (recipe.tuberSlug === 'talas') {
    tuberPreparationWarning = 'PERINGATAN MASAK PMT MASSAL TALAS: Siapkan air garam hangat dalam wadah besar. Kupas talas dalam keadaan KERING sebelum dicuci, lalu rendam 15-20 menit agar 100% bebas gatal.';
  } else if (recipe.tuberSlug === 'singkong' && !recipe.usesMocaf) {
    tuberPreparationWarning = 'PERINGATAN MASAK PMT MASSAL SINGKONG: Pastikan singkong yang dibeli berkulit ari merah muda dan tidak berasa pahit. Rendam potongan dalam air bersih sebelum dikukus.';
  } else if (recipe.tuberSlug === 'ubi-jalar') {
    tuberPreparationWarning = 'TIPS PMT UBI JALAR: Kukus hingga empuk sempurna untuk mempertahankan indeks glikemik rendah (44) dan warna cerah beta-karoten/antosianin.';
  }

  return {
    recipeCode: recipe.recipeCode,
    recipeTitle: recipe.title,
    basePortions,
    targetPortions,
    scaleFactor: Number(scaleFactor.toFixed(2)),
    scaledIngredients,
    totalEstimatedCostIdr,
    tuberPreparationWarning,
    shoppingChecklist
  };
}

/**
 * SDG Impact Calculator (Berdasarkan jumlah porsi umbi tersalurkan)
 * 1 porsi konsumsi karbohidrat anak = ~50g beras mentah (~100g nasi matang)
 * Substitusi Beras (kg) = (Total Porsi * 50g) / 1000
 * Penghematan Jejak Air (L) = Kg Beras * [2291 s/d 3420 L/kg], rata-rata 2855 L/kg
 */
export function calculateSdgImpact(totalPortionsDistributed: number) {
  const portions = Math.max(0, totalPortionsDistributed);
  const substitutedRiceKg = Number(((portions * 50) / 1000).toFixed(1));
  
  const minWaterSavedLiters = Math.round(substitutedRiceKg * 2291);
  const maxWaterSavedLiters = Math.round(substitutedRiceKg * 3420);
  const avgWaterSavedLiters = Math.round(substitutedRiceKg * 2855);

  return {
    totalPortionsDistributed: portions,
    substitutedRiceKg,
    minWaterSavedLiters,
    maxWaterSavedLiters,
    avgWaterSavedLiters,
    emissionReductionNote: 'Membantu menekan kontribusi emisi gas rumah kaca pertanian padi sawah (39% emisi agrikultur nasional).'
  };
}
