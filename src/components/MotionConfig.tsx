"use client";

import { MotionConfig as FramerMotionConfig } from "framer-motion";

// Skips transform/layout animations for visitors who prefer reduced motion
export function MotionConfig({ children }: { children: React.ReactNode }) {
  return <FramerMotionConfig reducedMotion="user">{children}</FramerMotionConfig>;
}
