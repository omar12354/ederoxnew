import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { getService, services } from "@/lib/content";
import { icons } from "@/lib/icons";
import { inSentence } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: `/oplossingen/${s.slug}` },
    openGraph: { title: `${s.title} | Ederox`, description: s.description },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const Icon = icons[service.icon];
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[700px] rounded-full bg-accent/10 blur-3xl" />
        <div className="container-x relative">
          <Reveal>
            <Link href="/oplossingen" className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-navy">
              <ArrowLeft className="size-4" aria-hidden /> Alle oplossingen
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <span className="grid size-16 place-items-center rounded-2xl bg-accent text-white shadow-[0_16px_40px_-14px_rgb(65_105_255/0.8)]">
                <Icon className="size-7" aria-hidden />
              </span>
              <h1 className="mt-8 text-[2.5rem] leading-[1.04] font-semibold text-navy sm:text-6xl md:text-7xl">{service.title}</h1>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">{service.description}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href={`/contact?oplossing=${service.slug}#formulier`} size="lg" arrow>Bespreek jouw project</Button>
                <Button href="#werkwijze" size="lg" variant="secondary">Bekijk de werkwijze</Button>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="rounded-[22px] border border-line bg-white p-7">
                <h2 className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Waar je aan kunt denken</h2>
                <ul className="mt-5 space-y-3">
                  {service.examples.map((e) => (
                    <li key={e} className="flex items-center gap-3 text-navy">
                      <CheckCircle2 className="size-5 shrink-0 text-accent" aria-hidden /> {e}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-20 md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-5" eyebrow="Waarom" title="Wat het jouw bedrijf oplevert." />
          <Reveal className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-muted">{service.intro}</p>
          </Reveal>
        </div>
        <div className="container-x mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {service.benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl bg-offwhite p-6">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold text-navy">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Toepassingen" title="Zo zetten we het in de praktijk in." />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {service.applications.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06}>
                <div className="group h-full rounded-2xl border border-line bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgb(11_18_38/0.35)]">
                  <h3 className="text-xl font-semibold text-navy">{a.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="werkwijze" className="grain relative overflow-hidden bg-navy py-20 text-white md:py-28">
        <div className="grid-lines-dark pointer-events-none absolute inset-0" />
        <div className="container-x relative">
          <SectionHeading dark eyebrow="Werkwijze" title="Van eerste gesprek tot werkende oplossing." />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-4">
            {service.process.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="h-full bg-navy p-7">
                  <span className="grid size-10 place-items-center rounded-full bg-accent font-mono text-xs font-semibold">0{i + 1}</span>
                  <h3 className="mt-6 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title={`Klaar om te starten met ${inSentence(service.title)}?`} text="Vertel ons over je situatie, ook als je vraag verder gaat dan deze dienst. We zoeken samen naar de juiste technologische aanpak." />

      <section className="pb-24" aria-labelledby="andere-title">
        <div className="container-x">
          <h2 id="andere-title" className="text-2xl font-semibold text-navy">Andere oplossingen</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {others.map((o) => {
              const OIcon = icons[o.icon];
              return (
                <Link key={o.slug} href={`/oplossingen/${o.slug}`} className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition hover:border-accent/40">
                  <span className="grid size-11 place-items-center rounded-xl bg-accent-50 text-accent"><OIcon className="size-5" aria-hidden /></span>
                  <span className="flex-1 font-semibold text-navy">{o.title}</span>
                  <ArrowUpRight className="size-4 text-muted transition group-hover:text-accent" aria-hidden />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
