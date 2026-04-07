"use client";

import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Download, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  {
    title: "120%",
    subtitle: "Revenue Boost",
    icon: TrendingUp,
    className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-brand/20 to-brand/5 border-brand/30",
    delay: 0.1,
  },
  {
    title: "99.9%",
    subtitle: "Crash-Free Rate",
    icon: ShieldCheck,
    className: "md:col-span-1 md:row-span-1",
    delay: 0.2,
  },
  {
    title: "10L+",
    subtitle: "Downloads",
    icon: Download,
    className: "md:col-span-1 md:row-span-1",
    delay: 0.3,
  },
  {
    title: "28%",
    subtitle: "User Retention Increase",
    icon: Users,
    className: "md:col-span-2 md:row-span-1 bg-white/5",
    delay: 0.4,
  },
];

export function BentoBox() {
  return (
    <section id="metrics" className="py-16 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Impact & Numbers</h2>
          <p className="text-brand-muted">Measurable results delivered across products.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 auto-rows-[150px]">
          {metrics.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className={cn(
                "glass-panel p-6 flex flex-col justify-between group overflow-hidden relative",
                item.className
              )}
            >
              {/* Ambient Glow & Vector Pattern Background */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-xl">
                {/* Glowing Orbs */}
                <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] bg-brand/10 blur-[50px] rounded-full group-hover:bg-brand/20 group-hover:scale-150 transition-all duration-700 ease-in-out" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-purple-600/10 blur-[40px] rounded-full group-hover:bg-purple-500/20 group-hover:scale-150 transition-all duration-700 ease-in-out" />

                {/* Dot Matrix Vector Overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wOCkiLz48L3N2Zz4=')] opacity-30 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Linear Gradient Mask to fade pattern at edges */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              </div>

              <div className="relative z-10 flex justify-between items-start">
                <div className="p-3 rounded-lg bg-background/50 text-brand group-hover:scale-110 group-hover:text-white transition-all duration-300 shadow-md shadow-black/50">
                  <item.icon className="w-6 h-6" />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-black mb-1 group-hover:text-brand transition-colors duration-300 drop-shadow-sm">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-brand-muted font-medium">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
