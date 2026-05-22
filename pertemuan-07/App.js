import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

/**
 * Pertemuan 7 — Native APIs: AsyncStorage + Camera/Gallery + Location
 *
 * Aplikasi: "Catatan Lokasi" — buat catatan dengan teks + foto + koordinat,
 * disimpan di AsyncStorage. Bisa edit & hapus.
 *
 * Tabs sederhana di atas:
 *  A. Catatan  : list catatan (dari storage), tombol +Tambah -> form.
 *  B. Form     : input teks, ambil foto (kamera/galeri), ambil lokasi.
 *  C. Tentang  : menampilkan ringkasan storage (jumlah catatan, total ukuran string).
 *
 * Instalasi:
 *   npx expo install @react-native-async-storage/async-storage expo-image-picker expo-location
 */

const STORAGE_KEY = '@catatan_lokasi_v1';
const TABS = ['Catatan', 'Tambah', 'Tentang'];

export default function App() {
  // TODO 1: state catatan (array { id, teks, foto, lat, lng, alamat, ts }).
  // TODO 2: state tab default 'Catatan' dan editingId default null.

  // TODO 3: useEffect mount -> load() dari AsyncStorage.
  const load = async () => {
    // const raw = await AsyncStorage.getItem(STORAGE_KEY);
    // setCatatan(raw ? JSON.parse(raw) : []);
  };

  const persist = async (next) => {
    // TODO 4: setCatatan(next) + await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).
  };

  const upsert = async (data) => {
    // TODO 5: jika data.id sudah ada -> replace; jika tidak -> tambah dengan id baru.
    //         Setelah selesai, balik ke tab 'Catatan' dan reset editingId.
  };

  const remove = (id) => {
    // TODO 6: konfirmasi via Alert. Jika OK -> persist(catatan.filter(c => c.id !== id)).
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.h1}>Catatan Lokasi</Text>
      </View>
      <View style={styles.tabs}>
        {TABS.map((t) => {
          const on = false; /* TODO 7: t === tab */
          return (
            <Pressable
              key={t}
              onPress={() => { /* TODO 8: setTab(t); jika t!=='Tambah', editingId reset. */ }}
              style={[styles.tab, on && styles.tabActive]}
            >
              <Text style={[styles.tabTxt, on && styles.tabTxtActive]}>{t}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* TODO 9: render konten sesuai tab:
          - Catatan -> <ListScreen data={catatan} onEdit={(c)=>{setEditingId(c.id); setTab('Tambah')}} onDelete={remove} />
          - Tambah  -> <FormScreen initial={catatan.find(c=>c.id===editingId)} onSubmit={upsert} />
          - Tentang -> <AboutScreen data={catatan} />  */}
    </SafeAreaView>
  );
}

/* ============================ List ============================ */
function ListScreen({ data, onEdit, onDelete }) {
  // TODO 10: FlatList dengan kartu: foto thumb (jika ada), teks (numberOfLines=2),
  //          koordinat lat/lng (jika ada), tombol Edit & Hapus.
  //          ListEmptyComponent: "Belum ada catatan."
  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={styles.muted}>TODO: tampilkan list catatan ({data.length}).</Text>
    </View>
  );
}

/* ============================ Form ============================ */
function FormScreen({ initial, onSubmit }) {
  // TODO 11: state teks, foto (uri), lat, lng, alamat — inisialisasi dari initial bila ada.

  const ambilDariKamera = async () => {
    // TODO 12: minta izin: ImagePicker.requestCameraPermissionsAsync().
    //          Jika denied -> Alert.
    //          ImagePicker.launchCameraAsync({ quality:0.5, allowsEditing:true })
    //          set foto = result.assets[0].uri.
  };

  const ambilDariGaleri = async () => {
    // TODO 13: ImagePicker.requestMediaLibraryPermissionsAsync() + launchImageLibraryAsync.
  };

  const ambilLokasi = async () => {
    // TODO 14: Location.requestForegroundPermissionsAsync() -> jika granted:
    //          const pos = await Location.getCurrentPositionAsync({});
    //          set lat, lng.
    //          Lalu reverseGeocodeAsync -> ambil item[0] -> susun alamat (city, region).
  };

  const submit = () => {
    // TODO 15: validasi: teks tidak boleh kosong.
    //          panggil onSubmit({ id: initial?.id, teks, foto, lat, lng, alamat, ts: Date.now() }).
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 12, gap: 12 }}>
      <Text style={styles.label}>Catatan</Text>
      <TextInput
        style={[styles.input, { height: 90 }]}
        multiline
        placeholder="Tulis catatan..."
      /* TODO 16: value & onChangeText */
      />

      <Text style={styles.label}>Foto</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Pressable style={styles.btn} onPress={ambilDariKamera}>
          <Text style={styles.btnTxt}>📷 Kamera</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={ambilDariGaleri}>
          <Text style={styles.btnTxt}>🖼️ Galeri</Text>
        </Pressable>
      </View>
      {/* TODO 17: jika foto -> tampilkan <Image source={{uri:foto}} style={styles.preview}/>. */}

      <Text style={styles.label}>Lokasi</Text>
      <Pressable style={styles.btn} onPress={ambilLokasi}>
        <Text style={styles.btnTxt}>📍 Ambil Lokasi Saat Ini</Text>
      </Pressable>
      {/* TODO 18: jika lat/lng -> tampilkan koordinat & alamat. */}

      <Pressable style={[styles.primary]} onPress={submit}>
        <Text style={styles.primaryTxt}>Simpan</Text>
      </Pressable>
    </ScrollView>
  );
}

/* ============================ About ============================ */
function AboutScreen({ data }) {
  // TODO 19: tampilkan: jumlah catatan, ukuran data (JSON.stringify(data).length char),
  //          tombol "Hapus Semua" (Alert konfirmasi -> AsyncStorage.removeItem(STORAGE_KEY) + reload aplikasi mungkin perlu refresh).
  return (
    <View style={{ padding: 16, gap: 8 }}>
      <Text style={styles.muted}>Total catatan: {data.length}</Text>
      <Text style={styles.muted}>Ukuran (kira-kira): {JSON.stringify(data).length} char</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 16, paddingBottom: 4 },
  h1: { fontSize: 22, fontWeight: '700' },
  tabs: { flexDirection: 'row', paddingHorizontal: 12, gap: 8, marginBottom: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999, backgroundColor: '#e2e8f0' },
  tabActive: { backgroundColor: '#2563eb' },
  tabTxt: { color: '#0f172a', fontWeight: '600' },
  tabTxtActive: { color: '#fff' },

  label: { fontWeight: '700' },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 10, padding: 12, backgroundColor: '#fff' },
  btn: { flex: 1, backgroundColor: '#0ea5e9', padding: 12, borderRadius: 10, alignItems: 'center' },
  btnTxt: { color: '#fff', fontWeight: '700' },
  primary: { backgroundColor: '#2563eb', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  primaryTxt: { color: '#fff', fontWeight: '700' },
  preview: { width: '100%', height: 200, borderRadius: 10, marginTop: 8, backgroundColor: '#e2e8f0' },

  card: {
    backgroundColor: '#fff', padding: 12, borderRadius: 12, gap: 6,
    borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 8,
    flexDirection: 'row',
  },
  thumb: { width: 70, height: 70, borderRadius: 8, backgroundColor: '#e2e8f0' },
  muted: { color: '#64748b' },
});
