# Pertemuan 4 — List, FlatList & Filter (Mahasiswa)

## 🎯 Tujuan
- Menampilkan koleksi data dengan `FlatList` & `SectionList`.
- Membuat `renderItem` sebagai komponen terpisah.
- Menerapkan **filter**, **search**, dan **derived state** dengan `useMemo`.
- Memahami `keyExtractor`, `ListEmptyComponent`, dan `pull to refresh`.

## 🧠 Konsep Inti
1. **FlatList** lazy render — hanya yang kelihatan yang dirender.
2. `keyExtractor` wajib unik (pakai `id` string).
3. **Immutable update**: jangan `push`/`splice` langsung pada `todos`. Pakai `map`, `filter`, spread `...`.
4. **Derived state**: hasil filter/cari **dihitung dari** state utama → jangan disimpan di state lain.
5. **SectionList** untuk data berkelompok (header + data).

## 🛠️ Tugas (3 fitur dalam 1 layar)
File: `App.js` (sudah disiapkan kerangkanya, ada 23 TODO).

### A. Todo List
- Tambah, toggle done (centang), hapus per item.
- Filter: **Semua / Aktif / Selesai** (pill aktif berwarna).
- Statistik `x dari y selesai` + tombol **Hapus Selesai** (pakai `Alert` konfirmasi).

### B. Katalog Produk
- Search bar (case-insensitive, cocokkan `nama` atau `kategori`).
- `FlatList` produk: gambar 60×60 + nama + kategori + harga `Rp xxx`.
- Tap item → `Alert` detail.
- **Pull to refresh** (props `refreshing` & `onRefresh`).

### C. Kontak (SectionList)
- Kelompokkan kontak berdasarkan huruf awal nama (A, B, C, …).
- Tampilkan section header + daftar nama & telp.

## ✅ Kriteria Selesai
- [ ] Tab atas berfungsi memindah layar.
- [ ] Todo: tambah, toggle, hapus, filter, hapus selesai jalan.
- [ ] Katalog: search & pull to refresh jalan.
- [ ] Kontak: section header per huruf benar dan urut.
- [ ] Tidak memodifikasi array secara langsung (no `.push` / `.splice`).

## 💡 Bonus
- Sort produk berdasarkan harga (asc/desc) via tombol.
- Tambah field `qty` pada todo list (mis. "Belanja telur (12)").
- Simpan `todos` ke `AsyncStorage` (preview Pertemuan 7).
