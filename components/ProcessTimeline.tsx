"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { processSteps } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <section className="py-24 md:py-32" aria-labelledby="werkwijze-title">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="werkwijze-title" eyebrow="Zo werken wij" title="Van uitdaging naar oplossing." text="Een helder traject in vijf stappen. Je weet altijd waar we staan en wat de volgende stap is." />
          </div>
        </div>
        <ol ref={ref} className="relative lg:col-span-7">
          <div aria-hidden className="absolute top-2 bottom-2 left-[19px] w-px bg-line" />
          <motion.div aria-hidden style={{ scaleY }} className="absolute top-2 bottom-2 left-[19px] w-px origin-top bg-accent" />
          {processSteps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group relative pb-12 pl-16 last:pb-0"
            >
              <motion.span
                initial={{ backgroundColor: "#ffffff", color: "#667085" }}
                whileInView={{ backgroundColor: "#4169FF", color: "#ffffff" }}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                transition={{ duration: 0.4 }}
                className="absolute top-0 left-0 grid size-10 place-items-center rounded-full border border-line font-mono text-xs font-semibold"
              >
                0{i + 1}
              </motion.span>
              <div className="rounded-2xl border border-line bg-white p-6 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_20px_40px_-25px_rgb(11_18_38/0.3)] md:p-7">
                <h3 className="text-xl font-semibold text-navy md:text-2xl">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
