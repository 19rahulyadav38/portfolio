"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

type Platform = "Web" | "PWA" | "Mobile";

const work: {
  name: string;
  platform: Platform;
  summary: string;
  role: string;
  tech: string[];
  href?: string;
  org?: string;
  reach?: string;
}[] = [
  {
    name: "Neo Astro",
    platform: "Mobile",
    org: "Zupee",
    reach: "1M+ downloads",
    summary: "Talk to certified astrologers over chat, call and video, with kundli, horoscopes and tarot.",
    role: "Integrated multiple AI/LLM models with intelligent fallbacks to improve prediction accuracy",
    tech: ["React Native", "AI/LLM APIs"],
    href: "https://play.google.com/store/apps/details?id=com.neoastro.android",
  },
  {
    name: "Tez Rummy",
    platform: "Mobile",
    org: "Zupee",
    reach: "1M+ downloads",
    summary: "Skill-based online rummy with real players: Points, Pool and Deals formats.",
    role: "Moved the gameplay app to React Native's New Architecture to support 16 KB memory pages",
    tech: ["React Native", "New Architecture"],
    href: "https://play.google.com/store/apps/details?id=com.battles99.rummyandroid",
  },
  {
    name: "Zupee Ludo",
    platform: "PWA",
    summary: "Real-money multiplayer Ludo as a Progressive Web App, responsive across devices.",
    role: "Real-time gameplay over Socket.IO, state in Zustand, data with TanStack Query",
    tech: ["React", "TypeScript", "Zustand", "TanStack Query", "Socket.IO"],
  },
  {
    name: "Nomadroof",
    platform: "Web",
    summary: "Student accommodation across Latin America's best cities, starting in Lima, Peru.",
    role: "Led the frontend team and code reviews",
    tech: ["React", "TypeScript", "Redux Toolkit", "Bootstrap"],
  },
  {
    name: "Kivo Calendar",
    platform: "Web",
    summary: "Calendar management for the scheduling needs of individuals, teams and businesses.",
    role: "Led the frontend team and code reviews",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Node.js"],
  },
  {
    name: "Digicides",
    platform: "Web",
    summary: "SaaS platform for the agri industry: reach farmers with IVR, SMS and WhatsApp campaigns.",
    role: "Built campaign management; reviewed, merged and deployed to production",
    tech: ["React", "TypeScript", "Redux-Saga", "Bootstrap"],
  },
  {
    name: "Karamacare",
    platform: "Web",
    summary: "A marketplace where families find caregivers and caregivers find jobs.",
    role: "Brought React into Ruby on Rails, added WebSocket messaging, designed the dashboard",
    tech: ["React", "Ruby on Rails", "WebSocket", "SASS"],
  },
  {
    name: "Silo Members",
    platform: "Web",
    summary: "Vehicle insurance platform in the USA.",
    role: "Admin dashboard, state management with Context API, refactoring",
    tech: ["React", "Ruby on Rails", "Stripe", "Bootstrap"],
    href: "https://silomembers.com/",
  },
  {
    name: "MBOA Finance",
    platform: "Web",
    summary: "Money transfer: deposits, withdrawals and a full transaction history.",
    role: "Delivered the website as frontend lead",
    tech: ["React", "Node.js", "Bootstrap"],
    href: "https://mboa.finance/",
  },
  {
    name: "SuperOne",
    platform: "Web",
    summary: "Blockchain platform for NFTs and gaming.",
    role: "Redesigned the website and integrated its APIs",
    tech: ["Angular", "Node.js", "Bootstrap"],
    href: "https://super.one/",
  },
  {
    name: "We Want More",
    platform: "Mobile",
    summary: "Trainers and health experts give users diet and workout plans and track their progress.",
    role: "Built the app UI and real-time chat",
    tech: ["React Native", "Redux Toolkit", "Socket.IO"],
  },
];

const filters = ["All", "Web", "Mobile"] as const;
type Filter = (typeof filters)[number];

const matches = (filter: Filter, platform: Platform) =>
  filter === "All" || (filter === "Web" ? platform !== "Mobile" : platform === "Mobile");

export function ClientWork() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = work.filter((item) => matches(filter, item.platform));

  return (
    <section id="work" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="[&>div]:mb-0">
            <SectionHeading
              eyebrow="// 04 · shipped work"
              title="Apps and sites I've shipped"
              description="Mobile apps used by millions at Zupee, and web apps, dashboards and PWAs for clients."
            />
          </div>

          <div role="group" aria-label="Filter by platform" className="flex gap-1 p-1 rounded-full border border-white/10 bg-white/[0.03] self-start md:self-auto">
            {filters.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm transition-colors",
                  filter === option ? "bg-white text-black font-medium" : "text-brand-muted hover:text-white"
                )}
              >
                {option}
                <span className="ml-1.5 font-mono text-xs opacity-60">
                  {work.filter((item) => matches(option, item.platform)).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <motion.ul layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {shown.map((item) => (
              <motion.li
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="glass-panel p-6 flex flex-col hover:border-brand/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={cn(
                      "px-2 py-0.5 font-mono text-[11px] rounded-md border",
                      item.platform === "Mobile"
                        ? "text-signal border-signal/30 bg-signal/10"
                        : "text-brand-light border-brand/30 bg-brand/10"
                    )}
                  >
                    {item.platform}
                  </span>
                  {item.href && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${item.name}`}
                      className="text-brand-muted hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <h3 className="font-bold text-xl mb-1">{item.name}</h3>
                {(item.org || item.reach) && (
                  <p className="font-mono text-xs text-brand-muted mb-2">
                    {[item.org, item.reach].filter(Boolean).join(" · ")}
                  </p>
                )}
                <p className="text-sm text-brand-muted leading-relaxed mb-4">{item.summary}</p>
                <p className="text-sm text-foreground/80 leading-relaxed mb-5">
                  <span className="font-mono text-xs text-brand-light">role: </span>
                  {item.role}
                </p>
                <ul className="flex flex-wrap gap-1.5 mt-auto">
                  {item.tech.map((tech) => (
                    <li key={tech} className="px-2 py-0.5 font-mono text-[11px] bg-white/[0.04] border border-white/10 rounded text-brand-text">
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
