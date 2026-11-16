"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Inbox, ShieldCheck, Tags, Database, Send, Play, Check, Loader2 } from "lucide-react";
import { DemoFrame } from "./DemoFrame";
import { cn } from "@/lib/utils";

const types = {
  offerte: { label: "Offerteaanvraag", priority: "Hoog", owner: "Sales", name: "Pieter Fictief", company: "Voorbeeld Bouw BV" },
  support: { label: "Supportvraag", priority: "Normaal", owner: "Support", name: "Eva Demo", company: "Studio Testmans" },
  afspraak: { label: "Afspraakverzoek", priority: "Normaal", owner: "Planning", name: "Tom Proef", company: "Kantoor Voorbeeld" },
} as const;
type TypeKey = keyof typeof types;

const steps = [
  { icon: Inbox, title: "Aanvraag ontvangen", detail: (t: TypeKey) => `Webformulier: ${types[t].label.toLowerCase()} binnengekomen` },
  { icon: ShieldCheck, title: "Gegevens gecontroleerd", detail: () => "E-mailadres geldig · geen dubbele aanvraag gevonden" },
  { icon: Tags, title: "Gecategoriseerd", detail: (t: TypeKey) => `Type: ${types[t].label} · prioriteit: ${types[t].priority}` },
  { icon: Database, title: "Toegevoegd aan CRM", detail: (t: TypeKey) => `Nieuwe lead aangemaakt · toegewezen aan team ${types[t].owner}` },
  { icon: Send, title: "Bevestiging verstuurd", detail: () => "Bevestiging naar klant · melding naar team" },
];

export function AutomationDemo() {
  const [type, setType] = useState<TypeKey>("offerte");
  const [active, setActive] = useState(-1);
  const [log, setLog] = useState<string[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const running = active >= 0 && active < steps.length;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = () => {
    timers.current.forEach(clearTimeout);
    setActive(0);
    setLog([]);
    steps.forEach((s, i) => {
      timers.current.push(
        setTimeout(() => {
          setLog((l) => [...l, `+${(i * 0.4 + 0.2).toFixed(1)}s  ${s.title} — ${s.detail(type)}`]);
          setActive(i + 1);
        }, 900 * (i + 1)),
      );
    });
  };

  const t = types[type];

  return (
    <DemoFrame title="Workflow — nieuwe aanvraag naar CRM">
      <div className="grid gap-0 lg:grid-cols-[260px_1fr]">
        <div className="border-b border-line p-5 lg:border-r lg:border-b-0">
          <fieldset>
            <legend className="text-xs font-semibold text-muted">Type aanvraag</legend>
            <div className="mt-3 space-y-2">
              {(Object.keys(types) as TypeKey[]).map((k) => (
                <label key={k} className={cn("flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition", type === k ? "border-accent bg-accent-50 font-medium" : "border-line hover:bg-offwhite", running && "pointer-events-none opacity-60")}>
                  <input type="radio" name="aanvraagtype" value={k} checked={type === k} onChange={() => setType(k)} className="accent-[#4169FF]" disabled={running} />
                  {types[k].label}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="mt-5 rounded-lg bg-offwhite p-3 text-xs leading-relaxed">
            <p className="font-semibold">Voorbeeldaanvraag</p>
            <p className="mt-1 text-muted">{t.name} · {t.company}</p>
          </div>
          <button type="button" onClick={run} disabled={running} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-accent-600 disabled:opacity-60">
            {running ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Play className="size-4" aria-hidden />}
            {running ? "Workflow loopt…" : active >= steps.length ? "Nog een keer" : "Simuleer nieuwe aanvraag"}
          </button>
        </div>
        <div className="p-5">
          <ol className="relative space-y-3">
            <div aria-hidden className="absolute top-5 bottom-5 left-5 w-px bg-line" />
            <motion.div aria-hidden className="absolute top-5 left-5 w-px origin-top bg-accent" style={{ height: "calc(100% - 2.5rem)" }} initial={false} animate={{ scaleY: Math.max(0, Math.min(1, (active - 1) / (steps.length - 1))) }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
            {steps.map((s, i) => {
              const done = active > i;
              const current = active === i;
              const Icon = s.icon;
              return (
                <li key={s.title} className="relative flex items-center gap-4">
                  <span className={cn("relative z-10 grid size-10 shrink-0 place-items-center rounded-xl border transition-all duration-500", done ? "border-accent bg-accent text-white" : current ? "border-accent bg-white text-accent" : "border-line bg-white text-muted")}>
                    {done ? <Check className="size-4" aria-hidden /> : <Icon className="size-4" aria-hidden />}
                    {current && <motion.span className="absolute inset-0 rounded-xl ring-2 ring-accent/40" animate={{ scale: [1, 1.25], opacity: [1, 0] }} transition={{ duration: 1, repeat: Infinity }} />}
                  </span>
                  <div className={cn("flex-1 rounded-xl border px-4 py-2.5 transition-colors duration-500", done ? "border-accent/25 bg-accent-50/60" : "border-line")}>
                    <p className="text-sm font-semibold">{s.title}</p>
                    <p className="text-xs text-muted">{done ? s.detail(type) : current ? "Bezig…" : "Wacht op vorige stap"}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="mt-4 h-28 overflow-y-auto rounded-xl bg-navy p-3 font-mono text-[11px] leading-relaxed text-white/75" aria-live="polite">
            {log.length === 0 && <p className="text-white/40">Activiteitenlog verschijnt hier…</p>}
            <AnimatePresence initial={false}>
              {log.map((l) => (
                <motion.p key={l} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="text-emerald-400">✓</span> {l}
                </motion.p>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
