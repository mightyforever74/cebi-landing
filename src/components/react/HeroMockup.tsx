import { useEffect, useState } from 'react';
import type { JobRow, TickerScenario } from '../../content/types';
import { prefersReducedMotion } from '../../lib/motion';
import geofencePortScene from './geofence-port-scene.svg?raw';

interface Props {
  title: string;
  liveLabel: string;
  jobsLabel: string;
  disclaimer: string;
  jobs: [JobRow, JobRow];
  phonePushTitle: string;
  phonePushSub: string;
  scenarios: TickerScenario[];
}

function highlight(line: string, part?: string) {
  if (!part || !line.includes(part)) return <>{line}</>;
  const [before, after] = line.split(part);
  return (
    <>
      {before}
      <span className="metric-amount font-semibold">{part}</span>
      {after}
    </>
  );
}

/** Illustrative port/geofence/weighbridge scene — single static SVG, no map tiles/CDN. */
function LiveScenePlane({ disclaimer }: { disclaimer: string }) {
  return (
    <div className="hero-map-scene relative min-h-[200px] overflow-hidden rounded-xl border border-navy-line sm:min-h-[240px]">
      <div
        className="absolute inset-0 [&>svg]:h-full [&>svg]:w-full [&>svg]:object-contain"
        dangerouslySetInnerHTML={{ __html: geofencePortScene }}
        aria-hidden="true"
      />
      <p className="absolute bottom-2 left-2 z-10 flex items-center gap-2 text-[10px] text-navy-fog">
        <span className="radar-dot" aria-hidden="true" />
        {disclaimer}
      </p>
    </div>
  );
}

function PhoneMockup({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="w-[120px] rounded-[1.25rem] border border-navy-line bg-navy-deep/95 p-1.5 shadow-nav backdrop-blur-sm">
      <div className="mb-1 flex justify-center">
        <span className="h-1 w-9 rounded-full bg-white/15" />
      </div>
      <div className="rounded-[0.95rem] border border-white/10 bg-navy-elevated px-2 py-2.5">
        <div className="rounded-lg border border-white/10 bg-white/5 p-2">
          <p className="text-[9px] font-semibold leading-snug text-offwhite">{title}</p>
          <p className="mt-1 text-[8px] leading-snug text-emerald">{sub}</p>
        </div>
        <div className="mt-2 space-y-1 opacity-40" aria-hidden="true">
          <div className="h-1 rounded bg-white/15" />
          <div className="h-1 w-3/4 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export default function HeroMockup({
  title,
  liveLabel,
  jobsLabel,
  disclaimer,
  jobs,
  phonePushTitle,
  phonePushSub,
  scenarios,
}: Props) {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const scenario = scenarios[index] ?? scenarios[0];

  useEffect(() => {
    if (prefersReducedMotion() || scenarios.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % scenarios.length);
      setTick((t) => t + 1);
    }, 3500);
    return () => window.clearInterval(id);
  }, [scenarios.length]);

  if (!scenario) return null;

  const statusClass = scenario.statusTone === 'alert' ? 'status-alert' : 'status-ok';

  return (
    <div className="relative overflow-visible pb-6 lg:pb-28 lg:pr-20">
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_30%_40%,var(--color-accent-dim),transparent_55%),radial-gradient(ellipse_at_80%_70%,var(--color-emerald-dim),transparent_50%)] opacity-90 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative overflow-visible rounded-2xl border border-navy-line bg-navy-elevated/40 shadow-hero-window">
        <div className="flex items-center gap-2 overflow-hidden rounded-t-2xl border-b border-navy-line bg-navy-ink/40 px-4 py-2.5 backdrop-blur-sm">
          <span className="font-display text-xs text-navy-fog">{title}</span>
          <span className="badge-live ml-auto">{liveLabel}</span>
        </div>

        <div className="relative grid gap-3 overflow-visible p-4 sm:grid-cols-[1.4fr_1fr]">
          <div className="relative min-w-0">
            <LiveScenePlane disclaimer={disclaimer} />
          </div>

          <div className="relative z-10 flex flex-col gap-3" key={`${scenario.id}-${tick}`} data-ticker-scenario={scenario.id}>
            <div
              className={`ticker-enter rounded-xl border p-3 backdrop-blur-sm ${
                scenario.statusTone === 'alert' ? 'border-red-400/35 bg-red-500/10' : 'border-navy-line bg-navy-ink/30'
              }`}
            >
              <p className="text-[10px] uppercase tracking-wider text-navy-fog">{scenario.statusLabel}</p>
              <p className={`mt-1 font-display text-sm font-semibold ${statusClass}`}>
                {scenario.statusTone === 'alert' && (
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-red-400 align-middle" />
                )}
                {scenario.statusLine}
              </p>
            </div>

            <div className="ticker-enter metric-card rounded-xl p-3 backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-wider text-navy-fog">{scenario.metricLabel}</p>
              <p className="mt-1 font-display text-sm text-offwhite">
                {highlight(scenario.metricLine, scenario.metricHighlight)}
              </p>
            </div>

            <div className="rounded-xl border border-navy-line bg-navy-ink/30 p-3 backdrop-blur-sm" data-jobs-card>
              <p className="text-[10px] uppercase tracking-wider text-navy-fog">{jobsLabel}</p>
              <ul className="mt-2 space-y-2">
                {jobs.map((job) => (
                  <li key={job.id} className="flex items-start gap-2 text-xs">
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        job.tone === 'live' ? 'bg-emerald shadow-[0_0_6px_var(--color-emerald)]' : 'bg-navy-fog/60'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-display font-semibold text-offwhite">
                        {job.id} · {job.route}
                      </span>
                      <span className="text-navy-fog">{job.status}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute z-30 hidden lg:block" data-hero-phone style={{ right: '-3.5rem', bottom: '-8.75rem' }}>
          <div className="pointer-events-auto">
            <PhoneMockup title={phonePushTitle} sub={phonePushSub} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center lg:hidden">
        <PhoneMockup title={phonePushTitle} sub={phonePushSub} />
      </div>
    </div>
  );
}
