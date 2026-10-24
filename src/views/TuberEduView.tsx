import React from 'react';
import { TuberComparisonTable } from '../components/tubers/TuberComparisonTable';
import { NATIONAL_FOOD_STATS } from '../data/scientific-seed-data';
import { 
  BookOpen, 
  Droplet, 
  Leaf, 
  ShieldAlert, 
  Sparkles, 
  Scale, 
  CheckCircle2,
  Award,
  Globe2
} from 'lucide-react';

export const TuberEduView: React.FC = () => {
  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="bg-brand-dark text-white p-6 sm:p-10 rounded-3xl border border-stone-800 shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-amber-300">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Modul Edukasi Sains & Keamanan Pangan</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
          Eksplorasi Ilmiah 3 Umbi Lokal vs Beras Putih
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
          Mengapa diversifikasi ke Singkong, Ubi Jalar, dan Talas sangat krusial bagi pertumbuhan balita Indonesia? Pelajari data nutrisi, indeks glikemik, jejak ekologis, serta protokol keamanan olah bebas gatal dan racun.
        </p>

        {/* 4 National Stats Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-stone-800 text-xs">
          <div className="bg-stone-900/80 p-3 rounded-2xl border border-stone-800">
            <span className="text-stone-400 text-[10px] block">Ketergantungan Beras</span>
            <span className="text-xl font-black text-brand-orange">{NATIONAL_FOOD_STATS.riceDependencePct}%</span>
            <span className="text-[10px] text-stone-500 block">139,5 kg/kapita/thn</span>
          </div>
          <div className="bg-stone-900/80 p-3 rounded-2xl border border-stone-800">
            <span className="text-stone-400 text-[10px] block">Jejak Air Beras Sawah</span>
            <span className="text-xl font-black text-sky-400">2.291 – 3.420</span>
            <span className="text-[10px] text-stone-500 block">Liter air per 1 kg beras</span>
          </div>
          <div className="bg-stone-900/80 p-3 rounded-2xl border border-stone-800">
            <span className="text-stone-400 text-[10px] block">Emisi Padi Sawah</span>
            <span className="text-xl font-black text-rose-400">{NATIONAL_FOOD_STATS.agriculturalEmissionSharePct}%</span>
            <span className="text-[10px] text-stone-500 block">Dari total agrikultur nasional</span>
          </div>
          <div className="bg-stone-900/80 p-3 rounded-2xl border border-stone-800">
            <span className="text-stone-400 text-[10px] block">Produksi Umbi Lokal</span>
            <span className="text-xl font-black text-emerald-400">16,4 Juta</span>
            <span className="text-[10px] text-stone-500 block">Ton singkong & ubi per thn</span>
          </div>
        </div>
      </div>

      {/* Main Scientific Comparison Table & Visual Bar */}
      <TuberComparisonTable />

      {/* Deep Dive: Inovasi Mocaf & Keamanan Pangan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Box Mocaf */}
        <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-4">
          <span className="text-xs font-black uppercase tracking-wider text-brand-green bg-emerald-100 px-3 py-1 rounded-full">
            Inovasi Pangan Bebas Gluten
          </span>
          <h3 className="text-xl font-black text-stone-900">
            Tepung Mocaf (Modified Cassava Flour)
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Mocaf dihasilkan dari singkong yang dirajang tipis lalu difermentasi dengan bakteri asam laktat alami sebelum dikeringkan dan ditepungkan.
          </p>

          <div className="space-y-2 text-xs text-stone-800">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Pati Resisten (Resistant Starch):</strong> Membantu menurunkan indeks glikemik dan menyehatkan mikrobioma usus anak.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>100% Bebas Gluten (Gluten-Free):</strong> Sangat aman bagi balita yang memiliki alergi terigu atau intoleransi gluten.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Tahan Simpan:</strong> Bentuk tepung memudahkan kader Posyandu menyimpan stok bahan PMT tanpa takut busuk.</span>
            </div>
          </div>
        </div>

        {/* Box Penanganan Talas Anti-Oksalat */}
        <div className="bg-purple-50/60 rounded-3xl border-2 border-brand-purple/30 p-6 sm:p-8 shadow-sm space-y-4">
          <span className="text-xs font-black uppercase tracking-wider text-brand-purple bg-purple-200 px-3 py-1 rounded-full">
            Solusi Ilmiah Anti-Gatal
          </span>
          <h3 className="text-xl font-black text-purple-950">
            Kalsium Oksalat pada Talas: Mengapa & Bagaimana Solusinya?
          </h3>
          <p className="text-xs sm:text-sm text-purple-950 leading-relaxed font-medium">
            Rasa gatal di mulut atau tenggorokan berasal dari kristal kalsium oksalat yang berbentuk jarum mikroskopis (*raphides*).
          </p>

          <div className="space-y-2 text-xs text-purple-950 font-medium">
            <div className="p-2.5 bg-white rounded-xl border border-purple-200">
              <strong className="block text-brand-purple">1. Kupas Kering:</strong>
              <span>Jangan cuci talas sebelum dikupas agar cairan getah tidak masuk ke pori-pori kulit tangan.</span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-purple-200">
              <strong className="block text-brand-purple">2. Air Garam Hangat 15-20 Menit:</strong>
              <span>Ion natrium (Na+) pada garam menarik dan melarutkan kristal oksalat keluar dari jaringan umbi talas.</span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-purple-200">
              <strong className="block text-brand-purple">3. Pemanasan Matang Sempurna:</strong>
              <span>Suhu mendidih saat mengukus/merebus menghancurkan sisa kristal oksalat, menyisakan tekstur pati yang super lembut.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
