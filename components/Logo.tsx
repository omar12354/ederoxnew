import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="Ederox — naar de homepage"
      className={cn("group inline-flex shrink-0 items-center transition-opacity hover:opacity-85", className)}>
      {dark ? (
        <span className="inline-flex items-center gap-2.5">
          <svg viewBox="0 0 64 64" className="size-8 shrink-0" aria-hidden="true">
            <rect x="0" y="0" width="64" height="64" rx="16" fill="#4667ff" />
            <path d="M21 20h24M21 32h17M21 44h24" stroke="#fff" strokeWidth="5.5" strokeLinecap="round"/>
          </svg>
          <span className="text-[1.5rem] font-semibold tracking-[-0.055em] text-white">ederox<span className="text-[#7290ff]">.</span></span>
        </span>
      ) : (
        <Image src="/images/ederox-logo.png" alt="Ederox" width={310} height={87}
          priority className="h-auto w-[142px] object-contain sm:w-[158px]" />
      )}
    </Link>
  );
}
