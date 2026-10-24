import React, { useState } from 'react';
import { QUIZ_QUESTIONS_DATA } from '../../data/scientific-seed-data';
import { sound } from '../../lib/sound-effects';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Share2, 
  Sparkles,
  ChevronRight,
  HelpCircle,
  Volume2,
  VolumeX
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MicroQuizEngine: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const questions = QUIZ_QUESTIONS_DATA;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentIdx]: optIdx });
    setIsAnswerSubmitted(true);

    // If correct, play subtle confetti & sound
    if (optIdx === currentQ.correctOptionIndex) {
      sound.playCheck();
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      } catch {}
    } else {
      sound.playClick();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setIsAnswerSubmitted(selectedAnswers[currentIdx + 1] !== undefined);
    } else {
      setIsQuizCompleted(true);
      sound.playSuccess();
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      } catch {}
    }
  };

  const handleReset = () => {
    sound.playClick();
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsAnswerSubmitted(false);
    setIsQuizCompleted(false);
  };

  // Calculate final score
  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctOptionIndex) {
      correctCount += 1;
    }
  });
  const finalScore = Math.round((correctCount / questions.length) * 100);

  const handleShareScoreWa = () => {
    sound.playClick();
    const text = `*Hasil Evaluasi Pemahaman Gizi Umbi Posyandu*\n\n` +
      `Skor Evaluasi: *${finalScore}/100*\n` +
      `Lencana: *Bunda Pelopor Pangan Lokal*\n` +
      `Topik: Diversifikasi Umbi Lokal Pendamping Beras & Paduan Protein Hewani Balita.\n\n` +
      `Akses modul dan kuis interaktif:\n` +
      `${window.location.origin}/#kuis`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const progressPercent = Math.round(((currentIdx + (isAnswerSubmitted ? 1 : 0)) / questions.length) * 100);

  return (
    <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs font-bold mb-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            Zona Antrean Posyandu (3-5 Menit)
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            Micro-Quiz: Cerdas Gizi Umbi Lokal & Cegah Stunting
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Jawab 5 pertanyaan singkat ini sambil menunggu giliran timbang di Posyandu!
          </p>
        </div>

        {!isQuizCompleted && (
          <div className="text-right">
            <span className="text-xs font-bold bg-brand-cream px-3 py-1.5 rounded-xl border border-brand-border text-stone-700">
              Soal {currentIdx + 1} dari {questions.length}
            </span>
          </div>
        )}
      </div>

      {/* Animated Step Progress Bar */}
      {!isQuizCompleted && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-bold text-stone-500">
            <span>Kemajuan Kuis</span>
            <span className="text-brand-green">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
            <div 
              className="h-full bg-gradient-to-r from-brand-orange to-brand-green rounded-full transition-all duration-500 ease-out progress-striped"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* QUIZ IN PROGRESS */}
      {!isQuizCompleted ? (
        <div className="space-y-6">
          
          {/* Question Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-brand-cream border border-brand-border">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Pertanyaan #{currentIdx + 1}
            </span>
            <h3 className="text-base sm:text-lg font-black text-stone-900 leading-snug">
              {currentQ.questionText}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIdx] === optIdx;
              const isCorrect = currentQ.correctOptionIndex === optIdx;

              let btnStyle = 'bg-white border-brand-border hover:bg-stone-50 text-stone-800';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                } else {
                  btnStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`btn-press w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm transition-all flex items-start gap-3 min-h-[52px] ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="leading-relaxed flex-1">{opt}</span>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box (Revealed after selecting answer) */}
          {isAnswerSubmitted && (
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-xs sm:text-sm text-emerald-950 space-y-2 animate-in fade-in">
              <strong className="block font-bold text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Penjelasan Ilmiah:
              </strong>
              <p className="leading-relaxed">{currentQ.explanationText}</p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="btn-press px-5 py-2.5 bg-brand-green hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>{currentIdx < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil & Lencana'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* QUIZ COMPLETED RESULT SCREEN */
        <div className="text-center py-6 space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-orange to-amber-400 text-white flex items-center justify-center mx-auto shadow-xl">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-brand-orange bg-orange-100 px-3 py-1 rounded-full">
              Lencana Kehormatan Posyandu
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">
              Bunda Pelopor Pangan Lokal
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
              Hebat Bunda! Bunda memahami pentingnya diversifikasi umbi lokal dan paduan protein hewani demi mencetak generasi emas bebas stunting.
            </p>
          </div>

          {/* Score Badge */}
          <div className="inline-block bg-brand-cream border-2 border-brand-border p-4 rounded-3xl">
            <span className="text-xs font-bold text-stone-500 block">Skor Kuis Bunda</span>
            <span className="text-4xl font-black text-brand-green">{finalScore}</span>
            <span className="text-stone-400 font-bold text-sm"> / 100</span>
            <span className="block text-xs text-stone-500 mt-0.5 font-medium">
              ({correctCount} dari {questions.length} soal dijawab dengan benar)
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleShareScoreWa}
              className="btn-press w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Share2 className="w-4 h-4" />
              <span>Bagikan Skor ke Grup WA Posyandu</span>
            </button>

            <button
              onClick={handleReset}
              className="btn-press w-full sm:w-auto px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Kuis</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
