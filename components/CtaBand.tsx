import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { bookingHref } from "@/lib/utils";

export function CtaBand({ title = "Benieuwd wat wij voor jouw bedrijf kunnen doen?", text = "Plan een vrijblijvende kennismaking. We denken graag met je mee, ook als je nog geen concreet plan hebt." }: { title?: string; text?: string }) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="grain relative overflow-hidden rounded-[28px] bg-navy px-7 py-14 text-white md:px-16 md:py-20">
            <div className="grid-lines-dark pointer-events-none absolute inset-0" />
            <div className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-accent/35 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <h2 className="text-3xl leading-tight font-semibold sm:text-5xl">{title}</h2>
                <p className="mt-4 text-lg text-white/65">{text}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href={bookingHref()} size="lg" arrow>Plan een kennismaking</Button>
                <Button href="/contact#formulier" size="lg" variant="outline-light">Stuur ons een bericht</Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
