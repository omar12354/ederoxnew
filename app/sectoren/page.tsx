import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { sectors, getService } from "@/lib/content";
import { icons } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Sectoren",
  description: "Technologie voor zorg & praktijken, zakelijke dienstverlening en het mkb. Ontdek welke oplossingen bij jouw branche passen.",
  alternates: { canonical: "/sectoren" },
};

export default function SectorenPage() {
  return (
    <>
      <PageHero eyebrow="Sectoren" title="Technologie voor iedere branche." text="Elke sector kent eigen processen en uitdagingen. Wij verdiepen ons in jouw praktijk en bouwen oplossingen die daar echt op aansluiten." />
      <div className="pb-12">
        {sectors.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <section key={s.slug} id={s.slug} className="scroll-mt-24 py-12 md:py-16" aria-labelledby={`${s.slug}-title`}>
              <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal className={i % 2 ? "lg:order-2" : ""}>
                  <div className="aspect-[4/3] overflow-hidden rounded-[24px]">
                    <PhotoSlot src={s.image} alt={s.imageAlt} sizes="(min-width: 1024px) 50vw, 100vw" tone={i === 1 ? "dark" : "light"} className="h-full w-full" />
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <span className="grid size-12 place-items-center rounded-xl bg-accent-50 text-accent"><Icon className="size-5" aria-hidden /></span>
                  <h2 id={`${s.slug}-title`} className="mt-6 text-3xl font-semibold text-navy sm:text-4xl">{s.title}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">{s.text}</p>
                  <h3 className="mt-8 text-sm font-semibold text-navy">Herkenbare uitdagingen</h3>
                  <ul className="mt-3 space-y-2.5">
                    {s.needs.map((n) => (
                      <li key={n} className="flex gap-3 text-navy/80"><Check className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden /> {n}</li>
                    ))}
                  </ul>
                  <h3 className="mt-8 text-sm font-semibold text-navy">Passende oplossingen</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.relatedServices.map((slug) => {
                      const svc = getService(slug)!;
                      return (
                        <Link key={slug} href={`/oplossingen/${slug}`} className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy transition hover:border-accent hover:text-accent">
                          {svc.title}
                          <ArrowUpRight className="size-3.5" aria-hidden />
                        </Link>
                      );
                    })}
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>
      <CtaBand title="Staat jouw branche er niet tussen?" text="Geen probleem. De uitdagingen zijn vaak vergelijkbaar. Vertel ons over jouw organisatie, dan denken we met je mee." />
    </>
  );
}
