import React from 'react';
import { MythFactFlipCards } from '../components/quiz/MythFactFlipCards';
import { MicroQuizEngine } from '../components/quiz/MicroQuizEngine';
import { HelpCircle, Sparkles } from 'lucide-react';

export const QuizMythView: React.FC = () => {
  return (
    <div className="space-y-12 pb-16">
      
      {/* View Header */}
      <div className="bg-gradient-to-r from-brand-orange/15 via-amber-50 to-brand-green/10 p-6 sm:p-10 rounded-3xl border-2 border-brand-orange/30 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-bold text-brand-orange border border-brand-orange/20">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Zona Antrean Edukatif Posyandu</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Kuis Cerdas & Kartu Mitos vs Fakta Gizi Umbi
        </h1>
        <p className="text-xs sm:text-sm text-stone-700 max-w-2xl leading-relaxed">
          Dirancang untuk dimainkan ibu balita selama 3-5 menit saat mengantre di Meja 1 hingga Meja 4 Posyandu. Uji pemahaman gizi, pecahkan mitos kuno, dan raih lencana digital Bunda Pelopor Pangan Lokal!
        </p>
      </div>

      {/* Part 1: Micro-Quiz 5 Soal */}
      <section>
        <MicroQuizEngine />
      </section>

      {/* Part 2: Kartu Balik Mitos vs Fakta */}
      <section>
        <MythFactFlipCards />
      </section>

    </div>
  );
};
