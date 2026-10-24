// LocalStorage Sync & Repository Layer for Kumbi
// Provides offline capability, transactional integrity, and initial seeding

import { 
  Recipe, 
  PmtSchedule, 
  Review, 
  User, 
  PosyanduPartner,
  RecipeStatus,
  PmtScheduleStatus 
} from '../types';
import { 
  RECIPES_DATA, 
  PMT_SCHEDULES_DATA, 
  REVIEWS_DATA, 
  DEMO_USERS, 
  POSYANDU_PARTNERS_DATA 
} from '../data/scientific-seed-data';

const STORAGE_KEYS = {
  RECIPES: 'umbicare_recipes_v1',
  SCHEDULES: 'umbicare_pmt_schedules_v1',
  REVIEWS: 'umbicare_reviews_v1',
  CURRENT_USER: 'umbicare_current_user_v1',
  CHECKLIST_PREFIX: 'umbicare_checklist_',
  LAST_CALC: 'umbicare_last_portion_calc_v1',
  QUIZ_BEST_SCORE: 'umbicare_quiz_best_score_v1'
};

/**
 * Inisialisasi Data Default jika LocalStorage masih kosong
 */
export function initializeStorage() {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.RECIPES)) {
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(RECIPES_DATA));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SCHEDULES)) {
    localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(PMT_SCHEDULES_DATA));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(REVIEWS_DATA));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
    // Default: Ibu Balita (Public User)
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEMO_USERS[3]));
  }
}

// ----------------- USER & AUTH -----------------

export function getCurrentUser(): User {
  if (typeof window === 'undefined') return DEMO_USERS[3];
  const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (!stored) return DEMO_USERS[3];
  try {
    return JSON.parse(stored);
  } catch {
    return DEMO_USERS[3];
  }
}

export function setCurrentUser(user: User) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  window.dispatchEvent(new Event('umbicare_auth_changed'));
}

export function demoLogin(role: 'ADMIN' | 'KADER' | 'PUBLIC_USER'): User {
  let target = DEMO_USERS.find(u => u.role === role);
  if (!target) target = DEMO_USERS[3];
  setCurrentUser(target);
  return target;
}

// ----------------- RECIPES REPOSITORY -----------------

export function getStoredRecipes(): Recipe[] {
  if (typeof window === 'undefined') return RECIPES_DATA;
  const stored = localStorage.getItem(STORAGE_KEYS.RECIPES);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(RECIPES_DATA));
    return RECIPES_DATA;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return RECIPES_DATA;
  }
}

export function saveRecipe(recipe: Recipe): Recipe {
  const recipes = getStoredRecipes();
  const existingIdx = recipes.findIndex(r => r.id === recipe.id);
  
  if (existingIdx >= 0) {
    recipes[existingIdx] = { ...recipe, updatedAt: new Date().toISOString() };
  } else {
    recipes.unshift({
      ...recipe,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
  window.dispatchEvent(new Event('umbicare_recipes_updated'));
  return recipe;
}

export function updateRecipeStatus(recipeId: string, newStatus: RecipeStatus): boolean {
  const recipes = getStoredRecipes();
  const target = recipes.find(r => r.id === recipeId);
  if (!target) return false;

  target.status = newStatus;
  target.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
  window.dispatchEvent(new Event('umbicare_recipes_updated'));
  return true;
}

export function archiveOrDeleteRecipe(recipeId: string): { success: boolean; message: string } {
  const schedules = getStoredSchedules();
  const isUsedInSchedule = schedules.some(s => s.recipeId === recipeId);

  const recipes = getStoredRecipes();
  const target = recipes.find(r => r.id === recipeId);
  if (!target) return { success: false, message: 'Resep tidak ditemukan.' };

  // Rule 12 & Edge Case 12: Jika sudah punya riwayat PMT, alihkan ke ARCHIVED
  if (isUsedInSchedule) {
    target.status = 'ARCHIVED';
    target.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
    window.dispatchEvent(new Event('umbicare_recipes_updated'));
    return {
      success: true,
      message: 'Resep memiliki riwayat kegiatan PMT Posyandu, sehingga statusnya dialihkan menjadi "Diarsipkan (ARCHIVED)" demi menjaga integritas data laporan.'
    };
  }

  // Jika belum pernah digunakan, boleh dihapus
  const filtered = recipes.filter(r => r.id !== recipeId);
  localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(filtered));
  window.dispatchEvent(new Event('umbicare_recipes_updated'));
  return { success: true, message: 'Resep berhasil dihapus.' };
}

// ----------------- PMT SCHEDULES REPOSITORY -----------------

export function getStoredSchedules(): PmtSchedule[] {
  if (typeof window === 'undefined') return PMT_SCHEDULES_DATA;
  const stored = localStorage.getItem(STORAGE_KEYS.SCHEDULES);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(PMT_SCHEDULES_DATA));
    return PMT_SCHEDULES_DATA;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return PMT_SCHEDULES_DATA;
  }
}

export function saveSchedule(schedule: PmtSchedule): PmtSchedule {
  const schedules = getStoredSchedules();
  const existingIdx = schedules.findIndex(s => s.id === schedule.id);

  if (existingIdx >= 0) {
    schedules[existingIdx] = { ...schedule, updatedAt: new Date().toISOString() };
  } else {
    schedules.unshift({
      ...schedule,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(schedules));
  window.dispatchEvent(new Event('umbicare_schedules_updated'));
  return schedule;
}

export function updateScheduleStatus(
  scheduleId: string, 
  newStatus: PmtScheduleStatus,
  actualPortions?: number,
  notes?: string
): { success: boolean; message: string } {
  const schedules = getStoredSchedules();
  const target = schedules.find(s => s.id === scheduleId);
  if (!target) return { success: false, message: 'Jadwal PMT tidak ditemukan.' };

  // Validasi transisi status
  if (newStatus === 'DISTRIBUTED' && (!actualPortions || actualPortions <= 0)) {
    return {
      success: false,
      message: 'Status belum dapat diubah menjadi "Tersalurkan (DISTRIBUTED)" karena jumlah porsi aktual yang dibagikan kepada balita belum diisi. Mohon isi jumlah porsi realisasi terlebih dahulu.'
    };
  }

  target.status = newStatus;
  if (actualPortions !== undefined) target.actualPortionsDistributed = actualPortions;
  if (notes !== undefined) target.evaluationNotes = notes;
  target.updatedAt = new Date().toISOString();

  localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(schedules));
  window.dispatchEvent(new Event('umbicare_schedules_updated'));
  return { success: true, message: `Status berhasil diperbarui menjadi ${newStatus}.` };
}

// ----------------- REVIEWS REPOSITORY -----------------

export function getStoredReviews(): Review[] {
  if (typeof window === 'undefined') return REVIEWS_DATA;
  const stored = localStorage.getItem(STORAGE_KEYS.REVIEWS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(REVIEWS_DATA));
    return REVIEWS_DATA;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return REVIEWS_DATA;
  }
}

export function addReview(newReview: Omit<Review, 'id' | 'createdAt' | 'isApproved'>): Review {
  const reviews = getStoredReviews();
  const review: Review = {
    ...newReview,
    id: `rev-${Date.now()}`,
    isApproved: true,
    createdAt: new Date().toISOString()
  };

  reviews.unshift(review);
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));

  // Atomic Update on Recipe avgLahapRating & reviewCount
  const recipes = getStoredRecipes();
  const targetRecipe = recipes.find(r => r.id === newReview.recipeId);
  if (targetRecipe) {
    const recipeReviews = reviews.filter(r => r.recipeId === targetRecipe.id && r.isApproved);
    const totalScore = recipeReviews.reduce((acc, curr) => acc + curr.lahapRating, 0);
    const avgScore = Number((totalScore / recipeReviews.length).toFixed(1));
    targetRecipe.avgLahapRating = avgScore;
    targetRecipe.reviewCount = recipeReviews.length;
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
  }

  window.dispatchEvent(new Event('umbicare_reviews_updated'));
  window.dispatchEvent(new Event('umbicare_recipes_updated'));
  return review;
}

// ----------------- COOKING CHECKLIST LOCALSTORAGE -----------------

export interface CookingChecklistState {
  recipeId: string;
  checkedIngredientIds: string[];
  checkedStepNumbers: number[];
  targetPortions: number;
  lastUpdated: string;
}

export function getCookingChecklist(recipeId: string): CookingChecklistState {
  if (typeof window === 'undefined') {
    return { recipeId, checkedIngredientIds: [], checkedStepNumbers: [], targetPortions: 2, lastUpdated: '' };
  }
  const key = `${STORAGE_KEYS.CHECKLIST_PREFIX}${recipeId}`;
  const stored = localStorage.getItem(key);
  if (!stored) {
    return { recipeId, checkedIngredientIds: [], checkedStepNumbers: [], targetPortions: 2, lastUpdated: '' };
  }
  try {
    return JSON.parse(stored);
  } catch {
    return { recipeId, checkedIngredientIds: [], checkedStepNumbers: [], targetPortions: 2, lastUpdated: '' };
  }
}

export function saveCookingChecklist(state: CookingChecklistState) {
  if (typeof window === 'undefined') return;
  const key = `${STORAGE_KEYS.CHECKLIST_PREFIX}${state.recipeId}`;
  localStorage.setItem(key, JSON.stringify({ ...state, lastUpdated: new Date().toISOString() }));
}

export function clearCookingChecklist(recipeId: string) {
  if (typeof window === 'undefined') return;
  const key = `${STORAGE_KEYS.CHECKLIST_PREFIX}${recipeId}`;
  localStorage.removeItem(key);
}
