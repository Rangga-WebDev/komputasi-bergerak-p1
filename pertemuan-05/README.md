# Pertemuan 5 — Navigation: Tab + Stack + Params (Mahasiswa)

## 🎯 Tujuan
- Memahami **stack** vs **bottom tabs**.
- Mengirim **params** antar screen.
- Menggunakan **React Context** untuk state global ringan (cart).
- Mengubah **header** dinamis dari params.

## 📦 Instalasi
```bash
npx expo install react-native-screens react-native-safe-area-context
npm i @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
```
Tambahkan baris pertama di `App.js`:
```js
import 'react-native-gesture-handler';
```

## 🗺️ Struktur Navigasi
```
Tabs
├── HomeTab     → Stack: Home → Detail
├── CartTab     → Stack: Cart → Checkout      (badge = jumlah item)
└── ProfileTab  → Profile
```

## 🛠️ Tugas
File: `App.js` (kerangka 18 TODO).
1. Lengkapi `CartProvider` (TODO 1–5): `addItem`, `removeItem`, `clear`, `total`, `count`.
2. Buat `HomeStackNav` & `CartStackNav` (TODO 6–7).
3. Susun `Tab.Navigator` 3 tab, tampilkan **badge** pada CartTab.
4. Implementasikan navigasi `Home → Detail` dengan params `{ produk }`.
5. Tombol **Tambah ke Cart** + **Lihat Cart** (loncat ke tab lain via `getParent()`).
6. Layar Cart: list item, total, tombol Checkout & Kosongkan.
7. Layar Checkout: tombol Bayar → `Alert` sukses → `clear()` & balik ke Home.

## ✅ Kriteria Selesai
- [ ] 3 tab tampil dan dapat berpindah.
- [ ] Header detail menampilkan nama produk.
- [ ] Badge tab Cart bertambah saat tambah item.
- [ ] Checkout reset cart dan kembali ke Home.

## 💡 Bonus
- Tombol `+` / `−` qty di layar Cart.
- Simpan cart ke `AsyncStorage` agar bertahan saat app ditutup.
- Tambah Drawer di luar Tabs (`@react-navigation/drawer`).
