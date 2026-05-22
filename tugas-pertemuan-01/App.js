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
  nama: 'AGUNG ADI RANGGA (RAJAGULA)',
  nim: '105841102323',
  prodi: 'INFORMATIKA',
  motto: 'Hiduplah hari ini seakan-akan kamu akan mati besok',
  hobi: [
    'Ngeprompt tapi supaya keren bilangnya VibeCoding haha izin',
    'Belum ada',
    'Disepelekan',
  ], // boleh tambah lagi
  fotoUrl: 'https://i.pravatar.cc/200?img=12',
};

export default function App() {
  // TODO 2: Buat state `kunjungan` (number, default 0) dengan useState.
  const [kunjungan, setKunjungan] = useState(0);

  // BONUS: Tambahkan 2 counter berbeda, misalnya kopi dan air minum.
  const [kopi, setKopi] = useState(0);
  const [air, setAir] = useState(0);

  // TODO 3: Buat variabel `tanggal` berisi tanggal hari ini dalam Bahasa Indonesia.
  // Petunjuk: new Date().toLocaleDateString('id-ID', { weekday:'long', day:'numeric', month:'long', year:'numeric' })
  const tanggal = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const showInfo = () => {
    // TODO 4: Tampilkan Alert berisi nama Anda dan tanggal.
    Alert.alert(
      'Tentang Aplikasi',
      `${PROFILE.nama} membuat aplikasi Mini Profile ini pada ${tanggal}.`
    );
  };

  // BONUS: Tambah tombol "Bagikan" yang menampilkan Alert ringkasan profil.
  const bagikanProfil = () => {
    Alert.alert(
      'Bagikan Profil',
      `Nama: ${PROFILE.nama}\nNIM: ${PROFILE.nim}\nProdi: ${PROFILE.prodi}\nMotto: ${PROFILE.motto}\nHobi: ${PROFILE.hobi.join(', ')}`
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>Halo Komputasi Bergerak 👋</Text>

          {/* TODO 5: Tampilkan {tanggal} dengan style subtitle */}
          <Text style={styles.subtitle}>{tanggal}</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.card}>
          {/* TODO 6: Image dengan source={{ uri: PROFILE.fotoUrl }} dan style avatar */}
          <Image source={{ uri: PROFILE.fotoUrl }} style={styles.avatar} />

          {/* TODO 7: Text nama, role (prodi · NIM), motto */}
          <Text style={styles.name}>{PROFILE.nama}</Text>
          <Text style={styles.role}>
            {PROFILE.prodi} · {PROFILE.nim}
          </Text>
          <Text style={styles.motto}>"{PROFILE.motto}"</Text>
        </View>

        {/* Hobi Chips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hobi</Text>
          <View style={styles.chipRow}>
            {/* TODO 8: PROFILE.hobi.map(...) -> render <View style={styles.chip}><Text>{h}</Text></View> */}
            {PROFILE.hobi.map((hobi, index) => (
              <View key={index} style={styles.chip}>
                <Text style={styles.chipText}>{hobi}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Counter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Counter Kunjungan</Text>

          {/* TODO 9: Tampilkan {kunjungan} kali ditekan dengan style counter */}
          <Text style={styles.counter}>
            {kunjungan} kali ditekan {kunjungan >= 5 ? '🔥' : ''}
          </Text>

          {/* TODO 10: Pressable "Tambah Kunjungan" -> setKunjungan(kunjungan + 1) */}
          <Pressable
            style={styles.btn}
            onPress={() => setKunjungan(kunjungan + 1)}
          >
            <Text style={styles.btnText}>Tambah Kunjungan</Text>
          </Pressable>

          {/* TODO 11: Pressable "Reset" -> setKunjungan(0) */}
          <Pressable
            style={[styles.btn, styles.btnSecondary]}
            onPress={() => setKunjungan(0)}
          >
            <Text style={styles.btnSecondaryText}>Reset Kunjungan</Text>
          </Pressable>
        </View>

        {/* BONUS: 2 counter berbeda */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Counter Aktivitas Harian</Text>

          <View style={styles.counterBox}>
            <Text style={styles.activityTitle}>☕ Kopi</Text>
            <Text style={styles.smallCounter}>
              {kopi} gelas {kopi >= 5 ? '🔥' : ''}
            </Text>

            <Pressable style={styles.btn} onPress={() => setKopi(kopi + 1)}>
              <Text style={styles.btnText}>Tambah Kopi</Text>
            </Pressable>

            <Pressable
              style={[styles.btn, styles.btnSecondary]}
              onPress={() => setKopi(0)}
            >
              <Text style={styles.btnSecondaryText}>Reset Kopi</Text>
            </Pressable>
          </View>

          <View style={styles.counterBox}>
            <Text style={styles.activityTitle}>💧 Air Minum</Text>
            <Text style={styles.smallCounter}>
              {air} gelas {air >= 5 ? '🔥' : ''}
            </Text>

            <Pressable style={styles.btn} onPress={() => setAir(air + 1)}>
              <Text style={styles.btnText}>Tambah Air Minum</Text>
            </Pressable>

            <Pressable
              style={[styles.btn, styles.btnSecondary]}
              onPress={() => setAir(0)}
            >
              <Text style={styles.btnSecondaryText}>Reset Air Minum</Text>
            </Pressable>
          </View>
        </View>

        {/* BONUS: Tombol "Bagikan" */}
        <Pressable style={styles.btnShare} onPress={bagikanProfil}>
          <Text style={styles.btnText}>Bagikan Profil</Text>
        </Pressable>

        {/* TODO 12: Pressable ghost "Tentang aplikasi ini" memanggil showInfo */}
        <Pressable style={styles.btnGhost} onPress={showInfo}>
          <Text style={styles.btnGhostText}>Tentang aplikasi ini</Text>
        </Pressable>
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#ecfdf5' },
  scroll: { padding: 16, gap: 16 },
  header: { alignItems: 'center', marginTop: 8 },
  appTitle: { fontSize: 22, fontWeight: 'bold', color: '#064e3b', textAlign: 'center' },
  subtitle: { color: '#047857', marginTop: 4, fontWeight: '600' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#10b981',
  },
  name: { fontSize: 20, fontWeight: '700', color: '#064e3b', textAlign: 'center' },
  role: { color: '#64748b', marginTop: 4, fontWeight: '600' },
  motto: { marginTop: 10, fontStyle: 'italic', color: '#334155', textAlign: 'center' },
  section: { backgroundColor: '#fff', borderRadius: 16, padding: 16, gap: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#064e3b' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#d1fae5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  chipText: { color: '#065f46', fontWeight: '600' },
  counter: { fontSize: 28, fontWeight: '800', color: '#059669' },
  smallCounter: { fontSize: 22, fontWeight: '800', color: '#059669' },
  counterBox: {
    backgroundColor: '#f0fdf4',
    borderRadius: 14,
    padding: 12,
    gap: 8,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#064e3b',
  },
  btn: { backgroundColor: '#059669', padding: 12, borderRadius: 10, alignItems: 'center' },
  btnSecondary: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#059669' },
  btnShare: { backgroundColor: '#047857', padding: 14, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
  btnSecondaryText: { color: '#059669', fontWeight: '700' },
  btnGhost: { padding: 12, alignItems: 'center' },
  btnGhostText: { color: '#047857', fontWeight: '700' },
});