"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const roles = [
  "Senior Software Engineer",
  "React Native Expert",
  "Performance Optimizer",
];

export function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 150;
    const delay = isDeleting && displayText === "" ? 200 : (!isDeleting && displayText === currentRole) ? 1000 : typingSpeed;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setIsDeleting(true);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        const nextText = isDeleting
          ? currentRole.substring(0, displayText.length - 1)
          : currentRole.substring(0, displayText.length + 1);
        setDisplayText(nextText);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-20 pb-12 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-brand/30 mb-8 shadow-2xl shadow-brand/20"
        >
          {/* Using object-cover to ensure the image fills the circle nicely */}
          <div className="w-full h-full bg-brand/10 flex items-center justify-center text-brand-muted">
            {/* Fallback until actual image is placed in public/images */}
            <span className="text-xs">Image</span>
          </div>
          <Image
            src="/images/photo.webp" // Make sure to match exact filename
            alt="Rahul Yadav"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center space-x-3 bg-brand/15 text-white px-5 py-2.5 rounded-full mb-6 font-semibold text-sm md:text-base border border-brand/50 shadow-[0_0_25px_rgba(102,16,242,0.4)] backdrop-blur-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="tracking-wide">Available for new opportunities</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          Architecting Scalable Apps for <span className="text-brand">Millions of Users.</span>
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl md:text-2xl text-brand-muted h-8 mb-10 flex items-center justify-center space-x-2"
        >
          <span>I am a</span>
          <span className="font-semibold text-foreground min-w-[250px] text-left">
            {displayText}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full bg-brand text-white font-medium hover:bg-brand-hover transition-colors shadow-lg shadow-brand/25"
          >
            Let&apos;s Talk
          </a>
          <a
            href="/resume.pdf"
            download
            className="px-8 py-3.5 rounded-full glass-panel hover:bg-white/5 transition-colors flex items-center gap-2 group"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            <span>Download Resume</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
