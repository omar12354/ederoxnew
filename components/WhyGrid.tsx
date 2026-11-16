"use client";

import { motion } from "motion/react";
import { advantages } from "@/lib/content";
import { icons } from "@/lib/icons";

export function WhyGrid() {
  return (
    <div className="grid overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 1 }}>
      {advantages.map((a, i) => {
        const Icon = icons[a.icon];
        return (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group bg-white p-7 transition-colors duration-500 hover:bg-offwhite md:p-8"
          >
            <motion.span whileHover={{ rotate: -8, scale: 1.08 }} className="grid size-12 place-items-center rounded-xl bg-accent-50 text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
              <Icon className="size-5" aria-hidden />
            </motion.span>
            <h3 className="mt-6 text-lg font-semibold text-navy">{a.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{a.text}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
