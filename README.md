# Zenius AI — Landing Page Layanan AI Lokal

Landing page statis untuk bisnis layanan AI lokal, dikemas siap Docker.

## Struktur File

```
.
├── index.html        # Halaman utama (HTML semantik + aksesibilitas)
├── css/
│   └── style.css     # CSS penuh, CSS variables, responsive
├── js/
│   └── script.js     # Vanilla JS (navigasi, scroll, form kontak)
├── Dockerfile        # Build & serve dengan Nginx
├── docker-compose.yml# Orchestrasi, port 8080 → 80
└── README.md         # Dokumentasi ini
```

## Fitur

- **Responsive** — tampil cocok di ponsel, tablet, dan desktop.
- **Tanpa framework** — murni HTML, CSS, dan vanilla JavaScript.
- **Layanan lengkap** — hero, layanan, alur kerja, kontak, dan footer.
- **Formulir kontak** — validasi client-side, tanpa dependensi eksternal.
- **Dikelola Docker** — Nginx alpine, port 8080.

## Menjalankan Secara Lokal

Tidak perlu Docker, cukup buka `index.html` di browser.

## Menjalankan dengan Docker

```bash
# Build & start (port 8080)
docker compose up -d

# Cek
open http://localhost:8080

# Stop
docker compose down
```

## Testing

```bash
# Cek sintaks JavaScript
node --check js/script.js

# Validasi konfigurasi Docker Compose
docker compose config

# Build image
docker build -t aimind-web .
```
