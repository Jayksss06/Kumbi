import React, { useEffect, useState } from 'react';
import { Recipe, PosyanduPartner, PmtSchedule } from '../../types';
import { generateQrCodeSvg } from '../../lib/qr-generator';
import { Printer, X, Tag, Sparkles } from 'lucide-react';

interface QrLabelSheetGeneratorProps {
  schedule?: PmtSchedule;
  recipe: Recipe;
  posyandu: PosyanduPartner;
  labelCount?: number;
  onClose: () => void;
}

export const QrLabelSheetGenerator: React.FC<QrLabelSheetGeneratorProps> = ({
  schedule,
  recipe,
  posyandu,
  labelCount = 8,
  onClose
}) => {
  const [qrSvg, setQrSvg] = useState<string>('');

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://umbicare.id';
    const targetUrl = `${origin}/#pmt-${recipe.recipeCode}`;
    generateQrCodeSvg(targetUrl).then(svg => setQrSvg(svg));
  }, [recipe.recipeCode]);

  const handlePrint = () => {
    window.print();
  };

  const labels = Array.from({ length: labelCount });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      
      {/* Modal Container */}
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 my-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        
        {/* Controls Header (no-print) */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6 no-print">
          <div>
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block">
              Pencetak Stiker Label QR Kotak PMT Posyandu
            </span>
            <p className="text-xs text-stone-500">
              Format Grid {labelCount} Label per Halaman A4 • Tempel di tutup kotak/kemasan PMT bulanan
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-brand-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Lembar Label</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE GRID CONTAINER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-2 print:gap-3">
          {labels.map((_, idx) => (
            <div 
              key={idx}
              className="border-2 border-dashed border-stone-800 rounded-2xl p-4 bg-white text-stone-900 flex items-center justify-between gap-3 shadow-sm print:shadow-none print:break-inside-avoid"
            >
              {/* Left Info */}
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-stone-900 text-white px-2 py-0.5 rounded">
                    PMT POSYANDU
                  </span>
                  <span className="text-[10px] font-bold text-stone-600">
                    {posyandu.name}
                  </span>
                </div>

                <h4 className="text-sm font-black text-stone-900 line-clamp-1 leading-snug">
                  {recipe.title}
                </h4>

                <p className="text-[11px] text-stone-600 font-medium">
                  Karbo Umbi: <strong>{recipe.tuberSlug.toUpperCase()}</strong> + Protein Bergizi
                </p>

                <div className="flex items-center gap-2 pt-1 text-[10px] font-bold text-stone-800">
                  <span className="bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded border border-emerald-300">
                    {recipe.caloriesPerPortion} kkal
                  </span>
                  <span className="bg-orange-100 text-orange-900 px-1.5 py-0.5 rounded border border-orange-300">
                    Protein {recipe.proteinGPerPortion}g
                  </span>
                </div>

                <p className="text-[9px] text-stone-500 pt-1 leading-tight">
                  Scan QR untuk cara masak tanpa gatal & rating Anak Lahap!
                </p>
              </div>

              {/* Right QR Code */}
              <div className="shrink-0 flex flex-col items-center">
                <div 
                  className="w-20 h-20 border-2 border-stone-900 rounded-xl p-1 bg-white flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                />
                <span className="text-[10px] font-mono font-black mt-1 text-stone-900">
                  {recipe.recipeCode}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-stone-400 text-center mt-6 no-print">
          Tips: Gunakan kertas stiker A4 (Label Tom & Jerry / Kertas HVS Tempel) untuk langsung ditempel di kotak makanan balita.
        </p>

      </div>

    </div>
  );
};
