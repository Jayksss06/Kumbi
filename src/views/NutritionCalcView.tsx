import React, { useState } from 'react';
import { RiceToTuberCalc } from '../components/calculator/RiceToTuberCalc';
import { BalancedPlateSimulator } from '../components/calculator/BalancedPlateSimulator';
import { AgeCategory, TuberSlug, Recipe } from '../types';
import { Calculator, PieChart, Scale, Sparkles } from 'lucide-react';

interface NutritionCalcViewProps {
  onNavigateToRecipesWithFilter?: (tuber?: string, age?: string) => void;
}

export const NutritionCalcView: React.FC<NutritionCalcViewProps> = ({
  onNavigateToRecipesWithFilter
}) => {
  const [activeTab, setActiveTab] = useState<'portion' | 'plate'>('portion');

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header View */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs font-bold">
          <Calculator className="w-3.5 h-3.5" />
          <span>Smart Portion & Nutrition Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Pusat Kalkulator Gizi & Piring Seimbang
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Dua kalkulator cerdas untuk membantu ibu balita dan kader Posyandu menentukan takaran porsi pengganti nasi serta paduan protein hewani yang tepat.
        </p>

        {/* Tab Switcher Buttons */}
        <div className="inline-flex items-center gap-2 p-1.5 bg-brand-cream rounded-2xl border border-brand-border mt-2">
          <button
            onClick={() => setActiveTab('portion')}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'portion'
                ? 'bg-brand-green text-white shadow-md'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Kalkulator Penukar Porsi Nasi</span>
          </button>

          <button
            onClick={() => setActiveTab('plate')}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'plate'
                ? 'bg-brand-orange text-white shadow-md'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <PieChart className="w-4 h-4" />
            <span>Simulator Piring Seimbang</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Portion Converter */}
      {activeTab === 'portion' && (
        <RiceToTuberCalc
          onSelectRecipeByTuber={(tuberSlug) => {
            if (onNavigateToRecipesWithFilter) {
              onNavigateToRecipesWithFilter(tuberSlug);
            }
          }}
        />
      )}

      {/* Tab 2: Balanced Plate Simulator */}
      {activeTab === 'plate' && (
        <BalancedPlateSimulator
          onSelectRecipeByAgeOrTuber={(ageCategory, tuberSlug) => {
            if (onNavigateToRecipesWithFilter) {
              onNavigateToRecipesWithFilter(tuberSlug, ageCategory);
            }
          }}
        />
      )}

    </div>
  );
};
