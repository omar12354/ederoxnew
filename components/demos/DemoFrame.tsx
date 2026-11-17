import { cn } from "@/lib/utils";

export function DemoFrame({ title, children, className, actions }: { title: string; children: React.ReactNode; className?: string; actions?: React.ReactNode }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-white/10 bg-white text-navy shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-line bg-offwhite px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <p className="truncate text-xs font-medium text-muted">{title}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {actions}
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-amber-800 uppercase">Demo</span>
        </div>
      </div>
      {children}
    </div>
  );
}
