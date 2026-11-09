import React, { useState, useEffect } from 'react';
import { Recipe } from './types';
import { 
  initializeStorage, 
  getStoredRecipes,
  syncRecipesFromSupabase
} from './lib/storage-sync';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';

// Core Views (Sesuai 4 Fitur Utama Poster Kumbi)
import { HomeView } from './views/HomeView';
import { TuberEduView } from './views/TuberEduView';
import { NutritionInfoView } from './views/NutritionInfoView';
import { NutritionCalcView } from './views/NutritionCalcView';
import { RecipesCatalogView } from './views/RecipesCatalogView';

// Detail & Print Sheet
import { InteractiveCookingMode } from './components/recipes/InteractiveCookingMode';
import { PrintableRecipeSheet } from './components/recipes/PrintableRecipeSheet';

export function App() {
  useEffect(() => {
    initializeStorage();
    syncRecipesFromSupabase().then((latestRecipes) => {
      if (latestRecipes && latestRecipes.length > 0) {
        setRecipes(latestRecipes);
      }
    });
  }, []);

  const [recipes, setRecipes] = useState<Recipe[]>(getStoredRecipes());
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [printPortions, setPrintPortions] = useState<number>(2);
  const [isPrintRecipeOpen, setIsPrintRecipeOpen] = useState<boolean>(false);

  // Filters passed when navigating from Edukasi / Kalkulator to Katalog Resep
  const [catalogTuberFilter, setCatalogTuberFilter] = useState<string>('all');
  const [catalogAgeFilter, setCatalogAgeFilter] = useState<string>('all');

  useEffect(() => {
    const handleRecipesChange = () => setRecipes(getStoredRecipes());
    window.addEventListener('umbicare_recipes_updated', handleRecipesChange);
    return () => {
      window.removeEventListener('umbicare_recipes_updated', handleRecipesChange);
    };
  }, []);

  // Support direct recipe link via hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#resep-')) {
        const slug = hash.replace('#resep-', '');
        const target = recipes.find(r => r.slug === slug || r.recipeCode.toLowerCase() === slug.toLowerCase());
        if (target) {
          setSelectedRecipe(target);
          setCurrentView('resep-detail');
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [recipes]);

  const handleNavigate = (view: string) => {
    if (view === 'resep') {
      setCatalogTuberFilter('all');
      setCatalogAgeFilter('all');
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRecipeDetail = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('resep-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToRecipesWithFilter = (tuber?: string, age?: string) => {
    setCatalogTuberFilter(tuber || 'all');
    setCatalogAgeFilter(age || 'all');
    setCurrentView('resep');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-stone-800 font-sans">
      
      {/* 1. Header Navigasi Sederhana */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* 2. Konten Utama */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 pb-24 lg:pb-12">
        
        {/* BERANDA */}
        {currentView === 'home' && (
          <HomeView
            recipes={recipes}
            onOpenRecipe={handleOpenRecipeDetail}
            onNavigate={handleNavigate}
            onNavigateToRecipesWithFilter={(tuber) => handleNavigateToRecipesWithFilter(tuber)}
          />
        )}

        {/* FITUR 1: EDUKASI UMBI */}
        {currentView === 'edukasi' && (
          <TuberEduView
            onNavigate={handleNavigate}
            onSelectTuberRecipes={(tuber) => handleNavigateToRecipesWithFilter(tuber)}
          />
        )}

        {/* FITUR 2: INFORMASI GIZI */}
        {currentView === 'info-gizi' && (
          <NutritionInfoView
            onNavigate={handleNavigate}
          />
        )}

        {/* FITUR 3: KALKULATOR GIZI */}
        {currentView === 'kalkulator' && (
          <NutritionCalcView
            onNavigateToRecipesWithFilter={handleNavigateToRecipesWithFilter}
          />
        )}

        {/* FITUR 4: KATALOG RESEP */}
        {currentView === 'resep' && (
          <RecipesCatalogView
            recipes={recipes}
            onOpenRecipe={handleOpenRecipeDetail}
            initialTuberFilter={catalogTuberFilter}
            initialAgeFilter={catalogAgeFilter}
          />
        )}

        {/* DETAIL RESEP */}
        {currentView === 'resep-detail' && selectedRecipe && (
          <InteractiveCookingMode
            recipe={selectedRecipe}
            onBack={() => setCurrentView('resep')}
            onOpenPrint={(recipe, portions) => {
              setSelectedRecipe(recipe);
              setPrintPortions(portions);
              setIsPrintRecipeOpen(true);
            }}
          />
        )}

      </main>

      {/* 3. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 4. Navigasi Bawah Khusus Layar HP */}
      <BottomNav
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* 5. Cetak Lembar Resep 1 Halaman A4 */}
      {isPrintRecipeOpen && selectedRecipe && (
        <PrintableRecipeSheet
          recipe={selectedRecipe}
          portions={printPortions}
          onClose={() => setIsPrintRecipeOpen(false)}
        />
      )}

    </div>
  );
}

export default App;
