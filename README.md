# Cebi — Landing Page

TulipFleet Customer Edition ("Cebi") için tek-kiracılı, white-label tanıtım
sayfası. `tulipfleet-landing` reposundan fork edilmiştir (bkz. `FORK_BASELINE.md`).
Astro + Tailwind v4 + React islands.

## Kapsam

- **Tek dil:** Türkçe. Kaynak repodaki 9 dilli yapı (en/nl/de/fr/es/it/bg/ku/tr)
  tamamen kaldırıldı — tek sayfa, dil öneki yok (`/`).
- **Self-servis SaaS altyapısı yok:** fiyatlandırma hesaplayıcı, kayıt/early-access
  formu, çerez onayı bilerek kaldırıldı. Tek etkileşim: `mailto:` ile demo talebi
  (`#contact`).
- **İçerik dürüstlük kuralı:** `src/content/site.ts` içinde `status: 'live'`
  işaretli her madde bugün çalışan bir özelliktir; henüz kodlanmamış hiçbir şey
  `live` yazılmaz — `roadmap` olarak işaretlenir.

## Stack

- **Astro** (`output: 'static'`)
- **Tailwind CSS v4**
- **React islands:** `FeatureTabs` (sekmeli özellik listesi), `HeroMockup` (hero
  bölümündeki canlı ticker mockup'ı)

## İçeriği düzenlemek

Tüm metin tek dosyada: `src/content/site.ts` (tipleri `src/content/types.ts`'de).
Bir metni değiştirmek için başka hiçbir dosyaya dokunmaya gerek yok.

## Setup

```bash
npm install
npm run dev
```

`http://localhost:4321/` adresini açın.

## Scripts

```bash
npm run dev      # local dev
npm run build    # static output → dist/
npm run preview  # preview production build
```

## Deploy

`fleet-enterprise-01`'in kendi Caddy'si üzerinden statik servis — `cebi-dispatcher`
ile birebir aynı desen (ADR-CE-03, Cloudflare Pages DEĞİL). Domain kararı
kapandı: **`cebi.tulipfleet.com`** (www yok).

```bash
# sunucuda
cd /opt
git clone https://github.com/mightyforever74/cebi-landing
cd cebi-landing
docker compose -f docker-compose.cebi-landing.yml up -d --build cebi-landing
curl http://127.0.0.1:3102   # statik dosya sunucusu ayakta mı
```

Sonra host Caddy'sine (`/etc/caddy/Caddyfile`) `cebi-dispatcher.tulipfleet.com`
site bloğunun bir kopyası eklenir (domain + origin cert yolu değiştirilerek),
Cloudflare'de `cebi.tulipfleet.com` için A/CNAME kaydı açılır (Proxied), sonra
`caddy validate && systemctl reload caddy`. Bu adımlar repo dışında, sunucuda
elle yapılır — `cebi-dispatcher/FORK_BASELINE.md`'deki 2026-10-19 girdisi
referans alınabilir.

Port deseni: `cebi-backend` → 3100, `cebi-dispatcher` → 3101, `cebi-landing` → 3102
(hepsi sadece `127.0.0.1`'e bind, dış erişim host Caddy üzerinden).

## TODO

- Sunucuda ilk deploy + DNS + host Caddy site bloğu (yukarıdaki adımlar — henüz yapılmadı)
- Varsa gerçek Cebi ürün ekran görüntüleri (şu an sadece CSS/SVG temsili görünüm var — gerçek TulipFleet ekran görüntüleri bilerek kullanılmadı, marka karışıklığı riski)
