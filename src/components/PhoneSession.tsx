"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Status = "connected" | "reconnecting" | "resumed";

type Step =
  | { kind: "message"; from: "user" | "expert"; text: string }
  | { kind: "system"; text: string; status: Status };

// A chat that loses its connection mid-conversation and recovers without losing anything
const script: Step[] = [
  { kind: "message", from: "user", text: "Hi! Is the astrologer online?" },
  { kind: "message", from: "expert", text: "Yes, I'm here. Ask me anything." },
  { kind: "system", text: "Network lost · reconnecting…", status: "reconnecting" },
  { kind: "system", text: "Session resumed · 0 messages lost", status: "resumed" },
  { kind: "message", from: "user", text: "Wait, did my signal just drop?" },
  { kind: "message", from: "expert", text: "It did. The chat carried on anyway." },
];

const statusStyles: Record<Status, { label: string; dot: string; text: string }> = {
  connected: { label: "Connected", dot: "bg-signal", text: "text-signal" },
  reconnecting: { label: "Reconnecting", dot: "bg-warn animate-pulse", text: "text-warn" },
  resumed: { label: "Resumed", dot: "bg-signal", text: "text-signal" },
};

export function PhoneSession() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const atEnd = step >= script.length;
    const delay = atEnd ? 4000 : step === 0 ? 900 : script[step - 1].kind === "system" ? 1800 : 1400;
    const timeout = setTimeout(() => setStep(atEnd ? 0 : step + 1), delay);
    return () => clearTimeout(timeout);
  }, [step, reduceMotion]);

  const visible = script.slice(0, reduceMotion ? script.length : step);
  const lastSystem = visible.findLast((s) => s.kind === "system");
  const status: Status = lastSystem?.kind === "system" ? lastSystem.status : "connected";
  const style = statusStyles[status];

  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <div aria-hidden="true" className="absolute -inset-8 bg-brand/25 blur-3xl rounded-[3rem]" />

      {/* Floating telemetry chips */}
      <div aria-hidden="true" className="hidden sm:flex absolute -left-20 top-44 z-20 items-center gap-2 rounded-full border border-white/10 bg-background/80 backdrop-blur px-3 py-1.5 font-mono text-xs shadow-xl">
        <span className="w-1.5 h-1.5 rounded-full bg-signal" />
        crash-free 99.90%
      </div>
      <div aria-hidden="true" className="hidden sm:flex absolute -right-6 -bottom-5 z-20 items-center gap-2 rounded-full border border-white/10 bg-background/80 backdrop-blur px-3 py-1.5 font-mono text-xs shadow-xl">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-light" />
        ANR &lt; 0.2%
      </div>

      <div
        role="img"
        aria-label="Animated demo: a live chat session loses its network connection, reconnects and resumes without losing any messages."
        className="relative rounded-[2.75rem] border border-white/15 bg-[#0d0d12] p-3 shadow-2xl shadow-black/60"
      >
        <div aria-hidden="true" className="rounded-[2.2rem] overflow-hidden bg-[#08080b] border border-white/5 h-[540px] flex flex-col">
          {/* Status bar */}
          <div className="relative flex items-center justify-between px-6 pt-3 pb-2 text-[11px] font-semibold text-white/80">
            <span>9:41</span>
            <span className="absolute left-1/2 -translate-x-1/2 top-2 w-24 h-6 rounded-full bg-black" />
            <span className="font-mono">5G</span>
          </div>

          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-sm font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight truncate">Live session</p>
              <p className="text-[11px] text-brand-muted">chat · voice</p>
            </div>
            <span className={cn("flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium", style.text)}>
              <span className={cn("w-1.5 h-1.5 rounded-full", style.dot)} />
              {style.label}
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 flex flex-col justify-end gap-2.5 p-4 overflow-hidden">
            {visible.map((item, index) => (
              <motion.div
                key={index}
                initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  item.kind === "system" && "self-center",
                  item.kind === "message" && item.from === "user" && "self-end",
                  item.kind === "message" && item.from === "expert" && "self-start"
                )}
              >
                {item.kind === "system" ? (
                  <span
                    className={cn(
                      "block rounded-full border px-3 py-1 font-mono text-[10px]",
                      item.status === "reconnecting" ? "border-warn/30 text-warn bg-warn/5" : "border-signal/30 text-signal bg-signal/5"
                    )}
                  >
                    {item.text}
                  </span>
                ) : (
                  <span
                    className={cn(
                      "block max-w-[220px] rounded-2xl px-3.5 py-2 text-[13px] leading-snug",
                      item.from === "user" ? "bg-brand text-white rounded-br-md" : "bg-white/[0.07] text-white/90 rounded-bl-md"
                    )}
                  >
                    {item.text}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Socket telemetry */}
          <div className="grid grid-cols-3 border-t border-white/5 font-mono text-[10px] text-brand-muted">
            <div className="px-3 py-2.5">
              socket <span className={status === "reconnecting" ? "text-warn" : "text-signal"}>{status === "reconnecting" ? "retry" : "open"}</span>
            </div>
            <div className="px-3 py-2.5 border-x border-white/5">
              queue <span className="text-white/80">{status === "reconnecting" ? 1 : 0}</span>
            </div>
            <div className="px-3 py-2.5">
              dedup <span className="text-signal">on</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
