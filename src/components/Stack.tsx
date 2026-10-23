"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";

// Top to bottom, like an architecture diagram: the foundation is widest
const layers = [
  {
    name: "Observability",
    note: "Crash, ANR and session health in production",
    skills: ["Sentry", "Crashlytics", "New Relic", "Bugsnag", "CleverTap", "Structured logging"],
  },
  {
    name: "Web",
    note: "Apps, dashboards and PWAs people enjoy using",
    skills: ["React", "Next.js", "TypeScript", "Angular", "Redux Toolkit", "Redux-Saga", "Tailwind CSS", "SCSS", "Bootstrap", "Material UI", "ShadCN/UI", "D3.js", "PWA"],
  },
  {
    name: "Mobile",
    note: "Cross-platform apps for Android and iOS",
    skills: ["React Native", "New Architecture", "Zustand", "Redux Toolkit", "TanStack Query", "OTA updates"],
  },
  {
    name: "Native bridge",
    note: "Where JavaScript meets the platform",
    skills: ["Swift", "Objective-C", "Native modules", "Unity integration", "Xcode", "Android Studio"],
  },
  {
    name: "Real-time & backend",
    note: "Sockets, sessions and the APIs behind them",
    skills: ["WebSocket", "Socket.IO", "Node.js", "Express", "Ruby on Rails", "MongoDB", "GraphQL", "REST APIs"],
  },
  {
    name: "Delivery",
    note: "Shipping safely, and often",
    skills: ["CI/CD", "Jest", "Git", "Figma", "Cursor", "Claude"],
  },
];

export function Stack() {
  return (
    <section id="stack" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="// 05 · architecture"
          title="The stack, layer by layer"
          description="Web and mobile, from native modules up to the dashboards that tell me when something breaks."
        />

        <ol className="space-y-3">
          {layers.map((layer, index) => (
            <motion.li
              key={layer.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              style={{ "--inset": layers.length - 1 - index } as React.CSSProperties}
              className="group grid md:grid-cols-[260px_1fr] gap-4 md:gap-8 items-center rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:mx-[calc(var(--inset)*1.5%)] hover:bg-brand/[0.07] hover:border-brand/40 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-xs text-brand-light mt-1">{String(layers.length - 1 - index).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-semibold text-lg leading-tight">{layer.name}</h3>
                  <p className="text-sm text-brand-muted mt-1">{layer.note}</p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2">
                {layer.skills.map((skill) => (
                  <li
                    key={skill}
                    className="px-3 py-1.5 text-sm bg-white/[0.04] border border-white/10 rounded-lg text-brand-text group-hover:border-white/20 transition-colors"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
