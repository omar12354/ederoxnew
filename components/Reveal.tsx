"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number; as?: "div" | "li" };

export function Reveal({ delay = 0, y = 24, as = "div", children, ...rest }: Props) {
  const Comp = (as === "li" ? motion.li : motion.div) as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
