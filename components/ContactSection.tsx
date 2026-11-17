import { Suspense } from "react";
import { Button } from "./Button";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { bookingHref } from "@/lib/utils";
import { CalendarClock, MessageSquareText, ShieldCheck } from "lucide-react";

export function ContactSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  return (
    <section id="contact" className="grain relative overflow-hidden bg-navy py-24 text-white md:py-32" aria-labelledby="contact-title">
      <div className="grid-lines-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_20%_30%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-32 -left-40 size-[600px] rounded-full bg-accent/25 blur-[120px]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-6">Contact</p>
          <H id="contact-title" className="text-[2.25rem] leading-[1.05] font-semibold sm:text-6xl">
            Waar kunnen we jouw bedrijf mee helpen?
          </H>
          <p className="mt-6 text-lg leading-relaxed text-white/65">
            Loop je tegen een technisch probleem aan, wil je jouw systemen verbeteren of zoek je een partner voor digitale ontwikkeling? Vertel ons wat er speelt. Ook zonder uitgewerkt plan denken we met je mee.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={bookingHref()} size="lg" arrow>
              Plan een kennismaking
            </Button>
            <Button href="#formulier" size="lg" variant="outline-light">
              Stuur ons een bericht
            </Button>
          </div>
          <ul className="mt-12 space-y-4 text-sm text-white/70">
            <li className="flex items-center gap-3"><CalendarClock className="size-4 text-accent" aria-hidden /> Vrijblijvende kennismaking van ongeveer 30 minuten</li>
            <li className="flex items-center gap-3"><MessageSquareText className="size-4 text-accent" aria-hidden /> Direct contact met de mensen die het bouwen</li>
            <li className="flex items-center gap-3"><ShieldCheck className="size-4 text-accent" aria-hidden /> Je gegevens gebruiken we alleen om contact op te nemen</li>
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="rounded-[24px] bg-white p-6 text-navy shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] md:p-10">
            <h3 className="text-xl font-semibold">Stuur ons een bericht</h3>
            <div className="mt-6">
              <Suspense fallback={<div className="h-[600px]" />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
