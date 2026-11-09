import React from 'react';
import { UtensilsCrossed, BookOpen, HeartPulse, Calculator, ChefHat } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-brand-dark text-stone-300 pt-10 pb-24 lg:pb-10 border-t border-stone-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* 1. Tentang Kumbi */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center text-white">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">Kumbi</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Website edukasi gizi dan katalog resep olahan <strong>Singkong, Ubi Jalar, dan Talas</strong> sebagai alternatif pendamping beras. Terintegrasi dengan program PMT Posyandu dan protokol wajib protein hewani.
            </p>
          </div>

          {/* 2. Menu Fitur Utama */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Fitur Utama
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('edukasi')}
                  className="hover:text-brand-orange transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-brand-green" />
                  <span>Edukasi Umbi & Cara Olah Aman</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('info-gizi')}
                  className="hover:text-brand-orange transition-colors flex items-center gap-2"
                >
                  <HeartPulse className="w-4 h-4 text-emerald-400" />
                  <span>Informasi Gizi Umbi Lokal</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('kalkulator')}
                  className="hover:text-brand-orange transition-colors flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-brand-orange" />
                  <span>Kalkulator Gizi Pengganti Nasi</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('resep')}
                  className="hover:text-brand-orange transition-colors flex items-center gap-2"
                >
                  <ChefHat className="w-4 h-4 text-amber-300" />
                  <span>Katalog Resep MPASI & Balita</span>
                </button>
              </li>
            </ul>
          </div>

          {/* 3. Pesan Gizi Seimbang */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Ingat Pesan Gizi Bunda
            </h4>
            <div className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 text-xs sm:text-sm text-stone-300 space-y-2 leading-relaxed">
              <p>
                <strong className="text-amber-300">1. Cuci & Masak Matang:</strong> Kupas bersih umbi, rendam air garam hangat khusus untuk talas, dan kukus/rebus hingga matang sempurna.
              </p>
              <p>
                <strong className="text-emerald-400">2. Wajib Lauk Protein Hewani:</strong> Selalu padukan olahan umbi dengan telur, ikan, atau ayam agar si kecil sehat dan bebas stunting.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-stone-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <p>© 2026 Kumbi — Edukasi Gizi & Resep Olahan Umbi Lokal Posyandu.</p>
          <p>Sumber Acuan Gizi: Tabel Komposisi Pangan Indonesia (Kemenkes RI).</p>
        </div>

      </div>
    </footer>
  );
};
