// TypeScript Definitions for Kumbi (Dapur Umbi Posyandu)

export type UserRole = 'ADMIN' | 'KADER' | 'PUBLIC_USER';

export type OrganizationType = 'POSYANDU_ANAK' | 'PUSKESMAS' | 'PKK' | 'KWT' | 'PAUD';

export type TuberSlug = 'singkong' | 'ubi-jalar' | 'talas' | 'beras-putih';

export type AgeCategory = 
  | 'MPASI_6_8' 
  | 'MPASI_9_11' 
  | 'MPASI_12_23' 
  | 'BALITA_2_5' 
  | 'PMT_KUDAPAN';

export type CookingMethod = 'KUKUS' | 'REBUS' | 'PANGGANG' | 'TUMIS_MINIM_MINYAK';

export type IngredientCategory = 
  | 'KARBO_UMBI' 
  | 'PROTEIN_HEWANI' 
  | 'PROTEIN_NABATI' 
  | 'LEMAK_TAMBAHAN' 
  | 'SAYUR_BUMBU';

export type RecipeStatus = 
  | 'DRAFT' 
  | 'PENDING_REVIEW' 
  | 'PUBLISHED' 
  | 'FEATURED_PMT' 
  | 'ARCHIVED';

export type PmtScheduleStatus = 
  | 'PLANNED' 
  | 'SHOPPING_READY' 
  | 'DISTRIBUTED' 
  | 'EVALUATED' 
  | 'CANCELLED';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  posyanduId?: string;
  isActive: boolean;
  createdAt: string;
}

export interface PosyanduPartner {
  id: string;
  code: string;
  name: string;
  organizationType: OrganizationType;
  kelurahan: string;
  kecamatan: string;
  city: string;
  address?: string;
  registeredToddlersCount: number;
  contactPerson?: string;
  contactWhatsapp?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface TuberInfo {
  id: string;
  slug: TuberSlug;
  localName: string;
  scientificName: string;
  isReferenceComparison: boolean;
  caloriesKcal: number; // per 100g
  caloriesRangeText: string;
  carbsG: number;
  carbsRangeText: string;
  proteinG: number;
  proteinRangeText: string;
  fiberG: number;
  fiberRangeText: string;
  glycemicIndexMin: number;
  glycemicIndexMax: number;
  potassiumMg?: number;
  keyMicronutrients: string[];
  mocafDerivativeInfo?: string;
  safetyPreparationSteps: string[];
  toxinWarning: string;
  themeColorHex: string;
}

export interface ProteinPairing {
  id: string;
  name: string;
  proteinType: 'HEWANI' | 'NABATI';
  caloriesPer100g: number;
  proteinGPer100g: number;
  ironMgPer100g?: number;
  defaultServingGramsMpasi: number;
  householdUnitDescription: string;
  nutritionBenefitNote: string;
}

export interface RecipeStep {
  stepNumber: number;
  instruction: string;
  durationMinutes?: number;
  isCriticalSafetyStep: boolean;
}

export interface RecipeIngredient {
  id: string;
  recipeId: string;
  ingredientName: string;
  category: IngredientCategory;
  proteinPairingId?: string;
  weightGrams: number;
  householdQty: number;
  householdUnit: string;
  estimatedPriceIdr: number;
  preparationNote?: string;
  sortOrder: number;
}

export interface Recipe {
  id: string;
  recipeCode: string; // e.g. UMBI-01
  slug: string;
  title: string;
  shortDescription: string;
  tuberId: string;
  tuberSlug: TuberSlug;
  usesMocaf: boolean;
  ageCategory: AgeCategory;
  cookingMethod: CookingMethod;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  basePortions: number;
  caloriesPerPortion: number;
  carbsGPerPortion: number;
  proteinGPerPortion: number;
  fatGPerPortion: number;
  fiberGPerPortion: number;
  micronutrientHighlights: string;
  textureGuideByAge: string;
  safetyWarningBanner: string;
  steps: RecipeStep[];
  ingredients: RecipeIngredient[];
  status: RecipeStatus;
  authorId?: string;
  posyanduId?: string;
  avgLahapRating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface MythFact {
  id: string;
  category: string;
  mythStatement: string;
  factExplanation: string;
  scientificReferenceNote: string;
  isActive: boolean;
  sortOrder: number;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanationText: string;
  isActive: boolean;
  sortOrder: number;
}

export interface PmtSchedule {
  id: string;
  scheduleCode: string;
  posyanduId: string;
  recipeId: string;
  createdByUserId: string;
  eventDate: string;
  counselingTopic: string;
  targetPortions: number;
  actualPortionsDistributed?: number;
  attendeesMothersCount?: number;
  estimatedTotalCostIdr: number;
  shoppingListSnapshot: ScaledIngredientItem[];
  recipeNutritionSnapshot: {
    caloriesPerPortion: number;
    carbsGPerPortion: number;
    proteinGPerPortion: number;
    tuberGramsPerPortion: number;
    recipeTitle: string;
    recipeCode: string;
  };
  status: PmtScheduleStatus;
  evaluationNotes?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  recipeId: string;
  pmtScheduleId?: string;
  posyanduId?: string;
  motherName: string;
  childAgeMonths: number;
  lahapRating: number; // 1 to 5
  hasRecookedAtHome: boolean;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}

export interface ScaledIngredientItem {
  ingredientName: string;
  category: IngredientCategory;
  cleanWeightGrams: number;
  cleanWeightDisplay: string;
  marketGrossWeightKg?: number;
  marketGrossDisplay?: string;
  householdDisplay: string;
  estimatedCostIdr: number;
  preparationNote?: string;
  isUnitItem: boolean;
  unitItemCount?: number;
}

export interface PmtScalingResult {
  recipeCode: string;
  recipeTitle: string;
  basePortions: number;
  targetPortions: number;
  scaleFactor: number;
  scaledIngredients: ScaledIngredientItem[];
  totalEstimatedCostIdr: number;
  tuberPreparationWarning: string;
  shoppingChecklist: {
    item: string;
    qty: string;
    isCriticalSafetyItem: boolean;
  }[];
}

export interface RiceConversionResult {
  toddlerCentongCount: number;
  cookedRiceGrams: number;
  targetEnergyKcal: number;
  cookedRiceCarbsG: number;
  cookedRiceProteinG: number;
  singkongGrams: number;
  singkongUrt: string;
  ubiJalarGrams: number;
  ubiJalarUrt: string;
  talasGrams: number;
  talasUrt: string;
  proteinDifferenceG: number;
  proteinRecommendation: string;
}

export interface BalancedPlateResult {
  ageCategory: AgeCategory;
  tuberSlug: TuberSlug;
  proteinPairingId: string;
  totalCaloriesKcal: number;
  totalCarbsG: number;
  totalProteinG: number;
  totalFatG: number;
  totalFiberG: number;
  plateComposition: {
    tuberPct: number;
    proteinPct: number;
    veggieFruitPct: number;
    healthyFatPct: number;
  };
  textureGuide: string;
  micronutrientHighlights: string;
  safetyReminder: string;
}
