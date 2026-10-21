# Cebi (TulipFleet Customer Edition) — cebi-landing static build + serve.
#
# ADR-CE-03 "Bağımsız Çalışma Zamanı" (v2) deseni — cebi-dispatcher ile aynı:
# Cloudflare Pages gibi harici bir dağıtım platformu değil, fleet-enterprise-01'in
# KENDİ Caddy'si tarafından reverse-proxy edilen bir statik dosya sunucusu.
#
# İki aşamalı build:
#   1) node — Astro static build (`output: 'static'`, build-time env değişkeni
#      GEREKMİYOR: bu site hiçbir API'ye konuşmuyor, sadece statik içerik).
#   2) caddy — sadece `dist/` çıktısını statik olarak sunar. Host Caddy'si
#      zaten TLS/Cloudflare Origin Cert/gzip/header işini üstleniyor (bkz.
#      docker-compose.cebi-landing.yml); bu iç Caddy ikinci bir TLS/compress
#      katmanı KURMAZ, sadece dosya sunar.

FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy:2-alpine AS serve
COPY --from=build /app/dist /usr/share/caddy
COPY docker/Caddyfile /etc/caddy/Caddyfile
EXPOSE 80
