# Pertemuan 6 — REST API & Async (Mahasiswa)

## 🎯 Tujuan
- Memahami `fetch`, `async/await`, & lifecycle `useEffect`.
- Mengelola **loading**, **error**, **empty**, dan **success** state.
- Menerapkan **search debounce**, **pagination**, dan **pull to refresh**.
- Membuat **layar detail** dari id item.

## 🌐 API
DummyJSON (free, no key): https://dummyjson.com
- `GET /products?limit=10&skip=0`
- `GET /products/search?q=phone&limit=10&skip=0`
- `GET /products/{id}`

## 🛠️ Tugas
File: `App.js` (kerangka 16 TODO).

1. **State dasar** (TODO 1–2): items, loading, refreshing, error, q, skip, total, loadingMore, selectedId.
2. **Fungsi `load(reset)`** (TODO 3): pilih URL berdasarkan q, dedupe by id, update skip & total.
3. **Effect mount** (TODO 4) + **debounce** ketika q berubah (TODO 5).
4. **Pull to refresh** (TODO 6) & **pagination** `loadMore` (TODO 7).
5. **Detail Screen** (TODO 14–16): fetch by id, tampilkan gambar besar + galeri thumbnail.
6. **UI states**:
   - Loading awal → `<ActivityIndicator />`
   - Error → pesan + tombol "Coba lagi"
   - Empty → "Tidak ada hasil"

## 🧠 Pola Penting
```js
useEffect(() => {
  let alive = true;
  fetch(url).then(r => r.json()).then(d => { if (alive) setData(d); });
  return () => { alive = false }; // cegah setState pada komponen unmounted
}, [id]);
```

## ✅ Kriteria Selesai
- [ ] List awal muncul, ada loading.
- [ ] Search dengan debounce 400 ms (tidak fetch tiap ketuk).
- [ ] Scroll ke bawah memuat halaman berikutnya hingga `total`.
- [ ] Pull-to-refresh menyegarkan list.
- [ ] Tap item → layar detail (data id terkait), tombol kembali bekerja.

## 💡 Bonus
- Cache hasil ke `AsyncStorage` (preview Pertemuan 7).
- Tampilkan jumlah item: `items.length / total`.
- Sort hasil berdasarkan harga atau rating.
