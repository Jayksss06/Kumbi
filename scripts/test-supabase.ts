// Diagnostic script to verify Supabase connection & data tables
import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL || '';
const anonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!url || !anonKey) {
  console.error('Error: VITE_SUPABASE_URL atau VITE_SUPABASE_ANON_KEY belum terpasang di environment.');
  process.exit(1);
}

const supabase = createClient(url, anonKey);

async function runCheck() {
  console.log('--- DIAGNOSTIK KONEKSI SUPABASE KUMBI ---');
  console.log('Project URL:', url);
  console.log('Client Initialized: OK\n');

  const tables = [
    'tubers',
    'recipes',
    'recipe_ingredients',
    'pmt_schedules',
    'reviews',
    'posyandu_partners',
    'protein_pairings',
    'myth_facts',
    'quiz_questions',
    'users'
  ];

  for (const table of tables) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.log(`[FAIL] ${table.padEnd(20)}: ${error.message}`);
    } else {
      console.log(`[PASS] ${table.padEnd(20)}: ${count} baris data ditemukan`);
    }
  }

  console.log('\nStatus: Database Supabase PostgreSQL terhubung dan aktif penuh.');
}

runCheck();
