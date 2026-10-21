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

Henüz kesinleşmedi. Kardeş repo `cebi-dispatcher`'ın izlediği desen (ADR-CE-03,
`fleet-enterprise-01`'in kendi Caddy'si üzerinden statik servis — Cloudflare
Pages değil) burada da uygulanabilir; domain/subdomain Cem tarafından
belirlenecek. `astro.config.mjs`'deki `SITE` sabiti ve `public/robots.txt`'deki
`Sitemap:` satırı, gerçek domain netleşince güncellenmeli.

## TODO

- Gerçek domain/subdomain kararı (`astro.config.mjs` → `SITE`, `public/robots.txt`)
- Dağıtım platformu kararı (muhtemelen `cebi-dispatcher` deseni — bkz. yukarıda)
- Varsa gerçek Cebi ürün ekran görüntüleri (şu an sadece CSS/SVG temsili görünüm var — gerçek TulipFleet ekran görüntüleri bilerek kullanılmadı, marka karışıklığı riski)
