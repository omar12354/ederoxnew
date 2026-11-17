import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Showcase } from "@/components/home/Showcase";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { SectorCards } from "@/components/SectorCards";
import { FounderCards } from "@/components/FounderCards";
import { WhyGrid } from "@/components/WhyGrid";
import { SolutionFinder } from "@/components/SolutionFinder";
import { ContactSection } from "@/components/ContactSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { publishedFounders, values } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Showcase />
      <ProcessTimeline />

      <section className="border-y border-line bg-white py-24 md:py-32" aria-labelledby="sectoren-title">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading id="sectoren-title" eyebrow="Sectoren" title="Technologie voor iedere branche." text="Elke sector heeft eigen uitdagingen. Wij vertalen technologie naar oplossingen die passen bij jouw dagelijkse praktijk." />
            <Button href="/sectoren" variant="secondary" arrow className="shrink-0">Alle sectoren</Button>
          </div>
          <div className="mt-14">
            <SectorCards />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32" aria-labelledby="over-title">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <SectionHeading id="over-title" className="lg:col-span-7" eyebrow="Over Ederox" title="Technologie is ons vak. Samenwerken onze kracht." />
            <div className="lg:col-span-5">
              <p className="text-lg leading-relaxed text-muted">
                Ederox is ontstaan vanuit de overtuiging dat goede technologie niet ingewikkeld hoeft te zijn. Wij combineren technische kennis met een persoonlijke aanpak en bouwen oplossingen die daadwerkelijk waarde toevoegen.
              </p>
              <Button href="/over-ons" variant="ghost" arrow className="mt-4 -ml-5">Meer over ons</Button>
            </div>
          </div>
          <div className="mt-14">
            {publishedFounders.length > 0 ? (
              <FounderCards />
            ) : (
              <div className="grid gap-5 md:grid-cols-3">
                {values.map((v, i) => (
                  <Reveal key={v.title} delay={i * 0.08}>
                    <div className="h-full rounded-[22px] border border-line bg-white p-7 md:p-8">
                      <span className="font-mono text-xs text-accent">0{i + 1}</span>
                      <h3 className="mt-6 text-2xl font-semibold text-navy">{v.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted">{v.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pb-8 md:pb-12" aria-labelledby="waarom-title">
        <div className="container-x">
          <SectionHeading id="waarom-title" eyebrow="Waarom Ederox?" title="Meer dan een leverancier. Een technologiepartner." />
          <div className="mt-14">
            <WhyGrid />
          </div>
        </div>
      </section>

      <SolutionFinder />
      <ContactSection />
    </>
  );
}
