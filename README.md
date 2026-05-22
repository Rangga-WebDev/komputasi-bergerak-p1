# Lab Aplikasi Komputasi Bergerak (CW6552022663)

Roadmap 8 pertemuan: **React Native + Expo (JavaScript)** — dari komponen dasar sampai aplikasi mobile fullstack.

## ⚡ Setup 1× di Codespace

Saat Codespace pertama kali terbuka, **buka terminal** (`` Ctrl + ` ``) lalu copy-paste perintah berikut:

```bash
bash .devcontainer/lab-setup.sh
```

Yang otomatis dilakukan:

- Install `lab-help`, `lab-log`, `lab-live`
- Menyalakan **live monitoring** ke dashboard dosen
- Pasang auto-restart untuk sesi berikutnya
- Mengaktifkan **terminal recording** sehingga instruktur dapat melihat seluruh perintah kamu

> Cukup **sekali saja**. Setelah selesai, **tutup terminal** lalu **buka terminal baru** sebelum mulai coding.

Verifikasi:

```bash
echo $LAB_SCRIPT_ACTIVE   # harus output: 1
```

Butuh bantuan dosen?

```bash
lab-help "stuck di error TouchableOpacity"
```

---

## 📋 Cara mengerjakan setiap pertemuan

1. Buat project Expo baru:
   ```bash
   npx create-expo-app@latest tugas-pertemuan-01 --template blank
   cd tugas-pertemuan-01
   ```
2. Salin file `App.js` dari `pertemuan-XX/` ke project (timpa `App.js` default).
3. Buka file dan **lengkapi setiap baris bertanda `// TODO`**.
4. Jalankan:
   ```bash
   npx expo start
   ```
5. Scan QR code dengan **Expo Go** di HP.
6. Baca `README.md` di tiap folder pertemuan untuk panduan langkah demi langkah dan **tugas akhir pertemuan**.

## 📦 Dependensi tambahan (per pertemuan)

| Pertemuan | Install |
|-----------|---------|
| 5 | `npx expo install react-native-screens react-native-safe-area-context && npm i @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs` |
| 7 | `npx expo install @react-native-async-storage/async-storage expo-image-picker expo-location` |
| 8 | semua paket P5 + `@react-native-async-storage/async-storage` |

## ✍️ Pengumpulan tugas

- Push ke GitHub repo masing-masing (`main` branch).
- Sertakan **screenshot** hasil di folder pertemuan terkait.
- Autograder akan jalan otomatis via GitHub Actions.
