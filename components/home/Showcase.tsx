"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PhoneCall, LayoutDashboard, Workflow } from "lucide-react";
import { PhoneDemo } from "../demos/PhoneDemo";
import { CrmDemo } from "../demos/CrmDemo";
import { AutomationDemo } from "../demos/AutomationDemo";
import { SectionHeading } from "../SectionHeading";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "telefonie", label: "Slimme telefonie", icon: PhoneCall, text: "Een digitale receptionist neemt gesprekken aan en plant afspraken direct in.", Demo: PhoneDemo },
  { id: "crm", label: "CRM & bedrijfssoftware", icon: LayoutDashboard, text: "Overzicht over klanten, deals en resultaten in één dashboard.", Demo: CrmDemo },
  { id: "automatisering", label: "Automatisering", icon: Workflow, text: "Aanvragen automatisch ontvangen, verwerken en doorzetten naar je CRM.", Demo: AutomationDemo },
];

export function Showcase() {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActive(tabs[next].id);
    document.getElementById(`tab-${tabs[next].id}`)?.focus();
  };

  return (
    <section className="grain relative overflow-hidden bg-navy py-24 text-white md:py-32" aria-labelledby="showcase-title">
      <div className="grid-lines-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-accent/25 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading id="showcase-title" dark align="center" eyebrow="Interactieve demo's" title="Ontdek wat technologie voor jouw bedrijf kan betekenen." text="Probeer het zelf. Deze demonstraties laten zien hoe onze oplossingen in de praktijk kunnen werken." />

        <div role="tablist" aria-label="Demonstraties" className="mx-auto mt-12 grid w-full max-w-2xl grid-cols-3 gap-1 rounded-2xl bg-white/5 p-1.5 ring-1 ring-white/10 sm:rounded-full">
          {tabs.map((t, i) => {
            const Icon = t.icon;
            const selected = t.id === active;
            return (
              <button
                key={t.id}
                id={`tab-${t.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`panel-${t.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(t.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn("relative flex flex-col items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-center text-[12.5px] leading-tight font-medium transition-colors sm:flex-row sm:gap-2 sm:rounded-full sm:px-4 sm:text-sm", selected ? "text-navy" : "text-white/65 hover:text-white")}
              >
                {selected && <motion.span layoutId="tab-bg" className="absolute inset-0 rounded-xl bg-white sm:rounded-full" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <Icon className="relative size-4" aria-hidden />
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.p key={current.id + "-t"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-5 text-center text-sm text-white/60">
            {current.text}
          </motion.p>
        </AnimatePresence>

        <div className="mx-auto mt-10 max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              id={`panel-${current.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${current.id}`}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <current.Demo />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
