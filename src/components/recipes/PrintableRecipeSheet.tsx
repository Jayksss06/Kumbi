import React, { useEffect, useState } from 'react';
import { Recipe } from '../../types';
import { generateQrCodeSvg } from '../../lib/qr-generator';
import { Printer, X, ShieldAlert, UtensilsCrossed } from 'lucide-react';

interface PrintableRecipeSheetProps {
  recipe: Recipe;
  portions: number;
  onClose: () => void;
}

export const PrintableRecipeSheet: React.FC<PrintableRecipeSheetProps> = ({
  recipe,
  portions,
  onClose
}) => {
  const [qrSvg, setQrSvg] = useState<string>('');
  const scale = portions / (recipe.basePortions || 2);

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://umbicare.id';
    const targetUrl = `${origin}/#resep-${recipe.slug}`;
    generateQrCodeSvg(targetUrl).then(svg => setQrSvg(svg));
  }, [recipe.slug]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      
      {/* Outer Modal Container */}
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 my-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        
        {/* Modal Controls (Not printed) */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6 no-print">
          <div>
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider block">
              Pratinjau Kartu Resep 1 Halaman A4
            </span>
            <p className="text-xs text-stone-500">Siap dicetak di printer warna maupun fotokopi hitam-putih kelurahan</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-brand-green hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Sekarang (Print)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE CARD CONTENT (Target of @media print) */}
        <div className="print-card border-2 border-stone-800 rounded-2xl p-6 bg-white text-stone-900 space-y-4">
          
          {/* Header Card: Brand, Title, and QR Code */}
          <div className="flex items-start justify-between gap-4 border-b-2 border-stone-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-md bg-stone-900 text-white flex items-center justify-center">
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-black tracking-tight text-stone-900">
                  Kumbi — Dapur Umbi Posyandu
                </span>
                <span className="text-[10px] font-bold border border-stone-400 px-2 py-0.5 rounded">
                  Pangan Lokal Balita
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-snug">
                {recipe.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs font-bold">
                <span className="bg-stone-100 px-2 py-0.5 rounded border border-stone-300">
                  Umbi: {recipe.tuberSlug.toUpperCase()}
                </span>
                <span className="bg-stone-100 px-2 py-0.5 rounded border border-stone-300">
                  Usia: {recipe.ageCategory.replace('_', ' ')}
                </span>
                <span className="bg-stone-100 px-2 py-0.5 rounded border border-stone-300">
                  Porsi: {portions} Porsi
                </span>
                <span className="bg-stone-100 px-2 py-0.5 rounded border border-stone-300">
                  Waktu: {recipe.prepTimeMinutes + recipe.cookTimeMinutes} Menit ({recipe.cookingMethod})
                </span>
              </div>
            </div>

            {/* QR Code SVG */}
            <div className="shrink-0 flex flex-col items-center">
              <div 
                className="w-24 h-24 border-2 border-stone-800 rounded-xl p-1 bg-white flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <span className="text-[10px] font-mono font-bold mt-1 text-stone-700">
                {recipe.recipeCode}
              </span>
              <span className="text-[8px] text-stone-500 uppercase tracking-tighter">
                Scan untuk Resep
              </span>
            </div>
          </div>

          {/* Nutrition Summary Bar */}
          <div className="grid grid-cols-4 gap-2 border border-stone-300 rounded-xl p-2.5 bg-stone-50 text-center text-xs">
            <div>
              <span className="text-[10px] text-stone-500 block">Kalori / Porsi</span>
              <span className="font-black text-stone-900">{recipe.caloriesPerPortion} kkal</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block">Protein Lengkap</span>
              <span className="font-black text-stone-900">{recipe.proteinGPerPortion} g</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block">Karbohidrat</span>
              <span className="font-black text-stone-900">{recipe.carbsGPerPortion} g</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block">Serat Alami</span>
              <span className="font-black text-stone-900">{recipe.fiberGPerPortion} g</span>
            </div>
          </div>

          {/* Food Safety Alert Box */}
          <div className="border border-stone-800 p-2.5 rounded-xl bg-stone-100 text-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-stone-900">Perhatian Keamanan Pengolahan Umbi:</strong>
              <span className="text-stone-800">{recipe.safetyWarningBanner}</span>
            </div>
          </div>

          {/* Ingredients and Instructions Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
            
            {/* Ingredients (5 cols) */}
            <div className="md:col-span-5 space-y-2 border-r-0 md:border-r border-stone-300 md:pr-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-900 border-b border-stone-400 pb-1">
                Daftar Bahan ({portions} Porsi):
              </h3>
              <ul className="space-y-1.5 text-xs">
                {recipe.ingredients.map(ing => {
                  const scaledGrams = Math.round(ing.weightGrams * scale);
                  const scaledQty = Number((ing.householdQty * scale).toFixed(1));
                  return (
                    <li key={ing.id} className="flex justify-between items-baseline gap-2">
                      <span className="text-stone-800">
                        • {ing.ingredientName}
                        {ing.preparationNote && <span className="text-[10px] text-stone-500 block italic pl-2">{ing.preparationNote}</span>}
                      </span>
                      <span className="font-bold text-stone-900 shrink-0 text-right">
                        {scaledGrams >= 1000 ? `${(scaledGrams/1000).toFixed(2)} kg` : `${scaledGrams}g`} ({scaledQty} {ing.householdUnit})
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Steps (7 cols) */}
            <div className="md:col-span-7 space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-900 border-b border-stone-400 pb-1">
                Langkah Pembuatan:
              </h3>
              <ol className="space-y-2 text-xs">
                {recipe.steps.map(step => (
                  <li key={step.stepNumber} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-stone-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {step.stepNumber}
                    </span>
                    <span className={`text-stone-800 ${step.isCriticalSafetyStep ? 'font-bold' : ''}`}>
                      {step.instruction}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

          </div>

          {/* Footer Card */}
          <div className="pt-3 border-t border-stone-300 flex items-center justify-between text-[10px] text-stone-500">
            <span>Diterbitkan oleh Dapur Umbi Posyandu Anak • Kemitraan Mahasiswa & Kader Posyandu</span>
            <span>Akses cepat kode: <strong>{recipe.recipeCode}</strong></span>
          </div>

        </div>

      </div>

    </div>
  );
};
