import React, { useState } from 'react';
import { Recipe, PmtSchedule, Review, PosyanduPartner } from '../types';
import { SdgImpactPanel } from '../components/dashboard/SdgImpactPanel';
import { updateRecipeStatus } from '../lib/storage-sync';
import { 
  exportRecipesToCsv, 
  exportPmtSchedulesToCsv, 
  exportReviewsToCsv, 
  exportFullBackupJson 
} from '../lib/csv-exporter';
import { 
  POSYANDU_PARTNERS_DATA 
} from '../data/scientific-seed-data';
import { 
  Shield, 
  Award, 
  Download, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Users, 
  Building2, 
  FileSpreadsheet, 
  FileCode,
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';

interface AdminDashboardViewProps {
  recipes: Recipe[];
  schedules: PmtSchedule[];
  reviews: Review[];
  onRefresh: () => void;
  onOpenRecipe: (recipe: Recipe) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  recipes,
  schedules,
  reviews,
  onRefresh,
  onOpenRecipe
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'sdg' | 'moderation' | 'partners' | 'export'>('sdg');

  const pendingRecipes = recipes.filter(r => r.status === 'PENDING_REVIEW');

  const handleApproveRecipe = (recipeId: string, isFeatured: boolean = false) => {
    updateRecipeStatus(recipeId, isFeatured ? 'FEATURED_PMT' : 'PUBLISHED');
    onRefresh();
    alert('Resep berhasil disetujui dan ditayangkan di katalog publik!');
  };

  const handleArchiveRecipe = (recipeId: string) => {
    updateRecipeStatus(recipeId, 'ARCHIVED');
    onRefresh();
    alert('Resep telah diarsipkan.');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-br from-brand-dark via-stone-900 to-purple-950 text-white p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-purple-300 mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Pusat Kendali Mutu & Evaluasi Akademik</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Dashboard Fasilitator & Evaluasi SDGs
            </h1>
            <p className="text-xs sm:text-sm text-stone-300">
              Pemantauan dampak kemandirian pangan, moderasi gizi resep kader, jaringan mitra, dan ekspor data penelitian.
            </p>
          </div>

          <div className="bg-white/10 p-3 rounded-2xl border border-white/15 text-center shrink-0">
            <span className="text-[10px] text-stone-300 block uppercase font-bold">Kemitraan Aktif</span>
            <span className="text-2xl font-black text-white">{POSYANDU_PARTNERS_DATA.length}</span>
            <span className="text-[10px] text-purple-300 block font-semibold">Unit Mitra Posyandu</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-stone-800">
          <button
            onClick={() => setActiveAdminTab('sdg')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeAdminTab === 'sdg' ? 'bg-purple-600 text-white shadow-md' : 'bg-white/10 text-stone-300 hover:bg-white/20'
            }`}
          >
            Metrik Dampak SDGs
          </button>

          <button
            onClick={() => setActiveAdminTab('moderation')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeAdminTab === 'moderation' ? 'bg-purple-600 text-white shadow-md' : 'bg-white/10 text-stone-300 hover:bg-white/20'
            }`}
          >
            <span>Moderasi Resep</span>
            {pendingRecipes.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center">
                {pendingRecipes.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveAdminTab('partners')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeAdminTab === 'partners' ? 'bg-purple-600 text-white shadow-md' : 'bg-white/10 text-stone-300 hover:bg-white/20'
            }`}
          >
            Jaringan Mitra Posyandu
          </button>

          <button
            onClick={() => setActiveAdminTab('export')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeAdminTab === 'export' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white/10 text-stone-300 hover:bg-white/20'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Data & Backup</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SDG IMPACT PANEL */}
      {activeAdminTab === 'sdg' && (
        <SdgImpactPanel schedules={schedules} />
      )}

      {/* TAB 2: RECIPE MODERATION QUEUE */}
      {activeAdminTab === 'moderation' && (
        <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-stone-900 tracking-tight">
                Antrean Moderasi Resep Kader (Pending Review)
              </h3>
              <p className="text-xs text-stone-500">
                Verifikasi kepatuhan Golden Rule wajib protein dan protokol keamanan umbi sebelum ditayangkan.
              </p>
            </div>
          </div>

          {pendingRecipes.length === 0 ? (
            <div className="p-8 text-center bg-stone-50 rounded-2xl border border-brand-border text-xs text-stone-500 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="font-bold text-stone-800">Semua resep telah dimoderasi!</p>
              <p>Tidak ada resep baru yang menunggu persetujuan saat ini.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRecipes.map(recipe => (
                <div key={recipe.id} className="p-5 rounded-2xl border-2 border-brand-border bg-stone-50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded mr-2">
                        {recipe.recipeCode}
                      </span>
                      <strong className="text-base font-black text-stone-900">{recipe.title}</strong>
                      <span className="text-xs text-stone-500 block mt-0.5">
                        Umbi: {recipe.tuberSlug.toUpperCase()} • Usia: {recipe.ageCategory} • Oleh Kader Posyandu
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApproveRecipe(recipe.id, false)}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold"
                      >
                        Setujui (Publish)
                      </button>
                      <button
                        onClick={() => handleApproveRecipe(recipe.id, true)}
                        className="px-3 py-1.5 bg-brand-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold"
                      >
                        Jadikan Menu Unggulan PMT
                      </button>
                      <button
                        onClick={() => handleArchiveRecipe(recipe.id)}
                        className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl text-xs font-bold"
                      >
                        Tolak
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-stone-700">{recipe.shortDescription}</p>

                  <div className="p-3 bg-white rounded-xl border border-brand-border text-xs">
                    <strong className="text-stone-800 block mb-1">Daftar Bahan & Protein:</strong>
                    <ul className="list-disc list-inside space-y-0.5 text-stone-600">
                      {recipe.ingredients.map(ing => (
                        <li key={ing.id}>
                          {ing.ingredientName} ({ing.weightGrams}g) — <span className="font-bold">{ing.category}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PARTNERS NETWORK */}
      {activeAdminTab === 'partners' && (
        <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-black text-stone-900 tracking-tight">
              Jaringan Mitra Eksekutor Kemandirian Pangan
            </h3>
            <p className="text-xs text-stone-500">
              Arsitektur multi-tenant ready: Mendukung Posyandu Anak, Puskesmas, PKK, KWT, dan PAUD.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {POSYANDU_PARTNERS_DATA.map(partner => (
              <div key={partner.id} className="p-5 rounded-2xl bg-brand-cream/70 border border-brand-border space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-stone-900 text-white font-mono font-bold px-2 py-0.5 rounded text-[10px]">
                    {partner.code}
                  </span>
                  <span className="text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-full text-[10px]">
                    Aktif Terverifikasi
                  </span>
                </div>

                <h4 className="text-base font-black text-stone-900">{partner.name}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{partner.address}</p>

                <div className="pt-2 border-t border-brand-border/60 text-xs text-stone-500 space-y-1">
                  <p>Ketua Kader: <strong className="text-stone-800">{partner.contactPerson}</strong></p>
                  <p>WhatsApp: <strong className="text-stone-800">{partner.contactWhatsapp}</strong></p>
                  <p>Balita Terdaftar: <strong className="text-brand-green">{partner.registeredToddlersCount} Anak</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SUSTAINABILITY EXPORT & BACKUP CENTER */}
      {activeAdminTab === 'export' && (
        <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-black text-stone-900 tracking-tight">
              Pusat Ekspor & Cadangan Keberlanjutan Data (Zero-Cost Sustainability)
            </h3>
            <p className="text-xs text-stone-600">
              Format CSV kompatibel dengan Google Sheets & Microsoft Excel agar Posyandu mitra tetap mandiri mengelola data tanpa biaya server bulanan pasca-serah terima mahasiswa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Export Resep CSV */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-brand-border space-y-3 flex flex-col justify-between">
              <div>
                <FileSpreadsheet className="w-8 h-8 text-emerald-600 mb-2" />
                <h4 className="font-bold text-sm text-stone-900">Ekspor Data Resep</h4>
                <p className="text-xs text-stone-500 mt-1">Unduh seluruh 6+ resep, nilai gizi, bahan, dan rating dalam format CSV.</p>
              </div>
              <button
                onClick={() => exportRecipesToCsv(recipes)}
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Resep (.CSV)</span>
              </button>
            </div>

            {/* Export Jadwal PMT CSV */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-brand-border space-y-3 flex flex-col justify-between">
              <div>
                <FileSpreadsheet className="w-8 h-8 text-brand-orange mb-2" />
                <h4 className="font-bold text-sm text-stone-900">Ekspor Jadwal PMT</h4>
                <p className="text-xs text-stone-500 mt-1">Unduh histori realisasi porsi, anggaran, dan catatan evaluasi Meja 4.</p>
              </div>
              <button
                onClick={() => exportPmtSchedulesToCsv(schedules)}
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Jadwal (.CSV)</span>
              </button>
            </div>

            {/* Export Ulasan CSV */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-brand-border space-y-3 flex flex-col justify-between">
              <div>
                <FileSpreadsheet className="w-8 h-8 text-amber-500 mb-2" />
                <h4 className="font-bold text-sm text-stone-900">Ekspor Ulasan Ibu</h4>
                <p className="text-xs text-stone-500 mt-1">Unduh rekapitulasi rating "Anak Lahap" dan testimoni masak untuk laporan.</p>
              </div>
              <button
                onClick={() => exportReviewsToCsv(reviews)}
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Ulasan (.CSV)</span>
              </button>
            </div>

            {/* Full JSON Backup */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-brand-border space-y-3 flex flex-col justify-between">
              <div>
                <FileCode className="w-8 h-8 text-purple-600 mb-2" />
                <h4 className="font-bold text-sm text-stone-900">Cadangan Penuh (.JSON)</h4>
                <p className="text-xs text-stone-500 mt-1">Snapshot menyeluruh seluruh basis data sistem untuk arsip mata kuliah.</p>
              </div>
              <button
                onClick={() => exportFullBackupJson({ recipes, pmtSchedules: schedules, reviews })}
                className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Cadangan Penuh (.JSON)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
