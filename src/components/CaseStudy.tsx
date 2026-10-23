"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";

const rcaStats = [
  { value: "1,800", label: "crash events" },
  { value: "1,596", label: "users affected" },
  { value: "0", label: "since the fix" },
];

const pillars = [
  {
    title: "Stability",
    points: [
      "Made startup crashes visible to crash reporting; the largest crash bucket had been going unreported.",
      "Fixed session and navigation races in chat and audio calls, each covered by a regression test.",
      "Reclassified network failures that were logged as fatal crashes, so dashboards show real defects.",
    ],
  },
  {
    title: "Release engineering",
    points: [
      "Unblocked R8 code shrinking on a reflection-heavy app, backed by a QA sign-off checklist.",
      "Moved to App Bundles with split debug info: 25–45 MB smaller downloads per device.",
      "Shipped OTA code push end to end, then caught it silently failing in production.",
    ],
  },
  {
    title: "Security & privacy",
    points: [
      "Audited the app's secrets and moved configuration out of the bundle into CI injection.",
      "Built a log redactor that strips PII and credentials before logs reach disk or Sentry.",
      "Enforced that guest accounts can never start a paid chat.",
    ],
  },
  {
    title: "Architecture",
    points: [
      "Design system for a live app: tokens → theme → 35 shared components, with 62 golden tests and a CI migration gate.",
      "Structured logging with redaction, session ids and three sinks: on-disk log ring, Sentry and breadcrumbs.",
      "~100 test files across sockets, session state machines, payments and deep links.",
    ],
  },
];

const features = [
  "Pre-signup free chat funnel",
  "End-of-chat upsell & recharge",
  "Unified paid + free chat",
  "Audio calls",
  "AI astrologer support",
  "Server-driven app updates",
  "Referral & attribution",
];

export function CaseStudy() {
  return (
    <section id="case-study" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="// 03 · case study"
          title={<>Horocosmo: hardening a <span className="text-gradient">live marketplace</span></>}
          description="Astro Arun Pandit's consumer app: live chat and audio consultations with astrologers, a wallet and payments, and e-commerce. I audited the whole app, turned the findings into a ranked roadmap, and owned store releases through the 2.2.x line."
        />

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-4">
          {/* The incident */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="glass-panel p-6 md:p-8 flex flex-col bg-gradient-to-br from-brand/15 to-transparent border-brand/30"
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-warn mb-4">incident · launch crash</p>
            <h3 className="text-2xl font-bold leading-snug mb-4">
              The crash that only happened on upgrade
            </h3>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                The app was dying 1.6 seconds after launch, before its first frame. Every affected user had exactly one
                session: they opened the app once and never came back.
              </p>
              <p>
                It never reproduced on a clean install, only on the real upgrade path, which is why it survived two
                releases of QA. I traced it to a background audio service the app bound to but had never declared,
                fixed it, and wrote up the root cause.
              </p>
            </div>
            <div className="h-8 shrink-0" />
            <dl className="grid grid-cols-3 gap-4 mt-auto pt-6 border-t border-white/10">
              {rcaStats.map((stat) => (
                <div key={stat.label}>
                  <dd className="text-2xl md:text-3xl font-bold tracking-tight">{stat.value}</dd>
                  <dt className="font-mono text-[11px] text-brand-muted mt-1">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* What else changed */}
          <div className="grid sm:grid-cols-2 gap-4">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: 0.08 * (index + 1) }}
                className="glass-panel p-6 hover:border-white/20 transition-colors"
              >
                <h3 className="font-semibold text-lg mb-3">{pillar.title}</h3>
                <ul className="space-y-2.5 text-sm text-foreground/75 leading-relaxed">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="font-mono text-signal shrink-0" aria-hidden="true">+</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-brand-muted mr-2">features shipped:</span>
          {features.map((feature) => (
            <span key={feature} className="px-3 py-1.5 text-sm bg-white/[0.04] border border-white/10 rounded-full text-brand-text">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
