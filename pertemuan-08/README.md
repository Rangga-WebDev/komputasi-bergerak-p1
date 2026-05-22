# Pertemuan 8 — Final Project: MiniShop (Mahasiswa)

> **Project akhir** menggabungkan semua materi P1–P7. Dikerjakan **berpasangan**
> (atau individu) selama 2 minggu (Pertemuan 8 + tugas mandiri).

## 🛒 Tema: MiniShop
Aplikasi katalog belanja sederhana dengan:
- Daftar produk dari API DummyJSON.
- Search + filter kategori + pagination.
- Detail produk dengan galeri.
- ❤️ Favorit (disimpan permanen di AsyncStorage).
- 🛒 Cart dengan qty (− / +), checkout, alamat.
- 👤 Profil tersimpan di AsyncStorage.

## 📦 Instalasi
```bash
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-native-async-storage/async-storage
npm i @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
```

## 🗺️ Struktur Navigasi
```
Tabs
├── Home      → Stack: Home (search+kategori+grid 2 kolom) → Detail
├── Favorit   → grid favorit
├── Cart      → Stack: Cart (qty, hapus) → Checkout (alamat, bayar)  [badge count]
└── Profil    → form nama/email tersimpan di AsyncStorage
```

## 🛠️ Tugas Wajib (24 TODO)
File: `App.js`. Kerangka semua screen sudah ada. Lengkapi:
1. **Context** (TODO 1–8): hydrate dari storage; addToCart, setQty, removeFromCart, clearCart, toggleFav, isFav, persistProfile.
2. **Stacks** (TODO 9–10) & **Tabs** (TODO 11) dengan badge.
3. **HomeScreen** (TODO 12–17): list, search debounce, kategori, pagination, favorit toggle, navigasi detail.
4. **DetailScreen** (TODO 18–20): fetch by id, galeri, tombol cart & favorit.
5. **FavoriteScreen** (TODO 21).
6. **CartScreen** (TODO 22): qty, total, checkout.
7. **CheckoutScreen** (TODO 23): alamat → Alert → clear → kembali ke Home.
8. **ProfileScreen** (TODO 24): tersinkron context.

## ✅ Kriteria Penilaian
| Aspek | Bobot |
|------|-----:|
| Fungsionalitas (semua TODO selesai) | 40 |
| UX (loading, error, empty, validasi) | 15 |
| Persistensi (cart/fav/profile) | 15 |
| Navigasi (stack, tab, badge, params) | 10 |
| Kode rapi & komponen reusable | 10 |
| Fitur tambahan (lihat bawah) | 10 |

## 💡 Fitur Tambahan (pilih min. 2)
- **Sort** produk (harga asc/desc, rating).
- **Dark mode** dengan Context.
- Foto profil (gunakan `expo-image-picker` dari P7).
- Halaman **Riwayat Order** (simpan tiap checkout di AsyncStorage).
- Push notification lokal saat checkout sukses (`expo-notifications`).
- Animasi tombol "Add to Cart" dengan `Animated`.
- Multi-bahasa (id/en) dengan toggle di Profil.
- Skeleton loader untuk grid (placeholder shimmer).

## 📋 Deliverables
1. Repo / folder source code lengkap, bisa `npx expo start` tanpa error.
2. README ringkas: nama tim, fitur tambahan yang dipilih, screenshot.
3. Demo singkat (5 menit) saat pertemuan terakhir.
