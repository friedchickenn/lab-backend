# NestJS Project 

## 1. Penjelasan Singkat

Repositori ini merupakan aplikasi backend yang dibangun menggunakan framework NestJS. Aplikasi ini memiliki beberapa fitur utama, yaitu manajemen data mahasiswa, autentikasi, manajemen profil, dan chat real-time menggunakan WebSocket. Struktur repositori ini diorganisir berdasarkan fitur-fitur yang ada, dengan setiap fitur memiliki modul, controller, dan service tersendiri.

### Struktur Direktori:
```
📦 latihan-nest/
├── 📂node_modules/         # Direktori dependensi Node.js
├── 📂prisma/               # Konfigurasi Prisma ORM
│   ├── prisma.schema      # Skema Prisma untuk database
├── 📂src/                  # Direktori utama kode sumber
│   ├── 📂chat/             # Modul chat dengan WebSocket
│   |   |-- chat.gateaway.spec.ts  # Unit test untuk chat gateway
│   |   |-- chat.gateaway.ts       # Implementasi WebSocket gateway
│   |   |-- chat.module.ts         # Modul chat
│   |   |-- chat.service.spec.ts   # Unit test untuk chat service
│   |   |-- chat.service.ts        # Service untuk fitur chat
│   ├── 📂dto/              # Data Transfer Objects (DTOs)
│   |   |-- create-mahasiswa.dto.ts  # DTO untuk mahasiswa
│   |   |-- update-mahasiswa.dto.ts  # DTO untuk mahasiswa
│   |   |-- register-user.dto.ts      # DTO untuk registrasi pengguna
│   |   |-- login-user.dto.ts      # DTO untuk login pengguna
│   ├── 📂entity/           # Entity untuk database
│   |   |-- user.entity.ts  # Definisi entitas pengguna
│   ├── 📂mahasiswa-profile/ # Modul untuk profil mahasiswa
│   |   |-- mahasiswa-profile.controller.spec.ts  # Unit test controller profil mahasiswa
│   |   |-- mahasiswa-profile.controller.ts       # Controller profil mahasiswa
│   |   |-- mahasiswa-profile.module.ts          # Modul profil mahasiswa
│   |   |-- mahasiswa-profile.service.spec.ts    # Unit test service profil mahasiswa
│   |   |-- mahasiswa-profile.service.ts         # Service untuk profil mahasiswa
│   ├── 📂profile/            # Modul profil umum
│   |   |-- profile.controller.spec.ts  # Unit test controller profil
│   |   |-- profile.controller.ts       # Controller profil
│   |   |-- profile.module.ts           # Modul profil
│   |   |-- profile.service.spec.ts     # Unit test service profil
│   |   |-- profile.service.ts          # Service untuk profil
│   |-- app.controller.spec.ts  # Unit test controller utama
│   |-- app.controller.ts       # Controller utama aplikasi
│   |-- app.module.ts           # Modul utama aplikasi
│   |-- app.service.ts          # Service utama aplikasi
│   |-- auth.guard.ts           # Middleware untuk autentikasi
│   |-- auth.module.ts          # Modul autentikasi
│   |-- main.ts              # File utama untuk menjalankan aplikasi
│   |-- prisma.ts            # Konfigurasi koneksi Prisma
│   |-- user.decorator.ts    # Custom decorator untuk user
├── 📂test/                # Direktori untuk unit testing
├── 📂uploads/             # Direktori untuk penyimpanan file yang diunggah
├── .env                   # File konfigurasi environment
├── .gitignore             # File untuk mengabaikan file yang tidak perlu dalam Git
├── .prettierrc            # Konfigurasi Prettier untuk code formatting
├── nest-cli.json          # Konfigurasi CLI NestJS
├── package-lock.json      # File lock dependencies
├── package.json           # File konfigurasi npm
├── README.md              # Dokumentasi proyek
├── tsconfig.build.json    # Konfigurasi TypeScript untuk build
├── tsconfig.json          # Konfigurasi utama TypeScript
```
## 2. Cara Menjalankan Aplikasi

Untuk menjalankan aplikasi ini, ikuti langkah-langkah berikut:

1. **Clone repositori**:
   ```bash
   git clone https://github.com/username/repository-name.git
   cd repository-name
2. **Install Dependencies**:
    ```bash
    npm install
3. **Setup database**:
   - Pastikan database sudah terinstall dan berjalan.
   - Sesuaikan konfigurasi database di file prisma/schema.prisma.
   - Jalankan migrasi Prisma:
      ```bash
      npx prisma migrate dev --name init
5. **Jalankan Aplikasi**:
    ```bash
    npm run start
6. **Jalankan dalam mode development**(hot-reload):
   ```bash
   npm run start:dev
Aplikasi akan berjalan pada http://localhost:3000.

## 3. Penjelasan POST dan GET Mahasiswa
- **POST /mahasiswa**: Endpoint ini digunakan untuk menambahkan data mahasiswa baru ke dalam database. Data yang dikirim oleh client akan diproses oleh MahasiswaController, kemudian diteruskan ke MahasiswaService untuk validasi dan penyimpanan ke database.
- **GET /mahasiswa**: Endpoint ini digunakan untuk mengambil semua data mahasiswa yang tersimpan di database. Permintaan dari client akan diproses oleh MahasiswaController dan MahasiswaService sebelum mengembalikan data ke client.
**Diagram Alur**:
```mermaid
flowchart TD
    A[Client] --> B[POST /mahasiswa]
    B --> C[MahasiswaController]
    C --> D[MahasiswaService]
    D --> E[Database]

    F[Client] --> G[GET /mahasiswa]
    G --> C
    C --> D
    D --> E
```
## 4. Penjelasan GET, PUT, DELETE Mahasiswa by NIM
- **GET /mahasiswa/:nim**: Endpoint ini digunakan untuk mengambil data mahasiswa berdasarkan NIM. NIM dikirim sebagai parameter dalam URL, dan data yang sesuai akan dicari di database.
- **PUT /mahasiswa/:nim**: Endpoint ini digunakan untuk mengupdate data mahasiswa berdasarkan NIM. Data baru dikirim oleh client, dan data lama akan diupdate di database.
- **DELETE /mahasiswa/:nim**: Endpoint ini digunakan untuk menghapus data mahasiswa berdasarkan NIM. Data yang sesuai dengan NIM akan dihapus dari database.
**Diagram Alur**:
```mermaid
flowchart TD
    A[Client] --> B[GET /mahasiswa/:nim]
    B --> C[MahasiswaController]
    C --> D[MahasiswaService]
    D --> E[Database]

    F[Client] --> G[PUT /mahasiswa/:nim]
    G --> C
    C --> D
    D --> E

    H[Client] --> I[DELETE /mahasiswa/:nim]
    I --> C
    C --> D
    D --> E
```
## 5. Penjelasan GET Auth, POST Register, dan POST Login
- **GET /auth**: Endpoint ini digunakan untuk mendapatkan informasi autentikasi, seperti status login atau token.
- **POST /auth/register**: Endpoint ini digunakan untuk mendaftarkan user baru. Data registrasi (seperti username dan password) akan disimpan di database.
- **POST /auth/login**: Endpoint ini digunakan untuk proses login. Client mengirimkan username dan password, dan sistem akan memverifikasi data tersebut sebelum memberikan akses.
**Diagram Alur**:
```mermaid
flowchart TD
    A[Client] --> B[GET /auth]
    B --> C[AuthController]
    C --> D[AuthService]
    D --> E[Database]

    F[Client] --> G[POST /auth/register]
    G --> C
    C --> D
    D --> E

    H[Client] --> I[POST /auth/login]
    I --> C
    C --> D
    D --> E
```
## 6. Penjelasan POST Profile/Upload, POST Mahasiswa/Upload by NIM, GET Mahasiswa/Foto by NIM
- **POST /profile/upload**: Endpoint ini digunakan untuk mengupload foto profil user. File yang diupload akan diproses dan disimpan di database atau sistem penyimpanan.
- **POST /mahasiswa/upload/:nim**: Endpoint ini digunakan untuk mengupload foto mahasiswa berdasarkan NIM. File foto akan dikaitkan dengan data mahasiswa yang sesuai.
- **GET /mahasiswa/foto/:nim**: Endpoint ini digunakan untuk mengambil foto mahasiswa berdasarkan NIM. Foto akan diambil dari database atau sistem penyimpanan dan dikirim ke client.
**Diagram Alur**:
```mermaid
flowchart TD
    A[Client] --> B[POST /profile/upload]
    B --> C[ProfileController]
    C --> D[ProfileService]
    D --> E[Database]

    F[Client] --> G[POST /mahasiswa/upload/:nim]
    G --> H[MahasiswaController]
    H --> I[MahasiswaService]
    I --> E

    J[Client] --> K[GET /mahasiswa/foto/:nim]
    K --> H
    H --> I
    I --> E
```
## 7. Penjelasan GET Profile/Search dan GET Profile by ID
- **GET /profile/search**: Endpoint ini digunakan untuk mencari profil berdasarkan query tertentu, seperti nama atau email. Hasil pencarian akan dikembalikan ke client.
- **GET /profile/:id**: Endpoint ini digunakan untuk mengambil data profil berdasarkan ID. ID dikirim sebagai parameter dalam URL, dan data yang sesuai akan dicari di database.
**Diagram Alur**:
```mermaid
flowchart TD
    A[Client] --> B[GET /profile/search?query=]
    B --> C[ProfileController]
    C --> D[ProfileService]
    D --> E[Database]

    F[Client] --> G[GET /profile/:id]
    G --> C
    C --> D
    D --> E
```
## 8. Penjelasan GET Mahasiswa/Search by Nama
**GET /mahasiswa/search**: Endpoint ini digunakan untuk mencari data mahasiswa berdasarkan nama. Query nama dikirim oleh client, dan sistem akan mencari data yang sesuai di database.
**Diagram Alur**:
```mermaid
flowchart TD
    A[Client] --> B[GET /mahasiswa/search?nama=]
    B --> C[MahasiswaController]
    C --> D[MahasiswaService]
    D --> E[Database]
```
## 9. Penjelasan Chat Menggunakan Socket
- **WebSocket Connection**: Client terhubung ke server menggunakan WebSocket untuk komunikasi real-time.
- **ChatGateway**: Gateway yang menangani koneksi WebSocket dan mengelola pesan yang dikirim dan diterima.
- **ChatService**: Service yang menangani logika bisnis, seperti menyimpan pesan ke database atau mengirim pesan ke client lain.
- **Send/Receive Message**: Client dapat mengirim pesan ke server dan menerima pesan dari client lain secara real-time.
**Diagram Alur**:
```mermaid
flowchart TD
    A[Client] --> B[WebSocket Connection]
    B --> C[ChatGateway]
    C --> D[ChatService]
    D --> E[Database]

    C --> F[Send Message]
    F --> A

    C --> G[Receive Message]
    G --> A
```
