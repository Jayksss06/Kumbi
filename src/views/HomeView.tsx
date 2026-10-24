import React, { useState } from 'react';
import { Recipe, TuberSlug } from '../types';
import { RecipeCard } from '../components/recipes/RecipeCard';
import { RiceToTuberCalc } from '../components/calculator/RiceToTuberCalc';
import { TUBERS_DATA, NATIONAL_FOOD_STATS } from '../data/scientific-seed-data';
import { getTuberImage } from '../lib/tuber-assets';
import { sound } from '../lib/sound-effects';
import { 
  UtensilsCrossed, 
  Sparkles, 
  QrCode, 
  ArrowRight, 
  BookOpen, 
  ChefHat, 
  HelpCircle, 
  Users, 
  Droplet, 
  Scale, 
  ShieldCheck, 
  Search,
  HeartHandshake,
  Zap
} from 'lucide-react';

interface HomeViewProps {
  recipes: Recipe[];
  onOpenRecipe: (recipe: Recipe) => void;
  onNavigate: (view: string) => void;
  onOpenQuickPmtCode: (code: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  recipes,
  onOpenRecipe,
  onNavigate,
  onOpenQuickPmtCode
}) => {
  const [quickCodeInput, setQuickCodeInput] = useState<string>('');
  const [selectedTuberFilter, setSelectedTuberFilter] = useState<string>('all');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickCodeInput.trim()) {
      sound.playClick();
      onOpenQuickPmtCode(quickCodeInput.trim());
    }
  };

  const handleChipClick = (code: string) => {
    sound.playClick();
    setQuickCodeInput(code);
    onOpenQuickPmtCode(code);
  };

  const featuredRecipes = recipes.filter(r => {
    if (selectedTuberFilter === 'all') return true;
    return r.tuberSlug === selectedTuberFilter;
  });

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-stone-900 to-brand-green text-white rounded-3xl p-6 sm:p-12 shadow-xl border border-stone-800">
        <div className="relative z-10 max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-amber-300 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Kemitraan Posyandu Terpadu & Kemandirian Pangan Lokal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight sm:leading-tight">
            Nutrisi Tepat, Balita Sehat & Bebas Stunting dengan <span className="text-brand-orange drop-shadow-sm">Umbi Lokal</span>.
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
            Sistem informasi edukasi gizi dan katalog resep olahan <strong>Singkong, Ubi Jalar, dan Talas</strong> sebagai alternatif pendamping beras terstandarisasi. Terintegrasi dengan program PMT Posyandu dan protokol wajib protein hewani.
          </p>

          {/* Quick Box Code Resolver Box */}
          <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 max-w-xl shadow-lg">
            <label className="text-xs font-bold text-stone-200 block mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-brand-orange" />
                Akses Kode Kotak PMT Posyandu:
              </span>
              <span className="text-[10px] text-amber-300 font-mono">Verifikasi Otomatis</span>
            </label>
            <form onSubmit={handleQuickSubmit} className="flex gap-2">
              <input
                type="text"
                value={quickCodeInput}
                onChange={e => setQuickCodeInput(e.target.value.toUpperCase())}
                placeholder="Contoh: UMBI-01 s/d UMBI-06"
                className="flex-1 px-4 py-2.5 bg-white text-stone-900 rounded-xl text-xs sm:text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-brand-orange uppercase placeholder:normal-case placeholder:font-normal"
              />
              <button
                type="submit"
                className="btn-press px-5 py-2.5 bg-brand-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0"
              >
                <span>Buka Resep</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            {/* Quick Chips for direct tap */}
            <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
              <span className="text-[10px] text-stone-300">Pilihan Cepat:</span>
              {['UMBI-01', 'UMBI-02', 'UMBI-03', 'UMBI-04'].map(code => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleChipClick(code)}
                  className="px-2.5 py-0.5 rounded-md bg-white/15 hover:bg-white/25 text-[10px] font-mono font-bold text-white border border-white/20 transition-all"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Hero CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('kalkulator');
              }}
              className="btn-press px-5 py-3 bg-brand-green hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg flex items-center gap-2"
            >
              <span>Kalkulator Konversi Porsi Nasi ke Umbi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('edukasi');
              }}
              className="btn-press px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs sm:text-sm font-bold transition-all border border-white/20"
            >
              Komparasi Gizi 3 Umbi vs Beras
            </button>
          </div>

          {/* Authority Highlights Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/15 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>3 Komoditas Umbi Terverifikasi</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Wajib Paduan Protein Hewani</span>
            </div>
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Standar Porsi Gizi Seimbang</span>
            </div>
          </div>

        </div>

        {/* Decorative Background Shapes */}
        <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-brand-green/20 blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-60 h-60 rounded-full bg-brand-orange/15 blur-2xl pointer-events-none" />
      </section>

      {/* 2. THREE TUBER EXPLORER CARDS WITH REAL ASSET ART */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider block">
              Sumber Karbohidrat Unggulan Nusantara
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Eksplorasi 3 Umbi Lokal Pendamping Beras
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('edukasi');
            }}
            className="text-xs font-bold text-brand-green hover:text-emerald-800 flex items-center gap-1 underline"
          >
            Lihat Tabel Perbandingan Lengkap
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card Singkong */}
          <div className="card-lift bg-white rounded-3xl border-2 border-brand-green/30 overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              {/* Visual Image Header */}
              <div className="relative h-44 overflow-hidden bg-stone-100">
                <img 
                  src={getTuberImage('singkong')} 
                  alt="Singkong dan Tepung Mocaf" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                    Energi Padat
                  </span>
                </div>
                <div className="absolute bottom-2.5 right-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                  162,5 kkal/100g
                </div>
              </div>

              <div className="p-5 pb-2">
                <h3 className="text-xl font-black text-stone-900">Singkong & Mocaf</h3>
                <p className="text-xs italic text-stone-500 mb-2">Manihot esculenta</p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Sumber energi padat, fleksibel diolah jadi schotel gurih atau tepung Mocaf (fermentasi kaya pati resisten penurun gula darah & bebas gluten).
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 space-y-2 mt-3">
              <div className="text-[11px] font-semibold text-amber-950 bg-amber-50/90 px-3 py-1.5 rounded-xl border border-amber-200/70 flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                <span>Protokol Aman: Pilih kulit ari merah muda, rendam air bersih mengalir.</span>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate('edukasi');
                }}
                className="btn-press w-full py-2.5 bg-emerald-50 hover:bg-brand-green hover:text-white text-brand-green text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                Cek Profil Gizi Singkong
              </button>
            </div>
          </div>

          {/* Card Ubi Jalar */}
          <div className="card-lift bg-white rounded-3xl border-2 border-brand-orange/30 overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              {/* Visual Image Header */}
              <div className="relative h-44 overflow-hidden bg-stone-100">
                <img 
                  src={getTuberImage('ubi-jalar')} 
                  alt="Ubi Jalar Oranye dan Ungu" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="bg-orange-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                    IG Rendah (44)
                  </span>
                </div>
                <div className="absolute bottom-2.5 right-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                  86 kkal/100g
                </div>
              </div>

              <div className="p-5 pb-2">
                <h3 className="text-xl font-black text-stone-900">Ubi Jalar Oranye & Ungu</h3>
                <p className="text-xs italic text-stone-500 mb-2">Ipomoea batatas</p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Super kaya Beta-Karoten (provitamin A) dan antosianin alami. Manis legit tanpa gula pasir tambahan, menjaga gula darah anak kenyang stabil.
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 space-y-2 mt-3">
              <div className="text-[11px] font-semibold text-amber-950 bg-amber-50/90 px-3 py-1.5 rounded-xl border border-amber-200/70 flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                <span>Protokol Aman: Kukus atau rebus; hindari goreng minyak berlebih.</span>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate('edukasi');
                }}
                className="btn-press w-full py-2.5 bg-orange-50 hover:bg-brand-orange hover:text-white text-brand-orange text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                Cek Profil Gizi Ubi Jalar
              </button>
            </div>
          </div>

          {/* Card Talas Bogor */}
          <div className="card-lift bg-white rounded-3xl border-2 border-brand-purple/30 overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              {/* Visual Image Header */}
              <div className="relative h-44 overflow-hidden bg-stone-100">
                <img 
                  src={getTuberImage('talas')} 
                  alt="Talas Bogor" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="bg-purple-700/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                    Kalium 536mg
                  </span>
                </div>
                <div className="absolute bottom-2.5 right-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                  145 kkal/100g
                </div>
              </div>

              <div className="p-5 pb-2">
                <h3 className="text-xl font-black text-stone-900">Talas Bogor</h3>
                <p className="text-xs italic text-stone-500 mb-2">Colocasia esculenta</p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Kandungan kalium tertinggi untuk kesehatan fungsi jantung dan otot. Butiran patinya super halus, sangat nyaman untuk saluran cerna bayi/balita.
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 space-y-2 mt-3">
              <div className="text-[11px] font-semibold text-amber-950 bg-amber-50/90 px-3 py-1.5 rounded-xl border border-amber-200/70 flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                <span>Protokol Anti-Oksalat: Kupas kering, rendam larutan garam hangat 20 menit.</span>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate('edukasi');
                }}
                className="btn-press w-full py-2.5 bg-purple-50 hover:bg-brand-purple hover:text-white text-brand-purple text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                Cek Profil Gizi Talas
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. RAPID RICE TO TUBER CALCULATOR WIDGET ON HOME */}
      <section>
        <RiceToTuberCalc 
          onSelectRecipeByTuber={(tuber) => {
            setSelectedTuberFilter(tuber);
            const el = document.getElementById('katalog-resep-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </section>

      {/* 4. FEATURED PMT & MPASI RECIPES CATALOG */}
      <section id="katalog-resep-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block">
              Inspirasi Dapur Sehat
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Katalog Resep MPASI & Kudapan PMT Posyandu
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              Tervalidasi gizi, wajib paduan protein hewani, dan dilengkapi panduan tekstur sesuai usia.
            </p>
          </div>

          {/* Filter Tabs by Tuber */}
          <div className="flex flex-wrap gap-1.5 bg-brand-cream p-1 rounded-2xl border border-brand-border">
            {[
              { id: 'all', label: 'Semua Umbi' },
              { id: 'talas', label: 'Talas' },
              { id: 'ubi-jalar', label: 'Ubi Jalar' },
              { id: 'singkong', label: 'Singkong / Mocaf' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedTuberFilter(tab.id);
                }}
                className={`btn-press px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTuberFilter === tab.id
                    ? 'bg-brand-green text-white shadow-sm'
                    : 'text-stone-700 hover:bg-brand-subtle'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onOpenDetail={onOpenRecipe}
            />
          ))}
        </div>
      </section>

      {/* 5. BANNER MITOS FAKTA & KUIS ANTREAN */}
      <section className="bg-gradient-to-r from-amber-50 via-orange-50 to-emerald-50 rounded-3xl border border-brand-orange/30 p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange bg-white px-3 py-1 rounded-full border border-brand-orange/20">
            Modul Edukasi Partisipatif Meja 4 Posyandu
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Uji Pemahaman: Mitos vs Fakta Ilmiah Gizi Umbi
          </h3>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            Klarifikasi miskonsepsi seputar indeks glikemik, teknik aman kalsium oksalat, dan kewajiban pendamping protein hewani balita. Raih verifikasi pemahaman digital <strong>"Bunda Pelopor Pangan Lokal"</strong> dalam kuis interaktif 3 menit.
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onNavigate('kuis');
          }}
          className="btn-press px-6 py-3.5 bg-brand-orange hover:bg-orange-700 text-white font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-md flex items-center gap-2 shrink-0"
        >
          <HelpCircle className="w-5 h-5" />
          <span>Buka Kartu Mitos & Mulai Kuis</span>
        </button>
      </section>

    </div>
  );
};
