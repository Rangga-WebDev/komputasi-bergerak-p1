# Pertemuan 2 — Komponen Inti & Styling (Mahasiswa)

## 🎯 Tujuan
- Menggunakan komponen `View`, `Text`, `Image`, `ScrollView`, `SafeAreaView`, `Pressable`.
- Mengelola layout dengan **Flexbox** (row/column, justify, align, gap, flex).
- Membuat layout **responsif** dengan `useWindowDimensions`.
- Membangun **Profile App lengkap**: header banner, avatar overlap, stats, action buttons, sections (About/Skill/Galeri/Jadwal).

## 🛠️ Langkah Praktikum
1. Pelajari starter `App.js`.
2. Lengkapi setiap `// TODO` (1–11). Ikuti komentar untuk panduan.
3. Jalankan `npx expo start` dan periksa setiap perubahan.
4. Coba **rotasi HP** untuk memastikan galeri tetap responsif.

## ✍️ TODO Ringkas
| # | Tugas |
|---|-------|
| 1 | Isi array `GALLERY` dengan ≥6 URL gambar. |
| 2 | Hitung `cellSize` agar 3 kolom muat (gunakan `width`, padding 16, gap 8). |
| 3 | Tambah `<View style={styles.banner} />` di atas kartu. |
| 4 | Render `Image` avatar (style `avatar`). |
| 5 | Render `Text` nama & role. |
| 6 | Render 3 `<Stat />` + 2 `<Divider />` di antaranya. |
| 7 | Buat 2 tombol Pressable: Follow (primary) & Pesan (secondary). |
| 8 | Section "Tentang" + bio singkat. |
| 9 | Section "Skill" → render `SKILLS.map` jadi chip. |
| 10 | Section "Galeri" → render `GALLERY.map` jadi `Image` (cellSize). |
| 11 | Section "Jadwal Hari Ini" → ≥3 baris jadwal. |

## 📝 Tugas — Kartu Mahasiswa Premium
**Wajib:**
- Layar **Kartu Mahasiswa** berisi:
  - Header banner berwarna kampus.
  - Foto profil (URL).
  - **Nama, NIM, Prodi, Semester**.
  - Min 3 baris info tambahan (alamat, email, no HP) dengan ikon emoji.
  - Section **Skill** (≥4 chip).
  - Section **Galeri** (≥6 foto, grid 3 kolom **responsif**).
  - Section **Jadwal Hari Ini** (≥3 baris).

**Bonus (+15):**
- Tombol **"Hubungi"** → Alert.
- **Dark mode** toggle (mengubah background card).
- Stats row (Mata Kuliah, IPK, Semester) dengan divider.

## ✅ Pengumpulan
- Push ke GitHub + screenshot portrait & landscape.

