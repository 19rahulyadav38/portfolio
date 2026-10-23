"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

const projects = [
  {
    name: "JS Visualiser & Revision",
    slug: "js-visualiser",
    status: "Live",
    summary:
      "Step through how the JavaScript engine runs code, and revise frontend interview concepts on a spaced-repetition schedule.",
    highlights: [
      "Visualiser shows the call stack, scopes and heap, Web APIs, task and microtask queues and the event loop, one step at a time.",
      "400+ revision cards across 12 topics, with separate beginner and senior decks picked by experience level.",
      "\"Predict the output\" quiz graded line by line against real Node output.",
      "40 hand-written traces, each checked against real Node output; progress syncs with Google sign-in.",
    ],
    tech: ["Next.js 16", "React 19", "TypeScript"],
    links: [{ label: "Live site", href: "https://js-visualizer-two.vercel.app", icon: ExternalLink }],
  },
  {
    name: "CrushRound",
    slug: "crushround",
    status: "Android beta",
    summary:
      "A dating app where two people play a short game before chat unlocks, then see how compatible their answers were.",
    highlights: [
      "Built the React Native app, the API and the website on my own, from design to a release build in closed beta.",
      "Challenge, play and match flows with push notifications, Google sign-in and Sentry crash reporting.",
      "Express API validated with Zod, with the OpenAPI spec generated from the same schemas and checked in CI.",
      "Signed Cloudinary uploads for profile photos and in-app account deletion that cleans up every stored record.",
    ],
    tech: ["React Native", "TypeScript", "TanStack Query", "Firebase", "Node.js", "Express", "MongoDB", "Zod", "Next.js"],
    links: [{ label: "Website", href: "https://crushround-omega.vercel.app", icon: ExternalLink }],
  },
  {
    name: "FDMS",
    slug: "fdms",
    status: "Open source",
    summary:
      "Feature Dependency Management System: add, update and remove a product's features and see how they depend on each other as a graph.",
    highlights: [
      "React front end with an interactive D3.js dependency graph of every feature in a project.",
      "Node and Express REST API to create, update, disable and delete features and the links between them.",
      "JWT-protected routes with bcrypt-hashed credentials, run under PM2.",
    ],
    tech: ["React", "D3.js", "Node.js", "Express", "MongoDB", "JWT"],
    links: [{ label: "Code", href: "https://github.com/19rahulyadav38/feature-dependency-backend", icon: Code2 }],
  },
  {
    name: "react-time-slots-manager",
    slug: "react-time-slots-manager",
    status: "npm package",
    summary: "A React package that generates time slots at any interval you choose.",
    highlights: [
      "Returns slots as readable times or Unix timestamps.",
      "Optionally groups slots under each weekday, ready for booking UIs.",
      "Published on npm, with a CodeSandbox demo.",
    ],
    tech: ["React", "Tailwind CSS", "ShadCN/UI"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/react-time-slots-manager", icon: ExternalLink },
      { label: "Code", href: "https://github.com/19rahulyadav38/react-time-slots-manager", icon: Code2 },
    ],
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="// 06 · side projects"
          title="Built after hours"
          description="Things I designed and built on my own time."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={cn(
                "glass-panel overflow-hidden flex flex-col hover:border-brand/40 transition-colors",
                (index === 0 || (index === projects.length - 1 && projects.length % 2 === 0)) && "md:col-span-2"
              )}
            >
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/[0.02]">
                <span className="w-2.5 h-2.5 rounded-full bg-danger/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-warn/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-signal/70" />
                <span className="ml-3 font-mono text-xs text-brand-muted truncate">~/projects/{project.slug}</span>
                <span className="ml-auto shrink-0 px-2 py-0.5 font-mono text-[11px] rounded-md bg-brand/15 text-brand-light border border-brand/30">
                  {project.status}
                </span>
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <h3 className="font-bold text-2xl">{project.name}</h3>
                  <div className="flex gap-4">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-brand-muted hover:text-white transition-colors"
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                <p className="text-brand-muted mb-5 leading-relaxed">{project.summary}</p>

                <ul className={cn("text-foreground/80 leading-relaxed text-sm gap-y-2.5 gap-x-8 mb-6 grid", index === 0 && "md:grid-cols-2")}>
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="font-mono text-signal shrink-0" aria-hidden="true">+</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <ul className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech) => (
                    <li key={tech} className="px-2.5 py-1 font-mono text-xs bg-white/[0.04] border border-white/10 rounded-md text-brand-text">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
