"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink, FolderGit2 } from "lucide-react";

const projects = [
  {
    name: "JS Visualiser & Revision",
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
    status: "Open source",
    summary:
      "Feature Dependency Management System: a backend for tracking product features and the dependencies between them.",
    highlights: [
      "REST API to create, update, disable and delete features, grouped by area and class.",
      "Stores dependency links between features and serves them as a graph for visualisation.",
      "JWT-protected routes with bcrypt-hashed credentials, run under PM2.",
    ],
    tech: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT"],
    links: [{ label: "Code", href: "https://github.com/19rahulyadav38/feature-dependency-backend", icon: Code2 }],
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-16 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="p-3 bg-brand/10 rounded-xl text-brand">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-6 md:p-8 hover:border-brand/50 transition-colors duration-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-xl text-foreground">{project.name}</h3>
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-brand/15 text-brand-text border border-brand/30">
                    {project.status}
                  </span>
                </div>
                <div className="flex gap-3">
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

              <p className="text-brand-muted mb-4 leading-relaxed">{project.summary}</p>

              <ul className="text-foreground/80 leading-relaxed text-sm space-y-2 list-disc ml-4 marker:text-brand/70 mb-5">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-md text-brand-text"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
