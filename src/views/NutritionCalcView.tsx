import React from 'react';
import { RiceToTuberCalc } from '../components/calculator/RiceToTuberCalc';
import { Calculator } from 'lucide-react';

interface NutritionCalcViewProps {
  onNavigateToRecipesWithFilter?: (tuber?: string, age?: string) => void;
}

export const NutritionCalcView: React.FC<NutritionCalcViewProps> = ({
  onNavigateToRecipesWithFilter
}) => {
  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      
      {/* Header View */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-10 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-green/10 text-brand-green rounded-full text-xs sm:text-sm font-bold">
          <Calculator className="w-4 h-4" />
          <span>Kalkulator Gizi</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
          Hitung Takaran Umbi Pengganti Nasi & Lauk Protein
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          Kalkulator praktis untuk membantu Bunda dan kader Posyandu menentukan berapa banyak <strong>Ubi Jalar, Singkong, atau Talas</strong> yang setara dengan porsi nasi anak, lengkap dengan takaran lauk protein hewaninya.
        </p>
      </div>

      {/* Main Calculator */}
      <RiceToTuberCalc
        onSelectRecipeByTuber={(tuberSlug) => {
          if (onNavigateToRecipesWithFilter) {
            onNavigateToRecipesWithFilter(tuberSlug);
          }
        }}
      />

    </div>
  );
};
