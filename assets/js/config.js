// config.js - Konfigurasi Terpusat Supabase SakaPay
const SUPABASE_URL = "https://nvmnbrsvybtviqwgmikc.supabase.co";
const SUPABASE_KEY = "sb_publishable_bD5fNZ-Km0GF4ktAbd1LDg_nS1FSh3L";

// Inisialisasi koneksi database global
const dbClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ================= NOTIFIKASI TELEGRAM ADMIN SAKAPAY =================
const TELEGRAM_BOT_TOKEN = "9110652075:AAFiGE3BeXfvFIkjVFYkiEKLpHgf6pWgZ9g";
const TELEGRAM_CHAT_ID   = "7235094348";

// Fungsi pengirim notifikasi instan
async function kirimNotifTelegram(order) {
    const pesan = `🔔 <b>PESANAN BARU MASUK - SAKAPAY</b>\n`
                + `───────────────────────\n`
                + `📄 <b>Invoice</b> : <code>${order.id}</code>\n`
                + `📦 <b>Produk</b>  : ${order.produk}\n`
                + `🎯 <b>Tujuan</b>  : <code>${order.tujuan}</code>\n`
                + `💰 <b>Total Bayar</b> : <b>${order.harga}</b>\n`
                + `💳 <b>Metode</b>  : ${order.metode}\n`
                + `───────────────────────\n`
                + `<i>Segera cek mutasi & verifikasi di panel admin!</i>`;

    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: pesan,
                parse_mode: 'HTML'
            })
        });
    } catch (e) {
        console.error("Gagal kirim notif telegram:", e);
    }
}