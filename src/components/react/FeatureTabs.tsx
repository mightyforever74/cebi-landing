import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import type { FeatureTab, SiteContent, TelemetryLine } from '../../content/types';

interface Labels {
  live: string;
  roadmap: string;
  roadmapNote: string;
  tabsAria: string;
}

interface Props {
  tabs: FeatureTab[];
  labels: Labels;
  sectionTitle: string;
  sectionSubtitle: string;
  radarAria: string;
  panel: SiteContent['features']['panel'];
  telemetry: SiteContent['features']['telemetry'];
}

function StatusBadge({ status, labels }: { status: 'live' | 'roadmap'; labels: Labels }) {
  if (status === 'live') {
    return <span className="badge-live">[{labels.live}]</span>;
  }
  return <span className="badge-roadmap">[{labels.roadmap}]</span>;
}

function TelemetryStrip({ lines }: { lines: TelemetryLine[] }) {
  return (
    <ul className="space-y-1.5 font-mono text-[11px] leading-relaxed sm:text-xs">
      {lines.map((line) => (
        <li
          key={line.label}
          className={`flex items-start gap-2 ${line.tone === 'live' ? 'text-offwhite' : 'text-navy-fog/70'}`}
        >
          <span
            className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
              line.tone === 'live' ? 'bg-emerald shadow-[0_0_6px_var(--color-emerald)]' : 'bg-navy-fog/50'
            }`}
            aria-hidden="true"
          />
          <span>{line.label}</span>
        </li>
      ))}
    </ul>
  );
}

/** Concentric geofence radar — replaces the source repo's Netherlands ZE-Zone map. */
function GeofenceRadar({ ariaLabel, lines }: { ariaLabel: string; lines: TelemetryLine[] }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-navy-line bg-navy-elevated">
      <div className="relative flex min-h-[180px] flex-1 items-center justify-center sm:min-h-[220px]" role="img" aria-label={ariaLabel}>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-navy-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-navy-line) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />
        <svg viewBox="0 0 100 100" className="relative h-[70%] w-[70%]" aria-hidden="true">
          <circle cx="50" cy="50" r="40" fill="none" stroke="color-mix(in srgb, var(--color-navy-fog) 25%, transparent)" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="26" fill="none" stroke="color-mix(in srgb, var(--color-navy-fog) 35%, transparent)" strokeWidth="0.6" />
          <circle className="map-radar-ring" cx="50" cy="50" r="14" fill="var(--color-emerald-dim)" stroke="var(--color-emerald)" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="2.2" fill="var(--color-emerald)" />
        </svg>
        <style>{`
          .map-radar-ring { transform-origin: center; transform-box: fill-box; animation: mapRadar 2.4s ease-out infinite; }
          @keyframes mapRadar { 0%, 100% { opacity: 0.85; } 50% { opacity: 0.35; } }
          @media (prefers-reduced-motion: reduce) { .map-radar-ring { animation: none; opacity: 0.7; } }
        `}</style>
      </div>
      <div className="shrink-0 border-t border-navy-line bg-navy/50 px-3 py-2.5">
        <TelemetryStrip lines={lines} />
      </div>
    </div>
  );
}

function TabIllustration({
  hint,
  activeId,
  panel,
  radarAria,
  panelKey,
  telemetryLines,
}: {
  hint: string;
  activeId: FeatureTab['id'];
  panel: SiteContent['features']['panel'];
  radarAria: string;
  panelKey: number;
  telemetryLines: TelemetryLine[];
}) {
  return (
    <div key={panelKey} className="glass fade-in-up relative flex min-h-[420px] flex-col overflow-hidden rounded-2xl p-5 lg:min-h-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--color-accent-dim),transparent_50%)]" />
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="mb-4 flex shrink-0 items-center justify-between">
          <p className="font-display text-sm font-semibold text-offwhite">{hint}</p>
          <span className="radar-dot" aria-hidden="true" />
        </div>

        {activeId === 'geofence' && (
          <div className="flex min-h-0 flex-1 flex-col gap-3">
            <div className="shrink-0 rounded-xl border border-emerald/30 bg-emerald/10 p-3">
              <p className="text-xs text-navy-fog">{panel.geofenceStatus}</p>
              <p className="font-display text-emerald">{panel.geofenceLine}</p>
            </div>
            <div className="metric-card shrink-0 rounded-xl p-3">
              <p className="text-xs text-navy-fog">{panel.weighbridge}</p>
              <p className="font-display text-sm">{panel.weighbridgeLine}</p>
            </div>
            <GeofenceRadar ariaLabel={radarAria} lines={telemetryLines} />
          </div>
        )}

        {activeId === 'dispatch' && (
          <div className="flex min-h-0 flex-1 flex-col gap-3">
            <div className="space-y-3">
              {panel.taskRows.map((row, i) => (
                <div key={row} className={`rounded-xl border border-navy-line bg-navy-ink/30 p-3 transition ${i === 0 ? 'border-accent/40 bg-accent/10' : ''}`}>
                  <p className="font-display text-sm">{row}</p>
                  <p className="mt-1 text-xs text-navy-fog">{panel.advisorySealed}</p>
                </div>
              ))}
            </div>
            <div className="mt-auto rounded-xl border border-navy-line bg-navy-elevated/80 px-3 py-2.5">
              <TelemetryStrip lines={telemetryLines} />
            </div>
          </div>
        )}

        {activeId === 'perdiem' && (
          <div className="flex min-h-0 flex-1 flex-col gap-3">
            <div className="rounded-xl border border-navy-line bg-navy-ink/30 p-4">
              <p className="text-xs text-navy-fog">{panel.perDiemRoute}</p>
              <p className="font-display text-sm">{panel.perDiemLine}</p>
            </div>
            <div className="metric-card rounded-xl p-3">
              <p className="text-xs text-navy-fog">Yevmiye</p>
              <p className="font-display text-2xl font-bold">
                <span className="metric-amount">{panel.perDiemAmount}</span>
              </p>
            </div>
            <div className="mt-auto rounded-xl border border-navy-line bg-navy-elevated/80 px-3 py-2.5">
              <TelemetryStrip lines={telemetryLines} />
            </div>
          </div>
        )}

        {activeId === 'fleet' && (
          <div className="flex min-h-0 flex-1 flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-navy-line bg-navy-ink/30 p-3">
                <p className="text-xs text-navy-fog">{panel.vehicle}</p>
                <p className="font-display text-sm">34-CEBI-01</p>
              </div>
              <div className="rounded-xl border border-navy-line bg-navy-ink/30 p-3">
                <p className="text-xs text-navy-fog">{panel.driver}</p>
                <p className="font-display text-sm">{panel.driverStatus}</p>
              </div>
            </div>
            <div className="metric-card rounded-xl p-3">
              <p className="text-xs text-navy-fog">{panel.iotBox}</p>
              <p className="font-display text-sm text-accent-soft">GPS + ivmeölçer · TLS-MQTT</p>
            </div>
            <div className="mt-auto rounded-xl border border-navy-line bg-navy-elevated/80 px-3 py-2.5">
              <TelemetryStrip lines={telemetryLines} />
            </div>
          </div>
        )}

        {activeId === 'reports' && (
          <div className="flex min-h-0 flex-1 flex-col gap-3">
            <div className="flex h-28 items-end gap-2 rounded-xl border border-navy-line bg-navy-elevated p-3">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-accent/40 to-accent" style={{ height: `${h}%` }} />
              ))}
            </div>
            <p className="text-xs text-navy-fog">{panel.reportsSummary}</p>
            <div className="mt-auto rounded-xl border border-navy-line bg-navy-elevated/80 px-3 py-2.5">
              <TelemetryStrip lines={telemetryLines} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FeatureTabs({ tabs, labels, sectionTitle, sectionSubtitle, radarAria, panel, telemetry }: Props) {
  const [active, setActive] = useState<FeatureTab['id']>(tabs[0]?.id ?? 'geofence');
  const [panelKey, setPanelKey] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tablistId = useId();
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  const telemetryLines = telemetry[active as keyof SiteContent['features']['telemetry']] ?? telemetry.geofence;

  useEffect(() => {
    setPanelKey((k) => k + 1);
  }, [active]);

  function selectIndex(i: number) {
    const tab = tabs[i];
    if (!tab) return;
    setActive(tab.id);
    tabRefs.current[i]?.focus();
  }

  function onTabKey(e: KeyboardEvent, index: number) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      selectIndex((index + 1) % tabs.length);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      selectIndex((index - 1 + tabs.length) % tabs.length);
    }
    if (e.key === 'Home') {
      e.preventDefault();
      selectIndex(0);
    }
    if (e.key === 'End') {
      e.preventDefault();
      selectIndex(tabs.length - 1);
    }
  }

  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold tracking-tight text-offwhite sm:text-4xl lg:text-5xl">{sectionTitle}</h2>
        <p className="mt-6 text-lg font-medium leading-relaxed text-navy-fog lg:text-xl">{sectionSubtitle}</p>
      </div>

      <div className="tab-scroll mt-10 pe-16 sm:pe-20" style={{ scrollPaddingInlineEnd: '5rem' }} role="tablist" aria-label={labels.tabsAria} id={tablistId}>
        {tabs.map((tab, index) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => onTabKey(e, index)}
              className="tab-btn"
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {current && (
        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-stretch" role="tabpanel">
          <div className="space-y-5">
            {current.items.map((item) => (
              <article key={item.title} className="glass-card rounded-2xl p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <StatusBadge status={item.status} labels={labels} />
                  <h3 className="font-display text-base font-semibold text-offwhite sm:text-lg">{item.title}</h3>
                </div>
                <p className="text-sm leading-snug text-navy-fog sm:text-base">{item.body}</p>
                {item.note ? <p className="mt-1.5 text-xs italic leading-snug text-navy-fog/80 sm:text-sm">{item.note}</p> : null}
              </article>
            ))}
            <p className="pt-2 text-xs text-navy-fog">{labels.roadmapNote}</p>
          </div>

          <TabIllustration hint={current.illustrationHint} activeId={current.id} panel={panel} radarAria={radarAria} panelKey={panelKey} telemetryLines={telemetryLines} />
        </div>
      )}
    </section>
  );
}
