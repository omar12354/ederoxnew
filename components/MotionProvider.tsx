"use client";

import { MotionConfig } from "motion/react";

/** Respecteert automatisch `prefers-reduced-motion` voor alle Motion-animaties. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
