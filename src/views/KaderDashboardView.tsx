import React, { useState } from 'react';
import { PmtSchedule, Recipe, PosyanduPartner, Review } from '../types';
import { PmtStateMachineTracker } from '../components/dashboard/PmtStateMachineTracker';
import { PmtMassScaler } from '../components/posyandu/PmtMassScaler';
import { KaderRecipeBuilder } from '../components/posyandu/KaderRecipeBuilder';
import { 
  Users, 
  Presentation, 
  Calculator, 
  PlusCircle, 
  Calendar, 
  Star, 
  ChefHat, 
  HeartHandshake, 
  Printer, 
  Share2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface KaderDashboardViewProps {
  schedules: PmtSchedule[];
  recipes: Recipe[];
  posyandu: PosyanduPartner;
  reviews: Review[];
  onRefresh: () => void;
  onOpenMejaEmpat: () => void;
  onOpenWaShare: (schedule: PmtSchedule, recipe: Recipe) => void;
  onOpenQrLabels: (schedule: PmtSchedule, recipe: Recipe) => void;
}

export const KaderDashboardView: React.FC<KaderDashboardViewProps> = ({
  schedules,
  recipes,
  posyandu,
  reviews,
  onRefresh,
  onOpenMejaEmpat,
  onOpenWaShare,
  onOpenQrLabels
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'schedules' | 'calculator' | 'new-recipe'>('schedules');

  // Filter schedules for this Posyandu
  const posyanduSchedules = schedules.filter(s => s.posyanduId === posyandu.id);
  const completedSchedules = posyanduSchedules.filter(s => s.status === 'DISTRIBUTED' || s.status === 'EVALUATED');
  
  const totalPortions = completedSchedules.reduce(
    (acc, s) => acc + (s.actualPortionsDistributed || s.targetPortions || 0), 
    0
  );

  const upcomingSchedule = posyanduSchedules.find(s => s.status === 'PLANNED' || s.status === 'SHOPPING_READY');

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Info Posyandu */}
      <div className="bg-gradient-to-br from-brand-dark via-stone-900 to-emerald-900 text-white p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-amber-300 mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>Ruang Kerja Mandiri Kader Posyandu</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {posyandu.name} ({posyandu.code})
            </h1>
            <p className="text-xs sm:text-sm text-stone-300">
              Kelurahan {posyandu.kelurahan}, Kec. {posyandu.kecamatan}, {posyandu.city} • Kontak: {posyandu.contactPerson} ({posyandu.contactWhatsapp})
            </p>
          </div>

          <div className="bg-white/10 p-3 rounded-2xl border border-white/15 text-center shrink-0">
            <span className="text-[10px] text-stone-300 block uppercase font-bold">Balita Terdaftar</span>
            <span className="text-2xl font-black text-white">{posyandu.registeredToddlersCount}</span>
            <span className="text-[10px] text-emerald-300 block font-semibold">Anak Terpantau</span>
          </div>
        </div>

        {/* 4 Summary Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-stone-800 text-xs">
          <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
            <span className="text-stone-400 text-[10px] block">Jadwal PMT Terlaksana</span>
            <span className="text-xl font-black text-emerald-400">{completedSchedules.length} Kegiatan</span>
            <span className="text-[10px] text-stone-500 block">Siklus bulanan aktif</span>
          </div>

          <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
            <span className="text-stone-400 text-[10px] block">Porsi Umbi Tersalurkan</span>
            <span className="text-xl font-black text-brand-orange">{totalPortions} Porsi</span>
            <span className="text-[10px] text-stone-500 block">MPASI & kudapan balita</span>
          </div>

          <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
            <span className="text-stone-400 text-[10px] block">Rata-rata Rating Konsumsi</span>
            <span className="text-xl font-black text-amber-400 flex items-center gap-1.5">
              <span>4,8 / 5</span>
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </span>
            <span className="text-[10px] text-stone-500 block">Evaluasi kepuasan balita</span>
          </div>

          <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
            <span className="text-stone-400 text-[10px] block">Jadwal Terdekat</span>
            <span className="text-xs font-black text-white truncate block">
              {upcomingSchedule ? upcomingSchedule.eventDate : 'Belum Dijadwalkan'}
            </span>
            <span className="text-[10px] text-stone-500 block">
              {upcomingSchedule ? upcomingSchedule.counselingTopic.slice(0, 25) + '...' : 'Siap rencanakan menu'}
            </span>
          </div>
        </div>
      </div>

      {/* 4 BIG ACTION BUTTONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Action 1: Meja 4 Presenter */}
        <button
          onClick={onOpenMejaEmpat}
          className="btn-press p-5 rounded-3xl bg-gradient-to-br from-brand-orange to-amber-600 text-white text-left shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex flex-col justify-between min-h-[140px] group"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Presentation className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-black text-base leading-tight">Mode Penyuluhan Meja 4</h3>
            <p className="text-[11px] text-white/80 mt-1">
              Layar penuh font besar untuk tablet & proyektor balai
            </p>
          </div>
        </button>

        {/* Action 2: Kalkulator Belanja PMT Massal */}
        <button
          onClick={() => setActiveSubTab('calculator')}
          className={`p-5 rounded-3xl text-left border-2 transition-all flex flex-col justify-between min-h-[140px] ${
            activeSubTab === 'calculator'
              ? 'bg-brand-green text-white border-brand-green shadow-lg'
              : 'bg-white text-stone-800 border-brand-border hover:border-brand-green/40 shadow-sm'
          }`}
        >
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
            activeSubTab === 'calculator' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-brand-green'
          }`}>
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-base leading-tight">Hitung Belanja PMT Massal</h3>
            <p className={`text-[11px] mt-1 ${activeSubTab === 'calculator' ? 'text-white/80' : 'text-stone-500'}`}>
              Takaran belanja pasar 20–100+ porsi otomatis
            </p>
          </div>
        </button>

        {/* Action 3: Jadwal PMT Bulanan */}
        <button
          onClick={() => setActiveSubTab('schedules')}
          className={`p-5 rounded-3xl text-left border-2 transition-all flex flex-col justify-between min-h-[140px] ${
            activeSubTab === 'schedules'
              ? 'bg-stone-900 text-white border-stone-900 shadow-lg'
              : 'bg-white text-stone-800 border-brand-border hover:border-stone-400 shadow-sm'
          }`}
        >
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
            activeSubTab === 'schedules' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-800'
          }`}>
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-base leading-tight">Jadwal & Realisasi PMT</h3>
            <p className={`text-[11px] mt-1 ${activeSubTab === 'schedules' ? 'text-white/80' : 'text-stone-500'}`}>
              Pengumuman WA, cetak label QR, catat porsi
            </p>
          </div>
        </button>

        {/* Action 4: Tambah Resep Kreasi */}
        <button
          onClick={() => setActiveSubTab('new-recipe')}
          className={`p-5 rounded-3xl text-left border-2 transition-all flex flex-col justify-between min-h-[140px] ${
            activeSubTab === 'new-recipe'
              ? 'bg-brand-purple text-white border-brand-purple shadow-lg'
              : 'bg-white text-stone-800 border-brand-border hover:border-brand-purple/40 shadow-sm'
          }`}
        >
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
            activeSubTab === 'new-recipe' ? 'bg-white/20 text-white' : 'bg-purple-100 text-brand-purple'
          }`}>
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-base leading-tight">Tambah Resep Posyandu</h3>
            <p className={`text-[11px] mt-1 ${activeSubTab === 'new-recipe' ? 'text-white/80' : 'text-stone-500'}`}>
              Form terpandu bebas koding + validasi protein
            </p>
          </div>
        </button>

      </div>

      {/* SUB-VIEW 1: PMT STATE MACHINE TRACKER (DEFAULT) */}
      {activeSubTab === 'schedules' && (
        <PmtStateMachineTracker
          schedules={posyanduSchedules}
          recipes={recipes}
          posyandu={posyandu}
          onRefresh={onRefresh}
          onOpenWaShare={onOpenWaShare}
          onOpenQrLabels={onOpenQrLabels}
        />
      )}

      {/* SUB-VIEW 2: PMT MASS SCALER */}
      {activeSubTab === 'calculator' && (
        <PmtMassScaler />
      )}

      {/* SUB-VIEW 3: KADER RECIPE BUILDER */}
      {activeSubTab === 'new-recipe' && (
        <KaderRecipeBuilder
          onBack={() => setActiveSubTab('schedules')}
          onSuccess={(savedRecipe) => {
            alert(`Resep "${savedRecipe.title}" berhasil diajukan! Status: PENDING_REVIEW (akan dimoderasi oleh fasilitator).`);
            setActiveSubTab('schedules');
            onRefresh();
          }}
          posyanduId={posyandu.id}
        />
      )}

      {/* REKAPITULASI ULASAN IBU BALITA TERBARU */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-base sm:text-lg font-black text-stone-900 tracking-tight flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
          <span>Ulasan Terbaru dari Para Bunda Posyandu</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.slice(0, 4).map(rev => (
            <div key={rev.id} className="p-4 rounded-2xl bg-brand-cream/60 border border-brand-border space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900">{rev.motherName}</span>
                <div className="flex text-amber-400">
                  {Array.from({ length: rev.lahapRating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-stone-700 italic leading-relaxed">"{rev.comment}"</p>
              <div className="text-[10px] text-stone-400 flex justify-between">
                <span>Anak usia {rev.childAgeMonths} bln</span>
                <span>{rev.hasRecookedAtHome ? 'Recook di Rumah' : 'Dari PMT'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
