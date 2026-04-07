"use client";

import { motion } from "framer-motion";
import { Code2, Server, Wrench, Smartphone } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code2,
    skills: ["JavaScript", "TypeScript", "React.js", "Next.js", "HTML5", "CSS3", "SCSS", "Tailwind CSS", "Bootstrap", "Material UI", "ShadCN/UI"],
  },
  {
    title: "Mobile & Architecture",
    icon: Smartphone,
    skills: ["React Native", "Redux", "Zustand", "TanStack Query", "Formik", "Axios", "NTPTimeModule", "Framer Motion"],
  },
  {
    title: "Backend & Networking",
    icon: Server,
    skills: ["Node.js", "Express.js", "MongoDB", "GraphQL", "REST APIs", "WebSocket", "Socket.IO"],
  },
  {
    title: "Tools & Ecosystem",
    icon: Wrench,
    skills: ["Figma", "Adobe XD", "Miro", "Android Studio", "Xcode", "Jest", "Sentry", "CleverTap", "Google Play", "Cursor", "Claude", "Git"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export function SkillsSet() {
  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Arsenal</h2>
          <p className="text-brand-muted max-w-2xl mx-auto">
            A comprehensive overview of the technologies, frameworks, and tools I use to architect and build scalable products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="glass-panel p-6 group hover:bg-brand/5 hover:border-brand/30 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-background/50 rounded-lg text-brand group-hover:bg-brand/20 transition-colors">
                  <category.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2 content-start flex-1">
                {category.skills.map((skill, skillIdx) => (
                  <motion.span
                    key={skillIdx}
                    variants={itemVariants}
                    className="px-2.5 py-1 text-xs md:text-sm font-medium bg-white/5 border border-white/10 rounded-md text-brand-text hover:bg-brand/20 hover:border-brand/40 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
