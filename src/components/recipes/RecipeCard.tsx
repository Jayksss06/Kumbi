import React from 'react';
import { Recipe } from '../../types';
import { getTuberImage } from '../../lib/tuber-assets';
import { sound } from '../../lib/sound-effects';
import { Clock, Star, Users, Flame, ShieldAlert, Sparkles, ChefHat, ArrowRight } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onOpenDetail: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onOpenDetail }) => {
  const getTuberBadge = () => {
    switch (recipe.tuberSlug) {
      case 'singkong':
        return (
          <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
            Singkong {recipe.usesMocaf ? '(Mocaf)' : ''}
          </span>
        );
      case 'ubi-jalar':
        return (
          <span className="bg-orange-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
            Ubi Jalar
          </span>
        );
      case 'talas':
        return (
          <span className="bg-purple-700/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
            Talas Bogor
          </span>
        );
      default:
        return (
          <span className="bg-stone-800/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
            Umbi Lokal
          </span>
        );
    }
  };

  const getAgeLabel = (cat: string) => {
    switch (cat) {
      case 'MPASI_6_8': return '6-8 Bulan';
      case 'MPASI_9_11': return '9-11 Bulan';
      case 'MPASI_12_23': return '12-23 Bulan';
      case 'BALITA_2_5': return '2-5 Tahun';
      case 'PMT_KUDAPAN': return 'Kudapan PMT';
      default: return 'Balita';
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
    <div className="card-lift bg-white rounded-3xl border border-brand-border/80 shadow-sm overflow-hidden flex flex-col justify-between group transition-all">
      
      <div>
        {/* Visual Image Thumbnail Header */}
        <div 
          onClick={handleClick}
          className="relative h-44 overflow-hidden bg-stone-100 cursor-pointer"
        >
          <img 
            src={getTuberImage(recipe.tuberSlug)} 
            alt={recipe.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
            <div className="flex items-center gap-1.5 flex-wrap">
              {getTuberBadge()}
              <span className="bg-white/90 backdrop-blur-md text-stone-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                {getAgeLabel(recipe.ageCategory)}
              </span>
            </div>
            <span className="text-[11px] font-mono font-black text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20">
              {recipe.recipeCode}
            </span>
          </div>

          {/* Cooking Time Overlay Pill */}
          <div className="absolute bottom-2.5 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-300" />
            <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} mnt • {recipe.cookingMethod}</span>
          </div>

          {/* Rating Overlay Pill */}
          <div className="absolute bottom-2.5 right-3 bg-white/90 backdrop-blur-md text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{recipe.avgLahapRating}</span>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="p-5 pb-3">
          <h3 
            onClick={handleClick}
            className="text-base sm:text-lg font-black text-stone-900 group-hover:text-brand-orange transition-colors cursor-pointer line-clamp-2"
          >
            {recipe.title}
          </h3>

          <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
            {recipe.shortDescription}
          </p>
        </div>

        {/* Nutritional Highlights */}
        <div className="px-5 py-2.5 bg-brand-cream/70 border-y border-brand-border/60">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span className="text-[10px] text-stone-500 block">Kalori</span>
              <span className="font-black text-brand-green">{recipe.caloriesPerPortion} kkal</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block">Protein</span>
              <span className="font-black text-brand-orange">{recipe.proteinGPerPortion} g</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block">Karbo</span>
              <span className="font-black text-stone-800">{recipe.carbsGPerPortion} g</span>
            </div>
          </div>
        </div>

        {/* Protein Pairing Highlight Badge */}
        {proteinIng && (
          <div className="px-5 py-2 text-xs text-emerald-950 bg-emerald-50/80 flex items-center gap-1.5 border-b border-emerald-100">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">
              Lauk Wajib: <strong>{proteinIng.ingredientName}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Card Footer: Action Button */}
      <div className="p-5 pt-3">
        <button
          onClick={handleClick}
          className="btn-press w-full py-2.5 bg-brand-green hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 min-h-[44px]"
        >
          <ChefHat className="w-4 h-4" />
          <span>Lihat Resep & Mode Masak</span>
          <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

    </div>
  );
};
