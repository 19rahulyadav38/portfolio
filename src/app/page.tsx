import { Hero } from "@/components/Hero";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { BentoBox } from "@/components/BentoBox";
import { TechMarquee } from "@/components/TechMarquee";
import { SkillsSet } from "@/components/SkillsSet";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-brand selection:text-white">
      <Hero />
      <TechMarquee />
      <SkillsSet />
      <BentoBox />
      <ExperienceTimeline />
      <Contact />
      
      <footer className="py-8 text-center text-brand-muted text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} Rahul Yadav. Build with Next.js 14 & Tailwind CSS.</p>
      </footer>
    </main>
  );
}
