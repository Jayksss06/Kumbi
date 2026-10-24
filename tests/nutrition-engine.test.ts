import { describe, it, expect } from 'vitest';
import { 
  calculateRiceToTuberEquivalence, 
  validateRecipeNutritionAndSafety,
  calculateBalancedPlate
} from '../src/lib/nutrition-engine';
import { Recipe, RecipeIngredient } from '../src/types';

describe('Nutrition Engine Tests', () => {
  it('menghitung konversi 2 centong nasi anak (100g = 130 kkal) ke umbi secara akurat', () => {
    // 2 centong nasi anak = 100g nasi matang (130 kkal)
    const result = calculateRiceToTuberEquivalence(2);

    expect(result.toddlerCentongCount).toBe(2);
    expect(result.cookedRiceGrams).toBe(100);
    expect(result.targetEnergyKcal).toBe(130);

    // Singkong (162.5 kkal/100g) -> (130 / 162.5) * 100 = 80g
    expect(result.singkongGrams).toBe(80);

    // Ubi Jalar (86 kkal/100g) -> (130 / 86) * 100 = 151.16 -> 151g
    expect(result.ubiJalarGrams).toBe(151);

    // Talas (145 kkal/100g) -> (130 / 145) * 100 = 89.65 -> 90g
    expect(result.talasGrams).toBe(90);

    expect(result.proteinRecommendation).toContain('WAJIB');
  });

  it('menangani input edge case 0, negatif, atau angka ekstrem', () => {
    const zeroResult = calculateRiceToTuberEquivalence(0);
    // Dijaga minimal 0.5 centong
    expect(zeroResult.toddlerCentongCount).toBe(0.5);

    const highResult = calculateRiceToTuberEquivalence(100);
    // Dibatasi maksimal 10 centong
    expect(highResult.toddlerCentongCount).toBe(10);
  });

  it('memvalidasi resep MPASI/balita wajib memiliki bahan protein', () => {
    const invalidRecipe: Partial<Recipe> = {
      title: 'Kolak Singkong Manis',
      ageCategory: 'MPASI_9_11',
      tuberSlug: 'singkong'
    };

    const ingredientsWithoutProtein: Partial<RecipeIngredient>[] = [
      { ingredientName: 'Singkong', category: 'KARBO_UMBI', weightGrams: 100 },
      { ingredientName: 'Gula Aren', category: 'SAYUR_BUMBU', weightGrams: 20 }
    ];

    const validation = validateRecipeNutritionAndSafety(invalidRecipe, ingredientsWithoutProtein);
    expect(validation.isValid).toBe(false);
    expect(validation.errors[0]).toContain('wajib menyertakan minimal 1 bahan sumber Protein');
  });

  it('menginjeksi protokol keamanan anti-gatal oksalat jika resep berbahan talas belum mencantumkannya', () => {
    const talasRecipe: Partial<Recipe> = {
      title: 'Kukus Talas Polos',
      ageCategory: 'BALITA_2_5',
      tuberSlug: 'talas',
      steps: [
        { stepNumber: 1, instruction: 'Kukus talas hingga empuk', isCriticalSafetyStep: false }
      ]
    };

    const ingredients: Partial<RecipeIngredient>[] = [
      { ingredientName: 'Talas Bogor', category: 'KARBO_UMBI', weightGrams: 150 },
      { ingredientName: 'Telur Ayam', category: 'PROTEIN_HEWANI', weightGrams: 50 }
    ];

    const validation = validateRecipeNutritionAndSafety(talasRecipe, ingredients);
    expect(validation.warnings.length).toBeGreaterThan(0);
    expect(validation.injectedSafetySteps[0]).toContain('ANTI-OKSALAT');
    expect(validation.injectedSafetySteps[0]).toContain('air hangat bergaram selama 15-20 menit');
  });

  it('menghitung simulasi piring seimbang anak dengan benar', () => {
    const plate = calculateBalancedPlate('MPASI_9_11', 'talas', 'prot-01');
    expect(plate.totalCaloriesKcal).toBeGreaterThan(100);
    expect(plate.totalProteinG).toBeGreaterThan(5);
    expect(plate.textureGuide).toContain('9-11 Bulan');
    expect(plate.plateComposition.tuberPct).toBeGreaterThan(0);
    expect(plate.plateComposition.proteinPct).toBeGreaterThan(0);
  });
});
