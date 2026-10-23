"use client";

import { ArrowRight, Download, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PhoneSession } from "@/components/PhoneSession";

const roles = [
  "Lead Software Engineer",
  "React Native Specialist",
  "Real-time Systems Builder",
  "Performance Optimizer",
];

const heroStats = [
  { value: "99.90%", label: "crash-free sessions" },
  { value: "−99%", label: "fatal crashes" },
  { value: "+120%", label: "revenue growth" },
];

export function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 90;
    const delay = isDeleting && displayText === "" ? 200 : (!isDeleting && displayText === currentRole) ? 1600 : typingSpeed;

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
    <section id="top" className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
      />
      <div aria-hidden="true" className="absolute -top-48 left-1/4 w-[640px] h-[640px] bg-brand/25 blur-[140px] rounded-full pointer-events-none" />
      <div aria-hidden="true" className="absolute -bottom-32 right-0 w-[420px] h-[420px] bg-signal/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-12 items-center">
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-brand/20 shrink-0">
              <Image
                src="/images/photo.webp"
                alt="Rahul Yadav"
                fill
                sizes="64px"
                className="object-contain scale-110 bg-brand/10"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div>
              <p className="font-semibold text-lg leading-tight">Rahul Yadav</p>
              <p className="flex items-center gap-1.5 text-sm text-brand-muted font-mono mt-1">
                <MapPin className="w-3.5 h-3.5" /> Noida, IN · 4.8+ yrs
              </p>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[4.25rem] font-bold tracking-tight leading-[1.05] mb-6">
            Real-time mobile apps that <span className="text-gradient">millions rely on.</span>
          </h1>

          <p className="font-mono text-base md:text-lg text-brand-muted h-7 mb-6">
            <span className="sr-only">I am a {roles.join(", ")}</span>
            <span aria-hidden="true">
              <span className="text-signal">&gt;</span> {displayText}
              <span className="animate-pulse text-brand-light">▍</span>
            </span>
          </p>

          <p className="text-brand-muted text-lg leading-relaxed max-w-xl mb-10">
            I build React Native and React apps end to end: WebSocket chat and voice, native Android and iOS
            modules, payments, and the observability that cut fatal crashes by 99%.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand text-white font-medium hover:bg-brand-hover transition-colors shadow-lg shadow-brand/30"
            >
              Let&apos;s talk
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/15 hover:bg-white/5 transition-colors"
            >
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              Download resume
            </a>
          </div>

          <dl className="grid grid-cols-3 gap-6 max-w-lg border-t border-white/10 pt-6">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl md:text-3xl font-bold tracking-tight">{stat.value}</dd>
                <dd aria-hidden="true" className="font-mono text-[11px] md:text-xs text-brand-muted mt-1">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <PhoneSession />
      </div>
    </section>
  );
}
