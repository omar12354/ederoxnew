import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FounderCards } from "@/components/FounderCards";
import { WhyGrid } from "@/components/WhyGrid";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Over ons",
  description: "Ederox combineert technische kennis met een persoonlijke aanpak. Maak kennis met de oprichters en onze manier van werken.",
  alternates: { canonical: "/over-ons" },
};

const values = [
  { title: "Helder", text: "We leggen uit wat we doen en waarom, zonder onnodig jargon." },
  { title: "Praktisch", text: "We kiezen de oplossing die het meeste oplevert, niet de meest ingewikkelde." },
  { title: "Betrokken", text: "We denken mee als partner en blijven ook na de lancering beschikbaar." },
];

export default function OverOnsPage() {
  return (
    <>
      <PageHero eyebrow="Over Ederox" title="Technologie is ons vak. Samenwerken onze kracht." text="Ederox is ontstaan vanuit de overtuiging dat goede technologie niet ingewikkeld hoeft te zijn. Wij combineren technische kennis met een persoonlijke aanpak en bouwen oplossingen die daadwerkelijk waarde toevoegen." />

      <section className="pb-24" aria-labelledby="team-title">
        <div className="container-x">
          <SectionHeading id="team-title" eyebrow="Het team" title="De mensen achter Ederox." text="Bij ons werk je direct samen met de oprichters, van het eerste gesprek tot de oplevering en daarna." />
          <div className="mt-12"><FounderCards /></div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-24 md:py-32" aria-labelledby="missie-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading id="missie-title" className="lg:col-span-5" eyebrow="Onze missie" title="Slimmer werken, efficiënter groeien." />
          <Reveal className="lg:col-span-7">
            <p className="text-xl leading-relaxed text-navy/80">
              Wij helpen bedrijven slimmer werken, efficiënter groeien en hun digitale mogelijkheden optimaal benutten door praktische en innovatieve technologische oplossingen te ontwikkelen.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {values.map((v) => (
                <div key={v.title} className="border-t-2 border-accent pt-4">
                  <h3 className="font-semibold text-navy">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{v.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <ProcessTimeline />

      <section className="pb-8" aria-labelledby="waarom-title">
        <div className="container-x">
          <SectionHeading id="waarom-title" eyebrow="Waarom Ederox?" title="Meer dan een leverancier. Een technologiepartner." />
          <div className="mt-12"><WhyGrid /></div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
