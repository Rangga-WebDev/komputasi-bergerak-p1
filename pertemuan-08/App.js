import 'react-native-gesture-handler';
import { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Pertemuan 8 — Final Project Starter: "MiniShop"
 *
 * Menggabungkan SEMUA materi (Pertemuan 1–7):
 *  - Component, props, styling (P1–P2)
 *  - State, form, validation (P3)
 *  - List, search, filter (P4)
 *  - Bottom Tab + Stack navigator (P5)
 *  - Fetch REST API (DummyJSON) + loading/error/pagination (P6)
 *  - AsyncStorage untuk Cart & Favorite (P7)
 *
 * Struktur:
 *  Tabs:
 *    - HomeTab     -> Stack: Home (list+search+kategori) -> Detail
 *    - FavoriteTab -> Favorite (list dari AsyncStorage)
 *    - CartTab     -> Stack: Cart -> Checkout (badge jumlah)
 *    - ProfileTab  -> Profile (form sederhana, simpan ke AsyncStorage)
 *
 * Instalasi:
 *   npx expo install react-native-screens react-native-safe-area-context
 *   npx expo install @react-native-async-storage/async-storage
 *   npm i @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
 *
 * == TUGAS AKHIR (selama 2 minggu) ==
 *  Lengkapi semua TODO di file ini, lalu kembangkan minimal 2 fitur tambahan
 *  (lihat daftar di README.md).
 */

const BASE = 'https://dummyjson.com';
const STORAGE_CART = '@minishop_cart_v1';
const STORAGE_FAV = '@minishop_fav_v1';
const STORAGE_PROFILE = '@minishop_profile_v1';

/* =========================== Store Context =========================== */
const ShopCtx = createContext(null);
const useShop = () => useContext(ShopCtx);

function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);     // [{ id, title, price, thumbnail, qty }]
  const [favs, setFavs] = useState([]);     // [{ id, title, price, thumbnail }]
  const [profile, setProfile] = useState({ nama: '', email: '' });

  // TODO 1: useEffect mount -> load 3 storage keys -> setCart, setFavs, setProfile.

  const persistCart = async (next) => {
    // TODO 2: setCart(next) + AsyncStorage.setItem(STORAGE_CART, JSON.stringify(next)).
  };
  const persistFavs = async (next) => { /* TODO 3: sama untuk favs */ };
  const persistProfile = async (next) => { /* TODO 4: sama untuk profile */ };

  const addToCart = (p) => {
    // TODO 5: jika ada -> qty+1, jika tidak -> push qty=1.
  };
  const setQty = (id, qty) => {
    // TODO 6: jika qty<=0 -> hapus item; selain itu update qty.
  };
  const removeFromCart = (id) => { /* TODO 7 */ };
  const clearCart = () => persistCart([]);

  const toggleFav = (p) => {
    // TODO 8: jika sudah ada -> remove; jika belum -> tambah {id,title,price,thumbnail}.
  };
  const isFav = (id) => favs.some((f) => f.id === id);

  const total = useMemo(() => cart.reduce((a, x) => a + x.price * x.qty, 0), [cart]);
  const count = useMemo(() => cart.reduce((a, x) => a + x.qty, 0), [cart]);

  return (
    <ShopCtx.Provider
      value={{
        cart, favs, profile,
        addToCart, setQty, removeFromCart, clearCart,
        toggleFav, isFav,
        setProfile: persistProfile,
        total, count,
      }}
    >
      {children}
    </ShopCtx.Provider>
  );
}

/* =============================== Stacks =============================== */
const HomeStack = createNativeStackNavigator();
function HomeStackNav() {
  // TODO 9: Stack berisi "Home" -> HomeScreen, "Detail" -> DetailScreen.
  //         Title detail dinamis dari params.title.
  return null;
}

const CartStack = createNativeStackNavigator();
function CartStackNav() {
  // TODO 10: "Cart" -> CartScreen, "Checkout" -> CheckoutScreen.
  return null;
}

/* ================================ Tabs ================================ */
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ShopProvider>
      <NavigationContainer>
        {/* TODO 11: Tab.Navigator dengan 4 tab:
              HomeTab -> HomeStackNav,
              FavoriteTab -> FavoriteScreen,
              CartTab -> CartStackNav (badge count),
              ProfileTab -> ProfileScreen.
            screenOptions={{ headerShown:false }}. */}
      </NavigationContainer>
    </ShopProvider>
  );
}

/* ============================ Home Screen ============================ */
const KATEGORI = ['all', 'smartphones', 'laptops', 'fragrances', 'skincare', 'groceries'];

function HomeScreen({ navigation }) {
  // TODO 12: state items, loading, error, q (search), kat (default 'all'),
  //          skip, total, loadingMore.

  // TODO 13: load(reset) — pilih URL:
  //   - q dan kat==='all'  -> /products?limit=10&skip=...
  //   - q ada              -> /products/search?q=...&limit=10&skip=...
  //   - kat selain 'all'   -> /products/category/{kat}?limit=10&skip=...
  //   handle dedupe + total + state.

  // TODO 14: useEffect debounce 400ms terhadap [q, kat] -> load(true).

  // TODO 15: render header: search bar + horizontal pill kategori (FlatList horizontal atau ScrollView).

  // TODO 16: FlatList items 2 kolom (numColumns=2) — kartu produk:
  //   gambar, title (numberOfLines=1), price, ❤️ icon (toggleFav), tap -> Detail.

  // TODO 17: onEndReached -> loadMore (cek items.length < total).

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ padding: 16 }}>
        <Text style={styles.muted}>TODO: implementasi HomeScreen.</Text>
      </View>
    </SafeAreaView>
  );
}

/* =========================== Detail Screen =========================== */
function DetailScreen({ route, navigation }) {
  const { id, title } = route.params;
  // TODO 18: fetch GET /products/{id} -> set data, loading, error.
  // TODO 19: tampilkan: galeri horizontal, title, brand, price, rating, stock, description.
  // TODO 20: tombol "Tambah ke Cart" (addToCart), "❤️ Favorit" (toggleFav, isFav).
  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ padding: 16 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.muted}>TODO: detail produk #{id}.</Text>
      </View>
    </SafeAreaView>
  );
}

/* ========================== Favorite Screen ========================== */
function FavoriteScreen({ navigation }) {
  // TODO 21: const { favs, toggleFav } = useShop();
  //          render FlatList 2 kolom seperti Home, plus tombol hapus dari favorit.
  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ padding: 16 }}>
        <Text style={styles.title}>Favorit</Text>
        <Text style={styles.muted}>TODO: list dari useShop().favs.</Text>
      </View>
    </SafeAreaView>
  );
}

/* ============================ Cart Screen ============================ */
function CartScreen({ navigation }) {
  // TODO 22: list cart dari context. Setiap item: thumb + title + price + qty (− / +) + total per item + hapus.
  //          Footer: total + tombol Checkout.
  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ padding: 16 }}>
        <Text style={styles.title}>Cart</Text>
        <Text style={styles.muted}>TODO: list cart.</Text>
      </View>
    </SafeAreaView>
  );
}

/* ========================= Checkout Screen ========================= */
function CheckoutScreen({ navigation }) {
  // TODO 23: ringkasan total + form alamat sederhana + tombol "Bayar":
  //          validasi alamat tidak kosong → Alert sukses → clearCart() → popToTop ke Home.
  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ padding: 16 }}>
        <Text style={styles.title}>Checkout</Text>
        <Text style={styles.muted}>TODO: form alamat + tombol bayar.</Text>
      </View>
    </SafeAreaView>
  );
}

/* ========================== Profile Screen ========================== */
function ProfileScreen() {
  // TODO 24: form nama + email tersinkron dengan useShop().profile + setProfile.
  //          tombol Simpan -> Alert sukses.
  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ padding: 16 }}>
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.muted}>TODO: form profil tersimpan ke AsyncStorage.</Text>
      </View>
    </SafeAreaView>
  );
}

/* =============================== Styles =============================== */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8fafc' },
  title: { fontSize: 20, fontWeight: '700' },
  muted: { color: '#64748b' },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 10, padding: 12, backgroundColor: '#fff' },
  cardCol: {
    flex: 1, backgroundColor: '#fff', padding: 8, borderRadius: 12,
    borderWidth: 1, borderColor: '#e2e8f0', margin: 4,
  },
  thumbBig: { width: '100%', height: 120, borderRadius: 8, backgroundColor: '#e2e8f0' },
  pill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: '#e2e8f0', marginRight: 6 },
  pillActive: { backgroundColor: '#2563eb' },
  pillTxt: { color: '#0f172a', fontWeight: '600', textTransform: 'capitalize' },
  pillTxtActive: { color: '#fff' },
  primary: { backgroundColor: '#2563eb', padding: 14, borderRadius: 10, alignItems: 'center' },
  primaryTxt: { color: '#fff', fontWeight: '700' },
  ghost: { padding: 12, alignItems: 'center' },
  price: { color: '#2563eb', fontWeight: '700' },
});
