"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import Image from "next/image";

const experiences = [
  {
    role: "Senior Software Engineer",
    company: "Zupee",
    period: "Aug 2025 - Present",
    achievements: [
      "Spearheaded 2 multiplatform React Native apps from scratch, unlocking new revenue verticals.",
      "Scaled multiple games to a single iOS super app, boosting overall revenue by 120%.",
      "Integrated AI/LLM models with intelligent fallback mechanisms to improve prediction accuracy.",
      "Improved platform reliability to 99.90% crash-free rate and reduced ANRs below 0.2%.",
      "Decreased memory leaks via Xcode profiling and reduced app startup time via lazy loading."
    ],
    logo: "/images/zupee_logo.png",
  },
  {
    role: "Senior Software Engineer",
    company: "InnovationM",
    period: "Nov 2024 - Aug 2025",
    achievements: [
      "Contributed to the Zupee Ludo PWA, ensuring cross-device responsiveness and low latency.",
      "Built real-time gameplay features with Socket.io, Zustand, and TanStack Query.",
      "Integrated CleverTap, ads (Plotline, AdMob), and Sentry for monetisation and stability."
    ],
    logo: "/images/innovationm_logo.jpeg",
  },
  {
    role: "Software Developer",
    company: "W3Villa Technologies",
    period: "Jan 2022 - Oct 2024",
    achievements: [
      "Developed high-performance front-end features and components using React.js.",
      "Proficiently resolved UI performance issues to enhance overall user experience.",
      "Collaborated heavily with backend teams to integrate REST APIs and internal frameworks."
    ],
    logo: "/images/w3villa.jpeg",
  },
];

export function ExperienceTimeline() {
  return (
    <section id="experience" className="p-16 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="p-3 bg-brand/10 rounded-xl text-brand">
            <Briefcase className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
        </motion.div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-brand/20 before:to-transparent">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-brand/20 text-brand shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                <div className="w-3 h-3 bg-brand rounded-full group-hover:scale-150 transition-transform duration-300" />
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-panel p-6 hover:border-brand/50 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-background/50 overflow-hidden flex items-center justify-center border border-white/5 relative shrink-0">
                    <span className="text-xs text-brand-muted">Logo</span>
                    <Image src={exp.logo} alt={exp.company} fill className="object-contain p-1" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{exp.role}</h3>
                    <div className="text-brand font-medium text-sm">{exp.company}</div>
                  </div>
                </div>
                <div className="text-sm text-brand-muted mb-4 font-mono">{exp.period}</div>
                <ul className="text-foreground/80 leading-relaxed text-sm space-y-2 list-disc ml-4 marker:text-brand/70">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
