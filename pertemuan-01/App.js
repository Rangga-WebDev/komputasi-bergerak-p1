import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Alert,
  SafeAreaView,
} from 'react-native';

/**
 * Pertemuan 1 — Mini Profile App
 * Lengkapi setiap TODO. Akhir target:
 *  - Header tanggal hari ini (Bahasa Indonesia).
 *  - Profile card (foto, nama, NIM, prodi, motto).
 *  - Daftar hobi (chips) dari array.
 *  - Counter "kunjungan" + tombol reset.
 *  - Tombol info menampilkan Alert.
 */

// TODO 1: Lengkapi data PROFILE di bawah dengan data Anda sendiri.
const PROFILE = {
  nama: 'Nama Anda',
  nim: '00000000',
  prodi: 'Program Studi',
  motto: 'Tulis motto favorit Anda',
  hobi: ['Hobi 1', 'Hobi 2', 'Hobi 3'], // boleh tambah lagi
  fotoUrl: 'https://i.pravatar.cc/200?img=1',
};

export default function App() {
  // TODO 2: Buat state `kunjungan` (number, default 0) dengan useState.

  // TODO 3: Buat variabel `tanggal` berisi tanggal hari ini dalam Bahasa Indonesia.
  // Petunjuk: new Date().toLocaleDateString('id-ID', { weekday:'long', day:'numeric', month:'long', year:'numeric' })
  const tanggal = '...';

  const showInfo = () => {
    // TODO 4: Tampilkan Alert berisi nama Anda dan tanggal.
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>Halo Komputasi Bergerak 👋</Text>
          {/* TODO 5: Tampilkan {tanggal} dengan style subtitle */}
        </View>

        {/* Profile Card */}
        <View style={styles.card}>
          {/* TODO 6: Image dengan source={{ uri: PROFILE.fotoUrl }} dan style avatar */}
          {/* TODO 7: Text nama, role (prodi · NIM), motto */}
        </View>

        {/* Hobi Chips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hobi</Text>
          <View style={styles.chipRow}>
            {/* TODO 8: PROFILE.hobi.map(...) -> render <View style={styles.chip}><Text>{h}</Text></View> */}
          </View>
        </View>

        {/* Counter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Counter Kunjungan</Text>
          {/* TODO 9: Tampilkan {kunjungan} kali ditekan dengan style counter */}
          {/* TODO 10: Pressable "Tambah Kunjungan" -> setKunjungan(kunjungan + 1) */}
          {/* TODO 11: Pressable "Reset" -> setKunjungan(0) */}
        </View>

        {/* TODO 12: Pressable ghost "Tentang aplikasi ini" memanggil showInfo */}
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8fafc' },
  scroll: { padding: 16, gap: 16 },
  header: { alignItems: 'center', marginTop: 8 },
  appTitle: { fontSize: 22, fontWeight: 'bold', color: '#0f172a' },
  subtitle: { color: '#64748b', marginTop: 4 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
  },
  avatar: { width: 110, height: 110, borderRadius: 55, marginBottom: 12 },
  name: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
  role: { color: '#64748b', marginTop: 4 },
  motto: { marginTop: 10, fontStyle: 'italic', color: '#334155', textAlign: 'center' },
  section: { backgroundColor: '#fff', borderRadius: 16, padding: 16, gap: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#dbeafe', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  chipText: { color: '#1e40af', fontWeight: '600' },
  counter: { fontSize: 28, fontWeight: '800', color: '#2563eb' },
  btn: { backgroundColor: '#2563eb', padding: 12, borderRadius: 10, alignItems: 'center' },
  btnSecondary: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#2563eb' },
  btnText: { color: '#fff', fontWeight: '600' },
  btnGhost: { padding: 12, alignItems: 'center' },
});
