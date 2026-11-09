import React, { useState } from 'react';
import { calculateRiceToTuberEquivalence } from '../../lib/nutrition-engine';
import { RiceConversionResult } from '../../types';
import { getTuberImage } from '../../lib/tuber-assets';
import { sound } from '../../lib/sound-effects';
import { 
  Calculator, 
  ChefHat, 
  CheckCircle2, 
  Flame,
  Scale,
  UtensilsCrossed,
  HeartPulse
} from 'lucide-react';

interface RiceToTuberCalcProps {
  onSelectRecipeByTuber?: (tuberSlug: string) => void;
}

export const RiceToTuberCalc: React.FC<RiceToTuberCalcProps> = ({ onSelectRecipeByTuber }) => {
  const [centong, setCentong] = useState<number>(1.5);
  const [selectedProteinAddon, setSelectedProteinAddon] = useState<string>('telur');

  const result: RiceConversionResult = calculateRiceToTuberEquivalence(centong);

  const presets = [
    { val: 0.5, label: '½ Centong', sub: 'Usia 6–8 Bln' },
    { val: 1, label: '1 Centong', sub: 'Usia 9–11 Bln' },
    { val: 1.5, label: '1½ Centong', sub: 'Usia 1–2 Thn' },
    { val: 2, label: '2 Centong', sub: 'Usia 2–5 Thn' },
    { val: 3, label: '3 Centong', sub: 'Porsi Besar' },
  ];

  const handlePreset = (val: number) => {
    sound.playClick();
    setCentong(val);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* LANGKAH 1: PILIH PORSI NASI ANAK */}
      <div className="bg-white rounded-3xl border border-brand-border shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-start gap-3.5">
          <span className="w-8 h-8 rounded-full bg-brand-green text-white font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
            1
          </span>
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-stone-900">
              Biasanya Si Kecil Makan Berapa Centong Nasi?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              Pilih ukuran porsi nasi sekali makan di bawah ini (1 centong anak sekitar 50 gram nasi):
            </p>
          </div>
        </div>

        {/* Tombol Pilihan Porsi Besar & Mudah Disentuh */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {presets.map(item => {
            const isSelected = centong === item.val;
            return (
              <button
                key={item.val}
                type="button"
                onClick={() => handlePreset(item.val)}
                className={`p-4 rounded-2xl border-2 text-center transition-all btn-press ${
                  isSelected
                    ? 'bg-brand-green text-white border-brand-green shadow-md scale-[1.02]'
                    : 'bg-brand-cream/60 text-stone-800 border-brand-border hover:bg-stone-100'
                }`}
              >
                <span className="text-base sm:text-lg font-black block">{item.label}</span>
                <span className={`text-[11px] font-semibold block mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-stone-500'}`}>
                  {item.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* Ringkasan Porsi Nasi yang Dipilih */}
        <div className="bg-brand-cream p-4 rounded-2xl border border-brand-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-stone-800">
            <Flame className="w-5 h-5 text-brand-orange shrink-0" />
            <span>
              Porsi Dipilih: <strong className="text-brand-green">{centong} Centong Nasi</strong> (sekitar {result.cookedRiceGrams} gram nasi matang)
            </span>
          </div>
          <span className="text-xs font-extrabold text-brand-orange bg-white px-3 py-1 rounded-full border border-orange-200">
            Setara {result.targetEnergyKcal} kkal energi
          </span>
        </div>
      </div>

      {/* LANGKAH 2: HASIL TAKARAN UMBI PENGGANTI NASI */}
      <div className="bg-white rounded-3xl border border-brand-border shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-start gap-3.5">
          <span className="w-8 h-8 rounded-full bg-brand-orange text-white font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
            2
          </span>
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-stone-900">
              Takaran Umbi Kukus Pengganti Nasinya
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              Pilih salah satu umbi di bawah ini untuk menggantikan <strong>{centong} centong nasi</strong> dengan jumlah energi yang sama:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Ubi Jalar */}
          <div className="bg-orange-50/40 rounded-3xl border-2 border-brand-orange/40 p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={getTuberImage('ubi-jalar')}
                  alt="Ubi Jalar"
                  className="w-16 h-16 rounded-2xl object-cover bg-white border border-orange-200 shadow-xs shrink-0"
                />
                <div>
                  <span className="text-[11px] font-bold text-brand-orange bg-orange-100 px-2.5 py-0.5 rounded-full">
                    Kaya Vitamin A
                  </span>
                  <h3 className="text-lg font-black text-stone-900 mt-0.5">Ubi Jalar Kukus</h3>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-orange-200 space-y-1">
                <span className="text-xs text-stone-500 font-semibold block">Takaran Pengganti Nasi:</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-brand-orange">{result.ubiJalarGrams}</span>
                  <span className="text-sm font-bold text-stone-700">gram</span>
                </div>
                <div className="pt-2 mt-2 border-t border-stone-100 flex items-center gap-1.5 text-xs font-bold text-stone-800">
                  <UtensilsCrossed className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>Ukuran Rumah: {result.ubiJalarUrt}</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Rasa manis alami dan mudah dilumatkan. Bagus untuk daya tahan tubuh si kecil.
              </p>
            </div>

            {onSelectRecipeByTuber && (
              <button
                onClick={() => { sound.playClick(); onSelectRecipeByTuber('ubi-jalar'); }}
                className="mt-4 w-full py-3 bg-brand-orange hover:bg-orange-700 text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 btn-press shadow-xs"
              >
                <ChefHat className="w-4 h-4" />
                <span>Lihat Resep Ubi Jalar</span>
              </button>
            )}
          </div>

          {/* 2. Singkong */}
          <div className="bg-emerald-50/40 rounded-3xl border-2 border-brand-green/40 p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={getTuberImage('singkong')}
                  alt="Singkong"
                  className="w-16 h-16 rounded-2xl object-cover bg-white border border-emerald-200 shadow-xs shrink-0"
                />
                <div>
                  <span className="text-[11px] font-bold text-brand-green bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Tenaga Padat
                  </span>
                  <h3 className="text-lg font-black text-stone-900 mt-0.5">Singkong Kukus</h3>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-200 space-y-1">
                <span className="text-xs text-stone-500 font-semibold block">Takaran Pengganti Nasi:</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-brand-green">{result.singkongGrams}</span>
                  <span className="text-sm font-bold text-stone-700">gram</span>
                </div>
                <div className="pt-2 mt-2 border-t border-stone-100 flex items-center gap-1.5 text-xs font-bold text-stone-800">
                  <UtensilsCrossed className="w-4 h-4 text-brand-green shrink-0" />
                  <span>Ukuran Rumah: {result.singkongUrt}</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Padat energi dan mengenyangkan. Pastikan memilih singkong manis segar & dimasak matang.
              </p>
            </div>

            {onSelectRecipeByTuber && (
              <button
                onClick={() => { sound.playClick(); onSelectRecipeByTuber('singkong'); }}
                className="mt-4 w-full py-3 bg-brand-green hover:bg-emerald-800 text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 btn-press shadow-xs"
              >
                <ChefHat className="w-4 h-4" />
                <span>Lihat Resep Singkong</span>
              </button>
            )}
          </div>

          {/* 3. Talas */}
          <div className="bg-purple-50/40 rounded-3xl border-2 border-brand-purple/40 p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={getTuberImage('talas')}
                  alt="Talas"
                  className="w-16 h-16 rounded-2xl object-cover bg-white border border-purple-200 shadow-xs shrink-0"
                />
                <div>
                  <span className="text-[11px] font-bold text-brand-purple bg-purple-100 px-2.5 py-0.5 rounded-full">
                    Lembut di Perut
                  </span>
                  <h3 className="text-lg font-black text-stone-900 mt-0.5">Talas Kukus</h3>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-purple-200 space-y-1">
                <span className="text-xs text-stone-500 font-semibold block">Takaran Pengganti Nasi:</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-brand-purple">{result.talasGrams}</span>
                  <span className="text-sm font-bold text-stone-700">gram</span>
                </div>
                <div className="pt-2 mt-2 border-t border-stone-100 flex items-center gap-1.5 text-xs font-bold text-stone-800">
                  <Scale className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>Ukuran Rumah: {result.talasUrt}</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Tekstur pulen & mudah dicerna. Kupas kering dan rendam air garam hangat dulu agar bebas gatal.
              </p>
            </div>

            {onSelectRecipeByTuber && (
              <button
                onClick={() => { sound.playClick(); onSelectRecipeByTuber('talas'); }}
                className="mt-4 w-full py-3 bg-brand-purple hover:bg-purple-900 text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 btn-press shadow-xs"
              >
                <ChefHat className="w-4 h-4" />
                <span>Lihat Resep Talas</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* LANGKAH 3: PADUAN WAJIB PROTEIN HEWANI */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/70 p-6 sm:p-8 rounded-3xl border-2 border-amber-300 shadow-sm space-y-5">
        <div className="flex items-start gap-3.5">
          <span className="w-8 h-8 rounded-full bg-brand-orange text-white font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
            3
          </span>
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-stone-900">
              Tambahkan 1 Lauk Protein Hewani Pendamping
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed">
              Karena umbi adalah sumber karbohidrat (pengganti nasi), Bunda <strong>wajib menambahkan lauk protein hewani</strong> di bawah ini agar gizi si kecil lengkap dan mencegah stunting:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[
            { 
              id: 'telur', 
              label: '1 Butir Telur Ayam', 
              portion: 'Sekitar 50 gram',
              benefit: 'Tinggi protein (6,3g) & kolin untuk perkembangan otak anak.' 
            },
            { 
              id: 'ikan', 
              label: '1 Potong Ikan Kembung / Lele', 
              portion: 'Sekitar 35–40 gram',
              benefit: 'Tinggi protein (7,4g) & Omega-3 alami untuk kecerdasan.' 
            },
            { 
              id: 'hati', 
              label: '1 Buah Hati Ayam', 
              portion: 'Sekitar 30 gram',
              benefit: 'Sangat kaya Zat Besi untuk mencegah anemia pada bayi MPASI.' 
            },
            { 
              id: 'ayam', 
              label: 'Daging Ayam Cincang', 
              portion: '3 Sendok Makan (40g)',
              benefit: 'Sumber protein hewani & mineral Seng (Zinc) untuk pertumbuhan tinggi badan.' 
            },
          ].map(addon => {
            const isSelected = selectedProteinAddon === addon.id;
            return (
              <button
                key={addon.id}
                type="button"
                onClick={() => { sound.playClick(); setSelectedProteinAddon(addon.id); }}
                className={`p-4 rounded-2xl border-2 text-left transition-all btn-press flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-brand-orange shadow-md'
                    : 'bg-white/75 border-amber-200 hover:bg-white text-stone-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 font-black text-sm text-stone-900">
                    <span>+ {addon.label}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />}
                  </div>
                  <span className="text-xs font-bold text-brand-orange block mt-1">{addon.portion}</span>
                </div>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">{addon.benefit}</p>
              </button>
            );
          })}
        </div>

        {/* Ringkasan Panduan Tekstur Sesuai Usia */}
        <div className="bg-white/90 p-4 rounded-2xl border border-amber-200 text-xs sm:text-sm text-stone-800 space-y-1.5">
          <div className="font-black text-brand-green flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4" />
            <span>Pengingat Tekstur Makanan Sesuai Usia Anak:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs text-stone-700">
            <div className="p-2.5 bg-brand-cream rounded-xl border border-brand-border">
              <strong className="text-stone-900 block">Bayi 6–8 Bulan:</strong>
              Lumatkan halus dan saring hingga menjadi bubur kental (puree).
            </div>
            <div className="p-2.5 bg-brand-cream rounded-xl border border-brand-border">
              <strong className="text-stone-900 block">Bayi 9–11 Bulan:</strong>
              Bubur tim lembut atau dicincang kasar agar bayi belajar mengunyah.
            </div>
            <div className="p-2.5 bg-brand-cream rounded-xl border border-brand-border">
              <strong className="text-stone-900 block">Anak 1–5 Tahun:</strong>
              Makanan keluarga yang empuk atau camilan yang mudah dipegang tangan.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
