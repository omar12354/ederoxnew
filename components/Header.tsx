"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/content";
import { bookingHref, cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Button } from "./Button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-premium)]",
        scrolled || open
          ? "border-b border-line/80 bg-white/75 shadow-[0_8px_30px_-18px_rgb(11_18_38/0.25)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow">
        Naar de inhoud
      </a>
      <div className={cn("container-x flex items-center justify-between transition-all duration-500", scrolled ? "h-16" : "h-20")}>
        <Logo />
        <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive(item.href) ? "text-navy" : "text-muted hover:text-navy",
                  )}
                >
                  {isActive(item.href) && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-navy/[0.06]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href={bookingHref()} arrow>
              Plan een kennismaking
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobiel-menu"
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            className="grid size-11 place-items-center rounded-full text-navy ring-1 ring-line transition hover:bg-navy/5 lg:hidden"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span key={open ? "x" : "m"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobiel-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-white lg:hidden"
          >
            <nav aria-label="Mobiele navigatie" className="container-x flex flex-col pt-6 pb-32">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-line"
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn("flex items-center justify-between py-4 text-2xl font-semibold tracking-tight", isActive(item.href) ? "text-accent" : "text-navy")}
                    >
                      {item.label}
                      <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8">
                <Button href={bookingHref()} size="lg" arrow className="w-full">
                  Plan een kennismaking
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
