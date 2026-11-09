import React, { useState } from 'react';
import { Recipe } from '../types';
import { RecipeCard } from '../components/recipes/RecipeCard';
import { getTuberImage } from '../lib/tuber-assets';
import { sound } from '../lib/sound-effects';
import { 
  ArrowRight, 
  BookOpen, 
  ChefHat, 
  Calculator,
  HeartPulse,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

interface HomeViewProps {
  recipes: Recipe[];
  onOpenRecipe: (recipe: Recipe) => void;
  onNavigate: (view: string) => void;
  onNavigateToRecipesWithFilter?: (tuber?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  recipes,
  onOpenRecipe,
  onNavigate,
  onNavigateToRecipesWithFilter
}) => {
  const [selectedTuberFilter, setSelectedTuberFilter] = useState<string>('all');

  const featuredRecipes = recipes.filter(r => {
    if (r.status === 'DRAFT' || r.status === 'ARCHIVED') return false;
    if (selectedTuberFilter === 'all') return true;
    return r.tuberSlug === selectedTuberFilter;
  });

  const mainFeatures = [
    {
      id: 'edukasi',
      title: 'Edukasi Umbi',
      desc: 'Pelajari keunggulan umbi lokal, manfaat bagi lingkungan, serta cara mengolah yang aman bebas gatal dan racun.',
      icon: BookOpen,
      bgBadge: 'bg-brand-green text-white',
      borderClass: 'border-brand-green/30 hover:border-brand-green',
      btnText: 'Buka Edukasi Umbi'
    },
    {
      id: 'info-gizi',
      title: 'Informasi Gizi',
      desc: 'Mengetahui kandungan nutrisi, serat, dan vitamin dalam berbagai jenis umbi dibandingkan nasi putih.',
      icon: HeartPulse,
      bgBadge: 'bg-emerald-700 text-white',
      borderClass: 'border-emerald-600/30 hover:border-emerald-700',
      btnText: 'Lihat Informasi Gizi'
    },
    {
      id: 'kalkulator',
      title: 'Kalkulator Gizi',
      desc: 'Kalkulator praktis untuk membantu Bunda menentukan takaran porsi pengganti nasi serta paduan protein hewani yang tepat.',
      icon: Calculator,
      bgBadge: 'bg-brand-orange text-white',
      borderClass: 'border-brand-orange/30 hover:border-brand-orange',
      btnText: 'Hitung Takaran Porsi'
    },
    {
      id: 'resep',
      title: 'Katalog Resep',
      desc: 'Cari resep lezat berdasarkan bahan yang ada di kulkas Bunda, jenis umbi, atau kelompok usia si kecil.',
      icon: ChefHat,
      bgBadge: 'bg-brand-purple text-white',
      borderClass: 'border-brand-purple/30 hover:border-brand-purple',
      btnText: 'Cari Resep Masakan'
    }
  ];

  const localTubersSummary = [
    {
      slug: 'ubi-jalar' as const,
      name: 'Ubi Jalar',
      borderColor: 'border-brand-orange/40',
      badgeBg: 'bg-brand-orange text-white',
      points: [
        'Manis alami, mudah dilumatkan',
        'Yang berdaging oranye kaya beta-karoten (jadi vitamin A)',
        'Cocok untuk bubur, kukus, dan bola ubi'
      ]
    },
    {
      slug: 'singkong' as const,
      name: 'Singkong',
      borderColor: 'border-brand-green/40',
      badgeBg: 'bg-brand-green text-white',
      points: [
        'Sumber tenaga yang mengenyangkan',
        'Kupas bersih, lalu masak sampai matang, jangan dimakan mentah',
        'Cocok untuk getuk, kroket, schotel kukus, dan lumpia isi'
      ]
    },
    {
      slug: 'talas' as const,
      name: 'Talas',
      borderColor: 'border-brand-purple/40',
      badgeBg: 'bg-brand-purple text-white',
      points: [
        'Tekstur pulen mengandung serat alami',
        'Getahnya bikin gatal: pakai sarung tangan saat mengupas, masak sampai benar-benar matang',
        'Cocok untuk bubur tim, kukus, dan perkedel'
      ]
    }
  ];

  return (
    <div className="space-y-12 pb-12 animate-fade-in">
      
      {/* 1. HERO BANNER SEDERHANA & HANGAT */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-green via-emerald-800 to-stone-900 text-white rounded-3xl p-6 sm:p-12 shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-xs sm:text-sm font-bold text-amber-200 border border-white/20">
            <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Panduan Gizi Keluarga & Posyandu</span>
          </div>

          <h1 className="text-2xl sm:text-5xl font-black tracking-tight leading-tight">
            Nutrisi Tepat, Balita Sehat & Bebas Stunting dengan <span className="text-amber-300">Umbi Lokal</span>
          </h1>

          <p className="text-sm sm:text-lg text-stone-100 leading-relaxed font-normal">
            <strong>Kumbi</strong> adalah website edukasi gizi dan katalog resep olahan <strong>Singkong, Ubi Jalar, dan Talas</strong> sebagai alternatif pendamping beras. Dilengkapi panduan takaran porsi dan paduan wajib protein hewani untuk si kecil.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('resep');
              }}
              className="btn-press px-6 py-3.5 bg-brand-orange hover:bg-orange-600 text-white rounded-2xl text-sm font-bold transition-all shadow-md flex items-center gap-2"
            >
              <ChefHat className="w-5 h-5" />
              <span>Lihat Katalog Resep</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onNavigate('kalkulator');
              }}
              className="btn-press px-6 py-3.5 bg-white text-brand-green hover:bg-stone-100 rounded-2xl text-sm font-bold transition-all shadow-md flex items-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              <span>Hitung Takaran Pengganti Nasi</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. EMPAT FITUR UTAMA KUMBI (SESUAI POSTER) */}
      <section className="space-y-5">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange">
            Menu Utama Kumbi
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            Apa Saja yang Bisa Bunda Lakukan di Sini?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Ketuk salah satu menu di bawah ini sesuai kebutuhan Bunda:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mainFeatures.map(feat => {
            const IconComponent = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => {
                  sound.playClick();
                  onNavigate(feat.id);
                }}
                className={`card-lift bg-white rounded-3xl border-2 ${feat.borderClass} p-6 shadow-sm flex flex-col justify-between cursor-pointer transition-all`}
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl ${feat.bgBadge} flex items-center justify-center shadow-sm`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-stone-900">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-extrabold text-brand-green">
                  <span>{feat.btnText}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. KENALI UMBI LOKAL KITA (SESUAI POSTER) */}
      <section className="bg-white rounded-3xl border border-brand-border p-6 sm:p-9 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-border pb-4">
          <div>
            <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-white bg-brand-green px-3 py-1 rounded-full mb-1.5">
              Kenali Umbi Lokal Kita
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              3 Sumber Karbohidrat Sehat Pendamping Nasi
            </h2>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('edukasi');
            }}
            className="text-xs sm:text-sm font-bold text-brand-green hover:underline flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Pelajari Cara Mengolah Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {localTubersSummary.map(tuber => (
            <div
              key={tuber.slug}
              className={`rounded-3xl border-2 ${tuber.borderColor} bg-brand-cream/40 p-5 flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={getTuberImage(tuber.slug)}
                    alt={tuber.name}
                    className="w-20 h-20 rounded-2xl object-cover bg-white border-2 border-white shadow-md shrink-0"
                  />
                  <div>
                    <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1 ${tuber.badgeBg}`}>
                      Umbi Lokal
                    </span>
                    <h3 className="text-xl font-black text-stone-900">{tuber.name}</h3>
                  </div>
                </div>

                <div className="space-y-2.5 pt-1">
                  {tuber.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  if (onNavigateToRecipesWithFilter) {
                    onNavigateToRecipesWithFilter(tuber.slug);
                  } else {
                    onNavigate('resep');
                  }
                }}
                className="w-full py-2.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 btn-press"
              >
                <ChefHat className="w-4 h-4 text-brand-orange" />
                <span>Lihat Resep {tuber.name}</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. RESEP PILIHAN UNTUK SI KECIL */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-brand-orange uppercase tracking-wider block">
              Inspirasi Masakan Harian
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              Resep Olahan Umbi & Protein Hewani
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              Ketuk salah satu resep di bawah ini untuk melihat takaran bahan dan cara memasaknya:
            </p>
          </div>

          {/* Filter Cepat per Umbi */}
          <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-2xl border border-brand-border shadow-xs">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'ubi-jalar', label: 'Ubi Jalar' },
              { id: 'singkong', label: 'Singkong' },
              { id: 'talas', label: 'Talas' }
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
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

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

    </div>
  );
};
