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
            <Link href={`/sectoren#${s.slug}`} className="group relative flex min-h-[440px] h-full flex-col justify-end overflow-hidden rounded-[26px] border border-white/10 bg-navy text-white transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_35px_80px_-25px_rgb(11_18_38/0.5)]">
              <div className="absolute inset-0 overflow-hidden">
                <div className="h-full w-full transition-transform duration-1000 ease-[var(--ease-premium)] group-hover:scale-110">
                  <PhotoSlot src={s.image} alt={s.imageAlt} label="Sectorfoto volgt" requiredFile={`public/images/sectoren/${s.slug}.jpg`} sizes="(min-width: 768px) 33vw, 100vw" tone={i === 1 ? "dark" : "light"} className="h-full w-full" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/65 to-navy/10" />
                <span className="absolute top-6 left-6 grid size-12 place-items-center rounded-xl border border-white/30 bg-white/15 text-white shadow-sm backdrop-blur-md">
                  <Icon className="size-5" aria-hidden />
                </span>
              </div>
              <div className="relative z-10 flex flex-col p-7 md:p-8">
                <h3 className="text-2xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-white/75">{s.text}</p>
                <span className="mt-7 inline-flex items-center gap-1.5 border-t border-white/20 pt-5 text-sm font-semibold text-cyan-200">
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
