import React from 'react';
import { getTuberImage } from '../lib/tuber-assets';
import { sound } from '../lib/sound-effects';
import { 
  HeartPulse, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  ChefHat, 
  Egg, 
  Fish, 
  Drumstick, 
  Info,
  Wheat
} from 'lucide-react';

interface NutritionInfoViewProps {
  onNavigate: (view: string) => void;
}

export const NutritionInfoView: React.FC<NutritionInfoViewProps> = ({ onNavigate }) => {
  const nutritionCards = [
    {
      slug: 'ubi-jalar' as const,
      name: 'Ubi Jalar',
      subtitle: 'Ubi Oranye & Ubi Ungu',
      badge: 'Kaya Vitamin A',
      borderColor: 'border-brand-orange/40',
      headerBg: 'bg-orange-50',
      badgeBg: 'bg-brand-orange text-white',
      accentText: 'text-brand-orange',
      calories: '86 kkal',
      carbs: '20 gram',
      fiber: '2,5 gram (6x lipat nasi)',
      glycemic: 'Rendah (44) — Kenyang lebih awet',
      vitamins: [
        'Sangat tinggi Beta-Karoten (Vitamin A) untuk kesehatan mata dan daya tahan tubuh anak.',
        'Rasa manis alami sehingga disukai anak tanpa perlu tambahan gula pasir.',
        'Serat tinggi membantu melancarkan buang air besar (BAB) si kecil.'
      ]
    },
    {
      slug: 'singkong' as const,
      name: 'Singkong',
      subtitle: 'Singkong Segar & Tepung Mocaf',
      badge: 'Sumber Tenaga Padat',
      borderColor: 'border-brand-green/40',
      headerBg: 'bg-emerald-50',
      badgeBg: 'bg-brand-green text-white',
      accentText: 'text-brand-green',
      calories: '162 kkal',
      carbs: '38 gram',
      fiber: '2,2 gram (5x lipat nasi)',
      glycemic: 'Sedang — Memberi tenaga ekstra',
      vitamins: [
        'Padat kalori, sangat cocok untuk membantu menambah berat badan balita yang aktif.',
        'Mengandung Kalsium dan Fosfor untuk pertumbuhan tulang dan gigi.',
        'Jika diolah menjadi tepung Mocaf, bebas gluten dan sangat ramah untuk pencernaan.'
      ]
    },
    {
      slug: 'talas' as const,
      name: 'Talas',
      subtitle: 'Talas Bogor / Keladi',
      badge: 'Mudah Dicerna Bayi',
      borderColor: 'border-brand-purple/40',
      headerBg: 'bg-purple-50',
      badgeBg: 'bg-brand-purple text-white',
      accentText: 'text-brand-purple',
      calories: '145 kkal',
      carbs: '34 gram',
      fiber: '1,8 gram (4x lipat nasi)',
      glycemic: 'Rendah-Sedang (53) — Nyaman di perut',
      vitamins: [
        'Tekstur patinya paling halus dan lembut, sangat mudah dicerna oleh perut bayi mulai 6 bulan.',
        'Juara kandungan Kalium (536 mg) untuk mendukung fungsi otot dan jantung sehat.',
        'Kaya serat alami dan mineral penting untuk tumbuh kembang.'
      ]
    }
  ];

  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      
      {/* 1. Header Ramah Ibu */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-green/10 text-brand-green rounded-full text-xs sm:text-sm font-bold">
          <HeartPulse className="w-4 h-4" />
          <span>Informasi Gizi Umbi Lokal</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
          Kandungan Gizi Umbi Dibandingkan Nasi Putih
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          Banyak Bunda belum tahu bahwa <strong>Ubi Jalar, Singkong, dan Talas</strong> memiliki serat alami dan vitamin yang jauh lebih kaya dibandingkan nasi putih biasa. Yuk, kenali kandungan gizinya dalam setiap <strong>100 gram (sekitar 1 mangkuk kecil)</strong>!
        </p>
      </div>

      {/* 2. Kartu Kandungan Gizi 3 Umbi */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900">
          Profil Gizi per 1 Mangkuk Kecil (100 Gram)
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {nutritionCards.map((item) => (
            <div 
              key={item.slug}
              className={`bg-white rounded-3xl border-2 ${item.borderColor} overflow-hidden shadow-sm flex flex-col justify-between`}
            >
              <div>
                {/* Header Kartu dengan Foto */}
                <div className={`${item.headerBg} p-5 flex items-center gap-4 border-b border-stone-200/60`}>
                  <img 
                    src={getTuberImage(item.slug)} 
                    alt={item.name} 
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md shrink-0 bg-white"
                  />
                  <div>
                    <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1 ${item.badgeBg}`}>
                      {item.badge}
                    </span>
                    <h3 className="text-xl font-black text-stone-900">{item.name}</h3>
                    <p className="text-xs text-stone-600 font-medium">{item.subtitle}</p>
                  </div>
                </div>

                {/* Angka Gizi Utama */}
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3 bg-brand-cream/70 p-3.5 rounded-2xl border border-brand-border">
                    <div>
                      <span className="text-xs text-stone-500 font-semibold block">Energi (Tenaga)</span>
                      <span className={`text-xl font-black ${item.accentText}`}>{item.calories}</span>
                    </div>
                    <div>
                      <span className="text-xs text-stone-500 font-semibold block">Karbohidrat</span>
                      <span className="text-xl font-black text-stone-800">{item.carbs}</span>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-stone-200/70">
                      <span className="text-xs text-stone-500 font-semibold block">Serat Alami (Pelancar BAB)</span>
                      <span className="text-sm font-extrabold text-emerald-700">{item.fiber}</span>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-stone-200/70">
                      <span className="text-xs text-stone-500 font-semibold block">Penyerapan Gula (Kenyang)</span>
                      <span className="text-sm font-bold text-stone-800">{item.glycemic}</span>
                    </div>
                  </div>

                  {/* Manfaat Utama */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                      Manfaat untuk Si Kecil:
                    </span>
                    {item.vitamins.map((vit, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{vit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Perbandingan Sederhana dengan Nasi Putih */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-border pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              Apa Bedanya dengan Nasi Putih?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              Perbandingan sederhana dalam setiap 100 gram bahan makanan matang
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-stone-100 text-stone-700 px-3 py-1.5 rounded-xl border border-stone-200 self-start">
            <Wheat className="w-4 h-4 text-amber-600" />
            <span>Nasi Putih: 130 kkal & Serat 0,4g</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Grafik 1: Serat Pangan */}
          <div className="bg-brand-cream/60 p-5 rounded-2xl border border-brand-border space-y-4">
            <div>
              <h3 className="font-black text-stone-900 text-base">
                1. Kandungan Serat (Agar Anak Tidak Sembelit)
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Umbi lokal mengandung serat 4 hingga 6 kali lebih banyak daripada nasi putih.
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-brand-orange">Ubi Jalar</span>
                  <span>2,5 gram (Sangat Tinggi)</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-3.5">
                  <div className="bg-brand-orange h-3.5 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-brand-green">Singkong</span>
                  <span>2,2 gram (Tinggi)</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-3.5">
                  <div className="bg-brand-green h-3.5 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-brand-purple">Talas</span>
                  <span>1,8 gram (Baik)</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-3.5">
                  <div className="bg-brand-purple h-3.5 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1 text-stone-500">
                  <span>Nasi Putih Biasa</span>
                  <span className="text-rose-600">0,4 gram (Sedikit)</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-3.5">
                  <div className="bg-stone-400 h-3.5 rounded-full" style={{ width: '15%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Grafik 2: Daya Tahan Kenyang */}
          <div className="bg-brand-cream/60 p-5 rounded-2xl border border-brand-border space-y-4">
            <div>
              <h3 className="font-black text-stone-900 text-base">
                2. Tenaga & Rasa Kenyang Lebih Tahan Lama
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Karbohidrat pada umbi dilepaskan perlahan sehingga anak tidak cepat lapar atau rewel.
              </p>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-stone-700">
              <div className="p-3 bg-white rounded-xl border border-brand-border flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-brand-orange text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="text-stone-900 block">Ubi Jalar (Penyerapan Paling Stabil)</strong>
                  <span>Manis alaminya ramah di tubuh anak, cocok untuk MPASI maupun camilan sore.</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-brand-border flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-brand-purple text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="text-stone-900 block">Talas (Paling Lembut di Perut)</strong>
                  <span>Butiran patinya sangat halus sehingga mudah dicerna bayi yang baru belajar makan.</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-brand-border flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-brand-green text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="text-stone-900 block">Singkong (Tenaga Paling Padat)</strong>
                  <span>Kalorinya lebih tinggi dari nasi, bagus untuk mengejar berat badan anak.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Aturan Penting: Wajib Tambah Lauk Protein Hewani */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-emerald-50 rounded-3xl border-2 border-brand-orange/40 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-orange text-white flex items-center justify-center shrink-0 shadow-md">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange bg-white px-3 py-0.5 rounded-full border border-brand-orange/30">
              Penting Diketahui Bunda
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-stone-900 mt-1">
              Saat Makan Umbi, Wajib Ditemani Lauk Protein Hewani!
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mt-1">
              Sama seperti nasi, umbi adalah <strong>sumber karbohidrat (pemberi tenaga)</strong> dan kandungan protein alaminya masih rendah (sekitar 1,5 gram). Agar anak tumbuh tinggi, cerdas, dan <strong>bebas stunting</strong>, selalu sajikan olahan umbi bersama lauk protein hewani berikut:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-amber-200 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Egg className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-sm">Telur Ayam / Puyuh</h4>
              <p className="text-xs text-stone-600">Murah, mudah didapat, tinggi protein & bagus untuk otak.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-amber-200 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <Fish className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-sm">Ikan Kembung / Lele</h4>
              <p className="text-xs text-stone-600">Kaya Omega-3 dan protein tinggi untuk kecerdasan anak.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-amber-200 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <Drumstick className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-stone-900 text-sm">Ayam & Hati Ayam</h4>
              <p className="text-xs text-stone-600">Kaya zat besi untuk mencegah kurang darah (anemia) pada bayi.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('kalkulator');
            }}
            className="btn-press px-5 py-3 bg-brand-green hover:bg-emerald-800 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md flex items-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            <span>Hitung Takaran Porsi di Kalkulator Gizi</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('resep');
            }}
            className="btn-press px-5 py-3 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2"
          >
            <ChefHat className="w-4 h-4 text-brand-orange" />
            <span>Lihat Resep Umbi + Protein</span>
          </button>
        </div>
      </div>

    </div>
  );
};

