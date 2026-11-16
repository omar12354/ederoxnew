import { founders } from "@/lib/content";
import { PhotoSlot } from "./PhotoSlot";
import { Reveal } from "./Reveal";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function FounderCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {founders.map((f, i) => (
        <Reveal key={f.id} delay={i * 0.08}>
          <article className="group overflow-hidden rounded-[22px] border border-line bg-white">
            <div className="relative aspect-[4/5] overflow-hidden">
              <div className="h-full w-full transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.04]">
                <PhotoSlot src={f.photo} alt={f.name ? `Portret van ${f.name}` : `Portret van oprichter ${i + 1}`} label={`Portret oprichter ${i + 1} volgt`} requiredFile={f.photoFile} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" tone={i % 2 ? "light" : "dark"} className="h-full w-full" />
              </div>
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className={f.name ? "text-lg font-semibold text-navy" : "text-lg font-semibold text-navy/40"}>{f.name ?? "Naam volgt"}</h3>
                  <p className="text-sm text-accent">{f.role ?? "Functie volgt"}</p>
                </div>
                {f.linkedin ? (
                  <a href={f.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn-profiel van ${f.name ?? `oprichter ${i + 1}`}`} className="grid size-10 place-items-center rounded-full text-navy ring-1 ring-line transition hover:bg-accent hover:text-white hover:ring-accent">
                    <LinkedInIcon className="size-4" />
                  </a>
                ) : (
                  <span title="LinkedIn-profiel volgt" className="grid size-10 place-items-center rounded-full text-navy/25 ring-1 ring-line ring-dashed">
                    <LinkedInIcon className="size-4" />
                    <span className="sr-only">LinkedIn-profiel volgt</span>
                  </span>
                )}
              </div>
              <p className={f.intro ? "mt-4 text-sm leading-relaxed text-muted" : "mt-4 text-sm leading-relaxed text-muted/70 italic"}>
                {f.intro ?? "Korte introductie wordt nog aangevuld."}
              </p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
