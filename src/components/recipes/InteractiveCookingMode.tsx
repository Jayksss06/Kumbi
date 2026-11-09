import React, { useState } from 'react';
import { Recipe } from '../../types';
import { buildMotherRecipeShareUrl } from '../../lib/whatsapp-builder';
import { getTuberImage } from '../../lib/tuber-assets';
import { sound } from '../../lib/sound-effects';
import { 
  ArrowLeft, 
  Clock, 
  ShieldCheck, 
  CheckSquare, 
  Square, 
  Share2, 
  Printer, 
  ChefHat, 
  Info,
  CheckCircle2
} from 'lucide-react';

interface InteractiveCookingModeProps {
  recipe: Recipe;
  onBack: () => void;
  onOpenPrint: (recipe: Recipe, portions: number) => void;
}

export const InteractiveCookingMode: React.FC<InteractiveCookingModeProps> = ({
  recipe,
  onBack,
  onOpenPrint
}) => {
  const [portions, setPortions] = useState<number>(recipe.basePortions || 2);
  const scale = portions / (recipe.basePortions || 2);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);

  const toggleIngredient = (id: string) => {
    sound.playClick();
    if (checkedIngredients.includes(id)) {
      setCheckedIngredients(checkedIngredients.filter(i => i !== id));
    } else {
      setCheckedIngredients([...checkedIngredients, id]);
    }
  };

  const handleShareWa = () => {
    sound.playClick();
    const url = buildMotherRecipeShareUrl(recipe, portions);
    window.open(url, '_blank');
  };

  const getAgeLabel = (cat: string) => {
    switch (cat) {
      case 'MPASI_6_8': return 'Bayi 6–8 Bulan (Bubur Halus)';
      case 'MPASI_9_11': return 'Bayi 9–11 Bulan (Bubur Tim)';
      case 'MPASI_12_23': return 'Anak 1–2 Tahun';
      case 'BALITA_2_5': return 'Anak 2–5 Tahun';
      case 'PMT_KUDAPAN': return 'Camilan Sehat Balita';
      default: return 'Semua Balita';
    }
  };

  const getTuberName = (slug: string) => {
    switch (slug) {
      case 'ubi-jalar': return 'Ubi Jalar';
      case 'singkong': return recipe.usesMocaf ? 'Singkong (Tepung Mocaf)' : 'Singkong';
      case 'talas': return 'Talas';
      default: return 'Umbi Lokal';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-fade-in">
      
      {/* 1. Tombol Kembali & Bagikan */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-brand-border shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-stone-800 bg-brand-cream hover:bg-brand-subtle rounded-2xl border border-brand-border btn-press"
        >
          <ArrowLeft className="w-4 h-4 text-brand-green" />
          <span>Kembali ke Daftar Resep</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareWa}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm btn-press"
          >
            <Share2 className="w-4 h-4" />
            <span>Simpan / Kirim ke WA</span>
          </button>

          <button
            onClick={() => onOpenPrint(recipe, portions)}
            className="flex items-center gap-2 px-4 py-2.5 bg-stone-800 hover:bg-stone-900 text-white rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm btn-press"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Cetak Resep</span>
          </button>
        </div>
      </div>

      {/* 2. Judul & Info Utama Resep */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full">
                Bahan Utama: {getTuberName(recipe.tuberSlug)}
              </span>
              <span className="bg-orange-100 text-brand-orange text-xs font-bold px-3 py-1 rounded-full">
                {getAgeLabel(recipe.ageCategory)}
              </span>
              <span className="bg-stone-100 text-stone-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-orange" />
                <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} Menit ({recipe.cookingMethod})</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-tight">
              {recipe.title}
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              {recipe.shortDescription}
            </p>
          </div>

          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-brand-cream p-2 shrink-0 border-2 border-brand-border self-center md:self-auto flex items-center justify-center">
            <img
              src={getTuberImage(recipe.tuberSlug)}
              alt={recipe.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Kandungan Gizi per Porsi */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-brand-cream/80 p-4 rounded-2xl border border-brand-border text-center">
          <div>
            <span className="text-xs text-stone-500 font-semibold block">Energi per Porsi</span>
            <span className="text-lg sm:text-xl font-black text-brand-green">{recipe.caloriesPerPortion} kkal</span>
          </div>
          <div>
            <span className="text-xs text-stone-500 font-semibold block">Protein Hewani/Lauk</span>
            <span className="text-lg sm:text-xl font-black text-brand-orange">{recipe.proteinGPerPortion} gram</span>
          </div>
          <div>
            <span className="text-xs text-stone-500 font-semibold block">Karbohidrat</span>
            <span className="text-lg sm:text-xl font-black text-stone-800">{recipe.carbsGPerPortion} gram</span>
          </div>
          <div>
            <span className="text-xs text-stone-500 font-semibold block">Serat Alami</span>
            <span className="text-lg sm:text-xl font-black text-emerald-700">{recipe.fiberGPerPortion} gram</span>
          </div>
        </div>

        {/* Tips Aman Pengolahan */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-300 text-xs sm:text-sm text-amber-950">
          <ShieldCheck className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
          <div>
            <strong className="block text-amber-900 mb-0.5">Tips Penting Sebelum Memasak:</strong>
            <span className="leading-relaxed">{recipe.safetyWarningBanner}</span>
          </div>
        </div>
      </div>

      {/* 3. Bahan-Bahan & Pengatur Porsi */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-4">
          <div>
            <h2 className="text-xl font-black text-stone-900">
              Bahan-Bahan yang Disiapkan
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Bunda bisa menekan tanda <strong>(-)</strong> atau <strong>(+)</strong> untuk menyesuaikan jumlah porsi yang ingin dimasak:
            </p>
          </div>

          {/* Tombol Pengatur Porsi Sederhana */}
          <div className="flex items-center gap-2 bg-brand-cream p-1.5 rounded-2xl border border-brand-border self-start sm:self-auto">
            <button
              type="button"
              onClick={() => { sound.playClick(); setPortions(Math.max(1, portions - 1)); }}
              className="w-10 h-10 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-black text-lg flex items-center justify-center border border-stone-200 btn-press"
              aria-label="Kurangi porsi"
            >
              -
            </button>
            <span className="px-3 text-center font-black text-base text-brand-green">
              {portions} Porsi
            </span>
            <button
              type="button"
              onClick={() => { sound.playClick(); setPortions(Math.min(30, portions + 1)); }}
              className="w-10 h-10 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-black text-lg flex items-center justify-center border border-stone-200 btn-press"
              aria-label="Tambah porsi"
            >
              +
            </button>
          </div>
        </div>

        <div className="divide-y divide-brand-border/60">
          {recipe.ingredients.map(ing => {
            const isChecked = checkedIngredients.includes(ing.id);
            const scaledGrams = Math.round(ing.weightGrams * scale);
            const scaledQty = Number((ing.householdQty * scale).toFixed(1));

            return (
              <div
                key={ing.id}
                onClick={() => toggleIngredient(ing.id)}
                className={`py-3.5 px-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  isChecked ? 'bg-emerald-50/60 text-stone-400' : 'hover:bg-brand-cream/50 text-stone-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Square className="w-5 h-5 text-stone-400" />
                    )}
                  </div>
                  <div>
                    <span className={`text-sm sm:text-base font-bold block ${isChecked ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                      {ing.ingredientName}
                    </span>
                    {ing.preparationNote && (
                      <span className="block text-xs text-stone-500">
                        ({ing.preparationNote})
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-sm sm:text-base font-black block ${isChecked ? 'text-stone-400' : 'text-brand-orange'}`}>
                    {scaledQty} {ing.householdUnit}
                  </span>
                  <span className="text-xs text-stone-500 font-semibold">
                    ({scaledGrams >= 1000 ? `${(scaledGrams / 1000).toFixed(1).replace('.', ',')} kg` : `${scaledGrams} gram`})
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Cara Memasak Langkah demi Langkah */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-5">
        <div className="border-b border-brand-border pb-3">
          <h2 className="text-xl font-black text-stone-900 flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-brand-orange" />
            <span>Cara Memasak</span>
          </h2>
        </div>

        <div className="space-y-4">
          {recipe.steps.map(step => (
            <div
              key={step.stepNumber}
              className={`p-4 sm:p-5 rounded-2xl border ${
                step.isCriticalSafetyStep
                  ? 'bg-amber-50/70 border-amber-300'
                  : 'bg-brand-cream/50 border-brand-border'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <span className={`w-7 h-7 rounded-full font-black text-xs flex items-center justify-center text-white shrink-0 mt-0.5 ${
                  step.isCriticalSafetyStep ? 'bg-brand-orange' : 'bg-brand-green'
                }`}>
                  {step.stepNumber}
                </span>

                <div className="space-y-1">
                  {step.isCriticalSafetyStep && (
                    <span className="inline-block text-[11px] font-extrabold text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-md mb-1">
                      Langkah Penting Agar Aman & Tidak Gatal
                    </span>
                  )}
                  <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-medium">
                    {step.instruction}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Panduan Tekstur Sesuai Usia Anak */}
      <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-200 space-y-2">
        <h3 className="text-base font-black text-emerald-950 flex items-center gap-2">
          <Info className="w-5 h-5 text-brand-green shrink-0" />
          <span>Cara Menyajikan Sesuai Usia Si Kecil:</span>
        </h3>
        <p className="text-sm text-stone-700 leading-relaxed">
          {recipe.textureGuideByAge}
        </p>
      </div>

    </div>
  );
};
