import React, { useState } from 'react';
import { Recipe, TuberSlug, AgeCategory, CookingMethod } from '../types';
import { RecipeCard } from '../components/recipes/RecipeCard';
import { getTuberImage } from '../lib/tuber-assets';
import { sound } from '../lib/sound-effects';
import { 
  Search, 
  ChefHat, 
  Filter, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  Star,
  SlidersHorizontal 
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
  const [selectedProtein, setSelectedProtein] = useState<string>('all');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [selectedMaxTime, setSelectedMaxTime] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'time' | 'title'>('rating');

  // Filter and search logic with Indonesian tuber synonyms
  const filteredRecipes = recipes.filter(r => {
    // Only show published or featured recipes for public catalog (drafts stay in kader dashboard)
    if (r.status === 'DRAFT' || r.status === 'ARCHIVED') return false;

    // Synonym mapping
    const q = searchQuery.toLowerCase().trim();
    let queryMatches = true;

    if (q) {
      // Synonyms: "boled", "ketela" -> ubi jalar; "sampeu", "kaspe" -> singkong; "keladi" -> talas
      const isBoledKetela = q.includes('boled') || q.includes('ketela');
      const isSampeuKaspe = q.includes('sampeu') || q.includes('kaspe');
      const isKeladi = q.includes('keladi');

      const titleMatches = r.title.toLowerCase().includes(q);
      const descMatches = r.shortDescription.toLowerCase().includes(q);
      const codeMatches = r.recipeCode.toLowerCase().includes(q);
      const tuberMatches = r.tuberSlug.includes(q) ||
        (isBoledKetela && r.tuberSlug === 'ubi-jalar') ||
        (isSampeuKaspe && r.tuberSlug === 'singkong') ||
        (isKeladi && r.tuberSlug === 'talas');

      // Check ingredient pantry matches
      const ingMatches = r.ingredients.some(ing => ing.ingredientName.toLowerCase().includes(q));

      queryMatches = titleMatches || descMatches || codeMatches || tuberMatches || ingMatches;
    }

    if (!queryMatches) return false;

    // Tuber filter
    if (selectedTuber !== 'all' && r.tuberSlug !== selectedTuber) return false;

    // Age filter
    if (selectedAge !== 'all' && r.ageCategory !== selectedAge) return false;

    // Protein filter
    if (selectedProtein !== 'all') {
      const hasMatchingProtein = r.ingredients.some(ing => {
        const name = ing.ingredientName.toLowerCase();
        if (selectedProtein === 'ikan') return name.includes('ikan') || name.includes('lele') || name.includes('kembung');
        if (selectedProtein === 'ayam') return name.includes('ayam') && !name.includes('hati');
        if (selectedProtein === 'hati') return name.includes('hati');
        if (selectedProtein === 'telur') return name.includes('telur');
        if (selectedProtein === 'nabati') return name.includes('tempe') || name.includes('tahu');
        return false;
      });
      if (!hasMatchingProtein) return false;
    }

    // Method filter
    if (selectedMethod !== 'all' && r.cookingMethod !== selectedMethod) return false;

    // Time filter
    const totalTime = r.prepTimeMinutes + r.cookTimeMinutes;
    if (selectedMaxTime === 'fast' && totalTime > 25) return false;
    if (selectedMaxTime === 'medium' && (totalTime < 25 || totalTime > 40)) return false;
    if (selectedMaxTime === 'long' && totalTime <= 40) return false;

    return true;
  });

  // Sort logic
  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    if (sortBy === 'rating') return b.avgLahapRating - a.avgLahapRating;
    if (sortBy === 'time') return (a.prepTimeMinutes + a.cookTimeMinutes) - (b.prepTimeMinutes + b.cookTimeMinutes);
    return a.title.localeCompare(b.title);
  });

  const handleResetFilters = () => {
    sound.playClick();
    setSearchQuery('');
    setSelectedTuber('all');
    setSelectedAge('all');
    setSelectedProtein('all');
    setSelectedMethod('all');
    setSelectedMaxTime('all');
    setSortBy('rating');
  };

  const isFiltered = searchQuery !== '' || selectedTuber !== 'all' || selectedAge !== 'all' || 
    selectedProtein !== 'all' || selectedMethod !== 'all' || selectedMaxTime !== 'all';

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title & Introduction */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-xs font-bold mb-2">
          <ChefHat className="w-3.5 h-3.5" />
          Katalog Pangan Bergizi Posyandu
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Katalog Resep Olahan Umbi MPASI & Balita
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Cari resep berdasarkan bahan yang ada di kulkas Bunda, jenis umbi, atau kelompok usia si kecil.
        </p>
      </div>

      {/* Search Bar & Visual Tuber Selector */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-brand-border shadow-sm space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari resep atau ketik bahan kulkas (contoh: 'ikan kembung', 'ubi telur', 'talas lele', 'sampeu', 'boled')..."
            className="w-full pl-11 pr-4 py-3 bg-brand-cream text-stone-900 rounded-2xl text-xs sm:text-sm font-semibold border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-green shadow-inner"
          />
          <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-3.5" />
        </div>

        {/* Visual Tuber Quick Filter Buttons with Photos */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-brand-border/60">
          {[
            { id: 'all', label: 'Semua Umbi', img: null },
            { id: 'singkong', label: 'Singkong / Mocaf', img: getTuberImage('singkong') },
            { id: 'ubi-jalar', label: 'Ubi Jalar', img: getTuberImage('ubi-jalar') },
            { id: 'talas', label: 'Talas Bogor', img: getTuberImage('talas') }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => {
                sound.playClick();
                setSelectedTuber(t.id);
              }}
              className={`btn-press px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                selectedTuber === t.id
                  ? 'bg-brand-green text-white shadow-sm'
                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {t.img && (
                <img src={t.img} alt={t.label} className="w-5 h-5 rounded-full object-cover shrink-0" />
              )}
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Multi-Filters Controls Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-1">
          
          {/* Filter 1: Umbi Dropdown */}
          <div>
            <label className="text-[10px] font-bold text-stone-500 uppercase block mb-1">Jenis Umbi</label>
            <select
              value={selectedTuber}
              onChange={e => {
                sound.playClick();
                setSelectedTuber(e.target.value);
              }}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-brand-border bg-white text-stone-800 font-semibold"
            >
              <option value="all">Semua Umbi</option>
              <option value="singkong">Singkong / Mocaf</option>
              <option value="ubi-jalar">Ubi Jalar</option>
              <option value="talas">Talas Bogor</option>
            </select>
          </div>

          {/* Filter 2: Usia Anak */}
          <div>
            <label className="text-[10px] font-bold text-stone-500 uppercase block mb-1">Usia Anak</label>
            <select
              value={selectedAge}
              onChange={e => setSelectedAge(e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-brand-border bg-white text-stone-800 font-semibold"
            >
              <option value="all">Semua Usia</option>
              <option value="MPASI_6_8">MPASI 6-8 Bulan</option>
              <option value="MPASI_9_11">MPASI 9-11 Bulan</option>
              <option value="MPASI_12_23">MPASI 12-23 Bulan</option>
              <option value="BALITA_2_5">Balita 2-5 Tahun</option>
              <option value="PMT_KUDAPAN">Kudapan PMT</option>
            </select>
          </div>

          {/* Filter 3: Protein Pendamping */}
          <div>
            <label className="text-[10px] font-bold text-stone-500 uppercase block mb-1">Protein Lauk</label>
            <select
              value={selectedProtein}
              onChange={e => setSelectedProtein(e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-brand-border bg-white text-stone-800 font-semibold"
            >
              <option value="all">Semua Protein</option>
              <option value="ikan">Ikan (Kembung/Lele)</option>
              <option value="ayam">Daging Ayam</option>
              <option value="hati">Hati Ayam</option>
              <option value="telur">Telur Ayam/Puyuh</option>
              <option value="nabati">Tempe / Nabati</option>
            </select>
          </div>

          {/* Filter 4: Waktu Masak */}
          <div>
            <label className="text-[10px] font-bold text-stone-500 uppercase block mb-1">Waktu Masak</label>
            <select
              value={selectedMaxTime}
              onChange={e => setSelectedMaxTime(e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-brand-border bg-white text-stone-800 font-semibold"
            >
              <option value="all">Semua Waktu</option>
              <option value="fast">Cepat (&lt; 25 mnt)</option>
              <option value="medium">Sedang (25-40 mnt)</option>
              <option value="long">&gt; 40 mnt</option>
            </select>
          </div>

          {/* Filter 5: Sort By */}
          <div>
            <label className="text-[10px] font-bold text-stone-500 uppercase block mb-1">Urutkan</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-brand-border bg-white text-stone-800 font-bold"
            >
              <option value="rating">Rating Anak Lahap (Tertinggi)</option>
              <option value="time">Waktu Memasak Tercepat</option>
              <option value="title">Nama Resep (A-Z)</option>
            </select>
          </div>

        </div>

        {/* Status Bar & Reset Button */}
        <div className="flex items-center justify-between pt-2 border-t border-brand-border/60 text-xs">
          <span className="text-stone-500 font-medium">
            Ditemukan <strong>{sortedRecipes.length} resep</strong> yang cocok
          </span>

          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="text-stone-600 hover:text-brand-orange font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>

      </div>

      {/* Recipes Cards Grid */}
      {sortedRecipes.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-brand-border space-y-3">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-800">Tidak ada resep yang sesuai</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian bahan kulkas atau klik "Reset Filter" untuk melihat semua resep.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-brand-green text-white rounded-xl text-xs font-bold"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRecipes.map(recipe => (
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
