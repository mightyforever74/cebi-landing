import type { SiteContent } from './types';

/**
 * Cebi (TulipFleet Customer Edition) — tek kiracılı, white-label tanıtım sayfası.
 * Tek dil: Türkçe. Self-servis SaaS metni yok (fiyatlandırma/kayıt formu/çerez
 * onayı kaldırıldı — bkz. FORK_BASELINE.md).
 *
 * Dürüstlük kuralı: "live" olarak işaretlenen her madde bugün çalışan bir
 * özelliktir; henüz kodlanmamış hiçbir şey "live" yazılmaz (bkz. "roadmap").
 */
const site: SiteContent = {
  meta: {
    siteName: 'Cebi',
    title: 'Cebi — Saha operasyonunu tek ekrandan yönetin',
    description:
      'Gemi boşaltma ve tartım operasyonunu geofence ile otomatik doğrulayın, dispatcher panelinden hatasız canlı kargo takibi yapın. Telsiz ve kağıt puantaj yerine tek sistem.',
  },
  nav: {
    features: 'Özellikler',
    contact: 'İletişim',
    demoCta: 'Demo İsteyin',
    menu: 'Menü',
    primaryAria: 'Birincil gezinme',
  },
  hero: {
    badge: 'Saha operasyonu için özel yapım',
    title: 'Sahadaki her hareketi tek ekrandan görün',
    subtitle:
      'Gemi boşaltma ve kantar geçişini geofence ile otomatik doğrulayın, dispatcher panelinden hatasız canlı kargo takibi yapın. Telsiz, WhatsApp ve kağıt puantaj yerine tek sistem.',
    ctaDemo: 'Demo İsteyin',
    ctaFeatures: 'Özellikleri Gör',
    mockupTitle: 'Cebi Dispatcher — Canlı',
    mockupLive: 'Canlı',
    mockupJobs: 'Görevler',
    mockupDisclaimer: 'Temsili görünüm',
    jobs: [
      { id: 'CEBI-04', route: 'Liman → Depo A', status: 'Yolda', tone: 'live' },
      { id: 'CEBI-05', route: 'Kantar teslimi', status: 'Atandı', tone: 'idle' },
    ],
    phonePushTitle: '🔔 Yeni Görev Atandı',
    phonePushSub: '● Kabul Edildi → Canlı Takipte',
    scenarios: [
      {
        id: 'a',
        statusLabel: 'Liman Geofence',
        statusLine: 'Giriş algılandı — görev başladı',
        statusTone: 'ok',
        metricLabel: 'Kantar (Weighbridge)',
        metricLine: 'Tartım: 24.650 kg · Doğrulandı',
        metricHighlight: '24.650 kg',
      },
      {
        id: 'b',
        statusLabel: 'Dispatcher',
        statusLine: 'Görev kabul edildi — canlı izlemede',
        statusTone: 'ok',
        metricLabel: 'Rota',
        metricLine: 'Liman → Depo A · 18 km · 26 dk',
        metricHighlight: '18 km',
      },
      {
        id: 'c',
        statusLabel: 'Kantar (Weighbridge)',
        statusLine: 'Geçiş doğrulanmadan görev kapanamaz',
        statusTone: 'alert',
        metricLabel: 'Durum',
        metricLine: 'Tartım bekleniyor',
      },
    ],
  },
  excelStrip: {
    headline: 'Telsiz, WhatsApp ve kağıt puantajı bırakın — sahayı tek ekrandan yönetin.',
    points: ['Kurulumu biz yaparız', 'Mevcut filo verinizle başlarız', 'Hızlı devreye alma'],
    ariaLabel: 'Manuel süreçten Cebi’ye geçiş',
  },
  mobileBridge: {
    title: 'Ofis planlar, saha yaşar',
    subtitle: 'Komuta merkezi masanızda, operasyon sürücünün cebinde.',
    body:
      'Cebi iki uçta birden çalışır: dispatcher panelinden görev atarsınız, sürücünün telefonuna anında düşer. Araçlar canlı haritada, kantar ve geofence doğrulamaları otomatik — yoldayken bile tek tıkla görev atayabilirsiniz.',
    liveBadge: 'iOS + Android’de çalışıyor',
    cycleLabel: 'Canlı operasyon döngüsü',
    steps: [
      'Görev ata',
      'Push düşer, sürücü kabul eder',
      'Geofence + canlı konum izlenir',
      'Kantar geçişi doğrulanır',
      'Görev mühürlenip kapanır',
    ],
    phoneTitle: '🔔 Yeni Görev Atandı',
    phoneSub: '● Kabul Edildi → Canlı Takipte',
  },
  features: {
    sectionTitle: 'Bugün ne var — sırada ne var',
    sectionSubtitle:
      'Bugün kullanabileceğiniz canlı özellikler ve sırada olanlar. Şeffaf, net, abartısız.',
    roadmapNote: 'Yol haritası maddeleri ihtiyaca göre önceliklendirilerek devreye alınır.',
    live: 'Canlı',
    roadmap: 'Yol Haritası',
    tabsAria: 'Özellik kategorileri',
    radarAria: 'Geofence giriş/çıkış algılama göstergesi',
    panel: {
      geofenceStatus: 'Liman Geofence',
      geofenceLine: 'Giriş algılandı ✓',
      weighbridge: 'Kantar (Weighbridge)',
      weighbridgeLine: '24.650 kg · Doğrulandı ✓',
      taskRows: ['CEBI-04 · Liman → Depo A', 'CEBI-05 · Kantar teslimi', 'CEBI-06 · Depo B → Liman'],
      advisorySealed: 'Konum + zaman damgalı, gerekçe mühürlü kayıt',
      perDiemRoute: 'Rota',
      perDiemLine: 'Liman → Depo A · 18 km · 26 dk',
      perDiemAmount: '₺850',
      vehicle: 'Araç',
      driver: 'Sürücü',
      driverStatus: 'Görevde',
      iotBox: 'ESP32 IoT kutu',
      reportsSummary: 'Görev · tartım · rota özeti',
    },
    telemetry: {
      geofence: [
        { label: 'Liman geofence sınırı — tanımlı', tone: 'live' },
        { label: 'Kantar (weighbridge) entegrasyonu — canlı', tone: 'live' },
        { label: 'Kantar doğrulanmadan görev kapanmaz — uygulanıyor', tone: 'live' },
      ],
      dispatch: [
        { label: 'Görev atama → kabul → tamamlama akışı — canlı', tone: 'live' },
        { label: 'ESP32 + mobil GPS birleşik canlı takip — aktif', tone: 'live' },
      ],
      perdiem: [
        { label: 'Rota mesafe/süre hesabı — canlı', tone: 'live' },
        { label: 'Rota bazlı otomatik yevmiye hesaplama — planlanıyor', tone: 'planned' },
      ],
      fleet: [
        { label: 'Filo & görev yönetimi — canlı', tone: 'live' },
        { label: 'Sürücü mobil uygulaması — canlı', tone: 'live' },
      ],
      reports: [
        { label: 'Operasyon panoları — canlı', tone: 'live' },
        { label: 'Dışa aktarılabilir raporlar — planlanıyor', tone: 'planned' },
      ],
    },
    tabs: [
      {
        id: 'geofence',
        label: 'Geofence & Tartım',
        illustrationHint: 'Liman geofence + kantar doğrulama',
        items: [
          {
            status: 'live',
            title: 'Liman / Tesis Geofence',
            body:
              'Araç tanımlı sınıra girip çıktığı anda sistem otomatik algılar — kağıt kayıt ya da telsiz bildirimi gerekmez.',
          },
          {
            status: 'live',
            title: 'Kantar (Weighbridge) Kapısı',
            body:
              'Tartım kayda geçip doğrulanmadan görev tamamlanamaz — eksik veya hatalı tartım bildirimi riski ortadan kalkar.',
            note: 'Kural dispatcher ve mobil uygulamada aynı anda uygulanır.',
          },
          {
            status: 'roadmap',
            title: 'Kantar verisi otomatik entegrasyonu',
            body: 'Kantar cihazından doğrudan dijital veri aktarımı (elle giriş yerine) planlanıyor.',
          },
        ],
      },
      {
        id: 'dispatch',
        label: 'Dispatcher Otomasyonu',
        illustrationHint: 'Canlı görev ve kargo takip panosu',
        items: [
          {
            status: 'live',
            title: 'Görev Atama → Kabul → Tamamlama',
            body:
              'Dispatcher panelinden tek tıkla görev atanır, sürücü mobilden kabul eder; tüm akış zaman damgalı kaydedilir.',
          },
          {
            status: 'live',
            title: 'Hatasız Canlı Kargo Takibi',
            body:
              'Araç konumu ESP32 donanımından veya sürücü telefonundan canlı akar — hangi görevin nerede olduğunu her an tek ekrandan görürsünüz.',
          },
          {
            status: 'live',
            title: 'Gerekçe Mühürlü Kayıt',
            body: 'Her görev adımı konum + zaman damgasıyla kayda geçer; sonradan tartışmaya yer bırakmaz.',
          },
          {
            status: 'roadmap',
            title: 'Gün içi otomatik yeniden atama',
            body: 'Gecikme/arıza durumunda görevin otomatik başka araca önerilmesi planlanıyor.',
          },
        ],
      },
      {
        id: 'perdiem',
        label: 'Rota Bazlı Yevmiye',
        illustrationHint: 'Rota mesafe/süre → yevmiye hesabı',
        items: [
          {
            status: 'live',
            title: 'Rota Mesafe & Süre Kaydı',
            body: 'Tamamlanan her rotanın mesafesi ve süresi otomatik olarak sisteme işlenir — elle giriş gerekmez.',
          },
          {
            status: 'roadmap',
            title: 'Otomatik Şoför Yevmiye Hesabı',
            body:
              'Kayıtlı rota verisinden şoför yevmiyesinin otomatik hesaplanması ve aylık rapor üretilmesi geliştirme aşamasında.',
            note: 'Bugün: rota verisi hazır. Yarın: hesap otomatik, puantaj kağıdı yok.',
          },
        ],
      },
      {
        id: 'fleet',
        label: 'Filo, Araç & Sürücü',
        illustrationHint: 'Filo kartları + IoT kutu',
        items: [
          {
            status: 'live',
            title: 'Filo & Görev Yönetimi',
            body: 'Atama–kabul–tamamlama akışı, araç ve sürücü kartları tek panelde.',
          },
          {
            status: 'live',
            title: 'Sürücü Mobil Uygulaması',
            body: 'iOS + Android’de çalışır; push bildirimli görev akışı ve canlı rota.',
          },
          {
            status: 'live',
            title: 'Entegre Donanım (IoT)',
            body:
              'Kendi ESP32 tabanlı araç kutumuz — GPS + ivmeölçer telemetrisi, TLS-MQTT ile canlı veri akışı. Sadece yazılım değil, donanım-yazılım bütünlüğü.',
          },
          {
            status: 'roadmap',
            title: 'Sürücü Güvenlik Skoru',
            body: 'İvmeölçer verisiyle sert fren/savrulma analizi — sürücü güvenliğini veriye dayalı yönetin.',
          },
        ],
      },
      {
        id: 'reports',
        label: 'Operasyon Raporları',
        illustrationHint: 'Görev · tartım · rota özet panoları',
        items: [
          {
            status: 'live',
            title: 'Operasyon Panoları',
            body: 'Görev, tartım ve rota verilerinin özet grafiklerle tek ekranda görünümü.',
          },
          {
            status: 'roadmap',
            title: 'Dışa Aktarılabilir Aylık Rapor',
            body: 'Görev, tartım ve yevmiye verilerinin tek dosyada dışa aktarımı planlanıyor.',
          },
        ],
      },
    ],
  },
  demoCta: {
    title: 'Sahanızı birlikte canlıda gösterelim.',
    body:
      'Mevcut operasyonunuzu anlatın, Cebi’yi sizin filonuzla birlikte canlı demo üzerinden gösterelim — kurulum ve ilk adımları birlikte planlarız.',
    button: 'Demo Talebi Gönder',
    email: 'info@tulipfleet.com',
    mailtoSubject: 'Cebi demo talebi',
    orCall: 'veya doğrudan yazın:',
  },
  footer: {
    tagline: 'Saha operasyonu için tek ekran — geofence, dispatcher ve filo yönetimi bir arada.',
    product: 'Ürün',
    features: 'Özellikler',
    contact: 'İletişim',
    copyright: '© 2026 Cebi — TulipFleet Customer Edition',
    rights: 'Tüm hakları saklıdır.',
  },
};

export default site;
