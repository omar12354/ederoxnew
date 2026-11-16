import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, FlaskConical, Info } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Showcase } from "@/components/home/Showcase";
import { CtaBand } from "@/components/CtaBand";
import { demoProjects, getService } from "@/lib/content";
import { icons } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Ons werk",
  description: "Bekijk demonstratieprojecten van Ederox: digitale receptie, CRM op maat, systeemkoppelingen en boekingsplatforms.",
  alternates: { canonical: "/ons-werk" },
};

const projectPhotos: Record<string, string> = {
  "digitale-receptie": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85",
  "crm-adviesbureau": "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
  "webshop-koppeling": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
  boekingsplatform: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
};

export default function OnsWerkPage() {
  return (
    <>
      <PageHero eyebrow="Ons werk" title="Zo kan technologie er voor jou uitzien." text="Hieronder vind je demonstratieprojecten die laten zien hoe wij typische vraagstukken aanpakken.">
        <p className="inline-flex max-w-2xl items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>
            <strong>Let op:</strong> dit zijn demonstratieprojecten met fictieve organisaties. Het zijn geen echte klantcases. Zodra er gepubliceerde klantcases zijn, vind je ze hier.
          </span>
        </p>
      </PageHero>

      <section className="pb-24" aria-label="Demonstratieprojecten">
        <div className="container-x grid gap-5 md:grid-cols-2">
          {demoProjects.map((p, i) => {
            const svc = getService(p.service)!;
            const Icon = icons[svc.icon];
            return (
              <Reveal key={p.slug} delay={(i % 2) * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(11_18_38/0.35)]">
                  <div className="relative aspect-[16/9] overflow-hidden bg-navy">
                    <Image src={projectPhotos[p.slug]} alt={`Illustratieve foto bij demo: ${p.title}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-7 md:p-9">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-amber-800 uppercase">
                      <FlaskConical className="size-3" aria-hidden /> Demonstratieproject
                    </span>
                    <span className="rounded-full bg-offwhite px-2.5 py-1 text-[11px] font-medium text-muted">{p.sector}</span>
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold text-navy">{p.title}</h2>
                  <dl className="mt-6 space-y-5">
                    <div>
                      <dt className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Uitdaging</dt>
                      <dd className="mt-1.5 leading-relaxed text-navy/80">{p.challenge}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Aanpak</dt>
                      <dd className="mt-1.5 leading-relaxed text-navy/80">{p.solution}</dd>
                    </div>
                  </dl>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.shows.map((s) => (
                      <li key={s} className="rounded-full border border-line px-3 py-1 text-xs font-medium text-navy/70">{s}</li>
                    ))}
                  </ul>
                  <Link href={`/oplossingen/${svc.slug}`} className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-navy">
                    <span className="grid size-8 place-items-center rounded-lg bg-accent-50 text-accent"><Icon className="size-4" aria-hidden /></span>
                    {svc.title}
                    <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
      <Showcase />
      <CtaBand title="Een vergelijkbare uitdaging?" text="Vertel ons waar je tegenaan loopt. We laten graag zien hoe we het voor jouw organisatie zouden aanpakken." />
    </>
  );
}
