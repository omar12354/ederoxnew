import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_10px_30px_-10px_rgb(65_105_255/0.7)] hover:bg-accent-600 hover:shadow-[0_14px_36px_-10px_rgb(65_105_255/0.85)]",
  secondary: "bg-white text-navy ring-1 ring-line hover:ring-navy/25 hover:bg-white",
  ghost: "text-navy hover:bg-navy/5",
  light: "bg-white text-navy hover:bg-offwhite",
  "outline-light": "text-white ring-1 ring-white/25 hover:ring-white/60 hover:bg-white/5",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  size?: "md" | "lg";
};

export function Button({ href, children, variant = "primary", arrow = false, className, size = "md" }: Props) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative inline-flex min-h-11 whitespace-nowrap items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-all duration-300 ease-[var(--ease-premium)] active:scale-[0.98]",
        size === "lg" ? "px-7 py-3.5 text-[0.95rem]" : "px-5 py-2.5 text-sm",
        styles[variant],
        className,
      )}
    >
      <span className="relative">{children}</span>
      {arrow && (
        <span className="relative inline-flex w-4 overflow-hidden" aria-hidden>
          <ArrowRight className="size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-premium)] group-hover:translate-x-4" />
          <ArrowRight className="absolute size-4 shrink-0 -translate-x-4 transition-transform duration-300 ease-[var(--ease-premium)] group-hover:translate-x-0" />
        </span>
      )}
    </Link>
  );
}
