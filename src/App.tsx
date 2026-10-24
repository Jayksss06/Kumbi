import React, { useState, useEffect } from 'react';
import { 
  Recipe, 
  PmtSchedule, 
  Review, 
  User, 
  PosyanduPartner,
  AgeCategory,
  TuberSlug 
} from './types';
import { 
  initializeStorage, 
  getCurrentUser, 
  getStoredRecipes, 
  getStoredSchedules, 
  getStoredReviews 
} from './lib/storage-sync';
import { POSYANDU_PARTNERS_DATA } from './data/scientific-seed-data';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';

// Views
import { HomeView } from './views/HomeView';
import { TuberEduView } from './views/TuberEduView';
import { NutritionCalcView } from './views/NutritionCalcView';
import { RecipesCatalogView } from './views/RecipesCatalogView';
import { QuizMythView } from './views/QuizMythView';
import { KaderDashboardView } from './views/KaderDashboardView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { PmtAccessModal } from './views/PmtAccessModal';

// Modals & Action Components
import { InteractiveCookingMode } from './components/recipes/InteractiveCookingMode';
import { PrintableRecipeSheet } from './components/recipes/PrintableRecipeSheet';
import { MejaEmpatPresenter } from './components/posyandu/MejaEmpatPresenter';
import { WaShareModal } from './components/posyandu/WaShareModal';
import { QrLabelSheetGenerator } from './components/posyandu/QrLabelSheetGenerator';

export function App() {
  // Initialize storage once on mount
  useEffect(() => {
    initializeStorage();
  }, []);

  const [currentUser, setCurrentUser] = useState<User>(getCurrentUser());
  const [recipes, setRecipes] = useState<Recipe[]>(getStoredRecipes());
  const [schedules, setSchedules] = useState<PmtSchedule[]>(getStoredSchedules());
  const [reviews, setReviews] = useState<Review[]>(getStoredReviews());

  // Navigation State
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [printPortions, setPrintPortions] = useState<number>(2);

  // Filters passed from other views
  const [catalogTuberFilter, setCatalogTuberFilter] = useState<string>('all');
  const [catalogAgeFilter, setCatalogAgeFilter] = useState<string>('all');

  // Modals State
  const [isQuickPmtOpen, setIsQuickPmtOpen] = useState<boolean>(false);
  const [isMejaEmpatOpen, setIsMejaEmpatOpen] = useState<boolean>(false);
  const [isPrintRecipeOpen, setIsPrintRecipeOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeWaSchedule, setActiveWaSchedule] = useState<{ schedule: PmtSchedule; recipe: Recipe } | null>(null);
  const [activeQrLabelSchedule, setActiveQrLabelSchedule] = useState<{ schedule: PmtSchedule; recipe: Recipe } | null>(null);

  // Refresh data handler
  const handleRefreshData = () => {
    setRecipes(getStoredRecipes());
    setSchedules(getStoredSchedules());
    setReviews(getStoredReviews());
  };

  // Sync with storage custom events
  useEffect(() => {
    const handleAuthChange = () => setCurrentUser(getCurrentUser());
    const handleRecipesChange = () => setRecipes(getStoredRecipes());
    const handleSchedulesChange = () => setSchedules(getStoredSchedules());
    const handleReviewsChange = () => setReviews(getStoredReviews());

    window.addEventListener('umbicare_auth_changed', handleAuthChange);
    window.addEventListener('umbicare_recipes_updated', handleRecipesChange);
    window.addEventListener('umbicare_schedules_updated', handleSchedulesChange);
    window.addEventListener('umbicare_reviews_updated', handleReviewsChange);

    return () => {
      window.removeEventListener('umbicare_auth_changed', handleAuthChange);
      window.removeEventListener('umbicare_recipes_updated', handleRecipesChange);
      window.removeEventListener('umbicare_schedules_updated', handleSchedulesChange);
      window.removeEventListener('umbicare_reviews_updated', handleReviewsChange);
    };
  }, []);

  // Handle URL hash changes for direct linking (e.g. #resep-bubur-tim-talas or #pmt-UMBI-01)
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
      } else if (hash.startsWith('#pmt-')) {
        const code = hash.replace('#pmt-', '');
        const target = recipes.find(r => r.recipeCode.toLowerCase() === code.toLowerCase());
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

  // Posyandu partner for current user
  const currentPosyandu: PosyanduPartner = POSYANDU_PARTNERS_DATA.find(
    p => p.id === currentUser.posyanduId
  ) || POSYANDU_PARTNERS_DATA[0];

  // Open recipe detail view
  const handleOpenRecipeDetail = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('resep-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open quick PMT code box
  const handleOpenQuickPmtCode = (code: string) => {
    const target = recipes.find(
      r => r.recipeCode.toUpperCase() === code.toUpperCase() ||
           r.recipeCode.toUpperCase().includes(code.toUpperCase())
    );
    if (target) {
      handleOpenRecipeDetail(target);
    } else {
      setIsQuickPmtOpen(true);
    }
  };

  // Navigate to catalog with preset filters
  const handleNavigateToRecipesWithFilter = (tuber?: string, age?: string) => {
    if (tuber) setCatalogTuberFilter(tuber);
    if (age) setCatalogAgeFilter(age);
    setCurrentView('resep');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-stone-800 font-sans">
      
      {/* 1. Global Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          setIsMobileMenuOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onUserChange={setCurrentUser}
        onOpenQuickPmt={() => setIsQuickPmtOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-28 lg:pb-12">
        
        {/* VIEW: HOME */}
        {currentView === 'home' && (
          <HomeView
            recipes={recipes}
            onOpenRecipe={handleOpenRecipeDetail}
            onNavigate={setCurrentView}
            onOpenQuickPmtCode={handleOpenQuickPmtCode}
          />
        )}

        {/* VIEW: EDUKASI 3 UMBI */}
        {currentView === 'edukasi' && (
          <TuberEduView />
        )}

        {/* VIEW: KALKULATOR GIZI & PIRING SEIMBANG */}
        {currentView === 'kalkulator' && (
          <NutritionCalcView
            onNavigateToRecipesWithFilter={handleNavigateToRecipesWithFilter}
          />
        )}

        {/* VIEW: KATALOG RESEP */}
        {currentView === 'resep' && (
          <RecipesCatalogView
            recipes={recipes}
            onOpenRecipe={handleOpenRecipeDetail}
            initialTuberFilter={catalogTuberFilter}
            initialAgeFilter={catalogAgeFilter}
          />
        )}

        {/* VIEW: DETAIL RESEP & INTERACTIVE COOKING MODE */}
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

        {/* VIEW: KUIS & MITOS FAKTA */}
        {currentView === 'kuis' && (
          <QuizMythView />
        )}

        {/* VIEW: RUANG KADER POSYANDU */}
        {currentView === 'kader-dashboard' && (
          <KaderDashboardView
            schedules={schedules}
            recipes={recipes}
            posyandu={currentPosyandu}
            reviews={reviews}
            onRefresh={handleRefreshData}
            onOpenMejaEmpat={() => setIsMejaEmpatOpen(true)}
            onOpenWaShare={(schedule, recipe) => setActiveWaSchedule({ schedule, recipe })}
            onOpenQrLabels={(schedule, recipe) => setActiveQrLabelSchedule({ schedule, recipe })}
          />
        )}

        {/* VIEW: ADMIN / FASILITATOR AKADEMIK */}
        {currentView === 'admin-dashboard' && (
          <AdminDashboardView
            recipes={recipes}
            schedules={schedules}
            reviews={reviews}
            onRefresh={handleRefreshData}
            onOpenRecipe={handleOpenRecipeDetail}
          />
        )}

      </main>

      {/* 3. Global Footer */}
      <Footer />

      {/* 4. Mobile Bottom Navigation Bar */}
      <BottomNav
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          setIsMobileMenuOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        userRole={currentUser.role}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* 5. MODALS & POP-UPS */}

      {/* A. Quick PMT Box Access Modal */}
      {isQuickPmtOpen && (
        <PmtAccessModal
          recipes={recipes}
          onSelectRecipe={handleOpenRecipeDetail}
          onClose={() => setIsQuickPmtOpen(false)}
        />
      )}

      {/* B. Meja 4 Presentation View (Fullscreen) */}
      {isMejaEmpatOpen && (
        <MejaEmpatPresenter
          onClose={() => setIsMejaEmpatOpen(false)}
        />
      )}

      {/* C. Printable Recipe Card (1-Page A4) */}
      {isPrintRecipeOpen && selectedRecipe && (
        <PrintableRecipeSheet
          recipe={selectedRecipe}
          portions={printPortions}
          onClose={() => setIsPrintRecipeOpen(false)}
        />
      )}

      {/* D. WhatsApp PMT Announcement Modal */}
      {activeWaSchedule && (
        <WaShareModal
          schedule={activeWaSchedule.schedule}
          recipe={activeWaSchedule.recipe}
          posyandu={currentPosyandu}
          onClose={() => setActiveWaSchedule(null)}
        />
      )}

      {/* E. PMT Box QR Sticker Label Sheet (Grid 8) */}
      {activeQrLabelSchedule && (
        <QrLabelSheetGenerator
          schedule={activeQrLabelSchedule.schedule}
          recipe={activeQrLabelSchedule.recipe}
          posyandu={currentPosyandu}
          labelCount={8}
          onClose={() => setActiveQrLabelSchedule(null)}
        />
      )}

    </div>
  );
}

export default App;
