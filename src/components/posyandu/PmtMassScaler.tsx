import React, { useState } from 'react';
import { Recipe, PmtScalingResult } from '../../types';
import { scalePmtIngredients } from '../../lib/pmt-scaling-engine';
import { RECIPES_DATA } from '../../data/scientific-seed-data';
import { 
  Calculator, 
  ShoppingCart, 
  Printer, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface PmtMassScalerProps {
  initialRecipe?: Recipe;
  onPrintShoppingList?: (scalingResult: PmtScalingResult) => void;
}

export const PmtMassScaler: React.FC<PmtMassScalerProps> = ({
  initialRecipe,
  onPrintShoppingList
}) => {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(
    initialRecipe ? initialRecipe.id : RECIPES_DATA[3].id // Default: Bola-Bola Ubi Ungu Ayam Tempe
  );
  const [targetPortions, setTargetPortions] = useState<number>(50); // Default Posyandu target: 50 balita

  const currentRecipe = RECIPES_DATA.find(r => r.id === selectedRecipeId) || RECIPES_DATA[3];
  const scalingResult: PmtScalingResult = scalePmtIngredients(currentRecipe, targetPortions);

  const presets = [4, 25, 50, 75, 100];

  const handlePrint = () => {
    if (onPrintShoppingList) {
      onPrintShoppingList(scalingResult);
    } else {
      window.print();
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-xs font-bold mb-2">
          <Calculator className="w-3.5 h-3.5" />
          Alat Bantu Kerja Bulanan Kader Posyandu
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
          Kalkulator Belanja & Takaran Masak PMT Massal (20 – 100+ Porsi)
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Hitung otomatis kebutuhan belanja bahan mentah pasar, toleransi kupas kulit umbi (+18%), pembulatan butir telur, serta estimasi anggaran dana PMT.
        </p>
      </div>

      {/* Control Panel: Select Recipe & Portion Presets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-brand-cream p-5 sm:p-6 rounded-2xl border border-brand-border">
        
        {/* Recipe Selector */}
        <div>
          <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
            Pilih Resep Menu PMT Posyandu:
          </label>
          <div className="relative">
            <select
              value={selectedRecipeId}
              onChange={e => setSelectedRecipeId(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-brand-border rounded-xl font-bold text-xs sm:text-sm text-stone-800 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-green shadow-sm min-h-[48px]"
            >
              {RECIPES_DATA.map(r => (
                <option key={r.id} value={r.id}>
                  [{r.recipeCode}] {r.title} ({r.tuberSlug.toUpperCase()})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-4 pointer-events-none" />
          </div>
          <span className="text-[11px] text-stone-500 block mt-1">
            Resep dasar dihitung dari <strong>{currentRecipe.basePortions} porsi</strong>
          </span>
        </div>

        {/* Target Portions Input & Presets */}
        <div>
          <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
            Target Jumlah Porsi Balita:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="500"
              value={targetPortions}
              onChange={e => setTargetPortions(parseInt(e.target.value) || 1)}
              className="w-28 px-3 py-2.5 bg-white border border-brand-border rounded-xl font-black text-xl text-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[48px]"
            />
            <div className="flex flex-wrap gap-1">
              {presets.map(p => (
                <button
                  key={p}
                  onClick={() => setTargetPortions(p)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                    targetPortions === p
                      ? 'bg-brand-orange text-white shadow-sm'
                      : 'bg-white text-stone-700 border border-brand-border hover:bg-stone-50'
                  }`}
                >
                  {p} Porsi
                </button>
              ))}
            </div>
          </div>
          <span className="text-[11px] text-stone-500 block mt-1">
            Faktor Skala Pengali: <strong>{scalingResult.scaleFactor}x</strong> lipat resep dasar
          </span>
        </div>

      </div>

      {/* Estimated Total Budget Summary Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white p-5 sm:p-6 rounded-2xl border-2 border-emerald-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
            Estimasi Total Anggaran Belanja Pasar ({targetPortions} Porsi):
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-900">
              Rp {scalingResult.totalEstimatedCostIdr.toLocaleString('id-ID')}
            </span>
            <span className="text-xs font-semibold text-stone-600">
              (~Rp {Math.round(scalingResult.totalEstimatedCostIdr / targetPortions).toLocaleString('id-ID')} / porsi anak)
            </span>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 min-h-[48px]"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Daftar Belanja Pasar</span>
        </button>
      </div>

      {/* Safety Warning for Tuber Mass Preparation */}
      {scalingResult.tuberPreparationWarning && (
        <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-300 text-xs text-amber-950 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
          <div>
            <strong className="block text-sm text-amber-900 mb-0.5">
              Protokol Dapur Meja 4 / PMT Massal:
            </strong>
            <p className="leading-relaxed">{scalingResult.tuberPreparationWarning}</p>
          </div>
        </div>
      )}

      {/* Detailed Shopping Table */}
      <div className="overflow-x-auto rounded-3xl border border-brand-border bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-cream border-b border-brand-border text-xs uppercase tracking-wider text-stone-700">
            <tr>
              <th className="py-3.5 px-4 sm:px-6 font-extrabold">Nama Bahan Masak</th>
              <th className="py-3.5 px-4 font-extrabold">Kategori</th>
              <th className="py-3.5 px-4 font-extrabold text-brand-green">Berat Bersih Dapur</th>
              <th className="py-3.5 px-4 font-extrabold text-brand-orange">
                Belanja Pasar (+Toleransi)
              </th>
              <th className="py-3.5 px-4 font-extrabold text-right sm:pr-6">Estimasi Biaya</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/60 text-xs sm:text-sm">
            {scalingResult.scaledIngredients.map((item, idx) => (
              <tr key={idx} className="hover:bg-brand-cream/50 transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">
                  {item.ingredientName}
                  {item.preparationNote && (
                    <span className="block text-[11px] text-stone-500 font-normal italic">
                      {item.preparationNote}
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                    {item.category.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-brand-green">
                  {item.cleanWeightDisplay}
                </td>
                <td className="py-3.5 px-4 font-bold text-brand-orange">
                  {item.marketGrossDisplay ? (
                    <div>
                      <span>{item.marketGrossDisplay}</span>
                      <span className="block text-[11px] text-stone-500 font-normal">{item.householdDisplay}</span>
                    </div>
                  ) : (
                    <div>
                      <span>{item.householdDisplay}</span>
                    </div>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right font-black text-stone-800 sm:pr-6">
                  Rp {item.estimatedCostIdr.toLocaleString('id-ID')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Shopping Checklist Tips */}
      <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-1.5">
        <strong className="text-stone-800 block text-xs">Catatan Cerdas Belanja Pasar Kader:</strong>
        <p>• Angka berat pasar umbi telah otomatis ditambah <strong>18% toleransi kupas kulit</strong>, sehingga saat sampai di dapur dan dikupas bersih, bobot umbi tidak akan tekor.</p>
        <p>• Satuan telur dan buah telah <strong>dibulatkan ke atas</strong> ke bilangan bulat utuh terdekat (Math.ceil) agar tidak timbul kebingungan takaran pecahan saat berbelanja di warung/pasar.</p>
      </div>

    </div>
  );
};
