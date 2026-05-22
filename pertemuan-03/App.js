import { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';

/**
 * Pertemuan 3 — State, Event, Form & Validasi
 *
 * Target: 4 fitur dalam 1 layar
 *  A. Counter dengan tombol −, Reset, +. Disable "−" bila count <= 0.
 *  B. Konverter Suhu live (Celsius -> Fahrenheit & Kelvin).
 *  C. Form Pendaftaran (nama, email, umur, jurusan, setuju TOS) + validasi.
 *  D. Theme switch light/dark.
 */

const JURUSAN = ['Informatika', 'Sistem Informasi', 'Teknik Elektro', 'Manajemen'];

export default function App() {
  // === A. Counter ===
  // TODO 1: state count default 0.

  // === B. Suhu ===
  // TODO 2: state celsius (string, default '').
  // TODO 3: hitung fahrenheit dengan useMemo (celsius * 9/5 + 32). Jika NaN -> '-'.
  // TODO 4: hitung kelvin dengan useMemo (celsius + 273.15). Jika NaN -> '-'.

  // === C. Form ===
  // TODO 5: state form { nama:'', email:'', umur:'', jurusan: JURUSAN[0], setuju:false }
  // TODO 6: state errors {} dan helper validate() yang mengisi errors lalu return true/false.
  //         Aturan: nama tidak kosong, email mengandung '@', umur > 0, setuju === true.

  // === D. Theme ===
  // TODO 7: state dark (boolean default false). Pilih theme = dark ? darkTheme : lightTheme.

  const submit = () => {
    // TODO 8: panggil validate(). Jika gagal, Alert "Form belum valid".
    // TODO 9: jika sukses, Alert ringkasan data form.
  };

  return (
    <SafeAreaView style={styles.safe /* TODO 10: tambahkan backgroundColor theme.bg */}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        {/* Header + Theme Switch */}
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <Text style={styles.h1}>Pertemuan 3</Text>
          {/* TODO 11: <Switch value={dark} onValueChange={setDark} /> */}
        </View>

        {/* A. Counter */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>A. Counter</Text>
          {/* TODO 12: tampilkan count besar di tengah */}
          <View style={styles.row}>
            {/* TODO 13: 3 Pressable: −, Reset, + */}
          </View>
        </View>

        {/* B. Konverter Suhu */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>B. Konverter Suhu</Text>
          {/* TODO 14: TextInput numeric value=celsius onChangeText=setCelsius */}
          {/* TODO 15: tampilkan °F dan K */}
        </View>

        {/* C. Form Pendaftaran */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>C. Form Pendaftaran</Text>
          {/* TODO 16: 3 field: Nama, Email (autoCapitalize='none'), Umur (numeric).
              Gunakan komponen <Field /> di bawah supaya error inline tampil. */}

          {/* TODO 17: Picker jurusan: row of pills, JURUSAN.map -> Pressable.
              Aktif → backgroundColor accent. */}

          {/* TODO 18: Checkbox "setuju" (Pressable + kotak). */}

          {/* TODO 19: tombol Daftar -> submit() */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Field({ label, error, ...rest }) {
  // TODO 20: render <Text>label</Text> + <TextInput {...rest}/> + <Text style={styles.err}>error</Text> bila ada.
  return null;
}

const lightTheme = {
  bg: '#f8fafc', card: '#fff', text: '#0f172a',
  muted: '#94a3b8', border: '#cbd5e1', accent: '#2563eb',
};
const darkTheme = {
  bg: '#0f172a', card: '#1e293b', text: '#f1f5f9',
  muted: '#64748b', border: '#334155', accent: '#60a5fa',
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  h1: { fontSize: 22, fontWeight: '700' },
  card: { padding: 16, borderRadius: 16, gap: 10, backgroundColor: '#fff' },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  counter: { fontSize: 48, fontWeight: '800', textAlign: 'center', color: '#2563eb' },
  btn: { flex: 1, backgroundColor: '#2563eb', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  btnDisabled: { opacity: 0.4 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  btnGhost: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 10, padding: 12 },
  label: { fontWeight: '600', marginBottom: 4 },
  err: { color: '#dc2626', fontSize: 12, marginTop: 4 },
  pill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 1, borderColor: '#cbd5e1' },
  checkbox: { width: 22, height: 22, borderWidth: 1, borderColor: '#94a3b8', borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
});
