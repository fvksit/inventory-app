Inventory Management App adalah aplikasi berbasis web yang dirancang untuk mempermudah pengelolaan data inventaris dengan fitur lengkap dan antarmuka yang responsif. Aplikasi ini mendukung fitur CRUD (Create, Read, Update, Delete) untuk pengelolaan data inventaris, sehingga cocok untuk bisnis kecil hingga menengah.

Teknologi Utama:

Frontend: Dibangun menggunakan React.js untuk menyediakan antarmuka pengguna yang dinamis dan intuitif.
Backend: Dikembangkan menggunakan Express.js dan Node.js untuk logika server-side yang efisien dan REST API yang handal.
Database: Menggunakan PostgreSQL sebagai database relasional untuk penyimpanan data yang aman dan terstruktur.
Fitur Utama:

CRUD: Kelola data inventaris, termasuk menambah, membaca, memperbarui, dan menghapus informasi produk.
UI Responsif: Antarmuka pengguna yang ramah di berbagai perangkat.
Validasi Input: Memastikan data yang dimasukkan konsisten dan valid.
REST API: Backend menyediakan endpoint yang terstruktur untuk mendukung komunikasi antara frontend dan database.
Keamanan Data: Menggunakan PostgreSQL untuk menjaga integritas dan keandalan penyimpanan data.
Cara Menggunakan:

Clone repositori ini ke komputer lokal Anda.
Install dependensi dengan menjalankan perintah npm install di direktori frontend dan backend.
Buat file .env di direktori backend dan konfigurasikan kredensial database PostgreSQL Anda (contoh: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME).
Jalankan migrasi database (jika ada) untuk mengatur tabel yang diperlukan.
Jalankan backend dengan npm start dan frontend dengan npm run start.
Akses aplikasi melalui browser di http://localhost:3000.
Struktur Folder:

Frontend: Berisi kode untuk antarmuka pengguna berbasis React.js.
Backend: Berisi kode untuk REST API yang dibangun dengan Express.js dan Node.js.
Database: Menggunakan PostgreSQL untuk mengelola data inventaris.
