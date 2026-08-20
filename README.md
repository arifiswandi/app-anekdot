# Catatan Kasus BK

Aplikasi web untuk manajemen catatan anekdot siswa berbasis React dan Vite, dengan integrasi ke Google Apps Script sebagai layer backend data. Proyek ini dirancang untuk mendukung proses pencatatan, pengelolaan, dan ekspor data BK secara cepat, rapi, dan konsisten.

## Tujuan aplikasi

- Login berbasis user session
- Pencatatan anekdot siswa secara terstruktur
- Update, hapus, dan rekap data catatan
- Import data dari file Excel
- Export data ke Excel dan PDF
- Menyediakan antarmuka yang konsisten dan mudah dipelihara untuk tim pengembang

## Stack teknologi

- React 19
- Vite
- React Router DOM
- XLSX
- Google Apps Script

## Arsitektur proyek

```text
src/
├── App.jsx
├── main.jsx
├── index.css
├── assets/
├── components/
│   └── ui/
│       ├── ExportButton.jsx
│       ├── StatCard.jsx
│       └── index.js
├── constants/
│   └── storage.js
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── Login.css
│   │   │   └── Login.jsx
│   │   └── index.js
│   └── records/
│       ├── components/
│       │   ├── RecordFormModal.jsx
│       │   ├── RecordsDashboard.css
│       │   └── RecordsDashboard.jsx
│       ├── utils/
│       │   ├── excelImport.js
│       │   ├── exportExcel.js
│       │   └── importExcel.js
│       └── index.js
├── hooks/
│   └── useStoredUser.js
├── pages/
│   ├── DashboardPage.jsx
│   └── LoginPage.jsx
├── services/
│   ├── dashboardService.js
│   └── gasService.js
```

## Konvensi organisasi kode

### 1. Feature
Folder di bawah src/features dipakai untuk domain utama aplikasi.
- auth: proses autentikasi dan login
- records: seluruh logika CRUD, ekspor, impor, dan tampilan catatan siswa

### 2. Pages
Folder src/pages berisi komponen layar yang langsung dipetakan ke route.
- LoginPage
- DashboardPage

### 3. Components
Folder src/components berisi reusable UI yang bersifat shared, terutama untuk komponen umum seperti card statistik dan tombol ekspor.

### 4. Services
Folder src/services berisi layer komunikasi dengan backend atau sumber data eksternal.
- dashboardService.js: operasi data catatan
- gasService.js: komunikasi ke Google Apps Script

### 5. Hooks dan constants
- hooks/: custom hook berorientasi state aplikasi
- constants/: konstanta global seperti storage key

### 6. Utilities
Helper yang spesifik terhadap satu fitur diletakkan di dalam fitur terkait agar tidak bercampur dengan logic global.

## Konvensi penamaan

- File komponen menggunakan PascalCase
- File util dan helper menggunakan camelCase deskriptif
- Variabel dan fungsi menggunakan camelCase
- Konstanta dan key global menggunakan UPPER_SNAKE_CASE
- Class CSS menggunakan konvensi BEM-like yang terstruktur per komponen

## Panduan pengembangan

- Hindari menaruh komponen fitur di root folder ketika sudah masuk domain feature
- Hindari helper global jika hanya dipakai satu fitur
- Gunakan service layer untuk komunikasi backend agar UI tidak terlalu “berat”
- Simpan state yang bersifat session di hook terpisah agar mudah dipelihara

## Cara menjalankan

```bash
npm install
npm run dev
```

## Build untuk produksi

```bash
npm run build
```

## Catatan tim

Struktur proyek ini disusun agar lebih rapi, lebih formal, dan lebih mudah dijaga dalam jangka panjang. Prinsip utamanya adalah memisahkan domain bisnis (feature), layer presentasi (page), komponen reusable (component), dan komunikasi data (service) agar organisasi kode tetap konsisten saat proyek berkembang.
