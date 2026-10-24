import React, { useState } from 'react';
import { Recipe } from '../types';
import { QrCode, Search, AlertCircle, X, ArrowRight, ChefHat } from 'lucide-react';

interface PmtAccessModalProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onClose: () => void;
  initialCode?: string;
}

export const PmtAccessModal: React.FC<PmtAccessModalProps> = ({
  recipes,
  onSelectRecipe,
  onClose,
  initialCode = ''
}) => {
  const [codeInput, setCodeInput] = useState<string>(initialCode);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleResolveCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const cleaned = codeInput.trim().toUpperCase();

    if (!cleaned) {
      setErrorMsg('Silakan masukkan kode 6 karakter yang tertera di tutup kotak PMT Bunda.');
      return;
    }

    // Match by recipeCode or slug
    const matched = recipes.find(
      r => r.recipeCode.toUpperCase() === cleaned || 
           r.recipeCode.toUpperCase().includes(cleaned) ||
           cleaned.includes(r.recipeCode.toUpperCase())
    );

    if (matched) {
      onSelectRecipe(matched);
      onClose();
    } else {
      setErrorMsg(
        'Kode resep atau jadwal PMT yang Bunda masukkan belum ditemukan. Pastikan kode sesuai dengan yang tertulis pada stiker kotak PMT (contoh: UMBI-01) atau silakan pilih langsung dari daftar resep di bawah ini.'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92dvh] overflow-y-auto p-5 sm:p-8 shadow-2xl relative space-y-4">
        
        <div className="flex items-center justify-between pb-3 border-b border-brand-border">
          <div className="flex items-center gap-2 text-stone-900">
            <QrCode className="w-5 h-5 text-brand-orange" />
            <h3 className="text-base sm:text-lg font-black tracking-tight">
              Akses Cepat Kode Kotak PMT
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed">
          Kamera HP tidak bisa memindai QR Code? Cukup ketikkan kode singkat yang tertera di stiker tutup kotak PMT balita Bunda (misal: <strong>UMBI-01</strong> atau <strong>UMBI-04</strong>):
        </p>

        {/* Input Form */}
        <form onSubmit={handleResolveCode} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              autoFocus
              value={codeInput}
              onChange={e => setCodeInput(e.target.value.toUpperCase())}
              placeholder="Contoh: UMBI-01"
              className="flex-1 px-4 py-3 bg-brand-cream border border-brand-border rounded-xl font-mono font-black text-sm uppercase focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 shrink-0"
            >
              <span>Buka</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
        </form>

        {/* Shortcut Quick Buttons for 6 Available Recipes */}
        <div className="pt-2 border-t border-brand-border/60 space-y-2">
          <span className="text-[11px] font-bold text-stone-500 uppercase block">
            Atau Pilih Cepat Menu PMT Hari Ini:
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {recipes.slice(0, 6).map(r => (
              <button
                key={r.id}
                onClick={() => { onSelectRecipe(r); onClose(); }}
                className="p-2 text-left bg-stone-50 hover:bg-brand-cream rounded-xl border border-brand-border transition-colors truncate"
              >
                <span className="font-mono font-bold text-brand-orange block text-[10px]">{r.recipeCode}</span>
                <span className="font-bold text-stone-900 truncate block text-[11px]">{r.title}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
