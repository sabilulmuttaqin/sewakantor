## 🛠️ **Instalasi Proyek Backend**  

### 1. **Clone Repository**  
```bash
git clone --branch==backend https://github.com/sabilulmuttaqin/sewakantor.git
cd backend
```

### 2. **Install Dependencies**  
```bash
composer install
```

### 3. **Konfigurasi Environment**  
Buat file `.env` dengan menyalin dari `.env.example`:  
```bash
cp .env.example .env
```

Edit file `.env` dan sesuaikan konfigurasi database:  
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sewakantor
DB_USERNAME=root
DB_PASSWORD=
```

### 4. **Generate APP Key**  
```bash
php artisan key:generate
```

### 5. **Impor Database**  
Import database dengan file yang sudah di sediakan
#### Buka phpMyAdmin, masuk ke menu export dan pilih sewakantor.sql

Atau jika menggunakan command line
```bash
mysql -u root -p sewakantor < sewakantor.sql
```

### 6. **Buat Symbolic Link untuk Storage**  
```bash
php artisan storage:link
```

### 7. **Jalankan Server Laravel**  
```bash
php artisan serve
```

Akses di browser:  
```
http://localhost:8000
```

---

## 🛠️ **Instalasi Proyek FrontEnd**  

### 1. **Clone Repository**  
```bash
git clone --branch==frontend https://github.com/sabilulmuttaqin/sewakantor.git
cd frontend
```
### 2. **Install Dependencies**  
```bash
npm install
```
### 3. **Run server**  
```bash
npm install
```

---

## 🔑 **Akses Admin Filament**  
Akses panel admin:  
```
http://localhost:8000/admin
```

**Akun Default Admin**  
```
Email: admin@admin.com  
Password: 11111111
```

---

## 🚦 **Endpoint API**  
| Method | Endpoint             | Deskripsi              |
|--------|----------------------|------------------------|
| GET    | /api/cities          | Ambil semua kota       |
| GET    | /api/city/{slug}     | Ambil kota spesifik    |
| GET    | /api/offices         | Ambil semua kantor     |
| GET    | /api/office/{slug}   | Ambil kantor spesifik  |

---

## 🧠 **Troubleshooting**  
Jika terjadi error:  
- Pastikan database sudah diimpor atau dimigrasikan.  
- Pastikan `.env` sudah dikonfigurasi dengan benar.  
- Pastikan dependency sudah diinstal dengan benar (`composer install`).  

