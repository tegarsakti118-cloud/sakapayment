// config.js - Konfigurasi Terpusat Supabase SakaPay
const SUPABASE_URL = "https://nvmnbrsvybtviqwgmikc.supabase.co";
const SUPABASE_KEY = "sb_publishable_bD5fNZ-Km0GF4ktAbd1LDg_nS1FSh3L";

// Inisialisasi koneksi database global
const dbClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ================= NOTIFIKASI TELEGRAM ADMIN SAKAPAY =================
const TELEGRAM_BOT_TOKEN = "9110652075:AAFiGE3BeXfvFIkjVFYkiEKLpHgf6pWgZ9g";
const TELEGRAM_CHAT_ID   = "7235094348";

// Fungsi pembersih simbol & < > agar tidak error di Telegram
function escapeHtml(text) {
    if (!text) return '';
    return text.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// Fungsi pengirim notifikasi instan yang stabil
async function kirimNotifTelegram(order) {
    const pesan = `🔔 <b>PESANAN BARU MASUK - SAKAPAY</b>\n`
                + `───────────────────────\n`
                + `📄 <b>Invoice</b> : <code>${escapeHtml(order.id)}</code>\n`
                + `📦 <b>Produk</b>  : ${escapeHtml(order.produk)}\n`
                + `🎯 <b>Tujuan</b>  : <code>${escapeHtml(order.tujuan)}</code>\n`
                + `💰 <b>Total Bayar</b> : <b>${escapeHtml(order.harga)}</b>\n`
                + `💳 <b>Metode</b>  : ${escapeHtml(order.metode)}\n`
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
            }),
            keepalive: true // Menjaga pengiriman tetap jalan meski halaman langsung berpindah
        });
    } catch (e) {
        console.error("Gagal kirim notif telegram:", e);
    }
}