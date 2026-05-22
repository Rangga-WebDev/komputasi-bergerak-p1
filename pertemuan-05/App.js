import 'react-native-gesture-handler';
import { useState, useMemo, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';

/**
 * Pertemuan 5 — Navigation: Bottom Tab + Nested Stack + Params + Context
 *
 * Struktur:
 *  Tabs:
 *    - HomeTab    -> StackHome  -> Home -> Detail
 *    - CartTab    -> StackCart  -> Cart -> Checkout
 *    - ProfileTab -> Profile (no stack)
 *
 *  Bonus: Cart pakai React Context (CartContext) supaya jumlah item
 *  bisa ditampilkan sebagai badge di tab Cart.
 *
 * Instalasi (ingatkan mahasiswa):
 *   npx expo install react-native-screens react-native-safe-area-context
 *   npm i @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
 */

const PRODUK = [
  { id: 'p1', nama: 'Kopi Susu', harga: 18000, img: 'https://picsum.photos/seed/kopi/300', desc: 'Kopi susu gula aren signature.' },
  { id: 'p2', nama: 'Teh Tarik', harga: 15000, img: 'https://picsum.photos/seed/teh/300', desc: 'Teh tarik creamy ala mamak.' },
  { id: 'p3', nama: 'Roti Bakar', harga: 12000, img: 'https://picsum.photos/seed/roti/300', desc: 'Roti bakar coklat keju legit.' },
  { id: 'p4', nama: 'Mie Goreng', harga: 20000, img: 'https://picsum.photos/seed/mie/300', desc: 'Mie goreng spesial telur.' },
];

/* ===================== Cart Context (Bonus) ===================== */
const CartCtx = createContext(null);
function useCart() { return useContext(CartCtx); }

function CartProvider({ children }) {
  // TODO 1: state items = array { id, nama, harga, qty }.
  // TODO 2: addItem(produk): jika sudah ada -> qty+1, jika belum -> push qty=1.
  // TODO 3: removeItem(id) dan clear().
  // TODO 4: total = useMemo sum(qty*harga); count = useMemo sum(qty).
  // TODO 5: kembalikan provider dengan value { items, addItem, removeItem, clear, total, count }.
  return <CartCtx.Provider value={{}}>{children}</CartCtx.Provider>;
}

/* ============================== Stacks ============================== */
const HomeStack = createNativeStackNavigator();
function HomeStackNav() {
  // TODO 6: HomeStack dengan dua screen: "Home" -> HomeScreen, "Detail" -> DetailScreen.
  //         Atur title screen secara dinamis dari route.params.nama.
  return null;
}

const CartStack = createNativeStackNavigator();
function CartStackNav() {
  // TODO 7: CartStack: "Cart" -> CartScreen, "Checkout" -> CheckoutScreen.
  return null;
}

/* ============================== Tabs ============================== */
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        {/* TODO 8: Tab.Navigator dengan 3 tab:
              - "HomeTab"    -> HomeStackNav    (label "Home")
              - "CartTab"    -> CartStackNav    (label "Cart", badge = count > 0)
              - "ProfileTab" -> ProfileScreen   (label "Profile")
            Sembunyikan header bawaan tab supaya hanya stack header yang tampil. */}
      </NavigationContainer>
    </CartProvider>
  );
}

/* ============================ Home Screen ============================ */
function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={PRODUK}
        keyExtractor={(it) => it.id}
        contentContainerStyle={{ padding: 12, gap: 10 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => {
              // TODO 9: navigation.navigate('Detail', { produk: item }) — kirim object via params.
            }}
          >
            <Image source={{ uri: item.img }} style={styles.thumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.nama}</Text>
              <Text style={styles.muted}>Rp {item.harga.toLocaleString('id-ID')}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

/* =========================== Detail Screen =========================== */
function DetailScreen({ route, navigation }) {
  // TODO 10: ambil produk dari route.params.produk.
  // TODO 11: tampilkan gambar besar, nama, harga, deskripsi.
  // TODO 12: tombol "Tambah ke Cart" -> useCart().addItem(produk) + Alert sukses.
  // TODO 13: tombol "Lihat Cart" -> navigation.getParent().navigate('CartTab').
  return null;
}

/* ============================ Cart Screen ============================ */
function CartScreen({ navigation }) {
  // TODO 14: const { items, removeItem, total, clear } = useCart();
  // TODO 15: render FlatList items: nama, qty, subtotal, tombol hapus.
  // TODO 16: footer: total + tombol "Checkout" (navigate 'Checkout', { total }) + "Kosongkan".
  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ padding: 16 }}>
        <Text style={styles.muted}>TODO: tampilkan isi cart.</Text>
      </View>
    </SafeAreaView>
  );
}

/* ========================= Checkout Screen ========================= */
function CheckoutScreen({ route, navigation }) {
  const total = route?.params?.total ?? 0;
  // TODO 17: tampilkan ringkasan (total). Tombol "Bayar" -> Alert sukses + clear() + navigation.popToTop().
  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ padding: 16, gap: 8 }}>
        <Text style={styles.title}>Checkout</Text>
        <Text>Total: Rp {Number(total).toLocaleString('id-ID')}</Text>
      </View>
    </SafeAreaView>
  );
}

/* ========================== Profile Screen ========================== */
function ProfileScreen() {
  // TODO 18: tampilkan profil sederhana + tombol "Tentang Aplikasi" (Alert).
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.muted}>TODO: lengkapi tampilan profil.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8fafc' },
  card: {
    flexDirection: 'row', gap: 12, alignItems: 'center',
    backgroundColor: '#fff', padding: 10, borderRadius: 12,
    borderWidth: 1, borderColor: '#e2e8f0',
  },
  thumb: { width: 70, height: 70, borderRadius: 8, backgroundColor: '#e2e8f0' },
  title: { fontWeight: '700', fontSize: 16 },
  muted: { color: '#64748b' },
  primaryBtn: { backgroundColor: '#2563eb', padding: 14, borderRadius: 10, alignItems: 'center' },
  primaryTxt: { color: '#fff', fontWeight: '700' },
  ghostBtn: { padding: 12, alignItems: 'center' },
});
