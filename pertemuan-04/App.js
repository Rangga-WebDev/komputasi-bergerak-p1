import { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  SectionList,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';

/**
 * Pertemuan 4 — List, FlatList, Render Item & Filter
 *
 * Target 3 fitur dalam 1 layar (pakai tab sederhana di atas):
 *  A. Todo List  : tambah, toggle done, hapus, filter (Semua / Aktif / Selesai),
 *                  counter "x dari y selesai", tombol "Hapus Selesai".
 *  B. Katalog    : FlatList produk + search bar (case-insensitive)
 *                  + tap item -> Alert detail + pull to refresh.
 *  C. Kontak     : SectionList dikelompokkan berdasarkan huruf awal nama.
 */

const PRODUK_AWAL = [
  { id: 'p1', nama: 'Kopi Susu', harga: 18000, kategori: 'Minuman', img: 'https://picsum.photos/seed/kopi/200' },
  { id: 'p2', nama: 'Teh Tarik', harga: 15000, kategori: 'Minuman', img: 'https://picsum.photos/seed/teh/200' },
  { id: 'p3', nama: 'Roti Bakar', harga: 12000, kategori: 'Makanan', img: 'https://picsum.photos/seed/roti/200' },
  { id: 'p4', nama: 'Mie Goreng', harga: 20000, kategori: 'Makanan', img: 'https://picsum.photos/seed/mie/200' },
  { id: 'p5', nama: 'Es Jeruk', harga: 10000, kategori: 'Minuman', img: 'https://picsum.photos/seed/jeruk/200' },
  { id: 'p6', nama: 'Nasi Goreng', harga: 22000, kategori: 'Makanan', img: 'https://picsum.photos/seed/nasi/200' },
];

const KONTAK = [
  { id: '1', nama: 'Andi', telp: '0811-1111-1111' },
  { id: '2', nama: 'Budi', telp: '0822-2222-2222' },
  { id: '3', nama: 'Citra', telp: '0833-3333-3333' },
  { id: '4', nama: 'Doni', telp: '0844-4444-4444' },
  { id: '5', nama: 'Eka', telp: '0855-5555-5555' },
  { id: '6', nama: 'Fitri', telp: '0866-6666-6666' },
];

const TABS = ['Todo', 'Katalog', 'Kontak'];

export default function App() {
  // TODO 1: state activeTab default 'Todo'.

  return (
    <SafeAreaView style={styles.safe}>
      {/* TODO 2: Header dengan judul "Pertemuan 4 — List & FlatList". */}

      {/* TODO 3: Render baris tab dari TABS.map -> Pressable.
          Tab aktif berbeda style (style.tabActive + tabTxtActive). */}

      {/* TODO 4: Render konten sesuai activeTab:
          - 'Todo'    -> <TodoScreen />
          - 'Katalog' -> <KatalogScreen />
          - 'Kontak'  -> <KontakScreen /> */}
    </SafeAreaView>
  );
}

/* ============================ A. TODO ============================ */
function TodoScreen() {
  // TODO 5: state text, todos (array { id, text, done }), filter ('all' | 'aktif' | 'selesai').
  // TODO 6: derived = useMemo filter todos by filter.
  // TODO 7: stats = useMemo -> { total, selesai }.

  const addTodo = () => {
    // TODO 8: jika text.trim() kosong -> return.
    //         tambahkan { id: Date.now().toString(), text: text.trim(), done:false }
    //         ke awal list, lalu reset input.
  };

  const toggle = (id) => { /* TODO 9 */ };
  const remove = (id) => { /* TODO 10 */ };
  const clearDone = () => {
    // TODO 11: konfirmasi via Alert dengan 2 tombol; jika OK -> hapus semua todos done=true.
  };

  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Tulis aktivitas..."
        /* TODO 12: value & onChangeText */
        />
        <Pressable style={styles.addBtn} onPress={addTodo}>
          <Text style={styles.btnTxt}>Tambah</Text>
        </Pressable>
      </View>

      {/* TODO 13: 3 pill filter: Semua / Aktif / Selesai. */}

      {/* TODO 14: <Text>{stats.selesai} dari {stats.total} selesai</Text>
                  + tombol teks "Hapus Selesai" (clearDone). */}

      {/* TODO 15: FlatList:
          data = derived, keyExtractor = item.id,
          renderItem = <TodoItem item onToggle onDelete />
          ListEmptyComponent = <Empty pesan="Belum ada todo" />  */}
    </View>
  );
}

function TodoItem({ item, onToggle, onDelete }) {
  // TODO 16: tampilkan kotak checkbox (kosong / centang ✓) + teks (coret bila done).
  //          Tap area teks -> onToggle(item.id). Tombol "Hapus" -> onDelete(item.id).
  return null;
}

/* ========================== B. KATALOG ========================== */
function KatalogScreen() {
  // TODO 17: state q (search), refreshing.
  // TODO 18: data = useMemo filter PRODUK_AWAL by q (case-insensitive di nama+kategori).

  const onRefresh = () => {
    // TODO 19: setRefreshing(true), simulasi setTimeout 700ms -> setRefreshing(false).
  };

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.input}
        placeholder="Cari produk / kategori..."
      /* TODO 20: value & onChangeText */
      />
      {/* TODO 21: FlatList:
          data, keyExtractor=item.id,
          renderItem = <ProdukItem item />
          refreshing & onRefresh,
          ListEmptyComponent = <Empty pesan="Produk tidak ditemukan" /> */}
    </View>
  );
}

function ProdukItem({ item }) {
  // TODO 22: kartu horizontal: Image (60x60, rounded) + nama (bold) + kategori (muted)
  //          + harga (Rp ...). Tap -> Alert.alert(item.nama, `Harga: Rp ${item.harga}`).
  return null;
}

/* ========================== C. KONTAK ========================== */
function KontakScreen() {
  // TODO 23: kelompokkan KONTAK menjadi array section: [{ title:'A', data:[...] }, ...].
  //          Hint: gunakan reduce, ambil kontak.nama[0].toUpperCase().
  //          Lalu render dengan SectionList:
  //            renderItem = baris (nama + telp)
  //            renderSectionHeader = ({ section }) => <Text style={styles.sectionH}>{section.title}</Text>
  return (
    <View style={styles.screen}>
      <Text style={styles.muted}>TODO: SectionList dikelompokkan per huruf awal.</Text>
    </View>
  );
}

/* ============================ Helpers ============================ */
function Empty({ pesan }) {
  return (
    <View style={{ padding: 24, alignItems: 'center' }}>
      <Text style={styles.muted}>{pesan}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8fafc' },
  screen: { flex: 1, padding: 12, gap: 10 },
  row: { flexDirection: 'row', gap: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 10, padding: 12, backgroundColor: '#fff' },
  addBtn: { backgroundColor: '#2563eb', paddingHorizontal: 16, justifyContent: 'center', borderRadius: 10 },
  btnTxt: { color: '#fff', fontWeight: '700' },

  header: { padding: 16, paddingBottom: 8 },
  h1: { fontSize: 22, fontWeight: '700' },

  tabs: { flexDirection: 'row', paddingHorizontal: 12, gap: 8, marginBottom: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999, backgroundColor: '#e2e8f0' },
  tabActive: { backgroundColor: '#2563eb' },
  tabTxt: { color: '#0f172a', fontWeight: '600' },
  tabTxtActive: { color: '#fff' },

  filterRow: { flexDirection: 'row', gap: 8 },
  pill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 1, borderColor: '#cbd5e1' },
  pillActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  pillTxt: { color: '#0f172a' },
  pillTxtActive: { color: '#fff', fontWeight: '700' },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  muted: { color: '#64748b' },
  danger: { color: '#dc2626', fontWeight: '600' },

  todoItem: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fff', padding: 12, borderRadius: 10,
    borderWidth: 1, borderColor: '#e2e8f0',
  },
  cb: { width: 22, height: 22, borderRadius: 4, borderWidth: 1, borderColor: '#94a3b8', alignItems: 'center', justifyContent: 'center' },
  cbDone: { backgroundColor: '#16a34a', borderColor: '#16a34a' },

  produkItem: {
    flexDirection: 'row', gap: 12, alignItems: 'center',
    backgroundColor: '#fff', padding: 10, borderRadius: 12,
    borderWidth: 1, borderColor: '#e2e8f0',
  },
  produkImg: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#e2e8f0' },
  produkNama: { fontWeight: '700', fontSize: 15 },
  produkHarga: { color: '#2563eb', fontWeight: '700', marginTop: 2 },

  sectionH: {
    backgroundColor: '#e2e8f0', paddingVertical: 4, paddingHorizontal: 10,
    fontWeight: '700', borderRadius: 6, marginTop: 8,
  },
});
