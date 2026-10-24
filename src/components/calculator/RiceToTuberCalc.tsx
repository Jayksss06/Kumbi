import React, { useState } from 'react';
import { calculateRiceToTuberEquivalence } from '../../lib/nutrition-engine';
import { RiceConversionResult } from '../../types';
import { getTuberImage } from '../../lib/tuber-assets';
import { sound } from '../../lib/sound-effects';
import { 
  Calculator, 
  Sparkles, 
  AlertCircle, 
  ArrowRight, 
  ChefHat, 
  CheckCircle2, 
  Flame,
  Info,
  Layers,
  Scale,
  UtensilsCrossed
} from 'lucide-react';

interface RiceToTuberCalcProps {
  onSelectRecipeByTuber?: (tuberSlug: string) => void;
}

export const RiceToTuberCalc: React.FC<RiceToTuberCalcProps> = ({ onSelectRecipeByTuber }) => {
  const [centong, setCentong] = useState<number>(2); // Default: 2 centong anak = 100g nasi matang
  const [activePreset, setActivePreset] = useState<number>(2);
  const [selectedProteinAddon, setSelectedProteinAddon] = useState<string>('telur');
  const [showFormulaModal, setShowFormulaModal] = useState<boolean>(false);

  const result: RiceConversionResult = calculateRiceToTuberEquivalence(centong);

  const handlePreset = (val: number) => {
    sound.playClick();
    setCentong(val);
    setActivePreset(val);
  };

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCentong(val);
    setActivePreset(val);
  };

  const sliderPercent = ((centong - 0.5) / (6 - 0.5)) * 100;

  return (
    <div className="bg-white rounded-3xl border border-brand-border shadow-soft p-6 sm:p-9 space-y-8 animate-fade-in">
      
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs font-bold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Kalkulator Cerdas Ibu Balita</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Penukar Porsi Nasi Anak ke Umbi Lokal
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Berapa gram umbi kukus yang setara energi dengan porsi nasi yang biasa dimakan si kecil? Geser slider atau ketuk centong di bawah ini untuk melihat takarannya secara langsung.
          </p>
        </div>

        <button
          onClick={() => { sound.playClick(); setShowFormulaModal(!showFormulaModal); }}
          className="self-start sm:self-auto px-3.5 py-2 bg-brand-cream hover:bg-brand-subtle text-stone-700 rounded-xl border border-brand-border text-xs font-bold transition-all flex items-center gap-1.5 btn-press"
          title="Lihat rumus ilmiah konversi"
        >
          <Info className="w-4 h-4 text-brand-orange" />
          <span>{showFormulaModal ? 'Tutup Rumus' : 'Rumus Konversi'}</span>
        </button>
      </div>

      {/* Formula Explanation Drawer */}
      {showFormulaModal && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-brand-green/30 text-xs text-stone-800 space-y-2 animate-fade-in-up">
          <div className="flex items-center justify-between font-bold text-brand-green">
            <span className="flex items-center gap-1.5 text-sm">
              <Scale className="w-4 h-4" />
              Formula Setara Energi (Iso-Caloric Equivalence):
            </span>
            <span className="text-[11px] bg-white px-2 py-0.5 rounded border border-brand-green/30">
              Acuan: Nasi Matang 130 kkal/100g
            </span>
          </div>
          <p className="text-stone-700 leading-relaxed">
            • <strong>1 Centong Anak</strong> rata-rata = 50g nasi putih matang (<strong>65 kkal</strong> & 14g karbohidrat).<br />
            • <strong>Singkong (162,5 kkal/100g):</strong> Gram = (Target Energi / 162,5) × 100 → 100g nasi (~130 kkal) = <strong>~80g singkong</strong>.<br />
            • <strong>Ubi Jalar (86 kkal/100g):</strong> Gram = (Target Energi / 86) × 100 → 100g nasi (~130 kkal) = <strong>~151g ubi jalar</strong>.<br />
            • <strong>Talas (145 kkal/100g):</strong> Gram = (Target Energi / 145) × 100 → 100g nasi (~130 kkal) = <strong>~90g talas</strong>.
          </p>
        </div>
      )}

      {/* Interactive Slider & Quick Presets */}
      <div className="bg-brand-cream/80 p-6 sm:p-7 rounded-3xl border border-brand-border space-y-6 shadow-inner">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Porsi Nasi Putih Matang yang Dimakan Anak
            </label>
            <div className="flex items-baseline gap-2.5 mt-1.5">
              <span className="text-4xl sm:text-5xl font-black text-brand-green tracking-tight transition-transform animate-pop">
                {centong}
              </span>
              <span className="text-base font-bold text-stone-800">Centong Anak</span>
              <span className="text-xs font-semibold text-brand-orange bg-orange-100/80 px-2.5 py-0.5 rounded-full border border-orange-200">
                {result.targetEnergyKcal} kkal (~{result.cookedRiceGrams}g nasi)
              </span>
            </div>
          </div>

          {/* Quick Preset Buttons with tactile feedback */}
          <div className="flex flex-wrap gap-1.5">
            {[1, 1.5, 2, 3, 4].map(val => (
              <button
                key={val}
                onClick={() => handlePreset(val)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] btn-press ${
                  activePreset === val
                    ? 'bg-brand-green text-white shadow-glow-green scale-102'
                    : 'bg-white text-stone-700 hover:bg-stone-50 border border-brand-border'
                }`}
              >
                {val} Centong
              </button>
            ))}
          </div>
        </div>

        {/* Custom Range Slider with Dynamic CSS Fill Variable */}
        <div className="space-y-2 pt-2">
          <input
            type="range"
            min="0.5"
            max="6"
            step="0.5"
            value={centong}
            onChange={handleSlider}
            style={{ '--fill': `${sliderPercent}%` } as React.CSSProperties}
            className="range-brand"
            aria-label="Pilih jumlah centong nasi anak"
          />
          <div className="flex justify-between text-xs text-stone-500 font-semibold px-1">
            <span>½ Centong (MPASI Awal)</span>
            <span>2 Centong (1-2 Tahun)</span>
            <span>4 Centong (3-5 Tahun)</span>
            <span>6 Centong</span>
          </div>
        </div>

        {/* Real-time Calories Comparison Bar */}
        <div className="pt-2 border-t border-brand-border/70 flex items-center justify-between text-xs text-stone-600">
          <span className="flex items-center gap-1.5 font-bold text-stone-700">
            <Flame className="w-4 h-4 text-brand-orange" />
            Energi Setara: {result.targetEnergyKcal} kkal
          </span>
          <span className="text-[11px] text-stone-500">
            Karbohidrat Nasi: ~{result.cookedRiceCarbsG}g • Protein Nasi: ~{result.cookedRiceProteinG}g
          </span>
        </div>

      </div>

      {/* Conversion Output Cards: 3 Umbi with Authentic Illustrations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs sm:text-sm font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-orange" />
            <span>Hasil Takaran Setara {result.targetEnergyKcal} kkal dalam Gram & URT:</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Singkong Kukus */}
          <div className="bg-white rounded-3xl border-2 border-brand-green/30 p-5 relative overflow-hidden flex flex-col justify-between card-lift group">
            
            <div className="space-y-4">
              {/* Tuber Image & Badge */}
              <div className="relative rounded-2xl overflow-hidden bg-brand-cream h-40 flex items-center justify-center p-2">
                <img
                  src={getTuberImage('singkong')}
                  alt="Singkong Manis Segar"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 right-2.5 bg-brand-green text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  162,5 kkal/100g
                </span>
                <span className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-brand-green text-[10px] font-bold px-2 py-0.5 rounded-md border border-brand-green/20">
                  Singkong / Mocaf
                </span>
              </div>

              <div>
                <span className="text-[11px] font-black text-brand-green uppercase tracking-wide block">
                  Pilihan 1 • Padat Kalori
                </span>
                <h4 className="text-lg font-black text-stone-900 mt-0.5">Singkong Kukus</h4>
                
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-brand-green tracking-tight">
                    {result.singkongGrams}
                  </span>
                  <span className="text-sm font-bold text-stone-700">gram kukus</span>
                </div>
                
                <div className="text-xs text-stone-700 font-semibold mt-1 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-brand-green shrink-0" />
                  <span>Takaran Rumah Tangga: {result.singkongUrt}</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-2 leading-relaxed">
                  Cocok untuk balita aktif atau yang sedang Gerakan Tutup Mulut (GTM) nasi. Tekstur empuk pulen.
                </p>
              </div>
            </div>

            {onSelectRecipeByTuber && (
              <button
                onClick={() => { sound.playClick(); onSelectRecipeByTuber('singkong'); }}
                className="mt-5 w-full py-2.5 bg-emerald-50 hover:bg-brand-green hover:text-white text-brand-green border border-brand-green/30 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 min-h-[44px] btn-press"
              >
                <ChefHat className="w-4 h-4" />
                <span>Lihat Resep Olahan Singkong</span>
              </button>
            )}
          </div>

          {/* 2. Ubi Jalar Kukus */}
          <div className="bg-white rounded-3xl border-2 border-brand-orange/30 p-5 relative overflow-hidden flex flex-col justify-between card-lift group">
            
            <div className="space-y-4">
              {/* Tuber Image & Badge */}
              <div className="relative rounded-2xl overflow-hidden bg-brand-cream h-40 flex items-center justify-center p-2">
                <img
                  src={getTuberImage('ubi-jalar')}
                  alt="Ubi Jalar Oranye & Ungu"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 right-2.5 bg-brand-orange text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  IG Rendah (44)
                </span>
                <span className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-brand-orange text-[10px] font-bold px-2 py-0.5 rounded-md border border-brand-orange/20">
                  Ubi Jalar Oranye/Ungu
                </span>
              </div>

              <div>
                <span className="text-[11px] font-black text-brand-orange uppercase tracking-wide block">
                  Pilihan 2 • Beta-Karoten Juara
                </span>
                <h4 className="text-lg font-black text-stone-900 mt-0.5">Ubi Jalar Kukus</h4>
                
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-brand-orange tracking-tight">
                    {result.ubiJalarGrams}
                  </span>
                  <span className="text-sm font-bold text-stone-700">gram kukus</span>
                </div>
                
                <div className="text-xs text-stone-700 font-semibold mt-1 bg-orange-50/80 p-2.5 rounded-xl border border-orange-200 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span>Takaran Rumah Tangga: {result.ubiJalarUrt}</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-2 leading-relaxed">
                  Super kaya Vitamin A alami untuk mata anak & serat tinggi. Rasa manis legit alami tanpa gula pasir.
                </p>
              </div>
            </div>

            {onSelectRecipeByTuber && (
              <button
                onClick={() => { sound.playClick(); onSelectRecipeByTuber('ubi-jalar'); }}
                className="mt-5 w-full py-2.5 bg-orange-50 hover:bg-brand-orange hover:text-white text-brand-orange border border-brand-orange/30 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 min-h-[44px] btn-press"
              >
                <ChefHat className="w-4 h-4" />
                <span>Lihat Resep Olahan Ubi Jalar</span>
              </button>
            )}
          </div>

          {/* 3. Talas Kukus */}
          <div className="bg-white rounded-3xl border-2 border-brand-purple/30 p-5 relative overflow-hidden flex flex-col justify-between card-lift group">
            
            <div className="space-y-4">
              {/* Tuber Image & Badge */}
              <div className="relative rounded-2xl overflow-hidden bg-brand-cream h-40 flex items-center justify-center p-2">
                <img
                  src={getTuberImage('talas')}
                  alt="Talas Bogor Segar"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 right-2.5 bg-brand-purple text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  Kalium 536mg
                </span>
                <span className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-brand-purple text-[10px] font-bold px-2 py-0.5 rounded-md border border-brand-purple/20">
                  Talas Bogor
                </span>
              </div>

              <div>
                <span className="text-[11px] font-black text-brand-purple uppercase tracking-wide block">
                  Pilihan 3 • Pati Terhalus Bayi
                </span>
                <h4 className="text-lg font-black text-stone-900 mt-0.5">Talas Kukus</h4>
                
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-brand-purple tracking-tight">
                    {result.talasGrams}
                  </span>
                  <span className="text-sm font-bold text-stone-700">gram kukus</span>
                </div>
                
                <div className="text-xs text-stone-700 font-semibold mt-1 bg-purple-50/80 p-2.5 rounded-xl border border-purple-200 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-brand-purple shrink-0" />
                  <span>Takaran Rumah Tangga: {result.talasUrt}</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-2 leading-relaxed">
                  Pati sangat halus mudah dicerna. <em>Tips: Kupas kering & rendam air garam hangat 20 menit agar 100% bebas gatal.</em>
                </p>
              </div>
            </div>

            {onSelectRecipeByTuber && (
              <button
                onClick={() => { sound.playClick(); onSelectRecipeByTuber('talas'); }}
                className="mt-5 w-full py-2.5 bg-purple-50 hover:bg-brand-purple hover:text-white text-brand-purple border border-brand-purple/30 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 min-h-[44px] btn-press"
              >
                <ChefHat className="w-4 h-4" />
                <span>Lihat Resep Olahan Talas</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Interactive Protein Compensation Selector */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/70 p-6 rounded-3xl border-2 border-amber-300 shadow-sm space-y-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-black text-sm text-amber-950 block">
              Aturan Wajib: Tambahkan Lauk Pendamping Protein ({result.proteinDifferenceG}g Protein Tambahan)
            </span>
            <p className="text-xs text-stone-700 leading-relaxed mt-0.5">
              Karena protein alami umbi lokal (1,0 - 1,57g) lebih rendah dari beras, Bunda WAJIB menambahkan salah satu lauk hewani di bawah ini agar gizi balita seimbang dan terhindar dari risiko stunting:
            </p>
          </div>
        </div>

        {/* Interactive Add-on Selection Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {[
            { id: 'telur', label: '+ 1 Butir Telur Ayam (50g)', protein: '6,3g Protein Lengkap', desc: 'Skor asam amino 100 & kaya kolin otak' },
            { id: 'ikan', label: '+ 1 Potong Ikan Kembung (35g)', protein: '7,4g Protein + DHA', desc: 'Omega-3 tinggi untuk kecerdasan anak' },
            { id: 'hati', label: '+ 1 Buah Hati Ayam (30g)', protein: '5,1g Protein + Zat Besi', desc: 'Zat besi heme cegah anemia MPASI' },
          ].map(addon => (
            <button
              key={addon.id}
              onClick={() => { sound.playClick(); setSelectedProteinAddon(addon.id); }}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all btn-press ${
                selectedProteinAddon === addon.id
                  ? 'bg-white border-brand-orange shadow-md scale-102'
                  : 'bg-white/60 border-amber-200 hover:bg-white text-stone-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-black text-stone-900">
                <span>{addon.label}</span>
                {selectedProteinAddon === addon.id && <CheckCircle2 className="w-4 h-4 text-brand-orange" />}
              </div>
              <span className="text-[11px] font-bold text-brand-orange block mt-1">{addon.protein}</span>
              <span className="text-[10px] text-stone-500 block mt-0.5">{addon.desc}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
