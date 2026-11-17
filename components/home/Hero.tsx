"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Workflow, Code2, MonitorSmartphone, Cable } from "lucide-react";
import { Button } from "../Button";
import { PhotoSlot } from "../PhotoSlot";
import { heroPhoto } from "@/lib/content";
import { bookingHref } from "@/lib/utils";

const heading = "Technologie die jouw bedrijf vooruithelpt.";
const ease = [0.22, 1, 0.36, 1] as const;

const disciplines = [
  { icon: Workflow, label: "Automatisering & AI" },
  { icon: Code2, label: "Software op maat" },
  { icon: MonitorSmartphone, label: "Websites & platforms" },
  { icon: Cable, label: "Systeemintegraties" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-28 pb-16 md:pt-36 lg:pb-24" aria-labelledby="hero-title">
      <motion.div style={{ y: bgY }} aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(80%_70%_at_30%_20%,black,transparent)]" />
        <div className="absolute -top-32 -left-32 size-[520px] rounded-full bg-accent/12 blur-3xl" />
        <div className="absolute top-40 right-0 size-[420px] rounded-full bg-[#9fb3ff]/20 blur-3xl" />
      </motion.div>

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 xl:col-span-6">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="eyebrow mb-7">
            Jouw partner in technologie
          </motion.p>
          <h1 id="hero-title" className="text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.04em] text-navy sm:text-6xl xl:text-[5.1rem]">
            {heading.split(" ").map((word, i) => (
              <span key={i}>
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className={"inline-block " + (word.startsWith("vooruithelpt") ? "text-accent" : "")}
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease }}
                  >
                    {word}
                  </motion.span>
                </span>{" "}
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65, ease }} className="mt-7 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            Van slimme automatiseringen tot maatwerksoftware en digitale oplossingen. Wij helpen bedrijven slimmer werken,
            efficiënter groeien en klaar te zijn voor de toekomst.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8, ease }} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={bookingHref("/contact#formulier")} size="lg" arrow>
              Bespreek jouw project
            </Button>
            <Button href="#oplossingen" size="lg" variant="secondary">
              Ontdek onze oplossingen
            </Button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease }} className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgb(11_18_38/0.55)] sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/6]">
            <motion.div style={{ y, scale }} className="absolute -inset-y-12 inset-x-0">
              <PhotoSlot
                src={heroPhoto}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt="Professioneel team in overleg over digitale oplossingen"
                className="h-full w-full"
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease }}
            className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-white/60 bg-white/85 p-4 shadow-[0_20px_50px_-20px_rgb(11_18_38/0.35)] backdrop-blur-xl sm:left-auto sm:-left-6 sm:right-auto sm:w-[23rem]"
          >
            <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Waar wij je mee helpen</p>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {disciplines.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 rounded-lg bg-offwhite px-2.5 py-2 text-[12px] leading-tight font-medium text-navy">
                  <Icon className="size-3.5 shrink-0 text-accent" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
