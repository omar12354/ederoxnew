"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck2, PhoneIncoming, Play, RotateCcw, Bot, User } from "lucide-react";
import { DemoFrame } from "./DemoFrame";
import { cn } from "@/lib/utils";

type Line = { who: "system" | "agent" | "caller"; text: string };

const slots = ["10:30", "13:00", "15:30"];
const agenda = [
  { time: "09:00", label: "Bezet" },
  { time: "10:30", label: null },
  { time: "11:30", label: "Bezet" },
  { time: "13:00", label: null },
  { time: "14:00", label: "Bezet" },
  { time: "15:30", label: null },
];

function script(slot: string | null): Line[] {
  return [
    { who: "system", text: "Inkomend gesprek · nummer afgeschermd" },
    { who: "agent", text: "Goedemiddag, je spreekt met de digitale assistent van Praktijk Voorbeeld. Waarmee kan ik je helpen?" },
    { who: "caller", text: "Hoi, ik wil graag een afspraak maken voor een eerste consult." },
    { who: "agent", text: "Dat kan. Morgen heb ik nog drie momenten vrij. Welke past jou het best?" },
    { who: "caller", text: `${slot ?? "…"} komt mij goed uit.` },
    { who: "agent", text: "Prima. Mag ik je naam?" },
    { who: "caller", text: "Sanne de Vries." },
    { who: "agent", text: `Dankjewel, Sanne. Je afspraak morgen om ${slot ?? "…"} staat vast. Je ontvangt zo een bevestiging per sms.` },
    { who: "system", text: "Afspraak ingepland in de agenda · bevestiging verzonden" },
  ];
}

const CHOICE_STEP = 3;

export function PhoneDemo() {
  const [step, setStep] = useState(-1);
  const [slot, setSlot] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const lines = useMemo(() => script(slot), [slot]);
  const running = step >= 0 && step < lines.length - 1;
  const waiting = step === CHOICE_STEP && !slot;
  const done = step === lines.length - 1;

  useEffect(() => {
    if (step < 0 || done || waiting) return;
    const next = lines[step + 1];
    const delay = next.who === "agent" ? 1300 : 900;
    if (next.who === "agent") setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setStep((s) => s + 1);
    }, delay);
    return () => clearTimeout(t);
  }, [step, done, waiting, lines]);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [step, typing]);

  const start = () => {
    setSlot(null);
    setTyping(false);
    setStep(0);
  };

  return (
    <DemoFrame title="Digitale receptionist — live gesprek">
      <div className="grid md:grid-cols-[1.4fr_1fr]">
        <div className="flex h-[440px] flex-col border-b border-line md:border-r md:border-b-0">
          <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto p-5" aria-live="polite">
            {step < 0 && (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="grid size-14 place-items-center rounded-full bg-accent-50 text-accent">
                  <PhoneIncoming className="size-6" aria-hidden />
                </span>
                <p className="mt-4 max-w-xs text-sm text-muted">Bekijk hoe een digitale receptionist een gesprek aanneemt en direct een afspraak inplant.</p>
                <button type="button" onClick={start} className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-600">
                  <Play className="size-4" aria-hidden /> Start demo-gesprek
                </button>
              </div>
            )}
            <AnimatePresence initial={false}>
              {lines.slice(0, step + 1).map((l, i) => (
                <motion.div key={i + l.who} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                  {l.who === "system" ? (
                    <p className="mx-auto w-fit rounded-full bg-offwhite px-3 py-1 text-center text-[11px] font-medium text-muted">{l.text}</p>
                  ) : (
                    <div className={cn("flex items-end gap-2", l.who === "caller" && "flex-row-reverse")}>
                      <span className={cn("grid size-7 shrink-0 place-items-center rounded-full", l.who === "agent" ? "bg-accent text-white" : "bg-line text-navy")}>
                        {l.who === "agent" ? <Bot className="size-3.5" aria-hidden /> : <User className="size-3.5" aria-hidden />}
                      </span>
                      <p className={cn("max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed", l.who === "agent" ? "rounded-bl-md bg-accent-50 text-navy" : "rounded-br-md bg-navy text-white")}>
                        <span className="sr-only">{l.who === "agent" ? "Assistent: " : "Beller: "}</span>
                        {l.text}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {typing && (
              <div className="flex items-center gap-2" aria-hidden>
                <span className="grid size-7 place-items-center rounded-full bg-accent text-white">
                  <Bot className="size-3.5" />
                </span>
                <span className="flex gap-1 rounded-2xl bg-accent-50 px-3.5 py-3">
                  {[0, 1, 2].map((d) => (
                    <motion.span key={d} className="size-1.5 rounded-full bg-accent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }} />
                  ))}
                </span>
              </div>
            )}
          </div>
          <div className="border-t border-line p-4">
            {waiting ? (
              <div>
                <p className="mb-2 text-xs font-medium text-muted">Kies als beller een tijd:</p>
                <div className="flex flex-wrap gap-2">
                  {slots.map((s) => (
                    <button key={s} type="button" onClick={() => setSlot(s)} className="rounded-full border border-accent/30 bg-accent-50 px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent hover:text-white">
                      Morgen {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-xs text-muted">
                  <span className={cn("size-2 rounded-full", running ? "animate-pulse-soft bg-emerald-500" : done ? "bg-accent" : "bg-line")} />
                  {running ? "Gesprek actief" : done ? "Gesprek afgerond" : "Klaar om te starten"}
                </p>
                {step >= 0 && (
                  <button type="button" onClick={start} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-navy ring-1 ring-line transition hover:bg-offwhite">
                    <RotateCcw className="size-3.5" aria-hidden /> Opnieuw
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="bg-offwhite/60 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Agenda · morgen</p>
            <CalendarCheck2 className="size-4 text-muted" aria-hidden />
          </div>
          <ul className="mt-4 space-y-2">
            {agenda.map((a) => {
              const offered = step >= CHOICE_STEP && !a.label && !slot;
              const booked = slot === a.time && step >= lines.length - 1;
              return (
                <li key={a.time} className="flex items-center gap-3">
                  <span className="w-11 font-mono text-xs text-muted">{a.time}</span>
                  <motion.div
                    layout
                    className={cn(
                      "flex-1 rounded-xl px-3 py-2.5 text-xs font-medium transition-colors duration-500",
                      a.label && "bg-line/70 text-muted",
                      !a.label && !booked && "border border-dashed border-line bg-white text-muted",
                      offered && "border-accent/50 bg-accent-50 text-accent",
                      booked && "bg-accent text-white shadow-[0_10px_24px_-10px_rgb(65_105_255/0.8)]",
                    )}
                  >
                    {booked ? "Nieuw · Consult — Sanne de Vries" : a.label ?? (offered ? "Aangeboden" : "Beschikbaar")}
                  </motion.div>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-[11px] leading-relaxed text-muted">Voorbeeldgesprek met fictieve gegevens.</p>
        </div>
      </div>
    </DemoFrame>
  );
}
