"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

const experiences = [
  {
    role: "Lead Product Engineer",
    company: "Astro Arun Pandit",
    period: "May 2026 - Present",
    achievements: [
      "Architected per-session WebSocket infrastructure for real-time chat and voice consultations, with reconnection, session recovery, call resumption and message deduplication.",
      "Reduced astrologer app fatal crashes by ~99%, from 2,754 to 30 events per release, through native audio/media fixes, startup hardening and race-condition fixes.",
      "Eliminated a critical customer-app AudioService startup crash affecting 1,596 users, with zero occurrences in later releases.",
      "Built the free-chat → payment → consultation funnel: pre-signup chat, server-driven offers, guest recharge, coupons and end-to-end analytics.",
      "Led mobile architecture, performance and security work, hardening 600+ unsafe code paths; set up CI/CD, OTA updates, Sentry and Crashlytics.",
    ],
    logo: null,
  },
  {
    role: "Senior Software Engineer",
    company: "Zupee",
    period: "Nov 2024 - Mar 2026",
    achievements: [
      "Spearheaded 2 multiplatform React Native apps built from scratch, unlocking new revenue verticals.",
      "Scaled multiple games into a single iOS super app, boosting revenue by 120%.",
      "Integrated Unity with React Native through Swift and Objective-C native modules, increasing total gameplay by 40%.",
      "Improved platform reliability to a 99.90% crash-free rate and reduced ANRs below 0.2%, raising session success by ~15%.",
      "Owned features end to end from development to production, increasing user retention by 28%.",
      "Integrated AI/LLM models with intelligent fallback mechanisms to improve prediction accuracy.",
    ],
    logo: "/images/zupee_logo.png",
    apps: [
      { name: "Neo Astro", href: "https://play.google.com/store/apps/details?id=com.neoastro.android" },
      { name: "Tez Rummy", href: "https://play.google.com/store/apps/details?id=com.battles99.rummyandroid" },
    ],
  },
  {
    role: "Software Developer",
    company: "W3Villa Technologies",
    period: "Jan 2022 - Oct 2024",
    achievements: [
      "Built web apps for clients across insurance, fintech, agritech, proptech and care, with React, Next.js and Angular.",
      "Led the frontend teams on Nomadroof and Kivo Calendar, owning code review and delivery.",
      "Integrated React into Ruby on Rails apps and added WebSocket messaging; resolved UI performance issues.",
      "Managed client interactions and gathered project requirements through the project lifecycle.",
    ],
    logo: "/images/w3villa.jpeg",
  },
];

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="// 02 · release log"
          title="Experience"
          description="Every role so far, newest first."
        />

        <ol className="relative ml-2 md:ml-4 border-l border-white/10 space-y-10">
          {experiences.map((exp, index) => {
            const isCurrent = index === 0;
            return (
              <motion.li
                key={exp.company}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Commit dot */}
                <span className="absolute -left-[7px] top-8 flex w-3.5 h-3.5">
                  {isCurrent && <span className="absolute inset-0 rounded-full bg-signal opacity-60 animate-ping" />}
                  <span className={cn("relative w-3.5 h-3.5 rounded-full border-2 border-background", isCurrent ? "bg-signal" : "bg-brand-light")} />
                </span>

                <div className="glass-panel p-6 md:p-8 hover:border-brand/40 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.04] overflow-hidden flex items-center justify-center border border-white/10 relative shrink-0">
                        {exp.logo ? (
                          <Image src={exp.logo} alt={exp.company} fill sizes="48px" className="object-contain p-1" />
                        ) : (
                          <span className="text-sm font-bold text-brand-light" aria-hidden="true">
                            {exp.company.split(" ").map((word) => word[0]).join("")}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl leading-tight">{exp.role}</h3>
                        <p className="text-brand-light font-medium">{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      {isCurrent && (
                        <span className="rounded-md border border-signal/40 bg-signal/10 text-signal px-2 py-1">HEAD</span>
                      )}
                      <span className="rounded-md border border-white/10 bg-white/[0.04] text-brand-text px-2 py-1">
                        v{experiences.length - index}.0
                      </span>
                      <span className="text-brand-muted px-1">{exp.period}</span>
                    </div>
                  </div>
                  <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-foreground/80 leading-relaxed text-sm">
                    {exp.achievements.map((achievement) => (
                      <li key={achievement} className="flex gap-3">
                        <span className="font-mono text-signal shrink-0" aria-hidden="true">+</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                  {"apps" in exp && exp.apps && (
                    <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-white/10">
                      <span className="font-mono text-xs text-brand-muted mr-1">on Google Play:</span>
                      {exp.apps.map((app) => (
                        <a
                          key={app.href}
                          href={app.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border border-white/15 hover:bg-white/5 transition-colors"
                        >
                          {app.name}
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
