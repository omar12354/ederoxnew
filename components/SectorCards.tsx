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
            <Link href={`/sectoren#${s.slug}`}
              className="group relative flex h-full min-h-[450px] flex-col justify-end overflow-hidden rounded-[26px] bg-navy text-white shadow-[0_12px_40px_-25px_rgb(11_18_38/0.5)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_36px_65px_-30px_rgb(11_18_38/0.6)] focus-visible:outline-offset-4">
              <PhotoSlot src={s.image} alt={s.imageAlt} sizes="(min-width: 768px) 33vw, 100vw"
                className="absolute inset-0 h-full w-full" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0b1226] via-[#0b1226]/70 to-[#0b1226]/5 transition-opacity duration-500 group-hover:opacity-90" />
              <span className="absolute left-6 top-6 grid size-12 place-items-center rounded-2xl border border-white/25 bg-white/15 text-white backdrop-blur-xl">
                <Icon className="size-5" aria-hidden />
              </span>
              <div className="relative z-10 p-7">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b7c6ff]">Sector 0{i + 1}</p>
                <h3 className="text-2xl font-semibold tracking-tight text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{s.text}</p>
                <span className="mt-7 flex items-center gap-2 border-t border-white/20 pt-5 text-sm font-semibold text-white">
                  Bekijk de mogelijkheden
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
