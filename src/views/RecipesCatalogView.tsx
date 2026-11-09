import React, { useState, useEffect } from 'react';
import { Recipe } from '../types';
import { RecipeCard } from '../components/recipes/RecipeCard';
import { getTuberImage } from '../lib/tuber-assets';
import { sound } from '../lib/sound-effects';
import { 
  Search, 
  ChefHat, 
  RotateCcw,
  X
} from 'lucide-react';

interface RecipesCatalogViewProps {
  recipes: Recipe[];
  onOpenRecipe: (recipe: Recipe) => void;
  initialTuberFilter?: string;
  initialAgeFilter?: string;
}

export const RecipesCatalogView: React.FC<RecipesCatalogViewProps> = ({
  recipes,
  onOpenRecipe,
  initialTuberFilter,
  initialAgeFilter
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTuber, setSelectedTuber] = useState<string>(initialTuberFilter || 'all');
  const [selectedAge, setSelectedAge] = useState<string>(initialAgeFilter || 'all');

  useEffect(() => {
    if (initialTuberFilter) setSelectedTuber(initialTuberFilter);
  }, [initialTuberFilter]);

  useEffect(() => {
    if (initialAgeFilter) setSelectedAge(initialAgeFilter);
  }, [initialAgeFilter]);

  const quickFridgeIngredients = [
    'Telur',
    'Ikan',
    'Ayam',
    'Hati Ayam',
    'Tempe',
    'Keju',
    'Pisang'
  ];

  const filteredRecipes = recipes.filter(r => {
    if (r.status === 'DRAFT' || r.status === 'ARCHIVED') return false;

    const q = searchQuery.toLowerCase().trim();
    let queryMatches = true;

    if (q) {
      const isBoledKetela = q.includes('boled') || q.includes('ketela') || q.includes('ubi');
      const isSampeuKaspe = q.includes('sampeu') || q.includes('kaspe') || q.includes('singkong');
      const isKeladi = q.includes('keladi') || q.includes('talas');

      const titleMatches = r.title.toLowerCase().includes(q);
      const descMatches = r.shortDescription.toLowerCase().includes(q);
      const tuberMatches = r.tuberSlug.includes(q) ||
        (isBoledKetela && r.tuberSlug === 'ubi-jalar') ||
        (isSampeuKaspe && r.tuberSlug === 'singkong') ||
        (isKeladi && r.tuberSlug === 'talas');
      const ingMatches = r.ingredients.some(ing => ing.ingredientName.toLowerCase().includes(q));

      queryMatches = titleMatches || descMatches || tuberMatches || ingMatches;
    }

    if (!queryMatches) return false;
    if (selectedTuber !== 'all' && r.tuberSlug !== selectedTuber) return false;
    if (selectedAge !== 'all' && r.ageCategory !== selectedAge) return false;

    return true;
  });

  const handleResetFilters = () => {
    sound.playClick();
    setSearchQuery('');
    setSelectedTuber('all');
    setSelectedAge('all');
  };

  const isFiltered = searchQuery !== '' || selectedTuber !== 'all' || selectedAge !== 'all';

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      
      {/* 1. Header Ramah Ibu */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-10 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-orange/10 text-brand-orange rounded-full text-xs sm:text-sm font-bold">
          <ChefHat className="w-4 h-4" />
          <span>Katalog Resep</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
          Resep Olahan Umbi untuk MPASI & Anak Balita
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          Cari resep berdasarkan <strong>bahan yang ada di kulkas Bunda</strong>, <strong>jenis umbi</strong>, atau <strong>kelompok usia si kecil</strong>. Semua resep sudah dilengkapi lauk protein hewani.
        </p>
      </div>

      {/* 2. Kotak Pencarian & Filter Mudah (Tanpa Dropdown Rumit) */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-brand-border shadow-sm space-y-6">
        
        {/* A. Pencarian Bahan Kulkas */}
        <div className="space-y-3">
          <label className="text-xs sm:text-sm font-black text-stone-800 block">
            1. Cari Nama Masakan atau Bahan di Kulkas Bunda:
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Ketik bahan yang ada di rumah (contoh: telur, ikan, ayam, keju)..."
              className="w-full pl-11 pr-10 py-3.5 bg-brand-cream text-stone-900 rounded-2xl text-sm font-semibold border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-3.5" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 p-1 text-stone-400 hover:text-stone-700"
                aria-label="Hapus pencarian"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Tombol Bahan Kulkas Cepat */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-xs font-bold text-stone-500">Pilih Cepat Isi Kulkas:</span>
            {quickFridgeIngredients.map(ing => {
              const isSelected = searchQuery.toLowerCase() === ing.toLowerCase();
              return (
                <button
                  key={ing}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSearchQuery(isSelected ? '' : ing);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border btn-press ${
                    isSelected
                      ? 'bg-brand-orange text-white border-brand-orange shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  + {ing}
                </button>
              );
            })}
          </div>
        </div>

        {/* B. Pilihan Jenis Umbi */}
        <div className="space-y-2.5 pt-4 border-t border-brand-border/60">
          <label className="text-xs sm:text-sm font-black text-stone-800 block">
            2. Pilih Jenis Umbi:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'all', label: 'Semua Umbi', img: null },
              { id: 'ubi-jalar', label: 'Ubi Jalar', img: getTuberImage('ubi-jalar') },
              { id: 'singkong', label: 'Singkong', img: getTuberImage('singkong') },
              { id: 'talas', label: 'Talas', img: getTuberImage('talas') }
            ].map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedTuber(t.id);
                }}
                className={`p-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2.5 border-2 btn-press ${
                  selectedTuber === t.id
                    ? 'bg-brand-green text-white border-brand-green shadow-sm'
                    : 'bg-brand-cream/60 text-stone-800 border-brand-border hover:bg-stone-100'
                }`}
              >
                {t.img && (
                  <img src={t.img} alt={t.label} className="w-6 h-6 rounded-full object-cover shrink-0 bg-white" />
                )}
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* C. Pilihan Kelompok Usia Anak */}
        <div className="space-y-2.5 pt-4 border-t border-brand-border/60">
          <label className="text-xs sm:text-sm font-black text-stone-800 block">
            3. Pilih Kelompok Usia Si Kecil:
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Semua Usia' },
              { id: 'MPASI_6_8', label: '6–8 Bulan (Bubur Halus)' },
              { id: 'MPASI_9_11', label: '9–11 Bulan (Bubur Tim)' },
              { id: 'MPASI_12_23', label: '1–2 Tahun' },
              { id: 'BALITA_2_5', label: '2–5 Tahun' },
              { id: 'PMT_KUDAPAN', label: 'Camilan Sehat PMT' }
            ].map(age => (
              <button
                key={age.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedAge(age.id);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border btn-press ${
                  selectedAge === age.id
                    ? 'bg-brand-orange text-white border-brand-orange shadow-sm'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                {age.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Bar & Tombol Reset */}
        {isFiltered && (
          <div className="flex items-center justify-between pt-3 border-t border-brand-border/60 text-xs sm:text-sm">
            <span className="text-stone-600 font-medium">
              Menampilkan <strong>{filteredRecipes.length} resep</strong> yang cocok
            </span>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-brand-orange hover:underline font-bold flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tampilkan Semua Resep</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. Daftar Kartu Resep */}
      {filteredRecipes.length === 0 ? (
        <div className="p-10 text-center bg-white rounded-3xl border border-brand-border space-y-4">
          <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black text-stone-800">Resep belum ditemukan</h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Coba pilih jenis umbi yang lain atau tekan tombol di bawah ini untuk melihat seluruh daftar resep.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-brand-green text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm"
          >
            Tampilkan Semua Resep
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onOpenDetail={onOpenRecipe}
            />
          ))}
        </div>
      )}

    </div>
  );
};
