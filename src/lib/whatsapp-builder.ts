// WhatsApp Message Formatter for Kumbi
// Compliant with Section 15.A specifications

import { Recipe, PmtSchedule, PosyanduPartner } from '../types';
import { TUBERS_DATA } from '../data/scientific-seed-data';

/**
 * Mode 1: Ibu Balita - Share Resep ke Keluarga / Teman
 */
export function buildMotherRecipeShareUrl(
  recipe: Recipe,
  portions: number = 2,
  baseUrl: string = window.location.origin
): string {
  const tuber = TUBERS_DATA.find(t => t.slug === recipe.tuberSlug);
  const tuberName = tuber ? tuber.localName : 'Umbi Lokal';
  const recipeUrl = `${baseUrl}/#resep-${recipe.slug}`;

  const lines = [
    `*PANDUAN RESEP GIZI POSYANDU: ${recipe.title.toUpperCase()}*`,
    `========================================`,
    `*Kategori Sasaran:* ${getAgeCategoryLabel(recipe.ageCategory)}`,
    `*Bahan Pokok Umbi:* ${tuberName}`,
    `*Estimasi Waktu:* ${recipe.prepTimeMinutes + recipe.cookTimeMinutes} menit (${recipe.cookingMethod})`,
    `*Kapasitas Porsi:* ${portions} porsi`,
    ``,
    `*Analisis Nilai Gizi per Porsi:*`,
    `• Energi: ${recipe.caloriesPerPortion} kkal`,
    `• Protein: ${recipe.proteinGPerPortion} g (Diperkaya Lauk Protein Pendamping)`,
    `• Karbohidrat: ${recipe.carbsGPerPortion} g`,
    `• Serat: ${recipe.fiberGPerPortion} g`,
    `• Profil Mikronutrisi: ${recipe.micronutrientHighlights}`,
    ``,
    `*Protokol Keamanan Pengolahan:*`,
    `${recipe.safetyWarningBanner}`,
    ``,
    `Akses modul langkah memasak, checklist bahan, dan kalkulator konversi porsi nasi:`,
    `${recipeUrl} (Kode Akses: ${recipe.recipeCode})`,
    ``,
    `Program Diversifikasi Karbohidrat Lokal & Pencegahan Stunting Balita - Posyandu Terpadu`
  ];

  const fullText = lines.join('\n');
  return `https://wa.me/?text=${encodeURIComponent(fullText)}`;
}

/**
 * Mode 2: Kader Posyandu - Pengumuman Resmi Jadwal & Menu PMT ke Grup WhatsApp Ibu Balita
 */
export function buildKaderPmtAnnouncementUrl(
  schedule: PmtSchedule,
  recipe: Recipe,
  posyandu: PosyanduPartner,
  baseUrl: string = window.location.origin
): string {
  const tuber = TUBERS_DATA.find(t => t.slug === recipe.tuberSlug);
  const tuberName = tuber ? tuber.localName : 'Umbi Lokal';
  const tuberScientific = tuber ? tuber.scientificName : '';
  const recipeUrl = `${baseUrl}/#resep-${recipe.slug}`;

  // Format tanggal ramah
  const dateObj = new Date(schedule.eventDate);
  const formattedDate = dateObj.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Data gizi ilmiah umbi
  const scientificNutritionText = tuber 
    ? `${tuber.caloriesRangeText}, serat ${tuber.fiberRangeText}, dan indeks glikemik ${tuber.glycemicIndexMin}${tuber.glycemicIndexMax !== tuber.glycemicIndexMin ? '-' + tuber.glycemicIndexMax : ''} (ramah pencernaan anak)`
    : 'nutrisi alami padat energi';

  const lines = [
    `*PEMBERITAHUAN RESMI JADWAL POSYANDU & MENU PMT LOKAL*`,
    `Kepada Yth. Ibu Balita Peserta ${posyandu.name}`,
    `========================================`,
    `*Hari/Tanggal:* ${formattedDate}`,
    `*Tempat Kegiatan:* ${posyandu.address || posyandu.name}`,
    `*Materi Edukasi Meja 4:* ${schedule.counselingTopic}`,
    ``,
    `*Menu Pemberian Makanan Tambahan (PMT) Terstandar:*`,
    `*${recipe.title}* (Kode Registrasi: ${recipe.recipeCode})`,
    `Bahan Utama: *${tuberName}* (_${tuberScientific}_) + Sumber Protein Pendamping Terverifikasi.`,
    ``,
    `*Fakta Ilmiah Nilai Gizi:*`,
    `Setiap 100g ${tuberName} mengandung ${scientificNutritionText}. Umbi lokal memiliki keunggulan mikronutrisi dan serat dibanding beras putih, serta mendukung ketahanan pangan rendah jejak air.`,
    ``,
    `Kemasan PMT dilengkapi label verifikasi QR Code terintegrasi. Akses panduan mandiri melalui:`,
    `1. Panduan resep terstandarisasi dan teknik olah bebas oksalat/sianida`,
    `2. Kalkulator kesetaraan energi centong nasi ke umbi`,
    `3. Evaluasi kepuasan balita dan catatan konsumsi`,
    ``,
    `Tautan Modul & Resep: ${recipeUrl}`,
    `Kode Akses Registrasi: *${recipe.recipeCode}*`,
    ``,
    `Terima kasih atas partisipasi aktif seluruh keluarga dalam mendukung pertumbuhan optimal balita bebas stunting.`,
    `_Salam Sehat, Tim Pelaksana Kader ${posyandu.name}_`
  ];

  const fullText = lines.join('\n');
  return `https://wa.me/?text=${encodeURIComponent(fullText)}`;
}

function getAgeCategoryLabel(cat: string): string {
  switch (cat) {
    case 'MPASI_6_8': return 'MPASI 6-8 Bulan';
    case 'MPASI_9_11': return 'MPASI 9-11 Bulan';
    case 'MPASI_12_23': return 'MPASI 12-23 Bulan';
    case 'BALITA_2_5': return 'Balita 2-5 Tahun';
    case 'PMT_KUDAPAN': return 'Kudapan PMT Posyandu';
    default: return 'Balita';
  }
}
