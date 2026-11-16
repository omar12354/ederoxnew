import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Ederox — naar de homepage"
      className={cn("group inline-flex items-center gap-2 text-[1.35rem] font-semibold tracking-[-0.04em]", dark ? "text-white" : "text-navy", className)}
    >
      <span aria-hidden className="relative grid size-7 place-items-center rounded-[9px] bg-accent text-white shadow-[0_6px_18px_-6px_rgb(65_105_255/0.8)] transition-transform duration-500 ease-[var(--ease-premium)] group-hover:rotate-[-8deg]">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M6 7h12M6 12h8M6 17h12" />
        </svg>
      </span>
      <span>
        ederox<span className="text-accent">.</span>
      </span>
    </Link>
  );
}
