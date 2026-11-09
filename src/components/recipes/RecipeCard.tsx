import React from 'react';
import { Recipe } from '../../types';
import { getTuberImage } from '../../lib/tuber-assets';
import { sound } from '../../lib/sound-effects';
import { Clock, ChefHat, ArrowRight, CheckCircle2 } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onOpenDetail: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onOpenDetail }) => {
  const getTuberBadge = () => {
    switch (recipe.tuberSlug) {
      case 'singkong':
        return (
          <span className="bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            Singkong {recipe.usesMocaf ? '(Tepung Mocaf)' : ''}
          </span>
        );
      case 'ubi-jalar':
        return (
          <span className="bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            Ubi Jalar
          </span>
        );
      case 'talas':
        return (
          <span className="bg-brand-purple text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            Talas
          </span>
        );
      default:
        return (
          <span className="bg-stone-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            Umbi Lokal
          </span>
        );
    }
  };

  const getAgeLabel = (cat: string) => {
    switch (cat) {
      case 'MPASI_6_8': return 'Usia 6–8 Bulan';
      case 'MPASI_9_11': return 'Usia 9–11 Bulan';
      case 'MPASI_12_23': return 'Usia 1–2 Tahun';
      case 'BALITA_2_5': return 'Usia 2–5 Tahun';
      case 'PMT_KUDAPAN': return 'Camilan Sehat';
      default: return 'Semua Balita';
    }
  };

  // Find protein ingredient
  const proteinIng = recipe.ingredients.find(
    i => i.category === 'PROTEIN_HEWANI' || i.category === 'PROTEIN_NABATI'
  );

  const handleClick = () => {
    sound.playClick();
    onOpenDetail(recipe);
  };

  return (
    <div 
      onClick={handleClick}
      className="card-lift bg-white rounded-3xl border-2 border-brand-border shadow-sm overflow-hidden flex flex-col justify-between group transition-all cursor-pointer"
    >
      <div>
        {/* Visual Image Header */}
        <div className="relative h-48 overflow-hidden bg-stone-100">
          <img 
            src={getTuberImage(recipe.tuberSlug)} 
            alt={recipe.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
            {getTuberBadge()}
            <span className="bg-white/95 text-stone-800 text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
              {getAgeLabel(recipe.ageCategory)}
            </span>
          </div>

          {/* Cooking Time Overlay */}
          <div className="absolute bottom-3 left-3 bg-stone-900/85 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} menit • {recipe.cookingMethod}</span>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="p-5 pb-3 space-y-2">
          <h3 className="text-lg font-black text-stone-900 group-hover:text-brand-green transition-colors leading-snug">
            {recipe.title}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
            {recipe.shortDescription}
          </p>
        </div>

        {/* Lauk Protein & Kalori */}
        <div className="px-5 py-3 bg-brand-cream/80 border-y border-brand-border/60 space-y-2">
          {proteinIng && (
            <div className="flex items-center gap-2 text-xs text-emerald-950 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">
                Lauk Protein: <strong>{proteinIng.ingredientName}</strong>
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-stone-600 pt-1 border-t border-stone-200/60">
            <span>Energi: <strong className="text-brand-green">{recipe.caloriesPerPortion} kkal/porsi</strong></span>
            <span>Protein: <strong className="text-brand-orange">{recipe.proteinGPerPortion}g</strong></span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 pt-4">
        <button
          type="button"
          className="btn-press w-full py-3 bg-brand-green hover:bg-emerald-800 text-white rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <ChefHat className="w-4 h-4" />
          <span>Lihat Bahan & Cara Masak</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
