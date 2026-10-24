import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2, 
  Minimize2, 
  UtensilsCrossed, 
  ShieldAlert, 
  HeartPulse, 
  Calculator, 
  Droplet, 
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Egg,
  Fish,
  Drumstick,
  Leaf,
  ShieldCheck
} from 'lucide-react';
import { calculateRiceToTuberEquivalence } from '../../lib/nutrition-engine';
import { NATIONAL_FOOD_STATS } from '../../data/scientific-seed-data';

interface MejaEmpatPresenterProps {
  onClose: () => void;
}

export const MejaEmpatPresenter: React.FC<MejaEmpatPresenterProps> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [demoCentong, setDemoCentong] = useState<number>(2);

  const demoResult = calculateRiceToTuberEquivalence(demoCentong);

  const slides = [
    // SLIDE 1: Mengapa Umbi Lokal vs Beras Putih
    {
      title: 'Mengapa Umbi Lokal vs Beras Putih?',
      subtitle: 'Krisis Ketergantungan Pangan & Peluang Emas Tumbuh Kembang Anak',
      badge: 'Bagian 1: Fakta Pangan Nusantara',
      render: () => (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Box Masalah: Beras Putih */}
            <div className="bg-rose-50 border-4 border-rose-300 rounded-3xl p-6 sm:p-8 space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-rose-700 bg-rose-200/80 px-3 py-1 rounded-full">
                Kondisi Pangan Beras Saat Ini
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-rose-950">
                Ketergantungan Beras {NATIONAL_FOOD_STATS.riceDependencePct}%
              </h3>
              <ul className="space-y-3 text-base sm:text-lg text-rose-900 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-black">•</span>
                  <span>Konsumsi RI: <strong>139,5 kg/kapita/tahun</strong> (lebih dari 2x rata-rata dunia 60 kg).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-black">•</span>
                  <span>Jejak Air Ekologis: Menghabiskan <strong>2.291 – 3.420 liter air</strong> untuk 1 kg beras!</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-black">•</span>
                  <span>Serat pangan sangat rendah (hanya <strong>0,4g/100g</strong>).</span>
                </li>
              </ul>
            </div>

            {/* Box Solusi: Umbi Lokal */}
            <div className="bg-emerald-50 border-4 border-emerald-400 rounded-3xl p-6 sm:p-8 space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-200/80 px-3 py-1 rounded-full">
                Potensi Hebat Umbi Lokal Kita
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-emerald-950">
                16,4 Juta Ton Umbi Nasional
              </h3>
              <ul className="space-y-3 text-base sm:text-lg text-emerald-900 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-black">•</span>
                  <span>Indonesia memiliki <strong>77 jenis sumber karbohidrat</strong> unggulan.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-black">•</span>
                  <span>Serat <strong>4-7 kali lebih tinggi</strong> dari beras putih (2,0-3,0g).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-black">•</span>
                  <span>Hemat air tanah, tahan iklim kemarau, dan berlimpah di pasar lokal!</span>
                </li>
              </ul>
            </div>

          </div>

          <p className="text-center text-stone-800 text-base sm:text-lg font-bold bg-white p-4 rounded-2xl border-2 border-stone-200 flex items-center justify-center gap-2 shadow-sm">
            <Sparkles className="w-5 h-5 text-brand-orange shrink-0" />
            <span>"Pertumbuhan optimal dan kecerdasan anak didukung oleh diversifikasi pangan bernutrisi seimbang."</span>
          </p>
        </div>
      )
    },

    // SLIDE 2: Cara Aman Olah Talas, Ubi & Singkong
    {
      title: 'Cara Aman Olah 3 Umbi Tanpa Gatal & Pahit',
      subtitle: 'Protokol Keamanan Pangan Praktis Meja 4 Posyandu',
      badge: 'Bagian 2: Keamanan Pangan Balita',
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card Talas Anti-Oksalat */}
          <div className="bg-purple-50 border-4 border-brand-purple/40 rounded-3xl p-6 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-purple-900 bg-purple-200 px-3 py-1 rounded-full">
              Talas Bogor (Anti-Gatal)
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-purple-950">Protokol Anti-Oksalat</h4>
            <div className="space-y-3 text-sm sm:text-base text-purple-950 font-medium">
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-purple text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <span>Kupas talas dalam keadaan <strong>KERING</strong> (jangan dicuci dulu agar tangan tak gatal).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-purple text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <span>Rendam di <strong>air garam hangat 15-20 menit</strong> untuk larutkan kristal oksalat.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-purple text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <span>Bilas air mengalir hingga kesat, lalu kukus empuk. <strong>Hasilnya 100% bebas gatal!</strong></span>
              </div>
            </div>
          </div>

          {/* Card Ubi Jalar IG 44 */}
          <div className="bg-orange-50 border-4 border-brand-orange/40 rounded-3xl p-6 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-orange-900 bg-orange-200 px-3 py-1 rounded-full">
              Ubi Jalar Oranye / Ungu
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-orange-950">Jaga IG Rendah (44)</h4>
            <div className="space-y-3 text-sm sm:text-base text-orange-950 font-medium">
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-orange text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <span>Olah dengan cara <strong>KUKUS, REBUS, atau PANGGANG</strong> teflon.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-orange text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <span><strong>HINDARI goreng minyak banyak (deep fry)</strong> agar vitamin dan beta-karoten tak rusak.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-orange text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <span>Kaya Beta-Karoten alami: Menjaga mata anak dan imunitas saluran nafas.</span>
              </div>
            </div>
          </div>

          {/* Card Singkong & Mocaf */}
          <div className="bg-emerald-50 border-4 border-brand-green/40 rounded-3xl p-6 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-200 px-3 py-1 rounded-full">
              Singkong & Tepung Mocaf
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-emerald-950">Seleksi Bebas Sianida</h4>
            <div className="space-y-3 text-sm sm:text-base text-emerald-950 font-medium">
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-green text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <span>Pilih singkong manis dengan kulit ari dalam <strong>berwarna merah muda</strong>.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-green text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <span><strong>HINDARI</strong> singkong yang ada bercak kebiruan/hitam atau berasa pahit!</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-green text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <span>Kupas bersih, rendam air 15 menit, lalu kukus matang atau gunakan tepung Mocaf bebas gluten.</span>
              </div>
            </div>
          </div>

        </div>
      )
    },

    // SLIDE 3: Wajib Paduan Protein Cegah Stunting
    {
      title: 'Golden Rule: Wajib Paduan Protein Cegah Stunting!',
      subtitle: 'Kompensasi Rendahnya Protein Alami Umbi dengan Lauk Bergizi',
      badge: 'Bagian 3: Gizi Seimbang Anak',
      render: () => (
        <div className="space-y-6">
          <div className="bg-amber-100 border-4 border-amber-400 rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-black text-amber-950 flex items-center gap-2 mb-2">
              <HeartPulse className="w-7 h-7 text-brand-orange" />
              Mengapa Anak yang Makan Umbi WAJIB Ditambah Protein?
            </h3>
            <p className="text-base sm:text-lg text-amber-900 font-semibold leading-relaxed">
              "Kandungan protein alami umbi lokal hanya <strong>1,0 – 1,57 gram per 100g</strong>. Karbohidrat umbi memberi tenaga, namun otak dan tulang balita membutuhkan <strong>Protein Hewani</strong> untuk tumbuh tinggi bebas stunting!"
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white p-4 rounded-2xl border-2 border-stone-200 shadow-sm flex flex-col items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-1">
                <Egg className="w-5 h-5 text-amber-700" />
              </div>
              <h5 className="font-black text-stone-900 text-sm mt-1">Telur Ayam / Puyuh</h5>
              <p className="text-xs text-stone-500 mt-0.5">Protein skor 100 & kolin memori otak</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border-2 border-stone-200 shadow-sm flex flex-col items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center mb-1">
                <Fish className="w-5 h-5 text-sky-700" />
              </div>
              <h5 className="font-black text-stone-900 text-sm mt-1">Ikan Kembung / Lele</h5>
              <p className="text-xs text-stone-500 mt-0.5">Omega-3 tinggi & protein terjangkau</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border-2 border-stone-200 shadow-sm flex flex-col items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center mb-1">
                <Drumstick className="w-5 h-5 text-orange-700" />
              </div>
              <h5 className="font-black text-stone-900 text-sm mt-1">Hati Ayam / Daging</h5>
              <p className="text-xs text-stone-500 mt-0.5">Zat Besi Heme cegah anemia anak</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border-2 border-stone-200 shadow-sm flex flex-col items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-1">
                <Leaf className="w-5 h-5 text-emerald-700" />
              </div>
              <h5 className="font-black text-stone-900 text-sm mt-1">Tempe & Tahu</h5>
              <p className="text-xs text-stone-500 mt-0.5">Probiotik nabati & kalsium sehat</p>
            </div>
          </div>
        </div>
      )
    },

    // SLIDE 4: Live Demo Konversi Porsi Nasi
    {
      title: 'Demo Cepat: 1 Centong Nasi Anak = Berapa Gram Umbi?',
      subtitle: 'Alat Peraga Langsung untuk Penyuluhan Ibu Balita di Meja 4',
      badge: 'Bagian 4: Simulasi Langsung',
      render: () => (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border-4 border-brand-green/30 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase">Pilih Porsi Nasi Anak Bunda:</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-black text-brand-green">{demoCentong}</span>
                  <span className="text-lg font-bold text-stone-800">Centong Anak (~{demoResult.cookedRiceGrams}g nasi matang)</span>
                  <span className="text-sm font-bold text-stone-500">({demoResult.targetEnergyKcal} kkal)</span>
                </div>
              </div>

              <div className="flex gap-2">
                {[1, 2, 3].map(c => (
                  <button
                    key={c}
                    onClick={() => setDemoCentong(c)}
                    className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${
                      demoCentong === c ? 'bg-brand-green text-white shadow-md' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {c} Centong
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-brand-green text-center">
                <span className="text-xs font-bold text-brand-green uppercase">Singkong Kukus</span>
                <span className="text-3xl font-black text-brand-green block mt-1">{demoResult.singkongGrams} g</span>
                <span className="text-xs text-stone-600 block mt-1">{demoResult.singkongUrt}</span>
              </div>

              <div className="p-4 bg-orange-50 rounded-2xl border-2 border-brand-orange text-center">
                <span className="text-xs font-bold text-brand-orange uppercase">Ubi Jalar Kukus</span>
                <span className="text-3xl font-black text-brand-orange block mt-1">{demoResult.ubiJalarGrams} g</span>
                <span className="text-xs text-stone-600 block mt-1">{demoResult.ubiJalarUrt}</span>
              </div>

              <div className="p-4 bg-purple-50 rounded-2xl border-2 border-brand-purple text-center">
                <span className="text-xs font-bold text-brand-purple uppercase">Talas Kukus</span>
                <span className="text-3xl font-black text-brand-purple block mt-1">{demoResult.talasGrams} g</span>
                <span className="text-xs text-stone-600 block mt-1">{demoResult.talasUrt}</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 text-xs text-amber-900 font-semibold text-center flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{demoResult.proteinRecommendation}</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const current = slides[currentSlide];

  return (
    <div className={`fixed inset-0 z-50 bg-stone-900/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 ${isFullscreen ? 'p-2' : ''}`}>
      
      {/* Top Controls Header */}
      <div className="flex items-center justify-between bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center font-black text-sm">
            M4
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black tracking-tight">
              Mode Penyuluhan Meja 4 Posyandu
            </h2>
            <p className="text-[11px] text-stone-300">
              Tampilan layar penuh berhuruf besar untuk tablet & proyektor balai posyandu
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold bg-white/20 px-3 py-1 rounded-full">
            Slide {currentSlide + 1} dari {slides.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/20 hover:bg-rose-600 text-white transition-colors"
            title="Tutup Mode Presentasi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Card Container */}
      <div className="my-auto py-4 max-w-5xl w-full mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-stone-200 space-y-6">
          
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-brand-orange bg-orange-100 px-3 py-1 rounded-full">
              {current.badge}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight mt-2">
              {current.title}
            </h1>
            <p className="text-sm sm:text-base text-stone-500 font-medium mt-1">
              {current.subtitle}
            </p>
          </div>

          {/* Slide Body */}
          <div className="py-2">
            {current.render()}
          </div>

        </div>
      </div>

      {/* Bottom Navigation Toolbar */}
      <div className="flex items-center justify-between max-w-5xl w-full mx-auto bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 text-white">
        <button
          disabled={currentSlide === 0}
          onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all min-h-[48px] ${
            currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'bg-white/20 hover:bg-white/30 text-white'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Slide Sebelumnya</span>
        </button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all ${
                currentSlide === idx ? 'w-8 bg-brand-orange' : 'w-2.5 bg-white/40'
              }`}
            />
          ))}
        </div>

        <button
          disabled={currentSlide === slides.length - 1}
          onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all min-h-[48px] ${
            currentSlide === slides.length - 1 ? 'opacity-30 cursor-not-allowed' : 'bg-brand-orange hover:bg-orange-600 text-white shadow-lg'
          }`}
        >
          <span>Slide Berikutnya</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
