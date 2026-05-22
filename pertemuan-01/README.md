# Pertemuan 1 — Pengantar & Setup Expo (Mahasiswa)

## 🎯 Tujuan
- Memasang Node.js, Expo CLI, Expo Go, dan menjalankan project Expo pertama di HP.
- Mengenal struktur project Expo (`App.js`, `package.json`, `app.json`).
- Membuat **Mini Profile App** dengan komponen `View`, `Text`, `Image`, `Pressable`, `ScrollView`, dan `Alert`.

## 🛠️ Langkah Praktikum
1. Pasang **Node.js LTS** dan **Expo Go** di HP.
2. Buat project baru:
   ```bash
   npx create-expo-app@latest hello-mobile --template blank
   cd hello-mobile
   npx expo start
   ```
3. Scan QR di Expo Go.
4. Salin `App.js` di folder ini ke project Anda (timpa file `App.js` default).
5. Buka file dan **lengkapi setiap baris bertanda `// TODO`** (1–12).
6. Cek hasil di Expo Go setiap kali simpan (Fast Refresh).

## ✍️ TODO yang harus diselesaikan
| # | Tugas |
|---|-------|
| 1 | Ganti object `PROFILE` dengan data Anda (nama, NIM, prodi, motto, ≥3 hobi). |
| 2 | Buat state `kunjungan` dengan `useState(0)`. |
| 3 | Buat variabel `tanggal` (Bahasa Indonesia, format panjang). |
| 4 | Lengkapi `showInfo` agar memanggil `Alert.alert(...)`. |
| 5 | Tampilkan `tanggal` di header. |
| 6–7 | Render `Image` avatar + nama + role + motto. |
| 8 | Render daftar hobi sebagai chips menggunakan `.map`. |
| 9 | Tampilkan jumlah counter. |
| 10–11 | Tombol Tambah & Reset counter. |
| 12 | Tombol "Tentang aplikasi ini" memanggil `showInfo`. |

## 📝 Tugas Rumah
**Wajib:**
- Selesaikan semua TODO.
- Ganti tema warna agar khas (background, accent button, chip).

**Bonus (+10):**
- Tambahkan **2 counter** berbeda (mis. ☕ kopi & 💧 air minum).
- Tambah tombol **"Bagikan"** → Alert dengan ringkasan profil.
- Bila counter ≥ 5 tampilkan emoji 🔥 di sebelah angka.

## ✅ Pengumpulan
- Push ke GitHub: `komputasi-bergerak-p1`.
- Sertakan **screenshot** hasil di Expo Go di README repo.
- Kirim link repo ke LMS.

## 🧪 Tips
- Gunakan `console.log(...)` untuk debug — log muncul di terminal Expo.
- Kocok HP saat Expo Go terbuka → menu Dev Menu (Reload, Toggle Inspector).
- Jika layar putih: cek error di terminal, biasanya typo nama komponen.

