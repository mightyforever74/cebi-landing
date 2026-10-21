# FORK_BASELINE.md — cebi-landing

Bu dosya, `cebi-landing` reposunun "doğum sertifikası"dır. Fork anındaki durumu sabitler; ilerleyen fazlarda değiştirilmez, sadece altına tarihli not eklenir.

| Alan | Değer |
|---|---|
| **Proje** | TulipFleet Customer Edition (Cebi) — Tanıtım/Landing Sayfası |
| **Fork tarihi** | 2026-10-21 |
| **Kaynak repo** | https://github.com/mightyforever74/tulipfleet-landing |
| **Baseline branch** | `main` (kaynak `origin/main`) |
| **Baseline commit SHA** | `eb9899722f5e0bef499eaa42faedc45b297e61f4` |
| **Baseline commit mesajı** | "copy: homepage API panel — gerçek API key + canlı kota sayaçları (FEAT-Connect)" |
| **Fork senaryosu** | Senaryo A — doğrudan `origin/main`'den (dosya kopyası, `cebi-landing` boş repoya ilk commit olarak) |
| **Kardeş repolar** | `cebi-backend` ← `tulipfleet-backend` · `cebi-dispatcher` ← `tulipfleet-dispatcher` · `cebi-mobile` ← `tulipfleet` |
| **Merkezi ADR'ler** | `cebi-backend` reposunda, `/docs/adr/ADR-CE-01…04` |

## Fork kapsamı ve kararlar (2026-10-21, Cem ile netleşti)

- **Ayrı izole repo/deployment** — diğer 3 fork ile aynı ADR-CE-03 izolasyon ilkesi (tek sunucuda tam mantıksal izolasyon, ortak secret/DB/servis yok).
- **Dil: SADECE TÜRKÇE.** Kaynak sitenin 9 dilli yapısı (`en, nl, tr, bg, de, es, fr, it, ku`) kaldırılıp tek dilli (TR) yapıya indirgendi — `LanguageSwitcher` ve diğer 8 dil kaldırıldı.
- **İçerik — kaldırılanlar:** Hollanda/AB sıfır-emisyon-bölgesi (ZE-zone) odaklı tüm pazarlama metni, Amsterdam/Rotterdam ZE-Zone rozetleri ve mockup'ları, "Netherlands today, Benelux–Germany corridor next" bölümü, NL'ye özgü footer sloganı, `amsterdam-map-scene.svg` kullanımı.
- **İçerik — eklenenler:** Cebi'nin gerçek değer önerisi — (1) geofence tabanlı gemi boşaltma/tartım takibi, (2) hatasız/canlı kargo takibiyle tam dispatcher otomasyonu, (3) rota bazlı şoför yevmiye hesaplama.
- **Self-serve SaaS altyapısı (fiyatlandırma hesaplayıcı, kayıt/early-access formları, çerez onayı):** Cem bu konuda net tercih belirtmedi ("fark etmez"). Benim kararım: **kaldırıldı.** Gerekçe: Cebi tek-kiracılı/white-label bir ürün, genel kullanıma açık self-serve SaaS modeli değil — bu bileşenler (PricingCalculator, SignupForm, EarlyAccessForm, CookieConsent) Cebi'nin kullanım biçimine uymuyor ve bakım yükü ekliyor. Bu sayfa artık bir "ilgi çekme / tanıtım" sayfası; kayıt/ödeme akışı yok.

## Uygulama (2026-10-21, aynı gün) — TAMAMLANDI

Tek-geçişte tam yeniden yapılandırma yapıldı (i18n/Dictionary soyutlaması tamamen kaldırıldı — tek dil için anlamsızdı):

- **Mimari sadeleştirme:** `src/i18n/` (9 dilli Dictionary sistemi, `getDictionary`/`isActiveLocale`), `src/lib/env.ts` (`localizePath`), `src/lib/seo.ts` (hreflang cluster), `src/lib/consent.ts`, `src/lib/pricing.ts`, `src/config/{i18n,analytics,mobileScreenshots,showcase,stores}.ts` tamamen silindi. Yerine tek dosya: `src/content/site.ts` (tipleri `src/content/types.ts`) — tüm metin burada, `dict`/`locale` prop zinciri yok.
- **Sayfalar:** `src/pages/{en,nl,bg,de,es,fr,it,ku,tr}/` (tüm dil klasörleri) silindi → tek `src/pages/index.astro` (kök `/`, dil öneki yok). `/pricing`, `/signup`, `/early-access`, `/connect`, `/privacy`, `/terms`, `/imprint`, `/dpa`, `/subprocessors`, `/delete-account` sayfaları kaldırıldı (self-serve kaldırma kararının doğal sonucu — bu sayfada veri toplayan tek form yok, sadece `mailto:` demo talebi var, bu yüzden ayrı bir gizlilik politikası sayfasına v1'de gerek görülmedi).
- **Bileşenler:** `LanguageSwitcher`, `PricingCalculator`, `SignupForm`, `EarlyAccessForm`, `ConnectForm`, `CookieConsent`, `ConsentScriptLoader`, `ProductShowcase`, `PhoneCarousel`, `StatsBand`, `LegalDoc`, `ConnectCTA`, `TrialCTA`, `LocalePlaceholder` silindi. `TrialCTA`/`ConnectCTA` yerine tek `DemoCTA.astro` (mailto tabanlı "Demo Talebi" bölümü).
- **Gerçek TulipFleet ürün ekran görüntüleri kullanılmadı** (`public/screenshots/` tamamen silindi) — marka karışıklığı riski (TulipFleet adı/ZE-Zone özelliği görünür ekranlar) nedeniyle bilinçli karar. `MobileBridge` ve Hero bölümleri CSS/SVG temsili mockup kullanıyor ("Temsili görünüm" notuyla, kaynak repodaki dürüstlük disiplinine uygun).
- **İçerik — "live" vs "roadmap" dürüstlük kontrolü yapıldı:** Landing page yazılırken `cebi-backend`'de `grep -ri "yevmiye\|per_diem"` ile kontrol edildi — rota bazlı otomatik yevmiye hesaplama henüz kodlanmamış, bu yüzden sayfada **"roadmap"** (sırada) olarak işaretlendi, "live" değil. Geofence/kantar (ADR-CE-04) ve dispatcher/canlı takip gerçekten bu oturumda doğrulanmış çalışan özellikler oldukları için "live" işaretlendi.
- **CSS sınıf isimleri genelleştirildi:** `.heffing-card`→`.metric-card`, `.heffing-amount`→`.metric-amount`, `.zone-ok`→`.status-ok`, `.zone-alert`→`.status-alert` (NL-vergi terminolojisi koddan da temizlendi). Hero mockup'taki `amsterdam-map-scene.svg` (ID'lere bağlı CSS animasyonuyla) tamamen kaldırıldı; yerine yeni `geofence-port-scene.svg` (liman/gemi/kantar/geofence halkaları) + jenerik radar-pulse animasyonu.
- **Doğrulama:** `npm install` + `npm run build` temiz geçti, `astro preview` ile Playwright üzerinden tam sayfa ekran görüntüsü alınıp görsel olarak kontrol edildi — NL/ZE-Zone/TulipFleet marka kalıntısı yok, Türkçe içerik eksiksiz render oluyor.
- **Açık/bekleyen (bu girdi kapatıldı — bkz. aşağıdaki "Domain + dağıtım" revizyonu):** ~~Gerçek domain/subdomain kararı yok~~, ~~dağıtım platformu kararı yok~~. `info@tulipfleet.com` hâlâ placeholder iletişim adresi (Cebi'nin kendi adresi yoksa).

## Domain + dağıtım platformu kararı kapandı (2026-10-21, aynı gün)

Domain: **`cebi.tulipfleet.com`** (www yok — `cebi-dispatcher.tulipfleet.com`
deseniyle tutarlı, Cem onayladı). Dağıtım platformu: `cebi-dispatcher`'ın
izlediği ADR-CE-03 deseni — Cloudflare Pages DEĞİL, `fleet-enterprise-01`'in
kendi Caddy'si. Eklenenler: `Dockerfile` (iki aşamalı — `node:22-alpine` Astro
static build + `caddy:2-alpine` statik servis; cebi-dispatcher'dan fark: bu bir
SPA değil, build-time API env değişkeni de gerekmiyor — site hiçbir backend'e
konuşmuyor), `docker/Caddyfile` (container-içi 404 handling, SPA fallback
değil), `docker-compose.cebi-landing.yml` (izole network, port `3102` —
`cebi-backend` 3100 / `cebi-dispatcher` 3101 deseninin devamı), `.dockerignore`.
`astro.config.mjs`'deki `SITE` ve `public/robots.txt`'deki `Sitemap:` satırı
artık placeholder değil, kesin değer.

**2026-10-21 (aynı gün, devam) — TAMAMLANDI ve canlıda doğrulandı:** Cem
`/opt/cebi-landing`'e clone edip `docker compose -f docker-compose.cebi-
landing.yml up -d --build cebi-landing` çalıştırdı — 17/17 adım 13.3s'de
temiz tamamlandı, `cebi-landing-net` ağı ve container sorunsuz ayağa kalktı
(bu ortamda Docker daemon olmadığı için konteyner build'i ilk kez sunucuda
görüldü — `npm run build` çıktısı zaten burada doğrulanmıştı). `curl
http://127.0.0.1:3102` tam doğru HTML döndü (hero mockup + feature tabs
hydrate olmuş, demo CTA'sız footer).

DNS: Cloudflare'de `cebi.tulipfleet.com` → `49.12.246.212` A kaydı eklendi
(Proxied), `cebi-dispatcher.tulipfleet.com` ile aynı desen. Origin
Certificate (RSA 2048, tek host, 15 yıl) oluşturulup sunucuya
`/etc/caddy/origin/cebi-landing.{crt,key}` olarak elle kopyalandı (private
key hiçbir zaman chat/docs'a yapıştırılmadı — izinler doğrulandı: `.crt`
644, `.key` 640, `root:caddy`, `cebi-dispatcher.{crt,key}` ile birebir
aynı). Host `/etc/caddy/Caddyfile`'a `cebi-dispatcher` bloğunun birebir
kopyası eklendi (domain, cert/key yolu, `reverse_proxy 127.0.0.1:3102`
değiştirilerek) — `caddy validate` + `systemctl reload caddy` temiz,
`curl -I https://cebi.tulipfleet.com` → `200`, HSTS/güvenlik header'ları
doğru, Cloudflare üzerinden (`server: cloudflare`, `cf-ray` mevcut).

Dağıtım artık sadece kayıtlı değil, fiilen canlı ve uçtan uca doğrulanmış.

## Revizyon (2026-10-21, aynı gün) — "Demo İsteyin" CTA'sı kaldırıldı

Cem onay sonrası ek istek: dönüşüm/CTA amaçlı hiçbir çağrı istemiyor — sayfa saf tanıtım/bilgilendirme olsun. Kaldırılanlar: `DemoCTA.astro` (tüm `#contact` bölümü), header'daki "Demo İsteyin" butonu, header/footer'daki "İletişim" nav öğeleri, hero'daki ikinci CTA butonu ("Demo İsteyin" — sadece "Özellikleri Gör" kaldı). Footer'da şirket e-postası (`info@tulipfleet.com`) pasif bilgi olarak duruyor (buton/CTA değil, sadece erişim için). `npm run build` + Playwright görsel kontrol tekrar yapıldı, temiz.
