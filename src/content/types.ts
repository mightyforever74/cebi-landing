export type FeatureStatus = 'live' | 'roadmap';

export interface FeatureItem {
  status: FeatureStatus;
  title: string;
  body: string;
  /** Optional one-line italic micro-note under the body. */
  note?: string;
}

export interface FeatureTab {
  id: 'geofence' | 'dispatch' | 'perdiem' | 'fleet' | 'reports';
  label: string;
  illustrationHint: string;
  items: FeatureItem[];
}

export interface TelemetryLine {
  label: string;
  tone: 'live' | 'planned';
}

export interface JobRow {
  id: string;
  route: string;
  status: string;
  tone: 'live' | 'idle';
}

/** Rotating hero ticker card: one "status" readout + one "metric" readout. */
export interface TickerScenario {
  id: 'a' | 'b' | 'c';
  statusLabel: string;
  statusLine: string;
  statusTone: 'ok' | 'alert';
  metricLabel: string;
  metricLine: string;
  /** Substring of metricLine to highlight in accent color. */
  metricHighlight?: string;
}

export interface SiteContent {
  meta: {
    siteName: string;
    title: string;
    description: string;
  };
  nav: {
    features: string;
    menu: string;
    primaryAria: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaFeatures: string;
    mockupTitle: string;
    mockupLive: string;
    mockupJobs: string;
    mockupDisclaimer: string;
    jobs: [JobRow, JobRow];
    phonePushTitle: string;
    phonePushSub: string;
    scenarios: TickerScenario[];
  };
  excelStrip: {
    headline: string;
    points: [string, string, string];
    ariaLabel: string;
  };
  mobileBridge: {
    title: string;
    subtitle: string;
    body: string;
    liveBadge: string;
    cycleLabel: string;
    steps: [string, string, string, string, string];
    phoneTitle: string;
    phoneSub: string;
  };
  features: {
    sectionTitle: string;
    sectionSubtitle: string;
    roadmapNote: string;
    live: string;
    roadmap: string;
    tabsAria: string;
    radarAria: string;
    tabs: FeatureTab[];
    panel: {
      geofenceStatus: string;
      geofenceLine: string;
      weighbridge: string;
      weighbridgeLine: string;
      taskRows: [string, string, string];
      advisorySealed: string;
      perDiemRoute: string;
      perDiemLine: string;
      perDiemAmount: string;
      vehicle: string;
      driver: string;
      driverStatus: string;
      iotBox: string;
      reportsSummary: string;
    };
    telemetry: {
      geofence: TelemetryLine[];
      dispatch: TelemetryLine[];
      perdiem: TelemetryLine[];
      fleet: TelemetryLine[];
      reports: TelemetryLine[];
    };
  };
  footer: {
    tagline: string;
    product: string;
    features: string;
    email: string;
    copyright: string;
    rights: string;
  };
}
