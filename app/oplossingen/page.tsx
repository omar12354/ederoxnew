import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { Showcase } from "@/components/home/Showcase";
import { SolutionFinder } from "@/components/SolutionFinder";
import { CtaBand } from "@/components/CtaBand";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Oplossingen",
  description: "Hulp bij technologische uitdagingen en digitale groei. Ontdek onze expertise in software, automatisering, websites en systeemintegraties.",
  alternates: { canonical: "/oplossingen" },
};

export default function OplossingenPage() {
  return (
    <>
      <PageHero eyebrow="Oplossingen" title="De juiste technologie voor jouw uitdaging." text="Van een technisch probleem tot een ambitieus digitaal plan. We helpen organisaties met advies, ontwikkeling en praktische oplossingen — ook wanneer de vraag niet in één van onze diensten past." />
      <section className="pb-24 md:pb-32" aria-label="Onze diensten">
        <div className="container-x grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>
      <section className="pb-20 md:pb-28" aria-labelledby="andere-uitdaging-title">
        <div className="container-x">
          <div className="rounded-[24px] border border-line bg-white p-8 md:p-12">
            <h2 id="andere-uitdaging-title" className="text-2xl font-semibold text-navy md:text-3xl">Staat jouw technologische uitdaging er niet tussen?</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">Geen probleem. We onderzoeken samen wat er speelt en welke aanpak jouw organisatie verder helpt. Je hoeft nog niet te weten welke oplossing je nodig hebt.</p>
            <a href="/contact?oplossing=overig#formulier" className="mt-7 inline-flex min-h-11 items-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition hover:bg-accent-600">Bespreek jouw uitdaging</a>
          </div>
        </div>
      </section>
      <Showcase />
      <SolutionFinder />
      <CtaBand />
    </>
  );
}
