import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ShipLog } from "@/components/ShipLog";
import { Impact } from "@/components/Impact";
import { Stack } from "@/components/Stack";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { CaseStudy } from "@/components/CaseStudy";
import { ClientWork } from "@/components/ClientWork";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background text-foreground antialiased selection:bg-brand selection:text-white">
        <Hero />
        <ShipLog />
        <Impact />
        <ExperienceTimeline />
        <CaseStudy />
        <ClientWork />
        <Stack />
        <Projects />
        <Contact />
      </main>

      {/* Status bar */}
      <footer className="border-t border-white/10 bg-black/40 font-mono text-xs text-brand-muted">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-signal" />
            all systems operational
          </span>
          <span>© {new Date().getFullYear()} Rahul Yadav</span>
          <span>built with Next.js · Tailwind CSS</span>
        </div>
      </footer>
    </>
  );
}
