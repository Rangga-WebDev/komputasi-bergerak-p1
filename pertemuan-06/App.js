import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';

/**
 * Pertemuan 6 — REST API: fetch, loading, error, search, pagination, detail
 *
 * Endpoint: https://dummyjson.com
 *  - List   : GET /products?limit=10&skip=0
 *  - Search : GET /products/search?q=phone
 *  - Detail : GET /products/{id}
 *
 * Target:
 *  A. List produk dengan loading & error state.
 *  B. Search bar dengan debounce 400 ms.
 *  C. Pagination "Muat Lebih Banyak" (skip += limit).
 *  D. Pull to refresh.
 *  E. Layar detail (tanpa navigation lib — pakai state simple).
 */

const BASE = 'https://dummyjson.com';
const LIMIT = 10;

export default function App() {
  // TODO 1: state items, loading, refreshing, error, q (search), skip, total, loadingMore.
  // TODO 2: state selectedId (null = list, number = tampilkan detail).

  // TODO 3: fungsi load(reset=false) menggunakan useCallback.
  //   - tentukan url:
  //       q kosong   -> `${BASE}/products?limit=${LIMIT}&skip=${reset?0:skip}`
  //       q terisi   -> `${BASE}/products/search?q=${encodeURIComponent(q)}&limit=${LIMIT}&skip=${reset?0:skip}`
  //   - try/catch fetch -> json -> { products, total }.
  //   - jika reset: setItems(products); else: append (gunakan dedupe by id).
  //   - update total & skip = (reset?0:skip) + products.length.
  //   - selalu setLoading(false) di finally.

  // TODO 4: useEffect pertama mount -> load(true).

  // TODO 5: useEffect untuk debounce q:
  //   const t = setTimeout(() => load(true), 400);
  //   return () => clearTimeout(t);

  const onRefresh = () => {
    // TODO 6: setRefreshing(true) + load(true) + setRefreshing(false) di akhir.
  };

  const loadMore = () => {
    // TODO 7: jika items.length >= total atau loadingMore -> return.
    //         setLoadingMore(true) lalu panggil load(false).
  };

  // === Render ===
  // TODO 8: jika selectedId !== null -> render <DetailScreen id={selectedId} onBack={()=>setSelectedId(null)} />

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.h1}>Katalog Produk</Text>
        <TextInput
          style={styles.input}
          placeholder="Cari produk..."
        /* TODO 9: value & onChangeText */
        />
      </View>

      {/* TODO 10: jika loading & items kosong -> <ActivityIndicator size="large" /> */}
      {/* TODO 11: jika error -> tampilkan pesan + tombol "Coba lagi" -> load(true). */}

      {/* TODO 12: FlatList items dengan:
            renderItem -> <ProdukItem item onPress={() => setSelectedId(item.id)} />,
            ListEmptyComponent -> "Tidak ada hasil",
            refreshing & onRefresh,
            onEndReached={loadMore} onEndReachedThreshold={0.5},
            ListFooterComponent -> spinner saat loadingMore. */}
    </SafeAreaView>
  );
}

function ProdukItem({ item, onPress }) {
  // TODO 13: kartu horizontal: thumbnail, title, price, rating ⭐.
  return null;
}

/* =========================== Detail =========================== */
function DetailScreen({ id, onBack }) {
  // TODO 14: state data, loading, error.
  // TODO 15: useEffect [id] -> fetch `${BASE}/products/${id}` -> set data.
  // TODO 16: tampilkan: tombol back, gambar besar (images[0]), title, brand, price, description,
  //          stock, rating, list 3 image thumbnail bawah.

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ padding: 16 }}>
        <Pressable onPress={onBack}>
          <Text style={{ color: '#2563eb', fontWeight: '700' }}>← Kembali</Text>
        </Pressable>
        <Text style={styles.muted}>TODO: tampilkan detail produk #{id}.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 12, gap: 8 },
  h1: { fontSize: 22, fontWeight: '700' },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 10, padding: 12, backgroundColor: '#fff' },
  card: {
    flexDirection: 'row', gap: 12, alignItems: 'center',
    backgroundColor: '#fff', padding: 10, borderRadius: 12,
    borderWidth: 1, borderColor: '#e2e8f0', marginHorizontal: 12, marginBottom: 8,
  },
  thumb: { width: 70, height: 70, borderRadius: 8, backgroundColor: '#e2e8f0' },
  title: { fontWeight: '700', fontSize: 15 },
  price: { color: '#2563eb', fontWeight: '700' },
  muted: { color: '#64748b' },
  errorBox: { padding: 16, alignItems: 'center', gap: 8 },
  retryBtn: { backgroundColor: '#2563eb', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
});
