import React, { useState } from 'react';
import { PmtSchedule, Recipe, PosyanduPartner } from '../../types';
import { buildKaderPmtAnnouncementUrl } from '../../lib/whatsapp-builder';
import { Share2, Copy, Check, X, Send } from 'lucide-react';

interface WaShareModalProps {
  schedule: PmtSchedule;
  recipe: Recipe;
  posyandu: PosyanduPartner;
  onClose: () => void;
}

export const WaShareModal: React.FC<WaShareModalProps> = ({
  schedule,
  recipe,
  posyandu,
  onClose
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const waUrl = buildKaderPmtAnnouncementUrl(schedule, recipe, posyandu);

  // Decode text for display
  const messageText = decodeURIComponent(waUrl.replace('https://wa.me/?text=', ''));

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWa = () => {
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-4">
        
        <div className="flex items-center justify-between pb-3 border-b border-brand-border">
          <div className="flex items-center gap-2 text-emerald-800">
            <Share2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base sm:text-lg font-black tracking-tight">
              Generator Pengumuman WhatsApp PMT
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-600">
          Format pesan resmi yang ramah dan siap dikirimkan ke Grup WhatsApp ibu balita {posyandu.name}:
        </p>

        {/* Message Preview Box */}
        <div className="bg-stone-50 border border-brand-border rounded-2xl p-4 text-xs font-mono text-stone-800 max-h-60 overflow-y-auto whitespace-pre-wrap leading-relaxed">
          {messageText}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
          <button
            onClick={handleCopy}
            className="w-full sm:flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Teks Berhasil Disalin!' : 'Salin Teks Pesan'}</span>
          </button>

          <button
            onClick={handleOpenWa}
            className="w-full sm:flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Langsung ke WA</span>
          </button>
        </div>

      </div>
    </div>
  );
};
