import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from 'react-native';

/**
 * Pertemuan 2 — Profile App "Lengkap"
 * Target akhir: header banner + kartu profil (avatar overlap), stats,
 * tombol Follow/Pesan, section About/Skill/Galeri/Jadwal.
 *
 * Lengkapi setiap TODO. Anda boleh mengganti data sesuai diri sendiri.
 */

const SKILLS = ['React Native', 'JavaScript', 'UI Design', 'Git'];
// TODO 1: Tambahkan minimal 6 URL gambar (boleh dari https://picsum.photos/seed/<apa saja>/300)
const GALLERY = [
  // 'https://picsum.photos/seed/a/300',
];

export default function App() {
  const { width } = useWindowDimensions();
  // TODO 2: Hitung cellSize agar 3 kolom muat dengan padding 16 & gap 8.
  const cellSize = 100;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* TODO 3: <View style={styles.banner} /> sebagai header berwarna */}

        {/* Card Profil */}
        <View style={styles.card}>
          {/* TODO 4: Image avatar (style.avatar) */}

          {/* TODO 5: Text nama + role */}

          {/* Stats */}
          <View style={styles.statsRow}>
            {/* TODO 6: 3x <Stat label=".." value=".." /> dengan <Divider /> di antaranya */}
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            {/* TODO 7: 2 Pressable: "Follow" (primary) & "Pesan" (secondary) */}
          </View>
        </View>

        {/* TODO 8: <Section title="Tentang"> berisi <Text> bio singkat */}

        {/* TODO 9: <Section title="Skill"> render SKILLS.map -> chip */}

        {/* TODO 10: <Section title="Galeri"> render GALLERY.map -> Image (cellSize x cellSize) di styles.gallery */}

        {/* TODO 11: <Section title="Jadwal Hari Ini"> render minimal 3 baris jadwal (jam | mata kuliah) */}
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value }) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Divider() {
  return <View style={{ width: 1, backgroundColor: '#e2e8f0' }} />;
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f1f5f9' },
  banner: { height: 120, backgroundColor: '#2563eb' },
  card: {
    marginHorizontal: 16,
    marginTop: -50,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
    marginTop: -60,
  },
  name: { fontSize: 20, fontWeight: '700', marginTop: 8 },
  role: { color: '#64748b', marginBottom: 16 },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  statValue: { fontSize: 16, fontWeight: '700' },
  statLabel: { color: '#64748b', fontSize: 12 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 16, width: '100%' },
  btn: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  primary: { backgroundColor: '#2563eb' },
  secondary: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#2563eb' },
  btnText: { color: '#fff', fontWeight: '600' },
  section: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  body: { color: '#334155', lineHeight: 20 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#dbeafe', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  chipText: { color: '#1e40af', fontWeight: '600' },
  gallery: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  row: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#f1f5f9' },
  rowJam: { width: 70, fontWeight: '700', color: '#2563eb' },
  rowMk: { flex: 1, color: '#0f172a' },
});
