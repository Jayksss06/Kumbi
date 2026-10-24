import React, { useState } from 'react';
import { PmtSchedule, Recipe, PosyanduPartner, PmtScheduleStatus } from '../../types';
import { updateScheduleStatus } from '../../lib/storage-sync';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ShoppingCart, 
  Send, 
  Printer, 
  Share2, 
  AlertCircle,
  FileText,
  ChevronRight,
  XCircle
} from 'lucide-react';

interface PmtStateMachineTrackerProps {
  schedules: PmtSchedule[];
  recipes: Recipe[];
  posyandu: PosyanduPartner;
  onRefresh: () => void;
  onOpenWaShare: (schedule: PmtSchedule, recipe: Recipe) => void;
  onOpenQrLabels: (schedule: PmtSchedule, recipe: Recipe) => void;
}

export const PmtStateMachineTracker: React.FC<PmtStateMachineTrackerProps> = ({
  schedules,
  recipes,
  posyandu,
  onRefresh,
  onOpenWaShare,
  onOpenQrLabels
}) => {
  const [activeModalSchedule, setActiveModalSchedule] = useState<PmtSchedule | null>(null);
  const [actualPortionsInput, setActualPortionsInput] = useState<number>(50);
  const [evalNotesInput, setEvalNotesInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const getStatusBadge = (status: PmtScheduleStatus) => {
    switch (status) {
      case 'PLANNED':
        return <span className="bg-sky-100 text-sky-800 border border-sky-300 text-xs px-2.5 py-0.5 rounded-full font-bold">Direncanakan (PLANNED)</span>;
      case 'SHOPPING_READY':
        return <span className="bg-amber-100 text-amber-800 border border-amber-300 text-xs px-2.5 py-0.5 rounded-full font-bold">Siap Belanja (SHOPPING_READY)</span>;
      case 'DISTRIBUTED':
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-bold">Tersalurkan (DISTRIBUTED)</span>;
      case 'EVALUATED':
        return <span className="bg-purple-100 text-purple-800 border border-purple-300 text-xs px-2.5 py-0.5 rounded-full font-bold">Dievaluasi (EVALUATED)</span>;
      case 'CANCELLED':
        return <span className="bg-rose-100 text-rose-800 border border-rose-300 text-xs px-2.5 py-0.5 rounded-full font-bold">Dibatalkan</span>;
    }
  };

  const handleAdvanceStatus = (schedule: PmtSchedule) => {
    setErrorMessage('');
    if (schedule.status === 'PLANNED') {
      updateScheduleStatus(schedule.id, 'SHOPPING_READY');
      onRefresh();
    } else if (schedule.status === 'SHOPPING_READY') {
      // Buka modal untuk input porsi aktual
      setActiveModalSchedule(schedule);
      setActualPortionsInput(schedule.targetPortions);
    } else if (schedule.status === 'DISTRIBUTED') {
      // Buka modal untuk evaluasi
      setActiveModalSchedule(schedule);
      setEvalNotesInput(schedule.evaluationNotes || '');
    }
  };

  const handleConfirmDistribution = () => {
    if (!activeModalSchedule) return;
    if (!actualPortionsInput || actualPortionsInput <= 0) {
      setErrorMessage(
        'Status belum dapat diubah menjadi "Tersalurkan (DISTRIBUTED)" karena jumlah porsi aktual yang dibagikan kepada balita belum diisi. Mohon isi jumlah porsi realisasi terlebih dahulu.'
      );
      return;
    }

    const res = updateScheduleStatus(
      activeModalSchedule.id, 
      'DISTRIBUTED', 
      actualPortionsInput
    );

    if (res.success) {
      setActiveModalSchedule(null);
      onRefresh();
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleConfirmEvaluation = () => {
    if (!activeModalSchedule) return;
    updateScheduleStatus(
      activeModalSchedule.id,
      'EVALUATED',
      activeModalSchedule.actualPortionsDistributed,
      evalNotesInput || 'Kegiatan berjalan lancar dan balita menyukai menu umbi.'
    );
    setActiveModalSchedule(null);
    onRefresh();
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-stone-900 tracking-tight">
            Agenda & Siklus Operasional PMT Bulanan
          </h3>
          <p className="text-xs text-stone-500">
            Kelola tahapan PMT dari perencanaan hingga pencatatan realisasi
          </p>
        </div>
      </div>

      {/* Schedules List */}
      <div className="space-y-4">
        {schedules.map(sched => {
          const matchedRecipe = recipes.find(r => r.id === sched.recipeId) || recipes[0];

          return (
            <div
              key={sched.id}
              className="bg-white rounded-3xl border border-brand-border p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
            >
              {/* Top Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-border/60 pb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {getStatusBadge(sched.status)}
                  <span className="text-xs font-mono font-bold text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-md">
                    {sched.scheduleCode}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold">
                  <Calendar className="w-4 h-4 text-brand-orange" />
                  <span>Pelaksanaan: {new Date(sched.eventDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Main Content Info */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                <div className="md:col-span-7 space-y-1">
                  <h4 className="text-base sm:text-lg font-black text-stone-900 leading-snug">
                    {sched.recipeNutritionSnapshot?.recipeTitle || matchedRecipe.title}
                  </h4>
                  <p className="text-xs text-stone-600 font-medium">
                    Topik Meja 4: <strong>"{sched.counselingTopic}"</strong>
                  </p>

                  <div className="flex items-center gap-3 pt-2 text-xs">
                    <span className="text-stone-500">
                      Target: <strong className="text-stone-900">{sched.targetPortions} porsi</strong>
                    </span>
                    {sched.actualPortionsDistributed && (
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                        Realisasi: {sched.actualPortionsDistributed} porsi tersalurkan
                      </span>
                    )}
                    <span className="text-stone-500">
                      Anggaran: <strong className="text-brand-orange">Rp {sched.estimatedTotalCostIdr.toLocaleString('id-ID')}</strong>
                    </span>
                  </div>
                </div>

                {/* Right Action Tools: WA, Print Label, Advance Status */}
                <div className="md:col-span-5 flex flex-wrap items-center justify-end gap-2 pt-2 md:pt-0">
                  
                  {/* Share WA */}
                  <button
                    onClick={() => onOpenWaShare(sched, matchedRecipe)}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                    title="Buat Pengumuman Grup WA"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Info WA</span>
                  </button>

                  {/* Print QR Labels */}
                  <button
                    onClick={() => onOpenQrLabels(sched, matchedRecipe)}
                    className="px-3 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                    title="Cetak Stiker Label Kotak PMT"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Label QR</span>
                  </button>

                  {/* Status Advancement Button */}
                  {sched.status === 'PLANNED' && (
                    <button
                      onClick={() => handleAdvanceStatus(sched)}
                      className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Kunci Belanja</span>
                    </button>
                  )}

                  {sched.status === 'SHOPPING_READY' && (
                    <button
                      onClick={() => handleAdvanceStatus(sched)}
                      className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Catat Terbagi</span>
                    </button>
                  )}

                  {sched.status === 'DISTRIBUTED' && (
                    <button
                      onClick={() => handleAdvanceStatus(sched)}
                      className="px-3 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Evaluasi</span>
                    </button>
                  )}

                </div>
              </div>

              {/* Evaluation Notes if any */}
              {sched.evaluationNotes && (
                <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200 text-xs text-purple-950">
                  <span className="font-bold block mb-0.5">Catatan Evaluasi Kader:</span>
                  <p>{sched.evaluationNotes}</p>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Modal Input Realisasi / Evaluasi */}
      {activeModalSchedule && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            
            <h3 className="text-base font-black text-stone-900">
              {activeModalSchedule.status === 'SHOPPING_READY' 
                ? 'Catat Realisasi Pembagian PMT' 
                : 'Lengkapi Catatan Evaluasi Kegiatan'}
            </h3>

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {activeModalSchedule.status === 'SHOPPING_READY' ? (
              <div className="space-y-3">
                <p className="text-xs text-stone-600">
                  Berapa kotak PMT olahan umbi yang benar-benar tersalurkan kepada balita pada hari H?
                </p>
                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">
                    Jumlah Porsi Aktual Terbagi (Wajib Diisi):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={actualPortionsInput}
                    onChange={e => setActualPortionsInput(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2.5 rounded-xl border border-brand-border text-sm font-black text-brand-green"
                  />
                  <span className="text-[11px] text-stone-400 block mt-1">
                    Target awal: {activeModalSchedule.targetPortions} porsi
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-stone-600">
                  Catat umpan balik respon anak, pertanyaan ibu balita saat Meja 4, atau kendala memasak:
                </p>
                <textarea
                  rows={3}
                  value={evalNotesInput}
                  onChange={e => setEvalNotesInput(e.target.value)}
                  placeholder="Contoh: Balita suka tekstur tim talas, tidak ada komplain gatal. Ibu-ibu minta resep dibagikan lagi di WA."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-border"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => { setActiveModalSchedule(null); setErrorMessage(''); }}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold"
              >
                Batal
              </button>

              {activeModalSchedule.status === 'SHOPPING_READY' ? (
                <button
                  onClick={handleConfirmDistribution}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold"
                >
                  Simpan Status Tersalurkan
                </button>
              ) : (
                <button
                  onClick={handleConfirmEvaluation}
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold"
                >
                  Selesaikan Evaluasi
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
