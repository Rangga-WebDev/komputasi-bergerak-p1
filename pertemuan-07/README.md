# Pertemuan 7 — Native APIs: Storage, Camera, Location (Mahasiswa)

## 🎯 Tujuan
- Menyimpan & memuat data lokal dengan **AsyncStorage**.
- Mengambil **foto** dari kamera atau galeri (`expo-image-picker`).
- Mendapatkan **koordinat GPS** + **alamat** (`expo-location` + `reverseGeocodeAsync`).
- Menerapkan **CRUD** lengkap pada data persistensi.
- Menangani **permission** runtime.

## 📦 Instalasi
```bash
npx expo install @react-native-async-storage/async-storage expo-image-picker expo-location
```

## 🛠️ Tugas
File: `App.js` (kerangka 19 TODO).

### A. List & CRUD
- Layar `Catatan` menampilkan list (foto thumb + teks + koordinat + alamat).
- Tombol **Edit** → membuka form dengan data terisi.
- Tombol **Hapus** dengan `Alert` konfirmasi.

### B. Form
- Input multiline (catatan).
- Tombol **Kamera** & **Galeri** (gunakan permission).
- Tombol **Ambil Lokasi** → koordinat + reverse geocode → alamat.
- Tombol **Simpan** → validasi teks tidak kosong → upsert ke storage.

### C. Tentang
- Tampilkan total catatan & ukuran (`JSON.stringify(data).length`).
- Tombol **Hapus Semua** (`AsyncStorage.removeItem` + reset state).

## ✅ Kriteria Selesai
- [ ] Catatan tetap ada setelah app di-restart.
- [ ] Foto dari kamera **dan** galeri keduanya berfungsi.
- [ ] Lokasi muncul (lat/lng + alamat) setelah izin diberikan.
- [ ] Edit catatan menampilkan data lama dan menyimpan perubahan.
- [ ] Hapus & Hapus Semua bekerja dengan konfirmasi.

## ⚠️ Catatan Permission
- Saat permission ditolak **selamanya**, harus buka **Settings** manual.
- Di Expo Go, fungsi kamera/lokasi membutuhkan device fisik (emulator GPS perlu set lokasi mock).

## 💡 Bonus
- Tampilkan **Map preview** (`react-native-maps`) di detail catatan.
- Filter list berdasarkan kata kunci.
- Sort berdasarkan terbaru/terlama (gunakan `ts`).
- Export semua catatan sebagai JSON ke Share Sheet (`expo-sharing`).
