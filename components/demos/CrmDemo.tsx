"use client";

import { useMemo, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Search, TrendingUp, Trophy, Users, Percent } from "lucide-react";
import { DemoFrame } from "./DemoFrame";
import { cn } from "@/lib/utils";

const stages = ["Nieuw", "Gesprek", "Offerte", "Gewonnen"] as const;
type Stage = (typeof stages)[number];
type Deal = { id: number; company: string; contact: string; value: number; stage: Stage };

const initialDeals: Deal[] = [
  { id: 1, company: "Bakkerij Voorbeeld", contact: "J. Jansen", value: 4800, stage: "Nieuw" },
  { id: 2, company: "Studio Fictief", contact: "L. de Boer", value: 12500, stage: "Nieuw" },
  { id: 3, company: "Adviesgroep Demo", contact: "M. Visser", value: 9200, stage: "Gesprek" },
  { id: 4, company: "Praktijk Testlaan", contact: "S. Bakker", value: 6400, stage: "Gesprek" },
  { id: 5, company: "Installatie BV (fictief)", contact: "R. Smit", value: 18000, stage: "Offerte" },
  { id: 6, company: "Logistiek Voorbeeld", contact: "A. Mulder", value: 7600, stage: "Gewonnen" },
];

const eur = (n: number) => new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export function CrmDemo() {
  const [deals, setDeals] = useState(initialDeals);
  const [selected, setSelected] = useState<number | null>(3);
  const [query, setQuery] = useState("");

  const stats = useMemo(() => {
    const open = deals.filter((d) => d.stage !== "Gewonnen");
    const won = deals.filter((d) => d.stage === "Gewonnen");
    return {
      pipeline: open.reduce((a, d) => a + d.value, 0),
      won: won.reduce((a, d) => a + d.value, 0),
      count: deals.length,
      conversion: Math.round((won.length / deals.length) * 100),
    };
  }, [deals]);

  const move = (id: number, dir: 1 | -1) =>
    setDeals((ds) =>
      ds.map((d) => {
        if (d.id !== id) return d;
        const idx = Math.min(stages.length - 1, Math.max(0, stages.indexOf(d.stage) + dir));
        return { ...d, stage: stages[idx] };
      }),
    );

  const visible = deals.filter((d) => (d.company + d.contact).toLowerCase().includes(query.toLowerCase()));
  const sel = deals.find((d) => d.id === selected);

  const statCards = [
    { label: "Open pipeline", value: eur(stats.pipeline), icon: TrendingUp },
    { label: "Gewonnen", value: eur(stats.won), icon: Trophy },
    { label: "Deals", value: String(stats.count), icon: Users },
    { label: "Conversie", value: `${stats.conversion}%`, icon: Percent },
  ];

  return (
    <DemoFrame title="CRM — salespipeline">
      <div className="p-4 md:p-5">
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {statCards.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-line p-3">
              <div className="flex items-center justify-between text-[11px] font-medium text-muted">
                {label}
                <Icon className="size-3.5" aria-hidden />
              </div>
              <motion.p key={value} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-lg font-semibold tabular-nums">
                {value}
              </motion.p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block sm:w-64">
            <span className="sr-only">Zoek een deal</span>
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Zoek bedrijf of contact…" className="w-full rounded-lg border border-line bg-offwhite py-2 pr-3 pl-9 text-sm focus:border-accent focus:outline-none" />
          </label>
          <p className="text-[11px] text-muted">Klik op een deal en verplaats hem naar een andere fase.</p>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_220px]">
          <div className="-mx-1 overflow-x-auto px-1 pb-1">
            <LayoutGroup>
              <div className="grid min-w-[620px] grid-cols-4 gap-2.5">
                {stages.map((stage) => {
                  const items = visible.filter((d) => d.stage === stage);
                  return (
                    <div key={stage} className="rounded-xl bg-offwhite p-2">
                      <div className="flex items-center justify-between px-1.5 py-1">
                        <p className="text-xs font-semibold">{stage}</p>
                        <span className="rounded-full bg-white px-1.5 text-[10px] font-semibold text-muted">{items.length}</span>
                      </div>
                      <div className="mt-1 min-h-28 space-y-2">
                        {items.map((d) => (
                          <motion.button
                            layout
                            layoutId={`deal-${d.id}`}
                            transition={{ type: "spring", stiffness: 400, damping: 34 }}
                            key={d.id}
                            type="button"
                            onClick={() => setSelected(d.id)}
                            aria-pressed={selected === d.id}
                            className={cn(
                              "w-full rounded-lg border bg-white p-2.5 text-left transition-shadow",
                              selected === d.id ? "border-accent shadow-[0_0_0_3px_rgb(65_105_255/0.15)]" : "border-line hover:shadow-md",
                            )}
                          >
                            <p className="truncate text-xs font-semibold">{d.company}</p>
                            <p className="mt-0.5 text-[11px] text-muted">{d.contact}</p>
                            <p className="mt-1.5 text-xs font-semibold text-accent tabular-nums">{eur(d.value)}</p>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>
          <div className="rounded-xl border border-line p-4">
            {sel ? (
              <div>
                <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">Geselecteerde deal</p>
                <p className="mt-2 font-semibold">{sel.company}</p>
                <p className="text-sm text-muted">{sel.contact}</p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-muted">Waarde</dt><dd className="font-semibold tabular-nums">{eur(sel.value)}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted">Fase</dt><dd className="font-semibold">{sel.stage}</dd></div>
                </dl>
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={() => move(sel.id, -1)} disabled={sel.stage === "Nieuw"} aria-label="Naar vorige fase" className="grid size-9 place-items-center rounded-lg ring-1 ring-line transition hover:bg-offwhite disabled:opacity-40">
                    <ArrowLeft className="size-4" aria-hidden />
                  </button>
                  <button type="button" onClick={() => move(sel.id, 1)} disabled={sel.stage === "Gewonnen"} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-3 text-xs font-semibold text-white transition hover:bg-accent-600 disabled:opacity-40">
                    Volgende fase <ArrowRight className="size-3.5" aria-hidden />
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted">Selecteer een deal om details te zien.</p>
            )}
            <button type="button" onClick={() => { setDeals(initialDeals); setSelected(3); setQuery(""); }} className="mt-4 text-[11px] font-medium text-muted underline underline-offset-2 hover:text-navy">
              Demo resetten
            </button>
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
