import { Hero } from "@/components/Hero";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { BentoBox } from "@/components/BentoBox";
import { TechMarquee } from "@/components/TechMarquee";
import { SkillsSet } from "@/components/SkillsSet";
import { Contact } from "@/components/Contact";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-brand selection:text-white">
      <Hero />
      <TechMarquee />
      <SkillsSet />
      <BentoBox />
      <ExperienceTimeline />
      <Projects />
      <Contact />
      
      <footer className="py-8 text-center text-brand-muted text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} Rahul Yadav. Built with Next.js & Tailwind CSS.</p>
      </footer>
    </main>
  );
}
