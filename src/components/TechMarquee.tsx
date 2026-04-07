"use client";

import { motion } from "framer-motion";

const technologies = [
  "React", "React Native", "Next.js", "TypeScript", 
  "Zustand", "TanStack Query", "Socket.io", "Tailwind CSS", 
  "Framer Motion", "Node.js", "Redux", "GraphQL", "Sentry", 
  "CleverTap", "Formik", "Axios", "REST APIs", "Webpack"
];

// Duplicate for infinite scrolling effect
const duplicatedTech = [...technologies, ...technologies];

export function TechMarquee() {
  return (
    <section className="py-20 border-y border-white/5 bg-black/20 overflow-hidden relative">
      {/* Gradient masks for smooth fade in/out at edges */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex w-fit animate-marquee">
        {duplicatedTech.map((tech, index) => (
          <div
            key={index}
            className="flex items-center justify-center shrink-0 px-8 py-4 mx-4 glass-panel hover:bg-brand/10 hover:border-brand/30 transition-colors cursor-default"
          >
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
