import { describe, it, expect } from 'vitest';
import { scalePmtIngredients, calculateSdgImpact } from '../src/lib/pmt-scaling-engine';
import { RECIPES_DATA } from '../src/data/scientific-seed-data';

describe('PMT Scaling Engine Tests', () => {
  it('menskalakan bahan dari 2 porsi dasar menjadi 50 porsi PMT (faktor skala 25x)', () => {
    const recipe = RECIPES_DATA[0]; // Bubur Tim Talas (basePortions = 2)
    const result = scalePmtIngredients(recipe, 50);

    expect(result.targetPortions).toBe(50);
    expect(result.scaleFactor).toBe(25);

    // Bahan dasar Talas = 140g -> 140 * 25 = 3500g (3.5 kg)
    const talasItem = result.scaledIngredients.find(i => i.ingredientName.includes('Talas'));
    expect(talasItem).toBeDefined();
    expect(talasItem?.cleanWeightGrams).toBe(3500);
    expect(talasItem?.cleanWeightDisplay).toBe('3,50 kg bersih');

    // Berat pasar talas (+18% toleransi kulit) = (3500 * 1.18) / 1000 = 4.13 kg
    expect(talasItem?.marketGrossWeightKg).toBe(4.13);

    // Bahan fillet ikan = 70g -> 70 * 25 = 1750g (1.75 kg)
    const ikanItem = result.scaledIngredients.find(i => i.ingredientName.includes('Ikan'));
    expect(ikanItem?.cleanWeightGrams).toBe(1750);
    expect(ikanItem?.cleanWeightDisplay).toBe('1,75 kg bersih');
  });

  it('membulatkan ke atas satuan bahan butir telur (Math.ceil)', () => {
    const schotelRecipe = RECIPES_DATA[2]; // basePortions = 4, 2 butir telur
    // Target 25 porsi -> skala = 25 / 4 = 6.25
    // Telur: 2 * 6.25 = 12.5 butir -> Math.ceil = 13 butir
    const result = scalePmtIngredients(schotelRecipe, 25);
    const eggItem = result.scaledIngredients.find(i => i.ingredientName.includes('Telur'));

    expect(eggItem).toBeDefined();
    expect(eggItem?.unitItemCount).toBe(13);
    expect(eggItem?.householdDisplay).toContain('13');
  });

  it('menghitung metrik dampak SDGs berdasarkan porsi umbi tersalurkan', () => {
    // 52 porsi tersalurkan
    const impact = calculateSdgImpact(52);
    // Substitusi beras: 52 * 50g = 2600g = 2.6 kg
    expect(impact.substitutedRiceKg).toBe(2.6);

    // Penghematan air minimum: 2.6 * 2291 = 5957 L
    expect(impact.minWaterSavedLiters).toBe(5957);

    // Rata-rata: 2.6 * 2855 = 7423 L
    expect(impact.avgWaterSavedLiters).toBe(7423);
  });
});
