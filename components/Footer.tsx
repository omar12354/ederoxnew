import Link from "next/link";
import { navItems, services } from "@/lib/content";
import { bookingHref } from "@/lib/utils";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="grid-lines-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-x relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo dark />
            <p className="mt-5 max-w-sm text-white/60">
              Technologie die jouw bedrijf vooruithelpt. Automatisering, software op maat, websites en systeemintegraties voor
              Nederlandse ondernemers.
            </p>
            <Link href={bookingHref()} className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white underline decoration-accent decoration-2 underline-offset-[6px] transition hover:decoration-white">
              Plan een kennismaking
            </Link>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-xs font-semibold tracking-[0.16em] text-white/40 uppercase">Navigatie</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navItems.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-white/70 transition hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-xs font-semibold tracking-[0.16em] text-white/40 uppercase">Oplossingen</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/oplossingen/${s.slug}`} className="text-white/70 transition hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-xs font-semibold tracking-[0.16em] text-white/40 uppercase">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>
                <Link href="/contact" className="transition hover:text-white">
                  Stuur ons een bericht
                </Link>
              </li>
              <li className="text-white/40">ederox.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ederox. Alle rechten voorbehouden.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition hover:text-white">
              Privacyverklaring
            </Link>
            <Link href="/sitemap.xml" className="transition hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none relative -mb-[0.18em] text-center text-[22vw] leading-none font-semibold tracking-[-0.06em] text-white/[0.035] select-none">
        ederox
      </p>
    </footer>
  );
}
