"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import type { Service } from "@/lib/content";
import { icons } from "@/lib/icons";
import { inSentence } from "@/lib/utils";

const servicePhotos: Record<string, string> = {
  "automatisering-ai": "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1000&q=85",
  "software-op-maat": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=85",
  "websites-platforms": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85",
  systeemintegraties: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=85",
};

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = icons[service.icon];
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full"
    >
      {/* border-glow */}
      <div aria-hidden className="absolute -inset-px rounded-[22px] bg-gradient-to-br from-accent/60 via-accent/0 to-accent/30 opacity-0 blur-[2px] transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100" />
      <Link
        href={`/oplossingen/${service.slug}`}
        className="relative flex h-full flex-col overflow-hidden rounded-[21px] border border-line bg-white transition-all duration-500 ease-[var(--ease-premium)] group-hover:-translate-y-1.5 group-hover:border-transparent group-hover:shadow-[0_30px_60px_-30px_rgb(11_18_38/0.35)] focus-visible:outline-offset-4"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-navy">
          <Image src={servicePhotos[service.slug]} alt={`Visuele impressie van ${service.title.toLowerCase()}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/45 to-transparent" />
        </div>
        <div className="flex flex-1 flex-col p-7 md:p-8">
        <div className="flex items-start justify-between">
          <span className="relative grid size-14 place-items-center rounded-2xl bg-accent-50 text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
            <Icon className="size-6 transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-110 group-hover:-rotate-6" aria-hidden />
          </span>
          <span className="font-mono text-xs text-muted">0{index + 1}</span>
        </div>
        <h3 className="mt-8 text-2xl font-semibold text-navy">{service.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{service.description}</p>
        <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
          {service.examples.map((ex) => (
            <li key={ex} className="flex items-center gap-2.5 text-sm text-navy/80">
              <Check className="size-4 shrink-0 text-accent" aria-hidden />
              {ex}
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-navy">
          Meer over {inSentence(service.title)}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
        </div>
      </Link>
    </motion.article>
  );
}
