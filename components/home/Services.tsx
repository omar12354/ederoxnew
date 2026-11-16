import { services } from "@/lib/content";
import { SectionHeading } from "../SectionHeading";
import { ServiceCard } from "../ServiceCard";

export function Services() {
  return (
    <section id="oplossingen" className="py-24 md:py-32" aria-labelledby="oplossingen-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="oplossingen-title"
            eyebrow="Onze oplossingen"
            title="Alles wat jouw bedrijf digitaal verder brengt."
            text="Van een slim idee tot een compleet digitaal systeem. Wij ontwikkelen oplossingen die aansluiten op jouw bedrijf."
          />
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
