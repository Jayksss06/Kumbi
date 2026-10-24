import React, { useState } from 'react';
import { 
  Recipe, 
  RecipeIngredient, 
  RecipeStep, 
  TuberSlug, 
  AgeCategory, 
  CookingMethod,
  IngredientCategory 
} from '../../types';
import { validateRecipeNutritionAndSafety } from '../../lib/nutrition-engine';
import { saveRecipe } from '../../lib/storage-sync';
import { TUBERS_DATA, PROTEIN_PAIRINGS_DATA } from '../../data/scientific-seed-data';
import { 
  ChefHat, 
  Plus, 
  Trash2, 
  ShieldAlert, 
  AlertCircle, 
  CheckCircle2, 
  Save, 
  Sparkles,
  ArrowLeft 
} from 'lucide-react';

interface KaderRecipeBuilderProps {
  onBack: () => void;
  onSuccess: (savedRecipe: Recipe) => void;
  posyanduId?: string;
  authorId?: string;
}

export const KaderRecipeBuilder: React.FC<KaderRecipeBuilderProps> = ({
  onBack,
  onSuccess,
  posyanduId = 'pos-01',
  authorId = 'usr-kader-01'
}) => {
  const [title, setTitle] = useState<string>('');
  const [shortDescription, setShortDescription] = useState<string>('');
  const [tuberSlug, setTuberSlug] = useState<TuberSlug>('ubi-jalar');
  const [usesMocaf, setUsesMocaf] = useState<boolean>(false);
  const [ageCategory, setAgeCategory] = useState<AgeCategory>('BALITA_2_5');
  const [cookingMethod, setCookingMethod] = useState<CookingMethod>('KUKUS');
  const [prepTimeMinutes, setPrepTimeMinutes] = useState<number>(20);
  const [cookTimeMinutes, setCookTimeMinutes] = useState<number>(20);
  const [basePortions, setBasePortions] = useState<number>(4);

  // Ingredients state
  const [ingredients, setIngredients] = useState<Partial<RecipeIngredient>[]>([
    {
      id: 'ing-custom-1',
      ingredientName: 'Ubi Jalar Oranye Kukus',
      category: 'KARBO_UMBI',
      weightGrams: 200,
      householdQty: 2,
      householdUnit: 'buah sedang',
      estimatedPriceIdr: 3000,
      preparationNote: 'kukus lalu lumatkan',
      sortOrder: 1
    },
    {
      id: 'ing-custom-2',
      ingredientName: 'Fillet Ikan Kembung Segar',
      category: 'PROTEIN_HEWANI',
      weightGrams: 80,
      householdQty: 2,
      householdUnit: 'potong fillet',
      estimatedPriceIdr: 5000,
      preparationNote: 'pastikan bebas duri kukus suwir',
      sortOrder: 2
    }
  ]);

  // Steps state
  const [steps, setSteps] = useState<RecipeStep[]>([
    {
      stepNumber: 1,
      instruction: 'Bersihkan dan siapkan seluruh bahan dengan higienis.',
      durationMinutes: 5,
      isCriticalSafetyStep: false
    },
    {
      stepNumber: 2,
      instruction: 'Kukus bahan hingga matang sempurna, lalu lumatkan sesuai tekstur usia anak.',
      durationMinutes: 15,
      isCriticalSafetyStep: false
    }
  ]);

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);

  // Add Ingredient
  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        id: `ing-custom-${Date.now()}`,
        ingredientName: '',
        category: 'PROTEIN_HEWANI',
        weightGrams: 50,
        householdQty: 1,
        householdUnit: 'potong sedang',
        estimatedPriceIdr: 2500,
        preparationNote: '',
        sortOrder: ingredients.length + 1
      }
    ]);
  };

  // Remove Ingredient
  const handleRemoveIngredient = (id?: string) => {
    if (ingredients.length <= 1) return;
    setIngredients(ingredients.filter(i => i.id !== id));
  };

  // Add Step
  const handleAddStep = () => {
    setSteps([
      ...steps,
      {
        stepNumber: steps.length + 1,
        instruction: '',
        durationMinutes: 5,
        isCriticalSafetyStep: false
      }
    ]);
  };

  // Remove Step
  const handleRemoveStep = (stepNumber: number) => {
    if (steps.length <= 1) return;
    const filtered = steps.filter(s => s.stepNumber !== stepNumber);
    // Renumber
    setSteps(filtered.map((s, idx) => ({ ...s, stepNumber: idx + 1 })));
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validasi Server/Pure Engine
    const validation = validateRecipeNutritionAndSafety(
      { ageCategory, tuberSlug, usesMocaf, steps },
      ingredients
    );

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setValidationWarnings(validation.warnings);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Auto-inject safety steps if needed
    let finalSteps = [...steps];
    if (validation.injectedSafetySteps.length > 0) {
      const injected: RecipeStep[] = validation.injectedSafetySteps.map((ins, i) => ({
        stepNumber: 0,
        instruction: ins,
        durationMinutes: 15,
        isCriticalSafetyStep: true
      }));
      finalSteps = [...injected, ...finalSteps].map((s, i) => ({ ...s, stepNumber: i + 1 }));
    }

    // Generate unique recipe code e.g. UMBI-KDR-XX
    const randomCode = `KDR-${Math.floor(100 + Math.random() * 900)}`;

    // Calculate approximate nutrition per portion
    const totalWeight = ingredients.reduce((acc, i) => acc + (i.weightGrams || 0), 0);
    const caloriesPerPortion = Math.round((totalWeight * 1.5) / basePortions);
    const proteinPerPortion = Number(((totalWeight * 0.08) / basePortions).toFixed(1));
    const carbsPerPortion = Number(((totalWeight * 0.22) / basePortions).toFixed(1));

    const newRecipe: Recipe = {
      id: `rec-custom-${Date.now()}`,
      recipeCode: randomCode,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: title.trim(),
      shortDescription: shortDescription.trim() || `Kreasi olahan umbi lokal bergizi seimbang dari Posyandu mitra.`,
      tuberId: tuberSlug === 'singkong' ? 'tub-01' : tuberSlug === 'ubi-jalar' ? 'tub-02' : 'tub-03',
      tuberSlug,
      usesMocaf,
      ageCategory,
      cookingMethod,
      prepTimeMinutes,
      cookTimeMinutes,
      basePortions,
      caloriesPerPortion,
      carbsGPerPortion: carbsPerPortion,
      proteinGPerPortion: proteinPerPortion,
      fatGPerPortion: 4.5,
      fiberGPerPortion: 2.2,
      micronutrientHighlights: 'Kaya Mikronutrisi Alami Umbi + Asam Amino Protein',
      textureGuideByAge: 'Disesuaikan dengan usia anak target.',
      safetyWarningBanner: tuberSlug === 'talas' 
        ? 'Wajib Kupas Kering & Rendam Air Garam Hangat 15-20 Menit' 
        : tuberSlug === 'singkong'
        ? 'Pilih Kulit Ari Merah Muda & Rendam Air Bersih'
        : 'Kukus Empuk Hindari Penggorengan Minyak Banyak',
      steps: finalSteps,
      ingredients: ingredients as RecipeIngredient[],
      status: 'PENDING_REVIEW', // Sesuai state machine: diajukan untuk dimoderasi
      authorId,
      posyanduId,
      avgLahapRating: 5.0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveRecipe(newRecipe);
    onSuccess(newRecipe);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-brand-border">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-stone-700 bg-brand-cream hover:bg-brand-subtle rounded-xl border border-brand-border"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard Kader</span>
        </button>

        <span className="text-xs font-bold text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          Form Tambah Resep Kreasi Posyandu (No-Code)
        </span>
      </div>

      {/* Validation Error Banner (Golden Rule Protection) */}
      {validationErrors.length > 0 && (
        <div className="p-5 bg-rose-50 border-2 border-rose-400 rounded-3xl text-xs text-rose-950 space-y-2">
          <strong className="text-sm font-black flex items-center gap-2 text-rose-800">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            Aturan Emas Gizi Anak Belum Terpenuhi:
          </strong>
          {validationErrors.map((err, idx) => (
            <p key={idx} className="leading-relaxed font-semibold">{err}</p>
          ))}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-8">
        
        {/* Identitas Resep */}
        <div className="space-y-4">
          <h3 className="text-base font-black text-stone-900 border-b border-brand-border pb-2">
            1. Identitas & Sasaran Menu
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-stone-600 block mb-1">Judul Resep Kreasi Posyandu</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Contoh: Perkedel Ubi Jalar Fillet Ikan Kembung"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-sm font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">Bahan Umbi Utama</label>
              <select
                value={tuberSlug}
                onChange={e => setTuberSlug(e.target.value as TuberSlug)}
                className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs font-semibold bg-white"
              >
                <option value="ubi-jalar">Ubi Jalar Oranye / Ungu (IG 44)</option>
                <option value="talas">Talas Bogor (Tinggi Kalium 536mg)</option>
                <option value="singkong">Singkong Manis Segar (162 kkal)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">Sasaran Kelompok Usia Balita</label>
              <select
                value={ageCategory}
                onChange={e => setAgeCategory(e.target.value as AgeCategory)}
                className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs font-semibold bg-white"
              >
                <option value="MPASI_6_8">MPASI 6-8 Bulan (Puree Halus)</option>
                <option value="MPASI_9_11">MPASI 9-11 Bulan (Tekstur Tim)</option>
                <option value="MPASI_12_23">MPASI 12-23 Bulan (Makanan Lunak)</option>
                <option value="BALITA_2_5">Balita 2-5 Tahun (Finger Food & Keluarga)</option>
                <option value="PMT_KUDAPAN">Kudapan Sehat PMT Posyandu</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">Metode Pengolahan</label>
              <select
                value={cookingMethod}
                onChange={e => setCookingMethod(e.target.value as CookingMethod)}
                className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs font-semibold bg-white"
              >
                <option value="KUKUS">Kukus (Rekomendasi Utama)</option>
                <option value="REBUS">Rebus</option>
                <option value="PANGGANG">Panggang Teflon Minim Minyak</option>
                <option value="TUMIS_MINIM_MINYAK">Tumis Minim Minyak</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">Porsi Dasar Resep</label>
              <input
                type="number"
                min="1"
                max="10"
                value={basePortions}
                onChange={e => setBasePortions(parseInt(e.target.value) || 2)}
                className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {/* Bahan-Bahan & Validasi Protein Wajib */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border pb-2">
            <div>
              <h3 className="text-base font-black text-stone-900">
                2. Daftar Bahan Masak (Wajib Ada Protein!)
              </h3>
              <p className="text-xs text-stone-500">
                Resep wajib memuat minimal 1 sumber Protein Hewani / Nabati.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddIngredient}
              className="px-3 py-1.5 bg-brand-green/10 text-brand-green rounded-xl text-xs font-bold hover:bg-brand-green hover:text-white transition-all flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Bahan</span>
            </button>
          </div>

          <div className="space-y-3">
            {ingredients.map((ing, idx) => (
              <div key={ing.id || idx} className="p-4 bg-brand-cream rounded-2xl border border-brand-border grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                
                <div className="sm:col-span-4">
                  <label className="text-[10px] font-bold text-stone-500 block mb-0.5">Nama Bahan</label>
                  <input
                    type="text"
                    required
                    value={ing.ingredientName}
                    onChange={e => {
                      const updated = [...ingredients];
                      updated[idx].ingredientName = e.target.value;
                      setIngredients(updated);
                    }}
                    placeholder="Contoh: Ikan Kembung Fillet"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-brand-border bg-white"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="text-[10px] font-bold text-stone-500 block mb-0.5">Kategori Gizi</label>
                  <select
                    value={ing.category}
                    onChange={e => {
                      const updated = [...ingredients];
                      updated[idx].category = e.target.value as IngredientCategory;
                      setIngredients(updated);
                    }}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-brand-border bg-white font-bold text-brand-green"
                  >
                    <option value="KARBO_UMBI">Karbo Umbi</option>
                    <option value="PROTEIN_HEWANI">Protein Hewani (Wajib)</option>
                    <option value="PROTEIN_NABATI">Protein Nabati</option>
                    <option value="LEMAK_TAMBAHAN">Lemak Tambahan</option>
                    <option value="SAYUR_BUMBU">Sayur / Bumbu</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold text-stone-500 block mb-0.5">Berat (Gram)</label>
                  <input
                    type="number"
                    min="1"
                    value={ing.weightGrams}
                    onChange={e => {
                      const updated = [...ingredients];
                      updated[idx].weightGrams = parseFloat(e.target.value) || 0;
                      setIngredients(updated);
                    }}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-brand-border bg-white font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold text-stone-500 block mb-0.5">Satuan URT</label>
                  <input
                    type="text"
                    value={ing.householdUnit}
                    onChange={e => {
                      const updated = [...ingredients];
                      updated[idx].householdUnit = e.target.value;
                      setIngredients(updated);
                    }}
                    placeholder="potong / butir"
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-brand-border bg-white"
                  />
                </div>

                <div className="sm:col-span-1 text-right">
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(ing.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Langkah Masak */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border pb-2">
            <div>
              <h3 className="text-base font-black text-stone-900">
                3. Instruksi Langkah Masak
              </h3>
              <p className="text-xs text-stone-500">
                Langkah pengamanan oksalat talas/sianida singkong akan disisipkan otomatis jika belum tercantum.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddStep}
              className="px-3 py-1.5 bg-brand-orange/10 text-brand-orange rounded-xl text-xs font-bold hover:bg-brand-orange hover:text-white transition-all flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Langkah</span>
            </button>
          </div>

          <div className="space-y-3">
            {steps.map((st, idx) => (
              <div key={st.stepNumber} className="flex items-start gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="w-6 h-6 rounded-full bg-stone-800 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-1">
                  {st.stepNumber}
                </span>

                <div className="flex-1 space-y-1">
                  <textarea
                    rows={2}
                    required
                    value={st.instruction}
                    onChange={e => {
                      const updated = [...steps];
                      updated[idx].instruction = e.target.value;
                      setSteps(updated);
                    }}
                    placeholder={`Tuliskan instruksi langkah ke-${st.stepNumber}...`}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-brand-border bg-white focus:outline-none"
                  />
                  
                  <label className="inline-flex items-center gap-1.5 text-xs text-amber-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={st.isCriticalSafetyStep}
                      onChange={e => {
                        const updated = [...steps];
                        updated[idx].isCriticalSafetyStep = e.target.checked;
                        setSteps(updated);
                      }}
                      className="rounded text-brand-orange"
                    />
                    <span className="font-semibold text-[11px]">Tandai sebagai Langkah Keamanan Kritis (Anti-Oksalat/Sianida)</span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveStep(st.stepNumber)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors mt-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-brand-border flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100"
          >
            Batal
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-brand-green hover:bg-emerald-800 text-white rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Ajukan Resep untuk Publikasi (Pending Review)</span>
          </button>
        </div>

      </form>

    </div>
  );
};
