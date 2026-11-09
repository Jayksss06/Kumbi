import React from 'react';
import { getTuberImage } from '../lib/tuber-assets';
import { sound } from '../lib/sound-effects';
import { 
  BookOpen, 
  CheckCircle2, 
  ShieldCheck, 
  Droplet, 
  Leaf, 
  ChefHat, 
  ArrowRight, 
  HeartPulse,
  AlertTriangle
} from 'lucide-react';

interface TuberEduViewProps {
  onNavigate?: (view: string) => void;
  onSelectTuberRecipes?: (tuberSlug: string) => void;
}

export const TuberEduView: React.FC<TuberEduViewProps> = ({ 
  onNavigate,
  onSelectTuberRecipes 
}) => {
  const tubersList = [
    {
      slug: 'ubi-jalar' as const,
      name: 'Ubi Jalar',
      localNames: 'Ubi Oranye / Ubi Ungu / Ketela Rambat / Boled',
      badge: 'Manis Alami & Kaya Vitamin A',
      borderColor: 'border-brand-orange/40',
      badgeColor: 'bg-brand-orange text-white',
      bgSoft: 'bg-orange-50/70',
      btnColor: 'bg-brand-orange hover:bg-orange-700 text-white',
      points: [
        'Manis alami dan teksturnya lembut, sangat mudah dilumatkan untuk bayi maupun anak.',
        'Ubi yang berdaging oranye kaya akan beta-karoten (vitamin A) untuk kesehatan mata dan daya tahan tubuh.',
        'Cocok diolah menjadi bubur bayi (puree), ubi kukus, dan bola-bola ubi isi.'
      ],
      safetyTitle: 'Cara Mengolah Ubi Jalar yang Tepat:',
      safetySteps: [
        'Pilih ubi yang kulitnya mulus, keras, dan tidak berlubang atau berbau asam.',
        'Cuci bersih kulit luarnya dari sisa tanah, lalu kupas.',
        'Kukus atau rebus hingga empuk (hindari menggoreng dengan minyak banyak agar vitaminnya tetap terjaga).'
      ]
    },
    {
      slug: 'singkong' as const,
      name: 'Singkong',
      localNames: 'Ketela Pohon / Kaspe / Sampeu & Tepung Mocaf',
      badge: 'Sumber Tenaga Mengenyangkan',
      borderColor: 'border-brand-green/40',
      badgeColor: 'bg-brand-green text-white',
      bgSoft: 'bg-emerald-50/70',
      btnColor: 'bg-brand-green hover:bg-emerald-800 text-white',
      points: [
        'Sumber tenaga yang padat dan mengenyangkan untuk anak yang aktif bergerak.',
        'Kupas bersih kulitnya, lalu masak sampai benar-benar matang (jangan pernah dimakan mentah).',
        'Cocok untuk schotel kukus, getuk, kroket, lumpia isi, atau diolah dari tepung Mocaf (tepung singkong bebas gluten).'
      ],
      safetyTitle: 'Cara Aman Mengolah Singkong (Bebas Pahit/Racun):',
      safetySteps: [
        'Pilih singkong manis segar yang kulit ari dalamnya berwarna putih atau merah muda (hindari singkong yang ada bercak kebiruan atau terasa pahit).',
        'Kupas kulit luar dan kulit arinya sampai bersih, lalu rendam dalam air bersih selama 15-30 menit.',
        'Kukus atau rebus di panci terbuka sampai benar-benar empuk dan matang sempurna.'
      ]
    },
    {
      slug: 'talas' as const,
      name: 'Talas',
      localNames: 'Talas Bogor / Keladi',
      badge: 'Tekstur Pulen & Lembut di Perut',
      borderColor: 'border-brand-purple/40',
      badgeColor: 'bg-brand-purple text-white',
      bgSoft: 'bg-purple-50/70',
      btnColor: 'bg-brand-purple hover:bg-purple-900 text-white',
      points: [
        'Tekstur pulen, lembut, dan mengandung serat alami yang nyaman untuk pencernaan anak.',
        'Getah mentahnya bisa bikin gatal: pakai sarung tangan saat mengupas dan masak sampai benar-benar matang.',
        'Cocok diolah menjadi bubur tim bayi, talas kukus, dan perkedel talas.'
      ],
      safetyTitle: 'Tips Rahasia Mengolah Talas Agar Tidak Gatal:',
      safetySteps: [
        'Jangan cuci talas sebelum dikupas! Kupas kulitnya dalam keadaan kering atau gunakan sarung tangan plastik agar tangan tidak gatal.',
        'Setelah dipotong-potong, rendam talas dalam air hangat yang diberi 1 sendok makan garam selama 15-20 menit untuk menghilangkan getah penyebab gatal.',
        'Bilas beberapa kali dengan air bersih mengalir sampai tidak berlendir, lalu kukus atau rebus sampai benar-benar matang.'
      ]
    }
  ];

  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      
      {/* 1. Header Ramah */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-green/10 text-brand-green rounded-full text-xs sm:text-sm font-bold">
          <BookOpen className="w-4 h-4" />
          <span>Edukasi Umbi Lokal</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
          Kenali 3 Umbi Lokal Kita & Cara Aman Mengolahnya
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          Selain nasi, Indonesia punya <strong>Ubi Jalar, Singkong, dan Talas</strong> yang bergizi tinggi, mudah didapat, dan lezat untuk menu makan anak sehari-hari. Yuk, pelajari ciri-ciri dan tips aman mengolahnya di dapur Bunda!
        </p>
      </div>

      {/* 2. Kartu Lengkap 3 Umbi Lokal + Cara Aman Mengolah */}
      <div className="space-y-6">
        {tubersList.map((tuber) => (
          <div 
            key={tuber.slug}
            className={`bg-white rounded-3xl border-2 ${tuber.borderColor} overflow-hidden shadow-sm`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Kolom Kiri: Foto & Keunggulan Utama */}
              <div className={`lg:col-span-5 ${tuber.bgSoft} p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-200/70`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={getTuberImage(tuber.slug)} 
                      alt={tuber.name} 
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-white shadow-md bg-white shrink-0"
                    />
                    <div>
                      <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-1.5 ${tuber.badgeColor}`}>
                        {tuber.badge}
                      </span>
                      <h2 className="text-2xl font-black text-stone-900">{tuber.name}</h2>
                      <p className="text-xs text-stone-600 font-medium">{tuber.localNames}</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-stone-700 block">
                      Keunggulan Utama:
                    </span>
                    {tuber.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-stone-800 leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {onSelectTuberRecipes && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onSelectTuberRecipes(tuber.slug);
                    }}
                    className={`mt-6 w-full py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 btn-press ${tuber.btnColor}`}
                  >
                    <ChefHat className="w-4 h-4" />
                    <span>Lihat Resep Olahan {tuber.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Kolom Kanan: Langkah Cara Aman Mengolah */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-2 text-stone-900 font-black text-base sm:text-lg">
                  <ShieldCheck className="w-6 h-6 text-brand-green shrink-0" />
                  <h3>{tuber.safetyTitle}</h3>
                </div>

                <div className="space-y-3">
                  {tuber.safetySteps.map((step, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-2xl bg-brand-cream/70 border border-brand-border flex items-start gap-3.5"
                    >
                      <span className="w-7 h-7 rounded-full bg-brand-green text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-stone-800 leading-relaxed font-medium">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 3. Mengapa Mengenalkan Umbi Lokal Itu Penting? (Sederhana & Membumi) */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            Mengapa Selingan Umbi Lokal Baik untuk Keluarga Kita?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Tiga alasan sederhana mengapa kita tidak harus selalu bergantung pada beras setiap kali makan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-brand-green text-white flex items-center justify-center">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="font-black text-stone-900 text-base">
              1. Mengatasi Anak Bosan Nasi (GTM)
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Saat anak sedang susah makan nasi atau tumbuh gigi, tekstur lembut dan rasa gurih-manis dari ubi, singkong, atau talas membuat anak kembali semangat makan.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center">
              <Droplet className="w-5 h-5" />
            </div>
            <h3 className="font-black text-stone-900 text-base">
              2. Lebih Hemat Air & Ramah Alam
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Untuk menghasilkan 1 kg beras dibutuhkan ribuan liter air sawah. Tanaman umbi jauh lebih hemat air, tahan kemarau, dan menjaga kelestarian lingkungan kita.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-brand-orange text-white flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-black text-stone-900 text-base">
              3. Murah, Segar, & Mudah Didapat
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Singkong, ubi jalar, dan talas ditanam oleh petani lokal kita sendiri. Harganya hemat di kantong dan selalu tersedia segar di pasar maupun tukang sayur.
            </p>
          </div>
        </div>

        {/* Tombol Lanjut ke Informasi Gizi */}
        {onNavigate && (
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('info-gizi');
              }}
              className="btn-press px-5 py-3 bg-brand-green hover:bg-emerald-800 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md flex items-center gap-2"
            >
              <span>Lihat Perbandingan Kandungan Gizi Umbi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
