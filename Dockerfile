# Build & serve a static landing page with Nginx.
# Build:  docker build -t aimind-web .
# Run:    docker compose up -d

FROM nginx:alpine

# Hapus konfigurasi standar Nginx.
RUN rm -rf /usr/share/nginx/html/*

# Salin file statis ke root server Nginx.
COPY . /usr/share/nginx/html/

# Matikan daemon (agar container tetap menjadi PID 1).
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Port 8080 — kunci container akan dipetankan di docker-compose.yml.
EXPOSE 8080

# Sertakan varian runtime (LC_ALL agar UTF-8 berjalan mulus).
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8

# Jalankan Nginx.
CMD ["nginx"]
