// config.js - Konfigurasi Terpusat Supabase SakaPay
const SUPABASE_URL = "https://nvmnbrsvybtviqwgmikc.supabase.co";
const SUPABASE_KEY = "sb_publishable_bD5fNZ-Km0GF4ktAbd1LDg_nS1FSh3L";

// Inisialisasi koneksi database global
const dbClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);