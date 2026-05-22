# Pertemuan 3 — State, Event & Form (Mahasiswa)

## 🎯 Tujuan
- Menguasai `useState` dan `useMemo` (derived state).
- Menangani event `onPress`, `onChangeText`, `onValueChange`.
- Membangun **form terkontrol** dengan **validasi inline**.
- Mengelola tema light/dark dengan state.

## 🛠️ Langkah Praktikum
Lengkapi `App.js` (TODO 1–20) untuk menghasilkan satu layar berisi 4 fitur:
- **A. Counter** dengan tombol `−`, `Reset`, `+` (tombol `−` disable saat count ≤ 0).
- **B. Konverter Suhu** live (Celsius → Fahrenheit & Kelvin).
- **C. Form Pendaftaran** (nama, email, umur, jurusan, setuju TOS) + validasi inline.
- **D. Theme Switch** light/dark (mengubah warna background, card, teks, accent).

## ✍️ Aturan Validasi (TODO 6 / TODO 8)
| Field | Aturan |
|-------|--------|
| Nama | Tidak boleh kosong. |
| Email | Mengandung `@`. |
| Umur | Angka > 0. |
| Setuju | Harus `true`. |

Jika salah satu gagal → tampilkan pesan merah di bawah field + Alert "Form belum valid".  
Jika sukses → Alert ringkasan data.

## 📝 Tugas — Kalkulator BMI + Form
**Wajib:**
1. **Kalkulator BMI**: input berat (kg) & tinggi (cm), tampilkan BMI + kategori (Kurus / Normal / Gemuk / Obesitas) dengan **warna berbeda** per kategori.
2. **Form Pendaftaran lengkap**: 5 field + validasi inline + Alert ringkasan.

**Bonus (+15):**
- Theme toggle light/dark.
- Riwayat 5 hasil BMI terakhir (state array, tampilkan list).
- Validasi email pakai regex.

## ✅ Pengumpulan
Push ke GitHub + screenshot (Alert sukses & gagal, BMI dengan minimal 2 kategori).

