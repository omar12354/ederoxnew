"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Lightbulb, RotateCcw } from "lucide-react";
import { finderProblems, services } from "@/lib/content";
import { icons } from "@/lib/icons";
import { dispatchPrefill } from "@/lib/prefill";
import { cn, inSentence } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

export function SolutionFinder() {
  const [choice, setChoice] = useState<string | null>(null);
  const router = useRouter();
  const problem = finderProblems.find((p) => p.id === choice);
  const service = problem ? services.find((s) => s.slug === problem.service) : undefined;
  const Icon = service ? icons[service.icon] : Lightbulb;

  const discuss = () => {
    if (!problem || !service) return;
    const bericht = `Onze uitdaging: ${problem.label}\n\nIk wil graag bespreken hoe ${inSentence(service.title)} ons hierbij kan helpen.`;
    const form = document.getElementById("formulier");
    if (form) {
      dispatchPrefill({ oplossing: service.slug, bericht });
      form.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => document.getElementById("naam")?.focus({ preventScroll: true }), 700);
    } else {
      router.push(`/contact?oplossing=${service.slug}&behoefte=${problem.id}#formulier`);
    }
  };

  return (
    <section className="py-24 md:py-32" aria-labelledby="keuzehulp-title">
      <div className="container-x">
        <div className="overflow-hidden rounded-[28px] border border-line bg-white">
          <div className="grid lg:grid-cols-2">
            <div className="p-7 md:p-12">
              <SectionHeading id="keuzehulp-title" eyebrow="Keuzehulp" title="Welke oplossing past bij jouw bedrijf?" text="Kies de uitdaging die het meest herkenbaar is. Wij laten zien waar je het beste kunt beginnen." />
              <fieldset className="mt-8">
                <legend className="sr-only">Kies je grootste uitdaging</legend>
                <div className="space-y-2.5">
                  {finderProblems.map((p) => {
                    const selected = choice === p.id;
                    return (
                      <label
                        key={p.id}
                        className={cn(
                          "flex cursor-pointer items-center gap-4 rounded-xl border px-4 py-3.5 text-[0.95rem] transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent",
                          selected ? "border-accent bg-accent-50 text-navy" : "border-line text-navy/80 hover:border-navy/20 hover:bg-offwhite",
                        )}
                      >
                        <input type="radio" name="uitdaging" value={p.id} checked={selected} onChange={() => setChoice(p.id)} className="sr-only" />
                        <span className={cn("grid size-5 shrink-0 place-items-center rounded-full border transition-all", selected ? "border-accent bg-accent text-white" : "border-navy/20")}>
                          {selected && <Check className="size-3" aria-hidden />}
                        </span>
                        {p.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>

            <div className="relative overflow-hidden bg-navy p-7 text-white md:p-12" aria-live="polite">
              <div className="grid-lines-dark pointer-events-none absolute inset-0" />
              <div className="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full bg-accent/30 blur-3xl" />
              <AnimatePresence mode="wait">
                {problem && service ? (
                  <motion.div key={problem.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="relative flex h-full flex-col">
                    <p className="text-xs font-semibold tracking-[0.16em] text-white/50 uppercase">Onze aanbeveling</p>
                    <div className="mt-6 flex items-center gap-4">
                      <span className="grid size-14 place-items-center rounded-2xl bg-accent text-white">
                        <Icon className="size-6" aria-hidden />
                      </span>
                      <h3 className="text-2xl font-semibold md:text-3xl">{service.title}</h3>
                    </div>
                    <p className="mt-6 leading-relaxed text-white/75">{problem.why}</p>
                    <div className="mt-6 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                      <p className="text-xs font-semibold text-white/50">Een logische eerste stap</p>
                      <p className="mt-1 text-sm">{problem.firstStep}</p>
                    </div>
                    <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                      <button type="button" onClick={discuss} className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition hover:bg-accent-600">
                        Bespreek deze oplossing
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </button>
                      <Link href={`/oplossingen/${service.slug}`} className="inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white ring-1 ring-white/25 transition hover:bg-white/5">
                        Meer informatie
                      </Link>
                    </div>
                    <button type="button" onClick={() => setChoice(null)} className="mt-5 inline-flex items-center gap-1.5 self-start text-xs text-white/50 hover:text-white">
                      <RotateCcw className="size-3" aria-hidden /> Opnieuw kiezen
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative flex h-full min-h-72 flex-col items-center justify-center text-center">
                    <span className="grid size-14 place-items-center rounded-2xl bg-white/10">
                      <Lightbulb className="size-6" aria-hidden />
                    </span>
                    <p className="mt-5 max-w-xs text-white/70">Kies links een uitdaging. Je ziet hier direct welke oplossing het beste aansluit.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
