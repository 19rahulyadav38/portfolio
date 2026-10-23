"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

// Counts up from 0 when scrolled into view. The server renders the final value, and the
// animation writes straight to the DOM so React doesn't re-render on every frame.
function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const armed = useRef(false);
  const format = (v: number) => `${prefix}${Math.round(v).toLocaleString("en-US")}${suffix}`;

  // Start from 0 only if the number is still below the fold, so nothing visible jumps
  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion || el.getBoundingClientRect().top <= window.innerHeight) return;
    armed.current = true;
    el.textContent = format(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  useEffect(() => {
    if (!inView || !armed.current) return;
    armed.current = false;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to]);

  return <span ref={ref}>{format(to)}</span>;
}

function Panel({
  label,
  source,
  className,
  delay = 0,
  children,
}: {
  label: string;
  source: string;
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.5 }}
      className={cn("glass-panel relative overflow-hidden p-4 sm:p-6 flex flex-col hover:border-white/20 transition-colors", className)}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mb-5 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">
        <span className="text-brand-muted">{label}</span>
        <span className="text-brand-muted/60 truncate">{source}</span>
      </div>
      {children}
    </motion.div>
  );
}

function StatPanel({ label, source, value, caption, delay }: { label: string; source: string; value: React.ReactNode; caption: string; delay: number }) {
  return (
    <Panel label={label} source={source} delay={delay}>
      <p className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-auto">{value}</p>
      <p className="text-sm text-brand-muted mt-2">{caption}</p>
    </Panel>
  );
}

// Fatal crash events per release of the astrologer app (Crashlytics, Android, Jun–Sep 2026)
const crashReleases = [
  { version: "1.0.24", events: 2754 },
  { version: "1.0.25", events: 1634 },
  { version: "1.0.26", events: 231 },
  { version: "1.0.27", events: 288 },
  { version: "1.0.28", events: 30 },
];

const crashTone = (events: number) =>
  events > 1000
    ? { text: "text-danger", bar: "from-danger/80 to-danger/30" }
    : events > 100
      ? { text: "text-warn", bar: "from-warn/80 to-warn/30" }
      : { text: "text-signal", bar: "from-signal to-signal/50" };

const RING_RADIUS = 52;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

// Google Play flags apps whose user-perceived ANR rate exceeds 0.47%
const ANR_SCALE_MAX = 0.6;
const ANR_RATE = 0.2;
const PLAY_ANR_THRESHOLD = 0.47;

export function Impact() {
  return (
    <section id="impact" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="// 01 · production telemetry"
          title="Impact you can measure"
          description="Numbers from apps I've built and run in production, with where they came from."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {/* Fatal crashes: before vs after */}
          <Panel label="fatal_crashes / release" source="Astro Arun Pandit" className="col-span-2 md:row-span-2">
            <div className="flex items-baseline gap-3 mb-1">
              <p className="text-5xl md:text-6xl font-bold tracking-tight text-signal">−99%</p>
            </div>
            <p className="text-sm text-brand-muted max-w-sm">
              Astrologer app, release by release, after fixing native audio and media crashes and reclassifying network errors that were reported as fatal.
            </p>

            <div className="mt-8 flex-1 min-h-[180px] flex items-end gap-2 sm:gap-4 border-b border-white/10">
              {crashReleases.map((release, index) => (
                <div key={release.version} className="flex-1 h-full flex flex-col justify-end items-center gap-2">
                  <span className={cn("font-mono text-[11px] sm:text-sm font-semibold", crashTone(release.events).text)}>
                    <CountUp to={release.events} />
                  </span>
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.15 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: `${(release.events / crashReleases[0].events) * 100}%` }}
                    className={cn("w-full max-w-[72px] origin-bottom rounded-t-md bg-gradient-to-t min-h-[6px]", crashTone(release.events).bar)}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2 sm:gap-4 mt-2 font-mono text-[10px] sm:text-[11px] text-brand-muted">
              {crashReleases.map((release) => (
                <span key={release.version} className="flex-1 text-center">{release.version}</span>
              ))}
            </div>
          </Panel>

          {/* Crash-free gauge */}
          <Panel label="crash_free_sessions" source="Zupee" delay={0.1}>
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto my-auto">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r={RING_RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
                <motion.circle
                  cx="60"
                  cy="60"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="var(--signal)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={RING_LENGTH}
                  initial={{ strokeDashoffset: RING_LENGTH }}
                  whileInView={{ strokeDashoffset: RING_LENGTH * (1 - 0.999) }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xl sm:text-2xl font-bold">99.90%</span>
            </div>
          </Panel>

          <StatPanel label="revenue" source="Zupee" delay={0.15} value={<CountUp to={120} prefix="+" suffix="%" />} caption="Games scaled into one iOS super app" />
          <StatPanel label="total_gameplay" source="Zupee" delay={0.2} value={<CountUp to={40} prefix="+" suffix="%" />} caption="Unity embedded in React Native" />
          <StatPanel label="user_retention" source="Zupee" delay={0.25} value={<CountUp to={28} prefix="+" suffix="%" />} caption="Owned features end to end" />

          {/* ANR rate against the Play threshold */}
          <Panel label="anr_rate" source="Zupee" className="col-span-2" delay={0.1}>
            <p className="text-4xl md:text-5xl font-bold tracking-tight">&lt; 0.2%</p>
            <p className="text-sm text-brand-muted mt-2 mb-6">Well under Google Play&apos;s bad-behaviour threshold.</p>
            <div className="relative h-3 rounded-full bg-white/[0.06] mt-auto">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(ANR_RATE / ANR_SCALE_MAX) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-signal/60 to-signal"
              />
              <div
                className="absolute -top-1.5 -bottom-1.5 w-px bg-danger"
                style={{ left: `${(PLAY_ANR_THRESHOLD / ANR_SCALE_MAX) * 100}%` }}
              />
            </div>
            <div className="relative h-5 mt-2 font-mono text-[11px] text-brand-muted">
              <span className="absolute left-0">0%</span>
              <span className="absolute -translate-x-1/2 text-danger whitespace-nowrap" style={{ left: `${(PLAY_ANR_THRESHOLD / ANR_SCALE_MAX) * 100}%` }}>
                Play limit 0.47%
              </span>
            </div>
          </Panel>

          <Panel label="downloads" source="Zupee games" className="col-span-2" delay={0.15}>
            <p className="text-4xl md:text-5xl font-bold tracking-tight mt-auto">
              1M+
            </p>
            <p className="text-sm text-brand-muted mt-2">
              Real-time multiplayer games and PWAs, built with Socket.IO, Zustand and TanStack Query.
            </p>
          </Panel>
        </div>
      </div>
    </section>
  );
}
