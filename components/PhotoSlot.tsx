import Image from "next/image";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  src: string | null;
  alt: string;
  /** Bestandspad dat nodig is wanneer er nog geen foto is (wordt getoond in de placeholder) */
  requiredFile?: string;
  label?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  tone?: "dark" | "light";
};

/**
 * Toont een echte foto zodra `src` is ingesteld. Tot die tijd een nette, duidelijk gemarkeerde placeholder
 * — zodat er nooit willekeurige personen als oprichters worden getoond.
 */
export function PhotoSlot({ src, alt, requiredFile, label = "Foto volgt", className, priority, sizes = "100vw", tone = "dark" }: Props) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
    );
  }
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${alt}`}
      className={cn(
        "grain relative overflow-hidden",
        dark ? "bg-[radial-gradient(120%_90%_at_20%_10%,#22306a_0%,#111a33_45%,#0b1226_100%)] text-white" : "bg-[radial-gradient(120%_90%_at_20%_10%,#ffffff_0%,#eef2ff_55%,#e3e8f7_100%)] text-navy",
        className,
      )}
    >
      <div className={cn("absolute inset-0", dark ? "grid-lines-dark" : "grid-lines")} />
      <div className="absolute -top-1/4 -right-1/4 size-[70%] rounded-full bg-accent/30 blur-3xl" />
      <div className={cn("absolute inset-3 rounded-[inherit] border border-dashed", dark ? "border-white/15" : "border-navy/15")} />
      <div className="relative flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <span className={cn("grid size-12 place-items-center rounded-full", dark ? "bg-white/10" : "bg-white shadow-sm")}>
          <Camera className="size-5" aria-hidden />
        </span>
        <p className="text-sm font-semibold">{label}</p>
        {requiredFile && <code className={cn("max-w-full rounded-md px-2 py-1 font-mono text-[11px] break-all", dark ? "bg-white/10 text-white/70" : "bg-navy/5 text-muted")}>{requiredFile}</code>}
      </div>
    </div>
  );
}
