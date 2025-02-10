# NestJS Project Repository

## 1. Penjelasan Singkat

Repositori ini merupakan aplikasi backend yang dibangun menggunakan framework NestJS. Aplikasi ini memiliki beberapa fitur utama, yaitu manajemen data mahasiswa, autentikasi, manajemen profil, dan chat real-time menggunakan WebSocket. Struktur repositori ini diorganisir berdasarkan fitur-fitur yang ada, dengan setiap fitur memiliki modul, controller, dan service tersendiri.

### Struktur Direktori:
- **src/main.ts**: File entry point aplikasi NestJS.
- **src/app.module.ts**: Modul utama aplikasi yang mengimport semua modul fitur.
- **src/app.controller.ts**: Controller utama aplikasi.
- **src/app.service.ts**: Service utama aplikasi.
- **src/mahasiswa/**: Folder untuk fitur manajemen data mahasiswa.
  - `mahasiswa.controller.ts`: Controller untuk fitur mahasiswa.
  - `mahasiswa.service.ts`: Service untuk fitur mahasiswa.
- **src/auth/**: Folder untuk fitur autentikasi.
  - `auth.controller.ts`: Controller untuk fitur autentikasi.
  - `auth.service.ts`: Service untuk fitur autentikasi.
- **src/profile/**: Folder untuk fitur manajemen profil.
  - `profile.controller.ts`: Controller untuk fitur profil.
  - `profile.service.ts`: Service untuk fitur profil.
- **src/chat/**: Folder untuk fitur chat real-time.
  - `chat.gateway.ts`: Gateway untuk fitur chat menggunakan WebSocket.

## 2. Cara Menjalankan Aplikasi

Untuk menjalankan aplikasi ini, ikuti langkah-langkah berikut:

1. **Clone repositori**:
   ```bash
   git clone https://github.com/username/repository-name.git
   cd repository-name
2. **Install Dependencies**:
    ```bash
    npm install
4. **Jalankan Aplikasi**:
    ```bash
    npm run start
5. **Jalankan dalam mode development**(hot-reload):
   ```bash
   npm run start:dev
Aplikasi akan berjalan pada http://localhost:3000.
