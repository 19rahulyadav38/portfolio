import { cn } from "@/lib/utils";

// Highlights from my work, formatted like a deploy log
const events = [
  { tag: "release", text: "fatal crashes 2,754 → 30 per release", tone: "signal" },
  { tag: "realtime", text: "per-session WebSocket infra for chat & voice", tone: "brand" },
  { tag: "growth", text: "+120% revenue from one iOS super app", tone: "signal" },
  { tag: "native", text: "Unity ↔ React Native via Swift & Obj-C modules", tone: "brand" },
  { tag: "stability", text: "ANRs held below 0.2%", tone: "signal" },
  { tag: "ship", text: "2 React Native apps built from scratch", tone: "brand" },
  { tag: "funnel", text: "free chat → payment → consultation", tone: "brand" },
  { tag: "retention", text: "+28% user retention", tone: "signal" },
];

// Duplicate for infinite scrolling effect
const duplicatedEvents = [...events, ...events];

export function ShipLog() {
  return (
    <section aria-label="Highlights" className="py-6 border-y border-white/5 bg-black/30 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10" />

      <ul className="flex w-fit animate-marquee font-mono text-sm">
        {duplicatedEvents.map((event, index) => (
          <li key={index} aria-hidden={index >= events.length} className="flex items-center gap-2 shrink-0 px-8 whitespace-nowrap">
            <span className="text-brand-muted/60">[</span>
            <span className={cn(event.tone === "signal" ? "text-signal" : "text-brand-light")}>{event.tag}</span>
            <span className="text-brand-muted/60">]</span>
            <span className="text-foreground/80">{event.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
