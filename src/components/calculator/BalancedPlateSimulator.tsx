import React, { useState } from 'react';
import { calculateBalancedPlate } from '../../lib/nutrition-engine';
import { AgeCategory, TuberSlug, BalancedPlateResult } from '../../types';
import { TUBERS_DATA, PROTEIN_PAIRINGS_DATA } from '../../data/scientific-seed-data';
import { getTuberImage } from '../../lib/tuber-assets';
import { sound } from '../../lib/sound-effects';
import { 
  PieChart, 
  Sparkles, 
  ShieldAlert, 
  Award, 
  ChefHat, 
  CheckCircle2, 
  HeartPulse,
  Flame,
  Layers,
  Baby,
  Fish,
  Egg,
  Drumstick,
  Wheat
} from 'lucide-react';

interface BalancedPlateSimulatorProps {
  onSelectRecipeByAgeOrTuber?: (ageCategory: AgeCategory, tuberSlug: TuberSlug) => void;
}

export const BalancedPlateSimulator: React.FC<BalancedPlateSimulatorProps> = ({
  onSelectRecipeByAgeOrTuber
}) => {
  const [ageCategory, setAgeCategory] = useState<AgeCategory>('MPASI_9_11');
  const [tuberSlug, setTuberSlug] = useState<TuberSlug>('talas');
  const [proteinPairingId, setProteinPairingId] = useState<string>('prot-01'); // Ikan Kembung

  const plate: BalancedPlateResult = calculateBalancedPlate(ageCategory, tuberSlug, proteinPairingId);
  const selectedProtein = PROTEIN_PAIRINGS_DATA.find(p => p.id === proteinPairingId) || PROTEIN_PAIRINGS_DATA[0];
  const selectedTuber = TUBERS_DATA.find(t => t.slug === tuberSlug) || TUBERS_DATA[2];

  const handleAgeChange = (cat: AgeCategory) => {
    sound.playClick();
    setAgeCategory(cat);
  };

  const handleTuberChange = (tuber: TuberSlug) => {
    sound.playClick();
    setTuberSlug(tuber);
  };

  const handleProteinChange = (id: string) => {
    sound.playClick();
    setProteinPairingId(id);
  };

  return (
    <div className="bg-white rounded-3xl border border-brand-border shadow-soft p-6 sm:p-9 space-y-8 animate-fade-in">
      
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-xs font-bold mb-2">
          <PieChart className="w-3.5 h-3.5" />
          <span>Simulator Piring Seimbang Anak</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          Simulasi Komposisi Piring & Paduan Protein Sesuai Usia
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
          Pilih tahapan usia anak, jenis umbi lokal, dan sumber protein hewani untuk melihat visual proporsi piring makan anak serta panduan tekstur wajibnya.
        </p>
      </div>

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-brand-cream/80 p-6 rounded-3xl border border-brand-border shadow-inner">
        
        {/* 1. Usia Anak */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
            <Baby className="w-4 h-4 text-brand-green" />
            <span>1. Usia Anak</span>
          </label>
          <div className="space-y-1.5">
            {[
              { id: 'MPASI_6_8', label: '6-8 Bulan', tag: 'Puree Saring Kental' },
              { id: 'MPASI_9_11', label: '9-11 Bulan', tag: 'Bubur Tim Oromotor' },
              { id: 'MPASI_12_23', label: '12-23 Bulan', tag: 'Makanan Keluarga Lunak' },
              { id: 'BALITA_2_5', label: '2-5 Tahun', tag: 'Finger Food & Porsi Lengkap' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => handleAgeChange(item.id as AgeCategory)}
                className={`w-full text-left p-3 rounded-2xl text-xs transition-all border-2 btn-press ${
                  ageCategory === item.id
                    ? 'bg-brand-green text-white border-brand-green shadow-glow-green font-bold scale-102'
                    : 'bg-white text-stone-700 border-brand-border hover:bg-stone-50'
                }`}
              >
                <div className="font-extrabold text-sm">{item.label}</div>
                <div className={`text-[10px] mt-0.5 ${ageCategory === item.id ? 'text-emerald-200' : 'text-stone-500'}`}>
                  {item.tag}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Pilihan Umbi */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
            <Wheat className="w-4 h-4 text-brand-orange" />
            <span>2. Umbi Lokal</span>
          </label>
          <div className="space-y-2">
            {TUBERS_DATA.filter(t => !t.isReferenceComparison).map(t => (
              <button
                key={t.slug}
                onClick={() => handleTuberChange(t.slug)}
                className={`w-full text-left p-2.5 rounded-2xl text-xs transition-all border-2 flex items-center gap-3 btn-press ${
                  tuberSlug === t.slug
                    ? 'bg-brand-orange text-white border-brand-orange shadow-glow-orange font-bold scale-102'
                    : 'bg-white text-stone-700 border-brand-border hover:bg-stone-50'
                }`}
              >
                <img
                  src={getTuberImage(t.slug)}
                  alt={t.localName}
                  className="w-12 h-12 rounded-xl object-contain bg-white p-1 shrink-0 border border-black/10"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-black text-sm truncate">{t.localName.split('/')[0]}</div>
                  <div className={`text-[10px] font-semibold ${tuberSlug === t.slug ? 'text-amber-100' : 'text-stone-500'}`}>
                    {t.caloriesRangeText} • IG {t.glycemicIndexMin}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Pilihan Protein */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
            <Fish className="w-4 h-4 text-brand-purple" />
            <span>3. Sumber Protein</span>
          </label>
          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {PROTEIN_PAIRINGS_DATA.map(p => (
              <button
                key={p.id}
                onClick={() => handleProteinChange(p.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs transition-all border-2 flex items-center justify-between gap-2 btn-press ${
                  proteinPairingId === p.id
                    ? 'bg-brand-purple text-white border-brand-purple shadow-sm font-bold scale-102'
                    : 'bg-white text-stone-700 border-brand-border hover:bg-stone-50'
                }`}
              >
                <div>
                  <div className="font-bold text-xs">{p.name}</div>
                  <div className={`text-[10px] ${proteinPairingId === p.id ? 'text-purple-200' : 'text-stone-500'}`}>
                    {p.householdUnitDescription}
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  proteinPairingId === p.id ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                }`}>
                  {p.proteinType === 'HEWANI' ? 'Hewani' : 'Nabati'}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Visual Plate Disc & Nutrition Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-50 p-6 sm:p-9 rounded-3xl border border-brand-border shadow-sm">
        
        {/* Left: Interactive Graphic Plate */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border-8 border-white shadow-lift relative overflow-hidden bg-white p-2">
            
            {/* Visual Plate Segments */}
            <div className="w-full h-full rounded-full overflow-hidden flex flex-col shadow-inner">
              
              {/* Top Half: Karbohidrat Umbi & Protein Hewani */}
              <div className="flex-1 flex">
                {/* Karbo Umbi */}
                <div 
                  className="bg-brand-orange text-white flex flex-col items-center justify-center p-2 text-center transition-all duration-500 relative group"
                  style={{ width: `${plate.plateComposition.tuberPct}%` }}
                >
                  <Wheat className="w-5 h-5 mb-0.5 opacity-90" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Umbi</span>
                  <span className="text-xs font-black">{plate.plateComposition.tuberPct}%</span>
                </div>

                {/* Protein Hewani/Nabati */}
                <div 
                  className="bg-brand-green text-white flex flex-col items-center justify-center p-2 text-center transition-all duration-500 flex-1 relative group"
                >
                  <Fish className="w-5 h-5 mb-0.5 opacity-90" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Protein</span>
                  <span className="text-xs font-black">{plate.plateComposition.proteinPct}%</span>
                </div>
              </div>

              {/* Bottom Half: Sayur/Buah & Lemak Sehat */}
              <div className="h-1/3 flex border-t-2 border-white">
                {/* Sayur & Buah */}
                <div 
                  className="bg-emerald-600 text-white flex flex-col items-center justify-center p-1 text-center transition-all duration-500"
                  style={{ width: `${plate.plateComposition.veggieFruitPct}%` }}
                >
                  <span className="text-[9px] font-bold">Sayur & Buah</span>
                  <span className="text-[10px] font-bold">{plate.plateComposition.veggieFruitPct}%</span>
                </div>

                {/* Lemak Sehat */}
                <div className="bg-amber-400 text-amber-950 flex flex-col items-center justify-center p-1 text-center flex-1 transition-all duration-500">
                  <span className="text-[9px] font-bold">Lemak Sehat</span>
                  <span className="text-[10px] font-bold">{plate.plateComposition.healthyFatPct}%</span>
                </div>
              </div>

            </div>
          </div>

          <p className="text-xs font-bold text-stone-600 mt-4 text-center">
            Ilustrasi Proporsi Piring Seimbang Sesuai Standar Kemenkes RI
          </p>
        </div>

        {/* Right: Nutrition Calculation & Texture Guide */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Mandatory Texture Guide by Age */}
          <div className="bg-white p-5 rounded-3xl border-2 border-brand-green/40 shadow-sm space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full inline-block">
              Panduan Tekstur Wajib
            </span>
            <p className="text-sm sm:text-base font-extrabold text-stone-900 mt-1 leading-snug">
              {plate.textureGuide}
            </p>
          </div>

          {/* Macro Nutrition Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-2xl border border-brand-border text-center shadow-soft">
              <span className="text-[11px] text-stone-500 font-bold block">Total Kalori</span>
              <span className="text-xl font-black text-brand-green">{plate.totalCaloriesKcal}</span>
              <span className="text-[10px] text-stone-400 block font-semibold">kkal</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-brand-border text-center shadow-soft">
              <span className="text-[11px] text-stone-500 font-bold block">Protein Lengkap</span>
              <span className="text-xl font-black text-brand-orange">{plate.totalProteinG}</span>
              <span className="text-[10px] text-stone-400 block font-semibold">gram</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-brand-border text-center shadow-soft">
              <span className="text-[11px] text-stone-500 font-bold block">Karbohidrat</span>
              <span className="text-xl font-black text-stone-800">{plate.totalCarbsG}</span>
              <span className="text-[10px] text-stone-400 block font-semibold">gram</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-brand-border text-center shadow-soft">
              <span className="text-[11px] text-stone-500 font-bold block">Serat Alami</span>
              <span className="text-xl font-black text-emerald-700">{plate.totalFiberG}</span>
              <span className="text-[10px] text-stone-400 block font-semibold">gram</span>
            </div>
          </div>

          {/* Micronutrient Highlights */}
          <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <p className="font-extrabold flex items-center gap-1.5 text-emerald-900">
              <Award className="w-4 h-4 text-emerald-700 shrink-0" />
              Sinergi Mikronutrisi Terpilih:
            </p>
            <p className="leading-relaxed text-emerald-900 font-medium">{plate.micronutrientHighlights}</p>
          </div>

          {/* Food Safety Reminder */}
          <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-300 text-xs text-amber-950 space-y-1">
            <p className="font-extrabold flex items-center gap-1.5 text-amber-900">
              <ShieldAlert className="w-4 h-4 text-brand-orange shrink-0" />
              Pengingat Keamanan Pangan:
            </p>
            <p className="leading-relaxed text-amber-900 font-medium">{plate.safetyReminder}</p>
          </div>

          {onSelectRecipeByAgeOrTuber && (
            <button
              onClick={() => { sound.playClick(); onSelectRecipeByAgeOrTuber(ageCategory, tuberSlug); }}
              className="w-full py-3.5 bg-brand-green hover:bg-emerald-800 text-white font-black text-xs sm:text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 btn-press"
            >
              <ChefHat className="w-4 h-4" />
              <span>Temukan Resep yang Cocok untuk Kombinasi Ini</span>
            </button>
          )}

        </div>

      </div>

    </div>
  );
};
