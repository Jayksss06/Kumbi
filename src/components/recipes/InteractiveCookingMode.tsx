import React, { useState, useEffect } from 'react';
import { 
  Recipe, 
  Review, 
  ScaledIngredientItem 
} from '../../types';
import { 
  getCookingChecklist, 
  saveCookingChecklist, 
  clearCookingChecklist, 
  getStoredReviews, 
  addReview 
} from '../../lib/storage-sync';
import { buildMotherRecipeShareUrl } from '../../lib/whatsapp-builder';
import { getTuberImage } from '../../lib/tuber-assets';
import { sound } from '../../lib/sound-effects';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Star, 
  ShieldAlert, 
  CheckSquare, 
  Square, 
  Share2, 
  Printer, 
  RotateCcw, 
  ChefHat, 
  Heart, 
  Send, 
  Sparkles,
  Info,
  Play,
  Pause,
  Bell,
  Volume2,
  VolumeX,
  Flame,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InteractiveCookingModeProps {
  recipe: Recipe;
  onBack: () => void;
  onOpenPrint: (recipe: Recipe, portions: number) => void;
}

export const InteractiveCookingMode: React.FC<InteractiveCookingModeProps> = ({
  recipe,
  onBack,
  onOpenPrint
}) => {
  // Local portion adjustment state (default to basePortions, e.g. 2 or 4)
  const [portions, setPortions] = useState<number>(recipe.basePortions || 2);
  const scale = portions / (recipe.basePortions || 2);

  // Checklist state loaded from localStorage
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  // Interactive Kitchen Timer state
  const [activeTimerStep, setActiveTimerStep] = useState<number | null>(null);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Reviews list
  const [reviews, setReviews] = useState<Review[]>([]);
  const [motherName, setMotherName] = useState<string>('');
  const [childAgeMonths, setChildAgeMonths] = useState<number>(12);
  const [lahapRating, setLahapRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [hasRecooked, setHasRecooked] = useState<boolean>(true);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);
  const [reviewSubmittedSuccess, setReviewSubmittedSuccess] = useState<boolean>(false);

  // Load checklist and reviews on mount
  useEffect(() => {
    const saved = getCookingChecklist(recipe.id);
    if (saved) {
      setCheckedIngredients(saved.checkedIngredientIds || []);
      setCheckedSteps(saved.checkedStepNumbers || []);
      if (saved.targetPortions) setPortions(saved.targetPortions);
    }

    const allReviews = getStoredReviews();
    setReviews(allReviews.filter(r => r.recipeId === recipe.id && r.isApproved));
  }, [recipe.id]);

  // Save checklist to localStorage on changes
  useEffect(() => {
    saveCookingChecklist({
      recipeId: recipe.id,
      checkedIngredientIds: checkedIngredients,
      checkedStepNumbers: checkedSteps,
      targetPortions: portions,
      lastUpdated: new Date().toISOString()
    });
  }, [checkedIngredients, checkedSteps, portions, recipe.id]);

  // Timer countdown effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (isTimerRunning && timerSecondsLeft === 0) {
      setIsTimerRunning(false);
      sound.playTimerBell();
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      } catch {}
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSecondsLeft]);

  const handleStartTimer = (stepNumber: number, minutes: number) => {
    sound.playClick();
    setActiveTimerStep(stepNumber);
    setTimerSecondsLeft(minutes * 60);
    setIsTimerRunning(true);
  };

  const handleToggleTimer = () => {
    sound.playClick();
    setIsTimerRunning(!isTimerRunning);
  };

  const handleResetTimer = () => {
    sound.playClick();
    setIsTimerRunning(false);
    setTimerSecondsLeft(0);
    setActiveTimerStep(null);
  };

  // Toggle ingredient checkbox
  const toggleIngredient = (id: string) => {
    sound.playClick();
    if (checkedIngredients.includes(id)) {
      setCheckedIngredients(checkedIngredients.filter(i => i !== id));
    } else {
      setCheckedIngredients([...checkedIngredients, id]);
    }
  };

  // Toggle step checkbox with haptic/chime
  const toggleStep = (stepNumber: number) => {
    if (checkedSteps.includes(stepNumber)) {
      sound.playClick();
      setCheckedSteps(checkedSteps.filter(s => s !== stepNumber));
    } else {
      sound.playCheck();
      const nextSteps = [...checkedSteps, stepNumber];
      setCheckedSteps(nextSteps);

      // Trigger celebration if all steps are completed!
      if (nextSteps.length === recipe.steps.length) {
        sound.playSuccess();
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    }
  };

  const handleResetChecklist = () => {
    sound.playClick();
    if (window.confirm('Reset semua centang bahan dan langkah masak untuk resep ini?')) {
      setCheckedIngredients([]);
      setCheckedSteps([]);
      clearCookingChecklist(recipe.id);
    }
  };

  // Handle Share WhatsApp
  const handleShareWa = () => {
    sound.playClick();
    const url = buildMotherRecipeShareUrl(recipe, portions);
    window.open(url, '_blank');
  };

  // Submit Review with anti double-tap debounce
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!motherName.trim() || !reviewComment.trim()) {
      alert('Mohon lengkapi Nama Bunda dan komentar pengalaman memasak.');
      return;
    }
    if (isSubmittingReview) return; // Prevent double submit

    setIsSubmittingReview(true);
    sound.playClick();

    setTimeout(() => {
      const created = addReview({
        recipeId: recipe.id,
        posyanduId: recipe.posyanduId,
        motherName: motherName.trim(),
        childAgeMonths: Number(childAgeMonths),
        lahapRating,
        hasRecookedAtHome: hasRecooked,
        comment: reviewComment.trim()
      });

      setReviews([created, ...reviews]);
      setIsSubmittingReview(false);
      setReviewSubmittedSuccess(true);
      setReviewComment('');
      sound.playSuccess();

      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
      } catch {}
    }, 400);
  };

  // Progress Bar Calculation
  const totalTasks = recipe.ingredients.length + recipe.steps.length;
  const completedTasks = checkedIngredients.length + checkedSteps.length;
  const progressPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Format seconds to mm:ss
  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16 animate-fade-in">
      
      {/* Top Bar with Back Button & Action Controls */}
      <div className="flex items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-brand-border shadow-soft">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-stone-700 bg-brand-cream hover:bg-brand-subtle rounded-2xl border border-brand-border min-h-[48px] btn-press"
        >
          <ArrowLeft className="w-4 h-4 text-brand-green" />
          <span>Kembali ke Katalog</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareWa}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md min-h-[48px] btn-press"
            title="Bagikan ke WhatsApp"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Bagikan WA</span>
          </button>

          <button
            onClick={() => onOpenPrint(recipe, portions)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl text-xs font-bold transition-all shadow-md min-h-[48px] btn-press"
            title="Cetak Kartu Resep 1 Halaman"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Cetak Kartu</span>
          </button>
        </div>
      </div>

      {/* Main Recipe Header Banner with Authentic Tuber Art */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-9 shadow-soft space-y-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {recipe.tuberSlug.toUpperCase()}
              </span>
              <span className="bg-brand-cream text-stone-700 border border-brand-border text-xs font-bold px-3 py-1 rounded-full">
                {recipe.ageCategory.replace('_', ' ')}
              </span>
              <span className="bg-stone-100 text-stone-600 text-xs font-mono font-bold px-2.5 py-1 rounded-md border border-stone-200">
                {recipe.recipeCode}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
              {recipe.title}
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
              {recipe.shortDescription}
            </p>
          </div>

          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-brand-cream p-2 shrink-0 border-2 border-brand-border shadow-inner self-center md:self-auto flex items-center justify-center">
            <img
              src={getTuberImage(recipe.tuberSlug)}
              alt={recipe.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Nutrition Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-brand-cream/80 p-4 rounded-2xl border border-brand-border">
          <div className="text-center">
            <span className="text-[11px] text-stone-500 font-bold block">Kalori per Porsi</span>
            <span className="text-xl font-black text-brand-green">{recipe.caloriesPerPortion} kkal</span>
          </div>
          <div className="text-center">
            <span className="text-[11px] text-stone-500 font-bold block">Protein Lengkap</span>
            <span className="text-xl font-black text-brand-orange">{recipe.proteinGPerPortion} g</span>
          </div>
          <div className="text-center">
            <span className="text-[11px] text-stone-500 font-bold block">Karbohidrat</span>
            <span className="text-xl font-black text-stone-800">{recipe.carbsGPerPortion} g</span>
          </div>
          <div className="text-center">
            <span className="text-[11px] text-stone-500 font-bold block">Serat Pangan</span>
            <span className="text-xl font-black text-emerald-700">{recipe.fiberGPerPortion} g</span>
          </div>
        </div>

        {/* Micronutrient Highlights */}
        <div className="flex items-center gap-2 p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Keunggulan Gizi: <strong>{recipe.micronutrientHighlights}</strong></span>
        </div>

        {/* Food Safety Alert Banner */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border-2 border-amber-300 text-xs text-amber-950">
          <ShieldAlert className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
          <div>
            <strong className="block text-sm text-amber-900 mb-0.5">Peringatan Keamanan Pangan Anak:</strong>
            <span className="leading-relaxed">{recipe.safetyWarningBanner}</span>
          </div>
        </div>

      </div>

      {/* Cooking Progress Bar & Kitchen Mode Status */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md p-5 rounded-3xl border-2 border-brand-green/30 shadow-lg space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-stone-800">
          <span className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-brand-green" />
            <span className="text-sm font-black">Mode Masak Dapur: {progressPct}% Selesai</span>
          </span>
          <span className="text-brand-orange font-mono text-xs">
            {completedTasks} dari {totalTasks} selesai
          </span>
        </div>

        <div className="w-full bg-stone-100 rounded-full h-3.5 overflow-hidden border border-brand-border">
          <div 
            className="bg-gradient-to-r from-brand-orange to-brand-green h-full rounded-full transition-all duration-300 progress-striped"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="flex justify-between items-center pt-1 text-[11px] text-stone-500 font-medium">
          <span>Tersimpan otomatis di browser (layar mati / refresh centang tetap aman)</span>
          <button
            onClick={handleResetChecklist}
            className="text-stone-500 hover:text-stone-900 flex items-center gap-1 underline font-bold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Centang</span>
          </button>
        </div>
      </div>

      {/* Dynamic Portion Adjuster */}
      <div className="bg-brand-cream p-5 sm:p-6 rounded-3xl border border-brand-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
            Pengatur Jumlah Porsi Masak
          </span>
          <p className="text-xs text-stone-600 mt-0.5">
            Sesuaikan porsi untuk keluarga, takaran gram & URT otomatis terhitung secara instan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white rounded-2xl border border-brand-border p-1 shadow-sm">
            <button
              onClick={() => { sound.playClick(); setPortions(Math.max(1, portions - 1)); }}
              className="w-11 h-11 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-black text-xl flex items-center justify-center btn-press"
            >
              -
            </button>
            <span className="w-16 text-center font-black text-lg text-brand-green">
              {portions} <span className="text-[10px] font-bold text-stone-400 block -mt-1">Porsi</span>
            </span>
            <button
              onClick={() => { sound.playClick(); setPortions(Math.min(50, portions + 1)); }}
              className="w-11 h-11 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-black text-xl flex items-center justify-center btn-press"
            >
              +
            </button>
          </div>

          <div className="hidden sm:flex gap-1.5">
            {[2, 4, 6, 10].map(p => (
              <button
                key={p}
                onClick={() => { sound.playClick(); setPortions(p); }}
                className={`px-3 py-2 text-xs font-bold rounded-xl border min-h-[44px] btn-press ${
                  portions === p ? 'bg-brand-green text-white border-brand-green shadow-sm' : 'bg-white text-stone-700 border-brand-border hover:bg-stone-50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section 1: Checklist Bahan-Bahan */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-9 shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b border-brand-border pb-3">
          <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-brand-green" />
            <span>Checklist Bahan Masak ({portions} Porsi)</span>
          </h2>
          <span className="text-xs text-stone-500 font-semibold">Ketuk untuk centang</span>
        </div>

        <div className="divide-y divide-brand-border/60">
          {recipe.ingredients.map(ing => {
            const isChecked = checkedIngredients.includes(ing.id);
            const scaledGrams = Math.round(ing.weightGrams * scale);
            const scaledQty = Number((ing.householdQty * scale).toFixed(1));

            return (
              <div
                key={ing.id}
                onClick={() => toggleIngredient(ing.id)}
                className={`py-3.5 px-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all min-h-[52px] ${
                  isChecked ? 'bg-emerald-50/70 text-stone-400 opacity-60' : 'hover:bg-brand-cream/60 text-stone-800'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="shrink-0 text-brand-green">
                    {isChecked ? (
                      <CheckSquare className="w-6 h-6 text-emerald-600 fill-emerald-100 animate-pop" />
                    ) : (
                      <Square className="w-6 h-6 text-stone-400" />
                    )}
                  </div>
                  <div>
                    <span className={`text-sm sm:text-base font-bold ${isChecked ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                      {ing.ingredientName}
                    </span>
                    {ing.preparationNote && (
                      <span className="block text-xs text-stone-500 italic">
                        {ing.preparationNote}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-sm sm:text-base font-black block ${isChecked ? 'text-stone-400' : 'text-brand-orange'}`}>
                    {scaledGrams >= 1000 ? `${(scaledGrams / 1000).toFixed(2).replace('.', ',')} kg` : `${scaledGrams} g`}
                  </span>
                  <span className="text-xs text-stone-500 font-semibold">
                    {scaledQty} {ing.householdUnit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Panduan Langkah Memasak Interaktif dengan Kitchen Timer */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-9 shadow-soft space-y-6">
        <div className="flex items-center justify-between border-b border-brand-border pb-3">
          <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-brand-orange" />
            <span>Langkah demi Langkah Memasak</span>
          </h2>
          <span className="text-xs text-stone-500 font-semibold">Ketuk saat langkah selesai</span>
        </div>

        <div className="space-y-4">
          {recipe.steps.map(step => {
            const isChecked = checkedSteps.includes(step.stepNumber);
            const isTimerActiveForStep = activeTimerStep === step.stepNumber;

            return (
              <div
                key={step.stepNumber}
                className={`p-5 sm:p-6 rounded-3xl border-2 transition-all min-h-[64px] ${
                  isChecked
                    ? 'bg-stone-50 border-stone-200 opacity-60'
                    : step.isCriticalSafetyStep
                    ? 'bg-amber-50/70 border-amber-400 shadow-md'
                    : 'bg-white border-brand-border hover:border-brand-green/40 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  
                  {/* Step Checkbox button */}
                  <button
                    type="button"
                    onClick={() => toggleStep(step.stepNumber)}
                    className="shrink-0 mt-0.5 btn-press"
                    aria-label={`Tandai langkah ${step.stepNumber} selesai`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-7 h-7 text-emerald-600 fill-emerald-100 animate-pop" />
                    ) : (
                      <span className={`w-7 h-7 rounded-full font-black text-xs flex items-center justify-center text-white shadow-sm ${
                        step.isCriticalSafetyStep ? 'bg-amber-600' : 'bg-brand-green'
                      }`}>
                        {step.stepNumber}
                      </span>
                    )}
                  </button>

                  <div className="flex-1 space-y-2">
                    {step.isCriticalSafetyStep && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/90 px-3 py-1 rounded-md mb-1 border border-amber-300">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-900 shrink-0" />
                        Langkah Keamanan Kritis Wajib (Anti-Gatal / Sianida)
                      </span>
                    )}

                    <p 
                      onClick={() => toggleStep(step.stepNumber)}
                      className={`text-sm sm:text-base leading-relaxed cursor-pointer ${
                        isChecked ? 'line-through text-stone-400' : 'text-stone-900 font-medium'
                      }`}
                    >
                      {step.instruction}
                    </p>

                    {/* Step Timer Feature */}
                    {step.durationMinutes && (
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        {!isTimerActiveForStep ? (
                          <button
                            type="button"
                            onClick={() => handleStartTimer(step.stepNumber, step.durationMinutes || 15)}
                            className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 btn-press border border-stone-300"
                          >
                            <Play className="w-3.5 h-3.5 text-brand-orange" />
                            <span>Mulai Timer {step.durationMinutes} Menit</span>
                          </button>
                        ) : (
                          <div className="p-2.5 bg-brand-dark text-white rounded-2xl flex items-center gap-3 shadow-md border border-stone-700 animate-fade-in">
                            <Bell className={`w-4 h-4 text-amber-400 ${isTimerRunning ? 'animate-wiggle' : ''}`} />
                            <span className="font-mono text-base font-black tracking-wider text-amber-300">
                              {formatTimer(timerSecondsLeft)}
                            </span>
                            <button
                              type="button"
                              onClick={handleToggleTimer}
                              className="px-2.5 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold text-white"
                            >
                              {isTimerRunning ? 'Jeda' : 'Lanjut'}
                            </button>
                            <button
                              type="button"
                              onClick={handleResetTimer}
                              className="px-2.5 py-1 bg-rose-600/80 hover:bg-rose-600 rounded-lg text-xs font-bold text-white"
                            >
                              Reset
                            </button>
                          </div>
                        )}

                        <span className="text-xs text-stone-400 font-medium">
                          Estimasi: {step.durationMinutes} menit
                        </span>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Age Texture Guide Pop-up / Alert Box */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-3xl border-2 border-emerald-300 text-xs space-y-2 shadow-sm">
        <h4 className="text-sm sm:text-base font-black text-emerald-950 flex items-center gap-2">
          <Info className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>Panduan Penyesuaian Tekstur Sesuai Usia Balita:</span>
        </h4>
        <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
          {recipe.textureGuideByAge}
        </p>
        <p className="text-[11px] text-stone-600 font-medium pt-1 border-t border-emerald-200/50">
          <strong>Rekomendasi Praktis:</strong> Jika Bunda memiliki dua balita usia berbeda di rumah, sebagian olahan umbi dapat disaring lembut untuk si adik (6-8 bulan), dan sisanya dibentuk padat/finger food untuk si kakak (2-5 tahun).
        </p>
      </div>

      {/* Section 3: Ulasan & Rating "Anak Lahap" */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-9 shadow-soft space-y-6">
        <div className="flex items-center justify-between border-b border-brand-border pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-100" />
              <span>Tingkat Kepuasan & Ulasan "Anak Lahap"</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5 font-medium">
              Rata-rata <strong>{recipe.avgLahapRating} dari 5 bintang</strong> ({reviews.length} ulasan dari para ibu balita)
            </p>
          </div>
        </div>

        {/* Submit Review Form */}
        <form onSubmit={handleSubmitReview} className="bg-brand-cream/80 p-6 rounded-3xl border border-brand-border space-y-4">
          <h3 className="text-sm font-bold text-stone-900">
            Kirimkan Pengalaman Bunda Memasak Menu Ini:
          </h3>

          {reviewSubmittedSuccess && (
            <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-xs text-emerald-900 font-bold flex items-center gap-2 animate-fade-in-up">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Terima kasih Bunda! Ulasan Bunda berhasil dicatat dan membantu kader Posyandu mengevaluasi menu PMT bulanan.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">Nama Bunda / Inisial</label>
              <input
                type="text"
                required
                value={motherName}
                onChange={e => setMotherName(e.target.value)}
                placeholder="Contoh: Bunda Fitri"
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-brand-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">Usia Anak (Bulan)</label>
              <input
                type="number"
                min="6"
                max="60"
                required
                value={childAgeMonths}
                onChange={e => setChildAgeMonths(parseInt(e.target.value) || 12)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-brand-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">
                Tingkat Anak Lahap: {lahapRating} Bintang
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => { sound.playClick(); setLahapRating(star); }}
                    className="p-1 hover:scale-125 transition-transform"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= (hoverRating || lahapRating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">Apakah Sudah Masak di Rumah?</label>
              <div className="flex gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => { sound.playClick(); setHasRecooked(true); }}
                  className={`px-3.5 py-2 rounded-xl border btn-press ${
                    hasRecooked ? 'bg-brand-green text-white border-brand-green font-bold shadow-sm' : 'bg-white text-stone-600'
                  }`}
                >
                  Sudah Masak Sendiri
                </button>
                <button
                  type="button"
                  onClick={() => { sound.playClick(); setHasRecooked(false); }}
                  className={`px-3.5 py-2 rounded-xl border btn-press ${
                    !hasRecooked ? 'bg-brand-green text-white border-brand-green font-bold shadow-sm' : 'bg-white text-stone-600'
                  }`}
                >
                  Coba dari PMT Posyandu
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-600 block mb-1">Ulasan / Respon si Kecil</label>
            <textarea
              required
              rows={2}
              value={reviewComment}
              onChange={e => setReviewComment(e.target.value)}
              placeholder="Ceritakan apakah anak lahap, teksturnya pas, atau tips praktis Bunda saat memasak..."
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-brand-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmittingReview}
            className="w-full py-3 bg-brand-orange hover:bg-orange-700 text-white rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 min-h-[48px] btn-press"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmittingReview ? 'Mengirimkan Ulasan...' : 'Kirim Ulasan Anak Lahap'}</span>
          </button>
        </form>

        {/* Reviews Feed List */}
        <div className="space-y-3">
          {reviews.length === 0 ? (
            <p className="text-xs text-stone-400 text-center py-4">Belum ada ulasan untuk resep ini. Jadilah yang pertama memberikan ulasan!</p>
          ) : (
            reviews.map(rev => (
              <div key={rev.id} className="p-4 rounded-2xl bg-stone-50 border border-brand-border/70 space-y-1.5 card-lift">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{rev.motherName}</span>
                    <span className="text-[11px] text-stone-400">(Anak usia {rev.childAgeMonths} bln)</span>
                    {rev.hasRecookedAtHome && (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Recook di Rumah
                      </span>
                    )}
                  </div>
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.lahapRating }).map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-medium">"{rev.comment}"</p>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
};
