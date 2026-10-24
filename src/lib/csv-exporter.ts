// Google Sheets & Excel Compatible CSV / JSON Export & Import Engine
// Ensures zero-cost sustainability & data independence for Posyandu partners

import { Recipe, PmtSchedule, Review } from '../types';

/**
 * Download file helper in browser
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export Resep ke CSV (Kompatibel Google Sheets / Excel Indonesia)
 */
export function exportRecipesToCsv(recipes: Recipe[]) {
  const headers = [
    'Kode Resep',
    'Judul Resep',
    'Jenis Umbi',
    'Kategori Usia',
    'Metode Masak',
    'Waktu Total (Menit)',
    'Kalori per Porsi (kkal)',
    'Protein per Porsi (g)',
    'Karbohidrat (g)',
    'Serat (g)',
    'Rating Anak Lahap',
    'Jumlah Ulasan',
    'Status Resep'
  ];

  const rows = recipes.map(r => [
    `"${r.recipeCode}"`,
    `"${r.title.replace(/"/g, '""')}"`,
    `"${r.tuberSlug}"`,
    `"${r.ageCategory}"`,
    `"${r.cookingMethod}"`,
    r.prepTimeMinutes + r.cookTimeMinutes,
    r.caloriesPerPortion,
    r.proteinGPerPortion,
    r.carbsGPerPortion,
    r.fiberGPerPortion,
    r.avgLahapRating,
    r.reviewCount,
    `"${r.status}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const timestamp = new Date().toISOString().slice(0, 10);
  downloadFile(csvContent, `umbicare_resep_${timestamp}.csv`, 'text/csv');
}

/**
 * Export Jadwal & Realisasi PMT ke CSV
 */
export function exportPmtSchedulesToCsv(schedules: PmtSchedule[]) {
  const headers = [
    'Kode Jadwal PMT',
    'Tanggal Kegiatan',
    'Topik Penyuluhan Meja 4',
    'Target Porsi',
    'Realisasi Porsi Terbagi',
    'Jumlah Ibu Hadir',
    'Estimasi Anggaran (Rp)',
    'Status Kegiatan',
    'Catatan Evaluasi Kader'
  ];

  const rows = schedules.map(s => [
    `"${s.scheduleCode}"`,
    `"${s.eventDate}"`,
    `"${s.counselingTopic.replace(/"/g, '""')}"`,
    s.targetPortions,
    s.actualPortionsDistributed || 0,
    s.attendeesMothersCount || 0,
    s.estimatedTotalCostIdr,
    `"${s.status}"`,
    `"${(s.evaluationNotes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const timestamp = new Date().toISOString().slice(0, 10);
  downloadFile(csvContent, `umbicare_jadwal_pmt_${timestamp}.csv`, 'text/csv');
}

/**
 * Export Ulasan "Anak Lahap" ke CSV
 */
export function exportReviewsToCsv(reviews: Review[]) {
  const headers = [
    'ID Resep',
    'Nama Ibu',
    'Usia Anak (Bulan)',
    'Bintang Anak Lahap (1-5)',
    'Sudah Recook di Rumah',
    'Komentar Pengalaman Masak',
    'Tanggal Ulasan'
  ];

  const rows = reviews.map(rev => [
    `"${rev.recipeId}"`,
    `"${rev.motherName.replace(/"/g, '""')}"`,
    rev.childAgeMonths,
    rev.lahapRating,
    rev.hasRecookedAtHome ? 'YA' : 'TIDAK (DARI PMT)',
    `"${rev.comment.replace(/"/g, '""')}"`,
    `"${rev.createdAt}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const timestamp = new Date().toISOString().slice(0, 10);
  downloadFile(csvContent, `umbicare_ulasan_anak_lahap_${timestamp}.csv`, 'text/csv');
}

/**
 * Export Seluruh Data Sistem ke JSON (Pencadangan Total Keberlanjutan)
 */
export function exportFullBackupJson(data: {
  recipes: Recipe[];
  pmtSchedules: PmtSchedule[];
  reviews: Review[];
}) {
  const payload = {
    appName: 'Kumbi - Dapur Umbi Posyandu',
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    ...data
  };

  const jsonString = JSON.stringify(payload, null, 2);
  const timestamp = new Date().toISOString().slice(0, 10);
  downloadFile(jsonString, `umbicare_cadangan_lengkap_${timestamp}.json`, 'application/json');
}
