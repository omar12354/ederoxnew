import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { Showcase } from "@/components/home/Showcase";
import { SolutionFinder } from "@/components/SolutionFinder";
import { CtaBand } from "@/components/CtaBand";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Oplossingen",
  description: "Automatisering & AI, software op maat, websites en systeemintegraties. Ontdek hoe Ederox jouw bedrijf digitaal verder brengt.",
  alternates: { canonical: "/oplossingen" },
};

export default function OplossingenPage() {
  return (
    <>
      <PageHero eyebrow="Oplossingen" title="Alles wat jouw bedrijf digitaal verder brengt." text="Van een slim idee tot een compleet digitaal systeem. Wij ontwikkelen oplossingen die aansluiten op jouw bedrijf, niet andersom." />
      <section className="pb-24 md:pb-32" aria-label="Onze diensten">
        <div className="container-x grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>
      <Showcase />
      <SolutionFinder />
      <CtaBand />
    </>
  );
}
