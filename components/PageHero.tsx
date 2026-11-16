import { Reveal } from "./Reveal";

export function PageHero({ eyebrow, title, text, children }: { eyebrow: string; title: string; text?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24">
      <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="container-x relative">
        <Reveal className="max-w-4xl">
          <p className="eyebrow mb-6">{eyebrow}</p>
          <h1 className="text-[2.5rem] leading-[1.04] font-semibold text-navy sm:text-6xl md:text-7xl">{title}</h1>
          {text && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{text}</p>}
          {children && <div className="mt-10">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
