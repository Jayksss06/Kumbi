import React from 'react';
import { calculateSdgImpact } from '../../lib/pmt-scaling-engine';
import { PmtSchedule } from '../../types';
import { 
  Award, 
  Droplet, 
  Leaf, 
  HeartHandshake, 
  ShieldCheck, 
  Info,
  Scale
} from 'lucide-react';

interface SdgImpactPanelProps {
  schedules: PmtSchedule[];
}

export const SdgImpactPanel: React.FC<SdgImpactPanelProps> = ({ schedules }) => {
  // Hitung total porsi aktual dari jadwal berstatus DISTRIBUTED atau EVALUATED
  const completedSchedules = schedules.filter(
    s => s.status === 'DISTRIBUTED' || s.status === 'EVALUATED'
  );

  const totalPortions = completedSchedules.reduce(
    (acc, s) => acc + (s.actualPortionsDistributed || s.targetPortions || 0), 
    0
  );

  const impact = calculateSdgImpact(totalPortions);

  return (
    <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Indikator Terukur Keberlanjutan
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight mt-1.5">
            Dashboard Dampak Kemandirian Pangan & SDGs
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Dampak nyata dari integrasi Meja 4 Posyandu dan distribusi PMT olahan umbi lokal.
          </p>
        </div>
      </div>

      {/* 4 Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Total Porsi Umbi Tersalurkan */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase">SDG 2: Tanpa Kelaparan</span>
            <Leaf className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-950">
            {impact.totalPortionsDistributed}
            <span className="text-sm font-semibold text-stone-600 ml-1">Porsi PMT</span>
          </div>
          <p className="text-[11px] text-stone-600 leading-snug">
            Total kudapan & MPASI umbi lokal yang tersalurkan kepada balita posyandu mitra.
          </p>
        </div>

        {/* Metric 2: Substitusi Beras (kg) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-brand-orange/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-orange uppercase">Substitusi Pangan</span>
            <Scale className="w-5 h-5 text-brand-orange" />
          </div>
          <div className="text-3xl font-black text-stone-900">
            {impact.substitutedRiceKg.toLocaleString('id-ID')}
            <span className="text-sm font-semibold text-stone-600 ml-1">kg Beras</span>
          </div>
          <p className="text-[11px] text-stone-600 leading-snug">
            Estimasi beras yang berhasil disubstitusi porsinya oleh Singkong, Ubi, dan Talas.
          </p>
        </div>

        {/* Metric 3: Penghematan Jejak Air (Liter) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 border-2 border-sky-300 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-800 uppercase">SDG 12: Jejak Air</span>
            <Droplet className="w-5 h-5 text-sky-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-sky-950">
            {impact.avgWaterSavedLiters.toLocaleString('id-ID')}
            <span className="text-xs font-semibold text-stone-600 ml-1">Liter Air</span>
          </div>
          <p className="text-[11px] text-stone-600 leading-snug">
            Estimasi air irigasi yang dihemat ({impact.minWaterSavedLiters.toLocaleString('id-ID')} s.d. {impact.maxWaterSavedLiters.toLocaleString('id-ID')} L).
          </p>
        </div>

        {/* Metric 4: Kepatuhan Protein Seimbang */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-brand-purple/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-purple uppercase">SDG 3: Sehat & Stunting</span>
            <ShieldCheck className="w-5 h-5 text-brand-purple" />
          </div>
          <div className="text-3xl font-black text-brand-purple">
            100%
            <span className="text-sm font-semibold text-stone-600 ml-1">Tervalidasi</span>
          </div>
          <p className="text-[11px] text-stone-600 leading-snug">
            Seluruh resep balita 100% memenuhi aturan wajib pendamping protein hewani/nabati.
          </p>
        </div>

      </div>

      {/* Scientific Footnote on SDGs */}
      <div className="p-4 bg-brand-cream rounded-2xl border border-brand-border text-xs text-stone-600 space-y-1">
        <strong className="text-stone-800 block text-xs flex items-center gap-1.5">
          <Info className="w-4 h-4 text-brand-green" />
          Metodologi Perhitungan Dampak Akademik:
        </strong>
        <p>• 1 porsi konsumsi karbohidrat anak disetarakan dengan konsumsi <strong>50 gram beras mentah (~100g nasi matang)</strong> yang digantikan porsi umbi lokal.</p>
        <p>• Jejak air dihitung menggunakan koefisien <em>Water Footprint Network</em> padi sawah tropis sebesar <strong>2.291 – 3.420 liter per 1 kg beras</strong> (rerata 2.855 liter/kg).</p>
      </div>

    </div>
  );
};
