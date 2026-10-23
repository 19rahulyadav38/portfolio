"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Impact", href: "#impact" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];

const istFormat = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

export function Nav() {
  // Rendered after mount so server and client markup match
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(istFormat.format(new Date()));
    const first = setTimeout(tick, 0);
    const interval = setInterval(tick, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="fixed top-4 inset-x-0 z-40 px-4">
      <nav
        aria-label="Main"
        className="mx-auto max-w-3xl flex items-center justify-between gap-4 rounded-full border border-white/10 bg-background/70 backdrop-blur-xl pl-5 pr-2 py-2 shadow-lg shadow-black/40"
      >
        <a href="#top" className="font-mono text-sm font-bold tracking-tight">
          ~/rahul<span className="text-brand-light">.yadav</span>
        </a>

        <ul className="hidden md:flex items-center gap-1 text-sm text-brand-muted">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-2 font-mono text-xs text-brand-muted" title="My local time in Noida">
            <span className="w-1.5 h-1.5 rounded-full bg-signal" />
            {time ?? "--:--"} IST
          </span>
          <a
            href="#contact"
            className="rounded-full bg-white text-black text-sm font-medium px-4 py-1.5 hover:bg-white/85 transition-colors"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
