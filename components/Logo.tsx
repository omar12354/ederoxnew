import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="Ederox — naar de homepage"
      className={cn("group inline-flex items-center gap-2.5", className)}>
      <svg aria-hidden viewBox="0 0 64 64" className="size-9 shrink-0 transition-transform duration-500 group-hover:scale-110">
        <defs><linearGradient id="ederox-mark" x1="0" x2="1" y1="0" y2="0"><stop stopColor="#00D2E8"/><stop offset="1" stopColor="#53F4F5"/></linearGradient></defs>
        <rect x="5" y="9" width="45" height="10" rx="5" fill="url(#ederox-mark)"/>
        <rect x="5" y="26" width="29" height="10" rx="5" fill="url(#ederox-mark)"/>
        <path d="M37 27l14 14" stroke="#0089A6" strokeWidth="9" strokeLinecap="round"/>
        <path d="M5 47h46v9H5z" fill="url(#ederox-mark)"/>
      </svg>
      <span className={cn("text-[1.5rem] font-semibold tracking-[-0.055em]", dark ? "text-white" : "text-navy")}>Ederox</span>
    </Link>
  );
}
