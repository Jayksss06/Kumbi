import React from 'react';
import { UtensilsCrossed, HeartHandshake, Leaf, Droplet, Award, Globe2 } from 'lucide-react';
import { NATIONAL_FOOD_STATS } from '../../data/scientific-seed-data';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-stone-300 pt-12 pb-24 lg:pb-12 border-t border-stone-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info & Sustainability Role */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center text-white">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">Kumbi</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              Platform Edukasi & Resep Olahan Umbi Lokal (Singkong, Ubi Jalar, Talas) Berbasis Kemitraan Posyandu Anak untuk Kemandirian Pangan dan Pencegahan Stunting.
            </p>
            <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800 text-xs">
              <p className="text-brand-orange font-bold flex items-center gap-1.5 mb-1">
                <HeartHandshake className="w-4 h-4" />
                Kemitraan Berkelanjutan
              </p>
              <p className="text-stone-400 text-[11px] leading-relaxed">
                <strong className="text-stone-200">Mahasiswa:</strong> Fasilitator sistem & literasi awal.<br />
                <strong className="text-stone-200">Kader Posyandu:</strong> Eksekutor mandiri berkelanjutan.
              </p>
            </div>
          </div>

          {/* National Food Reality */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-brand-orange" />
              Fakta Pangan Nasional
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <span className="text-brand-orange font-bold">•</span>
                <span>Ketergantungan beras rumah tangga RI: <strong className="text-white">{NATIONAL_FOOD_STATS.riceDependencePct}%</strong> ({NATIONAL_FOOD_STATS.riceConsumptionKgPerCapitaYear} kg/kapita vs global {NATIONAL_FOOD_STATS.globalRiceConsumptionAvgKg} kg).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-orange font-bold">•</span>
                <span>Jejak air beras sawah: <strong className="text-white">2.291 – 3.420 liter</strong> air per 1 kg beras.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-orange font-bold">•</span>
                <span>Emisi pertanian padi sawah menyumbang <strong className="text-white">{NATIONAL_FOOD_STATS.agriculturalEmissionSharePct}%</strong> emisi agrikultur nasional.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-orange font-bold">•</span>
                <span>Potensi produksi umbi nasional: <strong className="text-white">{NATIONAL_FOOD_STATS.nationalCassavaSweetPotatoAnnualTons.toLocaleString('id-ID')} ton</strong> per tahun dari {NATIONAL_FOOD_STATS.localCarbVarietiesCount} sumber karbohidrat Nusantara.</span>
              </li>
            </ul>
          </div>

          {/* SDG Alignment */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              Target SDGs Terukur
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="bg-stone-900/60 p-2.5 rounded-lg border border-stone-800">
                <span className="font-bold text-emerald-400">SDG 2: Tanpa Kelaparan</span>
                <p className="text-[11px] text-stone-400 mt-0.5">Diversifikasi karbohidrat umbi bernutrisi tinggi untuk MPASI & balita.</p>
              </div>
              <div className="bg-stone-900/60 p-2.5 rounded-lg border border-stone-800">
                <span className="font-bold text-sky-400">SDG 3: Kehidupan Sehat</span>
                <p className="text-[11px] text-stone-400 mt-0.5">Cegah stunting lewat Golden Rule wajib paduan protein hewani & keamanan pangan.</p>
              </div>
              <div className="bg-stone-900/60 p-2.5 rounded-lg border border-stone-800">
                <span className="font-bold text-amber-400">SDG 12: Konsumsi Bertanggung Jawab</span>
                <p className="text-[11px] text-stone-400 mt-0.5">Penghematan ribuan liter jejak air tanah melalui substitusi porsi nasi.</p>
              </div>
            </div>
          </div>

          {/* Mitra Posyandu Anak */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Jaringan Mitra Aktif
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p className="font-semibold text-stone-200">Posyandu Melati RW 05 (Beji, Depok)</p>
              <p className="text-[11px] text-stone-500">Pelopor Menu PMT Bola Ubi Ungu & Bubur Tim Talas</p>
              <p className="font-semibold text-stone-200 pt-1">Posyandu Anggrek Ceria (Sukmajaya)</p>
              <p className="text-[11px] text-stone-500">Pilot Project Double Protein MPASI Hati Ayam</p>
              <p className="font-semibold text-stone-200 pt-1">Posyandu Tunas Harapan (Pondok Cina)</p>
              <p className="text-[11px] text-stone-500">Pemanfaatan Tepung Mocaf Ramah Balita</p>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Academic Note */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© 2026 Kumbi — Kolaborasi Akademik & Posyandu Anak untuk Kedaulatan Pangan Indonesia.</p>
          <p className="text-stone-400 text-[11px]">
            Data Ilmiah Berdasarkan TKPI Kemenkes RI, IDAI, Balitkabi, & Water Footprint Network.
          </p>
        </div>

      </div>
    </footer>
  );
};
