import React, { useState } from 'react';
import { MYTH_FACTS_DATA } from '../../data/scientific-seed-data';
import { sound } from '../../lib/sound-effects';
import { HelpCircle, Sparkles, RotateCw, CheckCircle2, BookOpen, Layers, Eye, EyeOff } from 'lucide-react';

export const MythFactFlipCards: React.FC = () => {
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleFlip = (id: string) => {
    sound.playClick();
    if (flippedIds.includes(id)) {
      setFlippedIds(flippedIds.filter(i => i !== id));
    } else {
      setFlippedIds([...flippedIds, id]);
    }
  };

  const handleFlipAll = () => {
    sound.playCheck();
    if (flippedIds.length === MYTH_FACTS_DATA.length) {
      setFlippedIds([]);
    } else {
      setFlippedIds(MYTH_FACTS_DATA.map(i => i.id));
    }
  };

  const categories = [
    { id: 'all', label: 'Semua Mitos (8)' },
    { id: 'Mitos Singkong', label: 'Singkong & Mocaf' },
    { id: 'Mitos Ubi Jalar', label: 'Ubi Jalar' },
    { id: 'Mitos Talas', label: 'Talas Bogor' },
    { id: 'Mitos Beras', label: 'Nasi & Budaya' },
  ];

  const filteredItems = MYTH_FACTS_DATA.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
           selectedCategory.toLowerCase().includes(item.category.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2">
            <span>Kartu Balik Mitos vs Fakta Gizi Umbi</span>
            <span className="text-xs font-mono font-bold bg-brand-green/10 text-brand-green px-2.5 py-0.5 rounded-full">
              {flippedIds.length}/{MYTH_FACTS_DATA.length} Dibuka
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            Ketuk kartu untuk membalik dan melihat penjelasan ilmiah serta cara penanganan tepat.
          </p>
        </div>

        {/* Action Toggle All Button */}
        <button
          onClick={handleFlipAll}
          className="btn-press px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-all border border-stone-300 flex items-center gap-1.5 shrink-0"
        >
          {flippedIds.length === MYTH_FACTS_DATA.length ? (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span>Tutup Semua</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Buka Semua Fakta</span>
            </>
          )}
        </button>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-1.5 bg-brand-cream p-1 rounded-2xl border border-brand-border">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              sound.playClick();
              setSelectedCategory(cat.id);
            }}
            className={`btn-press px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat.id
                ? 'bg-brand-orange text-white shadow-sm'
                : 'text-stone-700 hover:bg-brand-subtle'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cards Grid with 3D Flip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredItems.map(item => {
          const isFlipped = flippedIds.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => toggleFlip(item.id)}
              className="h-72 cursor-pointer perspective"
            >
              <div 
                className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                
                {/* FRONT: MITOS */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl border-2 border-brand-border p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="bg-rose-100 text-rose-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-rose-200">
                        Mitos Umum
                      </span>
                      <span className="text-[10px] text-stone-400 font-bold">{item.category}</span>
                    </div>

                    <p className="text-sm font-extrabold text-stone-900 leading-snug">
                      "{item.mythStatement}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-orange font-bold">
                    <span className="flex items-center gap-1.5 text-[11px] hover:underline">
                      <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                      Ketuk untuk cek Fakta
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">#0{item.sortOrder}</span>
                  </div>
                </div>

                {/* BACK: FAKTA ILMIAH */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border-2 border-emerald-400 p-5 shadow-md flex flex-col justify-between text-emerald-950">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Fakta Ilmiah
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold">Terverifikasi</span>
                    </div>

                    <p className="text-xs sm:text-[13px] text-emerald-950 font-medium leading-relaxed">
                      {item.factExplanation}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-emerald-200 text-[10px] text-emerald-800 italic">
                    Sumber: {item.scientificReferenceNote}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
