import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sectors } from "@/lib/content";
import { icons } from "@/lib/icons";
import { PhotoSlot } from "./PhotoSlot";
import { Reveal } from "./Reveal";

export function SectorCards() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {sectors.map((s, i) => {
        const Icon = icons[s.icon];
        return (
          <Reveal key={s.slug} delay={i * 0.08} className="h-full">
            <Link href={`/sectoren#${s.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(11_18_38/0.35)]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="h-full w-full transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.04]">
                  <PhotoSlot src={s.image} alt={s.imageAlt} label="Sectorfoto volgt" requiredFile={`public/images/sectoren/${s.slug}.jpg`} sizes="(min-width: 768px) 33vw, 100vw" tone={i === 1 ? "dark" : "light"} className="h-full w-full" />
                </div>
                <span className="absolute top-4 left-4 grid size-11 place-items-center rounded-xl bg-white/90 text-accent shadow-sm backdrop-blur">
                  <Icon className="size-5" aria-hidden />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-xl font-semibold text-navy">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-navy">
                  Bekijk de mogelijkheden
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
