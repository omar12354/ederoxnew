import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string | null;
  alt: string;
  /** Initialen die getoond worden als er (nog) geen foto is, bijv. bij een portret. */
  monogram?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  tone?: "dark" | "light";
};

/**
 * Toont een foto zodra `src` is ingesteld. Zonder foto verschijnt een rustig, decoratief merkvlak
 * (eventueel met initialen), zodat er nooit willekeurige personen of lege kaders zichtbaar zijn.
 */
export function PhotoSlot({ src, alt, monogram, className, priority, sizes = "100vw", tone = "dark" }: Props) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.055]" />
      </div>
    );
  }
  const dark = tone === "dark";
  return (
    <div
      {...(monogram ? { role: "img", "aria-label": alt } : { "aria-hidden": true })}
      className={cn(
        "grain relative overflow-hidden",
        dark ? "bg-[radial-gradient(120%_90%_at_20%_10%,#22306a_0%,#111a33_45%,#0b1226_100%)] text-white" : "bg-[radial-gradient(120%_90%_at_20%_10%,#ffffff_0%,#eef2ff_55%,#e3e8f7_100%)] text-navy",
        className,
      )}
    >
      <div className={cn("absolute inset-0", dark ? "grid-lines-dark" : "grid-lines")} />
      <div className="absolute -top-1/4 -right-1/4 size-[70%] rounded-full bg-accent/30 blur-3xl" />
      <div className="absolute -bottom-1/3 -left-1/4 size-[60%] rounded-full bg-accent/15 blur-3xl" />
      {monogram && (
        <div className="relative flex h-full items-center justify-center">
          <span className="text-6xl font-semibold tracking-[-0.04em] opacity-90">{monogram}</span>
        </div>
      )}
    </div>
  );
}
